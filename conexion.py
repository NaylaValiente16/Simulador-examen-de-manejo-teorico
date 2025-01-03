import pymysql

def obtener_conexion():
    try:
        conexion = pymysql.connect(
            host="localhost",
            user="root",
            password="root",
            database="simulador_ec"
        )
        print("Conexión exitosa:", conexion)  
        return conexion
    except pymysql.MySQLError as e:
        print("Error al conectar con la base de datos:", e)
        return None

