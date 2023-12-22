window.onload = pageload;
const cardfiles = [];
var DECK = [];
var shuffledDeck;
var stockpile = [];
var wastepile = [];
let foundation = {
  spades: [],
  hearts: [],
  diamonds: [],
  clubs: [],
};
let columns = {
  column1: [],
  column2: [],
  column3: [],
  column4: [],
  column5: [],
  column6: [],
  column7: [],
};
const allArrays = [];

function pageload() {
  allArrays.push(
    foundation.clubs,
    foundation.hearts,
    foundation.spades,
    foundation.diamonds,
    columns.column1,
    columns.column2,
    columns.column3,
    columns.column4,
    columns.column5,
    columns.column6,
    columns.column7
  );
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
  console.log(columns.column1);
  console.log(columns.column2);
  console.log(columns.column3);
  console.log(columns.column4);
  console.log(columns.column5);
  console.log(columns.column6);
  console.log(columns.column7);
  console.log(stockpile);
}

function updatePiles() {
  dealCardColumnPiles();
  createFoundation();
}

function dealCards() {
  var item;
  for (var i = 0; i < 7; i++) {
    if (i == 0) {
      item = shuffledDeck.shift();
      item.faceup();
      columns.column1.push(item);
    }

    if (i < 1) {
      item = shuffledDeck.shift();
      item.facedown();
      // item.faceup();
      columns.column2.push(item);
    } else if (i == 1) {
      item = shuffledDeck.shift();
      item.faceup();
      columns.column2.push(item);
    }

    if (i < 2) {
      item = shuffledDeck.shift();
      item.facedown();
      // item.faceup();
      columns.column3.push(item);
    } else if (i == 2) {
      item = shuffledDeck.shift();
      item.faceup();
      columns.column3.push(item);
    }

    if (i < 3) {
      item = shuffledDeck.shift();
      item.facedown();
      columns.column4.push(item);
    } else if (i == 3) {
      item = shuffledDeck.shift();
      item.faceup();
      columns.column4.push(item);
    }

    if (i < 4) {
      item = shuffledDeck.shift();
      item.facedown();
      columns.column5.push(item);
    } else if (i == 4) {
      item = shuffledDeck.shift();
      item.faceup();
      columns.column5.push(item);
    }

    if (i < 5) {
      item = shuffledDeck.shift();
      // item.facedown();
      item.faceup();
      columns.column6.push(item);
    } else if (i == 5) {
      item = shuffledDeck.shift();
      item.faceup();
      columns.column6.push(item);
    }

    if (i < 6) {
      item = shuffledDeck.shift();
      item.facedown();
      columns.column7.push(item);
    } else if (i == 6) {
      item = shuffledDeck.shift();
      item.faceup();
      columns.column7.push(item);
    }
  }

  stockpile = shuffledDeck; //transfer all cards to the facedown pile

  stockpile.forEach((element) => {
    //make every card face down in the facedown pile
    element.facedown();
  });

  shuffledDeck = []; //make shuffledDeck pile equal Null, not needed anymore, all cards are dealt

  dealCardColumnPiles();

  createFoundation();
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
      wastepilebutton.className += "wastecard"; //changed from stockcard
      var image2 = wastepile[wastepile.length - 1].image; //last image on top
      var cardimage2 = document.createElement("img");
      cardimage2.src = image2;
      wastepilebutton.appendChild(cardimage2);
      waste[0].appendChild(wastepilebutton);

      wastepilebutton.addEventListener(
        "click",
        function () {
          var cardmoved = checkifcardgoesondifferentpile(
            wastepile,
            wastepile.length - 1
          );
          if (cardmoved) {
            var waste = document.getElementsByClassName("waste");
            waste[0].textContent = "";
            refreshwastepile();
          }
        },
        false
      );
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
  for (var a = 0; a < columns.column1.length; a++) {
    var col1butt = document.createElement("button");
    var image = columns.column1[a]?.image;
    var cardimage = document.createElement("img");
    cardimage.src = image;
    col1butt.appendChild(cardimage);
    col1butt.className += "c1 r" + (a + 1).toString();
    c1[0].appendChild(col1butt);

    //column1button***********************************************************************************************************************/
    if (columns.column1[a]?.orientation() == "facingup") {
      col1butt.addEventListener(
        "click",
        function () {
          var cardClickedIndex = this.classList[1][1] - 1;
          var cardmoved = checkifcardgoesondifferentpile(
            columns.column1,
            cardClickedIndex
          );
          if (cardmoved) {
            c1[0].textContent = "";
            dealCardColumnPiles();
            // console.log(columns.column1);
          }
        },
        false
      );
    }
  }

  //***********************************************************************************************************************/

  //for column 2
  var c2 = document.getElementsByClassName("column2");
  for (var b = 0; b < columns.column2.length; b++) {
    var col2butt = document.createElement("button");
    var image2 = columns.column2[b]?.image;
    var cardimage2 = document.createElement("img");
    cardimage2.src = image2;
    col2butt.appendChild(cardimage2);
    col2butt.className += "c2 r" + (b + 1).toString();
    c2[0].appendChild(col2butt);

    //column2button***********************************************************************************************************************/

    if (columns.column2[b]?.orientation() == "facingup") {
      col2butt.addEventListener(
        "click",
        function () {
          var cardClickedIndex = this.classList[1][1] - 1;
          var cardmoved = checkifcardgoesondifferentpile(
            columns.column2,
            cardClickedIndex
          );
          if (cardmoved) {
            c2[0].textContent = "";
            dealCardColumnPiles();
            // console.log(columns.column2);
          }
        },
        false
      );
    }
  }

  //***********************************************************************************************************************/

  //for column 3
  var c3 = document.getElementsByClassName("column3");
  for (var c = 0; c < columns.column3.length; c++) {
    var col3butt = document.createElement("button");
    var image3 = columns.column3[c]?.image;
    var cardimage3 = document.createElement("img");
    cardimage3.src = image3;
    col3butt.appendChild(cardimage3);
    col3butt.className += "c3 r" + (c + 1).toString();
    c3[0].appendChild(col3butt);

    //column3button***********************************************************************************************************************/
    if (columns.column3[c]?.orientation() == "facingup") {
      col3butt.addEventListener(
        "click",
        function () {
          var cardClickedIndex = this.classList[1][1] - 1;
          var cardmoved = checkifcardgoesondifferentpile(
            columns.column3,
            cardClickedIndex
          );
          if (cardmoved) {
            c3[0].textContent = "";
            dealCardColumnPiles();
            // console.log(column3);
          }
        },
        false
      );
    }
  }

  //***********************************************************************************************************************/

  //for column 3
  var c4 = document.getElementsByClassName("column4");
  for (var d = 0; d < columns.column4.length; d++) {
    var col4butt = document.createElement("button");
    var image4 = columns.column4[d]?.image;
    var cardimage4 = document.createElement("img");
    cardimage4.src = image4;
    col4butt.appendChild(cardimage4);
    col4butt.className += "c4 r" + (d + 1).toString();
    c4[0].appendChild(col4butt);

    //columns.column4button***********************************************************************************************************************/
    if (columns.column4[d]?.orientation() == "facingup") {
      col4butt.addEventListener(
        "click",
        function () {
          var cardClickedIndex = this.classList[1][1] - 1;
          var cardmoved = checkifcardgoesondifferentpile(
            columns.column4,
            cardClickedIndex
          );
          if (cardmoved) {
            c4[0].textContent = "";
            dealCardColumnPiles();
            // console.log(columns.column4);
          }
        },
        false
      );
    }
  }

  //***********************************************************************************************************************/

  //for column 3
  var c5 = document.getElementsByClassName("column5");
  for (var e = 0; e < columns.column5.length; e++) {
    var col5butt = document.createElement("button");
    var image5 = columns.column5[e]?.image;
    var cardimage5 = document.createElement("img");
    cardimage5.src = image5;
    col5butt.appendChild(cardimage5);
    col5butt.className += "c5 r" + (e + 1).toString();
    c5[0].appendChild(col5butt);

    //columns.column5button***********************************************************************************************************************/
    if (columns.column5[e]?.orientation() == "facingup") {
      col5butt.addEventListener(
        "click",
        function () {
          var cardClickedIndex = this.classList[1][1] - 1;
          var cardmoved = checkifcardgoesondifferentpile(
            columns.column5,
            cardClickedIndex
          );
          if (cardmoved) {
            c5[0].textContent = "";
            dealCardColumnPiles();
            // console.log(columns.column5);
          }
        },
        false
      );
    }
  }

  //***********************************************************************************************************************/

  //for column 3
  var c6 = document.getElementsByClassName("column6");
  for (var f = 0; f < columns.column6.length; f++) {
    var col6butt = document.createElement("button");
    var image6 = columns.column6[f]?.image;
    var cardimage6 = document.createElement("img");
    cardimage6.src = image6;
    col6butt.appendChild(cardimage6);
    col6butt.className += "c6 r" + (f + 1).toString();
    c6[0].appendChild(col6butt);

    //columns.column6button***********************************************************************************************************************/
    if (columns.column6[f]?.orientation() == "facingup") {
      col6butt.addEventListener(
        "click",
        function () {
          var cardClickedIndex = this.classList[1][1] - 1;
          var cardmoved = checkifcardgoesondifferentpile(
            columns.column6,
            cardClickedIndex
          );
          if (cardmoved) {
            c6[0].textContent = "";
            dealCardColumnPiles();
            // console.log(columns.column6);
          }
        },
        false
      );
    }
  }

  //***********************************************************************************************************************/

  //for column 3
  var c7 = document.getElementsByClassName("column7");
  for (var g = 0; g < columns.column7.length; g++) {
    var col7butt = document.createElement("button");
    var image7 = columns.column7[g]?.image;
    var cardimage7 = document.createElement("img");
    cardimage7.src = image7;
    col7butt.appendChild(cardimage7);
    col7butt.className += "c7 r" + (g + 1).toString();
    c7[0].appendChild(col7butt);

    //columns.column7button***********************************************************************************************************************/
    if (columns.column7[g]?.orientation() == "facingup") {
      col7butt.addEventListener(
        "click",
        function () {
          var cardClickedIndex = this.classList[1][1] - 1;
          var cardmoved = checkifcardgoesondifferentpile(
            columns.column7,
            cardClickedIndex
          );
          if (cardmoved) {
            c7[0].textContent = "";
            dealCardColumnPiles();
            // console.log(columns.column7);
          }
        },
        false
      );
    }
  }

  //***********************************************************************************************************************/
}

