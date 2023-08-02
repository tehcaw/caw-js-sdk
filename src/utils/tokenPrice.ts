export async function getTokenPriceInUSD(tokenName: string) {

    //* keep cache for 1 minutes
    const cacheTime = 60 * 1000;
    const cacheKey = `tokenPriceInUSD-${tokenName}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        const { timestamp, value } = JSON.parse(cached);
        const now = Date.now();
        if (now - timestamp < cacheTime) {
            return Number(value || 0);
        }
    }

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenName}&vs_currencies=usd`;
    const response = await fetch(url);
    const data = await response.json();
    const priceInUsd = Number(data?.[ `${tokenName}` ]?.usd || 0);
    localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), value: priceInUsd }));

    return priceInUsd;
}

export function getEthPriceInUsd() {
    return getTokenPriceInUSD("ethereum");
}

export function getCawPriceInUsd() {
    return getTokenPriceInUSD("a-hunters-dream");
}

