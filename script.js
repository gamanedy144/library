let body = document.getElementsByTagName("BODY")[0];
let booksSection = document.querySelector(".content");  
let addBookButton = document.querySelector("#add-book");

let dimming = document.querySelector(".dim-background");

let popUpForm = document.querySelector(".pop-up-form");
let closeButton = document.querySelector(".close-button");
let submitButton = document.querySelector(".submit-button");

let myLibrary = [];

function Book(title, author, pages, readStatus){ 
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}
Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus ? "read" : "not read yet"}`;
}

window.onload = () =>{
    console.log("loaded");
    loadFromLocalStorage();
    console.log(myLibrary);
    loadOldLibrary();
}

function showPopUp(){
    popUpForm.style.display = "grid";
    dimming.style.display = "unset";
}
addBookButton.addEventListener('click', () => {
    showPopUp();
});

function removeForm(){
    popUpForm.style.display = "none";
    dimming.style.display = "none";
}

function addData(){
    let bookTitle = document.getElementById("title").value;
    let bookAuthor = document.getElementById("author").value;
    let bookPages = document.getElementById("pages").value;
    let bookStatus = document.getElementById("read").value === "on" ? true : false;
    let tempBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
    return tempBook;

}

function resetInputs(){
    document.getElementById("myForm").reset();
}


submitButton.addEventListener('click', () => {
    let temporary = addData();
    addBookToLibrary(temporary);
    updateLibrary(temporary);

    removeForm();
    resetInputs();

    saveToLocalStorage();
});
closeButton.addEventListener('click', () =>{
    removeForm();
    resetInputs();
});

// document.addEventListener('keydown', function(event) {
//     if(event.key === "Escape"){
//         removeForm();
//         console.log(event + event.key);
//     }
// });





let got = new Book("Game of Thrones", "George R R Martin", 215, true);

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// addBookToLibrary(got);
// console.log(myLibrary);


function loadOldLibrary(){
    for(book of myLibrary){

        console.log(book);

        let currCard = document.createElement("div");
        currCard.classList.add("card");
        booksSection.appendChild(currCard);

        for(props in book){

            let currPar = document.createElement("p");
            if(props == "pages"){
                currPar.textContent = `${book[props]} pages`;
            }
            else if(props == "readStatus"){
                currPar.textContent = book[props] === true? "Currently reading" : "Not reading";
            }
            else if(props == "info"){
                continue;
            }
            else currPar.textContent = `${book[props]}`;

            currCard.appendChild(currPar);

        }
    }
}
function updateLibrary(book){
    let currCard = document.createElement("div");
        currCard.classList.add("card");
        booksSection.appendChild(currCard);

        for(props in book){

            let currPar = document.createElement("p");
            if(props == "pages"){
                currPar.textContent = `${book[props]} pages`;
            }
            else if(props == "readStatus"){
                currPar.textContent = book[props] === true? "Currently reading" : "Not reading";
            }
            else if(props == "info"){
                continue;
            }
            else currPar.textContent = `${book[props]}`;

            currCard.appendChild(currPar);

        }
}

function saveToLocalStorage() {
    localStorage.clear();
    window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        
    console.log(localStorage.getItem('myLibrary'));
}

function loadFromLocalStorage(){
    if (localStorage.getItem("myLibrary") === null) {
        console.log("empty");
        myLibrary = [];
      }
    else {
        let temp = localStorage.getItem('myLibrary');
        myLibrary = JSON.parse(temp);
    }

}

// let testParagraph = document.createElement("p");
// testParagraph.textContent = "test test test";
// booksSection.appendChild(testParagraph);
// testParagraph.classList.add("card");