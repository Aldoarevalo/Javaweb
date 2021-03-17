function Fecha_Orden_Compra() {
    var someDateString = moment().format("YYYY-MM-DD");
//    var someDate = moment(someDateString, "YYYY/MM/DD");
    moment().format("YYYY/MM/DD");
//    (document.getElementById('fecha_solicitud').value === '' ? 0 : document.getElementById('fecha_solicitud').value)
    document.getElementById('orden_compra_fecha').value = someDateString;
}

function agregarFila_TablaMercaderia() {
    var cod = document.getElementById('codigo_mercaderia').value;
    var med = document.getElementById('medida').value;
    var des = document.getElementById('mercaderia').value;
    var cant = document.getElementById('cantidad_mercaderia').value;
    var pre = document.getElementById('precio_unitario_mercaderia').value;
    var mar = document.getElementById('marca').value;
    var tindex;
//    cant = cant.replace(".", "");
//    pre = pre.replace(".", "");
    var subtotal = cant * quitarSeparadorMil(pre);
    tindex++;

    if (checkId(cod)) {
        var des = document.getElementById('mercaderia').value;
        return alert(des + ' ya fue cargado a la tabla detalle');
    }

    $('#detalleTablaMercaderia_Compra').append("<tr id=\'prod" + tindex + "\'>\n\
    <td for='cod' id='cod' style=' width: 10%;'>" + cod + "</td>\n\
    <td id='med' style=' width: 10%;'>" + med + "</td>\n\
    <td id='des' style=' width: 28%;'>" + des + "</td>\n\
    <td id='mar' style=' width: 15%;'>" + mar + "</td>\n\
    <td id='cant' style=' width: 10%;'>" + cant + "</td>\n\
    <td id='pre' style=' width: 15%;'>" + format(pre) + "</td>\n\
    <td id='pre' style=' width: 15%;'>" + format(subtotal) + "</td>\n\
    <td style=' width: 5%;'><img class='update' onclick=\"$(\'#prod" + tindex + "\');calcularTotal()\" src='../Recursos/Img/update.png'/></td>\n\
    <td style=' width: 5%;'><img class='delete' onclick=\"$(\'#prod" + tindex + "\');calcularTotal()\" src='../Recursos/Img/delete.png'/></td>\n\
    </tr>");
    calcularTotal();
}

function checkId(cod) {
    let ids = document.querySelectorAll('#detalleTablaMercaderia_Compra td[for="cod"]');
    return [].filter.call(ids, td => td.textContent === cod).length === 1;
}

$(document).on('click', '.delete', function (event) {
    if (confirm('Confirmar la eliminación de la Fila')) {
        event.preventDefault();
        $(this).closest('tr').remove();
        calcularTotal();
    } else {
        limpiarInputMercaderia_Compra();
    }
});

$(document).ready(function () {
    $("#detalleTablaMercaderia_Compra").on('click', '.update', function (e) {
        if (confirm('Desea Modificar la Fila')) {
            e.preventDefault();
            var currentRow = $(this).closest("tr");
            var col1 = currentRow.find("td:eq(0)").text();
            var col2 = currentRow.find("td:eq(1)").text();
            var col3 = currentRow.find("td:eq(2)").text();
            var col4 = currentRow.find("td:eq(3)").text();
            var col5 = currentRow.find("td:eq(4)").text();
            var col6 = currentRow.find("td:eq(5)").text();
//            var col7 = currentRow.find("td:eq(6)").text();

            $("#codigo_mercaderia").val(col1);
            $("#medida").val(col2);
            $("#mercaderia").val(col3);
            $("#marca").val(col4);
            $("#precio_unitario_mercaderia").val(col6);
            $("#cantidad_mercaderia").val(col5);
            $(this).closest('tr').remove();
            calcularTotal();
        } else {
            return false;
        }
    });
});

function limpiarInputMercaderia_Compra() {
    document.getElementById('codigo_mercaderia').value = '';
    document.getElementById('medida').value = '';
    document.getElementById('mercaderia').value = '';
    document.getElementById('marca').value = '';
    document.getElementById('precio_unitario_mercaderia').value = '';
    document.getElementById('cantidad_mercaderia').value = '';
    document.getElementById('cantidad_mercaderia').focus();
}



