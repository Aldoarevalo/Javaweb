package DAO;

import DTO.UsuarioDTO;
import Generico.ConexionBD;
import Generico.TipoMotorBD;
import Interface.UsuarioINT;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class UsuarioDAO implements UsuarioINT {

    private ResultSet rs;
    private PreparedStatement ps;
    private final ConexionBD conexion;
    private String sql;
    private String msg;

    public UsuarioDAO() {
        conexion = new ConexionBD(TipoMotorBD.POSTGRESQL);
    }

    @Override
    public Boolean agregar(UsuarioDTO dto) {
        try {
            sql = "INSERT INTO usuarios(cod_usuario, usuario, clave, cod_empleado, cod_departamento, cod_perfil, cod_estado)\n"
                    + "VALUES ((select coalesce (max(cod_usuario),0)+1 from usuarios), ?, ?, ?, ?, ?, 1);";
            ps = conexion.getConnection().prepareStatement(sql);
            ps.setString(1, dto.getUsuario().toLowerCase().trim());
            ps.setString(2, dto.getClave().toLowerCase().trim());
            ps.setInt(3, dto.getCod_empleado());
            ps.setInt(4, dto.getCod_departamento());
            ps.setInt(5, dto.getCod_perfil());
            System.out.println(ps);
            return ps.executeUpdate() > 0;
        } catch (SQLException ex) {
            msg = ex.getMessage();
            return false;
        }
    }

    @Override
    public Boolean modificar(UsuarioDTO dto) {
        try {
            sql = "UPDATE usuarios\n"
                    + "SET usuario=?, clave=?, cod_empleado=?, cod_departamento=?, cod_perfil=?, cod_estado=1\n"
                    + "WHERE cod_usuario=?;";
            ps = conexion.getConnection().prepareStatement(sql);
            ps.setString(1, dto.getUsuario().toLowerCase().trim());
            ps.setString(2, dto.getClave().toLowerCase().trim());
            ps.setInt(3, dto.getCod_empleado());
            ps.setInt(4, dto.getCod_departamento());
            ps.setInt(5, dto.getCod_perfil());
            ps.setInt(6, dto.getCod_usuario());
            System.out.println(ps);
            return ps.executeUpdate() > 0;
        } catch (SQLException ex) {
            msg = ex.getMessage();
            return false;
        }
    }

    @Override
    public Boolean eliminar(UsuarioDTO dto) {
        try {
            sql = "UPDATE usuarios\n"
                    + "SET usuario=?, clave=?, cod_empleado=?, cod_departamento=?, cod_perfil=?, cod_estado=2\n"
                    + "WHERE cod_usuario=?;";
            ps = conexion.getConnection().prepareStatement(sql);
            System.out.println(ps);
            ps.setString(1, dto.getUsuario().toLowerCase().trim());
            ps.setString(2, dto.getClave().toLowerCase().trim());
            ps.setInt(3, dto.getCod_empleado());
            ps.setInt(4, dto.getCod_departamento());
            ps.setInt(5, dto.getCod_perfil());
            ps.setInt(6, dto.getCod_usuario());
            System.out.println(ps);
            return ps.executeUpdate() > 0;
        } catch (SQLException ex) {
            msg = ex.getMessage();
            return false;
        }
    }

    @Override
    public List<UsuarioDTO> seleccionarTodos() {
        try {
            List<UsuarioDTO> lista;
            UsuarioDTO dto;
            sql = "SELECT u.cod_usuario, u.usuario, u.clave, \n"
                    + "e.cod_empleado, (RTRIM(e.nombre)||' '|| LTRIM(e.apellido)) AS empleado,\n"
                    + "d.cod_departamento, d.descripcion as departamento,\n"
                    + "p.cod_perfil, p.descripcion as perfil,\n"
                    + "es.cod_estado, es.descripcion as estado\n"
                    + "FROM usuarios u\n"
                    + "inner join empleado e on e.cod_empleado=u.cod_empleado\n"
                    + "inner join departamento d on d.cod_departamento = u.cod_departamento\n"
                    + "inner join perfil p on p.cod_perfil = u.cod_perfil\n"
                    + "inner join estado es on es.cod_estado = u.cod_estado\n"
                    + "where es.cod_estado = 1 order by u.cod_usuario asc;";
            ps = conexion.getConnection().prepareStatement(sql);
            rs = ps.executeQuery();
            lista = new ArrayList<>();
            while (rs.next()) {
                dto = new UsuarioDTO();
                dto.setCod_usuario(rs.getInt("cod_usuario"));
                dto.setUsuario(rs.getString("usuario"));
                dto.setClave(rs.getString("clave"));

                dto.setCod_empleado(rs.getInt("cod_empleado"));
                dto.setEmpleado(rs.getString("empleado"));
                dto.setCod_departamento(rs.getInt("cod_departamento"));
                dto.setDepartamento(rs.getString("departamento"));
                dto.setCod_perfil(rs.getInt("cod_perfil"));
                dto.setPerfil(rs.getString("perfil"));
                dto.setCod_estado(rs.getInt("cod_estado"));
                dto.setEstado(rs.getString("estado"));

                lista.add(dto);
            }
            return lista;
        } catch (SQLException ex) {
            msg = ex.getMessage();
            return null;
        }
    }

    @Override
    public List<UsuarioDTO> seleccionarSegunFiltro(UsuarioDTO dto) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public UsuarioDTO seleccionarSegunId(UsuarioDTO dto) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Integer getPermisoUsuario(UsuarioDTO dto) {
       try {
            sql = "SELECT cod_perfil FROM usuarios where cod_estado = 1 AND usuario= ? AND clave= ?;";
            ps = conexion.getConnection().prepareStatement(sql);
            ps.setString(1, dto.getUsuario().trim());
            ps.setString(2, dto.getClave().trim());
            rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt("cod_perfil");
            }
        } catch (SQLException ex) {

            Logger.getLogger(UsuarioDAO.class.getName()).log(Level.SEVERE, null, ex);
            return 0;
        }
        return 0;
    }

}
