const express = require('express');
const qr_code = require('qrcode');
const app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function(req, res){
	res.render('index',{QR_code:''});
});

app.post('/', function(req, res){
	const url = req.body.url;
	console.log(req.body);
	if(url){
		qr_code.toDataURL(url, function(err, src){
			if(err){res.send(err); console.log(err);}
			var file_path = "store/"+ Date.now() +".png";
			qr_code.toFile(file_path,url, {
			  color: {
			    dark: '#000',  // Black dots
			    light: '#0000' // Transparent background
			  }
			});
			res.render('index',{QR_code:src,img_src:file_path}); 
		});

	}else{
		res.send('URL Not Set!');
	}
});

app.get('/download',function(req,res){
	res.download(req.query.file_path);
})

app.listen(3000,function(){
	console.log('Server listing on 3000');
});

