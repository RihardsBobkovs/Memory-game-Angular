import { Injectable } from "@angular/core";

interface Card {
  value: string;
  suit: number;
  isChosen: boolean;
  isPairChosen: boolean;
}

@Injectable({
    providedIn: 'root'
  })
export class GlobalService{

  public winner: string = ''

  public allPairsChosen: boolean = false
  
  public player1 = {
    id: 1,
    points: 0,
    name: 'Adams',
    isMove: true,

  }

  public player2 = {
    id: 2,
    points: 0,
    name: 'Ieva',
    isMove: false,
  }

  public cards: Card[] = [
    { value: 'A', suit: 1, isChosen: false, isPairChosen: false },
    { value: 'A', suit: 2, isChosen: false, isPairChosen: false },
    { value: 'B', suit: 3, isChosen: false, isPairChosen: false },
    { value: 'B', suit: 4, isChosen: false, isPairChosen: false },
    { value: 'C', suit: 5, isChosen: false, isPairChosen: false },
    { value: 'C', suit: 6, isChosen: false, isPairChosen: false },
    { value: 'D', suit: 7, isChosen: false, isPairChosen: false },
    { value: 'D', suit: 8, isChosen: false, isPairChosen: false },
    { value: 'E', suit: 9, isChosen: false, isPairChosen: false },
    { value: 'E', suit: 10, isChosen: false, isPairChosen: false },
    { value: 'F', suit: 11, isChosen: false, isPairChosen: false },
    { value: 'F', suit: 12, isChosen: false, isPairChosen: false },
    { value: 'G', suit: 13, isChosen: false, isPairChosen: false },
    { value: 'G', suit: 14, isChosen: false, isPairChosen: false },
    { value: 'H', suit: 15, isChosen: false, isPairChosen: false },
    { value: 'H', suit: 16, isChosen: false, isPairChosen: false },
    { value: 'I', suit: 17, isChosen: false, isPairChosen: false },
    { value: 'I', suit: 18, isChosen: false, isPairChosen: false },
    { value: 'J', suit: 19, isChosen: false, isPairChosen: false },
    { value: 'J', suit: 20, isChosen: false, isPairChosen: false },
  ];

  public keyedCards: { [key: number]: Card } = this.cards.reduce((acc, card) => {
    //@ts-ignore
    acc[card.suit] = { ...card };
    return acc;
  }, {});
  

  public chosenCards: any[] = [
    

  ]

  async cardChosen(value: string, suit: any) {
    console.log('keyedCards:', this.keyedCards);
    
    this.chosenCards.push({ value: value, suit: suit });
  
    console.log('chosenCards:', this.chosenCards);
  
    console.log('suit:', suit);
  
    this.keyedCards[suit].isChosen = true;
  
    console.log('AFTER TRUE:', this.keyedCards);
  
    if (this.chosenCards.length === 2) {
      if (this.chosenCards[0].value === this.chosenCards[1].value) {
        console.log('Match!');
        setTimeout(() => {
        this.keyedCards[this.chosenCards[0].suit].isPairChosen = true;
        this.keyedCards[this.chosenCards[1].suit].isPairChosen = true;

        console.log('AFTER setting Pairs:', this.keyedCards);
        
        this.allPairsChosen = this.cards.every(card => card.isPairChosen);

        console.log("VISI IZVEELEETI?: ", this.allPairsChosen)

        this.chosenCards = [];

        if(this.player1.isMove){
          this.player1.points = this.player1.points + 100
          this.player1.isMove = false
          this.player2.isMove = true

          if(this.allPairsChosen){
            if(this.player1.points > this.player2.points){
              this.winner = this.player1.name
              return
            }
            if(this.player2.points > this.player1.points){
              this.winner = this.player2.name
            }
            else{
              this.winner = 'Tie'
            }
          }


          return
        }

        if(this.player2.isMove){
          this.player2.points = this.player2.points + 100
          this.player2.isMove = false
          this.player1.isMove = true


          if(this.allPairsChosen){
            if(this.player1.points > this.player2.points){
              this.winner = this.player1.name
              return
            }
            if(this.player2.points > this.player1.points){
              this.winner = this.player2.name
            }
            else{
              this.winner = 'Tie'
            }
          }

          return
        }


      }, 1000);
      } else {
        console.log('Not a match!');
        console.log(this.chosenCards[0].suit)
        console.log(this.chosenCards[1].suit)

        
        

        setTimeout(() => {
           this.keyedCards[this.chosenCards[0].suit].isChosen = false;
          this.keyedCards[this.chosenCards[1].suit].isChosen = false;

          if(this.player1.isMove){
          
            this.player1.isMove = false
            this.player2.isMove = true

            this.chosenCards = [];

            return
          }
  
          if(this.player2.isMove){
            
            this.player2.isMove = false
            this.player1.isMove = true

            this.chosenCards = [];

            return
          }

          
        }, 1000);
      }
      
    }
  }

  async doNothing(){
    console.log('Already matched element!')
  }

}