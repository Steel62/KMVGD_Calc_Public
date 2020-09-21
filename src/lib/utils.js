export function normalizeString(str){
    if (str === 'NaN' || str === 'Infinity') str = '------';
    return str;
}

export function isMatchedKit(kit) {
    const isMatchIndex7 = kit.measureIndex7.pressure.isMatched;
    const isMatchIndex16 = kit.measureIndex16.pressure.isMatched;
    const isMatchIndex23 = kit.measureIndex23.pressure.isMatched;
    const isMatchIndex50 = kit.measureIndex50.pressure.isMatched;

    const isMatched = isMatchIndex7 && isMatchIndex16 && isMatchIndex23 && isMatchIndex50;

    if(isMatched){
        return true;
    } else {
        return false
    }
}


