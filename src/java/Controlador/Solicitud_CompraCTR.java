package Controlador;

import DAO.DepartamentoDAO;
import DAO.DepositoDAO;
import DAO.EmpleadoDAO;
import DAO.MercaderiaDAO;
import DAO.Solicitud_CompraDAO;
import DTO.Solicitud_CompraDTO;
import Generico.Genericos;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

public class Solicitud_CompraCTR extends HttpServlet {

    JRBeanCollectionDataSource datos;
    ServletContext contexto;
    InputStream input;
    ServletOutputStream out_report;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        PrintWriter out = response.getWriter();
        System.out.println("Llegamos al controlador");
        String cadenaJSON = Genericos.deRequestToJson(request);
        System.out.println("JSON OBTENIDO " + cadenaJSON);
        Gson gson = new Gson();
        Solicitud_CompraDTO solicitud_compraDTO;
        Solicitud_CompraDAO solicitud_compraDAO;
        solicitud_compraDTO = gson.fromJson(cadenaJSON, Solicitud_CompraDTO.class);
        solicitud_compraDAO = new Solicitud_CompraDAO();

        switch (solicitud_compraDTO.getBandera()) {
            case 1:
                if (solicitud_compraDAO.agregar(solicitud_compraDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
//                Integer id = solicitud_compraDAO.agregarpk(solicitud_compraDTO);
//                System.out.println("retorna" + id);
//                if (id > 0) {
//                    try {
//                        contexto = request.getServletContext();
//                        input = contexto.getResourceAsStream("/Recursos/Jasper/Solicitud_Compra.jasper");
//
//                        byte[] bytes = null;
//                        System.out.println("llega bandera 1 " + id);
//                        bytes = JasperRunManager.runReportToPdf(input, new HashMap<>(), solicitud_compraDAO.getDatos(id));
//                        response.setContentType("application/pdf");
//                        response.setContentLength(bytes.length);
//                        out_report = response.getOutputStream();
//                        out_report.write(bytes, 0, bytes.length);
//                        out_report.flush();
//                        out_report.close();
//                    } catch (JRException ex) {
//                        System.out.println("Error al generar el pdf " + ex.getMessage());
//                    }
//                    //Operación exitosa => al cliente
//                } else {
//                    //Operación errónea => al cliente
//                }
                break;
            case 2:
                response.setContentType("application/json, charset=UTF-8");
                String jsonCabDet;
                jsonCabDet = gson.toJson(solicitud_compraDAO.recuperarPedido(solicitud_compraDTO));
                System.out.println("json Cab Obtenido " + jsonCabDet);
                out.println(jsonCabDet);
                out.close();
                break;
            case 3:
                if (solicitud_compraDAO.eliminar(solicitud_compraDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 4:
                //Seleccionar Solicitud
                response.setContentType("application/json, charset=UTF-8");
                Solicitud_CompraDAO solicitudDAO = new Solicitud_CompraDAO();
                String cadenasolicitud = gson.toJson(solicitudDAO.seleccionarTodos());
                if (cadenasolicitud != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenasolicitud);
                    out.println(cadenasolicitud);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
            case 5:
                //Seleccionar Departamento
                response.setContentType("application/json, charset=UTF-8");
                DepartamentoDAO departamentoDAO = new DepartamentoDAO();
                String cadenadepartamento = gson.toJson(departamentoDAO.seleccionarTodos());
                if (cadenadepartamento != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenadepartamento);
                    out.println(cadenadepartamento);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
            case 6:
                //Seleccionar Mercaderia
                response.setContentType("application/json, charset=UTF-8");
                MercaderiaDAO mercaderiaDAO = new MercaderiaDAO();
                String cadenademercaderia = gson.toJson(mercaderiaDAO.seleccionarTodos());
                if (cadenademercaderia != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenademercaderia);
                    out.println(cadenademercaderia);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
            case 7:
                //Seleccionar Empleado
                response.setContentType("application/json, charset=UTF-8");
                EmpleadoDAO empleadoDAO = new EmpleadoDAO();
                String cadenaempleado = gson.toJson(empleadoDAO.seleccionarTodos());
                if (cadenaempleado != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenaempleado);
                    out.println(cadenaempleado);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
            case 8:
                //Seleccionar Sucursal
                response.setContentType("application/json, charset=UTF-8");
                DepositoDAO depositoDAO = new DepositoDAO();
                String cadenadeposito = gson.toJson(depositoDAO.seleccionarTodos());
                if (cadenadeposito != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenadeposito);
                    out.println(cadenadeposito);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
            case 9:
                if (solicitud_compraDAO.modificar(solicitud_compraDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
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
