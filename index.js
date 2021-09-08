const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	database:'join_us',
});

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json({extended:true}));
app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) => {
	const q = 'SELECT COUNT(*) as count FROM users';
	
	 connection.query(q,(err, results)=>{
		if(err) throw err;
		 var count = results[0].count;
		console.log(count);
		res.render('home',{data:count});
	});  
});

app.post('/register',(req,res)=>{
	const person = {
		email:req.body.email,
	};
	connection.query('INSERT INTO users SET ?',person,(err,results)=>{
		if(err) throw err;
		console.log(results);
	});
	res.redirect('/');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
