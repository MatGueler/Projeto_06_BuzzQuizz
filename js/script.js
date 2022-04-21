// VARIAVEIS GLOBAIS E ONDE ESTÃO

let meusQuizzes = [];

let listaQuizzes;

let contadorPerguntas;

let contadorNiveis;

let perguntasQuizz = [""]



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
   let informacoesVazias = document.querySelector(".tela3 > main")
   openTela3_2.innerHTML = ""
   contadorPerguntas = 1
   openTela3_2.innerHTML = `
   <main>
   <div class="orientacao"><h4>Crie suas perguntas</h4></div>
   <div class="perguntas"></div>
   <div class="informacoes vazio">
   </div>
   <div class="prosseguir"><button onclick = "coletarPerguntas()">Prosseguir para criar níveis</button></div>
   </main>`

   adicionarPergunta()



   //    openTela3_2.innerHTML =
   //       `<main>
   //       <div class="orientacao"><h4>Crie suas perguntas</h4></div>
   //       <div class="informacoes">
   //          <h3>Perguntas ${contadorPerguntas}</h3>
   //          <input type="text" placeholder="Texto da pergunta" class = "textoPergunta${contadorPerguntas}">
   //          <input type="text" placeholder="Cor de fundo da pergunta">
   //          <h3>Resposta correta</h3><input type="text" placeholder="Resposta correta">
   //          <input type="text" placeholder="URL da imagem"><h3>Respostas incorretas</h3>     
   //          <input type="text" placeholder="Resposta incorreta 1">
   //          <input type="text" placeholder="URL da imagem 1">
   //          <input type="text" placeholder="Resposta incorreta 2">
   //          <input type="text" placeholder="URL da imagem 2">
   //          <input type="text" placeholder="Resposta incorreta 3">
   //          <input type="text" placeholder="URL da imagem 3">
   //       </div>
   //       <div class="informacoes vazio">
   //             <h3>Perguntas ${contadorPerguntas + 1}</h3><ion-icon name="create-outline" onclick  = "adicionarPergunta()"></ion-icon>
   //       </div>
   //       <div class="informacoes vazio">
   //             <h3>Perguntas ${contadorPerguntas + 2}</h3><ion-icon name="create-outline" onclick  = "adicionarPergunta()"></ion-icon>
   //       </div>
   //       <div class="prosseguir"><button onclick = "coletarPerguntas()">Prosseguir para criar níveis</button></div>
   //    </main>`
}


// ADICIONA UMA PERGUNTA AO QUIZZ DE ACORDO COM A QUANTIDADE DESEJADA
function adicionarPergunta() {
   let perguntasNovas = document.querySelector("main > .perguntas")
   contadorPerguntas += 1

   for (let contador = contadorPerguntas - 1; contador < contadorPerguntas; contador++) {
      perguntasNovas.innerHTML += `<div class="informacoes">
      <h3>Perguntas ${contador}</h3>
      <input type="text" placeholder="Texto da pergunta" class = "textoPergunta${contador}">
      <input type="text" placeholder="Cor de fundo da pergunta">
      <h3>Resposta correta</h3><input type="text" placeholder="Resposta correta">
      <input type="text" placeholder="URL da imagem"><h3>Respostas incorretas</h3>     
      <input type="text" placeholder="Resposta incorreta 1">
      <input type="text" placeholder="URL da imagem 1">
      <input type="text" placeholder="Resposta incorreta 2">
      <input type="text" placeholder="URL da imagem 2">
      <input type="text" placeholder="Resposta incorreta 3">
      <input type="text" placeholder="URL da imagem 3">
   </div>`
   }
   adicionarRodape()
}

// FUNÇÃO QUE ATUALIZA QUAL VAI SER A PRÓXIMA NUMERAÇÃO DE PERGUNTAS
function adicionarRodape() {
   let informacoesVazias = document.querySelector(".tela3 .informacoes.vazio")
   let infovazia = `
    <h3>Perguntas ${contadorPerguntas}</h3><ion-icon name="create-outline" onclick  = "adicionarPergunta()"></ion-icon>
    `
   informacoesVazias.innerHTML = infovazia
}

