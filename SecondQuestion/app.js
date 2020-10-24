const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;


app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

let user = []; 
let flag = 1;



function saveData() {
    const filename = "data.json";
    const jsonData = JSON.stringify(user);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}

function readData() {
    const filename = "data.json"; 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    user = JSON.parse(jsonContent);
}




app.get("/user/:id", (req, res) => {
    const userid = req.params.id;
    if (user.length == 0) {
        readData();
    }
    let foundRec = user.find((e) => e.userId == userid);
    if (foundRec == null)
        throw "User Not Found!!";
    res.send(JSON.stringify(foundRec))
})

app.put("/user", (req, res) => {
    if (user.length == 0)
        readData(); 
    let body = req.body;
   
    for (let index = 0; index < user.length; index++) {
        let element = user[index];
        if (element.userId == body.userId) { 
            element.userName = body.userName;
            element.userPhone = body.userPhone;
            element.userEmail = body.userEmail;
            element.userCity = body.userCity;
            saveData();
            res.send("User Details Updated Successfully!!!");
        }
    }
   
})

app.post('/user', (req, res) => {
    if (user.length == 0)
        readData(); 
    let body = req.body; 



    for (let index = 0; index < user.length; index++) {
        let element = user[index];
        if (element.userName == body.userName) { 
            res.send("User Name Already Exists!!");
            flag = 0;
        }

    }


    if (flag >= 1) {
        user.push(body);
        saveData(); 
        res.send("User Added Successfully!!");
    }

})

app.listen(1234, () => {
    console.log("Server is Running at 1234");
})