const blockchainHandler = require("../handlers/blockchainHandler");
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
    const blockchain = await blockchainHandler.createService(sanitizedBody);
    await sendMessage("blockchain_created", {
      id: blockchain._id,
      name: blockchain.name,
    });
    res.status(201).json(blockchain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const blockchain = await blockchainHandler.getServiceById(req.params.id);
    res.status(200).json(blockchain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await blockchainHandler.deleteService(req.params.id);
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
    const blockchain = await blockchainHandler.updateService(
      req.params.id,
      sanitizedBody
    );
    res.status(200).json(blockchain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listServices = async (req, res) => {
  try {
    const blockchains = await blockchainHandler.listServices();
    res.status(200).json(blockchains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
