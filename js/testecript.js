
// VARIAVEIS GLOBAIS E ONDE ESTÃO
let meusQuizzes = [];
let listaQuizzes;
let contadorPerguntas;
let contadorNiveis;

// LISTAS PERGUNTAS
let perguntasQuizz = [""];
let corQuizz = [""];
let respostasCorretas = [""];
let urlCorretas = [""];
let incorretas1 = [""];
let incorretas2 = [""];
let incorretas3 = [""];
let urlIncorreta1 = [""];
let urlIncorreta2 = [""];
let urlIncorreta3 = [""];

// LISTAS NIVEIS
let niveisQuizz = [""];
let acertosPorcento = [""];
let urlNiveis = [""];
let descricoesNiveis = [""];


// LISTA COM OS OBJETOS QUIZZES DO USUARIO
let quizzesUsuario = []


// CONDIÇAO DE VERIFICAÇÃO
let condicaoVerificacao;


// FUNÇÃO AO INICIAR A PAGINA
function iniciarTela() {
    let iniciar = document.querySelector("body")
    iniciar.innerHTML = `<header><h1 onclick="iniciarTela()">BuzzQuizz</h1></header>`
    chamarTela1()
    abrirAPI()
}
function chamarTela1() {
    let iniciar = document.querySelector("body")
    let tamanhoMeusQuizzes = meusQuizzes.length
    if (tamanhoMeusQuizzes === 0) {
        iniciar.innerHTML += `
      <div class="tela1">
      <main>
         <div class="container-meus desativar">
            <div class="titulo-meus-quizzes">
               <h3>Meus Quizzes</h3><ion-icon name="add-circle" onclick="criarQuiz()"></ion-icon>
            </div>
         </div>
         <div class="meus-quizes">
            <h2>Você não criou nenhum quiz ainda :(</h2>
            <button onclick="criarQuiz()">Criar Quizz</button>
         </div>
         <div class="container-todos">
            <h3>Todos os Quizzes</h3>
            <div class="quizes"></div>
         </div></div>
      </main>
      </div>`
    } else {
        iniciar.innerHTML += `
      <div class="tela1">
      <main>
         <div class="container-meus">
            <div class="titulo-meus-quizzes">
               <h3>Meus Quizzes</h3><ion-icon name="add-circle" onclick="criarQuiz()"></ion-icon>
            </div>
         </div>
         <div class="meus-quizes">
            <h2>Você não criou nenhum quiz ainda :(</h2>
            <button onclick="criarQuiz()">Criar Quizz</button>
         </div>
         <div class="container-todos">
            <h3>Todos os Quizzes</h3>
            <div class="quizes"></div>
         </div></div>
      </main>
      </div>`
        // iniciar.innerHTML += '<div class="tela1"><main><div class="container-meus"><div class="titulo-meus-quizzes"><h3>Meus Quizzes</h3>  <ion-icon name="add-circle" onclick="criarQuiz()"></ion-icon></div></div><div class="meus-quizes"><h2>Você não criou nenhum quiz ainda :(</h2><button onclick="criarQuiz()">Criar Quizz</button></div><div class="container-todos"><h3>Todos os Quizzes</h3><div class="quizes"></div></div></div></main></div>'
    }
    // iniciar.innerHTML += '<div class="tela1"><main><div class="container-meus"><div class="titulo-meus-quizzes"><h3>Meus Quizzes</h3>  <ion-icon name="add-circle" onclick="criarQuiz()"></ion-icon></div></div><div class="meus-quizes"><h2>Você não criou nenhum quiz ainda :(</h2><button onclick="criarQuiz()">Criar Quizz</button></div><div class="quizes desativar"></div><div class="container-todos"><h3>Todos os Quizzes</h3><div class="quizes"><div class="caixa-quiz"  onclick="buscarQuizz()"><img  src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg"><h2>Pergunta do quizz</h2><div class="caixa-gradiente"></div></div></div></div></main></div>'
    //ps: container-meus só aparece depois que ja tiver um quizz criado
    //quando a lista de quizz criados for vazia, nao tem container-meus
}
// AO CLICAR ABRE A TELA 3.1 PARA CRIAÇÃO DO QUIZ
function criarQuiz() {
    let openTela3_1 = document.querySelector("body")
    openTela3_1.innerHTML = `<header><h1 onclick="iniciarTela()">BuzzQuizz</h1></header>`
    openTela3_1.innerHTML += `
   <div class="tela3">
   <main>
   <div class="orientacao"><h4>Comece pelo começo</h4></div>    
   <div class="informacoes">
   <input type="text" placeholder="Título do seu quizz" class = "tituloQuizz">
   <input type="text" placeholder="URL da imagem do seu quizz" class = "URLQuizz">
   <input type="text" placeholder="Quantidade de perguntas do seu quizz" class = "quantidadePerguntas">
   <input type="text" placeholder="Quantidade de níveis do seu quizz" class = "quantidadeNiveis"></div>
   <div class="prosseguir"><button onclick = "informacoesIniciais()">Prosseguir para criar perguntas</button></div>
   </main>
   </div>`
    //    <button onclick = "criarPerguntas()">Prosseguir para criar perguntas</button>
}
// VERIFICA INFORMAÇÕES INICIAIS
function informacoesIniciais() {
    let tituloQuiz = document.querySelector(`.tituloQuizz`).value
    let URLQuizz = document.querySelector(`.URLQuizz`).value
    let quantidadePerguntas = document.querySelector(`.quantidadePerguntas`).value
    let quantidadeNiveis = document.querySelector(`.quantidadeNiveis`).value
    let condicaoTitulo = (tituloQuiz.length < 20 || tituloQuiz.length > 65)
    let condicaoURL = (!isUrl(URLQuizz))
    let condicaoQtdPerguntas = (Number(quantidadePerguntas) < 3)
    let condicaoQtdNiveis = (Number(quantidadeNiveis) < 2)
    const informacoesQuizz = {
        title: tituloQuiz,
        image: URLQuizz,
        qtsQuestions: quantidadePerguntas,
        qtdNiveis: quantidadeNiveis
    }
    // if(condicaoTitulo || condicaoURL || condicaoQtdPerguntas || condicaoQtdNiveis){
    //     alert("DIGITE OS CAMPOS CORRETAMENTE")
    // }
    // else{
    //     console.log(informacoesQuizz)
    //     criarPerguntas()
    // }
    criarPerguntas()
}
// FUNÇÃO QUE VERIFICA SE É URL
function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}



