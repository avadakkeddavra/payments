const Joi = require('joi');

const LoginSchema = Joi.object().keys({
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email().required()
});

const RegisterSchema = Joi.object().keys({
	username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().min(6),
    email: Joi.string().email()
});

const CreateSchema = Joi.object().keys({
	username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email(),
    role_id: Joi.number().min(1).max(3),
});

const EditSchema = Joi.object().keys({
	role_id: Joi.number().min(1).max(3),
	username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email()
});

const ChangePasswordSchema = Joi.object().keys({
	old: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().min(6),
	new: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().min(6),
    repeat: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().min(6),
});

module.exports = {
	login: LoginSchema,
	register: RegisterSchema,
	create: CreateSchema,
	edit: EditSchema,
	changePassword: ChangePasswordSchema
}