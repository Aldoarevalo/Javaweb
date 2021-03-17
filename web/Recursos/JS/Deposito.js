recuperarComboSucursal();

function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_deposito: (document.getElementById('codigo_deposito').value === '' ? 0 : document.getElementById('codigo_deposito').value),
        descripcion: document.getElementById('nombre_deposito').value,
        cod_sucursal: document.getElementById('menuSucursal').value
    };
    enviar();
}

function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/DepositoCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}

function agregarDeposito() {
    var verificar_1 = $('#nombre_deposito').val();
    var verificar_2 = $('#menuSucursal').val();

    if (verificar_1.length === 0 || verificar_2 === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarDeposito() {
    var verificar_1 = $('#nombre_deposito').val();
    var verificar_2 = $('#menuSucursal').val();
    var verificar_3 = $('#codigo_deposito').val();

    if (verificar_1.length === 0 || verificar_2 === 0 || verificar_3.length === 0) {

        alert('No puede quedar ningún campo vacío');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarDeposito() {
    var verificar_3 = $('#codigo_deposito').val();
    if (verificar_3.length === 0) {
        alert('Debe Seleccionar el registro a ser Eliminado');
    } else {
        if (confirm('Confirmar la eliminación de Datos')) {
            procesarJSON(3);
        } else {
            //limpiar();
        }
    }
}

function recuperarDeposito() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/DepositoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('nombre_deposito').value = json[i].descripcion;
                document.getElementById('menuSucursal').value = json[i].cod_sucursal;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_deposito:
                document.getElementById('codigo_deposito').value}));
    document.getElementById("nombre_deposito").focus();
}

function mostrarTablaDeposito() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/DepositoCTR";
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
                filas += "<td>" + json[i].cod_deposito + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
//                filas += "<td>" + json[i].cod_sucursal + "</td>";
                filas += "<td>" + json[i].sucursal_descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_deposito + " ,\n\
'" + json[i].descripcion + "' ,\n\
'" + json[i].cod_sucursal + "',\n\
'" + json[i].sucursal_descripcion + "',\n\
'codigo_deposito' , \n\
'nombre_deposito', \n\
'menuSucursal')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaDeposito").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Deposito").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarDeBuscador(cod_deposito, descripcion, cod_sucursal, sucursal_descripcion,
        codigo_deposito, nombre_deposito, menuSucursal) {

    document.getElementById(codigo_deposito).value = cod_deposito;
    document.getElementById(nombre_deposito).value = descripcion;
    document.getElementById(menuSucursal).value = cod_sucursal;
    
    document.getElementById(nombre_deposito).disabled = false;
    document.getElementById(menuSucursal).disabled = false;
    document.getElementById(nombre_deposito).focus();
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function buscadorDeposito() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Deposito");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaDeposito");
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

function recuperarComboSucursal() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/DepositoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            //alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var valorOption = "";
            valorOption += "<option value=0>--------------------</option>";
            for (i = 0; i < json.length; i++) {
                valorOption += "<option value=" + json[i].cod_sucursal + ">" + json[i].descripcion + "</option>";
            }
            document.getElementById("menuSucursal").innerHTML = valorOption;
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 6}));
}

function limpiarDeposito() {
    document.getElementById("codigo_deposito").disabled = true;
    document.getElementById("nombre_deposito").disabled = true;
    document.getElementById("menuSucursal").disabled = true;

    document.getElementById("form_deposito").reset();
}

function mayus(e) {
    e.value = e.value.toUpperCase();
}

function habilitaInputDeposito(Descripcion, Combo)
{
    var descripcion = document.getElementById(Descripcion);
    var combo = document.getElementById(Combo);

    descripcion.disabled = !descripcion.disabled;
    combo.disabled = !combo.disabled;

    document.getElementById(Descripcion).focus();
}