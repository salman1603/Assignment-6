const searchInputField = document.getElementById('search-input-field');
const displayingShowBooks = document.getElementById('displaying-books');
const spinner = document.getElementById('loading-spinner');
spinner.style.display = 'none';
const totalResult = document.getElementById('total-result');
const errorMessageOne = document.getElementById('first-error-handle');
const errorMessageTwo = document.getElementById('second-error-handle');




// search books

const searchBooks = () => {
    const searceText = searchInputField.value;
    searchInputField.value = '';

    if (searceText === '') {
        // error handle 1 
        errorMessageOne.style.display = 'block';
        // clearing display
        displayingShowBooks.innerText = '';
        totalResult.style.display = 'none';
        errorMessageTwo.style.display = 'none';

    }
    else {
        // loading spinner
        spinner.style.display = 'block';
        // clearing display
        displayingShowBooks.innerText = '';
        totalResult.style.display = 'none';
        errorMessageOne.style.display = 'none';
        errorMessageTwo.style.display = 'none';

        // fetching data
        fetch(`https://openlibrary.org/search.json?q=${searceText}`)
            .then(res => res.json())
            .then(data => showBooks(data))
    }

}




// Show Books 

const showBooks = (books) => {
    // Total Result 
    totalResult.style.display = 'none';
    totalResult.innerHTML = `
    <h2 class="text-center fw-bold text"> Showing <span class=" text-warning">${books.docs.length}</span> results out of <span class=" text-count"> ${books.numFound}</span> </h2> 
    `
    // error handle 2
    if (books.docs.length === 0) {
        errorMessageTwo.style.display = 'block';
    } else if (books.docs.length > 0) {
        totalResult.style.display = 'block';
        errorMessageTwo.style.display = 'none';
    }

    // spinner
    spinner.style.display = 'none';

    displayingShowBooks.innerText = '';
    const allBooks = books.docs;
    allBooks.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src= "https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-100 mb-5" style="height: 250px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title"><span class="text">Name :</span> ${book.title ? book.title : 'N/a'}</h5>
                 <h5><span class="text">Author :</span> ${book.author_name ? book.author_name[0] : 'N/a'}</h5>
                <h5><span class="text">Publisher :</span> ${book.publisher ? book.publisher[0] : 'N/a'}</h5>
                <h5><span class="text">First publish  :</span> ${book.first_publish_year ? book.first_publish_year : 'N/a'}</h5>
            </div>
        </div>
        `
        displayingShowBooks.appendChild(div);

    });
}