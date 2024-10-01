let textoOriginal = document.getElementById("titulo").textContent;

// document.getElementById("botao-trocar-texto").addEventListener("click", function(){
//     let titulo = document.getElementById("titulo");
    
//     if(titulo.textContent === "Texto trocado"){
//         titulo.textContent = textoOriginal;
//     }else{ 
//         titulo.textContent = "Texto trocado";
//     }
// })

$(document).ready(function() {
    $("#botao-trocar-texto").on("click", function(){
        let titulo = document.getElementById("titulo");
    
        if(titulo.textContent === "Texto trocado"){
            titulo.textContent = textoOriginal;
        }else{
            textoOriginal = titulo.textContent; 
            titulo.textContent = "Texto trocado";
        }
    })

    let corAtualBranca = true;
    $("#botao-trocar-cor").on("click", function(){
        if(corAtualBranca){
            $('body').css('background-color', "salmon")
        }else{
            $('body').css('background-color', "white")
        }
        corAtualBranca = !corAtualBranca;
    })

    $("#botao-alterar-texto").on("click", function(){
        let novoTexto = $('#input-novo-texto').val();
        if(novoTexto){
            $("#titulo").text(novoTexto)
        }else{
            alert("Por favor, insira um texto!")
        }
    })
})