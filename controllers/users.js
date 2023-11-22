
const User = require('../models/user');

module.exports.create = async function(req,res){
    // console.log(req.body);
    if(req.body.password != req.body.confirm_password){

        return res.redirect('back');

    }
    let user = await User.findOne({email:req.body.email});

    if(!user){
        await User.create(req.body);

        return res.redirect('/');
    }

    return res.redirect('back');
}

module.exports.createSession = async function(req,res){
        console.log(req.body);
        let user = await User.findOne({email:req.body.email});
        console.log("yes this is the user",user);
        if(user){
            console.log(user.password,"user password",req.body.password);
            //handle password which doesn't match
            if(user.password != req.body.password){
                console.log("fucking here");
                return res.redirect('back');
            }
            //handle session creatin
            //i have set the cookie 
            res.cookie('user_id',user.id);
            
            return res.redirect('/users/profile');
        }else{
            //handle user not found
            console.log("here i am");
            return res.redirect('back');
        }

}

module.exports.profile = async function(req,res){
    
    if(req.cookies.user_id){
        let user = await User.findById(req.cookies.user_id);
        if(user){
            console.log('yaha pr dekh bhai',user);
            return res.render('userProfile',{
                user:user
            })
        }
    }
    return res.redirect('/');
}