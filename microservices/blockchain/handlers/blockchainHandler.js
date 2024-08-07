const Service = require("../models/blockchainModel");
const redisClient = require("../common-utils/redisClient");

exports.createService = async (data) => {
  const blockchain = new Service(data);
  return await blockchain.save();
};

exports.getServiceById = async (id) => {
  const cachedService = await redisClient.get(id);
  if (cachedService) {
    return JSON.parse(cachedService);
  }
  const blockchain = await Service.findById(id);
  if (blockchain) {
    await redisClient.set(id, JSON.stringify(blockchain));
  }
  return blockchain;
};

exports.deleteService = async (id) => {
  await redisClient.del(id);
  return await Service.findByIdAndDelete(id);
};

exports.updateService = async (id, data) => {
  const blockchain = await Service.findByIdAndUpdate(id, data, { new: true });
  if (blockchain) {
    await redisClient.set(id, JSON.stringify(blockchain));
  }
  return blockchain;
};

exports.listServices = async () => {
  return await Service.find({});
};
