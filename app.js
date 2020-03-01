const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/dbfive', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });
// definimos el schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
// definimos el modelo
const User = mongoose.model("User", userSchema);
// definir las rutas app
app.set('view engine', 'pug');
app.set('views', 'views');
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function(req, res){
  res.render('index');
});
app.get('/register', function(req, res){
  res.render('index');
});
app.post('/register', function(req, res){
  var nombre= req.body.nombre;
  var nombre= req.body.email;
  res.send('<h1> Hola ' + nombre + '!</h1>');
});

app.listen(3000, () => console.log('Listening on port 3000!'));
