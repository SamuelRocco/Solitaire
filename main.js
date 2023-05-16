window.onload = pageload;
const cardfiles = [];
var DECK = [];
var spadesPile = [];
var heartsPile = [];
var diamondsPile = [];
var clubsPile = [];
var pile;

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

  // console.log(DECK);
  var shuffledDeck = shuffleDeck(DECK);
  DECK = shuffledDeck;
  pile = new CornerPile(DECK);
  pile.createPile(DECK);
  console.log(DECK);
}

class CornerPile {
  constructor(deck) {
    this.deck = deck;
  }
  createPile(leftoverPile) {
    var count = 0;
    const blankcard = "images/card_background/cardBlank.png";
    const facedownpile = document.createElement("button");
    const backcardsource = "images/card_background/cardBackground.png";
    var backimg = document.createElement("img");
    backimg.src = backcardsource;
    facedownpile.id = "fdp";
    $("facedownpile").append(facedownpile);
    $("fdp").append(backimg);
    var flag = true;
    $("fdp").onclick = flipcard;

    function flipcard() {
      console.log(count + " : " + leftoverPile.length);
      if (flag && count <= leftoverPile.length - 1) {
        const faceuppile = document.createElement("button");
        const upcardsource = "images/cards/" + leftoverPile[count].filename;
        var upimg = document.createElement("img");
        upimg.src = upcardsource;
        faceuppile.id = "fup";
        $("carduppile").textContent = "";
        $("carduppile").append(faceuppile);
        $("fup").append(upimg);
        $("fup").onclick = cardClicked;
        ++count;
        // if(count >= (2-leftoverPile.length)) {

        // }
        if (count > (leftoverPile.length-1)) {
          flag = false;
          backimg.src = blankcard;
          $("fdp").textContent = "";
          $("fdp").append(backimg);
          $("fdp").onclick = returnthepile;
        }
      }

      function returnthepile() {
        backimg.src = backcardsource;
        $("fdp").append(backimg);
        $("carduppile").textContent = "";
        $("facedownpile").textContent = "";
        console.log("reset");
        pile.createPile(leftoverPile);

        // createPile();
      }
    }
    function cardClicked() {
      var card = this.innerHTML;
      var cardsource = card.substring(card.indexOf("=")+2).replace(/\.[^/.]+$/, "");
      console.log(cardsource);


      leftoverPile.forEach(element => {
        if (element.faceupImage.replace(/\.[^/.]+$/, "") == cardsource) {
          // you are here
        }
      });
    }

  }
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
    this.facedownImage = "images/card_background/cardBackground.png";
    this.faceupImage = "images/cards/" + card;
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
  }
  facedown() {
    this.facingup = false;
    this.facingdown = true;
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

function shuffleDeck(deck) {
  for (var i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
}
