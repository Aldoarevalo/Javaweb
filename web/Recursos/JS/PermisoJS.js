//recuperarComboCiudad();
cargarTablaPermisos();

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
        cod_permiso: (document.getElementById('codigo_permiso').value === '' ? 0 : document.getElementById('codigo_permiso').value),
        cod_perfil: (document.getElementById('codigo_perfil').value === '' ? 0 : document.getElementById('codigo_perfil').value),
        perfil_descripcion: document.getElementById('perfil_descripcion').value,
        lista_menu_item: listaPermisos

    };
    enviar();
}

function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/PermisoCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}

function agregarPermiso() {
//    var col = $(this).find("td").eq(2).html();
    var verificar_descripcion = $('#perfil_descripcion').val();

    if (verificar_descripcion.length === 0 
//            || document.getElementById(col).checked === false
            ) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}
function modificarPermiso() {
    procesarJSON(2);
//    limpiarEmpleado();
}
function eliminarPermiso() {
    procesarJSON(3);
//    limpiarEmpleado();
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

function recuperarPermiso() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/Menu_Item_SistemaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('perfil_descripcion').value = json[i].perfil_descripcion;
                var verifID = json[i].cod_menu_item;
                $("#cuerpoTablaPermisos  tr").each(function () {
                    var id=$(this).find("td").eq(0).html();
                    //alert(id);
                    if (id === verifID) {
                        //alert('probando');
                        $(":checkbox",this).prop("checked",true);
                    }
                });
                $('#codigo_perfil').prop("disabled", true);
                $('#perfil_descripcion').focus();
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 6, cod_perfil:
                document.getElementById('codigo_perfil').value}));
    document.getElementById("perfil_descripcion").focus();
}

function habilitaInputPermiso (perfil_descripcion){
    var descripcion = document.getElementById(perfil_descripcion);

    descripcion.disabled = !descripcion.disabled;

    document.getElementById(perfil_descripcion).focus();
}