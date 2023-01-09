const FRONT = "cardfront"
const BACK = "cardback"
const CARD = "card"
const ICON = "icon"

startgame()

function startgame (){
    // cards = game.createCardsFromFlags() //executa a função de criar cartas
    // shuffleCards(cards) //pega as cartas e executa embaralhamento
    // console.log(cards)

    initializeCards(game.createCardsFromFlags()) // função que vai transformar as cartas em algo visual
}

function initializeCards (cards) {
    let gameBoard = document.getElementById("gameBoard")
    gameBoard.innerHTML = "" //limpa o gameboard
    // console.log(gameBoard)

    game.cards.forEach((card)=>{
        let cardElement = document.createElement("div")
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener("click", flipCard)
        gameBoard.appendChild(cardElement)
    })
}

function createCardContent(card, cardElement){

    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element){

    let cardElementFace = document.createElement("div")
    cardElementFace.classList.add(face)

    if( face === FRONT){
        let iconElement = document.createElement("img")
        iconElement.classList.add(ICON)
        iconElement.src = "./assets/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement)
        
    }
    else{
        cardElementFace.innerHTML = "&lt/&gt"
    }
    element.appendChild(cardElementFace)
}



function flipCard(){
    if (game.setCard(this.id)){ // se eu conseguir setar uma carta, => flipar carta

        this.classList.add("flip")
        
        if (game.secondCard){ //se eu ja tiver o secondcard, e ele nao for null
            if(game.checkMatch()){
                game.clearCards();
                if (game.checkGameOver()){//se eu tiver um gameover, mostra a tela de gameover
                    setTimeout(()=>{
                        let gameOverLayer = document.getElementById("gameover")
                        gameOverLayer.style.display = "flex"
                    },1000) 
                }
            }
            else{
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove("flip")
                    secondCardView.classList.remove("flip")
                    game.unflipCards()
                },1000)
            }
        }
    }
}

function restart(){
    game.clearCards()
    startgame()
    let gameOverLayer = document.getElementById("gameover")
    gameOverLayer.style.display = "none"

}










// DESCOMENTAR TUDO A BAIXO PARA ENTENDER MELHOR A LOGICA, LOGICA DE GAME E INTERFACE EM UM SÓ ARQUIVO

// ///////////////////////////////////////     GAME     /////////////////////////////////////////////////////////

// let cards = null

// //cria as cartas do tabuleiro
// function createCardsFromFlags(flags){
//    let cards = []

//    for(let flag of flags ){  //of para pegar o elemento do array flags, flag passa a serelemento do array flags
//        cards.push(createPairFromFlags(flag))
//    }    

//    // melhorando o laço de repetiçõ acima usando o foreach:
//    // flags.forEach((flag) => {
//    //     cards.push(createPairFromFlags(flag))
//    // });

//    //aqui abaixo tenho um array com os pares, mas nao e isso que eu preciso, 
//    //PRECISO DE UM ARRAY COM TODAS AS CARTAS "20".
//    // console.log(cards) 

//    //um modo de selecionar isso seria usando o metodo map:
//    console.log(cards.map(pair => pair[0].icon)) // como dentro de cards eu tenho um conjunto de pares,
//    //então eu poderia pegar para cada par eu vou retornar alguma coisa, como por exemplo: pair é um array,
//    //entao eu poderia pegar o elemento 0 do icon e retornar somente os nomes das variaveis. Mas resumidamente
//    //isso vai dividir o array cards, que vai contar com indice 0 com 10 elementos, e indice 1 com 10 elementos
//    // e isso não soluciona o problema


//    //existe um metodo chamado FLATMAP que tambem retorna um array, mas se cada elemento do array for um array
//    //ele vai desmembrar isso e vai retornar um array com 20 indices
//    // console.log(cards.flatMap(pair => pair))

//    return cards.flatMap(pair => pair)

// }

// //retorna os pares das cartas
// function createPairFromFlags(flag){
//    return [{
//        id: createIdWithFlag(flag),
//        icon: flag,
//        flipped: false
//    },
//    {
//        id: createIdWithFlag(flag),
//        icon: flag,
//        flipped: false
//    }]
// }

// //cria um valor randomico para id das cartas
// function createIdWithFlag(flag){
//    return flag + parseInt(Math.random() * 1000)
// }


// ////////////////////////////////////////////////   INTERFACE    /////////////////////////////////////////////////

// function startgame (){
//     cards = createCardsFromFlags(flags) //executa a função de criar cartas
//     shuffleCards(cards) //pega as cartas e executa embaralhamento
//     // console.log(cards)

//     initializeCards() // função que vai transformar as cartas em algo visual
// }

// function initializeCards () {
//     let gameBoard = document.getElementById("gameBoard")
//     // console.log(gameBoard)

//     cards.forEach((card)=>{
//         let cardElement = document.createElement("div")
//         cardElement.id = card.id
//         cardElement.classList.add(CARD)
//         cardElement.dataset.icon = card.icon

//         createCardContent(card, cardElement)

//         cardElement.addEventListener("click", flipCard)
//         gameBoard.appendChild(cardElement)
//     })
// }

// function createCardContent(card, cardElement){

//     createCardFace(FRONT, card, cardElement)
//     createCardFace(BACK, card, cardElement)
// }

// function createCardFace(face, card, element){

//     let cardElementFace = document.createElement("div")
//     cardElementFace.classList.add(face)

//     if( face === FRONT){
//         let iconElement = document.createElement("img")
//         iconElement.classList.add(ICON)
//         iconElement.src = "./assets/" + card.icon + ".png"
//         cardElementFace.appendChild(iconElement)
        
//     }
//     else{
//         cardElementFace.innerHTML = "&lt/&gt"
//     }
//     element.appendChild(cardElementFace)
// }

// function shuffleCards(cards){
//     //LÓGICA DA FUNÇÃO DE EMARALHAMENTO: Pego a ultima carta/index do array e TROCO de posição por uma aleatoria,
//     //depois a mesma coisa com a penultima, e assim sucessivamente.

//     let currentIndex = cards.length
//     let randomIndex = 0

//     while( currentIndex !== 0){  // enquanto currentindex for diferente de 0

//         randomIndex = Math.floor(Math.random() * currentIndex)// só posso pegar 
//         //cartas que não tenham sido embaralhadas, então por isso foi usado currentindex

//         currentIndex-- // decrementa pois, veja o exemplo: se tenho um array com 3 elementos, 
//         //o primeiro elemento vai ter indice 0 e ultimo elemento vai ter o indice 2.      
//         // Talvez esteja certo( a carta/index do array foi trocado de posição, 
//         //entao decrementa para ir pro proximo elemento.)


//         //INVERTENDO AS CARTAS DE POSIÇÃO:

//         ////////////////////////////    IMPORTANTE   //////////////////////////////////////////////////////////
//         //entendendo como funciona a inversão:
//         // let a = 5
//         // let b = 10

//         // [a,b] = [b,a]
//         // console.log(a + " VARIAVEL A, seria a = 5 ") // variavel a passa a ter valor igual a 10
//         // console.log(b + " VARIAVEL B, seria a = 10 ")// variavel b passa a ter valor igual a 5

//         [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex] ]



//     }
// }

// function flipCard(){
//     this.classList.add("flip")
// }




