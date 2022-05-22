export const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + "k"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(2) + "m"; // convert to M for number from > 1 million
    } else if (num < 900) {
        return num;
    }
};