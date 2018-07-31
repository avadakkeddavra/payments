const Joi = require('joi');

const LoginSchema = Joi.object().keys({
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email().required()
});

const RegisterSchema = Joi.object().keys({
	role_id: Joi.number().min(1).max(3),
	username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().min(6),
    email: Joi.string().email()
});

module.exports = {
	login: LoginSchema,
	register: RegisterSchema
}