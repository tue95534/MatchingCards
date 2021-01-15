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