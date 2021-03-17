package Controlador;

import DAO.BarcazaDAO;
import DAO.EmpresaDAO;
import DAO.Tipo_BarcazaDAO;
import DTO.BarcazaDTO;
import Generico.Genericos;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BarcazaCTR extends HttpServlet {

    private BarcazaDTO barcazaDTO;
    private BarcazaDAO barcazaDAO;
    private Gson gson;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        PrintWriter out = response.getWriter();
        System.out.println("Llegamos al controlador");
        String cadenaJSON = Genericos.deRequestToJson(request);
        System.out.println("JSON Obtenido" + cadenaJSON);
        gson = new Gson();
        barcazaDTO = gson.fromJson(cadenaJSON, BarcazaDTO.class);
        barcazaDAO = new BarcazaDAO();

        switch (barcazaDTO.getBandera()) {
            case 1:
                if (barcazaDAO.agregar(barcazaDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 2:
                if (barcazaDAO.modificar(barcazaDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 3:
                if (barcazaDAO.eliminar(barcazaDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 4:
                String json = gson.toJson(barcazaDAO.seleccionarSegunId(barcazaDTO));
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
                String cadenaBarcaza = gson.toJson(barcazaDAO.seleccionarTodos());
                if (cadenaBarcaza != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenaBarcaza);
                    out.println(cadenaBarcaza);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
            case 6:
                //Combo <Tipo_Barcaza>
                response.setContentType("application/json, charset=UTF-8");
                Tipo_BarcazaDAO tipo_barcazaDAO = new Tipo_BarcazaDAO();
                String cadenatipo_barcaza = gson.toJson(tipo_barcazaDAO.seleccionarTodos());
                if (cadenatipo_barcaza != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenatipo_barcaza);
                    out.println(cadenatipo_barcaza);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
            case 7:
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
        protected void doGet
        (HttpServletRequest request, HttpServletResponse response)
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
        protected void doPost
        (HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
            processRequest(request, response);
        }

        /**
         * Returns a short description of the servlet.
         *
         * @return a String containing servlet description
         */
        @Override
        public String getServletInfo
        
            () {
        return "Short description";
        }// </editor-fold>

    }
