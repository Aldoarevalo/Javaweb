package Controlador;

import DAO.CiudadDAO;
import DAO.ClienteDAO;
import DAO.NacionalidadDAO;
import DTO.ClienteDTO;
import Generico.Genericos;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ClienteCTR extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        PrintWriter out = response.getWriter();
        System.out.println("Llegamos al controlador");
        String cadenaJSON = Genericos.deRequestToJson(request);
        System.out.println("JSON OBTENIDO " + cadenaJSON);
        Gson gson = new Gson();
        ClienteDTO clienteDTO;
        ClienteDAO clienteDAO;
        clienteDTO = gson.fromJson(cadenaJSON, ClienteDTO.class);
        clienteDAO = new ClienteDAO();

        switch (clienteDTO.getBandera()) {
            case 1:
                if (clienteDAO.agregar(clienteDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 2:
                if (clienteDAO.modificar(clienteDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 3:
                if (clienteDAO.eliminar(clienteDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 4:
//                PrintWriter out = response.getWriter();
                String json = gson.toJson(clienteDAO.seleccionarSegunId(clienteDTO));
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
                String cadenaEmpleadoTodos = gson.toJson(clienteDAO.seleccionarTodos());
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
                response.setContentType("application/json, charset=UTF-8");
//                EmpleadoDAO empleadoDAO = new EmpleadoDAO();
                String cadenaProveedor = gson.toJson(clienteDAO.seleccionarTodos());
                if (cadenaProveedor != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenaProveedor);
                    out.println(cadenaProveedor);
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
