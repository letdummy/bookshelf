const formDataBuku = document.getElementById("formDataBuku");
const formSearch = document.getElementById("formSearch");
const unreadContainer = document.getElementById("belumDibaca");
const readContainer = document.getElementById("sudahDibaca");

const books = [];

// function to add a new book to the bookshelf
const addBook = (book) => {
  const bookDiv = document.createElement("div");
  const bookTitle = document.createElement("h3");
  const bookAuthor = document.createElement("p");
  const bookYear = document.createElement("p");
  const buttonContainer = document.createElement("div");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteBook(book.id);
  });

  // if the book is complete, the button should say "Unfinished"
  const moveBtn = document.createElement("button");
  if (book.isComplete) {
    moveBtn.innerHTML = "Unfinished";
  } else {
    moveBtn.innerHTML = "Finished";
  }  
  // add an event listener to the move button
  moveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveBook(book.id);
  });

  // set the text content for the book HTML elements
  bookTitle.textContent = book.title;
  bookAuthor.textContent = "By: " + book.author;
  bookYear.textContent = book.year;

  // append the book HTML elements to the bookDiv
  bookTitle.classList.add("object-title");
  bookDiv.appendChild(bookTitle);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(bookYear);
  deleteBtn.classList.add("delete-btn");
  moveBtn.classList.add("move-btn");
  buttonContainer.appendChild(deleteBtn);
  buttonContainer.appendChild(moveBtn);
  buttonContainer.classList.add("object-button");
  bookDiv.appendChild(buttonContainer);
  bookDiv.classList.add("object");

  // add the bookDiv to the appropriate container (finished or unfinished)
  if (book.isComplete) {
    readContainer.appendChild(bookDiv);
  } else {
    unreadContainer.appendChild(bookDiv);
  }
};

const deleteBook = (id) => {
  const target = books.find((book) => book.id === id);
  //prompt user to confirm delete
  if (confirm(`Are you sure you want to delete ${target.title}?`)) {
    const newBooks = books.filter((book) => book.id !== id);
    books.length = 0;
    books.push(...newBooks);
    localStorage.setItem("books", JSON.stringify(books));
    render();
  }
};

const moveBook = (id) => {
  const target = books.find((book) => book.id === id);
  target.isComplete = !target.isComplete;
  localStorage.setItem("books", JSON.stringify(books));
  render();
};

const render = () => {
  unreadContainer.innerHTML = "";
  readContainer.innerHTML = "";
  for (const book of books) {
    addBook(book);
  }
};

formDataBuku.addEventListener("submit", (e) => {
  e.preventDefault();
  // get the form data
  const title = document.getElementById("judul").value;
  const author = document.getElementById("penulis").value;
  const year = document.getElementById("tahun").value;
  const isRead = document.getElementById("isRead").checked;  

  //check user input
  if (!title || !author || !year) {
    alert("Please fill out all fields before submitting.");
  } else {
    // create a new book object
    const newBook = {
      id: new Date().getTime(),
      title,
      author,
      year,
      isComplete: isRead,
    };
    // add the new book to the books array
    books.push(newBook);
    // save the books array to local storage
    localStorage.setItem("books", JSON.stringify(books));
    // render the bookshelf
    render();
    // clear the form
    formDataBuku.reset();
    console.log(books);
  }
});

//search book
const cariBtn = document.querySelector(".cari-btn");

cariBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const pencarian = document.getElementById("pencarian").value;
  const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(pencarian.toLowerCase()));
  unreadContainer.innerHTML = "";
  readContainer.innerHTML = "";
  for (const book of filteredBooks) {
    addBook(book);
  }
});

//reset search
const resetBtn = document.querySelector(".reset-btn");

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formSearch.reset();
  render();
});

// check if there is any data in local storage, if so load it
if (localStorage.getItem("books")) {
  books.push(...JSON.parse(localStorage.getItem("books")));
  currentId = books.length;
}

// render the bookshelf
render();



