const mongoose = require('mongoose');

async function connect(){
    const mongoUrl = "mongodb+srv://chettinad:chettinad@cluster0.jssug.mongodb.net/chettinad?retryWrites=true&w=majority";
    try{
    await mongoose.connect(mongoUrl, { useNewUrlParser: true });
    }
    catch(e){
        console.error(`Error to connect ${mongoUrl}`)
        console.error(e);
    }
}
// 

module.exports = { connect}