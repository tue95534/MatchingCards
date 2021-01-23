class Card {

    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
        this.rank = "";
        this.assignRank(this.value);
        this.humanscore = 0;
        this.computerscore = 0;
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
        this.rotaterank = "";
        this.rotatesuit = "";
    }


    initialize_playing_cards() {
        this.list_cards = [];
        this.user_list = [];
        this.computer_list = [];
        this.field_list = [];
        this.computer_score_list = [];
        this.user_score_list = [];
        this.humanscore = 0;
        this.computerscore = 0;
        this.jackID = "";
        this.rotaterank = "";
        this.rotatesuit = "";
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
            var card = new Card(x, 'D');
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


    human_turn(rank, suit) {
        console.log("Rank: ", rank, " Suit: ", suit);
        if (rank.toString() == "J") {
            this.humanscore+=this.field_list.length;
            this.humanscore++;
            this.field_list = [];
            for (x=0; x < this.user_list.length; x++) {
                if (this.user_list[x].rank == rank && this.user_list[x].suit == suit) {
                    this.user_list.splice(x, 1);
                }
            }
        }
        else {
            var matches = false;
            outerloop:
            for (var x = 0; x < this.field_list.length; x++) {
                var theRank = this.field_list[x].rank;
                if (this.field_list[x].rank == rank) {
                    matches = true;
                    break outerloop;
                }
            }
            if (matches == true) {
                for (var x = this.field_list.length - 1; x>=0; x--) {
                    if (this.field_list[x].rank == rank) {
                        this.field_list.splice(x, 1);
                        this.humanscore++;
                    }
                }
                for (x=0; x < this.user_list.length; x++) {
                    if (this.user_list[x].rank == rank && this.user_list[x].suit == suit) {
                        this.user_list.splice(x, 1);
                    }
                }
                this.humanscore++;
            }
            else {
                for (x=0; x < this.user_list.length; x++) {
                    if (this.user_list[x].rank == rank && this.user_list[x].suit == suit) {
                        this.field_list.push(this.user_list[x]);
                        this.user_list.splice(x, 1);
                    }
                }
            }
        } 
    }


    computer_turn() {
        let matchesMap = new Map();
        for (x = 0; x < this.computer_list.length; x++) {
            var compRank = this.computer_list[x].rank.toString();
            var compID = compRank + this.computer_list[x].suit.toString();
            var count = 0;
            for (var y = 0; y < this.field_list.length; y++) {
                var fieldRank = this.field_list[y].rank.toString();
                if (compRank == fieldRank) {
                    count++;
                }
            }
            matchesMap[compID] = count;
        }
        var max = 0;
        var idMax = "";
        for (var m in matchesMap) {
            for (var i = 0; i < matchesMap[m].length; i++){
                if (matchesMap[m][i] > max) {
                    max = matchesMap[m][i];
                    idMax = matchesMap[m];
                }
            }
        }

        if (max > 1) {
            var rank = idMax[0];
            var suit = idMax[1];
            this.play(idMax, rank, suit);
            return idMax;
            console.log("1");
        }
        else if (this.field_list.length > 2 && this.jackHand()) {
            this.computerscore+=this.field_list.length;
            this.computerscore++;
            this.field_list = [];
            for (x = 0; x < this.computer_list.length; x++) {
                if (this.computer_list[x].rank == "J") {
                    var imgid = this.computer_list[x].rank + this.computer_list[x].suit;
                    this.computer_list.splice(x, 1);
                    return imgid;
                }
            }
            console.log("2");
        }
        else if (this.computerMatch()) {
            var imgid = this.rotaterank + this.rotatesuit;
            return imgid;
            console.log("3");
        }
        else {
            this.play();
            var imgid = this.rotaterank + this.rotatesuit;
            return imgid;
            console.log("3");
        }
        var imgid = this.rotaterank + this.rotatesuit;
        return imgid;
    }


    play(idMax, rank, suit) {
        for (x = 0; x < this.field_list.length; x++) {
            var fieldRank = this.field_list[x].rank;
            if (rank == fieldRank) {
                this.field_list.splice(x, 1);
                computerScore++;
            }
        }
        computerScore++;
        for (x = 0; x < this.computer_list.length; x++) {
            if (this.computer_list.rank == rank && this.computer_list.suit == suit) {
                this.field_list.splice(x, 1);
            }
        }
    }


    play() {
        var count = 0;
        for (x = 0; x < this.computer_list.length; x++) {
            if (this.computer_list[x].rank == "J") {
                count++;
            }
        }

        if (this.computer_list.length > count) {
            outerloop:
            for (x = 0; x < this.computer_list.length; x++) {
                if (this.computer_list[x].rank != "J") {
                    this.rotatesuit = this.computer_list[x].suit;
                    this.rotaterank = this.computer_list[x].rank;
                    var card_to_play = this.computer_list[x];
                    this.field_list.push(card_to_play);
                    this.computer_list.splice(x,1);
                    break outerloop;
                }
            }
        }
        else {
            this.computerscore+=this.field_list.length;
            this.computerscore++;
            this.rotatesuit = this.computer_list[0].suit;
            this.rotaterank = this.computer_list[0].rank;
            this.field_list = [];
            this.computer_list.splice(0, 1);
        }
    }
    


    jackHand() {
        for (x = 0; x < this.computer_list.length; x++) {
            if (this.computer_list[x].rank.toString() == "J") {
                jackID = this.computer_list[x].rank.toString() + this.computer_list[x].suit.toString();
                return true;
            }
        }
        return false;
    }


    computerMatch() {
        for (x = 0; x < this.computer_list.length; x++) {
            for (var y = 0; y < this.field_list.length; y++) {
                if (this.computer_list[x].rank.toString() == this.field_list[y].rank.toString()) {
                    this.computerscore+=2;
                    this.rotaterank = this.computer_list[x].rank.toString();
                    this.rotatesuit = this.computer_list[x].suit.toString();
                    this.computer_list.splice(x, 1);
                    this.field_list.splice(y, 1);
                    return true;
                }
            }
        }
        return false;
    }


    checkgame() {
        if (this.computer_list.length == 0 && this.user_list.length == 0) {
            return true;
        }
        return false;
    }


    deal_cards() {
        var length = this.list_cards.length;
        if (length > 7) {
            console.log("yes");
            for (x = 0; x < 4; x++) {
                this.user_list.push(this.list_cards[0]);
                this.list_cards.splice(0, 1);
                this.computer_list.push(this.list_cards[0]);
                this.list_cards.splice(0, 1);
            }
            return 8;
        }
        else if (length < 2) {
            this.game_over = true;
        }
        else {
            if (length % 2 != 0) {
                self.list_cards.splice(0, 1);
                length = this.list_cards.length;
            }
            iterations = length / 2;
            for (x = 0; x < length; x++) {
                this.user_list.push(this.list_cards[0])
                this.list_cards.splice(0, 1);
                this.computer_list.push(this.list_cards[0]);
                this.list_cards.splice(0, 1);
                return iterations;
            }
        }
    }  
}
