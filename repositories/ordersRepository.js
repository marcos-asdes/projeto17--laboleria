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

async function selectDates() {
    const query = `
    SELECT "createdAt" FROM orders
    `
    return db.query(query);
}

async function fullOrders() {
    const query = `
    SELECT clients.id AS client_id, clients.name AS client_name, clients.address AS client_address, clients.phone AS client_phone,
    cakes.id AS cake_Id, cakes.name AS cake_name, cakes.price AS cake_price, cakes.description AS cake_description, cakes.image AS cake_image,
    "createdAt" AS order_createdat, quantity AS order_quantity, "totalPrice" AS order_totalprice
    FROM orders
    JOIN cakes ON orders."cakeId" = cakes.id
    JOIN clients ON orders."clientId" = clients.id
    `
    return db.query(query);
}

export const ordersRepository = {
    insertRegisterOrder,
    selectDates,
    fullOrders,
};