recuperarCombo_Menu_Sistema();

function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_menu_item: (document.getElementById('codigo_menu_item_sistema').value === '' ? 0 : document.getElementById('codigo_menu_item_sistema').value),
        descripcion: document.getElementById('descripcion_menu_item_sistema').value,
        url: document.getElementById('url_menu_item_sistema').value,
        cod_menu: document.getElementById('menuSistema').value
    };
    enviar();
}

function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/Menu_Item_SistemaCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}

function agregarMenu_Item_Sistema() {
    var verificar_descripcion = $('#descripcion_menu_item_sistema').val();
    var verificar_url = $('#url_menu_item_sistema').val();
    var verificar_cod_menu = $('#menuSistema').val();

    if (verificar_descripcion.length === 0
            || verificar_url.length === 0
            || verificar_cod_menu.length === 0) {
        alert('Debe ingresar una Descripción');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarMenu_Item_Sistema() {
    var verificar_descripcion = $('#descripcion_menu_item_sistema').val();
    var verificar_url = $('#url_menu_item_sistema').val();
    var verificar_cod_menu = $('#menuSistema').val();
    var verificar_cod_menu_item = $('#codigo_menu_item_sistema').val();

    if (verificar_descripcion.length === 0
            || verificar_url.length === 0
            || verificar_cod_menu.length === 0
            || verificar_cod_menu_item.length === 0) {
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarMenu_Item_Sistema() {
    var verificar_cod_menu_item = $('#codigo_menu_item_sistema').val();
    if (verificar_cod_menu_item.length === 0) {
        alert('Debe Seleccionar el registro a ser Eliminado');
    } else {
        if (confirm('Desea eliminar el Registro')) {
            procesarJSON(3);
        } else {
            //limpiar();
        }
    }
}

function recuperarCombo_Menu_Sistema() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Menu_Item_SistemaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            //alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var valorOption = "";
            valorOption += "<option value=0>--------------------</option>";
            for (i = 0; i < json.length; i++) {
                valorOption += "<option value=" + json[i].cod_menu + ">" + json[i].descripcion + "</option>";
            }
            document.getElementById("menuSistema").innerHTML = valorOption;
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 6}));
}

function recuperarMenu_Item_Sistema() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/Menu_Item_SistemaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_menu_item_sistema').value = json[i].descripcion;
                document.getElementById('url_menu_item_sistema').value = json[i].url;
                document.getElementById('menuSistema').value = json[i].cod_menu;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_menu_item:
                document.getElementById('codigo_menu_item_sistema').value}));
    document.getElementById("descripcion_menu_item_sistema").focus();
}

function mostrarTablaMenu_Item_Sistema() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Menu_Item_SistemaCTR";
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
                filas += "<td>" + json[i].cod_menu_item + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td>" + json[i].url + "</td>";
//                filas += "<td>" + json[i].cod_menu + "</td>";
                filas += "<td>" + json[i].descripcion_menu + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_menu_item + " ,\n\
'" + json[i].descripcion + "' ,\n\
'" + json[i].url + "' ,\n\
'" + json[i].cod_menu + "',\n\
\n\'" + json[i].descripcion_menu + "',\n\
'codigo_menu_item_sistema' , \n\
'descripcion_menu_item_sistema', \n\
'url_menu_item_sistema', \n\
'menuSistema')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaMenu_Item_Sistema").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById('filtro_buscador_Menu_Item_Sistema').focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
    
}

function recuperarDeBuscador(cod_menu_item, descripcion, url, cod_menu, descripcion_menu,
        codigo_menu_item_sistema, descripcion_menu_item_sistema, url_menu_item_sistema, menuSistema) {

    document.getElementById(codigo_menu_item_sistema).value = cod_menu_item;
    document.getElementById(descripcion_menu_item_sistema).value = descripcion;
    document.getElementById(url_menu_item_sistema).value = url;
    document.getElementById(menuSistema).value = cod_menu;
    
    document.getElementById(descripcion_menu_item_sistema).disabled = false;
    document.getElementById(url_menu_item_sistema).disabled = false;
    document.getElementById(menuSistema).disabled = false;
    document.getElementById(descripcion_menu_item_sistema).focus();
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function buscadorMenu_Item_Sistema() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Menu_Item_Sistema");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaMenu_Item_Sistema");
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

function limpiar_Menu_Item_Sistema() {
    
    document.getElementById("codigo_menu_item_sistema").disabled = true;
    document.getElementById("descripcion_menu_item_sistema").disabled = true;
    document.getElementById("url_menu_item_sistema").disabled = true;
    document.getElementById("menuSistema").disabled = true;
    
    document.getElementById("form_menu_item_sistema").reset();
}

function habilitaInputMenu_Item_Sistema(descripcion_menu_item_sistema, url_menu_item_sistema, menuSistema)
{
    var descripcion = document.getElementById(descripcion_menu_item_sistema);
    var url = document.getElementById(url_menu_item_sistema);
    var menusistema = document.getElementById(menuSistema);

    descripcion.disabled = !descripcion.disabled;
    url.disabled = !url.disabled;
    menusistema.disabled = !menusistema.disabled;

    document.getElementById(descripcion_menu_item_sistema).focus();
}