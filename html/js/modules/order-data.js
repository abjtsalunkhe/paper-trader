async function getOrders() {
    let response = await fetch('https://alpaca-html-app.herokuapp.com/api/orders');
    let data = await response.json();
    return data;
}

async function createOrder(order) {
    let url = 'https://alpaca-html-app.herokuapp.com/api/orders';

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(order)
    });
    return response.json();
}

export { getOrders, createOrder }