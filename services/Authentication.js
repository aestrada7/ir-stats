import FormData from "form-data";
import fetch from "isomorphic-fetch";

/**
 * Performs a basic authentication check.
 * 
 * @param {object} req The request object.
 * @param {object} res The response object. 
 * @returns {null} Stops execution if unauthorized, continues otherwise.
 */
export const basicAuthentication = (req, res) => {
    if(req.headers.authorization) {
        let authToken = req.headers.authorization.split('Basic ').join();
        let authBits = new Buffer.from(authToken, 'base64').toString('binary').split(':');
        let user = authBits[0];
        let pass = authBits[1];

        if(!authenticate(user, pass)) {
            res.statusCode = 401;
            res.end();
        } else {
            res.statusCode = 200;
        }
    }
}

/**
 * Performs authentication against whichever service is used for storing user data.
 * 
 * @param {string} user A string with the user.
 * @param {string} pass A string with the password.
 */
function authenticate(user, pass) {
    if(user === "test" && pass === "test") {
        return true;
    } else {
        return false;
    }
}


export const iracingAuthentication = async (username, password) => {
    const IRACING_LOGIN_URL = `https://members.iracing.com/membersite/login.jsp`;
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const login = await fetch(IRACING_LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    });
    console.log(login);
}