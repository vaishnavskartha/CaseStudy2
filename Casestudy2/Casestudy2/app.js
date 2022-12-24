// Task1: initiate app and run server at 3000
var Express=require("express");
var Bodyparser=require("body-parser");
var Mongoose=require("mongoose");
var Cors=require("cors");

const { EmployeeModel } = require("./model/employee");

var app= new Express();

app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}));

app.listen(3000,()=>{
    console.log("Server started listening");
})

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
Mongoose.connect("mongodb+srv://Vaishnav_S_Kartha:Vishnu14061996@cluster0.zjmnu1k.mongodb.net/EmployeeDB?retryWrites=true&w=majority",{ useNewUrlParser: true });

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',(req,res)=>{
    EmployeeModel.find(
       (err,data)=>{
           if(err){
               res.json({"Status":"Error","Error":err});
           }
           else{
               res.json(data);
           }
       }
   )
})



//TODO: get single data from db  using api '/api/employeelist/:id'
app.post('/api/employeelist/:id',(req,res)=>{
    var id=req.params.id;
    EmployeeModel.find({"_id":id},
        (err,data)=>{
            if(err){
                res.json({"Status":"Error","Error":err});
            }
            else{
                res.json(data);
            }
        }
    )
})




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    var data=req.body;
    var employee = new EmployeeModel(data);
    await employee.save((err,data)=>{
        if(err){
            res.json({"Status":"Error","Error":err});
        }
        else{
            res.json({"Status":"Success","Data":data});
        }
    });
    console.log(data);
    
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',(req,res)=>{
    var id=req.params.id;
    var data = req.body;
    EmployeeModel.findOneAndDelete(
        {"_id":id},data,(err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json({"Status":"Deleted","Data":data})
            }
        }
    )
})



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',(req,res)=>{
    var name = req.body.name;
    var data = req.body;
    EmployeeModel.findOneAndUpdate(
        {"name":name},data,(err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json({"Status":"Updated","Data":data})
            }
        }
    )
})



//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



