document.getElementById("somar").addEventListener("click", function(){
    var v1 = parseInt(document.getElementById("valor1").value);
    var v2 = parseInt(document.getElementById("valor2").value);
    var result = v1+v2;
    alert("O resultado é " + result);
})