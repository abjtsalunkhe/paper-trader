import { getQuote } from "./modules/watchlist-data.js";
import { formatCurrency } from "./modules/helper.js";

document.addEventListener("DOMContentLoaded", event => {

    const inputSymbol = document.querySelector("#inputSymbol");
    const inputStop = document.querySelector("#inputStop");
    const inputLimit = document.querySelector("#inputLimit");
    const inputQuantity = document.querySelector("#inputQuantity");
    const selectTIF = document.querySelector("#selectTIF");
    const radioBuy = document.querySelector("#radio-buy");
    const radioSell = document.querySelector("#radio-sell");

    const confirmMessage = document.querySelector("#confirmMessage");
    const divTradeStock = document.querySelector("#divTradeStock");
    const lblTradeStock = document.querySelector("#lblTradeStock");
    const divTradeSymbol = document.querySelector("#divTradeSymbol");
    let side = "buy";

    const btnPlaceOrder = document.querySelector("#btnPlaceOrder");
    btnPlaceOrder.addEventListener("click", e => {
        e.preventDefault(true);

        if (validate()) {
            const tradeInfo = {
                symbol: inputSymbol.value.toUpperCase(),
                quantity: parseInt(inputQuantity.value),
                side: side,
                type: selectOrderType.value,
                time_in_force: selectTIF.value
            };
            let type = "";
            if (tradeInfo.type === "Market") {
                type = "Market";
            } else if (tradeInfo.type === "limit") {
                type = "Limit";
                tradeInfo.limit = parseFloat(inputLimit.value);
            }
            else if (tradeInfo.type === "stop") {
                type = "Stop";
                tradeInfo.stop = parseFloat(inputStop.value);
            }
            else if (tradeInfo.type === "stop_limit") {
                type = "Stop Limit";
                tradeInfo.stop = parseFloat(inputStop.value);
                tradeInfo.limit = parseFloat(inputLimit.value);
            }

            let shares = "share";
            if (tradeInfo.quantity > 1) { shares = "shares"; }

            confirmMessage.innerHTML = `Your ${type} ${tradeInfo.side.toUpperCase()} for ${tradeInfo.quantity} ${shares} of ${tradeInfo.symbol} was submitted!`;
            $('#confirmModal').modal('show');
            clearForm();
        }
    });

    // make buy text yellow
    $("#label-buy").css("color", "#feda6a");

    $(":radio").on('click', function () {
        if ($(this).val() === "buy") {
            side = "buy";
            $(".buy").css("border-bottom", "solid 2px #feda6a");
            $(".sell").css("border-bottom", "solid 2px #393f4d");

            $("#label-buy").css("color", "#feda6a");
            $("#label-sell").css("color", "#d4d4dc");
        }
        else {
            side = "sell";
            $(".buy").css("border-bottom", "solid 2px #393f4d");
            $(".sell").css("border-bottom", "solid 2px #feda6a");

            $("#label-sell").css("color", "#feda6a");
            $("#label-buy").css("color", "#d4d4dc");
        }
    });

    const selectOrderType = document.querySelector("#selectOrderType");
    const rowStopLimit = document.querySelector("#rowStopLimit");
    const colStop = document.querySelector("#colStop")
    const colLimit = document.querySelector("#colLimit")
    const tradeTile = document.querySelector(".Trade-tile");
    const orderTile = document.querySelector(".order-tile");

    selectOrderType.addEventListener("input", e => {
        if (e.target.value === 'stop') {

            rowStopLimit.style.display = 'block';
            colStop.style.display = 'block';
            rowStopLimit.classList.add('w-50');
            colLimit.style.display = 'none';

            tradeTile.style.height = "510px";
            orderTile.style.height = "510px";

        } else if (e.target.value === 'limit') {

            rowStopLimit.style.display = 'block';
            rowStopLimit.classList.add('w-50');
            colStop.style.display = 'none';
            colLimit.style.display = 'block';

            tradeTile.style.height = "510px";
            orderTile.style.height = "510px";
        }
        else if (e.target.value === 'stop_limit') {

            rowStopLimit.style.display = 'block';
            rowStopLimit.classList.remove('w-50');
            colStop.style.display = 'block';
            colLimit.style.display = 'block';

            tradeTile.style.height = "510px";
            orderTile.style.height = "510px";
        }
        else {
            colStop.style.display = 'none';
            colLimit.style.display = 'none';
            rowStopLimit.style.display = 'none';
            tradeTile.style.height = "430px";
            orderTile.style.height = "430px";
        }
    });

    inputSymbol.addEventListener("keyup", event => {
        inputSymbol.classList.add('validInput');
        inputSymbol.classList.remove('invalidInput');

        if (event.target.value) {
            event.target.value = event.target.value.toUpperCase();

            getQuote(event.target.value).then(quote => {
                let quotePrice = quote["Global Quote"]["05. price"];
                divTradeSymbol.classList.remove("w-50");
                divTradeStock.style.display = "block";
                lblTradeStock.innerHTML = formatCurrency(quotePrice);
            }).catch(error => {
                $('#errorModal').modal('show');
                console.log('Alphavantage free API allows only 5 calls per minute.');

                divTradeSymbol.classList.add("w-50");
                lblTradeStock.innerHTML = "";
                divTradeStock.style.display = "none";
            });
        }
        else {
            divTradeSymbol.classList.add("w-50");
            lblTradeStock.innerHTML = "";
            divTradeStock.style.display = "none";
        }
    });

    inputStop.addEventListener("keyup", event => {
        inputStop.classList.add('validInput');
        inputStop.classList.remove('invalidInput');
    });

    inputLimit.addEventListener("keyup", event => {
        inputLimit.classList.add('validInput');
        inputLimit.classList.remove('invalidInput');
    });

    function validate() {
        let errors = [];
        // no numbers and special characters
        if (!inputSymbol.value ||
            !inputSymbol.value.match('^[a-zA-Z\(\)]+$')) {
            inputSymbol.classList.remove('validInput');
            inputSymbol.classList.add('invalidInput');
            errors.push("Invalid Symbol");
        }
        else {
            inputSymbol.classList.add('validInput');
            inputSymbol.classList.remove('invalidInput');
        }

        if (inputQuantity.value && Number.isInteger(parseInt(inputQuantity.value)) && parseInt(inputQuantity.value) > 0) {
            inputQuantity.classList.add('validInput');
            inputQuantity.classList.remove('invalidInput');
        }
        else {
            inputQuantity.classList.remove('validInput');
            inputQuantity.classList.add('invalidInput');
            errors.push("Invalid quantity");
        }

        if (selectOrderType.value.toLowerCase().includes("stop")) {
            if (inputStop.value && parseFloat(inputStop.value) > 0) {
                inputStop.classList.add('validInput');
                inputStop.classList.remove('invalidInput');
            }
            else {
                inputStop.classList.remove('validInput');
                inputStop.classList.add('invalidInput');
                errors.push("Invalid stop price");
            }
        }
        if (selectOrderType.value.toLowerCase().includes("limit")) {
            if (inputLimit.value && parseFloat(inputLimit.value) > 0) {
                inputLimit.classList.add('validInput');
                inputLimit.classList.remove('invalidInput');
            }
            else {
                inputLimit.classList.remove('validInput');
                inputLimit.classList.add('invalidInput');
                errors.push("Invalid stop price");
            }
        }

        return errors.length == 0;
    }

    function clearForm() {
        inputSymbol.value = "";
        inputQuantity.value = "1";
        inputStop.value = "";
        inputLimit.value = "";
        selectOrderType.value = "Market";
        selectTIF.value = "day";
        colStop.style.display = 'none';
        colLimit.style.display = 'none';
        rowStopLimit.style.display = 'none';
        radioBuy.checked = true;
        side = "buy";
        radioSell.checked = false;

        divTradeSymbol.classList.add("w-50");
        lblTradeStock.innerHTML = "";
        divTradeStock.style.display = "none";

        $(".buy").css("border-bottom", "solid 2px #feda6a");
        $(".sell").css("border-bottom", "solid 2px #393f4d");

        $("#label-buy").css("color", "#feda6a");
        $("#label-sell").css("color", "#d4d4dc");
    }
});