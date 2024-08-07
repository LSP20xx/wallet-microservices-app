const Service = require("../models/walletModel");
const redisClient = require("../common-utils/redisClient");

exports.createService = async (data) => {
  const wallet = new Service(data);
  return await wallet.save();
};

exports.getServiceById = async (id) => {
  const cachedService = await redisClient.get(id);
  if (cachedService) {
    return JSON.parse(cachedService);
  }
  const wallet = await Service.findById(id);
  if (wallet) {
    await redisClient.set(id, JSON.stringify(wallet));
  }
  return wallet;
};

exports.deleteService = async (id) => {
  await redisClient.del(id);
  return await Service.findByIdAndDelete(id);
};

exports.updateService = async (id, data) => {
  const wallet = await Service.findByIdAndUpdate(id, data, { new: true });
  if (wallet) {
    await redisClient.set(id, JSON.stringify(wallet));
  }
  return wallet;
};

exports.listServices = async () => {
  return await Service.find({});
};
