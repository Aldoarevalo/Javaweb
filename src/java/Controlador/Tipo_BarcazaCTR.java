package Controlador;

import DAO.Tipo_BarcazaDAO;
import DTO.Tipo_BarcazaDTO;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Tipo_BarcazaCTR extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        System.out.println("Llegamos al controlador");
        String cadenaJSON = Generico.Genericos.deRequestToJson(request);
        System.out.println("JSON OBTENIDO " + cadenaJSON);
        Gson gson = new Gson();
        Tipo_BarcazaDTO tipo_barcazaDTO;
        Tipo_BarcazaDAO tipo_barcazaDAO;
        tipo_barcazaDTO = gson.fromJson(cadenaJSON, Tipo_BarcazaDTO.class);
        tipo_barcazaDAO = new Tipo_BarcazaDAO();

        switch (tipo_barcazaDTO.getBandera()) {
            case 1:
                if (tipo_barcazaDAO.agregar(tipo_barcazaDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 2:
                if (tipo_barcazaDAO.modificar(tipo_barcazaDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 3:
                if (tipo_barcazaDAO.eliminar(tipo_barcazaDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 4:
//                PrintWriter out = response.getWriter();
                String json = gson.toJson(tipo_barcazaDAO.seleccionarSegunId(tipo_barcazaDTO));
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
                String cadenaDepartamento = gson.toJson(tipo_barcazaDAO.seleccionarTodos());
                if (cadenaDepartamento != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenaDepartamento);
                    out.println(cadenaDepartamento);
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
