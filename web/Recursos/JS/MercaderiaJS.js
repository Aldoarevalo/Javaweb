function procesarJSON(bandera) {
//    alert(" precio " + document.getElementById('precio_unitario').value);
    valores = {
        bandera: bandera,
        cod_mercaderia: (document.getElementById('codigo_mercaderia').value === '' ? 0 : document.getElementById('codigo_mercaderia').value),
        articulo: document.getElementById('descripcion_mercaderia').value,
        cantidad: document.getElementById('cantidad_mercaderia').value,
        cod_medida: document.getElementById('codigo_unidad_medida').value,
        precio_unitario: document.getElementById('precio_unitario').value,
        cod_moneda: document.getElementById('codigo_moneda').value,
        cod_marca: document.getElementById('codigo_marca').value,
        cod_deposito: document.getElementById('codigo_deposito').value,
        cod_sucursal: document.getElementById('codigo_sucursal').value,
        cod_impuesto: document.getElementById('codigo_impuesto').value
    };
    enviar();
}

function enviar() {
    var xmlhttp = new XMLHttpRequest(); // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/MercaderiaCTR"); // tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}

function agregarMercaderia() {
    var verificar_descripcion = $('#descripcion_mercaderia').val();
    var verificar_cantidad = $('#cantidad_mercaderia').val();
    var verificar_cod_medida = $('#codigo_unidad_medida').val();
    var verificar_precio_unitario = $('#precio_unitario').val();
    var verificar_cod_moneda = $('#codigo_moneda').val();
    var verificar_cod_marca = $('#codigo_marca').val();
    var verificar_cod_deposito = $('#codigo_deposito').val();
    var verificar_cod_sucursal = $('#codigo_sucursal').val();
    var verificar_cod_impuesto = $('#codigo_impuesto').val();

    if (verificar_descripcion.length === 0 || verificar_cantidad.length === 0
            || verificar_cod_medida.length === 0 || verificar_precio_unitario.length === 0
            || verificar_cod_moneda.length === 0 || verificar_cod_marca.length === 0
            || verificar_cod_deposito.length === 0 || verificar_cod_sucursal.length === 0
            || verificar_cod_impuesto.length === 0) {
        alert('Debe ingresar una Descripción');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
//limpiar();
        }
    }
}

function modificarMercaderia() {
    var verificar_descripcion = $('#descripcion_mercaderia').val();
    var verificar_cantidad = $('#cantidad_mercaderia').val();
    var verificar_cod_medida = $('#codigo_unidad_medida').val();
    var verificar_precio_unitario = $('#precio_unitario').val();
    var verificar_cod_moneda = $('#codigo_moneda').val();
    var verificar_cod_marca = $('#codigo_marca').val();
    var verificar_cod_deposito = $('#codigo_deposito').val();
    var verificar_cod_sucursal = $('#codigo_sucursal').val();
    var verificar_cod_impuesto = $('#codigo_impuesto').val();
    var verificar_cod_mercaderia = $('#codigo_mercaderia').val();

    if (verificar_descripcion.length === 0 || verificar_cantidad.length === 0
            || verificar_cod_medida.length === 0 || verificar_precio_unitario.length === 0
            || verificar_cod_moneda.length === 0 || verificar_cod_marca.length === 0
            || verificar_cod_deposito.length === 0 || verificar_cod_sucursal.length === 0
            || verificar_cod_impuesto.length === 0 || verificar_cod_mercaderia.length === 0) {
        alert('Debe Seleccionar el registro a ser Modificado');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarMercaderia() {
    var verificar_cod_mercaderia = $('#codigo_mercaderia').val();
    if (verificar_cod_mercaderia.length === 0) {
        alert('Debe Seleccionar el registro a ser Eliminado');
    } else {
        if (confirm('Desea eliminar el Registro')) {
            procesarJSON(3);
        } else {
            //limpiar();
        }
    }
}

function recuperarMercaderia() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/MercaderiaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
//                document.getElementById('codigo_mercaderia').value = json[i].cod_mercaderia;
                document.getElementById('descripcion_mercaderia').value = json[i].articulo;
                document.getElementById('cantidad_mercaderia').value = json[i].cantidad;
                document.getElementById('codigo_unidad_medida').value = json[i].cod_medida;
                document.getElementById('unidad_medida').value = json[i].descripcion_medida;
                document.getElementById('precio_unitario').value = json[i].precio_unitario;
                document.getElementById('codigo_moneda').value = json[i].cod_moneda;
                document.getElementById('moneda').value = json[i].descripcion_moneda;
                document.getElementById('codigo_deposito').value = json[i].cod_deposito;
                document.getElementById('deposito').value = json[i].descripcion_deposito;
                document.getElementById('codigo_sucursal').value = json[i].cod_sucursal;
                document.getElementById('sucursal').value = json[i].descripcion_sucursal;
                document.getElementById('codigo_impuesto').value = json[i].cod_impuesto;
                document.getElementById('impuesto').value = json[i].descripcion_impuesto;
                document.getElementById('codigo_marca').value = json[i].cod_marca;
                document.getElementById('marca').value = json[i].descripcion_marca;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_mercaderia:
                document.getElementById('codigo_mercaderia').value}));
    document.getElementById("descripcion_mercaderia").focus();
}

