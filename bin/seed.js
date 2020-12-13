const mongoose = require('mongoose');
const Substance = require("./../models/substance");

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
    .then ((createdSubstances)=>{
        console.log(`Created ${createdSubstances.length} substances`)
        mongoose.connection.close();
    })

    //to run this: node ./bin/seed.js