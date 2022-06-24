import db from "../config/db.js";

async function insertRegisterClient(name, address, phone) {
    const query = `
    INSERT INTO clients 
    (name, address, phone)
    VALUES ($1, $2, $3)
    `;
    const values = [name, address, phone];
    return db.query(query, values);
}

async function selectClientById(id) {
    const query = `
    SELECT * FROM clients WHERE id = $1
    `;
    const value = [id];
    return db.query(query, value);
}

export const clientsRepository = {
    insertRegisterClient,
    selectClientById,
};