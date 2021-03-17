package Controlador;

import DAO.CiudadDAO;
import DAO.EmpresaDAO;
import DAO.SucursalDAO;
import DTO.SucursalDTO;
import Generico.Genericos;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SucursalCTR extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        PrintWriter out = response.getWriter();
        System.out.println("Llegamos al controlador");
        String cadenaJSON = Genericos.deRequestToJson(request);
        System.out.println("JSON OBTENIDO " + cadenaJSON);
        Gson gson = new Gson();
        SucursalDTO sucursalDTO;
        SucursalDAO sucursalDAO;
        sucursalDTO = gson.fromJson(cadenaJSON, SucursalDTO.class);
        sucursalDAO = new SucursalDAO();

        switch (sucursalDTO.getBandera()) {
            case 1:
                if (sucursalDAO.agregar(sucursalDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 2:
                if (sucursalDAO.modificar(sucursalDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 3:
                if (sucursalDAO.eliminar(sucursalDTO)) {
                    //Operación exitosa => al cliente
                } else {
                    //Operación errónea => al cliente
                }
                break;
            case 4:
//                PrintWriter out = response.getWriter();
                String json = gson.toJson(sucursalDAO.seleccionarSegunId(sucursalDTO));
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
                String cadenaSucursalTodos = gson.toJson(sucursalDAO.seleccionarTodos());
                if (cadenaSucursalTodos != null) {
                    //enviar al js la cadena 
                    System.out.println("Cadena " + cadenaSucursalTodos);
                    out.println(cadenaSucursalTodos);
                } else {
                    //enviar alguna respuesta para indicar error
                }
                break;
            case 6:
                //Combo <Empresa>
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
            case 7:
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
