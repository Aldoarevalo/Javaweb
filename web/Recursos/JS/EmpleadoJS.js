//alert('conecta con el html');
recuperarComboCiudad();
recuperarComboNacionalidad();
//cargarTabla();

function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_empleado: (document.getElementById('codigo_empleado').value === '' ? 0 : document.getElementById('codigo_empleado').value),
        emp_ci: document.getElementById('ci').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value,
        cod_ciudad: document.getElementById('menuCiudad').value,
        fecha_nac: document.getElementById('fecha_nac').value,
        cod_nacionalidad: document.getElementById('menuNacionalidad').value
    };
//    alert(valores);
    enviar();
}

function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/EmpleadoCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}

function agregarEmpleado() {
    var verificar_ci = $('#ci').val();
    var verificar_nombre = $('#nombre').val();
    var verificar_apellido = $('#apellido').val();
    var verificar_fecha_nac = $('#fecha_nac').val();
    var verificar_telefono = $('#telefono').val();
    var verificar_direccion = $('#direccion').val();
    var verificar_ciudad = $('#menuCiudad').val();
    var verificar_nacionalidad = $('#menuNacionalidad').val();

    if (verificar_ci.length === 0 || verificar_nombre.length === 0
            || verificar_apellido.length === 0 || verificar_fecha_nac.length === 0
            || verificar_telefono === 0 || verificar_direccion === 0
            || verificar_ciudad === 0 || verificar_nacionalidad === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarEmpleado() {
    var verificar_ci = $('#ci').val();
    var verificar_nombre = $('#nombre').val();
    var verificar_apellido = $('#apellido').val();
    var verificar_fecha_nac = $('#fecha_nac').val();
    var verificar_telefono = $('#telefono').val();
    var verificar_direccion = $('#direccion').val();
    var verificar_ciudad = $('#menuCiudad').val();
    var verificar_nacionalidad = $('#menuNacionalidad').val();
    var verificar_codigo = $('#codigo_empleado').val();

    if (verificar_ci.length === 0 || verificar_nombre.length === 0
            || verificar_apellido.length === 0 || verificar_fecha_nac.length === 0
            || verificar_telefono === 0 || verificar_direccion === 0
            || verificar_ciudad === 0 || verificar_nacionalidad === 0
            || verificar_codigo === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarEmpleado() {
    var verificar_codigo = $('#codigo_empleado').val();
    if (verificar_codigo.length === 0) {
        alert('Debe Seleccionar el registro a ser Eliminado');
    } else {
        if (confirm('Confirmar la eliminación de Datos')) {
            procesarJSON(3);
        } else {
            //limpiar();
        }
    }
}

function recuperarEmpleado() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/EmpleadoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('ci').value = json[i].emp_ci;
                document.getElementById('nombre').value = json[i].nombre;
                document.getElementById('apellido').value = json[i].apellido;
                document.getElementById('fecha_nac').value = json[i].fecha_nac;
                document.getElementById('telefono').value = json[i].telefono;
                document.getElementById('direccion').value = json[i].direccion;
                document.getElementById('menuCiudad').value = json[i].cod_ciudad;
                document.getElementById('menuNacionalidad').value = json[i].cod_nacionalidad;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_empleado:
                document.getElementById('codigo_empleado').value}));
    document.getElementById("ci").focus();
}

function recuperarComboCiudad() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/EmpleadoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            //alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var valorOption = "";
            valorOption += "<option value=0>--------------------</option>";
            for (i = 0; i < json.length; i++) {
                valorOption += "<option value=" + json[i].cod_ciudad + ">" + json[i].descripcion + "</option>";
            }
            document.getElementById("menuCiudad").innerHTML = valorOption;
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 6}));
}

function recuperarComboNacionalidad() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/EmpleadoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            //alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var valorOption = "";
            valorOption += "<option value=0>--------------------</option>"
            for (i = 0; i < json.length; i++) {
                valorOption += "<option value=" + json[i].cod_nacionalidad + ">" + json[i].descripcion + "</option>";
            }
            document.getElementById("menuNacionalidad").innerHTML = valorOption;
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 7}));
}

function mostrarTablaEmp() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/EmpleadoCTR";
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
                filas += "<td>" + json[i].cod_empleado + "</td>";
                filas += "<td>" + json[i].emp_ci + "</td>";
                filas += "<td>" + json[i].nombre + "</td>";
                filas += "<td>" + json[i].apellido + "</td>";
                filas += "<td>" + json[i].fecha_nac + "</td>";
                filas += "<td>" + json[i].telefono + "</td>";
                filas += "<td>" + json[i].direccion + "</td>";
