var pedidoJSON;
var jsonCabDet;

function agregarFilaPedidos() {
    var acu;
    var tindex;
    var filasPedidos;

    var cod = document.getElementById('codproducto').value;
    var des = document.getElementById('descrip_producto').value;
    var cant = document.getElementById('cantidad_producto').value;
    var precio = document.getElementById('precio_producto').value;
    var calculo = cant * precio;

    acu += calculo;
    document.getElementById('montototalpedido').value = acu;
    tindex++;
//    filasPedidos="<tr id=\'prod" + tindex + "\'>\n\
//            <td style=' width: 5%;'>" + cod + "</td>\n\
//            <td style=' width: 60%;'>" + des + "</td>\n\
//            <td style=' width: 5%;'>" + cant + "</td>\n\
//            <td style=' width: 25%;'>" + calculo + "</td>\n\
//            <td style=' width: 5%;'><img onclick=\"$(\'#prod" + tindex + "\').remove();updateMonto(" + calculo + "," + tindex + ")\" src='../Recursos/img/update.png'/></td>\n\
//            <td style=' width: 5%;'><img onclick=\"$(\'#prod" + tindex + "\').remove();updateMonto(" + calculo + "," + tindex + ")\" src='../Recursos/img/delete.png'/></td>\n\
//      </tr>";
//    
//    document.getElementById('tabladetalleproductos').innerHTML=filasPedidos;


    $('#tabladetalleproductos').append("<tr id=\'prod" + tindex + "\'>\n\
            <td style=' width: 5%;'>" + cod + "</td>\n\
            <td style=' width: 60%;'>" + des + "</td>\n\
            <td style=' width: 5%;'>" + cant + "</td>\n\
            <td style=' width: 25%;'>" + calculo + "</td>\n\
            <td style=' width: 5%;'><img onclick=\"$(\'#prod" + tindex + "\').remove();updateMonto(" + calculo + "," + tindex + ")\" src='../Recursos/img/update.png'/></td>\n\
            <td style=' width: 5%;'><img onclick=\"$(\'#prod" + tindex + "\').remove();updateMonto(" + calculo + "," + tindex + ")\" src='../Recursos/img/delete.png'/></td>\n\
      </tr>");
}


function prepararJsonPedidos() {
    var listaProductos = [];
    $("#tabladetalleproductos  tr").each(function () {
        //push => Agrega un nuevo elemento al Array [listaProductos]
        listaProductos.push({
            id: $(this).find("td").eq(0).html(),
            cantidad: $(this).find("td").eq(2).html()
        });
    });

    pedidoJSON = {
        "bandera": 1,
        "id": $('#codigo_presupuesto').val().length <= 0 ? "0" : $('#codigo_presupuesto').val(),
        "id_usuario": $('#codigo_usuario').val().length <= 0 ? "0" : $('#codigo_usuario').val(),
        "fecha": $('#dat_fecha').val().length <= 0 ? "0" : $('#dat_fecha').val(),
        "obsv": $('#obsv_presupuesto').val().length <= 0 ? "0" : $('#obsv_presupuesto').val(),
        "lista_productos": listaProductos.length <= 0 ? "0" : listaProductos
    };

    // El método JSON.stringify() convierte un valor dado en javascript
    // a una cadena  JSON 
    // JSON.stringify(pedidoJSON);
    envioCabDet();
}

///GenerarPedidosCTRL
function envioCabDet() {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", "/LaboratorioLPIII/GenerarPedidosCTRL");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(pedidoJSON));
}

function anularPedido() {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", "/LaboratorioLPIII/GenerarPedidosCTRL");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(datos = {bandera: 3, id: $('#codigo_presupuesto').val()}));
}

function RecuperarCabDet() {
    // alert("Llegamos...");
    // 1. Instantiate XHR - Start 
    var xhr;
    if (window.XMLHttpRequest)//verifica que el navegador tenga soporte
        xhr = new XMLHttpRequest();
    else if (window.ActiveXObject)
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    else
        throw new Error("Ajax is not supported by your browser");
    xhr.onreadystatechange = function () {
        // alert(xhr.responseText);
        if (xhr.readyState === 4) {
            if (xhr.status === 200 && xhr.status < 300)
            {
                var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
                var x;
                var d;
                var tindex;
                for (x in json) {

                    document.getElementById('codigo_usuario').value = json[x].id_usuario;
                    document.getElementById('dat_fecha').value = json[x].fecha;
                    document.getElementById('obsv_presupuesto').value = json[x].obsv;

                    for (d in json[x].lista_productos) {
//                         alert(json[x].lista_productos[d].id);
//                         alert(json[x].lista_productos[d].nombre);
//                         alert(json[x].lista_productos[d].cantidad);
                        $('#tabladetalleproductos').append("<tr id=\'prod" + tindex + "\'>\n\
                                <td style=' width: 5%;'>" + json[x].lista_productos[d].id + "</td>\n\
                                <td style=' width: 60%;'>" + json[x].lista_productos[d].nombre + "</td>\n\
                                <td style=' width: 5%;'>" + json[x].lista_productos[d].cantidad + "</td>\n\
                                <td style=' width: 25%;'>" + 000 + "</td>\n\
                                <td style=' width: 5%;'><img onclick=\"$(\'#prod" + tindex + "\').remove();updateMonto(" + 444 + "," + tindex + ")\" src='../Recursos/img/update.png'/></td>\n\
                                <td style=' width: 5%;'><img onclick=\"$(\'#prod" + tindex + "\').remove();updateMonto(" + 555 + "," + tindex + ")\" src='../Recursos/img/delete.png'/></td>\n\
                          </tr>");
                    }
                }
            }
        }
    };
    xhr.open('POST', '/LaboratorioLPIII/GenerarPedidosCTRL');
    xhr.send(JSON.stringify(datos = {bandera: 2, id: $('#codigo_presupuesto').val()}));
    // 3. Specify your action, location and Send to the server - End
}