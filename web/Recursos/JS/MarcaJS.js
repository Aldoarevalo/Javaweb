//alert('conecta con el html');
function procesarJSON(bandera) {
    
    valores = {
        bandera: bandera,
        cod_marca: (document.getElementById('codigo_marca').value === '' ? 0 : document.getElementById('codigo_marca').value),
        descripcion: document.getElementById('descripcion_marca').value
    };
    enviar();
}
function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/MarcaCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));

}
function agregarMarca() {
    var verificar_descripcion = $('#descripcion_marca').val();

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

function modificarMarca() {
    var verificar_descripcion = $('#descripcion_marca').val();
    var verificar_codigo = $('#codigo_marca').val();
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

function eliminarMarca() {
    var verificar_codigo = $('#codigo_marca').val();
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

    function recuperarMarca() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/MarcaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_marca').value = json[i].descripcion;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_marca:
                document.getElementById('codigo_marca').value}));
    document.getElementById('descripcion_marca').focus();
}

function mostrarTablaMarca() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/MarcaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var opcionL = "";
            var filas = "";
            for (i = 0; i < json.length; i++) {
                opcionL += "<option value= " + json[i].cod_marca + "> " +
                        json[i].descripcion + " </option>";
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_marca + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_marca + " ,'" + json[i].descripcion + "' , 'codigo_marca' , 'descripcion_marca')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";

            }
            document.getElementById("TablaMarca").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Marca").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorMarca() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Marca");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaMarca");
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

function recuperarDeBuscador(cod_marca, descripcion, codigo_marca, descripcion_marca) {
    document.getElementById(codigo_marca).value = cod_marca;
    document.getElementById(descripcion_marca).value = descripcion;
    
    document.getElementById(descripcion_marca).disabled = false;
    document.getElementById(descripcion_marca).focus();
    
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function  limpiarMarca() {
    document.getElementById("codigo_marca").disabled = true;
    document.getElementById("descripcion_marca").disabled = true;
    
    document.getElementById("form_marca").reset();
}

function habilitaInputMarca(InputText)
{
    var input = document.getElementById(InputText);
    input.disabled = !input.disabled;
    document.getElementById(InputText).focus();
}