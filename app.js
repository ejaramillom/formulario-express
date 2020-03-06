const express = require( "express" );
const mongoose = require( "mongoose" );
const bodyParser = require( "body-parser" );
const app = express();

mongoose.connect( process.env.MONGODB_URL || "mongodb://localhost:27017/userOne", { useNewUrlParser: true });
mongoose.connection.on( "error", function( e ) { console.error( e ); });
// definimos el schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
// definimos el modelo
const User = mongoose.model( "User", userSchema );
// definir las rutas app
app.set( "view engine", "pug" );
app.set( "views", "views" );
app.use( bodyParser.urlencoded({ extended: false }));
app.get( "/", async function( req, res ){
  let registeredUsers = await User.find();
    res.render( "index", {
     registeredUsers: registeredUsers
  });
});

app.get( "/register", async function(req, res){
  res.render( "register" );
});
app.post( "/register" ,async function(req, res){
  var name= req.body.name;
  var email= req.body.email;
  var password= req.body.password;
  user = await User.create({ name: name, email: email, password: password });
  user.save();
  res.redirect('/');
});

app.listen(3000, () => console.log( "Listening on port 3000!" ));
