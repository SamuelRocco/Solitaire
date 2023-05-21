window.onload = pageload;
const cardfiles = [];
var DECK = [];
var shuffledDeck;
var stockpile = [];
var wastepile = [];
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
  createStockAndWaste();
  console.log(column1);
  console.log(column2);
  console.log(column3);
  console.log(column4);
  console.log(column5);
  console.log(column6);
  console.log(column7);
  console.log(stockpile);
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



  stockpile = shuffledDeck;    //transfer all cards to the facedown pile

  stockpile.forEach(element => {   //make every card face down in the facedown pile
    element.facedown();
  });

  shuffledDeck = [];    //make shuffledDeck pile equal Null, not needed anymore, all cards are dealt


  dealCardColumnPiles();

}

function createStockAndWaste() {
  refreshwastepile();
  refreshstockpile();
  //stock pile
  var image;
  function refreshstockpile() {
    if (stockpile.length != 0) {
      image = "images/card_background/cardBackground.png";
    } else {
      image = "images/card_background/cardBlank.png";
    }
    var stock = document.getElementsByClassName("stock");
    var stockpilebutton = document.createElement("button");
    var cardimage = document.createElement("img");
    cardimage.src = image;
    stockpilebutton.appendChild(cardimage);
    stockpilebutton.className += "stockcard";
    stock[0].appendChild(stockpilebutton);
    if (image == "images/card_background/cardBackground.png") {
      stockpilebutton.onclick = stocktowaste;
    } else if (image == "images/card_background/cardBlank.png") {
      stockpilebutton.onclick = wastetostock;
    }
  }

  //waste pile
  function refreshwastepile() {
    if (wastepile.length > 0) {
      var waste = document.getElementsByClassName("waste");
      var wastepilebutton = document.createElement("button");
      wastepilebutton.className += "stockcard";
      var image2 = wastepile[wastepile.length - 1].image; //last image on top
      var cardimage2 = document.createElement("img");
      cardimage2.src = image2;
      wastepilebutton.appendChild(cardimage2);
      waste[0].appendChild(wastepilebutton);

      wastepilebutton.addEventListener('click', function () {
        var cardmoved = checkifcardgoesondifferentpile("wastepile");
        if (cardmoved) {
          var waste = document.getElementsByClassName("waste");
          console.log(wastepile);
          waste[0].textContent = "";
          refreshwastepile();
        }
      }, false);
    }
  }

  function wastetostock() {
    stockpile = wastepile;
    wastepile = [];
    var waste = document.getElementsByClassName("waste");
    waste[0].textContent = "";
    var stock = document.getElementsByClassName("stock");
    stock[0].textContent = "";
    refreshstockpile();
    refreshwastepile();
  }

  function stocktowaste() {
    var shiftedstockcard = stockpile.shift();
    shiftedstockcard.faceup();
    wastepile.push(shiftedstockcard);
    var waste = document.getElementsByClassName("waste");
    waste[0].textContent = "";
    var stock = document.getElementsByClassName("stock");
    stock[0].textContent = "";
    refreshstockpile();
    refreshwastepile();
  }
}

