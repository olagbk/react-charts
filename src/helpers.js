export function convertDate(stamp) {
    const date = new Date(stamp * 1000);
    return date.toLocaleDateString();
}

export function parseDomain(data) {
    const values = [];
    for (const set in data) {
        if (data.hasOwnProperty(set)) {
            values.push(...data[set].map(entry => entry.value))
        }
    }
    return [
        0,
        Math.max.apply(null, values)
    ];
}