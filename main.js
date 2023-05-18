window.onload = pageload;
const cardfiles = [];
var DECK = [];
var shuffledDeck;
var facedownpile = [];
var faceuppile = [];
var spades = [];
var hearts = [];
var diamonds = [];
var clubs = [];
var column1 = [];
var column2 = [];
var column3 = [];
var column4 = [];
var column5 = [];
var column6 = [];
var column7 = [];

function pageload() {
  cardfiles.push(
    "10_of_clubs.png",
    "10_of_diamonds.png",
    "10_of_hearts.png",
    "10_of_spades.png",
    "2_of_clubs.png",
    "2_of_diamonds.png",
    "2_of_hearts.png",
    "2_of_spades.png",
    "3_of_clubs.png",
    "3_of_diamonds.png",
    "3_of_hearts.png",
    "3_of_spades.png",
    "4_of_clubs.png",
    "4_of_diamonds.png",
    "4_of_hearts.png",
    "4_of_spades.png",
    "5_of_clubs.png",
    "5_of_diamonds.png",
    "5_of_hearts.png",
    "5_of_spades.png",
    "6_of_clubs.png",
    "6_of_diamonds.png",
    "6_of_hearts.png",
    "6_of_spades.png",
    "7_of_clubs.png",
    "7_of_diamonds.png",
    "7_of_hearts.png",
    "7_of_spades.png",
    "8_of_clubs.png",
    "8_of_diamonds.png",
    "8_of_hearts.png",
    "8_of_spades.png",
    "9_of_clubs.png",
    "9_of_diamonds.png",
    "9_of_hearts.png",
    "9_of_spades.png",
    "ace_of_clubs.png",
    "ace_of_diamonds.png",
    "ace_of_hearts.png",
    "ace_of_spades.png",
    "jack_of_clubs2.png",
    "jack_of_diamonds2.png",
    "jack_of_hearts2.png",
    "jack_of_spades2.png",
    "king_of_clubs2.png",
    "king_of_diamonds2.png",
    "king_of_hearts2.png",
    "king_of_spades2.png",
    "queen_of_clubs2.png",
    "queen_of_diamonds2.png",
    "queen_of_hearts2.png",
    "queen_of_spades2.png"
  );

  cardfiles.forEach((c) => {
    const card = new Card(c);
    DECK.push(card);
  });

  shuffledDeck = shuffle(DECK);

  dealCards();
  console.log(column1);
  console.log(column2);
  console.log(column3);
  console.log(column4);
  console.log(column5);
  console.log(column6);
  console.log(column7);
  console.log(facedownpile);
}


function dealCards() {

  var item;
  for (var i = 0; i < 7; i++) {
    if (i == 0) {
      item = shuffledDeck.shift();
      item.faceup();
      column1.push(item);
    }

    if (i < 1) {
      item = shuffledDeck.shift();
      item.facedown();
      column2.push(item);
    } else if (i == 1) {
      item = shuffledDeck.shift();
      item.faceup();
      column2.push(item);
    }

    if (i < 2) {
      item = shuffledDeck.shift();
      item.facedown();
      column3.push(item);
    } else if (i == 2) {
      item = shuffledDeck.shift();
      item.faceup();
      column3.push(item);
    }

    if (i < 3) {
      item = shuffledDeck.shift();
      item.facedown();
      column4.push(item);
    } else if (i == 3) {
      item = shuffledDeck.shift();
      item.faceup();
      column4.push(item);
    }

    if (i < 4) {
      item = shuffledDeck.shift();
      item.facedown();
      column5.push(item);
    } else if (i == 4) {
      item = shuffledDeck.shift();
      item.faceup();
      column5.push(item);
    }

    if (i < 5) {
      item = shuffledDeck.shift();
      item.facedown();
      column6.push(item);
    } else if (i == 5) {
      item = shuffledDeck.shift();
      item.faceup();
      column6.push(item);
    }

    if (i < 6) {
      item = shuffledDeck.shift();
      item.facedown();
      column7.push(item);
    } else if (i == 6) {
      item = shuffledDeck.shift();
      item.faceup();
      column7.push(item);
    }
  }



  facedownpile = shuffledDeck;    //transfer all cards to the facedown pile

  facedownpile.forEach(element => {   //make every card face down in the facedown pile
    element.facedown();
  });

  shuffledDeck = [];    //make shuffledDeck pile equal Null, not needed anymore, all cards are dealt

}



class Card {
  constructor(card) {
    this.filename = card;
    this.facevalue = card
      .substring(card.indexOf("_") + 4)
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z]+/g, "");
    this.numvalue = this.findnumvalue(card);
    this.facingup = true;
    this.facingdown = false;
    this.image;
    // console.log(card);
  }
  orientation() {
    if (this.facingup) {
      return "facingup";
    } else if (this.facingdown) {
      return "facingdown";
    }
  }
  faceup() {
    this.facingup = true;
    this.facingdown = false;
    this.image = "images/cards/" + this.filename;
  }
  facedown() {
    this.facingup = false;
    this.facingdown = true;
    this.image = "images/card_background/cardBackground.png";
  }
  findnumvalue(card) {
    var num = card.substring(0, card.indexOf("_"));

    switch (num) {
      case "king":
        num = "13";
        return num;
        break;
      case "queen":
        num = "12";
        return num;
        break;
      case "jack":
        num = "11";
        return num;
        break;
      case "ace":
        num = "1";
        return num;
        break;
      default:
        return num;
        break;
    }
  }
}

function shuffle(deck) {
  for (var i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
}
