const prices = {};

const generateMarketData = (instrument) => {
    if(!prices[instrument]){
        prices[instrument] = {
            price: 100 + Math.random() * 50,
            high: 0,
            low: Infinity
        };
    }

    const change = (Math.random() - 0.5) * 2;
    const newPrice = prices[instrument].price + change;

    prices[instrument].price = newPrice;
    prices[instrument].high = Math.max(prices[instrument].high, newPrice);
    prices[instrument].low = Math.min(prices[instrument].low, newPrice);

    return {
        instrumentName: instrument,
        lastTradedPrice: Number(newPrice.toFixed(2)),
        lastTradedQuantity: Math.floor(Math.random() * 100) + 1,
        lastTradedDateTime: new Date().toISOString(),
        high: Number(prices[instrument].high.toFixed(2)),
        low: Number(prices[instrument].low.toFixed(2))
    };
};

module.exports = {
    generateMarketData
};