function verificarDetalleCompra(evt) {
    var cod = document.getElementById('codigo_mercaderia').value;
    var med = document.getElementById('medida').value;
    var des = document.getElementById('mercaderia').value;
    var mar = document.getElementById('marca').value;
    var pre = document.getElementById('precio_unitario_mercaderia').value;
    var can = document.getElementById('cantidad_mercaderia').value;

    if (cod.length === 0 || med.length === 0 || des.length === 0 || mar.length === 0 || pre.length === 0) {
        if (confirm('Debe Ingresar una Mercaderia')) {
            evt.preventDefault();
            document.getElementById('cantidad_mercaderia').focus();
        } else {
            limpiarInputMercaderia_Compra();
            evt.preventDefault();
        }
    }
    if (can.length === 0) {
        if (confirm('Debe ingresar la Cantidad')) {
            evt.preventDefault();
            document.getElementById('cantidad_mercaderia').focus();
        } else {
            limpiarInputMercaderia_Compra();
            evt.preventDefault();
        }
    }
}

function procesarJSON(bandera) {

    var listaMercaderiaCompra = [];
    $("#detalleTablaMercaderia_Compra  tr").each(function () {

        listaMercaderiaCompra.push({
            cod_mercaderia: $(this).find("td").eq(0).html(),
            cantidad: $(this).find("td").eq(4).html(),
            precio_unitario: $(this).find("td").eq(5).html()
        });
    });

    valores = {
        bandera: bandera,
        nro_orden: (document.getElementById('orden_compra_nro').value === '' ? 0 : document.getElementById('orden_compra_nro').value),
        fecha: document.getElementById('orden_compra_fecha').value,
        nro_solicitud: document.getElementById('solcitud_compra_nro').value,
        cod_empleado: document.getElementById('codigo_empleado').value,
        cod_empresa: document.getElementById('codigo_empresa').value,
        nro_proveedor: document.getElementById('codigo_proveedor').value,
        condicion_compra: document.getElementById('condicion_compra').value,
        lista_mercaderia: listaMercaderiaCompra
    };
    envioCabDetCompra();
}

function envioCabDetCompra() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/Orden_Compra");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}

function agregarOrdenCompra() {
    var listaMercaderiaCompra = [];
    var fecha = $('#orden_compra_fecha').val();
    var cod_empleado = $('#codigo_empleado').val();
    var cod_empresa = $('#codigo_empresa').val();
    var nro_proveedor = $('#codigo_proveedor').val();
    var condicion_compra = $('#condicion_compra').val();
    '#detalleTablaMercaderia_Compra' === listaMercaderiaCompra.length <= 0 ? "0" : listaMercaderiaCompra;

    if (fecha.length === 0 || cod_empleado.length === 0 || cod_empresa.length === 0
            || nro_proveedor.length === 0 || condicion_compra.length === 0
//            || lista_mercaderia.length === 0 ? "0" : lista_mercaderia
            ) {
        alert('Debe completar todos los campos');
        limpiarOrdenCompra();
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function eliminarOrdenCompra() {
    var verificar_codigo = $('#orden_compra_nro').val();
    if (verificar_codigo.length === 0) {
        alert('Debe Seleccionar el registro a ser Eliminado');
    } else {
        if (confirm('Confirmar la eliminación de Datos')) {
            procesarJSON(3);
        } else {
            //limpiar();
        }
    }
}

function mostrarSolicitud_Compra() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/Orden_Compra";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText);
            var i;
//            var d;
            var tindex;
            var filas = "";

            tindex++;

            for (i in json) {
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].nro_solicitud + "</td>";
                filas += "<td>" + json[i].fecha + "</td>";
                filas += "<td>" + json[i].prioridad + "</td>";
                filas += "<td>" + json[i].empleado_descripcion + "</td>";
                filas += "<td>" + json[i].departamento_descripcion + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"RecuperarDeBuscadorSolicitudCompra(\n\
                    " + json[i].nro_solicitud + " , '" + json[i].descripcion + "' , \n\
                    'solcitud_compra_nro', 'descripcion_solicitud_compra'); \n\
                    \" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("Tabla_Solicitud_Compra").innerHTML = filas;
            document.getElementById('datos_Abuscar_Solicitud_Compra').style.display = 'block';
            document.getElementById("filtro_buscador_Solicitud_Compra").focus();
            document.getElementById("imprimir").disabled = false;
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4}));
}

