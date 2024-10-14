import express from "express";
import bodyParser  from "body-parser";
import { dirname } from "path"
import { fileURLToPath } from "url"
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express();
 const port=8080;
 
   app.use(bodyParser.urlencoded({extended:true}));
   app.use(express.static("public"));

   app.get('/',(req,res)=>{
      res.render("index.ejs");
    });
    app.post("/Weather", async (req,res)=>{
     var cityName=req.body["city"];
         let apiKey = "YOURS-API-KEY" // replace with your api key
           let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
              let resp = await fetch(url)
              let data = await resp.json();
              console.log(data);
              
              if(data.main){
                var temp=Math.round(data.main.temp-273);
                res.render("submit.ejs",{temperature:temp,main:data.weather[0].main,humidity:data.main.humidity,speed:data.wind.speed ,description:data.weather[0].description ,Name:data.name})
              }else{
                res.render("notfound.ejs",{temperature:null,Name:cityName})
              }

    })
    app.listen( port ,()=>{
            console.log(`Server is runnng on port ${port}`);
        })
    
    

