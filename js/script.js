
// VARIAVEIS GLOBAIS E ONDE ESTÃO
let listaQuizzesUsuario = [];
let meusQuizzes = [];
let listaQuizzes;
let contadorPerguntas;
let contadorNiveis;
let informacoesDoQuizz;
let objeto;
let ID;
let idEditando;
let chaveEditando;
let editarEnviar;
let idApagado;

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
    // localStorage.clear("1")
    let iniciar = document.querySelector("body")
    iniciar.innerHTML = `<header><h1 onclick="iniciarTela()">BuzzQuizz</h1></header>`
    carregando()
    chamarTela1()
    abrirAPI()
    arrayLevels = [];
    arrayValue = [];
    arrayResposta = [];
    acertos = 0;
    jogadas = 0;
}
function chamarTela1() {
    let iniciar = document.querySelector("body")
    listaQuizzesUsuario = JSON.parse(localStorage.getItem("1"))
    if (listaQuizzesUsuario === null || listaQuizzesUsuario.length === 0) {
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
         <div class="meus-quizes cheio">
         </div>
         <div class="container-todos">
            <h3>Todos os Quizzes</h3>
            <div class="quizes"></div>
         </div>
      </main>
      </div>`

        listaQuizzesUsuario.map(atualizarMeusQuizzes)
    }

}

// FUNÇÃO QUE MOSTRA TELA CARREGANDO
function carregando() {
    let telaCarregando = document.querySelector("body")
    telaCarregando.innerHTML += `<div class="telaConfirmacao">
        <div class="caixa-confirmar">
            <img src="./Spinner-1s-200px.gif">
        </div>
    </div>`
}

function carregou() {
    let telaCarregou = document.querySelector(".telaConfirmacao")
    telaCarregou.classList.add("desativar")
}

// ATUALIZA O CONTEUDO DE MEUS QUIZZES DE ACORDO COM A LISTA CRIADA PELO USUARIO
function atualizarMeusQuizzes(elemento) {

    let imagensQuizzes = elemento.image
    let tituloQuiz = elemento.title
    let quizzID = elemento.id

    let objeto = {
        image: imagensQuizzes,
        titule: tituloQuiz,
        ideitidade: quizzID
    }

    let achar = document.querySelector(".meus-quizes")

    // iniciar.innerHTML = ""

    achar.innerHTML +=
        `<div class="caixa-quiz">
          <img  src="${imagensQuizzes}">
          <h2 id="${quizzID}" onclick="buscarQuizz(this.id)">${tituloQuiz}</h2>
          <div class="caixa-gradiente" id="${quizzID}" onclick="buscarQuizz(this.id)"></div>
          <button class = "editarApagar">
          <ion-icon name="create-outline" id="${quizzID}" onclick = "editarQuizz(this.id)"></ion-icon>
          <ion-icon name="trash-outline" id="${quizzID}" onclick = "apagarQuizz(this.id)"></ion-icon>
          </button>
       </div>`
}

function editarQuizz(id) {
    idEditando = id
    criarQuiz()
    preencherQuizzIniciais(id)
}

function preencherQuizzIniciais(id) {
    let objeto;
    objeto = listaQuizzesUsuario.filter(function (elemento) {
        if (elemento.id === Number(id)) {
            return true
        }
    })
    chaveEditando = objeto[0].key
    let title = objeto[0].title
    let urlImage = objeto[0].image
    let qtdPerguntas = objeto[0].questions.length
    let qtdNiveis = objeto[0].levels.length

    document.querySelector(`.tituloQuizz`).value = title
    document.querySelector(`.URLQuizz`).value = urlImage
    document.querySelector(`.quantidadePerguntas`).value = qtdPerguntas
    document.querySelector(`.quantidadeNiveis`).value = qtdNiveis

    let criarPerguntasEditaveis = document.querySelector(".prosseguir")

    criarPerguntasEditaveis.innerHTML = `<button onclick = "editarQuizzPerguntas(idEditando)">Prosseguir para criar perguntas</button>`
}

function editarQuizzPerguntas(id) {

    let title = document.querySelector(`.tituloQuizz`).value
    let urlImage = document.querySelector(`.URLQuizz`).value
    let qtdPerguntas = document.querySelector(`.quantidadePerguntas`).value
    let qtdNiveis = document.querySelector(`.quantidadeNiveis`).value

    informacoesDoQuizz = {
        title: title,
        image: urlImage,
        qtsQuestions: qtdPerguntas,
        qtdNiveis: qtdNiveis
    }

    let perguntas = 1
    let objeto;
    let questoes;
    objeto = listaQuizzesUsuario.filter(function (elemento) {
        if (elemento.id === Number(id)) {
            return true
        }
    })

    questoes = objeto[0].questions


    let openTela3_2 = document.querySelector(".tela3")
    openTela3_2.innerHTML = ""
    contadorPerguntas = 0
    openTela3_2.innerHTML = `
   <main>
   <div class="orientacao"><h4>Crie suas perguntas</h4></div>
   <div class="perguntas"></div>
   <div class="informacoes vazio">
   </div>
   <div class="prosseguir"><button onclick = "coletarPerguntasFinalizarEditar()">Prosseguir para criar níveis</button></div>
   </main>`

    while (perguntas <= questoes.length) {
        adicionarPergunta()
        perguntas++
    }
    preencherQuizz(questoes)
}

function coletarPerguntasFinalizarEditar() {
    coletarPerguntasFinalizar()
    preencherQuizzNiveis(idEditando)
}

function preencherQuizzNiveis(id) {
    let objeto;
    let valorNivel = 1;
    objeto = listaQuizzesUsuario.filter(function (elemento) {
        if (elemento.id === Number(id)) {
            return true
        }
    })
    let niveis = objeto[0].levels
    while (valorNivel < objeto[0].levels.length) {
        adicionarNivel()
        valorNivel++
    }

    let criarObjeto = document.querySelector(".prosseguir")
    criarObjeto.innerHTML = `
    <button onclick = "coletarFinalizar('editar')">Finalizar quizz</button>
    `

    niveis.map(function (elemento) {
        for (let contador = 0; contador < objeto[0].levels.length; contador++) {
            document.querySelector(`.tituloNivel${contador + 1}`).value = objeto[0].levels[contador].title
            document.querySelector(`.porcentoAcerto${contador + 1}`).value = objeto[0].levels[contador].minValue
            document.querySelector(`.urlNivel${contador + 1}`).value = objeto[0].levels[contador].image
            document.querySelector(`.descricaoNivel${contador + 1}`).value = objeto[0].levels[contador].text
        }
        console.log(elemento)
    })
}

function preencherQuizz(questoes) {
    let contador = 0
    for (contador; contador < questoes.length; contador++) {
        document.querySelector(`.textoPergunta${contador + 1}`).value = questoes[contador].title
        document.querySelector(`.corPergunta${contador + 1}`).value = questoes[contador].color
        document.querySelector(`.respostaCorreta${contador + 1}`).value = (questoes[contador].answers[0]).text
        document.querySelector(`.urlCorreta${contador + 1}`).value = (questoes[contador].answers[0]).image

        document.querySelector(`.informacoes.dev${contador + 1} > .incorreta1${contador + 1}`).value = (questoes[contador].answers)[1].text

        document.querySelector(`.informacoes.dev${contador + 1} > .urlIncorreta1${contador + 1}`).value = (questoes[contador].answers)[1].image

        if ((questoes[contador].answers).length > 2) {
            document.querySelector(`.informacoes.dev${contador + 1} > .incorreta2${contador + 1}`).value = (questoes[contador].answers)[2].text

            document.querySelector(`.informacoes.dev${contador + 1} > .urlIncorreta2${contador + 1}`).value = (questoes[contador].answers)[2].image

            if ((questoes[contador].answers).length > 3) {
                document.querySelector(`.informacoes.dev${contador + 1} > .incorreta3${contador + 1}`).value = (questoes[contador].answers)[3].text

                document.querySelector(`.informacoes.dev${contador + 1} > .urlIncorreta3${contador + 1}`).value = (questoes[contador].answers)[3].image
            }
            else {
                document.querySelector(`.informacoes.dev${contador + 1} > .incorreta3${contador + 1}`).value = ""

                document.querySelector(`.informacoes.dev${contador + 1} > .urlIncorreta3${contador + 1}`).value = ""
            }
        }
        else {
            document.querySelector(`.informacoes.dev${contador + 1} > .incorreta2${contador + 1}`).value = ""

            document.querySelector(`.informacoes.dev${contador + 1} > .urlIncorreta2${contador + 1}`).value = ""
            document.querySelector(`.informacoes.dev${contador + 1} > .incorreta3${contador + 1}`).value = ""

            document.querySelector(`.informacoes.dev${contador + 1} > .urlIncorreta3${contador + 1}`).value = ""
        }
    }

}


function apagarQuizz(id) {
    carregando()
    let verificacaoApagar = confirm("Quer mesmo apagar o QUIZZ?")
    for (let contador = 0; contador < listaQuizzesUsuario.length; contador++) {
        if (Number(listaQuizzesUsuario[contador].id) === Number(id)) {

            if (verificacaoApagar === true) {
                let apagarChave = listaQuizzesUsuario[contador].key
                const config = { headers: { 'Secret-Key': apagarChave } }
                let URL = `https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`
                let requizicaoApagar = axios.delete(URL, config)
                idApagado = listaQuizzesUsuario[contador].id
                requizicaoApagar.then(passou)
            }
        }
    }
}


function passou() {

    novaLista = listaQuizzesUsuario.filter(removerQuiz)
    listaQuizzesUsuario = novaLista

    let listaCriadaString = JSON.stringify(listaQuizzesUsuario)
    let objetoSaolvo = localStorage.setItem("1", listaCriadaString)
    iniciarTela()
    carregou()
}

function removerQuiz(elemento) {
    if (elemento.id !== idApagado) {
        return elemento
    }
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
    informacoesDoQuizz = {
        title: tituloQuiz,
        image: URLQuizz,
        qtsQuestions: quantidadePerguntas,
        qtdNiveis: quantidadeNiveis
    }
    if (condicaoTitulo || condicaoURL || condicaoQtdPerguntas || condicaoQtdNiveis) {
        alert("DIGITE OS CAMPOS CORRETAMENTE")
    }
    else {
        criarPerguntas()
    }
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
   <div class="prosseguir"><button onclick = "coletarPerguntasFinalizar()">Prosseguir para criar níveis</button></div>
   </main>`
    adicionarPergunta()
}
// ADICIONA UMA PERGUNTA AO QUIZZ DE ACORDO COM A QUANTIDADE DESEJADA
function adicionarPergunta() {
    let perguntasNovas = document.querySelector("main > .perguntas")
    contadorPerguntas += 1
    let demarcadorPerguntas = 1;
    perguntasNovas.innerHTML = ""
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        perguntasNovas.innerHTML += `<div class="informacoes dev${demarcadorPerguntas}">
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
        demarcadorPerguntas += 1
    }
    adicionarRodape()
}
// FUNÇÃO QUE ATUALIZA QUAL VAI SER A PRÓXIMA NUMERAÇÃO DE PERGUNTAS
function adicionarRodape() {
    let informacoesVazias = document.querySelector(".tela3 .informacoes.vazio")
    let infovazia = `
    <h3>Perguntas ${contadorPerguntas + 1}</h3><ion-icon name="create-outline" onclick  = "coletarPerguntasAdicionar()"></ion-icon>
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

}


// COLETA COR DA PERGUNTA
function coletarCor() {
    corQuizz = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localCor = document.querySelector(`.corPergunta${contador}`).value
        corQuizz.push(localCor)
    }
    corQuizz.push("")
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

}
function coletar2() {
    incorretas2 = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localIncorreta2 = document.querySelector(`.incorreta2${contador}`).value
        incorretas2.push(localIncorreta2)
    }
    incorretas2.push("")
}
function coletar3() {
    incorretas3 = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localIncorreta3 = document.querySelector(`.incorreta3${contador}`).value
        incorretas3.push(localIncorreta3)
    }
    incorretas3.push("")
}
// COLETA URL DA RESPOSTA INCORRETA
function coletarUrlIncorretas() {
    coletarUrl1()
    coletarUrl2()
    coletarUrl3()
}
function coletarUrl1() {
    urlIncorreta1 = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localUrlIncorreta3 = document.querySelector(`.urlIncorreta1${contador}`).value
        urlIncorreta1.push(localUrlIncorreta3)
    }
    urlIncorreta1.push("")
}
function coletarUrl2() {
    urlIncorreta2 = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localUrlIncorreta2 = document.querySelector(`.urlIncorreta2${contador}`).value
        urlIncorreta2.push(localUrlIncorreta2)
    }
    urlIncorreta2.push("")
}
function coletarUrl3() {
    urlIncorreta3 = []
    for (let contador = 1; contador <= contadorPerguntas; contador++) {
        let localUrlIncorreta3 = document.querySelector(`.urlIncorreta3${contador}`).value
        urlIncorreta3.push(localUrlIncorreta3)
    }
    urlIncorreta3.push("")
}

