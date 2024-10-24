// Do your work here...
document.addEventListener('DOMContentLoaded', function(){
    loadItems();
});

const bookTitle = document.getElementById('bookFormTitle');
const bookAuthor = document.getElementById('bookFormAuthor');
const bookYear = document.getElementById('bookFormYear');
const bookReadStatus = document.getElementById('bookFormIsComplete');
const searchBookInput = document.getElementById('searchBookTitle');
const searchBookBtn = document.getElementById('searchSubmit');

document.getElementById('bookFormSubmit').addEventListener('click', function(event) {
    event.preventDefault();
    addNewBook();
});
searchBookBtn.addEventListener('click', function(event) {
    event.preventDefault();
    searchBook();
});

bookReadStatus.addEventListener('click', function(event){
    if(bookReadStatus.checked){
        document.getElementById('addButtonList').innerText = 'Selesai dibaca'
    }else{
        document.getElementById('addButtonList').innerText = 'Belum selesai dibaca'
    }
});

function generateBookID() {
    return new Date().getTime();
}

function addNewBook(){
    const bookId = parseInt(generateBookID());
    const title = bookTitle.value.trim();
    const author = bookAuthor.value.trim();
    const year = bookYear.value;
    const status = bookReadStatus.checked;

    if(title !== '' && author !== '' && year !== ''){
        const item = createListItem(bookId, title, author, year, status);

        moveToList(item, status);
        saveItem(bookId, title, author, year, status);
    }

    bookTitle.value = '';
    bookAuthor.value = '';
    bookYear.value = '';
    bookReadStatus.checked = false;
}

function createListItem(id, title, author, year, status){
    const item = document.createElement('div');
    item.setAttribute('data-bookid', id);
    item.setAttribute('data-testid', 'bookItem');

    const btnContainer = document.createElement('div');

    const titleH3 = document.createElement('h3');
    titleH3.innerText = title;
    titleH3.setAttribute('data-testid', 'bookItemTitle');

    const authorP = document.createElement('p');
    authorP.innerText = 'Penulis: ' + author;
    authorP.setAttribute('data-testid', 'bookItemAuthor');

    const yearP = document.createElement('p');
    yearP.innerText = 'Tahun: ' + year
    yearP.setAttribute('data-testid', 'bookItemYear');

    const statusBtn = document.createElement('button');
    statusBtn.setAttribute('data-testid', 'bookItemIsCompleteButton');
    if(status){
        statusBtn.innerText = 'Belum Dibaca';
    }else {
        statusBtn.innerText = 'Dibaca';
    }
    statusBtn.addEventListener('click', toggleComplete);

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('data-testid', 'bookItemDeleteButton');
    deleteBtn.innerText = 'Hapus';
    deleteBtn.addEventListener('click', removeBook);

    const editBtn = document.createElement('button');
    editBtn.setAttribute('data-testid', 'bookItemEditButton');
    editBtn.innerText = 'Edit';

    const editModal = document.createElement('dialog');
    editModal.setAttribute('data-bookid', id);
    editModal.close();
    editModal.classList.add('bookEditModal');
    editModal.innerHTML = `
        <h2>Edit Data Buku</h2>
        <form class="bookEditForm">
          <div>
            <label for="bookEditFormTitle">Judul</label>
            <input class="bookEditFormTitle" type="text" required/>
          </div>
          <div>
            <label for="bookEditFormAuthor">Penulis</label>
            <input class="bookEditFormAuthor" type="text" required/>
          </div>
          <div>
            <label for="bookEditFormYear">Tahun</label>
            <input class="bookEditFormYear" type="number" required/>
          </div>
          <button class="bookEditFormCancel" type="submit">Cancel</button>
          <button class="bookEditFormSubmit" type="submit">Edit</button>
        </form>
    `;
    editBtn.addEventListener('click', openEditBookForm);

    btnContainer.appendChild(statusBtn);
    btnContainer.appendChild(deleteBtn);
    btnContainer.appendChild(editBtn);

    item.appendChild(titleH3);
    item.appendChild(authorP);
    item.appendChild(yearP);
    item.appendChild(btnContainer);
    item.appendChild(editModal);

    return item;
}

