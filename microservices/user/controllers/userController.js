const userHandler = require("../handlers/userHandler");
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
    const user = await userHandler.createService(sanitizedBody);
    await sendMessage("user_created", {
      id: user._id,
      name: user.name,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const user = await userHandler.getServiceById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await userHandler.deleteService(req.params.id);
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
    const user = await userHandler.updateService(
      req.params.id,
      sanitizedBody
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listServices = async (req, res) => {
  try {
    const users = await userHandler.listServices();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
