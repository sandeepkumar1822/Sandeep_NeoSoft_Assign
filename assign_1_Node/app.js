var http = require('http');
var fs = require('fs');
const e = require('express');
http.createServer( (req, res)=> {
  //Open a file on the server and return its content:
  if(req.url=="/"){
    res.writeHead(200,{'Content-Type':'text/html'})
    let data=fs.readFileSync('./index.html');//reading the file 
    res.write(`${data}`)//writting the file 
    res.end();
   

  }
  else if(req.url=="/createfile"){
    if(fs.existsSync("newfile.txt")){
      // res.writable(`<html><body>Home</body</html>`)
      
      res.end("Already Exists!");
      
    }
    else{
      fs.writeFile('newfile.txt','This is content of the txt file',(err)=>{
        if(err) throw err;
        else res.write('file created successfully')
        res.end();
      })
    }
  }else if(req.url=="/readfile"){
    if(fs.existsSync("newfile.txt")){
      let data=fs.readFileSync("newfile.txt")
      res.write(data.toString());
      res.end();
    }else{
      res.write("file not created ");
      res.end();
    }

  }else if(req.url=="/appenddata"){
  if(fs.existsSync("newfile.txt")){
    fs.appendFileSync("newfile.txt","this is content to be appended ",'utf-8')
    res.write("Content successfully appended !");
    res.end();

  }else{
    res.write("file not found !!! Please create file and try again")
    res.end();

  }
  }else if(req.url=="/deletefile"){
    if(fs.existsSync("newfile.txt")){
      fs.unlinkSync("newfile.txt")
        res.write('file deleted successfully !');
        res.end();
      }else{
        res.write("file not found !");
        res.end();
      }
 }else{
  res.write("Page not found !");
  res.end();
}
  
}).listen(8080,(err)=>{
  if(err) throw err;
  else console.log('server is running on port 8080');
  

})