function createFoundation() {
  //foundation.clubs
  if (foundation.clubs.length != 0) {
    var club = document.getElementsByClassName("clubs");
    var clubspilebutton = document.createElement("button");
    clubspilebutton.className += "clubscard";
    var clubsimage = foundation.clubs[foundation.clubs.length - 1].image;
    // var clubsimage = "images/card_background/cardBackground.png";
    var clubsbuttonimage = document.createElement("img");
    clubsbuttonimage.src = clubsimage;
    clubspilebutton.appendChild(clubsbuttonimage);
    club[0].appendChild(clubspilebutton);

    clubspilebutton.addEventListener(
      "click",
      function () {
        var cardmoved = checkifcardgoesondifferentpile(foundation.clubs, -1);
        if (cardmoved) {
          club[0].textContent = "";
          createFoundation();
          console.log(foundation.clubs);
        }
      },
      false
    );
  }

  //foundation.hearts
  if (foundation.hearts.length != 0) {
    var heart = document.getElementsByClassName("hearts");
    var heartspilebutton = document.createElement("button");
    heartspilebutton.className += "heartscard";
    var heartsimage = foundation.hearts[foundation.hearts.length - 1].image;
    // var heartsimage = "images/card_background/cardBackground.png";
    var heartsbuttonimage = document.createElement("img");
    heartsbuttonimage.src = heartsimage;
    heartspilebutton.appendChild(heartsbuttonimage);
    heart[0].appendChild(heartspilebutton);

    heartspilebutton.addEventListener(
      "click",
      function () {
        var cardmoved = checkifcardgoesondifferentpile(foundation.hearts, -1);
        if (cardmoved) {
          heart[0].textContent = "";
          createFoundation();
          console.log(foundation.hearts);
        }
      },
      false
    );
  }

  //foundation.spades
  if (foundation.spades.length != 0) {
    var spade = document.getElementsByClassName("spades");
    var spadespilebutton = document.createElement("button");
    spadespilebutton.className += "spadescard";
    var spadesimage = foundation.spades[foundation.spades.length - 1].image;
    // var spadesimage = "images/card_background/cardBackground.png";
    var spadesbuttonimage = document.createElement("img");
    spadesbuttonimage.src = spadesimage;
    spadespilebutton.appendChild(spadesbuttonimage);
    spade[0].appendChild(spadespilebutton);

    spadespilebutton.addEventListener(
      "click",
      function () {
        var cardmoved = checkifcardgoesondifferentpile(foundation.spades, -1);
        if (cardmoved) {
          spade[0].textContent = "";
          createFoundation();
          console.log(foundation.spades);
        }
      },
      false
    );
  }

  //foundation.diamonds
  if (foundation.diamonds.length != 0) {
    var diamond = document.getElementsByClassName("diamonds");
    var diamondspilebutton = document.createElement("button");
    diamondspilebutton.className += "diamondscard";
    var diamondsimage =
      foundation.diamonds[foundation.diamonds.length - 1].image;
    // var diamondsimage = "images/card_background/cardBackground.png";
    var diamondsbuttonimage = document.createElement("img");
    diamondsbuttonimage.src = diamondsimage;
    diamondspilebutton.appendChild(diamondsbuttonimage);
    diamond[0].appendChild(diamondspilebutton);

    diamondspilebutton.addEventListener(
      "click",
      function () {
        var cardmoved = checkifcardgoesondifferentpile(foundation.diamonds, -1);
        if (cardmoved) {
          diamond[0].textContent = "";
          createFoundation();
          console.log(foundation.diamonds);
        }
      },
      false
    );
  }
}

