export function escape(str:string) {
    return Array.from(str)
        .map((char) => {
            if (char.charCodeAt(0) > 127) {
                return '\\u' + char.charCodeAt(0).toString(16);
            }
            return char;
        })
        .join('');
}

export function unescape(str:string) {
    return str.replace(/\\u([\d\w]{4})/gi, function (match, hex) {
        return String.fromCharCode(parseInt(hex, 16));
    });
}