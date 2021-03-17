//alert('conecta con el html');
function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_tipofactura: (document.getElementById('codigo_tipo_factura').value === '' ? 0 : document.getElementById('codigo_tipo_factura').value),
        descripcion: document.getElementById('descripcion_tipo_factura').value
    };
    enviar();
}
function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/Tipo_FacturaCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));

}
function agregar_Tipo_Factura() {
    var verificar_1 = $('#descripcion_tipo_factura').val();

    if (verificar_1.length === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}
function modificar_Tipo_Factura() {
    var verificar_1 = $('#descripcion_tipo_factura').val();
    var verificar_2 = $('#codigo_tipo_factura').val();
    if (verificar_1.length === 0 || verificar_2.length === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminar_Tipo_Factura() {
    var verificar_2 = $('#codigo_tipo_factura').val();
    if (verificar_2.length === 0) {
        alert('Debe Seleccionar el registro a ser Eliminado');
    } else {
        if (confirm('Confirmar la eliminación de Datos')) {
            procesarJSON(3);
        } else {
            //limpiar();
        }
    }
}

function recuperarTipo_Factura() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Tipo_FacturaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_tipo_factura').value = json[i].descripcion;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_tipofactura:
                document.getElementById('codigo_tipo_factura').value}));
    document.getElementById("descripcion_tipo_factura").disabled(false);
    document.getElementById('descripcion_tipo_factura').focus();
}

function mostrarTabla_Tipo_Factura() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Tipo_FacturaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
//            var opcionL = "";
            var filas = "";
            for (i = 0; i < json.length; i++) {
//                opcionL += "<option value= " + json[i].cod_departamento + "> " +
//                        json[i].descripcion + " </option>";
                //aqui cargamos los datos a la tabla
                filas += "<tr onclick=\"recuperarDeBuscador(" + json[i].cod_tipofactura + " ,'" + json[i].descripcion + "' , 'codigo_tipo_factura' , 'descripcion_tipo_factura')\">";
                filas += "<td>" + json[i].cod_tipofactura + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img  src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("Tabla_Tipo_Factura").innerHTML = filas;
            document.getElementById('datos_Abuscar_Tipo_Factura').style.display = 'block';
            document.getElementById("filtro_buscador_Tipo_Factura").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorDepartamento() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Tipo_Factura");
    filter = input.value.toUpperCase();
    table = document.getElementById("Tabla_Tipo_Factura");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function recuperarDeBuscador(cod_tipofactura, descripcion, codigo_tipo_factura , descripcion_tipo_factura) {
    document.getElementById(codigo_tipo_factura).value = cod_tipofactura;
    document.getElementById(descripcion_tipo_factura).value = descripcion;
    document.getElementById(descripcion_tipo_factura).disabled = false;
    document.getElementById(descripcion_tipo_factura).focus();
    document.getElementById('datos_Abuscar_Tipo_Factura').style.display = 'none';
}

function  limpiar_Tipo_Factura() {
    document.getElementById("form_tipo_factura").reset();
    
    document.getElementById("codigo_tipo_factura").disabled = true;
    document.getElementById("descripcion_tipo_factura").disabled = true;
}

function mayus(e) {
    e.value = e.value.toUpperCase();
}

function habilitaInput_Tipo_Factura(InputText)
{
    var input = document.getElementById(InputText);
    input.disabled = !input.disabled;
    document.getElementById(InputText).focus();
}