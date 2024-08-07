const Service = require("../models/orderModel");
const redisClient = require("../common-utils/redisClient");

exports.createService = async (data) => {
  const order = new Service(data);
  return await order.save();
};

exports.getServiceById = async (id) => {
  const cachedService = await redisClient.get(id);
  if (cachedService) {
    return JSON.parse(cachedService);
  }
  const order = await Service.findById(id);
  if (order) {
    await redisClient.set(id, JSON.stringify(order));
  }
  return order;
};

exports.deleteService = async (id) => {
  await redisClient.del(id);
  return await Service.findByIdAndDelete(id);
};

exports.updateService = async (id, data) => {
  const order = await Service.findByIdAndUpdate(id, data, { new: true });
  if (order) {
    await redisClient.set(id, JSON.stringify(order));
  }
  return order;
};

exports.listServices = async () => {
  return await Service.find({});
};
