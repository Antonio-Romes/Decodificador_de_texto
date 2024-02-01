
(function(){
    document.getElementById('escreverMensagem').value = "";
    document.getElementById("mensagemDecodifica").value = "";
    document.getElementById('escreverMensagem').focus();
})()

const codificar = () =>{
    let mensagem = document.getElementById('escreverMensagem').value;

    if(verificarMensagem(mensagem)){  
        document.getElementById('escreverMensagem').value = "";
        document.getElementById('mensagemDecodifica').value = btoa(mensagem); 
    }  
    
}

const verificarMensagem = (mensagem) => {
    let statusMensagem = false;
    if(!ehMensagemVazia(mensagem)){
        statusMensagem = true;
        if(temLetraMaiuscula(mensagem) || temCaracteresEspeciais(mensagem)){
            alert("Não é permitido letra maiúscula e carácter especiais!");
            statusMensagem = false;
        }
    }
    else{
        alert("Não é permitido mensagem vazia!");
    }

    return statusMensagem;
}

const decodificar = () => {
    let mensagem = document.getElementById('escreverMensagem').value;
    if(!ehMensagemVazia(mensagem)){  
        document.getElementById('escreverMensagem').value = "";
        document.getElementById('mensagemDecodifica').value = atob(valorTexto); 
    } 
    else{
        alert("Não é permitido mensagem vazia!");
    }
}

const copiarTextArea = () =>{
    let elemento = document.getElementById("mensagemDecodifica");

    if(!ehMensagemVazia(elemento.value))
    {
        elemento.select();
        elemento.setSelectionRange(0, 99999)
        elemento.execCommand("copy");
        elemento.value = ""; 
    }
    else{
        alert("Não é permitido copia  de uma mensagem vazia!");
    }
    
}

 const temLetraMaiuscula = (texto) => {
    return /[A-Z]/.test(texto);
 }

 const temCaracteresEspeciais = (texto) => {
    return /[^a-zA-Z0-9]+/g.test(texto);
 }

 const ehMensagemVazia = (mensagem) => {
    return  mensagem == "" ? true : false ;
 }