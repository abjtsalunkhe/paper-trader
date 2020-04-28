import { getAssets, getQuote } from "./modules/watchlist-data.js";
import { formatCurrency } from "./modules/helper.js";

document.addEventListener("DOMContentLoaded", event => {

  let assets = [];

  if (!assets.length) {
    // all assets
    getAssets().then(data => {
      assets = data;
    });
  }

  let btnDone = document.querySelector("#btnDone");
  let btnEdit = document.querySelector("#btnEdit");

  let inputWLSearchStock = document.querySelector("#inputWLSearchStock");
  let ulWL = document.querySelector("#ulWL");

  let searchArray = [];
  let wlArray = [];

  inputWLSearchStock.addEventListener("keyup", event => {
    ulWL.innerHTML = "";
    if (event.target.value) {
      searchArray = assets.filter(a => a.symbol.startsWith(event.target.value.toUpperCase()));
      if (Array.isArray(searchArray) && searchArray.length) {
        let htmlString = "";
        searchArray.forEach(asset => {
          htmlString += `<li class="list-group-item">
                <div>
                  <span>${asset.symbol}</span>
                  <span id="${asset.symbol}" class="btn-add float-right text-center">Add</span>
                </div>
              </li>`
        });
        ulWL.innerHTML = htmlString;

        searchArray.forEach(asset => {
          document.querySelector(`#${asset.symbol}`).addEventListener("click", e => {
            wlArray.push(e.target.id);
            let unique = [...new Set(wlArray)];
            if (Array.isArray(unique) && unique.length) {
              ulWL.innerHTML = "";
              let wlHtml = "";
              unique.forEach(wl => {
                getQuote(wl.toUpperCase()).then(quote => {
                  let quoteSign = "";
                  let quoteClass = "red";
                  let quoteInfo = "";

                  let quotePrice = quote["Global Quote"]["05. price"];
                  let quoteChange = quote["Global Quote"]["09. change"];
                  let quoteChangePercent = quote["Global Quote"]["10. change percent"];

                  if (Math.sign(quoteChange) > 0) {
                    quoteSign = "+";
                    quoteClass = "green";
                  }
                  quoteInfo = `${quoteSign + formatCurrency(quoteChange)} (${parseFloat(quoteChangePercent).toFixed(2)}%) Today`;
                  wlHtml += `<li class="list-group-item">
                            <div>
                              <span>${wl.toUpperCase()}</span>
                              <div class="float-right ">
                                <div class="${quoteClass} px-2 float-left">
                                  <span class="mr-3"><strong>${formatCurrency(quotePrice)}</strong></span><span style="font-size:smaller" class="float-right pt-1">${quoteInfo}</span>
                                </div>
                              </div>
                            </div>
                          </li>`;
                  ulWL.innerHTML = wlHtml;
                }).catch(error => {
                  $('#errorModal').modal('show');
                  console.log('Alphavantage free API allows only 5 calls per minute.');
                });
              });
              event.target.value = "";
            }
          });
        });
      }
    }
  });

  btnDone.style.display = 'none';

  btnEdit.addEventListener("click", event => {
    btnEdit.style.display = 'none';
    btnDone.style.display = 'block';
    inputWLSearchStock.style.display = 'block';
  });

  btnDone.addEventListener("click", event => {
    btnEdit.style.display = 'block';
    btnDone.style.display = 'none';
    inputWLSearchStock.style.display = 'none';


  });

});