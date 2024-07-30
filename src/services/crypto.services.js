const FetchApi = require("./fetch");

const cryptoApi = async (amount) => {
  try {
    const result = await FetchApi(
    //   "https://api2.binance.com/api/v3/ticker/24hr"
    'https://swapi.dev/api/people/'
    );
    return result.results.slice(0, amount);
    // return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  cryptoApi,
};