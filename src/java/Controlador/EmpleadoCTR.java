package Controlador;

import DAO.CiudadDAO;
import DAO.EmpleadoDAO;
import DAO.NacionalidadDAO;
import DTO.EmpleadoDTO;
import Generico.Genericos;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class EmpleadoCTR extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        PrintWriter out = response.getWriter();
        System.out.println("Llegamos al controlador");
        String cadenaJSON = Genericos.deRequestToJson(request);
        System.out.println("JSON OBTENIDO " + cadenaJSON);
        Gson gson = new Gson();
        EmpleadoDTO empleadoDTO;
        EmpleadoDAO empleadoDAO;
        empleadoDTO = gson.fromJson(cadenaJSON, EmpleadoDTO.class);
        empleadoDAO = new EmpleadoDAO();
        
        switch (empleadoDTO.getBandera()) {
            case 1:
                 if (empleadoDAO.agregar(empleadoDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                 break;
            case 2:
                if (empleadoDAO.modificar(empleadoDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 3:
                if (empleadoDAO.eliminar(empleadoDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 4:
//                PrintWriter out = response.getWriter();
                String json = gson.toJson(empleadoDAO.seleccionarSegunId(empleadoDTO));
                if (json != null) {
                    System.out.println("Json " + json);
                    response.setContentType("application/json, charset=UTF-8");
                    out.println("[" + json + "]");
                    out.close();
                } else {
                    out.println("");
                    out.close();
                }
                break;
            case 5:
                //Cargar Tabla
                response.setContentType("application/json, charset=UTF-8");
                String cadenaEmpleadoTodos = gson.toJson(empleadoDAO.seleccionarTodos());
                if (cadenaEmpleadoTodos != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenaEmpleadoTodos);
                    out.println(cadenaEmpleadoTodos);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
            case 6:
                //Combo <Ciudad>
                response.setContentType("application/json, charset=UTF-8");
                CiudadDAO ciudadDAO = new CiudadDAO();
                String cadenaCiudad = gson.toJson(ciudadDAO.seleccionarTodos());
                if (cadenaCiudad != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenaCiudad);
                    out.println(cadenaCiudad);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
            case 7:
                //Combo <Nacionalidad>
                response.setContentType("application/json, charset=UTF-8");
                NacionalidadDAO nacionalidadDAO = new NacionalidadDAO();
                String cadenaNacionalidad = gson.toJson(nacionalidadDAO.seleccionarTodos());
                if (cadenaNacionalidad != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenaNacionalidad);
                    out.println(cadenaNacionalidad);
                } else {
                    //enviar alguna respuesta para indicar error
                }

                break;
            case 8:
                //Combo <Nacionalidad>
                response.setContentType("application/json, charset=UTF-8");
//                EmpleadoDAO empleadoDAO = new EmpleadoDAO();
                String cadenaEmpleado = gson.toJson(empleadoDAO.seleccionarTodos());
                if (cadenaEmpleado != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenaEmpleado);
                    out.println(cadenaEmpleado);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
                case 9:
                //Seleccionar Empleado
                response.setContentType("application/json, charset=UTF-8");
//                EmpleadoDAO empleadoDAO = new EmpleadoDAO();
                String cadenaempleado = gson.toJson(empleadoDAO.SeleccionarEmpleado());
                if (cadenaempleado != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenaempleado);
                    out.println(cadenaempleado);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
            default:
                throw new AssertionError();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
