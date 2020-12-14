const mongoose = require('mongoose');
const Substance = require("./../models/substance");
require ("dotenv").config()
const substances = require('./substances-mock-data');

mongoose
  .connect(process.env.MONGODB_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
  })
  .then( (x) => { 
      console.log(`Connected to database`)
      
      const pr = x.connection.dropDatabase();
      return pr;    
    })
    .then(() =>{

        const pr = Substance.create(substances);
        return pr;
    })
    .then (()=>{
        mongoose.connection.close();
    })

    //to run this: node ./bin/seed.js