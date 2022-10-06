const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quetosApi = [];


const loadingSpinnerShow = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const loadingSpinnerComplete = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
  

const newQuote = () => {
    loadingSpinnerShow();
    const randomQueto = quetosApi[Math.floor(Math.random() * quetosApi.length)];
    
    if (!randomQueto.author) {
        authorText.textContent = 'Unknown';
      } else {
        authorText.textContent = randomQueto.author;
      }
    
      if (randomQueto.text.length > 120) {
        quoteText.classList.add('long-quote');
      } else {
        quoteText.classList.remove('long-quote');
      }
      
      quoteText.textContent = randomQueto.text;
      loadingSpinnerComplete();
}

const getQuoteFromApi = async () => {
    try{
        const quetos = await fetch('https://type.fit/api/quotes');
        quetosApi = await quetos.json();
        newQuote();
    }catch(error){
        alert(error);
    }
}

const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}

  newQuoteBtn.addEventListener('click', newQuote);
  twitterBtn.addEventListener('click', tweetQuote);
getQuoteFromApi();