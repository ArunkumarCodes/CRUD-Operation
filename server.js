var sql = require('mssql/msnodesqlv8');
var express = require('express');
const {response} = require('express');
const bodyParser = require("body-parser");
var app = express();
const ejs = require('ejs');
const path = require('path');
const { rows } = require('mssql/msnodesqlv8');

// Database Connecting
var config = {
    user: 'sa',
    password: 'arunkumar',
    database: 'Company',
    server:'MADHU\\SQLEXPRESS',
    driver: 'msnodesqlv8',   
    options: {
        trustedConnection:true
    }
};
sql.connect(config, function(err){
    if (err){
    console.log(err);
    }else{ 
    console.log("Connection is successful");
    }
})

// app.set('views',path.join(__dirname,'./views'));
//  app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Server Port
app.listen(5000, function(err){
    if(!err)
    console.log("Server is running");
    else
    console.log(err);
});

// Home Page
app.get('/', (request, response)=>{
    response.sendFile(path.join(__dirname+"/index.html"));
});
// app.get('/', function(request, response){
//     // response.sendFile(path.join(__dirname+"./views/index.html"));
//     var sqlserver = 'SELECT *FROM EMPLOYEE';
//     sql.query(sqlserver, (err, data, fields)=>{
//         if(err) throw err;
//         console.log(data);
//        response.render('/', {title: 'CRUD Operation Node.js', userData: data});
  
//     });
// });

// Add Employee Details in Database
app.get('/views/addEmp.html',(request,response) =>{
    response.sendFile(path.join(__dirname+'/views/addEmp.html'));
})
app.post('/views/addEmp.html', function(req,res, next){
    var empid = req.body.empid;
    var empName = req.body.empName;
    var designation = req.body.designation;
    var salary = req.body.salary;
    var deptId = req.body.deptId;
    var mgrID = req.body.mgrID;
    var sqlserver= `INSERT INTO employee VALUES('${empid}', '${empName}', '${designation}','${salary}','${deptId}','${mgrID}')`;
    sql.query(sqlserver, function(err, result){
        if(err) throw err;
        console.log("record inserted");
        // alert("Record Inserted..");
        res.redirect('/');
    });
});

// Update Employee Details in Database
app.get('/views/updateEmp.html',(request,response) =>{
    response.sendFile(path.join(__dirname+'/views/updateEmp.html'));
});
app.post('/views/updateEmp.html', function(req, res, next) {
    var empid = req.body.empid;
    var empName = req.body.empName;
    var designation = req.body.designation;
    var salary = req.body.salary;
    var deptId = req.body.deptId;
    var mgrID = req.body.mgrID;
    var sqlserver = `UPDATE employee SET EmpName='${empName}', Designation='${designation}',Salary='${salary}',DeptId='${deptId}', ManagerID='${mgrID}' WHERE EmpId=${empid}`;
  
    sql.query(sqlserver, function(err, result) {
      if (err) throw err;
      console.log('record updated!');
      res.redirect('/');
    });
  });

  // Delete Employee Details in Database
app.get('/views/deleteEmp.html',(request,response) =>{
    response.sendFile(path.join(__dirname+'/views/deleteEmp.html'));
});
app.post('/views/deleteEmp.html', function(req, res){
    var empid = req.body.empid;
    console.log(empid);
    var sqlserver = `DELETE FROM employee WHERE EmpId=${empid}`;
  
    sql.query(sqlserver, function(err, result) {
      if (err) throw err;
      console.log('record deleted!');
      res.redirect('/');
    });
  });

//   // Read Table Database
// // app.set('view engine', 'ejs');
// app.get('/views/readEmp.html',(request, response, next)=>
// {
//     response.sendFile(path.join(__dirname+'/views/readEmp.html'));
//     var req= new sql.Request();
//         req.query('select * from employee', function(recordset, err) {
//             if(err) throw err;
//             console.log('records...')
//             // res.json(employee)
//             response.render('readEmp', recordset)

//             // response.render('employee', {title: 'employee', employee: rows});
//         })
// });

module.exports=app;