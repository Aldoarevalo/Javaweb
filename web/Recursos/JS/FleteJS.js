//alert('conecta con el html');
function procesarJSON(bandera) {
    //    alert ("Código: "+ document.getElementById('cod_ciudad').value);
    //    alert ("Descripcion: "+ document.getElementById('cod_ciudad').value);
    valores = {
        bandera: bandera,
        cod_flete: (document.getElementById('codigo_flete').value === '' ? 0 : document.getElementById('codigo_flete').value),
        descripcion: document.getElementById('descripcion_flete').value
    };
    enviar();
}
function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/FleteCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));

}
function agregarFlete() {
    var verificar_descripcion = $('#descripcion_flete').val();

    if (verificar_descripcion.length === 0) {
        alert('Debe ingresar una Descripción');
    } else {
       if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarFlete() {
    var verificar_descripcion = $('#descripcion_flete').val();
    var verificar_codigo = $('#codigo_flete').val();
    if (verificar_descripcion.length === 0 || verificar_codigo.length === 0) {
        alert('Debe Seleccionar el registro a ser Modificado');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarFlete() {
    var verificar_codigo = $('#codigo_flete').val();
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

function recuperarFlete() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/FleteCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_flete').value = json[i].descripcion;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_flete:
                document.getElementById('codigo_flete').value}));
    document.getElementById("descripcion_flete").focus();
}

function mostrarTablaFlete() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/FleteCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var opcionL = "";
            var filas = "";
            for (i = 0; i < json.length; i++) {
                opcionL += "<option value= " + json[i].cod_flete + "> " +
                        json[i].descripcion + " </option>";
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_flete + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_flete + " ,'" + json[i].descripcion + "' , 'codigo_flete' , 'descripcion_flete')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaFlete").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Flete").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorFlete() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Flete");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaFlete");
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

function recuperarDeBuscador(cod_flete, descripcion, codigo_flete, descripcion_flete) {

    document.getElementById(codigo_flete).value = cod_flete;
    document.getElementById(descripcion_flete).value = descripcion;

    document.getElementById(descripcion_flete).disabled = false;
    document.getElementById(descripcion_flete).focus();

    document.getElementById('datos_Abuscar').style.display = 'none';
}

function  limpiarFlete() {
    
    document.getElementById("codigo_flete").disabled = true;
    document.getElementById("descripcion_flete").disabled = true;
    
    document.getElementById("form_flete").reset();
}

function mayus(e) {
    e.value = e.value.toUpperCase();
}

function habilitaInputFlete(InputText)
{
    var input = document.getElementById(InputText);
    input.disabled = !input.disabled;
    document.getElementById(InputText).focus();
}