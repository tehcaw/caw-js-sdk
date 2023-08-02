export const isMobileDevice = () => {
    const math = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return math;
}

export const isMetaMaskBrowser = () => {

    const ethereum = window.ethereum
    if (ethereum && ethereum.isMetaMask)
        return true;

    const math = /MetaMask/i.test(navigator.userAgent);
    return math;
}

export const isInWalletBrowser = () => {

    //* test MetaMask|Trust Wallet|WalletConnect|Coinbase Wallet|Enjin|Status Wallet
    const math = /MetaMask|Trust Wallet|WalletConnect|Enjin|Status Wallet/i.test(navigator.userAgent);

    //* if user-agent end of with "Mobile/15E148" then it is likely a in-wallet browser
    if (!math) {

        const strNavigatorUserAgent = navigator.userAgent;
        const strEndOfUserAgent = strNavigatorUserAgent.substring(strNavigatorUserAgent.length - 13, strNavigatorUserAgent.length);
        if (strEndOfUserAgent.toLowerCase() === 'Mobile/15E148'.toLowerCase())
            return true;
    }

    if (!math)
        return isMetaMaskBrowser();

    return math;
}