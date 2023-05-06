window.onload = pageload;

function pageload() {
    const cardfiles = [];
    const DECK = [];
    cardfiles.push('10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png', '2_of_clubs.png', '2_of_diamonds.png', '2_of_hearts.png', '2_of_spades.png', '3_of_clubs.png', '3_of_diamonds.png', '3_of_hearts.png', '3_of_spades.png', '4_of_clubs.png', '4_of_diamonds.png', '4_of_hearts.png', '4_of_spades.png', '5_of_clubs.png', '5_of_diamonds.png', '5_of_hearts.png', '5_of_spades.png', '6_of_clubs.png', '6_of_diamonds.png', '6_of_hearts.png', '6_of_spades.png', '7_of_clubs.png', '7_of_diamonds.png', '7_of_hearts.png', '7_of_spades.png', '8_of_clubs.png', '8_of_diamonds.png', '8_of_hearts.png', '8_of_spades.png', '9_of_clubs.png', '9_of_diamonds.png', '9_of_hearts.png', '9_of_spades.png', 'ace_of_clubs.png', 'ace_of_diamonds.png', 'ace_of_hearts.png', 'ace_of_spades.png', 'jack_of_clubs2.png', 'jack_of_diamonds2.png', 'jack_of_hearts2.png', 'jack_of_spades2.png', 'king_of_clubs2.png', 'king_of_diamonds2.png', 'king_of_hearts2.png', 'king_of_spades2.png', 'queen_of_clubs2.png', 'queen_of_diamonds2.png', 'queen_of_hearts2.png', 'queen_of_spades2.png');

    cardfiles.forEach(c => {
        const card = new Card(c);
        DECK.push(card);
    });


    // console.log(DECK);
    var shuffledDeck = shuffleDeck(DECK);

    console.log(shuffledDeck);
}

class Card {
    constructor(card) {
        this.facevalue = ((card.substring(card.indexOf('_') + 4)).replace(/\.[^/.]+$/, "")).replace(/[^a-zA-Z]+/g, '');
        this.numvalue = card.substring(0, card.indexOf('_'));

        // console.log(numvalue + ' : ' + facevalue);
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
