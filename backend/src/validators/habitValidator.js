
import {body, validationResult} from 'express-validator'

export const habitRules = [
  body('name')
  .notEmpty()
  .isString()
  .trim()
  .withMessage('Name is required and must be a string'),

  body('frequency')
  .notEmpty()
  .isIn(['daily', 'weekly', 'monthly'])
  .withMessage('Frequency is required and must be one of: daily, weekly, monthly'),

  body('completions')
  .optional()
  .isArray()
  .withMessage('Completions must be an array of dates'),
]

export const handlehabitValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

