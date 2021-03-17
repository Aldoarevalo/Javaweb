//alert('conecta con el html');
function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_impuesto: (document.getElementById('codigo_impuesto').value === '' ? 0 : document.getElementById('codigo_impuesto').value),
        descripcion: document.getElementById('descripcion_impuesto').value,
        porcentaje: document.getElementById('porcentaje_impuesto').value
    };
    enviar();
}
function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/ImpuestoCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));

}
function agregarImpuesto() {
    var verificar_descripcion = $('#descripcion_impuesto').val();
    var verificar_porcentaje = $('#porcentaje_impuesto').val();

    if (verificar_descripcion.length === 0 || verificar_porcentaje.length === 0) {
        alert('Debe ingresar una Descripción');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarImpuesto() {
    var verificar_descripcion = $('#descripcion_impuesto').val();
    var verificar_porcentaje = $('#porcentaje_impuesto').val();
    var verificar_codigo = $('#codigo_impuesto').val();
    if (verificar_descripcion.length === 0 || verificar_porcentaje.length === 0 || verificar_codigo.length === 0) {
        alert('Debe Seleccionar el registro a ser Modificado');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarImpuesto() {
    var verificar_codigo = $('#codigo_impuesto').val();
    if (verificar_codigo.length === 0) {
        alert('Debe Seleccionar el registro a ser Eliminado');
    } else {
        if (confirm('Desea eliminar el Registro')) {
            procesarJSON(3);
        } else {
            //limpiar();
        }
    }
}

function recuperarImpuesto() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/ImpuestoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_impuesto').value = json[i].descripcion;
                document.getElementById('porcentaje_impuesto').value = json[i].porcentaje;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_impuesto:
                document.getElementById('codigo_impuesto').value}));
    document.getElementById('descripcion_impuesto').focus();
}

function mostrarTablaImpuesto() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/ImpuestoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var opcionL = "";
            var filas = "";
            for (i = 0; i < json.length; i++) {
                opcionL += "<option value= " + json[i].cod_departamento + "> " +
                        json[i].descripcion + " </option>";
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_impuesto + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td>" + json[i].porcentaje + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_impuesto + " ,'" + json[i].descripcion + "' , '" + json[i].porcentaje + "', 'codigo_impuesto' , 'descripcion_impuesto', 'porcentaje_impuesto')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaImpuesto").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorImpuesto() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Impuesto");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaImpuesto");
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

function recuperarDeBuscador(cod_impuesto, descripcion, porcentaje,
        codigo_impuesto, descripcion_impuesto, porcentaje_impuesto) {
            
    document.getElementById(codigo_impuesto).value = cod_impuesto;
    document.getElementById(descripcion_impuesto).value = descripcion;
    document.getElementById(porcentaje_impuesto).value = porcentaje;
    
    document.getElementById(descripcion_impuesto).disabled = false;
    document.getElementById(porcentaje_impuesto).disabled = false;
    document.getElementById(descripcion_impuesto).focus();
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function  limpiarImpuesto() {
    document.getElementById("codigo_impuesto").value = "";
    document.getElementById("descripcion_impuesto").value = "";
    document.getElementById("porcentaje_impuesto").value = "";
}

function habilitaInput_Impuesto(descripcion_impuesto, porcentaje_impuesto){
    var impuesto = document.getElementById(descripcion_impuesto);
    var porcentaje = document.getElementById(porcentaje_impuesto);

    impuesto.disabled = !impuesto.disabled;
    porcentaje.disabled = !impuesto.disabled;
    
    document.getElementById(descripcion_impuesto).focus();
}