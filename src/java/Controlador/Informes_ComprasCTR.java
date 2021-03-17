package Controlador;

import DAO.EmbarcacionDAO;
import DAO.EmpresaDAO;
import DAO.Menu_Item_SistemaDAO;
import DAO.Menu_SistemaDAO;
import DAO.Orden_CompraDAO;
import DAO.PerfilDAO;
import DAO.Solicitud_CompraDAO;
import DTO.Orden_CompraDTO;
import DTO.Solicitud_CompraDTO;
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

public class Informes_ComprasCTR extends HttpServlet {

    JRBeanCollectionDataSource datos;
    ServletContext contexto;
    InputStream input;
    ServletOutputStream out;
    Integer bandera;
    String filtro;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        System.out.println("Llegamos al controlador Informes");
        try {
            bandera = Integer.parseInt(request.getParameter("bandera"));
            filtro = (request.getParameter("filtro") == null ? "" : request.getParameter("filtro"));
            contexto = request.getServletContext();

            switch (bandera) {
                case 1:
                    input = contexto.getResourceAsStream("/Recursos/Jasper/MenuSistema.jasper");
                    break;
                case 2:
                    input = contexto.getResourceAsStream("/Recursos/Jasper/Menu_Item_Sistema.jasper");
                    break;
                case 3:
                    input = contexto.getResourceAsStream("/Recursos/Jasper/Empresa.jasper");
                    break;
                case 4:
                    input = contexto.getResourceAsStream("/Recursos/Jasper/Perfil.jasper");
                    break;
                case 5:
                    input = contexto.getResourceAsStream("/Recursos/Jasper/Solicitud_Compra.jasper");
                    System.out.println("bandera 5");
                    break;
                case 6:
                    input = contexto.getResourceAsStream("/Recursos/Jasper/Orden_Compra.jasper");
                    System.out.println("bandera 6");
                    break;
                case 7:
                    input = contexto.getResourceAsStream("/Recursos/Jasper/Embarcacion.jasper");
                    System.out.println("bandera 7");
                    break;
            }
            byte[] bytes = null;
            bytes = JasperRunManager.runReportToPdf(input, new HashMap<>(), getDatos());
            response.setContentType("application/pdf");
            response.setContentLength(bytes.length);
            out = response.getOutputStream();
            out.write(bytes, 0, bytes.length);
            out.flush();
            out.close();
        } catch (JRException ex) {
            System.out.println("Error al generar el pdf " + ex.getMessage());
        }
    }

    private JRBeanCollectionDataSource getDatos() {

        if (bandera == 1) {
            return new JRBeanCollectionDataSource(new Menu_SistemaDAO().seleccionarTodos());
        }
        if (bandera == 2) {
            return new JRBeanCollectionDataSource(new Menu_Item_SistemaDAO().seleccionarTodos());
        }
        if (bandera == 3) {
            return new JRBeanCollectionDataSource(new EmpresaDAO().seleccionarTodos());
        }
        if (bandera == 4) {
            return new JRBeanCollectionDataSource(new PerfilDAO().seleccionarTodos());
        }
        if (bandera == 5) {
            Solicitud_CompraDTO dtoSolicitud = new Solicitud_CompraDTO();
            dtoSolicitud.setNro_solicitud(Integer.parseInt(filtro));
            // System.out.println("nro_solicitud " + filtro);
            // System.out.println("list  " + new Solicitud_CompraDAO().recuperarPedido(dtoSolicitud));
            return new JRBeanCollectionDataSource(new Solicitud_CompraDAO().recuperarPedido(dtoSolicitud));
        }
        if (bandera == 6) {
            Orden_CompraDTO dtoOrdenCompra = new Orden_CompraDTO();
            dtoOrdenCompra.setNro_orden(Integer.parseInt(filtro));
            // System.out.println("nro_solicitud " + filtro);
            // System.out.println("list  " + new Solicitud_CompraDAO().recuperarPedido(dtoSolicitud));
            return new JRBeanCollectionDataSource(new Orden_CompraDAO().recuperarOrdenCompra(dtoOrdenCompra));
        }
        if (bandera == 7) {
            return new JRBeanCollectionDataSource(new EmbarcacionDAO().seleccionarTodos());
        }
        return null;
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