// ABRE A PAGINA DE CRIAR PERGUNTAS - TELA 3.2
function criarPerguntas() {
    let openTela3_2 = document.querySelector(".tela3")
    openTela3_2.innerHTML = ""
    contadorPerguntas = 0
    openTela3_2.innerHTML = `
   <main>
   <div class="orientacao"><h4>Crie suas perguntas</h4></div>
   <div class="perguntas"></div>
   <div class="informacoes vazio">
   </div>
   <div class="prosseguir"><button onclick = "criarNiveis()">Prosseguir para criar níveis</button></div>
   </main>`
    adicionarPergunta()
}
// ADICIONA UMA PERGUNTA AO QUIZZ DE ACORDO COM A QUANTIDADE DESEJADA
function adicionarPergunta() {
    let perguntasNovas = document.querySelector("main > .perguntas")
    contadorPerguntas += 1
    perguntasNovas.innerHTML = ""
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        perguntasNovas.innerHTML += `<div class="informacoes">
      <h3>Perguntas ${contador}</h3>
      <input type="text" placeholder="Texto da pergunta" class = "textoPergunta${contador}" value = "${perguntasQuizz[(contador - 1)]}">
      <input type="text" placeholder="Cor de fundo da pergunta" class = "corPergunta${contador}" value = "${corQuizz[(contador - 1)]}">
      <h3>Resposta correta</h3><input type="text" placeholder="Resposta correta" class = "respostaCorreta${contador}" value = "${respostasCorretas[(contador - 1)]}">
      <input type="text" placeholder="URL da imagem" class = "urlCorreta${contador}" value = "${urlCorretas[(contador - 1)]}">
      
      <h3>Respostas incorretas</h3>  
      <input type="text" placeholder="Resposta incorreta 1" class = "incorreta1${contador}" value = "${incorretas1[(contador - 1)]}">
      <input type="text" placeholder="URL da imagem 1" class = "urlIncorreta1${contador}" value = "${urlIncorreta1[(contador - 1)]}">
      <input type="text" placeholder="Resposta incorreta 2" class = "incorreta2${contador}" value = "${incorretas2[(contador - 1)]}">
      <input type="text" placeholder="URL da imagem 2" class = "urlIncorreta2${contador}" value = "${urlIncorreta2[(contador - 1)]}">
      <input type="text" placeholder="Resposta incorreta 3" class = "incorreta3${contador}" value = "${incorretas3[(contador - 1)]}">
      <input type="text" placeholder="URL da imagem 3" class = "urlIncorreta3${contador}" value = "${urlIncorreta3[(contador - 1)]}">
   </div>`
    }
    adicionarRodape()
}
// FUNÇÃO QUE ATUALIZA QUAL VAI SER A PRÓXIMA NUMERAÇÃO DE PERGUNTAS
function adicionarRodape() {
    let informacoesVazias = document.querySelector(".tela3 .informacoes.vazio")
    let infovazia = `
    <h3>Perguntas ${contadorPerguntas + 1}</h3><ion-icon name="create-outline" onclick  = "coletarPerguntas()"></ion-icon>
    `
    informacoesVazias.innerHTML = infovazia

}

