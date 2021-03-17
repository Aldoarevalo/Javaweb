package test;

import DAO.EmpleadoDAO;
import DTO.CiudadDTO;
import DTO.EmpleadoDTO;
import DTO.NacionalidadDTO;

import java.sql.Date;
import java.text.SimpleDateFormat;

public class TestConexion {
    
    EmpleadoDAO empleadoDAO;
    EmpleadoDTO empleadoDTO;
    CiudadDTO ciudadDTO;
    NacionalidadDTO nacionalidadDTO;
    
    public TestConexion() {
//        UsuarioDTO dtoNew = new UsuarioDTO();
//        dto = new UsuarioDTO();
//        
        EmpleadoDTO dtoNew = new EmpleadoDTO();
        empleadoDTO = new EmpleadoDTO();
        ciudadDTO = new CiudadDTO();
        nacionalidadDTO = new NacionalidadDTO();

//        dto.setCod_ciudad(2);
        empleadoDTO.setEmp_ci("4.323.448");
        empleadoDTO.setNombre("Edgar");
        empleadoDTO.setApellido("Alegre");
        empleadoDTO.setDireccion("Cadete Pando");
        empleadoDTO.setTelefono("021210355");
        ciudadDTO.setCod_ciudad(1);
//        empleadoDTO.setCiudad(ciudadDTO);
//        empleadoDTO.setFecha_nac(fecha_nac);
        nacionalidadDTO.setCod_nacionalidad(1);
//        empleadoDTO.setNacionalidad(nacionalidadDTO);
        empleadoDAO = new EmpleadoDAO();
        empleadoDAO.agregar(empleadoDTO);
//        dao.modificar(dto);
//        dao.eliminar(dto);

//        for (CiudadDTO dtoLocal : dao.seleccionarTodos()) {
//            System.out.println(" " + dtoLocal.getCod_ciudad());
//            System.out.println(" " + dtoLocal.getDescripcion());
//        }
    }
    
    public static void main(String[] args) {
        new TestConexion();
    }
    
}
