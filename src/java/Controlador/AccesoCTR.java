package Controlador;

import DAO.UsuarioDAO;
import DTO.UsuarioDTO;
import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AccesoCTR extends HttpServlet {

    private String json;
    private PrintWriter out;
    private Gson gson;
    private UsuarioDTO usuarioDTO;
    private UsuarioDAO usuarioDAO;

    private String bloqueArchivo, bloquePersonas, bloqueArticulos, bloqueCompra,
            bloqueFacturacion, bloqueServicio, bloqueEmbarcaciones, bloqueVarios, bloqueOpciones, bloqueAyuda, bloqueSalir;

    public AccesoCTR() {
        json = "";
        bloqueArchivo = "";
        bloquePersonas = "";
        bloqueArticulos = "";
        bloqueCompra = "";
        bloqueFacturacion = "";
        bloqueServicio = "";
        bloqueEmbarcaciones = "";
        bloqueVarios = "";
        bloqueOpciones = "";
        bloqueAyuda = "";
        bloqueSalir = "";
    }

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        out = response.getWriter();
        BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
        if (br.ready()) {
            json = br.readLine();
        }
        System.out.println("Json c/ tres datos " + json);
        gson = new Gson();
        usuarioDTO = gson.fromJson(json, UsuarioDTO.class);
        System.out.println("Exitoso " + usuarioDTO.getUsuario());
        System.out.println("Exitoso " + usuarioDTO.getClave());
        System.out.println("Exitoso " + usuarioDTO.getCod_perfil());
        getBloquesPermisos();
        usuarioDAO = new UsuarioDAO();
        System.out.println("id Perfil " + usuarioDAO.getPermisoUsuario(usuarioDTO));
        switch (usuarioDAO.getPermisoUsuario(usuarioDTO)) {
            case 1: //SUPER
                out.println(bloqueArchivo + bloquePersonas + bloqueArticulos + bloqueCompra + bloqueFacturacion + bloqueServicio + bloqueEmbarcaciones + bloqueVarios + bloqueOpciones + bloqueAyuda + bloqueSalir);
                out.close();
                break;
            case 2: //USER_FACT
                out.println(bloqueFacturacion + bloqueVarios + bloqueAyuda + bloqueSalir);
                out.close();
                break;
            case 3: //USER_COMP
                out.println(bloqueArticulos + bloqueCompra + bloqueAyuda + bloqueSalir);
                out.close();
                break;
            case 4: //USER_SERV
                out.println(bloqueServicio + bloqueEmbarcaciones + bloqueAyuda + bloqueSalir);
                out.close();
                break;
            case 5: // ADMIN
                out.println(bloqueArchivo + bloqueAyuda + bloqueSalir);
                out.close();
                break;
        }

    }

    private void getBloquesPermisos() {
        bloqueArchivo = "<div  class=\"w3-dropdown-hover\">\n"
                + "                                    <button class=\"w3-button\">Archivo</button>\n"
                + "                                    <div class=\"w3-dropdown-content w3-bar-block w3-card-4\">\n"
                + "                                        <a href=\"/JavaWeb_Compras/Paginas/Usuario.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"fas fa-users\"></i> Usuarios</a>\n"
                + "                                        <a href=\"/JavaWeb_Compras/Paginas/Perfil.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"fas fa-address-book\"></i> Perfil</a>\n"
                + "                                        <a href=\"/JavaWeb_Compras/Paginas/Permiso.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-sign-in-alt'></i> Permisos</a>\n"
                + "                                        <a onclick=\" closeOpenedWindow();\" class=\"w3-bar-item w3-button\"><i target=\"contenedor_paginas\" <i class=\"fas fa-sign-out-alt\"></i> Salir</a>\n"
                + "                                    </div>\n"
                + "                                </div>";

        bloquePersonas = "<div class=\"w3-dropdown-hover\">\n"
                + "                                    <button class=\"w3-button\">Personas</button>\n"
                + "                                    <div class=\"w3-dropdown-content w3-bar-block w3-card-4\">\n"
                + "                                        <a href=\"/JavaWeb_Compras/Paginas/Empleado.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"far fa-id-card\"></i> Listado de Empleados</a>\n"
                + "                                        <a href=\"/JavaWeb_Compras/Paginas/Cliente.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"fab fa-slideshare\"></i> Listado de Clientes</a>\n"
                + "                                        <a href=\"/JavaWeb_Compras/Paginas/Proveedor.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"fas fa-people-carry\"></i> Listado de Proveedores</a>\n"
                + "                                    </div>\n"
                + "                                </div>";

        bloqueArticulos = "<div class=\"w3-dropdown-hover\">\n"
                + "                    <button class=\"w3-button\">Artículos</button>\n"
                + "                    <div class=\"w3-dropdown-content w3-bar-block w3-card-2\">\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Mercaderia.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"fas fa-dolly\"></i> Mercadería</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Impuesto.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"fas fa-percent\"></i> Tipo Impuesto</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Marca.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-shield-alt'></i> Marca</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Unidad_Medida.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"fas fa-balance-scale\"></i> Unidad de Medida</a>\n"
                + "                    </div>\n"
                + "                </div> ";
        //
        bloqueCompra = "<div class=\"w3-dropdown-hover\">\n"
                + "                    <button class=\"w3-button\">Gestionar Compra</button>\n"
                + "                    <div class=\"w3-dropdown-content w3-bar-block w3-card-2\">\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Solicitud_Compra.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='far fa-file-alt'></i> Solicitud de Compra</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Orden_Compra.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='far fa-newspaper'></i> Orden de Compra</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Factura_Compra.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-scroll'></i> Factura de Compra</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Mercaderia.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='far fa-sticky-note'></i> Nota de Compra</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Mercaderia.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-edit'></i> Ajuste de Stock</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Mercaderia.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='far fa-clipboard'></i> Nota de Remisión</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Mercaderia.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='far fa-file-pdf'></i>Informes de Compras</a>\n"
                + "                    </div>\n"
                + "                </div> ";
        bloqueFacturacion = " <div class=\"w3-dropdown-hover\">\n"
                + "                    <button class=\"w3-button\">Gestionar Facturación</button>\n"
                + "                    <div class=\"w3-dropdown-content w3-bar-block w3-card-2\">\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Solicitud_Compra.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='far fa-file-alt'></i> Orden de Facturación</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Solicitud_Compra.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-scroll'></i> Generar Facturación</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Solicitud_Compra.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='far fa-sticky-note'></i> Nota de Venta</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Solicitud_Compra.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-money-check-alt'></i> Recibo</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Solicitud_Compra.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='far fa-file-pdf'></i> Informes de Ventas</a>\n"
                + "                    </div>\n"
                + "                </div> ";
        bloqueServicio = " <div class=\"w3-dropdown-hover\">\n"
                + "                    <button class=\"w3-button\">Gestionar Servicio</button>\n"
                + "                    <div class=\"w3-dropdown-content w3-bar-block w3-card-2\">\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Solicitud_Compra.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='far fa-file-alt'></i> Registrar Contrato</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Solicitud_Compra.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-scroll'></i> Designación de Convoy</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Solicitud_Compra.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='far fa-sticky-note'></i> Programa de Carga</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Solicitud_Compra.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='far fa-sticky-note'></i> Conocimiento de Embarque</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Solicitud_Compra.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-money-check-alt'></i> Posición de Convoy</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Solicitud_Compra.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='far fa-file-pdf'></i> Informes Varios</a>\n"
                + "                    </div>\n"
                + "                </div> ";
        bloqueEmbarcaciones = " <div class=\"w3-dropdown-hover\">\n"
                + "                    <button class=\"w3-button\">Embarcaciones</button>\n"
                + "                    <div class=\"w3-dropdown-content w3-bar-block w3-card-2\">\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Barcaza.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-boxes'></i> Barcazas</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Tipo_Barcaza.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-boxes'></i> Tipo de Barcazas</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Embarcacion.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"fas fa-ship\"></i> Embarcaciones</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Tipo_Embarcacion.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-boxes'></i> Tipo de Embarcaciones</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Puerto.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-pallet'></i> Puertos</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Flete.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-boxes'></i> Import Export</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Flete.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-boxes'></i> Import Export</a>\n"
                + "                    </div>\n"
                + "                </div> ";
        bloqueVarios = " <div class=\"w3-dropdown-hover\">\n"
                + "                    <button class=\"w3-button\">Varios</button>\n"
                + "                    <div class=\"w3-dropdown-content w3-bar-block w3-card-2\">\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Moneda.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"fas fa-money-bill-alt\"></i> Moneda</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Banco.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"fas fa-university\"></i> Bancos</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Timbrado.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-file-code'></i> Timbrados</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Tipo_Factura.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-search-dollar'></i> Tipo Factura</a>\n"
                + "                    </div>\n"
                + "                </div> ";
        bloqueOpciones = " <div class=\"w3-dropdown-hover\">\n"
                + "                    <button class=\"w3-button\">Otras Opciones</button>\n"
                + "                    <div class=\"w3-dropdown-content w3-bar-block w3-card-2\">\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Empresa.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"fas fa-building\"></i> Empresa</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Departamento.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"fas fa-chalkboard-teacher\"></i> Departamento</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Ciudad.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"fas fa-city\"></i> Ciudad</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Nacionalidad.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"fas fa-globe-americas\"></i> Nacionalidad</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Sucursal.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class=\"fas fa-store-alt\"></i> Sucursal</a>\n"
                + "                        <a href=\"/JavaWeb_Compras/Paginas/Deposito.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-warehouse'></i> Depósito</a>\n"
                + "                    </div>\n"
                + "                </div> ";

        bloqueAyuda = "<div class=\"w3-dropdown-hover\">\n"
                + "                    <button class=\"w3-button\">Ayuda</button>\n"
                + "                     <div class=\"w3-dropdown-content w3-bar-block w3-card-4\">\n"
                + "                    <a href=\"/JavaWeb_Compras/Paginas/quick/Index.html\" target=\"contenedor_paginas\" <i class=\"w3-bar-item w3-button\"><i class='fas fa-question-circle'></i> Ayuda Interactiva</a>\n"
                + "                </div>\n"
                + "                </div> ";

//        bloqueAyuda = "<div class=\"w3-dropdown-hover\">\n"
//                + "                                    <button class=\"w3-button\">Ayuda</button>\n"
//                + "                                    <div class=\"w3-dropdown-content w3-bar-block w3-card-4\">\n"
//                + "                                        <a onclick=\"doOpen()\" class=\"w3-bar-item w3-button\"><i class=\"fas fa-question-circle\"></i> Ayuda Interactiva</a>\n"
//                + "                                    </div>\n"
//                + "                                </div>";
        bloqueSalir = "<div  class=\"w3-dropdown-hover\">\n"
                + "                                    <button class=\"w3-button\">Salir</button>\n"
                + "                                    <div class=\"w3-dropdown-content w3-bar-block w3-card-4\">\n"
                + "                                    <a window.open href=\"/JavaWeb_Compras/index.html\",\"_self\" <i class=\"w3-bar-item w3-button\"><i class=\"fas fa-window-close\"></i> Cerrar Sesión</a>\n"
                + "                                    </div>\n"
                + "                                </div>";
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
