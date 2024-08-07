const transactionHandler = require("../handlers/transactionHandler");
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
    const transaction = await transactionHandler.createService(sanitizedBody);
    await sendMessage("transaction_created", {
      id: transaction._id,
      name: transaction.name,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const transaction = await transactionHandler.getServiceById(req.params.id);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await transactionHandler.deleteService(req.params.id);
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
    const transaction = await transactionHandler.updateService(
      req.params.id,
      sanitizedBody
    );
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listServices = async (req, res) => {
  try {
    const transactions = await transactionHandler.listServices();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
