const student=[
    {name:"Akshaya",mark:83},
    {name:"kiran",mark:90},
    {name:"Rohit",mark:75},
    {name:"Ramesh",mark:80}
];

const stu = student.find(s => s.name==="kiran");
if(stu){
    console.log(stu.mark);
}
else{
    console.log("Not found")
}
