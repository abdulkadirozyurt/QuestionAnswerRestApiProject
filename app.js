import express from "express";

const app = express();

const PORT = 5000 || process.env.PORT;


app.get("/",(req,res)=>{
    res.send("merhaba express")
})



app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT}`);
});
