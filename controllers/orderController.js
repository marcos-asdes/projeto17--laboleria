import { ordersRepository } from "../repositories/ordersRepository.js";

export async function registerOrder(req, res) {
    const { clientId, cakeId, quantity } = res.locals;
    const { totalPrice } = req.body;
    const createdAt = new Date().toISOString().slice(0, 16).replace("T", " ");
    console.log(clientId, cakeId, quantity, totalPrice, createdAt);
    try {
        await ordersRepository.insertRegisterOrder(clientId, cakeId, quantity, totalPrice, createdAt);
        console.log("Order registered successfully");
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal error");
    }
}

export async function getOrdersByDate(_req, res) {
    const { date } = res.locals;
    try {
        const fullOrders = await ordersRepository.fullOrders();
        const arrOrders = [];
        for (let i=0; i<fullOrders.rows.length; i++) {
            const auxDate = fullOrders.rows[i].order_createdat.toISOString().slice(0,10);
            let aux = fullOrders.rows[i];
            if (auxDate===date) {
                let objOrders = new Object();
                objOrders = {
                    client: 
                        { 
                            id: aux.client_id, 
                            name: aux.client_name, 
                            address: aux.client_address, 
                            phone: aux.client_phone
                        },
                    cake:
                        {
                            id: aux.cake_id, 
                            name: aux.cake_name, 
                            price: aux.cake_price, 
                            description: aux.cake_description, 
                            image: aux.cake_image
                        },
                    createdAt: aux.order_createdat,
                    quantity: aux.order_quantity,
                    totalPrice: aux.order_totalprice
                }
                arrOrders.push(objOrders);
            }
        }
        const arrOrdersJSON = JSON.stringify(arrOrders);
        console.log("Get orders successfully");
        res.status(200).send(arrOrdersJSON);
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal error");
    }
}