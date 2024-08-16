window.onload = pageload;
const cardfiles = [];
var DECK = [];
var count = 0;
var shuffledDeck;
var saveStateArray = [];
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
var allArrays = [];

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
    const card = new Card(c, null);
    DECK.push(card);
  });

  shuffledDeck = shuffle(DECK);

  dealCards();
  createStockAndWaste();
  localStorage.clear();
  saveState();
  // localStorage.getItem("myData").slice(4);
  // console.log(columns.column1);
  // console.log(columns.column2);
  // console.log(columns.column3);
  // console.log(columns.column4);
  // console.log(columns.column5);
  // console.log(columns.column6);
  // console.log(columns.column7);
  // console.log(stockpile);
}

function updatePiles() {
  // var allPilesToClear = document.querySelectorAll(".column1, .column2, .column3, .column4, .column5, .column6, .column7, .clubs, .hearts, .spades, .diamonds, .stock, .waste");
  // allPilesToClear.forEach(pile => {
  //   pile.innerHTML = ""; // Clear the pile's HTML
  // });

  document.getElementsByClassName("stock")[0].innerHTML="";
  document.getElementsByClassName("waste")[0].innerHTML="";
  document.getElementsByClassName("clubs")[0].innerHTML="";
  document.getElementsByClassName("hearts")[0].innerHTML="";
  document.getElementsByClassName("spades")[0].innerHTML="";
  document.getElementsByClassName("diamonds")[0].innerHTML="";
  document.getElementsByClassName("column1")[0].innerHTML="";
  document.getElementsByClassName("column2")[0].innerHTML="";
  document.getElementsByClassName("column3")[0].innerHTML="";
  document.getElementsByClassName("column4")[0].innerHTML="";
  document.getElementsByClassName("column5")[0].innerHTML="";
  document.getElementsByClassName("column6")[0].innerHTML="";
  document.getElementsByClassName("column7")[0].innerHTML="";

  // console.log(document.getElementsByClassName("column1")[0]);






  // console.log(columns)
  createStockAndWaste();
  createFoundation();     // Redraw the foundation piles
  // console.log(columns)
  dealCardColumnPiles();  // Redraw the columns based on the current state of the piles
  // console.log(columns)

}


//******************************************/
function loadState() {
  if (count > 1) {
    var storedData = localStorage.getItem((count - 2).toString());
    var decompressedData = LZString.decompress(storedData);
    var undoState = JSON.parse(decompressedData);
    
    // console.log("Undo State:", undoState);

    // Clear existing piles
    stockpile = [];
    wastepile = [];
    foundation.clubs = [];
    foundation.hearts = [];
    foundation.spades = [];
    foundation.diamonds = [];
    columns.column1 = [];
    columns.column2 = [];
    columns.column3 = [];
    columns.column4 = [];
    columns.column5 = [];
    columns.column6 = [];
    columns.column7 = [];

    // Load the saved state into the piles
    stockpile = undoState[0].map(cardObj => new Card(null, cardObj));
    wastepile = undoState[1].map(cardObj => new Card(null, cardObj));
    foundation.clubs = undoState[2].map(cardObj => new Card(null, cardObj));
    foundation.hearts = undoState[3].map(cardObj => new Card(null, cardObj));
    foundation.spades = undoState[4].map(cardObj => new Card(null, cardObj));
    foundation.diamonds = undoState[5].map(cardObj => new Card(null, cardObj));
    columns.column1 = undoState[6].map(cardObj => new Card(null, cardObj));
    columns.column2 = undoState[7].map(cardObj => new Card(null, cardObj));
    columns.column3 = undoState[8].map(cardObj => new Card(null, cardObj));
    columns.column4 = undoState[9].map(cardObj => new Card(null, cardObj));
    columns.column5 = undoState[10].map(cardObj => new Card(null, cardObj));
    columns.column6 = undoState[11].map(cardObj => new Card(null, cardObj));
    columns.column7 = undoState[12].map(cardObj => new Card(null, cardObj));


    allArrays = [];

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

    // console.log("Columns after loadState:", columns);

    updatePiles();
    count--;
  } else {
    // console.log("No previous state to load");
  }
}


