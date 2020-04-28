async function getPortfolio() {
    let response = await fetch('https://alpaca-html-app.herokuapp.com/api/positions');
    let data = await response.json();
    return data;
}

export { getPortfolio }