function verificarPerguntas() {

}

function coletarPerguntas() {
   perguntasQuizz = []
   for (let contador = 1; contador <= contadorPerguntas; contador++) {
      let localPergunta = document.querySelector(`.textoPergunta${contador}`).value
      perguntasQuizz.push(localPergunta)
   }
   console.log(perguntasQuizz)
}


// ABRE A PAGINA DE CRIAR NIVEIS - TELA 3.3
function criarNiveis() {
   let openTela3_3 = document.querySelector(".tela3");
   contadorNiveis = 1;
   openTela3_3.innerHTML = ""
   openTela3_3.innerHTML = `
   <main>
   <div class="orientacao">
      <h4>Agora, decida os níveis</h4></div>   
   <div class="informacoes"><h3>Nível ${contadorNiveis}</h3>
      <input type="text" placeholder="Título do nível">
      <input type="text" placeholder="% de acerto mínimo">
      <input type="text" placeholder="URL da imagem">
      <input type="text" placeholder="Descrição do nível">
   </div>
   <div class="informacoes vazio">
      <h3>Nível ${contadorNiveis + 1}</h3><ion-icon name="create-outline" onclick  = "adicionarNivel()"></ion-icon>
   </div>
   <div class="informacoes vazio">
      <h3>Nível ${contadorNiveis + 2}</h3><ion-icon name="create-outline" onclick  = "adicionarNivel()"></ion-icon>
   </div>
   <div class="prosseguir">
      <button onclick = "finalizarCriacao()">Finalizar quizz</button>
   </div>
   </main>`
}

