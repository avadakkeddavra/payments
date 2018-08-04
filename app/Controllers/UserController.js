const GlobalModel = require('./../Models/index');
/*
 	MODELS
*/
const User = GlobalModel.users;
const Role = GlobalModel.user_roles;
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


class UserController {

	create(Request, Response) {
		const $this = this;
		Joi.validate(Request.body, UserSchemas.create, function(Error, Data) {
			if(!Error) {
				let password = $this.generatePassword(10);
				let hash = bcrypt.hashSync( password, Number(process.env.SALT_ROUNDS));
				let UserData = Data;
				UserData.password = hash;

				User.create(UserData).then( user => {

					Response.mailer.send('send_password', {
						    to: user.email,
						    subject: 'Test Email',
						    password: password,
					}, function (err) { 
						if (err) {
						      console.log(err);
						      Response.send({success:false,error:err});
						      return;
						}
					});

					Response.send(user);

				}).catch( Error => {
					Response.status(400);
					Response.send({success: false, error: Error});
				})

			} else {
				Response.send({success: false, error: Error});
			}
		})
	}

	edit(Request, Response) {
		Joi.validate(Request.body, UserSchemas.edit, async function(Error, Data) {
			if(!Error) {
				let user = await User.findById(Request.params.id);

				user.update(Data)
				.then( user => {
					Response.send({success:true, data: user});
				})
				.catch( Error => {
					Response.status(400);
					Response.send({success: false, error: Error});
				});

				

			} else {
				Response.status(400);
				Response.send({success: false, error: Error});
			}
		})
	}

	delete(Request, Response) {

		if(Request.auth.id == Request.params.id) {
			Response.send({success: false, error: 'You can not delete yourself'});
			return;
		}

		User.findById(Request.params.id, {}).then( user => {
			if( user ) {
				user.destroy();
				Response.send({success:true, data: user});	
			} else {
				Response.send({success: false, error: 'Did find the user'})
			}
			
		});

	}

	changePassword(Request, Response) {
		Joi.validate(Request.body, UserSchemas.changePassword, function(Error, Data) {
			if(!Error) {
				User.findById(Request.auth.id, {}).then( async user => {
					
					let oldPassword = await bcrypt.compare(Data.old, user.password);

					if(oldPassword) {

						if(Data.new === Data.repeat) {
							user.update({
								password: bcrypt.hashSync(Data.new, Number(process.env.SALT_ROUNDS)) 
							})
							.then( user => {
								Response.send({success: true, data: 'Password successfully updated'});
							})
							.catch( Error => {
								Response.status(400);
								Response.send({success: false, error: Error});
							});
						} else {
							Response.send({success: false, error: 'New password and repeat does not match'})
						}
						
					} else {
						Response.send({success: false, error: 'Wrong password'})
					}

				}).catch( Error => {
					Response.status(400);
					Response.send({success: false, error: Error});
				});
			} else {
				Response.status(400);
				Response.send({success: false, error: Error});
			}
		})
	}

	generatePassword(count) {
	  var text = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	  for (var i = 0; i < count; i++)
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

	  return text;
	}


	getAll(Request, Response) {

		Joi.validate(Request.body, UserSchemas.filter, function(Error, Data) {


			if(!Error) {
				
				const QueryObject = {
					 order: [],
					 where: Data,
					 limit: Data.limit ? Data.limit : 10,
					 offset: 0, 
					 method: Data.method ? Data.method : 'DESC'
				};

				if( 'orderBy' in Data ) {			
					
					QueryObject.order.push([Data.orderBy, QueryObject.method]); 
				
				} else {
					delete QueryObject.order
				}

				if('page' in Data && Data.page > 1) {
					QueryObject.offset = (Data.page-1)*QueryObject.limit;
				}			
			
				delete QueryObject.where.limit;
				delete QueryObject.where.method;
				delete QueryObject.where.orderBy;
				delete QueryObject.where.page;

				User.findAll(QueryObject).then( users => {
					Response.send({success: true, data: users});
				})
			} else {
				Response.send({success: false, data: Error});
			}


		});

	}
}



module.exports = new UserController();