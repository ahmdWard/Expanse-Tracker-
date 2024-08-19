
const fs = require('fs')
const path= require('path')
const {Command} =require('commander')

const program = new Command();


const dataPath = path.join(__dirname, 'data.json');

function readData(){
    if(!fs.existsSync(dataPath))
       return []
   
   const data= JSON.parse(fs.readFileSync(dataPath,'utf-8'))
   return data
}
function writeData(data){

   fs.writeFileSync(dataPath,JSON.stringify(data),'utf-8')
}


function addExpanse(options){
    const data =readData()
     const newExpanse= {
        id:data.length+1,
        date:new Date().toISOString().split('T')[0],
        description:options.description,
        amount:parseFloat(options.amount)
     }
     data.push(newExpanse)
     writeData(data)
 }

 function listExpanse(){
      

    const data =readData()

    if(!data.length)
         console.log('no expanse found')
    else{
        console.log(" ID    Date            Description         Amount")
        data.forEach(el => {
            console.log(` ${el.Id}   ${el.date}        ${el.description}                ${el.amount}`)
        });
    }
 }


program
.command('add')
.description('add a new decription')
.requiredOption('--description <desc> ','Description of the expense')
.requiredOption('--amount <amount>','Amount of the expense')
.action(addExpanse)

program
.command('list')
.description('list all data')
.action(listExpanse)

program
.command('summary')
.description('summury all data')
.action(()=>{
    const data= readData()
    const total= data.reduce((a,b) =>
        a+b.amount
    ,0);
    console.log(total)
})

program
.command('delete')
.description('delete  specific data')
.requiredOption('--id <id>','Id which will delete')
.action((options)=>{
    console.log(options.id)
    const data= readData()
    const newList= data.filter(x=>{
    return x.Id!=options.id
    })
    if (newList.length === data.length) {
        console.log('No expense found with the given ID.');
    } else {
        console.log('Deleted successfully.');
    }
    writeData(newList)
   
})
program
.command('summary-month')
.description('summary of this month')
.requiredOption('--month <date>','the summary of the month')
.action((options)=>{
    console.log(options.month)
    const data= readData()
    const filteredList= data.filter(x=>{
      return Number(x.date.slice(5,7))==Number(options.month)
    })
    const total = filteredList.reduce((a,b)=>a+b.amount,0)
    console.log(total)
})

program.parse(process.argv);