function RecuperarDeBuscadorSolicitudCompra(nro_solicitud, solicitud_descripcion,
        solcitud_compra_nro, descripcion_solicitud_compra) {

    document.getElementById(solcitud_compra_nro).value = nro_solicitud;
    document.getElementById(descripcion_solicitud_compra).value = solicitud_descripcion;
    RecuperarSolicitudCompra();

    document.getElementById('datos_Abuscar_Solicitud_Compra').style.display = 'none';
}

function RecuperarSolicitudCompra() {
    var xhr;
    if (window.XMLHttpRequest)//verifica que el navegador tenga soporte
        xhr = new XMLHttpRequest();
    else if (window.ActiveXObject)
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    else
        throw new Error("Ajax is not supported by your browser");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 && xhr.status < 300)
            {
                var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
                var x;
                var d;
                var tindex;

                for (x in json) {
                    document.getElementById('solcitud_compra_nro').value = json[x].nro_solicitud;
                    document.getElementById('descripcion_solicitud_compra').value = json[x].descripcion;

                    $('#detalleTablaMercaderia_Compra').append("<tr id=\'prod" + tindex + "\'>\n\
                                <td for='cod' id='cod' style=' width: 10%;'>" + json[x].cod_mercaderia + "</td>\n\
                                <td id='des' style=' width: 10%;'>" + json[x].descripcion_medida + "</td>\n\
                                <td id='med' style=' width: 28%;'>" + json[x].articulo + "</td>\n\
                                <td id='mar' style=' width: 15%;'>" + json[x].marca_descripcion + "</td>\n\
                                <td id='cant_td' style=' width: 10%;'>" + json[x].cantidad + "</td>\n\
                                <td id='pre_td' style=' width: 15%;'>" + json[x].precio_unitario + "</td>\n\
                                <td id='pre_td' style=' width: 15%;'>" + json[x].subtotal + "</td>\n\
                                <td style=' width: 5%;'><img class='update' onclick=\"$(\'#prod" + tindex + "\');calcularTotal()\" src='../Recursos/Img/update.png'/></td>\n\
                                <td style=' width: 5%;'><img class='delete' onclick=\"$(\'#prod" + tindex + "\');calcularTotal()\" src='../Recursos/Img/delete.png'/></td>\n\
                                </tr>");
                }
            }
            calcularTotal();
        }
    }
    ;
    xhr.open('POST', '/JavaWeb_Compras/Orden_Compra');
    xhr.send(JSON.stringify(datos = {bandera: 2, nro_solicitud: $('#solcitud_compra_nro').val()}));
    $('#codigo_solicitud').disabled;
}

function mostrarOrdenCompra() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/Orden_Compra";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText);
            var i;
            var d;
            var tindex;
            var filas = "";
            for (i in json) {
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].nro_orden + "</td>";
                filas += "<td>" + json[i].fecha + "</td>";
                filas += "<td>" + json[i].proveedor_descripcion + "</td>";
                filas += "<td>" + json[i].empleado_descripcion + "</td>";
                filas += "<td>" + json[i].nro_solicitud + "</td>";
                filas += "<td>" + json[i].condicion_compra + "</td>";
                filas += "<td> <img onclick=\"RecuperarDeBuscadorOrdenCompra(\n\
                    " + json[i].nro_orden + " ,\n\
                    'orden_compra_nro'); \n\
                    \" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
//                for (d in json[i].lista_mercaderia) {
//                    $('#detalleTablaMercaderia_Compra').append("<tr id=\'prod" + tindex + "\'>\n\
//                                <td for='cod' id='cod' style=' width: 10%;'>" + json[i].lista_mercaderia[d].cod_mercaderia + "</td>\n\
//                                <td id='med' style=' width: 10%;'>" + json[i].lista_mercaderia[d].descripcion_medida + "</td>\n\
//                                <td id='des' style=' width: 40%;'>" + json[i].lista_mercaderia[d].articulo + "</td>\n\
//                                <td id='mar' style=' width: 20%;'>" + json[i].lista_mercaderia[d].descripcion_marca + "</td>\n\
//                                <td id='cant' style=' width: 10%;'>" + json[i].lista_mercaderia[d].cantidad + "</td>\n\
//                                <td style=' width: 5%;'><img class='update' onclick=\"$(\'#prod" + tindex + "\')\" src='../Recursos/Img/update.png'/></td>\n\
//                                <td style=' width: 5%;'><img class='delete' onclick=\"$(\'#prod" + tindex + "\')\" src='../Recursos/Img/delete.png'/></td>\n\
//                          </tr>");
//                    alert(json[i].lista_mercaderia);
//                }
            }
            document.getElementById("Tabla_Orden_Compra").innerHTML = filas;
            document.getElementById('datos_Abuscar_Orden_Compra').style.display = 'block';
            document.getElementById("filtro_buscador_Orden_Compra").focus();
            document.getElementById("imprimir").disabled = false;
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 10}));
}

