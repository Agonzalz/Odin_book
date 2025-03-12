const myLibrary = [];

// Book Constructor
class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

// Function to add a new book
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

// Function to remove a book
function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

// Function to toggle read status
function toggleReadStatus(id) {
    const book = myLibrary.find(book => book.id === id);
    if (book) {
        book.toggleRead();
        displayBooks();
    }
}

// Function to display books on the page
function displayBooks() {
    const libraryContainer = document.getElementById("library");
    libraryContainer.innerHTML = "";

    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? "Read" : "Not Read"}</p>
            <button onclick="toggleReadStatus('${book.id}')">Toggle Read</button>
            <button onclick="removeBook('${book.id}')">Remove</button>
        `;
        libraryContainer.appendChild(bookCard);
    });
}

// Event listener for form submission
document.getElementById("book-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
    document.getElementById("book-form").reset();
    document.getElementById("book-modal").close();
});

// Show modal function
document.getElementById("new-book-btn").addEventListener("click", () => {
    document.getElementById("book-modal").showModal();
});

// Close modal function
document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("book-modal").close();
});