// ADICIONA MAIS UM NIVEL AO QUIZZ
function adicionarNivel() {

   let niveisNovos = document.querySelector(".tela3 > main")
   contadorNiveis += 1
   niveisNovos.innerHTML = '<div class="orientacao"><h4>Agora, decida os níveis</h4></div>'

   for (let contador = 1; contador <= contadorNiveis; contador++) {
      niveisNovos.innerHTML += `   
      <div class="informacoes"><h3>Nível ${contadorNiveis}</h3>
      <input type="text" placeholder="Título do nível">
      <input type="text" placeholder="% de acerto mínimo">
      <input type="text" placeholder="URL da imagem">
      <input type="text" placeholder="Descrição do nível">
   </div>`
   }
   niveisNovos.innerHTML += `
   <div class="informacoes vazio">
      <h3>Nível ${contadorNiveis + 1}</h3><ion-icon name="create-outline" onclick  = "adicionarNivel()"></ion-icon>
   </div>
   <div class="prosseguir"><button onclick = "finalizarCriacao()">Finalizar quizz</button></div>`
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

function reiniciarQuizz() {
   const topo = document.querySelector(".tela2");
   topo.scrollIntoView({ behavior: 'smooth' });
}

function buscarQuizz(id) {
   const promiseID = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/"+id)
   promiseID.then(quizzEspecifico);
   promiseID.catch(tratarErro);
   console.log(promiseID)
}


function quizzEspecifico (dados) {
    //primeira array
    let id = dados.data.id;
    let image = dados.data.image;
    let title = dados.data.title;
    let questionTitle;
    let questionColor;
    let respostaTexto;
    let respostaImage;
    let respostaBoolean;
    let levelsTitle;
    let levelsImage;
    let levelText;
    let levelValue;

    //array das perguntas
    let questionsData = dados.data.questions;
    for (let i = 0; i < questionsData.length; i++) {
    questionTitle = questionsData[i].title;
    questionColor = questionsData[i].color;
    }
    // array das respostas
    let questionRespostaData = questionsData[0].answers;
    for (let i = 0; i < questionRespostaData.length; i++) {
    respostaTexto = questionRespostaData[i].text;
    respostaImage = questionRespostaData[i].image;
    respostaBoolean = questionRespostaData[i].isCorrectAnswer;
    }
    //array dos níveis
    let questionLevels = dados.data.levels;
    for (let i = 0; i < questionLevels.length; i++) {
    levelsTitle = questionLevels[0].title;
    levelsImage = questionLevels[0].image;
    levelText = questionLevels[0].text;
    levelValue = questionLevels[0].minValue;
    }
 
    console.log(respostaBoolean);

   
    openQuizz(image, title, id, questionTitle, questionColor, respostaTexto, respostaImage, respostaBoolean, levelsTitle, levelsImage, levelText, levelValue)
}

function tratarErro(error) {
   console.log("Status code: " + error.response.status);
   console.log("Mensagem de erro: " + error.response.data);
}

// ABRE A TELA DO QUIZ - TELA 2
function openQuizz(image, title, id, questionTitle, questionColor, respostaTexto, respostaImage, respostaBoolean, levelsTitle, levelsImage, levelText, levelValue) {
   let openTela2 = document.querySelector("body")
   openTela2.innerHTML = `<header><h1 onclick="iniciarTela()">BuzzQuizz</h1></header>`
   openTela2.innerHTML += `<div class="tela2"  id="${id}">
  <!-- Banner Gradiente -->
  <div class="banner-quizz">
      <img
          src="${image}">
      <div class="banner-gradiente"></div>
      <h2>${title}"</h2>

  </div>
  <!-- PRINCIPAL 2.1 -->
  <div class="container-tela2">
      <div class="caixa-questao">
          <div class="caixa-pergunta" style="background-color:${questionColor}">
              <h3>${questionTitle}</h3>
          </div>
          <div class="caixa-principal-respostas">
              <div class="caixa-resposta">
                  <img
                      src="${respostaImage}">
                  <h4>"${respostaTexto}"</h4>
              </div>
              <div class="caixa-resposta">
                  <img
                      src="${respostaImage}">
                  <h4>${respostaTexto}</h4>
              </div>
              <div class="caixa-resposta">
                  <img
                      src="${respostaImage}">
                  <h4>${respostaTexto}</h4>
              </div>
              <div class="caixa-resposta">
                  <img
                      src="${respostaImage}">
                  <h4>"${respostaTexto}"</h4>
              </div>
          </div>
      </div>
      <div class="caixa-questao">
      <div class="caixa-pergunta" style="background-color:${questionColor}">
         <h3>"${questionTitle}"</h3>
          </div>
          <div class="caixa-principal-respostas">
              <div class="caixa-resposta">
                  <img
                      src="${respostaImage}">
                  <h4>"${respostaTexto}"</h4>
              </div>
              <div class="caixa-resposta">
                  <img
                      src="${respostaImage}">
                  <h4>${respostaTexto}</h4>
              </div>
              <div class="caixa-resposta">
                  <img
                      src="${respostaImage}">
                  <h4>${respostaTexto}</h4>
              </div>
              <div class="caixa-resposta">
                  <img
                      src="${respostaImage}">
                  <h4>"${respostaTexto}"</h4>
              </div>
          </div>
      </div>
      <div class="caixa-questao">
      <div class="caixa-pergunta" style="background-color:${questionColor}">
              <h3>"${questionTitle}"</h3>
          </div>
          <div class="caixa-principal-respostas">
              <div class="caixa-resposta">
                  <img
                      src="${respostaImage}">
                  <h4>"${respostaTexto}"</h4>
              </div>
              <div class="caixa-resposta">
                  <img
                      src="${respostaImage}">
                  <h4>${respostaTexto}</h4>
              </div>
              <div class="caixa-resposta">
                  <img
                      src="${respostaImage}">
                  <h4>${respostaTexto}</h4>
              </div>
              <div class="caixa-resposta">
                  <img
                      src="${respostaImage}">
                  <h4>"${respostaTexto}"</h4>
              </div>
          </div>
      </div>
      <!-- Fim de Jogo -->
      <div class="caixa-fim-de-jogo desativar ">
          <div class="caixa-nivel-acerto vermelho">
              <h3>"${levelValue}"% de acerto: "${levelsTitle}"</h3>
          </div>
          <div class="texto-fim-de-jogo">
              <img
                  src="${levelsImage}">
              <h5>${levelText}</h5>
          </div>
      </div>
      <!-- Botoes footer -->
      <div class="reiniciar">
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