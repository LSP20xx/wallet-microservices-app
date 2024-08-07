const Service = require("../models/transactionModel");
const redisClient = require("../common-utils/redisClient");

exports.createService = async (data) => {
  const transaction = new Service(data);
  return await transaction.save();
};

exports.getServiceById = async (id) => {
  const cachedService = await redisClient.get(id);
  if (cachedService) {
    return JSON.parse(cachedService);
  }
  const transaction = await Service.findById(id);
  if (transaction) {
    await redisClient.set(id, JSON.stringify(transaction));
  }
  return transaction;
};

exports.deleteService = async (id) => {
  await redisClient.del(id);
  return await Service.findByIdAndDelete(id);
};

exports.updateService = async (id, data) => {
  const transaction = await Service.findByIdAndUpdate(id, data, { new: true });
  if (transaction) {
    await redisClient.set(id, JSON.stringify(transaction));
  }
  return transaction;
};

exports.listServices = async () => {
  return await Service.find({});
};
