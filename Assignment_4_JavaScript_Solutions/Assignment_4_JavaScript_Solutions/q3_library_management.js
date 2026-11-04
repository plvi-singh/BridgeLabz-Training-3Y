// Q3: Library Management System (Classes + Objects)

class Book {
    constructor(title, author, ISBN, isIssued = false) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.isIssued = isIssued;
    }

    issueBook() {
        if (this.isIssued) {
            console.log(`"${this.title}" is already issued.`);
            return false;
        }
        this.isIssued = true;
        console.log(`"${this.title}" has been issued.`);
        return true;
    }

    returnBook() {
        if (!this.isIssued) {
            console.log(`"${this.title}" was not issued.`);
            return false;
        }
        this.isIssued = false;
        console.log(`"${this.title}" has been returned.`);
        return true;
    }
}

const books = [
    new Book("The Alchemist", "Paulo Coelho", "ISBN101"),
    new Book("Wings of Fire", "A. P. J. Abdul Kalam", "ISBN102"),
    new Book("Atomic Habits", "James Clear", "ISBN103", true)
];

function displayAvailableBooks() {
    console.log("\\nAvailable books:");
    books.filter(book => !book.isIssued).forEach(book => {
        console.log(`${book.title} by ${book.author} | ISBN: ${book.ISBN}`);
    });
}

function issueBookByISBN(isbn) {
    const book = books.find(item => item.ISBN === isbn);
    if (!book) {
        console.log("No book found with that ISBN.");
        return;
    }
    book.issueBook();
}

displayAvailableBooks();
issueBookByISBN("ISBN101");
displayAvailableBooks();
