import db from "../config/db.js";

async function selectCakeByName(name) {
    const query = `
    SELECT * FROM cakes WHERE name = $1
    `;
    const value = [name];
    return db.query(query, value);
}

export const cakesRepository = {
    selectCakeByName
};