// COLETA TITULO DA PERGUNTA
function coletarPerguntas() {
    perguntasQuizz = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localPergunta = document.querySelector(`.textoPergunta${contador}`).value
        perguntasQuizz.push(localPergunta)
    }
    perguntasQuizz.push("")
    console.log(perguntasQuizz)
    coletarCor()
}
// COLETA COR DA PERGUNTA
function coletarCor() {
    corQuizz = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localCor = document.querySelector(`.corPergunta${contador}`).value
        corQuizz.push(localCor)
    }
    corQuizz.push("")
    console.log(corQuizz)
    coletarCorreta()
}
// COLETA RESPOSTA CORRETA
function coletarCorreta() {
    respostasCorretas = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localCorreta = document.querySelector(`.respostaCorreta${contador}`).value
        respostasCorretas.push(localCorreta)
    }
    respostasCorretas.push("")
    console.log(respostasCorretas)
    coletarUrlCorreta()
}
// COLETA A URL DA REPOSTA CORRETA
function coletarUrlCorreta() {
    urlCorretas = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localUrlCorreta = document.querySelector(`.urlCorreta${contador}`).value
        urlCorretas.push(localUrlCorreta)
    }
    urlCorretas.push("")
    console.log(urlCorretas)
    coletarIncorretas()
}
// COLETA RESPOSTA INCORRETA
function coletarIncorretas() {
    coletar1()
    coletar2()
    coletar3()
    coletarUrlIncorretas()
}
function coletar1() {
    incorretas1 = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localIncorreta1 = document.querySelector(`.incorreta1${contador}`).value
        incorretas1.push(localIncorreta1)
    }
    incorretas1.push("")
    console.log(incorretas1)
}
function coletar2() {
    incorretas2 = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localIncorreta2 = document.querySelector(`.incorreta2${contador}`).value
        incorretas2.push(localIncorreta2)
    }
    incorretas2.push("")
    console.log(incorretas2)
}
function coletar3() {
    incorretas3 = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localIncorreta3 = document.querySelector(`.incorreta3${contador}`).value
        incorretas3.push(localIncorreta3)
    }
    incorretas3.push("")
    console.log(incorretas3)
}
// COLETA URL DA RESPOSTA INCORRETA
function coletarUrlIncorretas() {
    coletarUrl1()
    coletarUrl2()
    coletarUrl3()
    verificarPerguntas()
}
function coletarUrl1() {
    urlIncorreta1 = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localUrlIncorreta3 = document.querySelector(`.urlIncorreta1${contador}`).value
        urlIncorreta1.push(localUrlIncorreta3)
    }
    urlIncorreta1.push("")
    console.log(urlIncorreta1)
}
function coletarUrl2() {
    urlIncorreta2 = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localUrlIncorreta2 = document.querySelector(`.urlIncorreta2${contador}`).value
        urlIncorreta2.push(localUrlIncorreta2)
    }
    urlIncorreta2.push("")
    console.log(urlIncorreta2)
}
function coletarUrl3() {
    urlIncorreta3 = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localUrlIncorreta3 = document.querySelector(`.urlIncorreta3${contador}`).value
        urlIncorreta3.push(localUrlIncorreta3)
    }
    urlIncorreta3.push("")
    console.log(urlIncorreta3)
}
function verificarPerguntas() {
    verificacao = 0
    verificarTitulo()
    verificarCor()
    verificarCorreta()
    verificarIncorreta()
    verificarUrl()
    console.log(verificacao)
    if (verificacao === 0) {
        adicionarPergunta()
    } else {
        alert("DIGITE OS CAMPOS CORRETAMENTE")
    }
}