function moveToList(item, status){
    const unfinishedList = document.getElementById('incompleteBookList');
    const finishedList = document.getElementById('completeBookList');

    if(status){
        finishedList.appendChild(item);
    }else{
        unfinishedList.appendChild(item);
    }
}

// Book Buttons Handler
function toggleComplete(event){
    const toggleBtn = event.target;
    const itemLi = toggleBtn.parentElement.parentElement;
    const id = itemLi.getAttribute('data-bookid');

    let items = JSON.parse(localStorage.getItem('bookItems')) || [];
    const item = items.find(item => parseInt(item.id) === parseInt(id));

    item.isComplete = !item.isComplete;
        
    toggleBtn.innerText = item.isComplete ? 'Belum Dibaca' : 'Dibaca';
    
    moveToList(itemLi, item.isComplete);

    localStorage.setItem('bookItems', JSON.stringify(items));
}

function removeBook(event){
    const itemLi = event.target.parentElement.parentElement;
    const id = itemLi.getAttribute('data-bookid');

    itemLi.remove();
    deleteBook(id);
}

function openEditBookForm(event){
    const openEditBtn = event.target;
    const itemLi = openEditBtn.parentElement.parentElement;
    const id = itemLi.getAttribute('data-bookid');
    const modal = itemLi.querySelector('.bookEditModal');

    let items = JSON.parse(localStorage.getItem('bookItems')) || [];
    const item = items.find(item => parseInt(item.id) === parseInt(id));

    modal.showModal();
    modal.querySelector('.bookEditFormTitle').value = item.title;
    modal.querySelector('.bookEditFormAuthor').value = item.author;
    modal.querySelector('.bookEditFormYear').value = item.year;

    modal.querySelector('.bookEditFormCancel').addEventListener('click', function(event){
        modal.close();
    });

    modal.querySelector('.bookEditFormSubmit').addEventListener('click', editBook);
}

function editBook(event){
    const editBtn = event.target;
    const modal = editBtn.parentElement.parentElement;
    const id = modal.getAttribute('data-bookid');

    let items = JSON.parse(localStorage.getItem('bookItems')) || [];
    const item = items.find(item => parseInt(item.id) === parseInt(id));

    item.title = modal.querySelector('.bookEditFormTitle').value;
    item.author = modal.querySelector('.bookEditFormAuthor').value;
    item.year = parseInt(modal.querySelector('.bookEditFormYear').value);

    localStorage.setItem('bookItems', JSON.stringify(items));
}

// Local Storage Handler
function loadItems(){
    let items = JSON.parse(localStorage.getItem('bookItems')) || [];
    items.forEach(book => {
        const item = createListItem(book.id, book.title, book.author, book.year, book.isComplete);
        moveToList(item, book.isComplete);
    });
}

function saveItem(id, title, author, year, status){
    let items = JSON.parse(localStorage.getItem('bookItems')) || [];
    items.push({ 
        id: id,
        title: title, 
        author: author, 
        year: parseInt(year), 
        isComplete: status
    });
    localStorage.setItem('bookItems', JSON.stringify(items));
}

function updateItem(id, status){
    let items = JSON.parse(localStorage.getItem('bookItems')) || [];
    const item = items.find(item => parseInt(item.id) === parseInt(id));
    if (item) {
        item.isComplete = status;
    }
    localStorage.setItem('bookItems', JSON.stringify(items));
}

function deleteBook(id){
    let items = JSON.parse(localStorage.getItem('bookItems')) || [];
    items = items.filter(item => parseInt(item.id) !== parseInt(id));
    localStorage.setItem('bookItems', JSON.stringify(items));
}

// Visual Handler
function searchBook(){
    document.getElementById('incompleteBookList').innerHTML = '';
    document.getElementById('completeBookList').innerHTML = '';
    const searchText = searchBookInput.value.toLowerCase();
    
    const items = JSON.parse(localStorage.getItem('bookItems')) || [];
    
    const matchingTitles = items.filter(book => 
        book.title.toLowerCase().includes(searchText)
    );
    
    matchingTitles.forEach(book => {
        const item = createListItem(book.id, book.title, book.author, book.year, book.isComplete);
        moveToList(item, book.isComplete);
    });
}