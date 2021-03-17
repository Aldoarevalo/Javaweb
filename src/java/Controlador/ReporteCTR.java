package Controlador;

import DAO.Menu_Item_SistemaDAO;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

public class ReporteCTR extends HttpServlet {

    JRBeanCollectionDataSource datos;
    ServletContext contexto;
    InputStream input;
    ServletOutputStream out;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        System.out.println("Llegamos a CentralInformes ");
        ServletContext servletContext = request.getServletContext();
        InputStream input = servletContext.getResourceAsStream("/Recursos/Jaspers/menu_sistema.jasper");
        byte[] bytes = null;

        try {
            bytes = JasperRunManager.runReportToPdf(input, new HashMap<>(), getDatos());
        } catch (JRException ex) {
            System.out.println("error al generar PDF " + ex.getMessage());
        }

        response.setContentType("application/pdf");
        response.setContentLength(bytes.length);
        ServletOutputStream outputStream = response.getOutputStream();
        outputStream.write(bytes, 0, bytes.length);

        outputStream.flush();
        outputStream.close();

    }

    private JRBeanCollectionDataSource getDatos() {
        Menu_Item_SistemaDAO menuDao = new Menu_Item_SistemaDAO();
        return new JRBeanCollectionDataSource(menuDao.seleccionarTodos());
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
