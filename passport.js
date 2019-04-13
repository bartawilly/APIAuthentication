const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const {JWT_SECRET} = require('./config');
const User = require('./models/user');
const localStrategy = require('passport-local').Strategy;


// JWT Strategy
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) =>{
    try{
        const user = await User.findById(payload.sub);

        if(!user){
            return(null, false);
        }
        done(null, user);
    }catch (error){
        done(error,false);
    }
})); 

// Local Strategy

passport.use(new localStrategy({
usernameField: 'email'
}, async (email, password, done) => {

    try{

        const user = await User.findOne({email:email});

        if(!user){
            return done(null, false);
        }
    
        const isMatch = await user.isValidPassword(password);
        if(!isMatch){
            done(null, false);
        }
        done(null, user);
    

    }catch(error){
        done(error, false);
    }
  
}));