//**************************************************************************************/
function rotateToIndex(arr, index) {
  if (index < 0 || index >= arr.length) {
    return arr; // Return the original array if the index is out of bounds
  }

  let part1 = arr.slice(index); // Elements from index to end
  let part2 = arr.slice(0, index); // Elements from start to index (exclusive)

  return part1.concat(part2);
}
function getKeyFromArray(obj, val) {
  return Object.keys(obj).find((key) => obj[key] === val);
}

function checkingSystem(destinationPile, originPile, cardsBeingMoved) {
  startIndex = originPile.indexOf(cardsBeingMoved[0]); // if its a king and there is an empty spot

  if (getKeyFromArray(foundation, originPile) !== undefined) {
    var nameOfOriginPile = getKeyFromArray(foundation, originPile);
  } else if (getKeyFromArray(columns, originPile) !== undefined) {
    var nameOfOriginPile = getKeyFromArray(foundation, originPile);
  }
  console.log(nameOfOriginPile);
  // if (getKeyFromArray(foundation, destinationPile) !== undefined) {
  //   var nameOfDestinationPile = getKeyFromArray(foundation, destinationPile);
  // } else if (getKeyFromArray(columns, destinationPile) !== undefined) {
  //   var nameOfDestinationPile = getKeyFromArray(foundation, destinationPile);
  // }

  // console.log(nameOfDestinationPile);
  // if (
  //   cardsBeingMoved[0]?.numvalue == 13 &&
  //   destinationPile.length == 0 &&
  //   !Object.values(foundation).includes(destinationPile)
  // ) {
  //   destinationPile.push(originPile.splice(startIndex, originPile.length)[0]);
  //   return true;
  // }

  // if (cardsBeingMoved.length == 1 && cardsBeingMoved[0].numvalue == 1) {
  //   // if its the only card, and if its an ace
  //   if (
  //     destinationPile[destinationPile.length - 1]?.numvalue == 2 &&
  //     destinationPile[destinationPile.length - 1]?.color !=
  //       cardsBeingMoved[0].color
  //   ) {
  //     console.log("hi");
  //     destinationPile.push(originPile.splice(-1, 1)[0]);
  //     return true;
  //   } else if (cardsBeingMoved[0].facevalue == "clubs") {
  //     foundation.clubs.push(originPile.splice(-1, 1)[0]);
  //     return true;
  //   } else if (cardsBeingMoved[0].facevalue == "hearts") {
  //     foundation.hearts.push(originPile.splice(-1, 1)[0]);
  //     return true;
  //   } else if (cardsBeingMoved[0].facevalue == "spades") {
  //     foundation.spades.push(originPile.splice(-1, 1)[0]);
  //     return true;
  //   } else if (cardsBeingMoved[0].facevalue == "diamonds") {
  //     foundation.diamonds.push(originPile.splice(-1, 1)[0]);
  //     return true;
  //   }
  // }

  // if (
  //   1 + parseInt(cardsBeingMoved[0].numvalue) ==
  //   destinationPile[destinationPile.length - 1]?.numvalue
  // ) {
  //   console.log("trying to move");
  //   console.log(destinationPile);
  //   console.log(
  //     destinationPile.push(
  //       originPile.splice(
  //         originPile.indexOf(cardsBeingMoved[0]),
  //         destinationPile.length - 1 - originPile.indexOf(cardsBeingMoved[0])
  //       )[0]
  //     )
  //   ); // do the same with the king if statement
  //   console.log("did it work?");
  //   return true;
  // }

  return false;
}

