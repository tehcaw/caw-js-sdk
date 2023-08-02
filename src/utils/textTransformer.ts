export function slugify(text: string) {
    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[\s\W-]+/g, '-'); // Replace spaces, non-word characters and dashes with a single dash (-)    
}

export const sentenceCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const shortenAddress = (address: string) => address ? `${address.slice(0, 4)}...${address.slice(address.length - 4)}` : '';