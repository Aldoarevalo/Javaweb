//alert('conecta con el html');
function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_medida: (document.getElementById('codigo_medida').value === '' ? 0 : document.getElementById('codigo_medida').value),
        descripcion: document.getElementById('descripcion_medida').value
    };
    enviar();
}
function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/Unidad_MedidaCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));

}
function agregarUnidad_Medida() {
    var verificar_descripcion = $('#descripcion_medida').val();

    if (verificar_descripcion.length === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarUnidad_Medida() {
    var verificar_descripcion = $('#descripcion_medida').val();
    var verificar_cod_medida = $('#codigo_medida').val();

    if (verificar_descripcion.length === 0 || verificar_cod_medida.length === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}
function eliminarUnidad_Medida() {
    var verificar_cod_medida = $('#codigo_medida').val();
    if (verificar_cod_medida.length === 0) {
        alert('Debe Seleccionar el registro a ser Eliminado');
    } else {
        if (confirm('Confirmar la eliminación de Datos')) {
            procesarJSON(3);
        } else {
            //limpiar();
        }
    }
}

function recuperarUnidad_Medida() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Unidad_MedidaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_medida').value = json[i].descripcion;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_medida:
                document.getElementById('codigo_medida').value}));
    document.getElementById('descripcion_medida').focus();
}

function mostrarTablaUnidad_Medida() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Unidad_MedidaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var opcionL = "";
            var filas = "";
            for (i = 0; i < json.length; i++) {
                opcionL += "<option value= " + json[i].cod_medida + "> " +
                        json[i].descripcion + " </option>";
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_medida + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_medida + " ,'" + json[i].descripcion + "' , 'codigo_medida' , 'descripcion_medida')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaUnidad_Medida").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Unidad_Medida").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorUnidad_Medida() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Unidad_Medida");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaUnidad_Medida");
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

function recuperarDeBuscador(cod_medida, descripcion, codigo_medida, descripcion_medida) {
    document.getElementById(codigo_medida).disabled = false;
    document.getElementById(descripcion_medida).disabled = false;

    document.getElementById(codigo_medida).value = cod_medida;
    document.getElementById(descripcion_medida).value = descripcion;


    document.getElementById(descripcion_medida).focus();

    document.getElementById('datos_Abuscar').style.display = 'none';
}

function  limpiarUnidad_Medida() {
    document.getElementById("form_unidad_medida").reset();

    document.getElementById("codigo_medida").disabled = true;
    document.getElementById("descripcion_medida").disabled = true;
}

function habilitaInputSucursal(descripcion_medida)
{
    var descripcion = document.getElementById(descripcion_medida);
    
    descripcion.disabled = !descripcion.disabled;

    document.getElementById(descripcion_medida).focus();
}