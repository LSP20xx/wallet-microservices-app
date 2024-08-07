const orderHandler = require("../handlers/orderHandler");
const { sendMessage } = require("../common-utils/rabbitmq");
const Joi = require("joi");
const { sanitizeInput } = require("../common-utils/sanitizeInput");

exports.createService = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    value: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const sanitizedBody = sanitizeInput(req.body, ["name", "value"]);

  try {
    const order = await orderHandler.createService(sanitizedBody);
    await sendMessage("order_created", {
      id: order._id,
      name: order.name,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const order = await orderHandler.getServiceById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await orderHandler.deleteService(req.params.id);
    res.status(204).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateService = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    value: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const sanitizedBody = sanitizeInput(req.body, ["name", "value"]);

  try {
    const order = await orderHandler.updateService(
      req.params.id,
      sanitizedBody
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listServices = async (req, res) => {
  try {
    const orders = await orderHandler.listServices();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
