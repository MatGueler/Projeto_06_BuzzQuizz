function criarQuizz(){
   document.querySelector(".container-meus").classList.remove("desativar")
   let meusQuizVazio = document.querySelector(".meus-quizes")
   meusQuizVazio.classList.add("desativar")
   let meuQuizCheio = document.querySelector(".quizes")
   meuQuizCheio.classList.remove("desativar")

   meuQuizCheio.innerHTML = ""
   for(let contador = 0; contador<4;contador++){
      meuQuizCheio.innerHTML += '<div class="caixa-quiz"><img src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg"><h2>Pergunta do quiz</h2><div class="caixa-gradiente"></div></div>'
   }
   console.log(meusQuiz.innerHTML)
}