// COLETA PERGUNTAS PARA SABER SE PODE ADICIONAR OUTRA
function coletarPerguntasAdicionar() {
    verificacao = 0

    coletarPerguntas()
    coletarCor()
    coletarCorreta()
    coletarUrlCorreta()
    coletarIncorretas()
    coletarUrlIncorretas()
    verificarPerguntasAdd()

}

function verificarPerguntasAdd() {
    verificacao = 0
    verificarTitulo()
    verificarCor()
    verificarCorreta()
    verificarIncorreta()
    verificarUrl()
    if (verificacao === 0) {
        // VERIFICA SE O NUMERO DE QUESÕES JA É IGUAL AO FORNECIDO, E LIMITA OU NÃO A ADIÇÃO DE PERGUNTAS
        if ((perguntasQuizz.length - 1) < Number(informacoesDoQuizz.qtsQuestions)) {
            adicionarPergunta()
        }
    } else {
        alert("DIGITE OS CAMPOS CORRETAMENTE")
    }
}


// COLETA PERGUNTAS PARA SABER SE PODE PASSAR PARA A PRÓXIMA ETAPA DE CRIAÇÃO
function coletarPerguntasFinalizar() {
    verificacao = 0

    coletarPerguntas()
    coletarCor()
    coletarCorreta()
    coletarUrlCorreta()
    coletarIncorretas()
    coletarUrlIncorretas()
    verificarPerguntasFinalizar()

}