function mostrarTablaUnidadMedida() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Unidad_MedidaCTR";
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
                filas += "<td>" + json[i].cod_medida + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDescripcionMedida(" + json[i].cod_medida + " ,\n\
'" + json[i].descripcion + "' ,\n\
'codigo_unidad_medida', 'unidad_medida')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaUnidad_Medida").innerHTML = filas;
            document.getElementById('datos_Abuscar_Unidad_Medida').style.display = 'block';
            document.getElementById('filtro_buscador_Unidad_Medida').focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function mostrarTablaMoneda() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/MonedaCTR";
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
                filas += "<td>" + json[i].cod_moneda + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDescripcionMoneda(" + json[i].cod_moneda + " ,\n\
'" + json[i].descripcion + "' ,\n\
'codigo_moneda', 'moneda')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaMoneda").innerHTML = filas;
            document.getElementById('datos_Abuscar_Moneda').style.display = 'block';
            document.getElementById('filtro_buscador_Moneda').focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function mostrarTablaDepositoMercaderia() {
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
                filas += "<td> <img onclick=\"recuperarDescripcionDeposito(" + json[i].cod_deposito + " ,\n\
'" + json[i].descripcion + "' ,\n\
'codigo_deposito', 'deposito')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("Tabla_Deposito").innerHTML = filas;
            document.getElementById('datos_Abuscar_Deposito').style.display = 'block';
            document.getElementById('filtro_buscador_Deposito').focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function mostrarTablaSucursalMercaderia() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/SucursalCTR";
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
                filas += "<td>" + json[i].cod_sucursal + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDescripcionSucursal(" + json[i].cod_sucursal + " ,\n\
'" + json[i].descripcion + "' ,\n\
'codigo_sucursal', 'sucursal')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("Tabla_Sucursal").innerHTML = filas;
            document.getElementById('datos_Abuscar_Sucursal').style.display = 'block';
            document.getElementById('filtro_buscador_Sucursal').focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function mostrarTablaImpuestoMercaderia() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/ImpuestoCTR";
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
                filas += "<td>" + json[i].cod_impuesto + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDescripcionImpuesto(" + json[i].cod_impuesto + " ,\n\
'" + json[i].descripcion + "' ,\n\
'codigo_impuesto', 'impuesto')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("Tabla_Impuesto").innerHTML = filas;
            document.getElementById('datos_Abuscar_Impuesto').style.display = 'block';
            document.getElementById('filtro_buscador_Impuesto').focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function mostrarTablaMarcaMercaderia() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/MarcaCTR";
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
                filas += "<td>" + json[i].cod_marca + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDescripcionMarca(" + json[i].cod_marca + " ,\n\
'" + json[i].descripcion + "' ,\n\
'codigo_marca', 'marca')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("Tabla_Marca").innerHTML = filas;
            document.getElementById('datos_Abuscar_Marca').style.display = 'block';
            document.getElementById('filtro_buscador_Marca').focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function mostrarTablaMercaderia() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/MercaderiaCTR";
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
                filas += "<td>" + json[i].cod_mercaderia + "</td>";
                filas += "<td>" + json[i].articulo + "</td>";
                filas += "<td>" + json[i].cantidad + "</td>";
                filas += "<td>" + json[i].descripcion_medida + "</td>";
                filas += "<td>" + json[i].precio_unitario + "</td>";
                filas += "<td>" + json[i].descripcion_marca + "</td>";
                filas += "<td>" + json[i].descripcion_deposito + "</td>";
                filas += "<td>" + json[i].descripcion_sucursal + "</td>";
                filas += "<td>" + json[i].descripcion_impuesto + "</td>";
                filas += "<td>" + json[i].descripcion_moneda + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(\n\
" + json[i].cod_mercaderia + " ,\n\
'" + json[i].articulo + "' ,\n\
'" + json[i].cantidad + "' ,\n\
'" + json[i].cod_medida + "',\n\
'" + json[i].descripcion_medida + "',\n\
'" + json[i].precio_unitario + "',\n\
'" + json[i].cod_marca + "',\n\
'" + json[i].descripcion_marca + "',\n\
'" + json[i].cod_deposito + "',\n\
'" + json[i].descripcion_deposito + "',\n\
'" + json[i].cod_sucursal + "',\n\
'" + json[i].descripcion_sucursal + "',\n\
'" + json[i].cod_impuesto + "',\n\
'" + json[i].descripcion_impuesto + "',\n\
'" + json[i].cod_moneda + "',\n\
'" + json[i].descripcion_moneda + "',\n\
'codigo_mercaderia',\n\
'descripcion_mercaderia',\n\
'cantidad_mercaderia',\n\
'codigo_unidad_medida',\n\
'unidad_medida',\n\
'precio_unitario',\n\
'codigo_marca',\n\
'marca',\n\
'codigo_impuesto',\n\
'deposito',\n\
'codigo_sucursal',\n\
'sucursal',\n\
'codigo_deposito',\n\
'impuesto',\n\
'codigo_moneda',\n\
'moneda',\n\)\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaMercaderia").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Mercaderia").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorMercaderia() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Mercaderia");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaMercaderia");
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

