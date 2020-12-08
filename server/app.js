const express = require("express")
const {graphqlHTTP} = require("express-graphql")
const schema = require("./schema/shema")
const mongoose = require("mongoose")
const cors = require("cors")



const app = express();

//connect to mlab database
//make sure to replace my db string & creds with your own
mongoose.connect("mongodb+srv://Quincy:Tamaradeyefa@cluster0.jeegb.mongodb.net/Graph0?retryWrites=true&w=majority")
mongoose.connection.once("open",()=>{
    console.log("connected to database")
})

//middleware
app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}))


//allow cross-origin requests
app.use(cors())


//serve static assets if in production
if(process.env.NODE_ENV === "production"){
    //set static folder
    app.use(express.static("client/build"))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}


app.listen(4000,()=>{
    console.log("now listening for request on port 4000")
})