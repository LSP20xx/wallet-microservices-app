const express = require("express");
const userController = require("../controllers/userController");
const { body, param } = require("express-validator");

// Uncomment to enable authentication and authorization middleware
// const { authMiddleware } = require('../common-utils/authMiddleware');
// const { roleMiddleware } = require('../common-utils/roleMiddleware');

const router = express.Router();

// Uncomment to enable role-based authorization for this route
// router.use(authMiddleware);

router.post(
  "/",
  // Uncomment to enable role-based authorization for this route
  // roleMiddleware(['admin', 'user']),
  body("name").isString().notEmpty().trim().escape(),
  body("value").isString().notEmpty().trim().escape(),
  userController.createService
);
router.get(
  "/:id",
  // authMiddleware,
  param("id").isMongoId().trim().escape(),
  userController.getServiceById
);
router.delete(
  "/:id",
  // Uncomment to enable role-based authorization for this route
  // authMiddleware,
  // roleMiddleware(['admin']),
  param("id").isMongoId().trim().escape(),
  userController.deleteService
);
router.put(
  "/:id",
  // Uncomment to enable role-based authorization for this route
  // authMiddleware,
  // roleMiddleware(['admin']),
  param("id").isMongoId().trim().escape(),
  body("name").optional().isString().trim().escape(),
  body("value").optional().isString().trim().escape(),
  userController.updateService
);
router.get("/", userController.listServices);

module.exports = router;
