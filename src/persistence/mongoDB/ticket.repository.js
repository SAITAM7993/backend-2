import { ticketModel } from './models/ticket.model.js';

const create = async (data) => {
  const ticket = await ticketModel.create(data);
  return ticket;
};
const getById = async (id) => {
  const ticket = await ticketModel.findById(id).populate('products.product');
  return ticket;
};

export default {
  create,
  getById,
};