// VERIFICA SE O CAMPO DE TITULO FOI PREENCHIDO COM MAIS DE 20CARACTERES
function verificarTitulo() {

    for (let contador = 0; (contador < perguntasQuizz.length - 1); contador++) {
        if (perguntasQuizz[contador].length < 20) {
            verificacao = 1
        }
    }
}

function verificarCor() {
    for (let contador = 0; (contador < corQuizz.length - 1); contador++) {
        if (corQuizz[contador].length !== 7) {
            verificacao = 1
        }
        else {
            if (corQuizz[contador][0] !== "#") {
                verificacao = 1
            }
        }
    }
}


function verificarCorreta() {
    for (let contador = 0; (contador < respostasCorretas.length - 1); contador++) {
        if (respostasCorretas[contador].length === 0) {
            verificacao = 1
        }
    }
}


function verificarIncorreta() {
    let naoNulas = 0;
    for (let contador = 0; contador < (incorretas1.length - 1); contador++) {
        if (incorretas1[contador].length !== 0) {
            naoNulas += 1;
        }
        if (incorretas2[contador].length !== 0) {
            naoNulas += 1;
        }
        if (incorretas3[contador].length !== 0) {
            naoNulas += 1;
        }
        if (naoNulas < 1) {
            verificacao = 1
        }
    }
}


function verificarUrl() {
    for (let contador = 0; contador < (urlCorretas.length - 1); contador++) {
        let urlResposta = !isUrl(urlCorretas[contador])
        let urlIncorretas1 = !isUrl(urlIncorreta1[contador])
        let urlIncorretas2 = !isUrl(urlIncorreta2[contador])
        let urlIncorretas3 = !isUrl(urlIncorreta3[contador])


        if (urlResposta || urlIncorretas1 || urlIncorretas2 || urlIncorretas3) {
            verificacao = 1
        }
    }
}









// ABRE A PAGINA DE CRIAR NIVEIS - TELA 3.3
function criarNiveis() {
    let openTela3_3 = document.querySelector(".tela3");
    contadorNiveis = 0;
    openTela3_3.innerHTML = ""
    openTela3_3.innerHTML = `
   <main>
   <div class="orientacao">
      <h4>Agora, decida os níveis</h4></div>   
    <div class="perguntas">
    </div>

   <div class="informacoes vazio">
   </div>

   <div class="prosseguir">
   <button onclick = "coletarFinalizar()">Finalizar quizz</button>
    </div>
   </main>`

    adicionarNivel()
}


