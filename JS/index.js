const errorDiv = document.getElementById('errors');
const error = document.getElementById('error2');
const searchBook = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    if (searchText === '') {
        errorDiv.innerText = "Search box cannot be empty";
    }

    // clear dom
    searchField.value = " ";
    const url = `http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs))
}


// Display the rusult 

const displaySearchResult = docs => {
    error.innerText = `You got ${docs.length}`;
    if (docs.length === 0) {
        // console.log('no result');
        document.getElementById('errors').innerText = "no result found";
    }

    else {
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';

        docs.forEach(doc => {
            console.log(doc);

            // creating a div 
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100">
                    <img src=" https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top img-fluid" alt="...">
                    <div class="card-body text-center">
                        <h5 class="card-title fw-bold">${doc.title}</h5>
                        <p class="card-text"><span class="text-danger fw-bold">Author Name:</span> ${doc.author_name}</p>
                        <p class="card-text fw-bold">First Publish year: ${doc.first_publish_year}</p>
                        <p class="card-text fw-bold">Publish Date: ${doc.publish_date}</p>
                        
                        
                    </div>
                </div>
            `;
            searchResult.appendChild(div);
        })
    }
}