function RecuperarDeBuscadorOrdenCompra(nro_orden, orden_compra_nro) {

    document.getElementById(orden_compra_nro).value = nro_orden;
    RecuperarOrden_Compra();
    document.getElementById('datos_Abuscar_Orden_Compra').style.display = 'none';
}

function RecuperarOrden_Compra() {
    var xhr;
    if (window.XMLHttpRequest)//verifica que el navegador tenga soporte
        xhr = new XMLHttpRequest();
    else if (window.ActiveXObject)
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    else
        throw new Error("Ajax is not supported by your browser");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 && xhr.status < 300)
            {
                var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
                var x;
                var d;
                var tindex;
                var total;

                for (x in json) {
                    document.getElementById('orden_compra_nro').value = json[x].nro_orden;
                    document.getElementById('orden_compra_fecha').value = json[x].fecha;
                    document.getElementById('solcitud_compra_nro').value = json[x].nro_solicitud;
                    document.getElementById('descripcion_solicitud_compra').value = json[x].solicitud_descripcion;
                    document.getElementById('codigo_empleado').value = json[x].cod_empleado;
                    document.getElementById('empleado').value = json[x].empleado_descripcion;
                    document.getElementById('codigo_empresa').value = json[x].cod_empresa;
                    document.getElementById('empresa').value = json[x].empresa_descripcion;
                    document.getElementById('codigo_proveedor').value = json[x].nro_proveedor;
                    document.getElementById('proveedor').value = json[x].proveedor_descripcion;
                    document.getElementById('condicion_compra').value = json[x].condicion_compra;

                    $('#detalleTablaMercaderia_Compra').append("<tr id=\'prod" + tindex + "\'>\n\
                                <td for='cod' id='cod' style=' width: 10%;'>" + json[x].cod_mercaderia + "</td>\n\
                                <td id='des' style=' width: 10%;'>" + json[x].descripcion_medida + "</td>\n\
                                <td id='med' style=' width: 28%;'>" + json[x].articulo + "</td>\n\
                                <td id='mar' style=' width: 15%;'>" + json[x].marca_descripcion + "</td>\n\
                                <td id='cant' style=' width: 10%;'>" + json[x].cantidad + "</td>\n\
                                <td id='pre' style=' width: 15%;'>" + json[x].precio_unitario + "</td>\n\
                                <td id='sub' style=' width: 15%;'>" + json[x].subtotal + "</td>\n\
                                <td disable='' style=' width: 5%;'><img  class='up' onclick=\"$(\'#prod" + tindex + "\');calcularTotal()\" src='../Recursos/Img/update.png'/></td>\n\
                                <td disable='' style=' width: 5%;'><img  class='de' onclick=\"$(\'#prod" + tindex + "\');calcularTotal()\" src='../Recursos/Img/delete.png'/></td>\n\
                                </tr>");

//                    for (d in json[0].lista_mercaderia) {
//                        var cantidad = json[0].lista_mercaderia[d].cantidad;
//                        var precio_unitario = json[0].lista_mercaderia[d].precio_unitario;
//                        var subtotal = cantidad * precio_unitario;
//                        total += subtotal;
//                        document.getElementById('precio_total').value = total;
//                        
//                    }
//                    document.getElementById('precio_total').value = total;
                }

            }
            calcularTotal();
        }
    }
    ;
    xhr.open('POST', '/JavaWeb_Compras/Orden_Compra');
    xhr.send(JSON.stringify(datos = {bandera: 11, nro_orden: $('#orden_compra_nro').val()}));
    $('#orden_compra_nro').disabled;
