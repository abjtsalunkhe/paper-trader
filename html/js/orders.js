import { getOrders } from "./modules/order-data.js";
import { capitalizeFirstLetter, formatDate, formatCurrency } from "./modules/helper.js";

document.addEventListener("DOMContentLoaded", event => {
    let tableRef = document.getElementById('orders-tile-table').getElementsByTagName('tbody')[0];

    // all orders
    getOrders().then(data => {
        let htmlString = "";

        if (Array.isArray(data) && data.length) {
            data.forEach(order => {

                let statusClass = "order-status";
                if (order.status === "filled") {
                    statusClass = "order-filled";
                }

                let price = "";
                if (order.filled_avg_price) {
                    price = `${formatCurrency(order.filled_avg_price)}`;
                }

                let orderInfo = "";
                if (order.type === "market") {
                    orderInfo = `Market ${order.side.toUpperCase()}`;
                } else if (order.type === "limit") {
                    orderInfo = `Limit ${order.side.toUpperCase()} @ ${formatCurrency(order.limit_price)}`;
                }
                else if (order.type === "stop") {
                    orderInfo = `Stop ${order.side.toUpperCase()} @ ${formatCurrency(order.stop_price)}`;
                }
                else if (order.type === "stop_limit") {
                    orderInfo = `Stop Limit ${order.side.toUpperCase()} with limit @ ${formatCurrency(order.limit_price)} `;
                    orderInfo += `and stop price @ ${formatCurrency(order.stop_price)}`;
                }
                htmlString += `<tr>
                        <td class="order-stock align-middle text-center">
                            ${order.symbol}
                        </td>
                        <td>${orderInfo}</br>
                        ${ formatDate(order.submitted_at)}</td>
                        <td class="align-middle text-right">${order.qty}</td>
                        <td class="align-middle text-right">${price}</td>
                        <td class="${statusClass} align-middle">${capitalizeFirstLetter(order.status)}</td>
                    </tr > `;
            });
        }

        tableRef.innerHTML = htmlString;

    });
});