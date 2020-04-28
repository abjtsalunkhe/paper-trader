import { getPortfolio } from "./modules/portfolio-data.js";
import { formatCurrency } from "./modules/helper.js";

document.addEventListener("DOMContentLoaded", event => {

    let tableRef = document.getElementById('portfolio-tile-table').getElementsByTagName('tbody')[0];

    // all portfolios
    getPortfolio().then(data => {
        let htmlString = "";

        if (Array.isArray(data) && data.length) {
            data.forEach(position => {
                let stockClass = "portfolio-stock-red";
                let stockSign = "";
                if (Math.sign(position.change_today) > 0) {
                    stockClass = "portfolio-stock-green";
                    stockSign = "+";
                }
                let change = parseFloat(position.change_today * 100);
                change = change.toFixed(2);

                let plClass = "portfolio-red";
                let plSign = "";
                if (Math.sign(position.unrealized_pl) > 0) {
                    plClass = "portfolio-green";
                    plSign = "+";
                }
                htmlString += `<tr>
               <td> 
                 <div class="${stockClass} p-1 float-left">
                   <span><strong>${position.symbol}</strong></span><span class="float-right">${stockSign}${change}%</span>
                 </div>
               </td>
               <td class="text-right">${formatCurrency(position.current_price)}</td>
               
               <td class="text-right">${position.qty}</td>
               <td class="text-right">${formatCurrency(position.market_value)}</td>
               <td class="text-right ${plClass}">${plSign}${formatCurrency(position.unrealized_pl)}</td>
             </tr>`;
            });
        }

        tableRef.innerHTML = htmlString;

    });
});