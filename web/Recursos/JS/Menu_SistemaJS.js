//alert('conecta con el html');
function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_menu: (document.getElementById('codigo_menu_sistema').value === '' ? 0 : document.getElementById('codigo_menu_sistema').value),
        descripcion: document.getElementById('descripcion_menu_sistema').value
    };
    enviar();
}
function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/Menu_SistemaCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));

}
function agregarMenu_Sistema() {
    var verificar_descripcion = $('#descripcion_menu_sistema').val();

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

function modificarMenu_Sistema() {
    var verificar_descripcion = $('#descripcion_menu_sistema').val();
    var verificar_codigo = $('#codigo_menu_sistema').val();
    if (verificar_descripcion.length === 0 || verificar_codigo.length === 0) {
        alert('Debe Seleccionar el registro a ser Modificado');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarMenu_Sistema() {
    var verificar_codigo = $('#codigo_menu_sistema').val();
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

function recuperar_Menu_Sistema() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Menu_SistemaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_menu_sistema').value = json[i].descripcion;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_menu:
                document.getElementById('codigo_menu_sistema').value}));
    document.getElementById('descripcion_menu_sistema').focus();
}

function mostrarTabla_Menu_Sistema() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Menu_SistemaCTR";
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
                filas += "<tr>";
                filas += "<td>" + json[i].cod_menu + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_menu + " ,'" + json[i].descripcion + "' , 'codigo_menu_sistema' , 'descripcion_menu_sistema')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("Tabla_Menu_Sistema").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Menu_Sistema").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscador_Menu_Sistema() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Menu_Sistema");
    filter = input.value.toUpperCase();
    table = document.getElementById("Tabla_Menu_Sistema");
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

function recuperarDeBuscador(cod_menu, descripcion, codigo_menu_sistema, descripcion_menu_sistema) {
    document.getElementById(codigo_menu_sistema).value = cod_menu;
    document.getElementById(descripcion_menu_sistema).value = descripcion;
    
    document.getElementById(descripcion_menu_sistema).disabled = false;
    document.getElementById(descripcion_menu_sistema).focus();
    
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function  limpiar_Menu_Sistema() {
    document.getElementById("codigo_menu_sistema").disabled = true;
    document.getElementById("descripcion_menu_sistema").disabled = true;
    
    document.getElementById("form_menu_sistema").reset();
}

function habilitaInputMenu_Sistema(InputText)
{
    var input = document.getElementById(InputText);
    input.disabled = !input.disabled;
    document.getElementById(InputText).focus();
}