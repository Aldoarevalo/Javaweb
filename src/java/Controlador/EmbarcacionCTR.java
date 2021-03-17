package Controlador;

import DAO.EmbarcacionDAO;
import DAO.EmpresaDAO;
import DAO.NacionalidadDAO;
import DAO.SucursalDAO;
import DAO.Tipo_EmbarcacionDAO;
import DTO.EmbarcacionDTO;
import Generico.Genericos;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class EmbarcacionCTR extends HttpServlet {

    private EmbarcacionDTO empujeDTO;
    private EmbarcacionDAO empujeDAO;
    private Gson gson;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        PrintWriter out = response.getWriter();
        System.out.println("Llegamos al controlador");
        String cadenaJSON = Genericos.deRequestToJson(request);
        System.out.println("JSON Obtenido" + cadenaJSON);
        gson = new Gson();
        empujeDTO = gson.fromJson(cadenaJSON, EmbarcacionDTO.class);
        empujeDAO = new EmbarcacionDAO();

        switch (empujeDTO.getBandera()) {
            case 1:
                if (empujeDAO.agregar(empujeDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 2:
                if (empujeDAO.modificar(empujeDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 3:
                if (empujeDAO.eliminar(empujeDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 4:
                String json = gson.toJson(empujeDAO.seleccionarSegunId(empujeDTO));
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
//                CiudadDAO ciudadDAO = new CiudadDAO();
                String cadenaCiudad = gson.toJson(empujeDAO.seleccionarTodos());
                if (cadenaCiudad != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenaCiudad);
                    out.println(cadenaCiudad);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
                case 6:
                //Combo <Tipo_Embarcacion>
                response.setContentType("application/json, charset=UTF-8");
                Tipo_EmbarcacionDAO tipo_embarcacionDAO = new Tipo_EmbarcacionDAO();
                String cadenatipo_embarcacion = gson.toJson(tipo_embarcacionDAO.seleccionarTodos());
                if (cadenatipo_embarcacion != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenatipo_embarcacion);
                    out.println(cadenatipo_embarcacion);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
                case 7:
                //Buscador <Nacionalidad>
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
                //Buscador <Empresa>
                response.setContentType("application/json, charset=UTF-8");
                EmpresaDAO empresaDAO = new EmpresaDAO();
                String cadenaEmpresa = gson.toJson(empresaDAO.seleccionarTodos());
                if (cadenaEmpresa != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenaEmpresa);
                    out.println(cadenaEmpresa);
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
