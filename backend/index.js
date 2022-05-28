let express =require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./database/db');


const tokenserver = require("./config/tokenserver.json");

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');



//express route

let numerSchema = require('./models/Numer')

//connect mongodb
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db,{
    useNewUrlParser: true
}).then(()=>{
    console.log('connected Success');
},
    error =>{
        console.log('not connect to db:'+error);
    }
)

const app =express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors());


app.post('/numers/show-numer',(req, res)=> {
    numerSchema.find((error, data)=>{
        const tokencli = req.body.tokenclient;
        console.log(tokencli);
        console.log(tokenserver.tokenserver);
        if (tokencli == tokenserver.tokenserver) {
          console.log(data);
          return res.json(data);;
        }
        return res.sendStatus(401);
    })
})


//port 4000
const port = process.env.PORT || 4000;
const server = app.listen(port, ()=>{
    console.log('conect to server port '+ port)
})



const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "9.9.9",
        title: "แสดงสมการ",
        contact: {
          name: "Peerapol Hanwattanachai"
        },
        servers: ["http://localhost:4000"]
      }
    },
    // ['.routes/*.js']
    apis: ["index.js"]
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api_doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
/**
 * @swagger
 * /numers/show-numer:
 *  post:
 *    parameters:
 *      - name: tokenclient
 *        in: formData
 *        required: true
 *        description: access token key
 *    responses:
 *      '200':
 *        description: success
 */
//error handler
app.use(function(err,req,res,next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode =500;
    res.status(err.statusCode).send(err.message);
})