// ADICIONA MAIS UM NIVEL AO QUIZZ
function adicionarNivel() {
    let niveisNovos = document.querySelector("main > .perguntas")
    contadorNiveis += 1
    niveisNovos.innerHTML = ""
    for (let contador = 1; contador <= contadorNiveis; contador++) {
        niveisNovos.innerHTML += `   
      <div class="informacoes"><h3>Nível ${contador}</h3>

      <input type="text" placeholder="Título do nível" class = "tituloNivel${contador}" value = "${niveisQuizz[(contador - 1)]}">

      <input type="text" placeholder="% de acerto mínimo" class = "porcentoAcerto${contador}" value = "${acertosPorcento[(contador - 1)]}">

      <input type="text" placeholder="URL da imagem" class = "urlNivel${contador}" value = "${urlNiveis[(contador - 1)]}">

      <input type="text" placeholder="Descrição do nível" class = "descricaoNivel${contador}" value = "${descricoesNiveis[(contador - 1)]}">
   </div>`
    }
    adicionarRodapeNivel()
}

function adicionarRodapeNivel() {

    let informacoesVazias = document.querySelector(".tela3 .informacoes.vazio")
    let infovazia = `
    <h3>Nível ${contadorNiveis + 1}</h3><ion-icon name="create-outline" onclick  = "coletarAdd()"></ion-icon>
    `
    informacoesVazias.innerHTML = infovazia
}

function coletarAdd(){
    coletarNiveis()
    coletarPorcentagem()
    coletarUrlNivel()
    coletarDescricaoNivel()
    verificarNiveisAdicionar()
}

function coletarFinalizar(){
    coletarNiveis()
    coletarPorcentagem()
    coletarUrlNivel()
    coletarDescricaoNivel()
    verificarNiveisFinalizar()
}

function coletarNiveis() {
    niveisQuizz = []
    for (let contador = 1; contador <= contadorNiveis; contador++) {
        let localNivel = document.querySelector(`.tituloNivel${contador}`).value
        niveisQuizz.push(localNivel)
        console.log(localNivel)
    }
    niveisQuizz.push("")
    console.log(niveisQuizz)
}

function coletarPorcentagem() {
    acertosPorcento = []
    for (let contador = 1; contador <= contadorNiveis; contador++) {
        let localNivelPorcento = document.querySelector(`.porcentoAcerto${contador}`).value
        acertosPorcento.push(localNivelPorcento)
    }
    acertosPorcento.push("")
    console.log(acertosPorcento)

}

function coletarUrlNivel() {
    urlNiveis = []
    for (let contador = 1; contador <= contadorNiveis; contador++) {
        let localUrlNivel = document.querySelector(`.urlNivel${contador}`).value
        urlNiveis.push(localUrlNivel)
    }
    urlNiveis.push("")
    console.log(urlNiveis)

}

function coletarDescricaoNivel() {
    descricoesNiveis = []
    for (let contador = 1; contador <= contadorNiveis; contador++) {
        let localDescricaoNivel = document.querySelector(`.descricaoNivel${contador}`).value
        descricoesNiveis.push(localDescricaoNivel)
    }
    descricoesNiveis.push("")
    console.log(descricoesNiveis)
}

// VERIFICA AS CONDIÇÕES DO NIVEL
function verificarNiveisAdicionar() {
    verificacao = 0
    verificarTituloNivel()
    verificarPorcentagemNivel()
    verificarUrlNivel()
    verificarDescricaoNivel()


    if (verificacao === 0) {
        adicionarNivel()
    }
    else {
        alert("DIGITE OS CAMPOS CORRETAMENTE")
    }
}


function verificarTituloNivel() {
    for (let contador = 0; (contador < niveisQuizz.length - 1); contador++) {
        if (niveisQuizz[contador].length < 10) {
            verificacao = 1
        }
    }
}

