const globalModel =  require('./../Models/index');
const User = globalModel.users;
const Role = globalModel.user_roles;

const jwt = require('jsonwebtoken');


class AuthMiddleware {
    


    constructor(
        ROLE_ADMIN,
        ROLE_EDITOR,
        ROLE_GUEST
    ) {

        this.ROLE_ADMIN = 1;
        this.ROLE_EDITOR = 2;
        this.ROLE_GUEST = 3;
    }

    auth(request, response, next) {
        if ( !('authorization' in request.headers) ) {
            response.status(400);
            response.send({success:false, message: 'Unauthorized'});
            return;
        } else {

            let token = request.headers.authorization;
            token = token.replace('Bearer ','');

            jwt.verify(token,process.env.JWT_KEY, async function(Error, Decoded) {

                if(!Error) {   
                    User.findOne({
                        where:{
                            username:Decoded.username,
                            email:Decoded.email
                        },
                        include: [Role]
                    }).then( user => {

                        if( user ) {

                            delete user.dataValues.password;
                            request.auth = user;
                            next();
                        } else {
                            response.status(400);
                            response.send({success: false,error: 'There are no such user founded'});
                        }

                    }).catch( Error => {
                        response.status(400);
                        response.send({success: false, error: Error});
                    });


                    
                    

                } else {
                    response.status(400);
                    response.send({success: false, error: Error});
                }
            });
        }
    }

    admin(request, response, next) {

        console.log(this.ROLE_ADMIN);
        if(request.auth && request.auth.role_id == this.ROLE_ADMIN)
        {
            next();
        } else {
            response.status(400);
            response.send({success: false, error: "You are not admin", user: request.auth});
        }
    }

    editor(request, response, next) {

        if(request.auth && request.auth.role_id == this.ROLE_EDITOR)
        {
            next();
        } else {
            response.status(400);
            response.send({success: false, error: "You are not editor", user: request.auth});
        }
    }
    guest(request, response, next) {

        if(request.auth && request.auth.role_id == this.ROLE_GUEST)
        {
            next();
        } else {
            response.status(400);
            response.send({success: false, error: "You are not guest", user: request.auth});
        }
    }

}



// Export auth interceptor handler;
module.exports = new AuthMiddleware();2