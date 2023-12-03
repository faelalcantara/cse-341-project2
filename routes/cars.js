const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const carsController = require('../controllers/cars');

// Middleware to validate POST and PUT
const validateCarData = [
  body('make').notEmpty().withMessage('Make is required.'),
  body('model').notEmpty().withMessage('Model is required.'),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Type a valid year.'),
  body('hp').isInt({ min: 1 }).withMessage('HP need to be greater than 0.'),
  body('color').notEmpty().withMessage('Color is required.'),
  body('consumption').isNumeric({ min: 0 }).withMessage('Consumption should not be a negative number.'),
  body('autonomy').isNumeric({ min: 0 }).withMessage('Autonomy should not be a negative number.'),
];

// Middleware to validade GET and DELETE
const validateCarId = [
  param('id').isMongoId().withMessage('Id is invalid.'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/', carsController.getAll);

router.get('/:id', [...validateCarId, handleValidationErrors], carsController.getSingle);

router.post('/', [...validateCarData, handleValidationErrors], carsController.createCar);

router.put('/:id', [...validateCarId, ...validateCarData, handleValidationErrors], carsController.updateCar);

router.delete('/:id', [...validateCarId, handleValidationErrors], carsController.deleteCar);


module.exports = router;