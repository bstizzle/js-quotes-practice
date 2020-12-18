//declarations
//global variables
const quoteList = document.querySelector("#quote-list");
const quoteForm = document.querySelector("#new-quote-form");

//functions and event listeners
function renderQuote(quote) {
    let card = document.createElement("li");
    card.className = 'quote-card';

    let block = document.createElement("blockquote");
    block.className = 'blockquote';

    let p = document.createElement("p");
    p.className = "mb-0";
    p.innerText = quote.quote;

    let footer = document.createElement("footer");
    footer.className = "blockquote-footer";
    footer.innerText = quote.author

    let likeBtn = document.createElement("button");
    likeBtn.className = "btn-success";
    let likes = 0;
    likeBtn.innerHTML = `Likes: <span>${likes}</span>`
    likeBtn.addEventListener('click', function(){
        fetch(`http://localhost:3000/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quoteId: quote.id
            })
        }).then(resp => resp.json())
        .then(likeBtn.innerHTML = `Likes: <span>${++likes}</span>`);
    });

    let delBtn = document.createElement("button");
    delBtn.className = "btn-danger";
    delBtn.innerText = "Delete";
    delBtn.addEventListener('click', function(){      
        fetch(`http://localhost:3000/quotes/${quote.id}`, {
            method: 'DELETE'
        }).then(quoteList.removeChild(card));
    });

    block.append(p, footer, likeBtn, delBtn);
    card.appendChild(block);
    quoteList.appendChild(card);
    deleteBtns = document.querySelectorAll(".btn-danger");
};

quoteForm.addEventListener('submit', function(event){
    event.preventDefault();
    let text = document.querySelector("#new-quote").value;
    let name = author.value;
    fetch('http://localhost:3000/quotes?_embed=likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            quote: text,
            author: name
        })
        }
    )
        .then(resp => resp.json())
        .then(quote => renderQuote(quote));
    event.target.reset();
});

//execution

fetch(`http://localhost:3000/quotes?_embed=likes`)
    .then(resp => resp.json())
    .then(quotes => {
        quotes.forEach(quote => renderQuote(quote))
    });