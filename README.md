# paper-trader
1.	Copy the zip file to C:\MAMP\htdocs (or your local server like xampp)
2.	Extract the zip file. 
3.	Open node folder in command prompt/shell window. Type npm i and hit enter. 
4.	Type node index to start node application. 
5.	Start mamp server 
6.	Go to chrome and browse http://localhost/paper-trader/html/index.html
7.	First time, it takes approx. 2 seconds to load all the data. It might load faster too.
8.	I have used free API from Alpaca and Alpha Vantage.
https://alpaca.markets/docs/api-documentation/api-v2/#paper-trading
https://www.alphavantage.co/documentation/
9.	Technologies used – HTML Node Bootstrap
10.	 It is a single page application.
11.	Equity, buying power at top left corner and profit/loss at the right is loaded from Alpaca account API. Depending upon profit or loss, the text is either green or red.
12.	Portfolio tile shows all your current positions. I have used Alpaca Positions API. Stock rectangle is either red or green based on today’s market. Total profit text color is also either red or green based on if you have made profit with that stock.
13.	Orders tile shows all orders placed so far. If the order is filled status text is green or else it’s white. I have used Alpaca Orders API.
14.	Watchlist tile uses 2 API. Alpaca Assets API to search stock and Alpha Vantage for showing stock information. Click Add button. Enter stock symbol in the textbox. It shows all stocks available to trade as you type. 
15.	Click Add and the stock in added in the Watchlist. Then Alpha Vantage API gets stock information. Unfortunately, this api only allows 5 calls per minute. So if you keep adding stocks there will be a modal popup at the top of the screen, which will tell you this limitation.
16.	Wathclist is not saved. If you refresh the page, the list will be empty. In future I will use MongoDB.
17.	Inside Trade tile, search stock in Symbol textbox. If stock symbol is valid, stock price is shown beside the textbox using Alpha Vantage API. (remember 5 api calls per minute) If you choose, stop/limit order type then more textboxes are visible to add stop/limit price.
18.	When you click Place order, it validates all textboxes and shows red border if text is invalid. Buy, Sell is actually a radiobutton. When you place order, if all inputs are valid you will see a confirmation modal that says order is placed. Trade tile does not actually places order because I had cors issue with Heroku and 000webhosting. I have hosted html on 000webhosting and node application on Heroku. I have a react application hosted on Heroku that places order successfully but I had trouble hosting html on Heroku. So I decided not use Place order API from Alpaca.
