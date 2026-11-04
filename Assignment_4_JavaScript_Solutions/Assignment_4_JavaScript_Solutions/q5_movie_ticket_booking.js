// Q5: Movie Ticket Booking (Objects + RegExp)
// Link this file to q5_movie_ticket_booking.html.

const bookingForm = document.getElementById("bookingForm");

const namePattern = /^[A-Za-z ]+$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

bookingForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const seatsText = document.getElementById("seats").value.trim();
    const seats = Number(seatsText);

    const errors = [];
    if (!namePattern.test(name)) errors.push("Name must contain alphabets only.");
    if (!emailPattern.test(email)) errors.push("Enter a valid email address.");
    if (!/^\d+$/.test(seatsText) || seats < 1 || seats > 10) {
        errors.push("Seats must be a whole number from 1 to 10.");
    }

    const result = document.getElementById("bookingResult");
    if (errors.length > 0) {
        result.style.color = "red";
        result.textContent = errors.join(" ");
        return;
    }

    const booking = { name, email, seats };
    result.style.color = "green";
    result.textContent = `Booking successful! Name: ${booking.name} | Email: ${booking.email} | Seats: ${booking.seats}`;
    console.log("Ticket booking:", booking);
});
