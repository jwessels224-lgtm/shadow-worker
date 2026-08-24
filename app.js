const express = require('express');
const app = express();
app.use(express.json());
app.get('/', (req,res)=> res.send('Shadow Worker Live'));
app.get('/webhook', (req,res)=>{
  if(req.query['hub.verify_token']==='shadow123'){
    return res.send(req.query['hub.challenge']);
  }
  res.sendStatus(403);
});
app.post('/webhook', (req,res)=>{
  console.log(JSON.stringify(req.body,null,2));
  res.sendStatus(200);
});
app.listen(process.env.PORT||10000, ()=>console.log('live'));