// 3. Specify your action, location and Send to the server - End
}

//}
//            document.getElementById("Tabla_Solicitud").innerHTML = filas;
//            document.getElementById('datos_Abuscar_Solicitud').style.display = 'block';
//            document.getElementById("filtro_buscador_Solicitud").focus();
//        }
//    };
//    xhr.send(JSON.stringify(datos = {bandera: 4}));
//}

function mostrarEmpleadoCompra() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Orden_Compra";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var filas = "";
            for (i = 0; i < json.length; i++) {
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_empleado + "</td>";
                filas += "<td>" + json[i].emp_ci + "</td>";
                filas += "<td>" + json[i].nombre + " " + json[i].apellido + "</td>";
                filas += "<td> <img onclick=\"recuperarEmpleado_Compra(" + json[i].cod_empleado + " ,\n\
'" + json[i].nombre + ' ' + json[i].apellido + "', \n\
'codigo_empleado' , \n\
'empleado') \n\
\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("Tabla_Empleado").innerHTML = filas;
            document.getElementById('datos_Abuscar_Empleado').style.display = 'block';
            document.getElementById("filtro_buscador_Empleado").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 7}));
}

function recuperarEmpleado_Compra(cod_empleado, empleado_descripcion,
        codigo_empleado, empleado) {
    document.getElementById(codigo_empleado).value = cod_empleado;
    document.getElementById(empleado).value = empleado_descripcion;
    document.getElementById('empleado').focus();
    document.getElementById('datos_Abuscar_Empleado').style.display = 'none';
}

function mostrarEmpresaCompra() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Orden_Compra";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var filas = "";
            for (i = 0; i < json.length; i++) {
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_empresa + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td>" + json[i].ruc + "</td>";
                filas += "<td> <img onclick=\"recuperarEmpresa(" + json[i].cod_empresa + " ,\n\
'" + json[i].descripcion + "', \n\
'codigo_empresa' , \n\
'empresa') \n\
\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("Tabla_Empresa").innerHTML = filas;
            document.getElementById('datos_Abuscar_Empresa').style.display = 'block';
            document.getElementById("filtro_buscador_Empresa").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarEmpresa(cod_empresa, empresa_descripcion,
        codigo_empresa, empresa) {
    document.getElementById(codigo_empresa).value = cod_empresa;
    document.getElementById(empresa).value = empresa_descripcion;
    document.getElementById('empresa').focus();
    document.getElementById('datos_Abuscar_Empresa').style.display = 'none';
}

function mostrarProveedorCompra() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Orden_Compra";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var filas = "";
            for (i = 0; i < json.length; i++) {
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].nro_proveedor + "</td>";
                filas += "<td>" + json[i].razon_social + "</td>";
                filas += "<td>" + json[i].ruc + "</td>";
                filas += "<td> <img onclick=\"recuperarProveedor(" + json[i].nro_proveedor + " ,\n\
'" + json[i].razon_social + "', \n\
'codigo_proveedor' , \n\
'proveedor') \n\
\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("Tabla_Proveedor").innerHTML = filas;
            document.getElementById('datos_Abuscar_Proveedor').style.display = 'block';
            document.getElementById("filtro_buscador_Proveedor").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 8}));
}

function recuperarProveedor(nro_proveedor, razon_social,
        codigo_proveedor, proveedor) {
    document.getElementById(codigo_proveedor).value = nro_proveedor;
    document.getElementById(proveedor).value = razon_social;
    document.getElementById('proveedor').focus();
    document.getElementById('datos_Abuscar_Proveedor').style.display = 'none';
}

function mostrarMercaderiaCompra() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Orden_Compra";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var filas = "";

            for (i = 0; i < json.length; i++) {
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_mercaderia + "</td>";
                filas += "<td>" + json[i].descripcion_medida + "</td>";
                filas += "<td>" + json[i].articulo + "</td>";
                filas += "<td>" + json[i].descripcion_marca + "</td>";
                filas += "<td>" + json[i].precio_unitario + "</td>";
                filas += "<td> <img onclick=\"recuperarMercaderiaCompra(" + json[i].cod_mercaderia + " , '" + json[i].descripcion_medida + "', '" + json[i].descripcion_marca + "',\n\
'" + json[i].articulo + "', '" + json[i].precio_unitario + "',\n\
'codigo_mercaderia' , 'medida', 'mercaderia', 'marca', 'precio_unitario_mercaderia' ) \n\
\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("Tabla_MercaderiaCompras").innerHTML = filas;
            document.getElementById('datos_Abuscar_Mercaderia').style.display = 'block';
            document.getElementById("filtro_buscador_Mercaderia").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 6}));
}

