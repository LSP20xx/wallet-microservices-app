const Service = require("../models/userModel");
const redisClient = require("../common-utils/redisClient");

exports.createService = async (data) => {
  const user = new Service(data);
  return await user.save();
};

exports.getServiceById = async (id) => {
  const cachedService = await redisClient.get(id);
  if (cachedService) {
    return JSON.parse(cachedService);
  }
  const user = await Service.findById(id);
  if (user) {
    await redisClient.set(id, JSON.stringify(user));
  }
  return user;
};

exports.deleteService = async (id) => {
  await redisClient.del(id);
  return await Service.findByIdAndDelete(id);
};

exports.updateService = async (id, data) => {
  const user = await Service.findByIdAndUpdate(id, data, { new: true });
  if (user) {
    await redisClient.set(id, JSON.stringify(user));
  }
  return user;
};

exports.listServices = async () => {
  return await Service.find({});
};
