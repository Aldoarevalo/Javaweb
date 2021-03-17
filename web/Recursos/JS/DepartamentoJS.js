//alert('conecta con el html');
function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_departamento: (document.getElementById('codigo_departamento').value === '' ? 0 : document.getElementById('codigo_departamento').value),
        descripcion: document.getElementById('descripcion_departamento').value
    };
    enviar();
}
function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/DepartamentoCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));

}
function agregarDepartamento() {
    var verificar_1 = $('#descripcion_departamento').val();

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
function modificarDepartamento() {
    var verificar_1 = $('#descripcion_departamento').val();
    var verificar_2 = $('#codigo_departamento').val();
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

function eliminarDepartamento() {
    var verificar_2 = $('#codigo_departamento').val();
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

function recuperarDepartamento() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/DepartamentoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_departamento').value = json[i].descripcion;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_departamento:
                document.getElementById('codigo_departamento').value}));
    document.getElementById("descripcion_departamento").disabled(false);
    document.getElementById('descripcion_departamento').focus();
}

function mostrarTablaDepartamento() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/DepartamentoCTR";
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
                filas += "<tr onclick=\"recuperarDeBuscador(" + json[i].cod_departamento + " ,'" + json[i].descripcion + "' , 'codigo_departamento' , 'descripcion_departamento')\">";
                filas += "<td>" + json[i].cod_departamento + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img  src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaDepartamento").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Departamento").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorDepartamento() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Departamento");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaDepartamento");
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

function recuperarDeBuscador(cod_departamento, descripcion, codigo_departamento, descripcion_departamento) {
    document.getElementById(codigo_departamento).value = cod_departamento;
    document.getElementById(descripcion_departamento).value = descripcion;
    document.getElementById(descripcion_departamento).disabled = false;
    document.getElementById(descripcion_departamento).focus();
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function  limpiarDepartamento() {
    document.getElementById("form_departamento").reset();
    
    document.getElementById("codigo_departamento").disabled = true;
    document.getElementById("descripcion_departamento").disabled = true;
}

function mayus(e) {
    e.value = e.value.toUpperCase();
}

function habilitaInputDepartamento(InputText)
{
    var input = document.getElementById(InputText);
    input.disabled = !input.disabled;
    document.getElementById(InputText).focus();
}