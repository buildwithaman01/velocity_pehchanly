const { validationResult, body } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: errors.array()[0].msg, // Return the first error message
            errors: errors.array() 
        });
    }
    next();
};

const loginRules = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

const registerRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
];

const serviceRules = [
    body('name').notEmpty().withMessage('Service name is required'),
    body('description').isLength({ max: 500 }).withMessage('Description too long'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('category').isIn(['Web', 'SEO', 'GMB', 'Branding', 'Social']).withMessage('Invalid category'),
    body('techStack').isArray().withMessage('Tech stack must be an array')
];

const leadRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').notEmpty().withMessage('Message is required')
];

module.exports = {
    validate,
    loginRules,
    registerRules,
    serviceRules,
    leadRules
};
