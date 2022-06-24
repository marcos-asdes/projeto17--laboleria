import db from "../config/db.js";

async function insertRegisterOrder(clientId, cakeId, quantity, totalPrice, createdAt) {
    const query = `
    INSERT INTO orders 
    ("clientId", "cakeId", quantity, "totalPrice", "createdAt")
    VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [clientId, cakeId, quantity, totalPrice, createdAt];
    return db.query(query, values);
}

export const ordersRepository = {
    insertRegisterOrder,
};