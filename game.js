let game = {

    lockMode:false,
    firstCard: null,
    secondCard: null,

    flags : ["africa", "brasil", "canada", "coreia", "gana",
    "alemanha", "israel", "suiça", "reino unido", "eua"],

    cards: null,

    //identifica se a carta esta virada ou não, vai retornar true ou false se a carta foi selecionada ou nao
    setCard: function (id){  
        let card = this.cards.filter(card => card.id === id)[0] //passa a função card que vai retornar todas as cartas
        // que tiverem o id igual o id que estou clicando, isso vai retornar um array, então vou 
        //pegar somente o elemento 0

        console.log(card)
        if(card.flipped || this.lockMode){ //se a carta nao estiver flipada e estiver em lockmode, retorna false
            return false
        }

        if(this.firstCard == null){ // se a primeira carta for null, vou conseguir setar essa carta
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        }
        else{ // se a primeira carta não estiver como null, vou tentar colocar na segunda carta
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true //se eu tentar colocar uma terceira carta na segunda, vai entrar em lockmode
            return true
        }
    },

    checkMatch: function (){ //verifica se o icone das cartas são iguais
        if( !this.firstCard || !this.secondCard){ // se firstcard ou secondcard nao existir/null, retorna false
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function(){
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    unflipCards: function(){
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },

    checkGameOver: function(){

        // retorna as cartas não flipadas, se nao tenho nenhuma carta nao flipada, todas foram flipadas.
        //como map retorna um array, se tiver length = a 0, é porque o jogo acabou
        return this.cards.filter(card => !card.flipped).length == 0
    },

     //cria as cartas do tabuleiro
    createCardsFromFlags: function (){

    this.cards = []

    // for(let flag of flags ){  //of para pegar o elemento do array flags, flag passa a serelemento do array flags
    //     this.cards.push(this.createPairFromFlags(flag))
    // }    

    // melhorando o laço de repetiçõ acima usando o foreach:
    this.flags.forEach((flag) => {
        this.cards.push(this.createPairFromFlags(flag))
    });

    //aqui abaixo tenho um array com os pares, mas nao e isso que eu preciso, 
    //PRECISO DE UM ARRAY COM TODAS AS CARTAS "20".
    // console.log(cards) 

    //um modo de selecionar isso seria usando o metodo map:
    // console.log(cards.map(pair => pair[0].icon)) // como dentro de cards eu tenho um conjunto de pares,
    //então eu poderia pegar para cada par eu vou retornar alguma coisa, como por exemplo: pair é um array,
    //entao eu poderia pegar o elemento 0 do icon e retornar somente os nomes das variaveis. Mas resumidamente
    //isso vai dividir o array cards, que vai contar com indice 0 com 10 elementos, e indice 1 com 10 elementos
    // e isso não soluciona o problema


    //existe um metodo chamado FLATMAP que tambem retorna um array, mas se cada elemento do array for um array
    //ele vai desmembrar isso e vai retornar um array com 20 indices
    // console.log(cards.flatMap(pair => pair))

    this.cards = this.cards.flatMap(pair => pair)
    this.shuffleCards()

    return this.cards

},

    //retorna os pares das cartas
    createPairFromFlags: function (flag){
        return [{
            id: this.createIdWithFlag(flag),
            icon: flag,
            flipped: false
        },
        {
            id: this.createIdWithFlag(flag),
            icon: flag,
            flipped: false
        }]
    },

    //cria um valor randomico para id das cartas
    createIdWithFlag: function(flag){
        return flag + parseInt(Math.random() * 1000)
    },

     shuffleCards: function(cards){
        //LÓGICA DA FUNÇÃO DE EMARALHAMENTO: Pego a ultima carta/index do array e TROCO de posição por uma aleatoria,
        //depois a mesma coisa com a penultima, e assim sucessivamente.
    
        let currentIndex = this.cards.length
        let randomIndex = 0
    
        while( currentIndex !== 0){  // enquanto currentindex for diferente de 0
    
            randomIndex = Math.floor(Math.random() * currentIndex)// só posso pegar 
            //cartas que não tenham sido embaralhadas, então por isso foi usado currentindex
    
            currentIndex-- // decrementa pois, veja o exemplo: se tenho um array com 3 elementos, 
            //o primeiro elemento vai ter indice 0 e ultimo elemento vai ter o indice 2.      
            // Talvez esteja certo( a carta/index do array foi trocado de posição, 
            //entao decrementa para ir pro proximo elemento.)
    
    
            //INVERTENDO AS CARTAS DE POSIÇÃO:
    
            ////////////////////////////    IMPORTANTE   //////////////////////////////////////////////////////////
            //entendendo como funciona a inversão:
            // let a = 5
            // let b = 10
    
            // [a,b] = [b,a]
            // console.log(a + " VARIAVEL A, seria a = 5 ") // variavel a passa a ter valor igual a 10
            // console.log(b + " VARIAVEL B, seria a = 10 ")// variavel b passa a ter valor igual a 5
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex] ]
    
    
    
        }
    }

}