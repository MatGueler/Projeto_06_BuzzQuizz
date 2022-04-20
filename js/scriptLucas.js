function openQuizz () {
    let openTela2 = document.querySelector("body")
   openTela2.innerHTML = "<header><h1>BuzzQuizz</h1></header>"
   openTela2.innerHTML += `<div class="tela2">
   <!-- Banner Gradiente -->
   <div class="banner-quizz">
       <img
           src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg">
       <div class="banner-gradiente"></div>
       <h2>O quão bicho-preguiça é você?</h2>

   </div>
   <!-- PRINCIPAL 2.1 -->
   <div class="container-tela2">
       <div class="caixa-questao">
           <div class="caixa-pergunta azul">
               <h3>Em qual animal Olho-Tonto Moody transfigurou Malfoy?</h3>
           </div>
           <div class="caixa-principal-respostas">
               <div class="caixa-resposta">
                   <img
                       src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg">
                   <h4>Opção 1</h4>
               </div>
               <div class="caixa-resposta">
                   <img
                       src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg">
                   <h4>Opção 2</h4>
               </div>
               <div class="caixa-resposta">
                   <img
                       src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg">
                   <h4>Opção 3</h4>
               </div>
               <div class="caixa-resposta">
                   <img
                       src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg">
                   <h4>Opção 4</h4>
               </div>
           </div>
       </div>
       <div class="caixa-questao">
           <div class="caixa-pergunta roxo">
               <h3>Em qual animal Olho-Tonto Moody transfigurou Malfoy?</h3>
           </div>
           <div class="caixa-principal-respostas">
               <div class="caixa-resposta">
                   <img
                       src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg">
                   <h4>Opção 1</h4>
               </div>
               <div class="caixa-resposta">
                   <img
                       src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg">
                   <h4>Opção 2</h4>
               </div>
               <div class="caixa-resposta">
                   <img
                       src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg">
                   <h4>Opção 3</h4>
               </div>
               <div class="caixa-resposta">
                   <img
                       src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg">
                   <h4>Opção 4</h4>
               </div>
           </div>
       </div>
       <div class="caixa-questao">
           <div class="caixa-pergunta vermelho">
               <h3>Em qual animal Olho-Tonto Moody transfigurou Malfoy?</h3>
           </div>
           <div class="caixa-principal-respostas">
               <div class="caixa-resposta">
                   <img
                       src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg">
                   <h4>Opção 1</h4>
               </div>
               <div class="caixa-resposta">
                   <img
                       src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg">
                   <h4>Opção 2</h4>
               </div>
               <div class="caixa-resposta">
                   <img
                       src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg">
                   <h4>Opção 3</h4>
               </div>
               <div class="caixa-resposta">
                   <img
                       src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg">
                   <h4>Opção 4</h4>
               </div>
           </div>
       </div>
       <!-- Fim de Jogo -->
       <div class="caixa-fim-de-jogo desativar">
           <div class="caixa-nivel-acerto vermelho">
               <h3>88% de acerto: Você é praticamente um aluno de Hogwarts!</h3>
           </div>
           <div class="texto-fim-de-jogo">
               <img
                   src="https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/04/bicho-preguica-caracteristicas-das-especies-e-curiosidades.jpg">
               <h5>Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop infinito de comida e clique no botão
                   abaixo para usar o vira-tempo e reiniciar este teste.</h5>
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