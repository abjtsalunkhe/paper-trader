async function getAccount() {

    let response = await fetch('https://alpaca-html-app.herokuapp.com/api/account');
    let data = await response.json();
    return data;
}

export { getAccount };