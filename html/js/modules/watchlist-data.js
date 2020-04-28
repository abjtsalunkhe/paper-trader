async function getAssets() {
    let response = await fetch('https://alpaca-html-app.herokuapp.com/api/assets');
    let data = await response.json();
    return data;
}

async function getQuote(symbol) {
    let response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=I17CKY20ZBPQY0Q0`);
    let data = await response.json();
    return data;
}

export { getAssets, getQuote }