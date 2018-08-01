const GlobalModel = require('./../Models/index');
/*
 	MODELS
*/
const User = GlobalModel.users;
const Role = GlobalModel.user_roles;
const HttpRequest = require('request-promise');
/*
	VALIDATORS
*/
const UserSchemas = require('./../Validators/UserSchema');
const Joi = require('joi');

/*
	JWT AND LIBS
*/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');


class AuthController {

	login(Request,Response) {

		Joi.validate(Request.body,UserSchemas.login,function(Error,Data){
			if(!Error)
			{
				User.findOne({
					where:{
						email:Data.email
					},
					include:[Role]
				})
				.then( async user => {

					let verified = await bcrypt.compare(Request.body.password, user.password);
 
					if(verified)
					{
						var token = jwt.sign({
							username:user.username,
							id:user.id, 
							email:user.email,
						},process.env.JWT_KEY);

						delete user.dataValues.password; 

						Response.send({success:true, token: token, user: user});
						
					}else{
						Response.status(400);
						Response.send({success:false,error:'Invalid password or email'});
					}
					
				})
				.catch( Error => {
					Response.status(400);
					Response.send({success:false,error:Error})
				});
			}else{
				Response.status(400);
				Response.send({success:false,error:Error})
			}
		});

	}

	register(Request, Response) {

		Joi.validate(Request.body,UserSchemas.register,function(Error,Data){
			if(!Error)
			{
				var hash = bcrypt.hashSync(Data.password, Number(process.env.SALT_ROUNDS));

				let UserData = Data;
				UserData.password = hash;

				User.create(UserData).then( user => {

					var token = jwt.sign({
						username:user.name,
						id:user.id,
						email:user.email,
						role_id: user.role_id
					},process.env.JWT_KEY);

					Response.send({success: true,token: token});

				})
				.catch(Error => {
					Response.status(400);
					Response.send({success: false,error: Error});
				});

				

			}else{
				Response.status(400);
				Response.send({success: false,error: Error});
			}
		});

	}
}



module.exports = new AuthController();