function saveState(){
  saveStateArray = [];
  saveStateArray.push(
    //all the arrays pushed into one big array
    stockpile,
    wastepile,
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
  var jsonData = JSON.stringify(saveStateArray); // the big array being turned into JSON
  var compressedData = LZString.compress(jsonData);
  localStorage.setItem(count.toString(), compressedData);
  count++;
}
//******************************************/

function newGame() {
  var confirmed = confirm("Are you sure you want to start a new game?");
  if (confirmed) {
    // Refresh the page if the user confirms
    location.reload(); // this might be changed idk
  }
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
      item.facedown();
      // item.faceup();
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
    if (stockpile.length !== 0) {
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
    if (image === "images/card_background/cardBackground.png") {
      stockpilebutton.onclick = stocktowaste;
    } else if (image === "images/card_background/cardBlank.png") {
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
            // refreshwastepile();
            updatePiles();
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
    saveState();
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
    saveState();
    refreshstockpile();
    refreshwastepile();
  }
}

function dealCardColumnPiles() {
  //for column 1
  // console.log("here")
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
      // console.log("here1")
      col1butt.addEventListener(
        "click",
        function () {
          // console.log("here2")
          var numbersOnly = this.classList[1].match(/\d+/g);
          var cardClickedIndex = numbersOnly[0] - 1;
          var cardmoved = checkifcardgoesondifferentpile(
            columns.column1,
            cardClickedIndex
          );
          if (cardmoved) {
            c1[0].textContent = "";
            // dealCardColumnPiles();
            updatePiles();
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
          var numbersOnly = this.classList[1].match(/\d+/g);
          var cardClickedIndex = numbersOnly[0] - 1;
          var cardmoved = checkifcardgoesondifferentpile(
            columns.column2,
            cardClickedIndex
          );
          if (cardmoved) {
            c2[0].textContent = "";
            // dealCardColumnPiles();
            updatePiles();
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
          var numbersOnly = this.classList[1].match(/\d+/g);
          var cardClickedIndex = numbersOnly[0] - 1;
          var cardmoved = checkifcardgoesondifferentpile(
            columns.column3,
            cardClickedIndex
          );
          if (cardmoved) {
            c3[0].textContent = "";
            // dealCardColumnPiles();
            updatePiles();
            // console.log(columns.column3);
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
          var numbersOnly = this.classList[1].match(/\d+/g);
          var cardClickedIndex = numbersOnly[0] - 1;
          var cardmoved = checkifcardgoesondifferentpile(
            columns.column4,
            cardClickedIndex
          );
          if (cardmoved) {
            c4[0].textContent = "";
            // dealCardColumnPiles();
            updatePiles();
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
          var numbersOnly = this.classList[1].match(/\d+/g);
          var cardClickedIndex = numbersOnly[0] - 1;
          var cardmoved = checkifcardgoesondifferentpile(
            columns.column5,
            cardClickedIndex
          );
          if (cardmoved) {
            c5[0].textContent = "";
            // dealCardColumnPiles();
            updatePiles();
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
          var numbersOnly = this.classList[1].match(/\d+/g);
          var cardClickedIndex = numbersOnly[0] - 1;
          var cardmoved = checkifcardgoesondifferentpile(
            columns.column6,
            cardClickedIndex
          );
          if (cardmoved) {
            c6[0].textContent = "";
            // dealCardColumnPiles();
            updatePiles();
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
          var numbersOnly = this.classList[1].match(/\d+/g);
          var cardClickedIndex = numbersOnly[0] - 1;
          var cardmoved = checkifcardgoesondifferentpile(
            columns.column7,
            cardClickedIndex
          );
          if (cardmoved) {
            c7[0].textContent = "";
            // dealCardColumnPiles();
            updatePiles();
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

  if (foundation.clubs.length > 0) {
    var club = document.getElementsByClassName("empty1")[0];
    var clubspilebutton = document.getElementsByClassName("clubsbutton")[0];
    var clubspileimage = foundation.clubs[foundation.clubs.length-1].image;
    var empty1img = document.getElementsByClassName("empty1")[0]
    empty1img.src = clubspileimage

    clubspilebutton.addEventListener(
      "click",
      function () {
        var cardmoved = checkifcardgoesondifferentpile(foundation.clubs, -1);
        if (cardmoved) {
          club[0].textContent = "";
          // createFoundation();
          updatePiles();
          // console.log(foundation.clubs);
        }
      },
      false
    );
  }
  
  if (foundation.hearts.length > 0) {
    var heart = document.getElementsByClassName("empty2")[0];
    var heartspilebutton = document.getElementsByClassName("heartsbutton")[0];
    var heartspileimage = foundation.hearts[foundation.hearts.length-1].image;
    var empty2img = document.getElementsByClassName("empty2")[0]
    empty2img.src = heartspileimage

    heartspilebutton.addEventListener(
      "click",
      function () {
        var cardmoved = checkifcardgoesondifferentpile(foundation.hearts, -1);
        if (cardmoved) {
          heart[0].textContent = "";
          // createFoundation();
          updatePiles();
          // console.log(foundation.clubs);
        }
      },
      false
    );
  }

  if (foundation.spades.length > 0) {
    var spade = document.getElementsByClassName("empty1")[0];
    var spadespilebutton = document.getElementsByClassName("spadesbutton")[0];
    var spadespileimage = foundation.spades[foundation.spades.length-1].image;
    var empty3img = document.getElementsByClassName("empty3")[0]
    empty3img.src = spadespileimage

    spadespilebutton.addEventListener(
      "click",
      function () {
        var cardmoved = checkifcardgoesondifferentpile(foundation.spades, -1);
        if (cardmoved) {
          spade[0].textContent = "";
          // createFoundation();
          updatePiles();
          // console.log(foundation.clubs);
        }
      },
      false
    );
  }

  if (foundation.diamonds.length > 0) {
    var diamond = document.getElementsByClassName("empty4")[0];
    var diamondspilebutton = document.getElementsByClassName("diamondsbutton")[0];
    var diamondspileimage = foundation.diamonds[foundation.diamonds.length-1].image;
    var empty4img = document.getElementsByClassName("empty4")[0]
    empty4img.src = diamondspileimage

    diamondspilebutton.addEventListener(
      "click",
      function () {
        var cardmoved = checkifcardgoesondifferentpile(foundation.diamonds, -1);
        if (cardmoved) {
          diamond[0].textContent = "";
          // createFoundation();
          updatePiles();
          // console.log(foundation.clubs);
        }
      },
      false
    );
  }
}

function rotateToIndex(arr, index) {
  // ex. (foundation, originPile)
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

//**************************************************************************************/

function checkingSystem(destinationPile, originPile, cardsBeingMoved) {
  startIndex = originPile.indexOf(cardsBeingMoved[0]); // if its a king and there is an empty spot
  var nameOfOriginPile;
  var nameOfDestinationPile;
  var inFoundation;
  var inColumns;

  if (getKeyFromArray(foundation, originPile) !== undefined) {
    nameOfOriginPile = getKeyFromArray(foundation, originPile);
  } else if (getKeyFromArray(columns, originPile) !== undefined) {
    nameOfOriginPile = getKeyFromArray(columns, originPile);
  }
  if (getKeyFromArray(foundation, destinationPile) !== undefined) {
    nameOfDestinationPile = getKeyFromArray(foundation, destinationPile);
    inFoundation = true;
    inColumns = false;
  } else if (getKeyFromArray(columns, destinationPile) !== undefined) {
    nameOfDestinationPile = getKeyFromArray(columns, destinationPile);
    inFoundation = false;
    inColumns = true;
  }

  if (inColumns) {
    if (
      (cardsBeingMoved[0].numvalue ==
        parseInt(destinationPile[destinationPile.length - 1]?.numvalue) - 1 &&
        destinationPile[destinationPile.length - 1]?.color !=
          cardsBeingMoved[0].color) ||
      (destinationPile.length == 0 && cardsBeingMoved[0].numvalue == 13)
    ) {
      // add in the color properties
      // console.log(cardsBeingMoved);
      columns[nameOfDestinationPile].push(...cardsBeingMoved);
      cardsBeingMoved.forEach((card) => {
        let index = originPile.indexOf(card);
        if (index !== -1) {
          originPile.splice(index, 1);
        }
      });
      return true;
    }
  } else if (inFoundation) {
    if (
      (cardsBeingMoved[0].numvalue ==
        parseInt(destinationPile[destinationPile.length - 1]?.numvalue) + 1 &&
        cardsBeingMoved[0].facevalue ==
          destinationPile[destinationPile.length - 1].facevalue &&
        cardsBeingMoved.length == 1) ||
      (cardsBeingMoved[0].numvalue == 1 &&
        destinationPile.length == 0 &&
        cardsBeingMoved.length == 1 &&
        cardsBeingMoved[cardsBeingMoved.length - 1].facevalue ==
          nameOfDestinationPile)
    ) {
      // add in the color properties and other problems
      // console.log(cardsBeingMoved);
      foundation[nameOfDestinationPile].push(...cardsBeingMoved);
      cardsBeingMoved.forEach((card) => {
        let index = originPile.indexOf(card);
        if (index !== -1) {
          originPile.splice(index, 1);
        }
      });
      return true;
    }
  }

  return false;
}

function checkifcardgoesondifferentpile(array, i) {
  // console.log("here3")
  var chunkOfCards = array.slice(i, array.length); // from index to the top of the stack of the origin pile
  var rotatedArray = rotateToIndex(allArrays, allArrays.indexOf(array)); // rotates the array of all arrays so that the array its currently on is at index 0
  // console.log(chunkOfCards);
  // console.log(rotatedArray);

  for (var z = 0; z < rotatedArray.length; z++) {
    // loops through the rotated array of arrays
    var cardGoesToDifferentPile = checkingSystem(
      // checks each array to see of the chunk of cards can go on it
      rotatedArray[z],
      array,
      chunkOfCards
    );

    if (cardGoesToDifferentPile) {
      // console.log("here4")
      // if the card can go on it, then flip the card below it (idk)
      if (array.length >= 1) {
        // im not too sure if this is needed?
        // console.log("hello");
        array[array.length - 1].faceup();
      }
      updatePiles();
      // arrayOfCardsAfterIndex = []
      // rotatedArray = []
      saveState();
      return cardGoesToDifferentPile;
    }
  }
  updatePiles();

  return cardGoesToDifferentPile;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

class Card {
  constructor(card, fullcard) {
    if(card!=null && fullcard==null) {
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
    } else if(card==null && fullcard!=null) {
      // console.log(fullcard)
      this.filename = fullcard.filename
      this.facevalue = fullcard.facevalue
      this.numvalue = fullcard.numvalue
      this.color = fullcard.color
      this.facingup = fullcard.facingup
      this.facingdown = fullcard.facingdown
      this.image = fullcard.image
    }

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
