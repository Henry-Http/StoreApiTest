const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to server")
    
})

app.listen(3000, ()=> {
  console.log("HoD's Api is running...");
});
