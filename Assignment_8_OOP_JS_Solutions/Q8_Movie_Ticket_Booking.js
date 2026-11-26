// Q8 – Movie Ticket Booking System
class MovieTicket {
    constructor(movieName, seatNo, price) {
        this.movieName = movieName;
        this.seatNo = seatNo;
        this.price = price;
    }
}

// Add printTicket() to MovieTicket's prototype.
MovieTicket.prototype.printTicket = function() {
    console.log("----- Movie Ticket -----");
    console.log("Movie:", this.movieName);
    console.log("Seat:", this.seatNo);
    console.log("Ticket Price: Rs.", this.price);
};

// OnlineTicket inherits from MovieTicket.
class OnlineTicket extends MovieTicket {
    constructor(movieName, seatNo, price, convenienceFee) {
        super(movieName, seatNo, price);
        this.convenienceFee = convenienceFee;
    }

    getTotalAmount() {
        return this.price + this.convenienceFee;
    }
}

const ticket1 = new OnlineTicket("Inception", "A12", 250, 30);
const ticket2 = new OnlineTicket("Interstellar", "B10", 300, 40);

// Inherited prototype method works on OnlineTicket objects.
ticket1.printTicket();
console.log("Convenience Fee: Rs.", ticket1.convenienceFee);
console.log("Total Amount: Rs.", ticket1.getTotalAmount());

console.log("------------------------");

ticket2.printTicket();
console.log("Convenience Fee: Rs.", ticket2.convenienceFee);
console.log("Total Amount: Rs.", ticket2.getTotalAmount());

// Prototype chain: ticket object -> OnlineTicket.prototype ->
// MovieTicket.prototype -> Object.prototype.
