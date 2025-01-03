from flask import Flask, request, jsonify
from flask_cors import CORS
from conexion import obtener_conexion
from datetime import datetime
import pytz  # libreria para manejar zonas horarias

app = Flask(__name__)
# habilita CORS para todas las rutas y origenes
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def home():
    return jsonify(message="Servidor funcionando")

# login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    dni = data.get('dni', '').strip() #strip elimina espacios al inicio y final del texto
    nombre = data.get('nombre', '').strip()
    apellido = data.get('apellido', '').strip()

    # Validaciones
    if not dni.isdigit() or not (7 <= len(dni) <= 8):
        return jsonify({"error": "El DNI debe tener entre 7 y 8 números."}), 400

    if not (2 <= len(nombre) <= 30) or not nombre.replace(" ", "").isalpha():
        return jsonify({"error": "El nombre debe contener solo letras (entre 2 y 30 caracteres)."}), 400

    if not (2 <= len(apellido) <= 30) or not apellido.replace(" ", "").isalpha():
        return jsonify({"error": "El apellido debe contener solo letras (entre 2 y 30 caracteres)."}), 400

    try:
        # conexion a la bdd
        conexion = obtener_conexion()
        with conexion.cursor() as cursor:
            # verificar si el usuario existe
            cursor.execute("SELECT * FROM usuario WHERE dni = %s", (dni,))
            usuario = cursor.fetchone()

            if not usuario:
                # si no existe el usuario, se lo agrega
                cursor.execute(
                    "INSERT INTO usuario (dni, nombre, apellido) VALUES (%s, %s, %s)", 
                    (dni, nombre, apellido)
                )
                conexion.commit()

        return jsonify({"message": "Inicio de sesión exitoso."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# guardar intento
@app.route('/guardar-intento', methods=['POST'])
def guardar_intento():
    data = request.json
    print(data)
    dni_usuario = data.get('dni')
    puntaje = data.get('puntaje')  
    fecha_hora = datetime.fromisoformat(data.get('fecha'))

    if not all([dni_usuario, puntaje, fecha_hora]):
        return jsonify({'error': 'Datos incompletos'}), 400

    try:
        # hora local argentina
        zona_horaria = pytz.timezone('America/Argentina/Buenos_Aires')
        fecha_hora_local = fecha_hora.astimezone(zona_horaria)
        fecha = fecha_hora_local.date()
        hora = fecha_hora_local.time()

        conexion = obtener_conexion()
        cursor = conexion.cursor()

        # insertar el intento
        cursor.execute(
            "INSERT INTO intento (dni_usuario, puntaje, fecha, hora) VALUES (%s, %s, %s, %s)",
            (dni_usuario, puntaje, fecha, hora)
        )

        conexion.commit()
        conexion.close()

        return jsonify({'message': 'Intento guardado correctamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# obtener intentos
@app.route('/obtener_intentos/<dni>', methods=['GET'])
def obtener_intentos(dni):
    try:
        conexion = obtener_conexion()
        with conexion.cursor() as cursor:
            # obtener todos los intentos del usuario por fecha descendentemente
            cursor.execute("""
                SELECT fecha, hora, puntaje 
                FROM intento 
                WHERE dni_usuario = %s 
                ORDER BY fecha DESC, hora DESC
            """, (dni,))
            intentos = cursor.fetchall()

        # convertir los resultados a lista de diccionarios
        intentos_lista = [{"fecha": str(fecha), "hora": str(hora), "puntaje": puntaje} 
                          for fecha, hora, puntaje in intentos]
        return jsonify(intentos_lista), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/estadisticas/<usuario>', methods=['GET'])
def estadisticas(usuario):
    conexion = obtener_conexion()
    stats = conexion.execute('SELECT COUNT(*) AS total_intentos, AVG(puntaje) AS promedio FROM intentos WHERE usuario = ?', (usuario,)).fetchone()
    conexion.close()

    return jsonify(dict(stats))


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
