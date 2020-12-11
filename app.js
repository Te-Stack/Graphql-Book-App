const express = require("express")
const {graphqlHTTP} = require("express-graphql")
const schema = require("./schema/shema")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")




const app = express();


//activating the dotenv package
dotenv.config()

//connect to mlab database
//make sure to replace my db string & creds with your own
mongoose.connect(process.env.DATABASE_ACCESS,{ useUnifiedTopology: true },()=>{
    console.log("database connected")
})

//middleware
app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}))


//allow cross-origin requests
app.use(cors())

const port = process.env.PORT || 4000



//serve static assets if in production
if(process.env.NODE_ENV === "production"){
    //set static folder
    app.use(express.static("client/build"))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}


app.listen(port,()=>{
    console.log(`now listening for request on port${port}`)
})