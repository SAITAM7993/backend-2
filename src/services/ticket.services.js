import ticketRepository from '../persistence/mongoDB/ticket.repository.js';

const createTicket = async (userEmail, totalCart, products) => {
  const newTicket = {
    total_amount: totalCart, //importe total de la compra
    purchaser: userEmail, //guardo el mail como comprador
    code: Math.random().toString(36).substr(2, 9), //codigo generado con random
    products: products,
  };

  const ticket = await ticketRepository.create(newTicket);
  return ticket;
};

export default { createTicket };
