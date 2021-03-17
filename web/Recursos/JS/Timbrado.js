

function procesarJSON(bandera) {
//    alert(" precio " + document.getElementById('precio_unitario').value);
    valores = {
        bandera: bandera,
        cod_timbrado: (document.getElementById('codigo_timbrado').value === '' ? 0 : document.getElementById('codigo_timbrado').value),
        nro_proveedor: document.getElementById('codigo_proveedor').value,
        nro_timbrado: document.getElementById('timbrado').value,
        fec_inicio: document.getElementById('fecha_inicio').value,
        fecha_venc: document.getElementById('fecha_vencimiento').value
    };
    enviar();
}

function enviar() {
    var xmlhttp = new XMLHttpRequest(); // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/TimbradoCTR"); // tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}

function agregarTimbrado() {
    var verificar_nro_proveedor = $('#codigo_proveedor').val();
    var verificar_nro_timbrado = $('#timbrado').val();
    var verificar_fec_inicio = $('#fecha_inicio').val();
    var verificar_fecha_venc = $('#fecha_vencimiento').val();

    if (verificar_nro_proveedor.length === 0 || verificar_nro_timbrado.length === 0
            || verificar_fec_inicio.length === 0 || verificar_fecha_venc.length === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarTimbrado() {
    var verificar_nro_proveedor = $('#codigo_proveedor').val();
    var verificar_nro_timbrado = $('#timbrado').val();
    var verificar_fec_inicio = $('#fecha_inicio').val();
    var verificar_fecha_venc = $('#fecha_vencimiento').val();
    var verificar_cod_timbrado = $('#codigo_timbrado').val();

    if (verificar_nro_proveedor.length === 0 || verificar_nro_timbrado.length === 0
            || verificar_fec_inicio.length === 0 || verificar_fecha_venc.length === 0
            || verificar_cod_timbrado.length === 0) {

        alert('No puede quedar ningún campo vacío');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarTimbrado() {
    var verificar_cod_timbrado = $('#codigo_timbrado').val();

    if (verificar_cod_timbrado.length === 0) {
        alert('Debe Seleccionar el registro a ser Eliminado');
    } else {
        if (confirm('Confirmar la eliminación de Datos')) {
            procesarJSON(3);
        } else {
            //limpiar();
        }
    }
}

function recuperarTimbrados() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/TimbradoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('codigo_proveedor').value = json[i].nro_proveedor;
                document.getElementById('proveedor').value = json[i].descripcion_proveedor;
                document.getElementById('timbrado').value = json[i].nro_timbrado;
                document.getElementById('fecha_inicio').value = json[i].fec_inicio;
                document.getElementById('fecha_vencimiento').value = json[i].fecha_venc;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_timbrado:
                document.getElementById('codigo_timbrado').value}));
    document.getElementById("timbrado").focus();
}

function mostrarProveedor() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/ProveedorCTR";
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
                filas += "<td>" + json[i].nro_proveedor + "</td>";
                filas += "<td>" + json[i].razon_social + "</td>";
                filas += "<td>" + json[i].ruc + "</td>";
                filas += "<td> <img onclick=\"recuperarProveedor(" + json[i].nro_proveedor + " ,\n\
'" + json[i].razon_social + "' , '" + json[i].ruc + "' ,\n\
'codigo_proveedor', 'proveedor', 'ruc_proveedor')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("Tabla_Proveedor").innerHTML = filas;
            document.getElementById('datos_Abuscar_Proveedor').style.display = 'block';
            document.getElementById('filtro_buscador_Proveedor').focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarProveedor(nro_proveedor, razon_social, ruc,
        codigo_proveedor, proveedor, ruc_proveedor) {

    document.getElementById(codigo_proveedor).value = nro_proveedor;
    document.getElementById(proveedor).value = razon_social;
    document.getElementById(ruc_proveedor).value = ruc;
    document.getElementById('timbrado').focus();
    document.getElementById('datos_Abuscar_Proveedor').style.display = 'none';
}

function mostrarTablaTimbrado() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/TimbradoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
//            var opcionL = "";
            var filas = "";
            for (i = 0; i < json.length; i++) {
//                opcionL += "<option value= " + json[i].cod_empuje + "> " +
//                        json[i].descripcion + " </option>";
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_timbrado + "</td>";
                filas += "<td>" + json[i].descripcion_proveedor + "</td>";
                filas += "<td>" + json[i].nro_timbrado + "</td>";
                filas += "<td>" + json[i].fec_inicio + "</td>";
                filas += "<td>" + json[i].fecha_venc + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_timbrado + " ,\n\
'" + json[i].nro_proveedor + "' , \n\
'" + json[i].descripcion_proveedor + "',\n\
'" + json[i].ruc_proveedor + "',\n\
'" + json[i].nro_timbrado + "',\n\
'" + json[i].fec_inicio + "',\n\
'" + json[i].fecha_venc + "',\n\
'codigo_timbrado' , \n\
'codigo_proveedor',\n\
'proveedor',\n\
'ruc_proveedor',\n\
'timbrado',\n\
'fecha_inicio',\n\
'fecha_vencimiento')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaTimbrado").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Timbrado").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarDeBuscador(cod_timbrado, nro_proveedor, descripcion_proveedor, ruc_proveedor, nro_timbrado, fec_inicio, fecha_venc,
        codigo_timbrado, codigo_proveedor, proveedor, ruc, timbrado, fecha_inicio, fecha_vencimiento) {

    document.getElementById(codigo_timbrado).value = cod_timbrado;
    document.getElementById(codigo_proveedor).value = nro_proveedor;
    document.getElementById(proveedor).value = descripcion_proveedor;
    document.getElementById(ruc).value = ruc_proveedor;
    document.getElementById(timbrado).value = nro_timbrado;

    var date = fec_inicio;
    var newDate = date.split("/").reverse().join("-");
    document.getElementById(fecha_inicio).value = newDate;

    var date = fecha_venc;
    var newDate = date.split("/").reverse().join("-");
    document.getElementById(fecha_vencimiento).value = newDate;

    document.getElementById(codigo_proveedor).disabled = false;
    document.getElementById(timbrado).disabled = false;
    document.getElementById(fecha_inicio).disabled = false;
    document.getElementById(fecha_vencimiento).disabled = false;
    document.getElementById(timbrado).focus();

    document.getElementById('datos_Abuscar').style.display = 'none';
}

function buscadorTimbrado() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Timbrado");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaTimbrado");
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

function limpiarTimbrado() {

    document.getElementById("form_timbrado").reset();
}

function format(input)
{
    var num = input.value.replace(/\./g, '');
    if (!isNaN(num)) {
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/, '');
        input.value = num;
    } else {
        alert('Solo se permiten numeros');
        input.value = input.value.replace(/[^\d\.]*/g, '');
    }
}

function habilitaInputTimbrado(codigo_proveedor, nro_timbrado, fecha_inicio, fecha_vencimiento)
{
    var proveedor = document.getElementById(codigo_proveedor);
    var timbrado = document.getElementById(nro_timbrado);
    var fec_inicio = document.getElementById(fecha_inicio);
    var fec_vencimiento = document.getElementById(fecha_vencimiento);

    proveedor.disabled = !proveedor.disabled;
    timbrado.disabled = !timbrado.disabled;
    fec_inicio.disabled = !fec_inicio.disabled;
    fec_vencimiento.disabled = !fec_vencimiento.disabled;

    document.getElementById(codigo_proveedor).focus();
}

var numero = document.getElementById('timbrado');

function comprueba(valor) {
    if (valor.value < 0) {
        valor.value = 1;
    }
}