function verificarPorcentagemNivel() {
    for (let contador = 0; (contador < acertosPorcento.length - 1); contador++) {
        let valor = Number(acertosPorcento[contador])

        if (isNaN(valor)) {
            verificacao = 1
        }
        else {
            if (valor < 0 || valor > 100) {
                verificacao = 1
            }
        }
    }
}

function verificarUrlNivel() {
    for (let contador = 0; contador < (urlNiveis.length - 1); contador++) {
        let urlNivel = !isUrl(urlNiveis[contador])

        if (urlNivel) {
            verificacao = 1
        }
    }
}

function verificarDescricaoNivel() {
    for (let contador = 0; (contador < descricoesNiveis.length - 1); contador++) {
        if (descricoesNiveis[contador].length < 30) {
            verificacao = 1
        }
    }
}

function verificarNiveisFinalizar() {
    verificacao = 0
    verificarTituloNivel()
    verificarPorcentagemNivel()
    verificarUrlNivel()
    verificarDescricaoNivel()


    if (verificacao === 0) {
        niveisMinimos()
    }
    else {
        alert("DIGITE OS CAMPOS CORRETAMENTE")
    }
}


function niveisMinimos() {
    if ((niveisQuizz.length - 1) >= 2) {
        let nenhumAcerto = 0;
        for (let contador = 0; (contador < acertosPorcento.length - 1); contador++) {
            let valor = Number(acertosPorcento[contador])
            if (valor === 0) {
                nenhumAcerto += 1;
            }
        }
        if(nenhumAcerto === 0){  
            alert("DIGITE OS CAMPOS CORRETAMENTE")
        }
        else{
            finalizarCriacao()
        }
    }
    else{
        alert("DIGITE OS CAMPOS CORRETAMENTE")
    }
}






















// ABRE A PAGINA DE QUIZZ FINALIZADO - TELA 3.4
function finalizarCriacao() {
    let openTela3_4 = document.querySelector(".tela3")
    openTela3_4.innerHTML = ""
    openTela3_4.innerHTML = `
   <main>
      <div class="orientacao"><h4>Seu quizz está pronto</h4></div>
      <div class="caixa-quiz criado" onclick="buscarQuizz()">
         <img src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg">
         <h2>Pergunta do quizz</h2>
         <div class="caixa-gradiente"></div>
      </div>
      <div class="prosseguir"><button  onclick="buscarQuizz()">Acessar quizz</button></div><div>   
      <button class="retornar-home" onclick = "iniciarTela()">Voltar para home</button></div>
   </main>`
}
// ABRE API FORNECIDA
function abrirAPI() {
    const promessaAPI = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes")
    promessaAPI.then(processarAPI)
}
// PROCESSA OS DADOS DA API FORNECIDA
function processarAPI(dados) {
    listaQuizzes = dados.data
    listaQuizzes.map(montarQuizzes)
}
// MONTA O QUIZZ DA API DE ACORDO COM A ESTRUTURA
function montarQuizzes(elemento) {
    let imagensQuizzes = elemento.image
    let tituloQuiz = elemento.title
    let quizzID = elemento.id
    console.log(quizzID)
    let iniciar = document.querySelector(".quizes")
    iniciar.innerHTML +=
        `<div class="caixa-quiz">
      <img  src="${imagensQuizzes}">
      <h2>${tituloQuiz}</h2>
      <div class="caixa-gradiente" id="${quizzID}" onclick="buscarQuizz(this.id)"></div>
   </div>`
}

// Tela 2 API


function reiniciarQuizz() {
    const topo = document.querySelector(".tela2");
    topo.scrollIntoView({ behavior: 'smooth' });
}
function buscarQuizz(id) {
    const promiseID = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/" + id)
    promiseID.then(openQuizz);
    promiseID.catch(tratarErro);
    console.log(promiseID)
}

function tratarErro(error) {
    console.log("Status code: " + error.response.status);
    console.log("Mensagem de erro: " + error.response.data);
}

let arrayResposta = [];
let arrayPerguntas = [];
let arrayLevels = [];

