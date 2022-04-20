function criarQuizz(){
   //ativa o titulo da lista de quizzes já criados quando clica em "criar quizz"
   document.querySelector(".container-meus").classList.remove("desativar")

   //busca quizzVazio e desativa (pra tirar a tela de que nao tem quizz criado)
   let meusQuizVazio = document.querySelector(".meus-quizes")
   meusQuizVazio.classList.add("desativar")


   //ativa a lista de quizzes já criados para mostrá-los
   let meuQuizCheio = document.querySelector(".quizes")
   meuQuizCheio.classList.remove("desativar")

   //renderiza novos quizzes conforme tiver no localStorage (a fazer)
   meuQuizCheio.innerHTML = ""
   for(let contador = 0; contador<4;contador++){
      meuQuizCheio.innerHTML += '<div class="caixa-quiz"><img src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg"><h2>Pergunta do quizz</h2><div class="caixa-gradiente"></div></div>'
   }

}

//ignorar, mas anotaçao: na tela 2, as respostas sao organizadas aleatoriamente
//entao vai precisar dar sort na div "caixa-resposta"