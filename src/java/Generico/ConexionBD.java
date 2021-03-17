package Generico;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class ConexionBD {

    private Connection connection;
    private String ultimoError;

    public ConexionBD(TipoMotorBD tipoMotorBD) {
        String url = "jdbc:" + tipoMotorBD.getMotorBD() + "://" + tipoMotorBD.getHost()
                + "/" + tipoMotorBD.getNombreBD();
        try {
            System.out.println("url " + url);
            Class.forName(tipoMotorBD.getControlador());
            connection = DriverManager.getConnection(url, tipoMotorBD.getUsuarioBD(),
                    tipoMotorBD.getClaveBD());
            if (connection == null) {
                System.out.println("Conexión no establecida ");
            } else {
                System.out.println("Conexión exitosa ");
            }
        } catch (ClassNotFoundException | SQLException e) {
            ultimoError = e.getMessage();
        }
    }

    public Connection getConnection() {
        return connection;
    }

    public void cerrarConexion() {
        try {
            connection.close();
        } catch (SQLException ex) {
            ultimoError = ex.getMessage();
        }

    }

    public String getUltimoError() {
        return ultimoError;
    }

}