function verificarPerguntasFinalizar() {
    verificacao = 0
    verificarTitulo()
    verificarCor()
    verificarCorreta()
    verificarIncorreta()
    verificarUrl()
    perguntasMinimas()
    verificarRespostasNulas()
    if (verificacao === 0) {
        criarNiveis()
        // testarObjetos()
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
            else {
                for (let indice = 1; indice < (corQuizz[contador]).length; indice++) {
                    if (isNaN(Number(corQuizz[contador][indice]))) {
                        if ((corQuizz[contador][indice]) !== "a" && (corQuizz[contador][indice]) !== "b" && (corQuizz[contador][indice]) !== "c" && (corQuizz[contador][indice]) !== "d" && (corQuizz[contador][indice]) !== "e" && (corQuizz[contador][indice]) !== "f") {
                            if ((corQuizz[contador][indice]) !== "A" && (corQuizz[contador][indice]) !== "B" && (corQuizz[contador][indice]) !== "C" && (corQuizz[contador][indice]) !== "D" && (corQuizz[contador][indice]) !== "E" && (corQuizz[contador][indice]) !== "F") {
                                verificacao = 1
                            }

                        }

                    }
                }
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
        let urlIncorretas1 = (!isUrl(urlIncorreta1[contador]) && urlIncorreta1[contador] !== "")
        let urlIncorretas2 = (!isUrl(urlIncorreta2[contador]) && urlIncorreta2[contador] !== "")
        let urlIncorretas3 = (!isUrl(urlIncorreta3[contador]) && urlIncorreta3[contador] !== "")

        if (urlResposta || urlIncorretas1 || urlIncorretas2 || urlIncorretas3) {
            verificacao = 1
        }
    }
}

// VERIFICA SE EXISTE UM CAMPO PREENCHIDO COM PERGUNTA OU URL E UM CAMPO CORRESPONDENTE SENDO NULO(AINDA PODE MELHORAR, SÓ FIZ FUNCIONAR)
function verificarRespostasNulas() {
    for (let contador = 0; contador < (incorretas1.length - 1); contador++) {
        if (incorretas1[contador] === "") {
            if (urlIncorreta1[contador] !== "") {
                verificacao += 1
            }
        }
        else {
            if (urlIncorreta1[contador] === "") {
                verificacao += 1
            }
        }


        if (incorretas2[contador] === "") {
            if (urlIncorreta2[contador] !== "") {
                verificacao += 1
            }
        }
        else {
            if (urlIncorreta2[contador] === "") {
                verificacao += 1
            }
        }


        if (incorretas3[contador] === "") {
            if (urlIncorreta3[contador] !== "") {
                verificacao += 1
            }
        }
        else {
            if (urlIncorreta3[contador] === "") {
                verificacao += 1
            }
        }
    }
}

// OBRIGA QUE O NUMERO DE QUESTOES SEJA MAIOR QUE 2 E SEJA IGUAL AO VALOR FORNECIDO
function perguntasMinimas() {
    if ((perguntasQuizz.length - 1) !== Number(informacoesDoQuizz.qtsQuestions)) {
        verificacao += 1;
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
   <button onclick = "coletarFinalizar('enviar')">Finalizar quizz</button>
    </div>
   </main>`

    adicionarNivel()
}


// ADICIONA MAIS UM NIVEL AO QUIZZ
function adicionarNivel() {
    let niveisNovos = document.querySelector("main > .perguntas")
    contadorNiveis += 1
    let numeroNivel = 0;
    niveisNovos.innerHTML = ""
    for (let contador = 1; contador <= contadorNiveis; contador++) {
        niveisNovos.innerHTML += `   
      <div class="informacoes numNivel${numeroNivel + 1}"><h3>Nível ${contador}</h3>

      <input type="text" placeholder="Título do nível" class = "tituloNivel${contador}" value = "${niveisQuizz[(contador - 1)]}">

      <input type="text" placeholder="% de acerto mínimo" class = "porcentoAcerto${contador}" value = "${acertosPorcento[(contador - 1)]}">

      <input type="text" placeholder="URL da imagem" class = "urlNivel${contador}" value = "${urlNiveis[(contador - 1)]}">

      <input type="text" placeholder="Descrição do nível" class = "descricaoNivel${contador}" value = "${descricoesNiveis[(contador - 1)]}">
   </div>`
        numeroNivel += 1
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

function coletarAdd() {
    coletarNiveis()
    coletarPorcentagem()
    coletarUrlNivel()
    coletarDescricaoNivel()
    verificarNiveisAdicionar()
}

function coletarFinalizar(valor) {
    editarEnviar = valor
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

    }
    niveisQuizz.push("")

}

function coletarPorcentagem() {
    acertosPorcento = []
    for (let contador = 1; contador <= contadorNiveis; contador++) {
        let localNivelPorcento = document.querySelector(`.porcentoAcerto${contador}`).value
        acertosPorcento.push(localNivelPorcento)
    }
    acertosPorcento.push("")


}

function coletarUrlNivel() {
    urlNiveis = []
    for (let contador = 1; contador <= contadorNiveis; contador++) {
        let localUrlNivel = document.querySelector(`.urlNivel${contador}`).value
        urlNiveis.push(localUrlNivel)
    }
    urlNiveis.push("")


}

function coletarDescricaoNivel() {
    descricoesNiveis = []
    for (let contador = 1; contador <= contadorNiveis; contador++) {
        let localDescricaoNivel = document.querySelector(`.descricaoNivel${contador}`).value
        descricoesNiveis.push(localDescricaoNivel)
    }
    descricoesNiveis.push("")

}

// VERIFICA AS CONDIÇÕES DO NIVEL
function verificarNiveisAdicionar() {
    verificacao = 0
    verificarTituloNivel()
    verificarPorcentagemNivel()
    verificarUrlNivel()
    verificarDescricaoNivel()


    if (verificacao === 0) {
        if ((niveisQuizz.length - 1) < Number(informacoesDoQuizz.qtdNiveis)) {
            adicionarNivel()
        }
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

// AVALIA A QUANTIDADE MINIMA DE 2 NIVEIS PARA CONSTRUIR O QUIZZ
function niveisMinimos() {
    if ((niveisQuizz.length - 1) >= 2) {
        let nenhumAcerto = 0;
        for (let contador = 0; (contador < acertosPorcento.length - 1); contador++) {
            let valor = Number(acertosPorcento[contador])
            if (valor === 0) {
                nenhumAcerto += 1;
            }
        }
        if (nenhumAcerto === 0) {
            alert("DIGITE OS CAMPOS CORRETAMENTE")
        }
        else {
            construirObjeto()
            // finalizarCriacao()
        }
    }
    else {
        alert("DIGITE OS CAMPOS CORRETAMENTE")
    }
}

// CONSTROI O OBJETO COM AS CONFIGURAÇÕES NECESSÁRIAS
function construirObjeto() {

    let questoes = []
    let niveis = []

    for (let contador = 0; contador < (perguntasQuizz.length - 1); contador++) {
        let respostasCertas = {
            text: respostasCorretas[contador],
            image: urlCorretas[contador],
            isCorrectAnswer: true
        }

        let respostasErradas1 = {
            text: incorretas1[contador],
            image: urlIncorreta1[contador],
            isCorrectAnswer: false
        }

        let respostasErradas2 = {
            text: incorretas2[contador],
            image: urlIncorreta2[contador],
            isCorrectAnswer: false
        }

        let respostasErradas3 = {
            text: incorretas3[contador],
            image: urlIncorreta3[contador],
            isCorrectAnswer: false
        }

        // let respostas = [
        //     respostasCertas,
        //     respostasErradas1,
        //     respostasErradas2,
        //     respostasErradas3
        // ]

        let respostas = [
            respostasCertas,
        ]

        if (incorretas1[contador] !== "") {
            respostas.push(respostasErradas1)
        }

        if (incorretas2[contador] !== "") {
            respostas.push(respostasErradas2)
        }

        if (incorretas3[contador] !== "") {
            respostas.push(respostasErradas3)
        }

        let questao = {
            title: perguntasQuizz[contador],
            color: corQuizz[contador],
            answers: respostas
        }

        questoes.push(questao)
    }

    for (let contador = 0; contador < (niveisQuizz.length - 1); contador++) {
        let nivel = {
            title: niveisQuizz[contador],
            image: urlNiveis[contador],
            text: descricoesNiveis[contador],
            minValue: Number(acertosPorcento[contador])
        }

        niveis.push(nivel)
    }
    objeto = {
        title: informacoesDoQuizz.title,
        image: informacoesDoQuizz.image,
        questions: questoes,
        levels: niveis
    }

    if (editarEnviar === "editar") {
        postarObjetoEditado()
    }
    else {
        postarObjeto()
    }

}

// ENVIA O OBJETO PARA A API
function postarObjeto() {
    carregando()

    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes', objeto);

    requisicao.then(salvou)

    // requisicao.catch()
}

// MOSTRA QUE A REQUISIÇÃO FOI CONCLUIDA E O OBJETO FOI POSTADO
function salvou(resposta) {
    ID = (resposta.data.id)
    listaQuizzesUsuario = []
    let novoObjeto = (resposta.data)
    listaQuizzesUsuario.push(novoObjeto)

    if (localStorage.getItem("1") === null) {
        let listaCriadaString = JSON.stringify(listaQuizzesUsuario)
        let objetoSaolvo = localStorage.setItem("1", listaCriadaString)

    }
    else {
        let meusQuizzesCriados = localStorage.getItem("1")
        listaQuizzesUsuario = JSON.parse(meusQuizzesCriados)
        listaQuizzesUsuario.push(novoObjeto)
        let listaCriadaString = JSON.stringify(listaQuizzesUsuario)
        let objetoSaolvo = localStorage.setItem("1", listaCriadaString)
    }
    carregou()
    finalizarCriacao()
}

function postarObjetoEditado() {
    carregando()

    const config = { headers: { 'Secret-Key': chaveEditando } }
    let URL = `https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${idEditando}`

    const requisicao = axios.put(URL,objeto,config);

    requisicao.then(postouEditado)
    
}

function postouEditado(resposta){
    id = idEditando
    let novoObjeto = resposta.data
    let meusQuizzesCriados = localStorage.getItem("1")
    listaQuizzesUsuario = JSON.parse(meusQuizzesCriados)
    let ListaMudada = listaQuizzesUsuario.filter(function (elemento) {
        if (elemento.id !== Number(id)) {
            return true
        }
    })
    listaQuizzesUsuario = ListaMudada
    listaQuizzesUsuario.push(novoObjeto)

    let listaCriadaString = JSON.stringify(listaQuizzesUsuario)
    localStorage.setItem("1", listaCriadaString)
    carregou()
    finalizarCriacao()
}































// ABRE A PAGINA DE QUIZZ FINALIZADO - TELA 3.4
function finalizarCriacao() {
    let openTela3_4 = document.querySelector(".tela3")

    // pra funcionar o onclick="buscarQuizz(this.id)", precisa adicionar id às divs/botao que tiver o onclick
    // algo como idQuizzAtual = listaQuizzes.id funciona? nao sei, só tem que pegar o ID do quizz atual (talvez voce pegue no post?)
    // e inserir na div o id="${idQuizzAtual}", que o this.id vai funcionar
    openTela3_4.innerHTML = ""
    openTela3_4.innerHTML = `
   <main>
      <div class="orientacao"><h4>Seu quizz está pronto</h4></div>
      <div class="caixa-quiz criado" onclick="buscarQuizz(this.id)">
         <img src="${informacoesDoQuizz.image}">
         <h2>${informacoesDoQuizz.title}</h2>
         <div class="caixa-gradiente"></div>
      </div>
      <div class="prosseguir"><button id="${ID}"  onclick="buscarQuizz(this.id)">Acessar quizz</button></div><div>   
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
    carregou()
}
// MONTA O QUIZZ DA API DE ACORDO COM A ESTRUTURA
function montarQuizzes(elemento) {
    let imagensQuizzes = elemento.image
    let tituloQuiz = elemento.title
    let quizzID = elemento.id

    let iniciar = document.querySelector(".quizes")
    iniciar.innerHTML +=
        `<div class="caixa-quiz">
      <img  src="${imagensQuizzes}">
      <h2 id="${quizzID}" onclick="buscarQuizz(this.id)">${tituloQuiz}</h2>
      <div class="caixa-gradiente" id="${quizzID}" onclick="buscarQuizz(this.id)"></div>
   </div>`
}

// Tela 2 API


function reiniciarQuizz() {
    const topo = document.querySelector(".tela2");
    topo.scrollIntoView({ behavior: 'smooth' });
    idAtual = document.querySelector(".tela2")
    idAtual = idAtual.id
    setTimeout(function () { buscarQuizz(idAtual) }, 700)
    jogadas = 0;
    acertos = 0;
    arrayValue = [];
}
function buscarQuizz(id) {

    const promiseID = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/" + id)
    promiseID.then(openQuizz);
    promiseID.catch(tratarErro);

}

function tratarErro(error) {

}

let arrayResposta = [];
let arrayPerguntas = [];
let arrayLevels = [];

//shuffle array
function comparador() {
    return Math.random() - 0.5;
}


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
    // array answers
    arrayResposta = [];
    arrayValue = [];
    calcularLevels();


    for (let i = 0; i < perguntas.length; i++) {
        let respostas = perguntas[i].answers;
        arrayResposta.push(respostas)
        arrayPerguntas.push(perguntas)
    }
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

    for (let i = 0; i < arrayPerguntas.length; i++) {
        let content = `
    <div class="caixa-questao">
       <div class="caixa-pergunta" style="background-color:${arrayPerguntas[0][i].color}">
         <h3>${arrayPerguntas[0][i].title}</h3>
       </div>
       <div class="caixa-principal-respostas">`

        arrayResposta[i].sort(comparador)

        for (let j = 0; j < arrayResposta[i].length; j++) {

            content +=
                `
                        <div class="caixa-resposta" onclick="selecionar(this)">
                            <img
                                src="${arrayResposta[i][j].image}">
                            <h4 class="${arrayResposta[i][j].isCorrectAnswer}">${arrayResposta[i][j].text}</h4>
                        </div>    
                        
                `
        }

        content += "</div> </div>"
        j = 0;
        openTelaNovo.innerHTML += content

    }
    const topo = document.querySelector(".tela2");
    topo.scrollIntoView(true);

}

let acertos = 0;
let jogadas = 0;
let arrayValue = [];


function selecionar(elemento) {
    caixaPai = elemento.parentElement

    for (let i = 0; i < caixaPai.children.length; i++) {
        filho = caixaPai.children[i];
        filho.classList.add("desativado");
        desativarResposta(filho);
        filho.classList.add("branco");
        corTexto(filho);
    }
    elemento.classList.remove("branco");
    checkAcertos(elemento)
    jogadas++;
    setTimeout(function () { scrollProxima(caixaPai) }, 1000)
    mostrarFim();
}
//levels tela 2

function calcularLevels() {
    arrayLevels = [];
    arrayValue = [];
    arrayResposta = [];
    acertos = 0;
    jogadas = 0;
    let levels = listaQuizzes.levels;
    arrayLevels.push(levels)




    for (let i = 0; i < levels.length; i++) {
        arrayValue.push(levels[i])
    }


    arrayValue.sort(function (a, b) {
        return parseFloat(a.minValue) - parseFloat(b.minValue);
    });
}




function mostrarFim() {
    let pontos;
    pontos = acertos / arrayPerguntas.length
    pontos = pontos * 100
    x = Math.round(pontos)

    let levelsTitle;
    let levelsImage;
    let levelsText;



    for (let j = 0; j < arrayValue.length; j++) {
        if (x >= arrayValue[j].minValue) {
            levelsTitle = arrayValue[j].title
            levelsImage = arrayValue[j].image
            levelsText = arrayValue[j].text
        }

    }




    if (jogadas == arrayPerguntas.length) {
        let openTelaNovo = document.querySelector(".container-tela2")

        openTelaNovo.innerHTML += `
        <div class="caixa-fim-de-jogo">
             <div class="caixa-nivel-acerto" style="background-color: #EC362D">
                <h3>"${x}"% de acerto: "${levelsTitle}"</h3>
             </div>
        <div class="texto-fim-de-jogo">
                <img
                   src="${levelsImage}">
                <h5>${levelsText}</h5>
        </div>
        </div>`
        // footer tela 2

        openTelaNovo.innerHTML += `
        <div class="reiniciar">
            <button onclick="reiniciarQuizz(this)">Reiniciar Quizz</button>
        </div>
        <h6 onclick="iniciarTela()">Voltar pra home</h6>
  </div>   
</div>`


        let FimDejogo = document.querySelector(".caixa-fim-de-jogo")
        setTimeout(function () {
            FimDejogo.scrollIntoView({ block: "center", behavior: 'smooth' })
        }, 1000)
    }
}

function desativarResposta(elemento) {
    if (elemento.classList.contains("desativado")) {
        elemento.removeAttribute("onclick");
    }
    return
}

function corTexto(elemento) {
    texto = elemento.querySelector("h4");
    if (texto.classList.contains("false")) {
        texto.classList.add("vermelho")
    }
    else if (texto.classList.contains("true")) {
        texto.classList.add("verde");
    }
}

function checkAcertos(elemento) {
    texto = elemento.querySelector("h4");
    if (texto.classList.contains("true")) {
        acertos++;
    }
}


function scrollProxima(elemento) {
    pai = elemento.parentElement
    proximo = pai.nextElementSibling
    proximo.scrollIntoView({ block: "center", behavior: 'smooth' })
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