
const fs = require('fs')
const path= require('path')
const {Command} =require('commander')

const program = new Command();


const dataPath = path.join(__dirname, 'data.json');
const csvPath = path.join(__dirname, 'data.csv');
function readData(){
    if(!fs.existsSync(dataPath))
       return []
   
   const data= JSON.parse(fs.readFileSync(dataPath,'utf-8'))
   return data
}
function writeData(data){

   fs.writeFileSync(dataPath,JSON.stringify(data),'utf-8')
}

function writeCvs(){
    const data=readData()
    const headers=Object.keys(data[0])
    const cvsRows=[headers.join(',')]
    data.forEach(row => {
        const values = headers.map(header => JSON.stringify(row[header] || ""));
        cvsRows.push(values.join(','));
    });
    fs.writeFileSync(csvPath,cvsRows.join("\r\n"),'utf-8')

}
function exportToCsv() {
    const data = readData();
    if (data.length === 0) {
        console.log('No data available to export.');
        return;
    }

    writeCvs(data);
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
        category:options.category,
        amount:parseFloat(options.amount),
     }
     console.log(newExpanse)
     data.push(newExpanse)
     total =data.reduce((a,b) =>
        a+b.amount
    ,0);
    if(total>1500)
        console.log("you exceeds the budget")
    else{
        writeData(data)
    }
 }

 function listExpanse(){

    const data =readData()

    if(!data.length)
         console.log('no expanse found')
    else{
        console.log(" ID    Date            Description        Categery       Amount")
        data.forEach(el => {
            console.log(` ${el.id}   ${el.date}        ${el.description}        ${el.category}               ${el.amount}`)
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

function getSummaryBasedOnCat(options){

  const data = readData()

  if(!data.some(el=>el.category==options.category)){
    console.log("there isn't category with this name in your expanse")
    return
  }

  const filterList= data.filter(el=>{
    return el.category==options.category
  })
  const total = filterList.reduce((a,b)=> a+b.amount,0)
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
        if(options.category!=undefined)
            el.category=options.category
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
.requiredOption('--category <cat>','category of expanse')
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
.command('summary-category')
.description('summary all of the category')
.requiredOption('--category <cat>','the category of the expanses')
.action(getSummaryBasedOnCat)

program
.command('update')
.description('update the expanse')
.option('--id <id>' , 'getting id of the expanse')
.option('--description <desc>' , 'updating discription')
.option('--category <cat>','updating the cat exspance')
.option('--amount <amount>','updating the amount exspance')
.action(updateExpanse)

program
    .command('export-csv')
    .description('Export JSON data to CSV')
    .action(exportToCsv);


program.parse(process.argv);
