
(function(){
    document.getElementById('escreverMensagem').value = "";
    document.getElementById("mensagemDecodifica").value = "";
    document.getElementById('escreverMensagem').focus();
})()

const by = (seletor) => document.querySelector(seletor);
const $typingText = by(".type-text");
const $cursor = by(".cursor");

const words = ["Decodificador de texto!"];

const delay = {
    typing: 200,
    keeping: 1000,
    erasing: 100,
    word: 2000,
}

const sleep = (ms) => {

    return new Promise ((resolve) =>{
        setTimeout(() => resolve(),ms);
    });

};

const type = async(word)=>{
    $cursor.classList.add("typing");
    for(const char of word){
        $typingText.textContent += char;
        await sleep(delay.typing);
    }

    $cursor.classList.remove("typing");
    await sleep(delay.keeping);

    for(let i = 1; i <= word.length; i++){
        $typingText.textContent = word.substring(0, word.length -i);
        await sleep(delay.erasing);
    }
}

const loop = async (wordIndex = 0) =>{
    await type(words[wordIndex % words.length])
    setTimeout(async () => {
        await loop(wordIndex + 1)
    },delay.word);
}

document.addEventListener("DOMContentLoaded",() =>{
    loop();
});

const codificar = () =>{
    let mensagem = document.getElementById('escreverMensagem').value;
    
    if(verificarMensagem(mensagem)){   
        document.getElementById('mensagemDecodifica').value = btoa(mensagem); 
        document.getElementById('apresentaBox').style.display = 'none';
        document.getElementById('mensagemDecodifica').style.display = 'block';
    }  
    else{
        document.getElementById('escreverMensagem').focus();
    }
}

const verificarMensagem = (mensagem) => {
    let statusMensagem = false;
    if(!ehMensagemVazia(mensagem)){
        statusMensagem = true;
        if(temLetraMaiuscula(mensagem) || temCaracteresEspeciais(mensagem)){ 
            statusMensagem = false;
        }
    }  

    return statusMensagem;
}

const decodificar = () => {
    let mensagem = document.getElementById('escreverMensagem').value;
    if(!ehMensagemVazia(mensagem)){  
        document.getElementById('mensagemDecodifica').value = atob(mensagem); 
        document.getElementById('apresentaBox').style.display = 'none';
        document.getElementById('mensagemDecodifica').style.display = 'block';
    }  
    else{
        document.getElementById('escreverMensagem').focus();
    }
}

const copiarTextArea = () =>{
    let elemento = document.getElementById("mensagemDecodifica");
    document.getElementById('apresentaBox').style.display = 'block';
    document.getElementById('mensagemDecodifica').style.display = 'none'; 
    document.getElementById('escreverMensagem').value = "";

    if(!ehMensagemVazia(elemento.value))
    {
        navigator.clipboard.writeText(elemento.value)
        .then(() => {
        console.log('Texto copiado!');
        })
        .catch((err) => console.error(err.name, err.message)); 

        document.getElementById('mensagemDecodifica').value = "";
        
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

  