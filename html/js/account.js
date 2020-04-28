import { getAccount } from "./modules/account-data.js";
import { formatCurrency } from "./modules/helper.js";

document.addEventListener("DOMContentLoaded", event => {

    const equity = document.querySelector("#equity");
    const buyPower = document.querySelector("#buyPower");
    const labelProfitLoss = document.querySelector("#labelProfitLoss");

    // account information
    getAccount().then(data => {
        equity.innerHTML = `${formatCurrency(data.portfolio_value)}`;
        buyPower.innerHTML = `${formatCurrency(data.daytrading_buying_power)}`;

        let balanceChange = parseFloat(data.equity) - parseFloat(data.last_equity);
        let plSign = "";
        let plClass = "profit-red";
        if (Math.sign(balanceChange) > 0) {
            plSign = "+";
            plClass = "profit-green";
        }
        let pl = (balanceChange / parseFloat(data.last_equity)) * 100

        labelProfitLoss.innerHTML = `${plSign}${pl.toFixed(2)}%`;
        labelProfitLoss.classList.add(plClass);
    });
});