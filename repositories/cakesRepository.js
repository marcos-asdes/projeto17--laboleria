import db from "../config/db.js";

async function selectCakeByName(name) {
    const query = `
    SELECT * FROM cakes WHERE name = $1
    `;
    const value = [name];
    return db.query(query, value);
}

async function insertCakeRecipe(name, price, description, image) {
    const query = `
    INSERT INTO cakes 
    (name, price, image, description)
    VALUES ($1, $2, $3, $4)
    `
    const values = [name, price, image, description];
    return db.query(query, values);
}

export const cakesRepository = {
    selectCakeByName,
    insertCakeRecipe
};