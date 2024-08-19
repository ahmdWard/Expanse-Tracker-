
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
        Id:data.length+1,
        date:new Date().toISOString().split('T')[0],
        description:options.description,
        amount:parseFloat(options.amount)
     }
     data.push(newExpanse)
     writeData(data)
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

.action(addExpanse)

// program.parse(process.argv);
