import { Injectable } from "@angular/core";



export class Card {
  value!: string;
  suit!: number;
  isChosen!: boolean;
  isPairChosen!: boolean;
}

export class Player {
  id!: number;
  points!: number;
  name!: string;
  isMove!: boolean;
  icon!: number;

  constructor(id: number, name: string, isMove: boolean, icon: number) {
    this.id = id;
    this.points = 0;
    this.name = name;
    this.isMove = isMove;
    this.icon = icon;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GlobalService {



  private isInputAllowed: boolean = true;
  public init: boolean = true
  public init2: boolean = false
  public winner: string = ''

  private allPairsChosen: boolean = false

  public player1: Player = new Player(1, 'Player 1', true, 0);
  public player2: Player = new Player(2, 'Player 2', false, 0);

  private cards: Card[] = [
    { value: '🍇', suit: 1, isChosen: false, isPairChosen: false },
    { value: '🍇', suit: 2, isChosen: false, isPairChosen: false },
    { value: '🍉', suit: 3, isChosen: false, isPairChosen: false },
    { value: '🍉', suit: 4, isChosen: false, isPairChosen: false },
    { value: '🍊', suit: 5, isChosen: false, isPairChosen: false },
    { value: '🍊', suit: 6, isChosen: false, isPairChosen: false },
    { value: '🍅', suit: 7, isChosen: false, isPairChosen: false },
    { value: '🍅', suit: 8, isChosen: false, isPairChosen: false },
    { value: '🍓', suit: 9, isChosen: false, isPairChosen: false },
    { value: '🍓', suit: 10, isChosen: false, isPairChosen: false },
    { value: '🥥', suit: 11, isChosen: false, isPairChosen: false },
    { value: '🥥', suit: 12, isChosen: false, isPairChosen: false },
    { value: '🍑', suit: 13, isChosen: false, isPairChosen: false },
    { value: '🍑', suit: 14, isChosen: false, isPairChosen: false },
    { value: '🥝', suit: 15, isChosen: false, isPairChosen: false },
    { value: '🥝', suit: 16, isChosen: false, isPairChosen: false },
    { value: '🍒', suit: 17, isChosen: false, isPairChosen: false },
    { value: '🍒', suit: 18, isChosen: false, isPairChosen: false },
    { value: '🍌', suit: 19, isChosen: false, isPairChosen: false },
    { value: '🍌', suit: 20, isChosen: false, isPairChosen: false },
  ];



  private suits: number[] = this.cards.map(card => card.suit);
  private shuffledSuits = [...this.suits].sort(() => Math.random() - 0.5);

  public keyedCards: { [key: number]: Card } = this.suits.reduce((acc, suit, index) => {
    let shuffledSuit = this.shuffledSuits[index];
    //@ts-ignore
    acc[shuffledSuit] = { ...this.cards.find(card => card.suit === suit) };
    return acc;
  }, {});


  public chosenCards: any[] = [


  ]


  async cardChosen(value: string, suit: any) {

    if (!this.isInputAllowed) {
      console.log('input not allowed!')
      return;
    }

    if (this.chosenCards.length == 2) {
      return
    } else {
      this.chosenCards.push({ value: value, suit: suit });

    }




    this.keyedCards[suit].isChosen = true;

    if (this.chosenCards.length === 2) {

      if (this.chosenCards[0].suit === this.chosenCards[1].suit) {
        console.log('Cant choose matching suits!')

        this.chosenCards.splice(1)
        return
      }
      if (this.chosenCards[0].value === this.chosenCards[1].value) {
        this.isInputAllowed = false;
        console.log('Match!');
        setTimeout(async () => {
          this.keyedCards[this.chosenCards[0].suit].isPairChosen = true;
          this.keyedCards[this.chosenCards[1].suit].isPairChosen = true;


          this.chosenCards = [];

          if (this.player1.isMove) {
            this.player1.points = this.player1.points + 100
            this.player1.isMove = false
            this.player2.isMove = true



            await this.checkwin().then(() => {

              console.log(this.allPairsChosen)
              if (this.allPairsChosen) {
                if (this.player1.points > this.player2.points) {
                  this.winner = this.player1.name
                  return
                }
                if (this.player2.points > this.player1.points) {
                  this.winner = this.player2.name
                  return
                }
                else {
                  this.winner = 'Tie'
                }
              }
            });


            this.isInputAllowed = true;

            return
          }

          if (this.player2.isMove) {
            this.player2.points = this.player2.points + 100
            this.player2.isMove = false
            this.player1.isMove = true



            await this.checkwin().then(() => {

              console.log(this.allPairsChosen)
              if (this.allPairsChosen) {
                if (this.player1.points > this.player2.points) {
                  this.winner = this.player1.name
                  return
                }
                if (this.player2.points > this.player1.points) {
                  this.winner = this.player2.name
                  return
                }
                else {
                  this.winner = 'Tie'
                }
              }
            });
            this.isInputAllowed = true;
            return
          }

          this.isInputAllowed = true;
        }, 1000);
      } else {
        console.log('Not a match!');
        console.log(this.chosenCards[0].suit)
        console.log(this.chosenCards[1].suit)



        this.isInputAllowed = false;
        setTimeout(async () => {
          this.keyedCards[this.chosenCards[0].suit].isChosen = false;
          this.keyedCards[this.chosenCards[1].suit].isChosen = false;

          if (this.player1.isMove) {

            this.player1.isMove = false
            this.player2.isMove = true

            this.chosenCards = [];
            this.isInputAllowed = true;
            return
          }

          if (this.player2.isMove) {

            this.player2.isMove = false
            this.player1.isMove = true

            this.chosenCards = [];
            this.isInputAllowed = true;
            return
          }

          this.isInputAllowed = true;
        }, 1000);
      }

    }
  }

  async checkwin() {
    return new Promise<void>((resolve) => {
      this.allPairsChosen = Object.values(this.keyedCards).every(card => card.isPairChosen);
      resolve();
    });
  }

  async retry() {

    this.chosenCards = []
    this.player1.points = 0
    this.player2.points = 0
    this.player1.isMove = true
    this.player2.isMove = false
    this.winner = ''

    this.shuffledSuits = [...this.suits].sort(() => Math.random() - 0.5);

    
    this.keyedCards = this.suits.reduce((acc, suit, index) => {
      let shuffledSuit = this.shuffledSuits[index];
      //@ts-ignore
      acc[shuffledSuit] = { ...this.cards.find(card => card.suit === suit) };
      return acc;
    }, {});

  }

  async doNothing() {
    console.log('Already matched element!')
  }

  choseCard(card:Card,key:string){
    if (this.chosenCards.length == 2) {
      return
    } 
    if(!card.isPairChosen){ 
      this.cardChosen(card.value, key)
      return
    } 
    this.doNothing(); card.isChosen = true
  }

}