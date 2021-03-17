function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_usuario: (document.getElementById('codigo_usuario').value === '' ? 0 : document.getElementById('codigo_usuario').value),
        usuario: document.getElementById('descripcion_usuario').value,
        clave: document.getElementById('contrasena_usuario').value,
        cod_empleado: document.getElementById('codigo_empleado').value,
        cod_departamento: document.getElementById('codigo_departamento').value,
        cod_perfil: document.getElementById('codigo_perfil').value

    };
    enviar();
}
function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/UsuarioCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}

function agregarUsuario() {
    var verificar_usuario = $('#descripcion_usuario').val();
    var verificar_contrasena = $('#contrasena_usuario').val();
    var verificar_empleado = $('#codigo_empleado').val();
    var verificar_departamento = $('#codigo_departamento').val();
    var verificar_perfil = $('#codigo_perfil').val();
    if (verificar_usuario.length === 0 || verificar_contrasena.length === 0
            || verificar_empleado.length === 0 || verificar_departamento.length === 0
            || verificar_perfil.length === 0) {
        alert('Debe completar todos los datos');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarUsuario() {
    var verificar_usuario = $('#descripcion_usuario').val();
    var verificar_contrasena = $('#contrasena_usuario').val();
    var verificar_empleado = $('#codigo_empleado').val();
    var verificar_departamento = $('#codigo_departamento').val();
    var verificar_perfil = $('#codigo_perfil').val();
    var verificar_codigo = $('#codigo_usuario').val();
    if (verificar_usuario.length === 0 || verificar_contrasena.length === 0
            || verificar_empleado.length === 0 || verificar_departamento.length === 0
            || verificar_perfil.length === 0 || verificar_codigo.length === 0) {
        alert('Debe Seleccionar el registro a ser Modificado');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarUsuario() {
    var verificar_usuario = $('#descripcion_usuario').val();
    var verificar_contrasena = $('#contrasena_usuario').val();
    var verificar_empleado = $('#codigo_empleado').val();
    var verificar_departamento = $('#codigo_departamento').val();
    var verificar_perfil = $('#codigo_perfil').val();
    var verificar_codigo = $('#codigo_usuario').val();
    if (verificar_usuario.length === 0 || verificar_contrasena.length === 0
            || verificar_empleado.length === 0 || verificar_departamento.length === 0
            || verificar_perfil.length === 0 || verificar_codigo.length === 0) {
        alert('Debe Seleccionar el registro a ser Modificado');
    } else {
        if (confirm('Confirmar la eliminación de Datos')) {
            procesarJSON(3);
        } else {
            //limpiar();
        }
    }
}

function mostrarEmpleado() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/EmpleadoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var filas = "";
            for (i = 0; i < json.length; i++) {
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_empleado + "</td>";
                filas += "<td>" + json[i].emp_ci + "</td>";
                filas += "<td>" + json[i].nombre + " " + json[i].apellido + "</td>";
                filas += "<td> <img onclick=\"recuperarEmpleado(" + json[i].cod_empleado + " ,\n\
'" + json[i].nombre + ' ' + json[i].apellido + "', \n\
'codigo_empleado' , \n\
'descripcion_empleado') \n\
\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("Tabla_Empleado").innerHTML = filas;
            document.getElementById('datos_Abuscar_Empleado').style.display = 'block';
            document.getElementById("filtro_buscador_Empleado").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarEmpleado(cod_empleado, empleado,
        codigo_empleado, descripcion_empleado) {
    document.getElementById(codigo_empleado).value = cod_empleado;
    document.getElementById(descripcion_empleado).value = empleado;
    document.getElementById('descripcion_empleado').focus();
    document.getElementById('datos_Abuscar_Empleado').style.display = 'none';
}

function mostrarDepartamento() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/DepartamentoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var filas = "";
            for (i = 0; i < json.length; i++) {
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_departamento + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDepartamento(" + json[i].cod_departamento + " , '" + json[i].descripcion + "', \n\
'codigo_departamento' , 'descripcion_departamento') \n\
\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaDepartamento").innerHTML = filas;
            document.getElementById('datos_AbuscarDepartamento').style.display = 'block';
            document.getElementById("filtro_buscadorDepartamento").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarDepartamento(cod_departamento, descripcion,
        codigo_departamento, descripcion_departamento) {
    document.getElementById(codigo_departamento).value = cod_departamento;
    document.getElementById(descripcion_departamento).value = descripcion;
    document.getElementById('descripcion_departamento').focus();
    document.getElementById('datos_AbuscarDepartamento').style.display = 'none';
}

function mostrarPerfil() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/PerfilCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var filas = "";
            for (i = 0; i < json.length; i++) {
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_perfil + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarPerfil(" + json[i].cod_perfil + " , '" + json[i].descripcion + "', \n\
'codigo_perfil' , 'descripcion_perfil') \n\
\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaPerfil").innerHTML = filas;
            document.getElementById('datos_AbuscarPerfil').style.display = 'block';
            document.getElementById("filtro_buscadorPerfil").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarPerfil(cod_perfil, descripcion,
        codigo_perfil, descripcion_perfil) {
    document.getElementById(codigo_perfil).value = cod_perfil;
    document.getElementById(descripcion_perfil).value = descripcion;
    document.getElementById('descripcion_perfil').focus();
    document.getElementById('datos_AbuscarPerfil').style.display = 'none';
}

function mostrarTablaUsuario() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/UsuarioCTR";
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
                filas += "<td>" + json[i].cod_usuario + "</td>";
                filas += "<td>" + json[i].usuario + "</td>";
//                filas += "<td>" + json[i].cod_empleado + "</td>";
                filas += "<td>" + json[i].empleado + "</td>";
//                filas += "<td>" + json[i].cod_departamento + "</td>";
                filas += "<td>" + json[i].departamento + "</td>";
//                filas += "<td>" + json[i].cod_perfil + "</td>";
                filas += "<td>" + json[i].perfil + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_usuario + " ,\n\
'" + json[i].usuario + "' ,\n\
'" + json[i].clave + "' ,\n\
'" + json[i].cod_empleado + "' ,\n\
'" + json[i].empleado + "',\n\
'" + json[i].cod_departamento + "',\n\
'" + json[i].departamento + "',\n\
'" + json[i].cod_perfil + "',\n\
'" + json[i].perfil + "',\n\
'codigo_usuario' , \n\
'descripcion_usuario', \n\
'contrasena_usuario', \n\
'codigo_empleado', \n\
'descripcion_empleado', \n\
'codigo_departamento', \n\
'descripcion_departamento', \n\
'codigo_perfil', \n\
'descripcion_perfil')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaUsuario").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Usuario").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
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

function recuperarDeBuscador(cod_usuario, usuario, clave, cod_empleado, empleado, cod_departamento, departamento, cod_perfil, perfil,
        codigo_usuario, descripcion_usuario, contrasena_usuario, codigo_empleado, descripcion_empleado, codigo_departamento, descripcion_departamento, codigo_perfil, descripcion_perfil) {

    document.getElementById(codigo_usuario).value = cod_usuario;
    document.getElementById(descripcion_usuario).value = usuario;
    document.getElementById(contrasena_usuario).value = clave;
    document.getElementById(codigo_empleado).value = cod_empleado;
    document.getElementById(descripcion_empleado).value = empleado;
    document.getElementById(codigo_departamento).value = cod_departamento;
    document.getElementById(descripcion_departamento).value = departamento;
    document.getElementById(codigo_perfil).value = cod_perfil;
    document.getElementById(descripcion_perfil).value = perfil;

    document.getElementById(codigo_usuario).disabled = false;
    document.getElementById(descripcion_usuario).disabled = false;
    document.getElementById(contrasena_usuario).disabled = false;
    document.getElementById(codigo_empleado).disabled = false;
//    document.getElementById(descripcion_empleado).disabled = false;
    document.getElementById(codigo_departamento).disabled = false;
//    document.getElementById(descripcion_departamento).disabled = false;
    document.getElementById(codigo_perfil).disabled = false;
//    document.getElementById(descripcion_perfil).disabled = false;

    document.getElementById(descripcion_usuario).focus();

    document.getElementById('datos_Abuscar').style.display = 'none';
}

function habilitaInputUsuario(descripcion_usuario, contrasena_usuario, codigo_empleado, codigo_departamento, codigo_perfil) {
    var usuario = document.getElementById(descripcion_usuario);
    var clave = document.getElementById(contrasena_usuario);
    var empleado = document.getElementById(codigo_empleado);
    var departamento = document.getElementById(codigo_departamento);
    var perfil = document.getElementById(codigo_perfil);

    usuario.disabled = !usuario.disabled;
    clave.disabled = !clave.disabled;
    empleado.disabled = !empleado.disabled;
    departamento.disabled = !departamento.disabled;
    perfil.disabled = !perfil.disabled;

    document.getElementById(descripcion_usuario).focus();
}

function limpiarUsuario() {
    document.getElementById("form_usuario").reset();

    document.getElementById("codigo_usuario").disabled = true;
    document.getElementById("descripcion_usuario").disabled = true;
    document.getElementById("contrasena_usuario").disabled = true;
    document.getElementById("codigo_empleado").disabled = true;
    document.getElementById("descripcion_empleado").disabled = true;
    document.getElementById("codigo_departamento").disabled = true;
    document.getElementById("descripcion_departamento").disabled = true;
    document.getElementById("codigo_perfil").disabled = true;
    document.getElementById("descripcion_perfil").disabled = true;
}