function dealCardColumnPiles() {
  //for column 1
  var c1 = document.getElementsByClassName("column1");
  for (var a = 0; a < column1.length; a++) {
    var col1butt = document.createElement("button");
    var image = column1[a].image;
    var cardimage = document.createElement("img");
    cardimage.src = image;
    col1butt.appendChild(cardimage);
    col1butt.className += "c1 r" + (a + 1).toString();
    c1[0].appendChild(col1butt);

    //column1button***********************************************************************************************************************/
    if (column1[a].orientation() == "facingup") {
      col1butt.addEventListener('click', function () {
        var cardmoved = checkifcardgoesondifferentpile("column1");
        if (cardmoved) {
          c1[0].textContent = "";
          dealCardColumnPiles();
          console.log(column1);
        }
      }, false);
    }
  }

  //***********************************************************************************************************************/

  //for column 2
  var c2 = document.getElementsByClassName("column2");
  for (var b = 0; b < column2.length; b++) {
    var col2butt = document.createElement("button");
    var image2 = column2[b].image;
    var cardimage2 = document.createElement("img");
    cardimage2.src = image2;
    col2butt.appendChild(cardimage2);
    col2butt.className += "c2 r" + (b + 1).toString();
    c2[0].appendChild(col2butt);


    //column2button***********************************************************************************************************************/

    if (column2[b].orientation() == "facingup") {
      col2butt.addEventListener('click', function () {
        var cardmoved = checkifcardgoesondifferentpile("column2");
        if (cardmoved) {
          c2[0].textContent = "";
          dealCardColumnPiles();
          console.log(column2);
        }
      }, false);
    }
  }


  //***********************************************************************************************************************/

  //for column 3
  var c3 = document.getElementsByClassName("column3");
  for (var c = 0; c < column3.length; c++) {
    var col3butt = document.createElement("button");
    var image3 = column3[c].image;
    var cardimage3 = document.createElement("img");
    cardimage3.src = image3;
    col3butt.appendChild(cardimage3);
    col3butt.className += "c3 r" + (c + 1).toString();
    c3[0].appendChild(col3butt);


    //column3button***********************************************************************************************************************/
    if (column3[c].orientation() == "facingup") {
      col3butt.addEventListener('click', function () {
        var cardmoved = checkifcardgoesondifferentpile("column3");
        if (cardmoved) {
          c3[0].textContent = "";
          dealCardColumnPiles();
          console.log(column3);
        }
      }, false);
    }
  }


  //***********************************************************************************************************************/

  //for column 3
  var c4 = document.getElementsByClassName("column4");
  for (var d = 0; d < column4.length; d++) {
    var col4butt = document.createElement("button");
    var image4 = column4[d].image;
    var cardimage4 = document.createElement("img");
    cardimage4.src = image4;
    col4butt.appendChild(cardimage4);
    col4butt.className += "c4 r" + (d + 1).toString();
    c4[0].appendChild(col4butt);


    //column4button***********************************************************************************************************************/
    if (column4[d].orientation() == "facingup") {
      col4butt.addEventListener('click', function () {
        var cardmoved = checkifcardgoesondifferentpile("column4");
        if (cardmoved) {
          c4[0].textContent = "";
          dealCardColumnPiles();
          console.log(column4);
        }
      }, false);
    }
  }


  //***********************************************************************************************************************/

  //for column 3
  var c5 = document.getElementsByClassName("column5");
  for (var e = 0; e < column5.length; e++) {
    var col5butt = document.createElement("button");
    var image5 = column5[e].image;
    var cardimage5 = document.createElement("img");
    cardimage5.src = image5;
    col5butt.appendChild(cardimage5);
    col5butt.className += "c5 r" + (e + 1).toString();
    c5[0].appendChild(col5butt);


    //column5button***********************************************************************************************************************/
    if (column5[e].orientation() == "facingup") {
      col5butt.addEventListener('click', function () {
        var cardmoved = checkifcardgoesondifferentpile("column5");
        if (cardmoved) {
          c5[0].textContent = "";
          dealCardColumnPiles();
          console.log(column5);
        }
      }, false);
    }
  }


  //***********************************************************************************************************************/

  //for column 3
  var c6 = document.getElementsByClassName("column6");
  for (var f = 0; f < column6.length; f++) {
    var col6butt = document.createElement("button");
    var image6 = column6[f].image;
    var cardimage6 = document.createElement("img");
    cardimage6.src = image6;
    col6butt.appendChild(cardimage6);
    col6butt.className += "c6 r" + (f + 1).toString();
    c6[0].appendChild(col6butt);


    //column6button***********************************************************************************************************************/
    if (column6[f].orientation() == "facingup") {
      col6butt.addEventListener('click', function () {
        var cardmoved = checkifcardgoesondifferentpile("column6");
        if (cardmoved) {
          c6[0].textContent = "";
          dealCardColumnPiles();
          console.log(column6);
        }
      }, false);
    }
  }


  //***********************************************************************************************************************/

  //for column 3
  var c7 = document.getElementsByClassName("column7");
  for (var g = 0; g < column7.length; g++) {
    var col7butt = document.createElement("button");
    var image7 = column7[g].image;
    var cardimage7 = document.createElement("img");
    cardimage7.src = image7;
    col7butt.appendChild(cardimage7);
    col7butt.className += "c7 r" + (g + 1).toString();
    c7[0].appendChild(col7butt);


    //column7button***********************************************************************************************************************/
    if (column7[g].orientation() == "facingup") {
      col7butt.addEventListener('click', function () {
        var cardmoved = checkifcardgoesondifferentpile("column7");
        if (cardmoved) {
          c7[0].textContent = "";
          console.log("7 clicked");
          dealCardColumnPiles();
          console.log(column7);
        }
      }, false);
    }
  }


  //***********************************************************************************************************************/

}



