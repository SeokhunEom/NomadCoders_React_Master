const BASE_URL = "https://api.coinpaprika.com/v1";

function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

function fetchCoinInfo(coinId?: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

function fetchCoinTickers(coinId?: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export { fetchCoins, fetchCoinInfo, fetchCoinTickers };
