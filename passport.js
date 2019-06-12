const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const {JWT_SECRET} = require('./config');
const User = require('./models/user');
const localStrategy = require('passport-local').Strategy;
const authorization= require('./helpers/authorization');

// JWT Strategy
passport.use(new JWTStrategy({
    jwtFromRequest: authorization.cookieTokenExtractor,
    secretOrKey: JWT_SECRET
}, async (payload, done) =>{
    try{
        const user = await User.findById(payload.sub);

        if(!user){
            return done(null, false);
        }
        return done(null, user);
    }catch (error){
        return done(error,false);
    }
})); 
// Admin Strategy
passport.use('admin', new JWTStrategy({
    jwtFromRequest: authorization.cookieTokenExtractor,
    secretOrKey: JWT_SECRET
}, async (payload, done) =>{
    try{
        const user = await User.findById(payload.sub);
        
        if(!user){
            return done(null, false);
        }
        var isAdmin = await user.isAdmin(payload.sub);
        if(!isAdmin){
            return done(null, false);
        }
        return done(null, user);
    }catch (error){
        return done(error,false);
    }
})); 

// Local Strategy

passport.use('local-login',new localStrategy({
usernameField: 'email',
passReqToCallback : true
}, async (req, email, password, done) => {

    try{

        const user = await User.findOne({email:email});

        if(!user){
            return done(null, false, req.flash('message','Email or Password is incorrect!'));
        }
    
        const isMatch = await user.isValidPassword(password);
        if(!isMatch){
            return  done(null, false, req.flash('message','Email or Password is incorrect!'));
        }
        return done(null, user);
    

    }catch(error){
        return  done(error, false, req.flash('message','Email or Password is incorrect!'));
    }
  
}));