function checkifcardgoesondifferentpile(array, i) {
  var chunkOfCards = array.slice(i, array.length);
  var rotatedArray = rotateToIndex(allArrays, allArrays.indexOf(array));
  // console.log(rotatedArray);

  for (var z = 0; z < rotatedArray.length; z++) {
    var cardGoesToDifferentPile = checkingSystem(
      rotatedArray[z],
      array,
      chunkOfCards
    );
  }

  // // This returns the name of the array:
  // if (getKeyFromArray(foundation, array) !== undefined) {
  //   console.log(getKeyFromArray(foundation, array));
  // } else if (getKeyFromArray(columns, array) !== undefined) {
  //   console.log(getKeyFromArray(columns, array));
  // }
}

// function checkifcardgoesondifferentpile(array, i) {
//   var cardgoestodifferentpile = false;
//   // console.log(array);
//   var rotatedArray = rotateToIndex(allArrays, allArrays.indexOf(array)); // rotates the array of all the piles so that the specified pile is at index 0 and then deletes it
//   // rotatedArray.splice(0, 1); // idk if i need this or not******* i think this gets rid of the wastepile so that it isnt a destination but idk
//   var arrayOfCardsAfterIndex = array.slice(i, array.length); //these are the cards from a pile where a card was clicked, these are all the cards after that clicked card in an array
//   // console.log(arrayOfCardsAfterIndex);

//   for (var i = 0; i < rotatedArray.length; i++) {
//     var destinationPile = rotatedArray[i];
//     // console.log(destinationPile);
//     cardgoestodifferentpile = checkingSystem(
//       destinationPile,
//       array,
//       arrayOfCardsAfterIndex
//     );
//     if (cardgoestodifferentpile) {
//       if (array.length >= 1) {
//         // console.log("hello");
//         array[array.length - 1].faceup();
//       }
//       updatePiles();
//       // arrayOfCardsAfterIndex = []
//       // rotatedArray = []
//       return cardgoestodifferentpile;
//     }
//   }
//   return cardgoestodifferentpile;
// }

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
    this.facevalue = card
      .substring(card.indexOf("_") + 4)
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z]+/g, "");
    this.numvalue = this.findnumvalue(card);
    this.color = this.findcolor(card);
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
  findcolor(card) {
    var n = card.match(/of_(.*?)\.png/);
    // console.log(n[1])
    if (
      n[1] == "hearts" ||
      n[1] == "diamonds" ||
      n[1] == "hearts2" ||
      n[1] == "diamonds2"
    ) {
      return "red";
    } else {
      return "black";
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
