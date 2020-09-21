
export function isFloat(str) {
    const regEx = /^[\d.]*$/;
    return regEx.test(str);
}

