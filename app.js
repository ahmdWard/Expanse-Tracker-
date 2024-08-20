
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
    if(options.amount<0){
        console.error("you can't enter negative data in expanse amount")
        return
    }
     const newExpanse= {
        id: data.length > 0 ? Math.max(...data.map(el=>el.id))+1 : 1,
        date:new Date().toISOString().split('T')[0],
        description:options.description,
        amount:parseFloat(options.amount)
     }
     console.log(newExpanse)
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

function getSummary(){
    const data= readData()
    const total= data.reduce((a,b) =>
        a+b.amount
    ,0);
    console.log(total)
}

function deleteExpanse(options){
    const data= readData()
    const newList= data.filter(x=>{
    return x.id!=options.id
    })
    if (newList.length === data.length) {
        console.log('No expense found with the given ID.');
    } else {
        console.log('Deleted successfully.');
    }
    writeData(newList)
}

function getSummaryOfSpecificMonth(options)
{

    if( options.month>12 || options.month<=0){
         console.log("unvalid month please enter between 1-12")
         return
    }
    const data= readData()

    const filteredList= data.filter(x=>{
      return new Date(x.date).getMonth()+1==Number(options.month)
    })
    const total = filteredList.reduce((a,b)=>a+b.amount,0)
    console.log(total)
}

function updateExpanse(options){

   const data = readData()
   

   if(!data.some(el=>el.id==options.id)){
    console.log('this id not exist')
    return
   }

   data.forEach(el=>{
    if(options.id==el.id){
        if(options.description!=undefined)
             el.description=options.description
        if(options.amount!=undefined&&!isNaN(options.amount))
            el.amount=parseFloat(options.amount)
    }
   })
   console.log(data)
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
.action(listExpanse)

program
.command('summary')
.description('summury all data')
.action(getSummary)

program
.command('delete')
.description('delete  specific data')
.requiredOption('--id <id>','Id which will delete')
.action(deleteExpanse)


program
.command('summary-month')
.description('summary of this month')
.requiredOption('--month <date>','the summary of the month')
.action(getSummaryOfSpecificMonth)


program
.command('update')
.description('update the expanse')
.option('--id <id>' , 'getting id of the expanse')
.option('--description <desc>' , 'updating discription')
.option('--amount <amount>','updating the amount exspance')
.action(updateExpanse)



program.parse(process.argv);
