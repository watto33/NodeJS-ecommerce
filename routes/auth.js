const express = require('express');
const { check, body } = require('express-validator');

const User = require('../models/user');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
	'/login',
	check('email')
		.isEmail()
		.normalizeEmail()
		.withMessage('Please enter a valid email')
		.custom((value, { req }) => {
			return User.findOne({ email: value }).then(user => {
				if (!user) {
					return Promise.reject(
						'The Email is not registered.Please SignUp first'
					);
				}
			});
		}),
	authController.postLogin
);

router.post(
	'/signup',
	[
		check('email')
			.isEmail()
			.withMessage('Please enter a valid email address')
			.custom((value, { req }) => {
				return User.findOne({ email: value }).then(userDoc => {
					if (userDoc) {
						return Promise.reject(
							'The email already exists. Please login or Signup using a different email'
						);
					}
				});
			})
			.normalizeEmail(),
		body('password', 'Please enter minimum 6 characters of password').isLength({
			min: 6,
		}),
		body('confirmPassword').custom((value, { req }) => {
			if (value !== req.body.password)
				throw new Error("Password and Confirm Password doesn't match");
			return true;
		}),
	],
	authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
