

const myLibrary =[];
const library = document.querySelector('.card-section');
const dialog = document.getElementById("book-form")

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID(id);
}


function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
} 

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}
function toggleReadStatus(id) {
    const book = myLibrary.find(book => book.id === id);
    if (book) {
        book.read = !book.read;
        displayBooks();
    }
}

function displayBooks() {
    library.innerHTML="";
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.setAttribute("class", "card");
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p> Author: ${book.author}</p>
            <p> Pages: ${book.pages}</p>
            <p>Status: ${book.read ? "Read" : "Not Read"}</p>
            <button onclick="toggleReadStatus('${book.id}')">Toggle Read</button>
            <button onclick="removeBook ('${book.id}')">Remove</button>
            `;
        library.appendChild(bookCard);
    });
}

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

document.getElementById("new-book").addEventListener("click", () => {
    document.getElementById("book-modal").showModal();
});

document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("book-modal").close();
});

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('Mind Games', 'Nora Roberts', 421, false);
addBookToLibrary('Chi\'s Sweet Adventures Vol. 3', 'Konami Kanata', 88, true);
addBookToLibrary('Erased Vol. 1', 'Kei Sanbe', 392, false);
console.log(myLibrary);