//************************************************************************************* */


function checkifcardgoesondifferentpile(arrayname) {

  if (arrayname == "wastepile") {   //if coming from wastepile

    console.log(arrayname);
    wastepile.splice(-1, 1);
    return true;

  } else if (arrayname == "column1") {    //if coming from column1
    console.log(arrayname);
    column1.splice(-1, 1);
    if (column1.length >= 1) {
      column1[column1.length - 1].faceup();
    }
    return true;
  } else if (arrayname == "column2") {    //if coming from column2
    console.log(arrayname);
    column2.splice(-1, 1);
    if (column2.length >= 1) {
      column2[column2.length - 1].faceup();
    }
    // console.log(column2[0]);
    return true;
  } else if (arrayname == "column3") {    //if coming from column3
    console.log(arrayname);
    column3.splice(-1, 1);
    if (column3.length >= 1) {
      column3[column3.length - 1].faceup();
    }
    return true;
  } else if (arrayname == "column4") {    //if coming from column4
    console.log(arrayname);
    column4.splice(-1, 1);
    if (column4.length >= 1) {
      column4[column4.length - 1].faceup();
    }
    return true;
  } else if (arrayname == "column5") {    //if coming from column5
    console.log(arrayname);
    column5.splice(-1, 1);
    if (column5.length >= 1) {
      column5[column5.length - 1].faceup();
    }
    return true;
  } else if (arrayname == "column6") {    //if coming from column6
    console.log(arrayname);
    column6.splice(-1, 1);
    if (column6.length >= 1) {
      column6[column6.length - 1].faceup();
    }
    return true;
  } else if (arrayname == "column7") {    //if coming from column7
    console.log(arrayname);
    column7.splice(-1, 1);
    if (column7.length >= 1) {
      column7[column7.length - 1].faceup();
    }
    return true;
    // } else if (arrayname == "clubs") {    //if coming from column7
    //   console.log(arrayname);
    //   clubs.splice(-1, 1);
    //   if (clubs.length >= 1) {
    //     clubs[clubs.length - 1].faceup();
    //   }
    //   return true;
    // } else if (arrayname == "hearts") {    //if coming from column7
    //   console.log(arrayname);
    //   hearts.splice(-1, 1);
    //   if (hearts.length >= 1) {
    //     hearts[hearts.length - 1].faceup();
    //   }
    //   return true;
    // } else if (arrayname == "spades") {    //if coming from column7
    //   console.log(arrayname);
    //   spades.splice(-1, 1);
    //   if (spades.length >= 1) {
    //     spades[spades.length - 1].faceup();
    //   }
    //   return true;
    // } else if (arrayname == "diamonds") {    //if coming from column7
    //   console.log(arrayname);
    //   diamonds.splice(-1, 1);
    //   if (diamonds.length >= 1) {
    //     diamonds[diamonds.length - 1].faceup();
    //   }
    //   return true;
  } else {
    return false;
  }



}

//************************************************************************************* */

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

class Card {
  constructor(card) {
    this.filename = card;
    this.facevalue = card.substring(card.indexOf("_") + 4).replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z]+/g, "");
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
