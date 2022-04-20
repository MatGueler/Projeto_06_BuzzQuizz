
// FUNÇÃO AO INICIAR A PAGINA
function iniciarTela(){

   let iniciar = document.querySelector("body")
   iniciar.innerHTML = "<header><h1>BuzzQuizz</h1></header>"
   chamarTela1()
}

function chamarTela1(){
   let iniciar = document.querySelector("body")
   iniciar.innerHTML += '<div class="tela1"><main><div class="container-meus"><div class="titulo-meus-quizzes"><h3>Meus Quizzes</h3>  <ion-icon name="add-circle" onclick="criarQuiz()"></ion-icon></div></div><div class="meus-quizes"><h2>Você não criou nenhum quiz ainda :(</h2><button onclick="criarQuiz()">Criar Quizz</button></div><div class="quizes desativar"></div><div class="container-todos"><h3>Todos os Quizzes</h3><div class="quizes"><div class="caixa-quiz"  onclick="openQuizz()"><img  src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg"><h2>Pergunta do quizz</h2><div class="caixa-gradiente"></div></div></div></div></main></div>'
   //ps: container-meus só aparece depois que ja tiver um quizz criado
   //quando a lista de quizz criados for vazia, nao tem container-meus
}


// AO CLICAR ABRE A TELA 3.1 PARA CRIAÇÃO DO QUIZ
function criarQuiz(){
   let openTela3_1 = document.querySelector(".tela1")
   openTela3_1.innerHTML = ""
   openTela3_1.innerHTML = '<div class="tela3"><main><div class="orientacao"><h4>Comece pelo começo</h4></div>       <div class="informacoes"><input type="text" placeholder="Título do seu quizz"><input type="text" placeholder="URL da imagem do seu quizz"><input type="text" placeholder="Quantidade de perguntas do seu quizz"><input type="text" placeholder="Quantidade de níveis do seu quizz"></div><div class="prosseguir"><button onclick = "criarPerguntas()">Prosseguir para criar perguntas</button></div></main></div>'
}

function criarPerguntas(){
   let openTela3_2 = document.querySelector(".tela3")
   openTela3_2.innerHTML = ""
   openTela3_2.innerHTML = '<main><div class="orientacao"><h4>Crie suas perguntas</h4></div><div class="informacoes"><h3>Perguntas 1</h3><input type="text" placeholder="Texto da pergunta"><input type="text" placeholder="Cor de fundo da pergunta"><h3>Resposta correta</h3><input type="text" placeholder="Resposta correta"><input type="text" placeholder="URL da imagem"><h3>Respostas incorretas</h3>     <input type="text" placeholder="Resposta incorreta 1"><input type="text" placeholder="URL da imagem 1"><input type="text" placeholder="Resposta incorreta 2"><input type="text" placeholder="URL da imagem 2"><input type="text" placeholder="Resposta incorreta 3"><input type="text" placeholder="URL da imagem 3"></div><div class="prosseguir"><button onclick = "criarNiveis()">Prosseguir para criar níveis</button></div></main>'
}

function criarNiveis(){
   let openTela3_3 = document.querySelector(".tela3")
   openTela3_3.innerHTML = ""
   openTela3_3.innerHTML = '<main><div class="orientacao"><h4>Agora, decida os níveis</h4></div>   <div class="informacoes"><h3>Nível 1</h3><input type="text" placeholder="Título do nível"><input type="text" placeholder="% de acerto mínimo"><input type="text" placeholder="URL da imagem"><input type="text" placeholder="Descrição do nível"></div><div class="prosseguir"><button onclick = "finalizarCriacao()">Finalizar quizz</button></div></main>' 
}

function finalizarCriacao(){
   let openTela3_4 = document.querySelector(".tela3")
   openTela3_4.innerHTML = ""
   openTela3_4.innerHTML = '<main><div class="orientacao"><h4>Seu quizz está pronto</h4></div><div class="caixa-quiz   onclick="openQuizz()"criado"><img src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg"><h2>Pergunta do quizz</h2><div class="caixa-gradiente"></div></div><div class="prosseguir"><button>Acessar quizz</button></div><div>       <button class="retornar-home" onclick = "iniciarTela()">Voltar para home</button></div></main>'
}

// iniciarTela()


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
   //    meuQuizCheio.innerHTML += '<div class="caixa-quiz"  onclick="openQuizz()"><img src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg"><h2>Pergunta do quizz</h2><div class="caixa-gradiente"></div></div>'
   // }