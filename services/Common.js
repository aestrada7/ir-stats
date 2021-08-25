import fetch from 'isomorphic-fetch';

/**
 * Decodes an encoded string
 * 
 * @param {string} val The raw string as is.
 * @returns {string} A decoded string.
 */
export const decode = (val) => {
    let decodedVal;

    if(val) {
        decodedVal = decodeURI(val);
        decodedVal = decodedVal.split('+').join(' ');
    }

    return decodedVal;
}

/**
 * Encodes an plain string, leaves escape characters intact though
 * 
 * @param {string} val The raw string as is.
 * @returns {string} An encoded string.
 */
export const encode = (val) => {
    let encodedVal;

    if(val) {
        encodedVal = val.split(' ').join('\\+');
        encodedVal = encodedVal.split('%20').join('\\+');
        encodedVal = encodeURI(encodedVal);
        encodedVal = encodedVal.split('%5C').join('\\+');
    }

    return encodedVal;
}

/**
 * Takes a plain string and converts it to HTML, replacing \n for <br /> tags, and returns it inside a valid React object
 * to use with dangerouslySetInnerHTML()
 * 
 * @param {string} val A string with no HTML encoding.
 * @returns {*} An object including the 
 */
export const replaceLineBreaks = (val) => {
    return { __html: val ? val.split('\n').join('<br>') : '' };
}

/**
 * Checks if an item is present in an array.
 * 
 * @param {*} item The item to compare against.
 * @param {array} arr The array to check against.
 * @returns {boolean} Does the item exist or not in the array.
 */
export const itemExists = (item, arr) => {
    if(arr) {
        return arr.filter(x => x == item).length > 0;
    }
    return false;
}

/**
 * Converts an iracing time to a date/time readable string.
 * 
 * @param {string} date An iracing stored date/time combination.
 * @returns {string} A readable formatted string
 */
export const formatDateTime = (date) => {
    return decode(date).split('%3A').join(':');
}

/**
 * Converts an epoch time to a date/time readable string.
 * 
 * @param {number} date An epoch time represented in milliseconds.
 * @returns {string} A readable formatted string
 */
export const formatEpoch = (date) => {
    let currentDate = new Date(date);
    let minutes = currentDate.getMinutes();
    if(minutes < 10) minutes = `0${minutes}`;
    return `${currentDate.getFullYear()}.${currentDate.getMonth() + 1}.${currentDate.getDate()} ${currentDate.getHours()}:${minutes}`;
}