function recuperarDeBuscador(cod_mercaderia, articulo, cantidad, cod_medida, descripcion_medida, precio,
        cod_marca, descripcion_marca, cod_deposito, descripcion_deposito, cod_sucursal, descripcion_sucursal,
        cod_impuesto, descripcion_impuesto, cod_moneda, descripcion_moneda,
        codigo_mercaderia, descripcion_mercaderia, cantidad_mercaderia, codigo_unidad_medida, unidad_medida, precio_unitario,
        codigo_marca, marca, codigo_deposito, deposito, codigo_sucursal, sucursal, codigo_impuesto, impuesto, codigo_moneda, moneda) {

    document.getElementById(codigo_mercaderia).value = cod_mercaderia;
    document.getElementById(descripcion_mercaderia).value = articulo;
    document.getElementById(cantidad_mercaderia).value = cantidad;
    document.getElementById(codigo_unidad_medida).value = cod_medida;
    document.getElementById(unidad_medida).value = descripcion_medida;
    document.getElementById(precio_unitario).value = precio;
    document.getElementById(codigo_marca).value = cod_marca;
    document.getElementById(marca).value = descripcion_marca;
    document.getElementById(codigo_deposito).value = cod_deposito;
    document.getElementById(deposito).value = descripcion_deposito;
    document.getElementById(codigo_sucursal).value = cod_sucursal;
    document.getElementById(sucursal).value = descripcion_sucursal;
    document.getElementById(codigo_impuesto).value = cod_impuesto;
    document.getElementById(impuesto).value = descripcion_impuesto;
    document.getElementById(codigo_moneda).value = cod_moneda;
    document.getElementById(moneda).value = descripcion_moneda;
    habilitaInputMercaderia('descripcion_mercaderia',
            'cantidad_mercaderia', 'codigo_unidad_medida', 'precio_unitario', 'codigo_moneda', 'codigo_marca', 'codigo_deposito',
            'codigo_sucursal', 'codigo_impuesto');
    document.getElementById(descripcion_mercaderia).focus();
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function recuperarDescripcionMedida(cod_medida, descripcion,
        codigo_unidad_medida, unidad_medida) {

    document.getElementById(codigo_unidad_medida).value = cod_medida;
    document.getElementById(unidad_medida).value = descripcion;
    document.getElementById('precio_unitario').focus();
    document.getElementById('datos_Abuscar_Unidad_Medida').style.display = 'none';
}

function recuperarDescripcionMoneda(cod_moneda, descripcion,
        codigo_moneda, moneda) {

    document.getElementById(codigo_moneda).value = cod_moneda;
    document.getElementById(moneda).value = descripcion;
    document.getElementById('moneda').focus();
    document.getElementById('datos_Abuscar_Moneda').style.display = 'none';
}

function recuperarDescripcionDeposito(cod_deposito, descripcion,
        codigo_deposito, deposito) {

    document.getElementById(codigo_deposito).value = cod_deposito;
    document.getElementById(deposito).value = descripcion;
    document.getElementById('deposito').focus();
    document.getElementById('datos_Abuscar_Deposito').style.display = 'none';
}

function recuperarDescripcionSucursal(cod_sucursal, descripcion,
        codigo_sucursal, sucursal) {

    document.getElementById(codigo_sucursal).value = cod_sucursal;
    document.getElementById(sucursal).value = descripcion;
    document.getElementById('sucursal').focus();
    document.getElementById('datos_Abuscar_Sucursal').style.display = 'none';
}

function recuperarDescripcionImpuesto(cod_impuesto, descripcion,
        codigo_impuesto, impuesto) {

    document.getElementById(codigo_impuesto).value = cod_impuesto;
    document.getElementById(impuesto).value = descripcion;
    document.getElementById('impuesto').focus();
    document.getElementById('datos_Abuscar_Impuesto').style.display = 'none';
}

function recuperarDescripcionMarca(cod_marca, descripcion,
        codigo_marca, marca) {

    document.getElementById(codigo_marca).value = cod_marca;
    document.getElementById(marca).value = descripcion;
    document.getElementById('marca').focus();
    document.getElementById('datos_Abuscar_Marca').style.display = 'none';
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

function limpiarMercaderia() {
//    document.getElementById("descripcion_mercaderia").disabled = true;
//    document.getElementById("cantidad_mercaderia").disabled = true;
//    document.getElementById("").disabled = true;
//    document.getElementById("").disabled = true;
//    document.getElementById("").disabled = true;
//    document.getElementById("").disabled = true;
//    document.getElementById("").disabled = true;
//    document.getElementById("").disabled = true;


    document.getElementById("form_mercaderia").reset();
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

function habilitaInputMercaderia(articulo, cantidad_mercaderia, codigo_unidad_medida, precion_unitario,
        codigo_moneda, codigo_deposito, codigo_sucursal, codigo_impuesto, codigo_marca)
{
    var descripcion = document.getElementById(articulo);
    var cantidad = document.getElementById(cantidad_mercaderia);
    var unidad_medida = document.getElementById(codigo_unidad_medida);
    var precio = document.getElementById(precion_unitario);
    var moneda = document.getElementById(codigo_moneda);
    var deposito = document.getElementById(codigo_deposito);
    var sucursal = document.getElementById(codigo_sucursal);
    var impuesto = document.getElementById(codigo_impuesto);
    var marca = document.getElementById(codigo_marca);

    descripcion.disabled = !descripcion.disabled;
    cantidad.disabled = !cantidad.disabled;
    unidad_medida.disabled = !unidad_medida.disabled;
    precio.disabled = !precio.disabled;
    moneda.disabled = !moneda.disabled;
    deposito.disabled = !deposito.disabled;
    sucursal.disabled = !sucursal.disabled;
    impuesto.disabled = !impuesto.disabled;
    marca.disabled = !marca.disabled;

    document.getElementById(articulo).focus();
}