class Card {

    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
        this.assignRank(this.value);
    }

    assignRank(value) {
        if (value < 11 && value > 1) {
            this.rank = value.toString();
        }
        else if (value == 1) {
            this.rank = "A";
        }
        else {
            if (value == 11) {
                this.rank = "J";
            }
            else if (value == 12) {
                this.rank = "Q";
            }
            else {
                this.rank = "K";
            }
        }
    }
}


class CommonCards {

    constructor(num_of_decks) {
        this.num_of_decks = num_of_decks;
        this.list_cards = [];
        this.user_list = [];
        this.computer_list = [];
        this.field_list = [];
        this.computer_score_list = [];
        this.user_score_list = [];
        this.game_over = false;
    }


    initialize_playing_cards() {
        for (var x = 1; x < 14; x++) {
            var card = new Card(x, 'H');
            this.list_cards.push(card);
        }
        for (var x = 1; x < 14; x++) {
            var card = new Card(x, 'S');
            this.list_cards.push(card);
        }
        for (var x = 1; x < 14; x++) {
            var card = new Card(x, 'C');
            this.list_cards.push(card);
        }
        for (var x = 1; x < 14; x++) {
            var card = new Card(x, 'H');
            this.list_cards.push(card);
        }
        this.shuffleArray(this.list_cards);
    }


    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }


    deal_initial() {
        for (var x = 0; x < 4; x++) {
            this.user_list.push(this.list_cards[0]);
            this.list_cards.shift();
            this.computer_list.push(this.list_cards[0]);
            this.list_cards.shift();
            this.field_list.push(this.list_cards[0]);
            this.list_cards.shift();
        }
    }


    // deal_cards() {
    //     var length = this.list_cards.length;
    //     if (length > 7) {
    //         for (x = 0; x < 4; x++) {
    //             this.user_list.push(this.list_cards[0]);
    //             this.list_cards.remove(0);
    //             this.computer_list.push(this.self.list_cards[0]);
    //             this.list_cards.remove(0);
    //             return 8;
    //         }
    //     }
    //     else if (length < 2) {
    //         this.game_over = true;
    //     }
    //     else {
    //         if (length % 2 != 0) {
    //             self.list_cards.remove(0);
    //             length = this.list_cards.length;
    //         }
    //         iterations = length / 2;
    //         for (x = 0; x < length; x++) {
    //             this.user_list.push(this.list_cards[0])
    //             this.list_cards.remove(0);
    //             this.computer_list.push(this.list_cards[0]);
    //             this.list_cards.remove(0);
    //             return iterations;
    //         }
    //     }
    // }


    // print_situation() {
    //     var field = "";
    //     for (x = 0; x < this.field_list.length; x++) {
    //         field = field + " " + this.field_list[x].rank.toString();
    //     }
    //     // print(field)
    //     var print_list = 'Your Hand: ';
    //     for (x = 0; x < this.user_list.length; x++) {
    //         print_list += this.user_list[x].rank.toString(); + ", ";
    //     }
    //     print_list = print_list.substr(0, -2);
    //     // print(print_list)
    // }
    
}