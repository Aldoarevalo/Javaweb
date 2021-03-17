//alert('conecta con el html');
cargarTablaPermisos();
var lista=[];
function procesarJSON(bandera) {
    var listaPermisos = [];
    $("#cuerpoTablaPermisos  tr").each(function () {
        //push => Agrega un nuevo elemento al Array [listaProductos]
        var id = $(this).find("td").eq(0).html();
        // alert(document.getElementById(id).checked);
        if (document.getElementById(id).checked === true) {
            // alert($(this).find("td").eq(0).html());
            listaPermisos.push({
                cod_menu_item: $(this).find("td").eq(0).html()
            });
        }
    });
    valores = {
        bandera: bandera,
        cod_perfil: (document.getElementById('codigo_perfil').value === '' ? 0 : document.getElementById('codigo_perfil').value),
        descripcion: document.getElementById('descripcion_perfil').value,
        listaMenuitem: listaPermisos
    };
    enviar();
}
function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/PerfilCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));

}
function agregarPerfil() {
    var verificar_descripcion = $('#descripcion_perfil').val();

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

function modificarPerfil() {
    var verificar_descripcion = $('#descripcion_perfil').val();
    var verificar_codigo = $('#codigo_perfil').val();
    if (verificar_descripcion.length === 0 || verificar_codigo.length === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarPerfil() {
    var verificar_codigo = $('#codigo_perfil').val();
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

function recuperarPerfil() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/PermisoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert("llega: "+xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;

            for (i = 0; i < json.length; i++) {
//                document.getElementById('descripcion_perfil').value = json[i].descripcion;
                var verifID = json[i].cod_menu_item;

                $("#cuerpoTablaPermisos  tr").each(function () {
                    var id = $(this).find("td").eq(0).html();
//                    alert(id);
                    if (id == verifID) {
//                        alert('probando');
                        $(":checkbox", this).prop("checked", true);
                    }
                });
//                $('#codigo_perfil').prop("disabled", true);
//                $('#descripcion_perfil').focus();
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 6, cod_perfil:
                document.getElementById('codigo_perfil').value}));
}

function mostrarTablaPerfil() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/PerfilCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var opcionL = "";
            var filas = "";
            for (i = 0; i < json.length; i++) {
                opcionL += "<option value= " + json[i].cod_perfil + "> " +
                        json[i].descripcion + " </option>";
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_perfil + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_perfil + " ,'" + json[i].descripcion + "' , 'codigo_perfil' , 'descripcion_perfil')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";

            }
            document.getElementById("TablaPerfil").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Perfil").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorPerfil() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Perfil");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaPerfil");
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

function recuperarDeBuscador(cod_perfil, descripcion, codigo_perfil, descripcion_perfil) {
    document.getElementById(codigo_perfil).value = cod_perfil;
    document.getElementById(descripcion_perfil).value = descripcion;
    document.getElementById(descripcion_perfil).disabled = false;
    document.getElementById(codigo_perfil).focus();
    recuperarPerfil();

    document.getElementById('datos_Abuscar').style.display = 'none';

//    recuperarPerfil();
}

function  limpiarPerfil() {
    document.getElementById("form_perfil").reset();

    document.getElementById("codigo_perfil").disabled = true;
    document.getElementById("descripcion_perfil").disabled = true;
}

function habilitaInputPerfil(descripcion_perfil)
{
    var perfil = document.getElementById(descripcion_perfil);
    perfil.disabled = !perfil.disabled;

    document.getElementById(descripcion_perfil).focus();
}

function  cargarTablaPermisos() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Menu_Item_SistemaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            //alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var valorTabla = "";
            for (i = 0; i < json.length; i++) {

                //mecanismo para cargar tabla
                valorTabla += "<tr>" +
                        "<td>" + json[i].cod_menu_item + "</td>" +
                        "<td>" + json[i].descripcion + "</td>" +
                        "<td><input type=\"checkbox\" id= " + json[i].cod_menu_item + "> </td>" +
                        "</tr>";
            }
            document.getElementById("cuerpoTablaPermisos").innerHTML = valorTabla;
        }

    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}