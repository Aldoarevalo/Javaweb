package Controlador;

import DAO.ProveedorDAO;
import DAO.TimbradoDAO;
import DTO.TimbradoDTO;
import Generico.Genericos;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TimbradoCTR extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        PrintWriter out = response.getWriter();
        System.out.println("Llegamos al controlador");
        String cadenaJSON = Genericos.deRequestToJson(request);
        System.out.println("JSON OBTENIDO " + cadenaJSON);
        Gson gson = new Gson();
        TimbradoDTO timbradoDTO;
        TimbradoDAO timbradoDAO;
        timbradoDTO = gson.fromJson(cadenaJSON, TimbradoDTO.class);
        timbradoDAO = new TimbradoDAO();

        switch (timbradoDTO.getBandera()) {
            case 1:
                if (timbradoDAO.agregar(timbradoDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 2:
                if (timbradoDAO.modificar(timbradoDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 3:
                if (timbradoDAO.eliminar(timbradoDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 4:
//                PrintWriter out = response.getWriter();
                String json = gson.toJson(timbradoDAO.seleccionarSegunId(timbradoDTO));
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
                String cadenaTimbradoTodos = gson.toJson(timbradoDAO.seleccionarTodos());
                if (cadenaTimbradoTodos != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenaTimbradoTodos);
                    out.println(cadenaTimbradoTodos);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
            case 6:
                //Combo <Sucursal>
                response.setContentType("application/json, charset=UTF-8");
                ProveedorDAO proveedorDAO = new ProveedorDAO();
                String cadenaproveedor = gson.toJson(proveedorDAO.seleccionarTodos());
                if (cadenaproveedor != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenaproveedor);
                    out.println(cadenaproveedor);
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
