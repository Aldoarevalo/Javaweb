package Controlador;

import DAO.DepositoDAO;
import DAO.SucursalDAO;
import DTO.DepositoDTO;
import Generico.Genericos;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DepositoCTR extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        PrintWriter out = response.getWriter();
        System.out.println("Llegamos al controlador");
        String cadenaJSON = Genericos.deRequestToJson(request);
        System.out.println("JSON OBTENIDO " + cadenaJSON);
        Gson gson = new Gson();
        DepositoDTO depositoDTO;
        DepositoDAO depositoDAO;
        depositoDTO = gson.fromJson(cadenaJSON, DepositoDTO.class);
        depositoDAO = new DepositoDAO();

        switch (depositoDTO.getBandera()) {
            case 1:
                if (depositoDAO.agregar(depositoDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 2:
                if (depositoDAO.modificar(depositoDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
           case 3:
                if (depositoDAO.eliminar(depositoDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 4:
//                PrintWriter out = response.getWriter();
                String json = gson.toJson(depositoDAO.seleccionarSegunId(depositoDTO));
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
                String cadenaDepositoTodos = gson.toJson(depositoDAO.seleccionarTodos());
                if (cadenaDepositoTodos != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenaDepositoTodos);
                    out.println(cadenaDepositoTodos);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
            case 6:
                //Combo <Sucursal>
                response.setContentType("application/json, charset=UTF-8");
                SucursalDAO sucursalDAO = new SucursalDAO();
                String cadenasucursal = gson.toJson(sucursalDAO.seleccionarTodos());
                if (cadenasucursal != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenasucursal);
                    out.println(cadenasucursal);
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