function recuperarMercaderiaCompra(cod_mercaderia, descripcion_medida, articulo, descripcion_marca, precio_unitario,
        codigo_mercaderia, medida, mercaderia, marca, precio_unitario_mercaderia) {
    document.getElementById(codigo_mercaderia).value = cod_mercaderia;
    document.getElementById(medida).value = descripcion_medida;
    document.getElementById(mercaderia).value = articulo;
    document.getElementById(marca).value = descripcion_marca;
    document.getElementById(precio_unitario_mercaderia).value = precio_unitario;
    document.getElementById('cantidad_mercaderia').focus();
    document.getElementById('datos_Abuscar_Mercaderia').style.display = 'none';
}

function habilitaInputOrden_Compra(solcitud_compra_nro, codigo_empleado, codigo_empresa, codigo_proveedor, condicion_compra, codigo_mercaderia, cantidad_mercaderia)
{
    var cod_solicitud = document.getElementById(solcitud_compra_nro);
    var empleado = document.getElementById(codigo_empleado);
    var empresa = document.getElementById(codigo_empresa);
    var proveedor = document.getElementById(codigo_proveedor);
    var condicion = document.getElementById(condicion_compra);
    var mercaderia = document.getElementById(codigo_mercaderia);
    var cantidad = document.getElementById(cantidad_mercaderia);

    cod_solicitud.disabled = !cod_solicitud.disabled;
    empleado.disabled = !empleado.disabled;
    empresa.disabled = !empresa.disabled;
    proveedor.disabled = !proveedor.disabled;
    condicion.disabled = !condicion.disabled;
    mercaderia.disabled = !mercaderia.disabled;
    cantidad.disabled = !cantidad.disabled;


    document.getElementById(solcitud_compra_nro).focus();
}

function limpiarOrdenCompra() {
    document.getElementById('orden_compra_nro').disabled = true;
    document.getElementById('orden_compra_fecha').disabled = true;
    document.getElementById('solcitud_compra_nro').disabled = true;
    document.getElementById('codigo_empleado').disabled = true;
    document.getElementById('codigo_empresa').disabled = true;
    document.getElementById('codigo_proveedor').disabled = true;
    document.getElementById('condicion_compra').disabled = true;
    document.getElementById('codigo_mercaderia').disabled = true;
    document.getElementById('cantidad_mercaderia').disabled = true;
//    document.getElementById("detalleTablaMercaderia").value = 0;
    $('#detalleTablaMercaderia_Compra').empty();

    document.getElementById('form_orden_compra').reset();
}

function calcularTotal() {
    var total = 0;
    $('#detalleTablaMercaderia_Compra tr').each(function () {

        var item = $(this).find("td").eq(6).html();
        item = item.split(".").join("");
        console.log("esto trae item: "+item);
        var numero = Number(item);
        total = total + numero;

    });
    document.getElementById('precio_total').value = format(total);
}

function format(num){
    var numeroConvertido=0;
    var numeroAconvertir=num;
    numeroAconvertir = num.toString().replace(/\./g,"");
    console.log("numero a convetir: "+numeroAconvertir);
    if(!isNaN(numeroAconvertir)){
    numeroAconvertir = numeroAconvertir.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g,'$1.');
    numeroAconvertir = numeroAconvertir.split("").reverse().join("").replace(/^[\.]/, "");
    numeroConvertido= numeroAconvertir;
    } else{ 
        alert("Solo se permiten numeros");
    }
    return numeroConvertido;
    alert(numeroConvertido);
}

function quitarSeparadorMil(valor){
    return valor.toString().replace(/\./g,"");
}

function buscador(filtro, tabla) {
    var input, filter, table, tr, td, i;
    input = document.getElementById(filtro);
    filter = input.value.toUpperCase();
    table = document.getElementById(tabla);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        visible = false;
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j] && td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                visible = true;
            }
        }
        if (visible === true) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}