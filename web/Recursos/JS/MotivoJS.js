//alert('conecta con el html');
function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_motivo: document.getElementById('codigo_motivo').value,
        descripcion: document.getElementById('descripcion_motivo').value
    };
    enviar();
}
function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/MotivoCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));

}
function agregarMotivo() {
    procesarJSON(1);
}
function modificarMotivo() {
    procesarJSON(2);
}
function eliminarMotivo() {
    procesarJSON(3);
}