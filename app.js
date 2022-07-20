// Defining constants (variable) with document methods
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote(){
  loading();
  // Pick a random quote from apiQuotes Array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if author field is blank and replace it with unkonwn
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author
  }
  // Check Quote Length to determine the styling
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  } 
    // Set quote, Hide Loader
   quoteText.textContent = quote.text;
   complete();
   
}

// Get Quotes From API
async function getQuotes(){
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch {
    alert ('Slow Down');
  }
}

// Tweet Quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load 
getQuotes();


// newQuote();
