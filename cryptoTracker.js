import API_KEY from "./apikey.js";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

// DOM Elements
const marketVolume = document.getElementById("market-volume");
const marketCap = document.getElementById("market-cap");
const popularCrypto = document.getElementById("popularCrypto-container");
const allCrypto = document.getElementById("allCrypto-container");

const fetchData = () => {
  fetch(
    "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayHeaderInfo(data);
      displayPopularCryptoCurrencies(data);
      displayAllCryptoCurrencies(data);
    })
    .catch((err) => console.error(err));
};

const displayHeaderInfo = (data) => {
  //converts from string to number than back to string in order to add commas
  const volume = Number(data.data.stats.total24hVolume);
  const totalCap = Number(data.data.stats.totalMarketCap);
  marketVolume.innerHTML = `24 Hour Volume: ${volume.toLocaleString()}`;
  marketCap.innerHTML = `Total Market Cap: ${totalCap.toLocaleString()}`;
};

const displayPopularCryptoCurrencies = (data) => {
  //shows a small list of popular cryptos
  const btcDisplay = `<div class="crypto-card"> 
    <h2><img src="${data.data.coins[0].iconUrl}" width=25px height 25px/> ${data.data.coins[0].name}<h2>
    <h4>Symbol:${data.data.coins[0].symbol}<h4>
    <h4>CurrentPrice: ${data.data.coins[0].price} USD<h4>
    <h5>24hr Change: ${data.data.coins[0].change}</h5>
    </div>`;
  const ethDisplay = `<div class="crypto-card"> 
    <h2><img src="${data.data.coins[1].iconUrl}" width=25px height 25px/> ${data.data.coins[1].name}<h2>
    <h4>Symbol:${data.data.coins[1].symbol}<h4>
    <h4>CurrentPrice: ${data.data.coins[1].price} USD<h4>
    <h5>24hr Change: ${data.data.coins[1].change}</h5>
    </div>`;
  const usdtDisplay = `<div class="crypto-card"> 
    <h2><img src="${data.data.coins[2].iconUrl}" width=25px height 25px/> ${data.data.coins[2].name}<h2>
    <h4>Symbol:${data.data.coins[2].symbol}<h4>
    <h4>CurrentPrice: ${data.data.coins[2].price} USD<h4>
    <h5>24hr Change:  ${data.data.coins[2].change}</h5>
    </div>`;
  const bnbDisplay = `<div class="crypto-card"> 
    <h2><img src="${data.data.coins[4].iconUrl}" width=25px height 25px/> ${data.data.coins[4].name}<h2>
    <h4>Symbol:${data.data.coins[4].symbol}<h4>
    <h4>CurrentPrice: ${data.data.coins[4].price} USD<h4>
    <h5>24hr Change: ${data.data.coins[4].change}</h5>
    </div>`;
  const adaDisplay = `<div class="crypto-card"> 
    <h2><img src="${data.data.coins[6].iconUrl}" width=25px height 25px/> ${data.data.coins[6].name}<h2>
    <h4>Symbol:${data.data.coins[6].symbol}<h4>
    <h4>CurrentPrice: ${data.data.coins[6].price} USD<h4>
    <h5 >24hr Change:  ${data.data.coins[6].change}</h5>
    </div>`;
  const solDisplay = `<div class="crypto-card"> 
    <h2><img src="${data.data.coins[8].iconUrl}" width=25px height 25px/> ${data.data.coins[8].name}<h2>
    <h4>Symbol:${data.data.coins[8].symbol}<h4>
    <h4>CurrentPrice: ${data.data.coins[8].price} USD<h4>
    <h5> 24hr Change: ${data.data.coins[8].change}</h5>
    </div>`;
  popularCrypto.innerHTML = `${btcDisplay} ${ethDisplay} ${adaDisplay} ${solDisplay} ${bnbDisplay} ${usdtDisplay} `;
};

const displayAllCryptoCurrencies = (data) => {
  // similar to how displayPopularCryptoCurrencies() works but instead uses a for loop
  // to display to the DOM instead.

  let cryptos = data.data.coins;
  for (let index = 0; index < cryptos.length; index++) {
    allCrypto.innerHTML += `<div class="crypto-card">
         <h2><img src="${cryptos[index].iconUrl}" width=25px height 25px/> ${data.data.coins[index].name}<h2>
         <h4>Symbol:${data.data.coins[index].symbol}<h4>
         <h4>CurrentPrice: ${data.data.coins[index].price} USD<h4>
         <h5>24hr Change: ${data.data.coins[index].change}</h5>
         </div>`;
  }
};

fetchData();
