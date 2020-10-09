import fetch from "isomorphic-fetch";

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