//                filas += "<td>" + json[i].cod_ciudad + "</td>";
                filas += "<td>" + json[i].ciudad_descripcion + "</td>";
//                filas += "<td>" + json[i].cod_nacionalidad + "</td>";
                filas += "<td>" + json[i].nacionalidad_descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_empleado + " ,\n\
'" + json[i].emp_ci + "' ,\n\
'" + json[i].nombre + "' ,\n\
'" + json[i].apellido + "',\n\
'" + json[i].fecha_nac + "',\n\
'" + json[i].telefono + "',\n\
'" + json[i].direccion + "',\n\
'" + json[i].cod_ciudad + "',\n\
'" + json[i].ciudad_descripcion + "',\n\
'" + json[i].cod_nacionalidad + "',\n\
'" + json[i].nacionalidad_descripcion + "',\n\
'codigo_empleado' , \n\
'ci', \n\
'nombre', \n\
'apellido', \n\
'fecha_nac', \n\
'telefono', \n\
'direccion', \n\
'menuCiudad', \n\
'menuNacionalidad')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaEmpleado").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Empleado").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorEmpleado() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Empleado");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaEmpleado");
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

function recuperarDeBuscador(cod_empleado, emp_ci, nombre, apellido, fecha_nac, telefono, direccion, cod_ciudad, ciudad_descripcion, cod_nacionalidad, nacionalidad_descripcion,
        codigo_empleado, ci_emp, nombre_emp, apellido_emp, fecha_nac_emp, telefono_emp, direccion_emp, menuCiudad, menuNacionalidad) {

    document.getElementById(codigo_empleado).disabled = true;
    document.getElementById(ci_emp).disabled = false;
    document.getElementById(nombre_emp).disabled = false;
    document.getElementById(apellido_emp).disabled = false;
    document.getElementById(fecha_nac_emp).disabled = false;
    document.getElementById(telefono_emp).disabled = false;
    document.getElementById(direccion_emp).disabled = false;
    document.getElementById(menuCiudad).disabled = false;
    document.getElementById(menuNacionalidad).disabled = false;

    document.getElementById(codigo_empleado).value = cod_empleado;
    document.getElementById(ci_emp).value = emp_ci;
    document.getElementById(nombre_emp).value = nombre;
    document.getElementById(apellido_emp).value = apellido;
    
    var date = fecha_nac;
    var newDate = date.split("/").reverse().join("-");
//    alert(newDate);
    document.getElementById(fecha_nac_emp).value = newDate;
    
    
    document.getElementById(telefono_emp).value = telefono;
    document.getElementById(direccion_emp).value = direccion;
    document.getElementById(menuCiudad).value = cod_ciudad;
//    document.getElementById(menuCiudad).value = ciudad_descripcion;
    document.getElementById(menuNacionalidad).value = cod_nacionalidad;
//    document.getElementById(menuNacionalidad).value = nacionalidad_descripcion;
    document.getElementById(ci_emp).focus();
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function limpiarEmpleado() {
    document.getElementById("codigo_empleado").disabled = true;
    document.getElementById("ci").disabled = true;
    document.getElementById("nombre").disabled = true;
    document.getElementById("apellido").disabled = true;
    document.getElementById("fecha_nac").disabled = true;
    document.getElementById("telefono").disabled = true;
    document.getElementById("direccion").disabled = true;
    document.getElementById("menuCiudad").disabled = true;
    document.getElementById("menuNacionalidad").disabled = true;

    document.getElementById("form_empleado").reset();
}

function mayus(e) {
    e.value = e.value.toUpperCase();
}

function habilitaInputEmpleado(ci_emp, nombre_emp, apellido_emp, fecha_nac_emp, telefono_emp, direccion_emp, menuCiudad, menuNacionalidad)
{
    var ci = document.getElementById(ci_emp);
    var nombre = document.getElementById(nombre_emp);
    var apellido = document.getElementById(apellido_emp);
    var fecha_nac = document.getElementById(fecha_nac_emp);
    var telefono = document.getElementById(telefono_emp);
    var direccion = document.getElementById(direccion_emp);
    var ciudad = document.getElementById(menuCiudad);
    var nacionalidad = document.getElementById(menuNacionalidad);

    ci.disabled = !ci.disabled;
    nombre.disabled = !nombre.disabled;
    apellido.disabled = !apellido.disabled;
    fecha_nac.disabled = !fecha_nac.disabled;
    telefono.disabled = !telefono.disabled;
    direccion.disabled = !direccion.disabled;
    ciudad.disabled = !ciudad.disabled;
    nacionalidad.disabled = !nacionalidad.disabled;

    document.getElementById(ci_emp).focus();
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