// ABRE A TELA DO QUIZ - TELA 2
function openQuizz(dados) {
    listaQuizzes = dados.data

    arrayResposta = [];
    let id = listaQuizzes.id;
    let image = listaQuizzes.image;
    let title = listaQuizzes.title;


    //array questions
    arrayPerguntas = [];

    let perguntas = listaQuizzes.questions;
    let perguntasTitle = perguntas[0].title;
    let perguntasColor = perguntas[0].color;

    // array answers
    arrayResposta = [];

    let respostas = perguntas[0].answers;
    let respostaTexto = respostas[0].text;
    let respostaImage = respostas[0].image

    let respostaBoolean = perguntas[0].answers[0].isCorrectAnswer;

    // array levels
    arrayLevels = [];
    let levels = listaQuizzes.levels;

    let levelTitle = levels[0].title;
    let levelImage = levels[0].image;
    let levelText = levels[0].text;
    let levelValue = levels[0].minValue;

    for (let i = 0; i < perguntas.length; i++) {
        arrayResposta.push(respostas)
    }

    console.log(arrayResposta)


    // parte fixa da tela 2

    let openTela2 = document.querySelector("body")
    openTela2.innerHTML = `<header><h1 onclick="iniciarTela()">BuzzQuizz</h1></header>
   <div class="tela2"  id="${id}">
   <div class="banner-quizz">
      <img
          src="${image}">
      <div class="banner-gradiente"></div>
      <h2>${title}</h2>
   </div>
<div class="container-tela2">`

    //parte dinamica tela 2

    let openTelaNovo = document.querySelector(".container-tela2")

    openTelaNovo.innerHTML += `
         <div class="caixa-questao">
            <div class="caixa-pergunta" style="background-color:${perguntasColor}">
              <h3>${perguntasTitle}</h3>
            </div>
            <div class="caixa-principal-respostas">
               <div class="caixa-resposta">
                  <img
                      src="${respostaImage}">
                  <h4>${respostaTexto}</h4>
               </div>    
            </div>
         </div>`

    //levels tela 2

    openTelaNovo.innerHTML += `
         <div class="caixa-fim-de-jogo desativar ">
         <div class="caixa-nivel-acerto vermelho">
            <h3>"${levelValue}"% de acerto: "${levelTitle}"</h3>
         </div>
         <div class="texto-fim-de-jogo">
            <img
               src="${levelImage}">
            <h5>${levelText}</h5>
         </div>
      </div>`
    // footer tela 2

    openTelaNovo.innerHTML +=
        `<div class="reiniciar">
         <button onclick="reiniciarQuizz()">Reiniciar Quizz</button>
        </div>
      <h6 onclick="iniciarTela()">Voltar pra home</h6>
      </div>   
      </div>`
}

// CHAMAMENTO DE FUNÇÕES
iniciarTela()
//ignorar, mas anotaçao: na tela 2, as respostas sao organizadas aleatoriamente
//entao vai precisar dar sort na div "caixa-resposta"
   // //ativa o titulo da lista de quizzes já criados quando clica em "criar quizz"
   // document.querySelector(".container-meus").classList.remove("desativar")
   // //busca quizzVazio e desativa (pra tirar a tela de que nao tem quizz criado)
   // let meusQuizVazio = document.querySelector(".meus-quizes")
   // meusQuizVazio.classList.add("desativar")
   // //ativa a lista de quizzes já criados para mostrá-los
   // let meuQuizCheio = document.querySelector(".quizes")
   // meuQuizCheio.classList.remove("desativar")
   // //renderiza novos quizzes conforme tiver no localStorage (a fazer)
   // meuQuizCheio.innerHTML = ""
   // for(let contador = 0; contador<4;contador++){
   //    meuQuizCheio.innerHTML += '<div class="caixa-quiz"  onclick="buscarQuizz()"><img src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg"><h2>Pergunta do quizz</h2><div class="caixa-gradiente"></div></div>'
   // }