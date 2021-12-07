const { response } = require('express');
var express = require('express');
const fsPromise = require('fs/promises');
const path = require('path');
const { constants } = require('fs');
const fs = require('fs')
var router = express.Router();
const lineReader = require('line-reader');
const cfg = require('../config.json');
const { createCanvas } = require("canvas");


const runningDb = {
  status: "idle",
  numlist: [],
  callerIdList: [],
  numberList1:[],
  maxChannels: 0,
  intervalPointer: null,
  callerIdIndex:0,
  waitTime:''

}


/* POST campaign */
router.post('/campaign', async (req, res, next) => {

  console.log('number file' + req.body.number)
  console.log("Inside Campaigns API");
  const resp = {
    "status": "failed",
    "message": "error"
  };

   if (runningDb.status != "idle") {
     resp.message = "Already running";
     res.send(JSON.stringify(resp));
     return;
   }
   runningDb.status= "running";

  console.log("Campaign Status Idle");
 

  let uploadedFile;
  let uploadDir;
  let numbersFileName = "numbers.csv";

  if (( req.files && Object.keys(req.files).length === 0)  && req.body.number) {
    return res.status(400).send('No files were uploaded.');
  }

  


  uploadedFile = req.files.image ;
  const campId = req.body.campaign;
  const numberList = req.body.number;
  console.log("number data" + numberList )
  const time = parseInt(req.body.time * 1000);
  console.log("time data------->"+ time);
  const callerIdList = req.body.callerid;
  const WaitTime = req.body.waitTime * 1000;
  runningDb.waitTime = WaitTime;
  // const numbers = numberList.split(",")
  // runningDb.numberList1.push(numbers)
  runningDb.numlist = numberList.split(",");
  console.log("numbers array data" + runningDb.numberList1)
  console.log("type------------->"+ typeof numbers)
  //console.log("numbers------------->"+ numbers)
  //let callerIdList = req.body.callerid.toLowerCase().trim().replace(/[^\w,-]/g, '')
  if (callerIdList != null && callerIdList != ""){
      runningDb.callerIdList = callerIdList.split(",");
  } else {
    runningDb.callerIdList[0] = cfg.defaultCli;
  }
//console.log("calleridCsv data---->" + JSON.stringify(callerIdListcsv))
console.log("calleridCsv data---->" + JSON.stringify(runningDb.callerIdList));
  const channels = (req.body.channel > 0) ? req.body.channel : 10;
  console.log(`Max Channels: ${channels}`);
  runningDb.maxChannels = channels;
  const interval = (req.body.interval) ? req.body.interval : 10;
  console.log("callerId------>" + callerIdList);
  uploadDir = path.join(cfg.campaign_path, campId);
  console.log(`Request Data: ${JSON.stringify(req.body)}`);
  // Use the mv() method to place the file somewhere on your server
  try {
    await fsPromise.access(uploadDir, constants.F_OK);
    console.log(`Dir Exists`);
  } catch (e) {
    console.error(`Exception while looking for directory ${e}`);
    await fsPromise.mkdir(uploadDir);
  };

  let uploadPath = path.join(uploadDir, numbersFileName);

  uploadedFile.mv(uploadPath, function (err) {
    if (err) {
      console.error(`Error while moving file: ${err}`);
      return res.status(500).send(err);
    }
    //runningDb.status="running"
    resp.status = "success";
    resp.message = "File uploaded";
    runningDb.intervalPointer = setInterval(originateCalls, time);
    console.log('Interval Started');
    res.send(resp);

  });


  lineReader.eachLine(`./${uploadDir}/numbers.csv`, async function (line) {
    console.log("linedata----->" + line);
    runningDb.numlist.push(line)
    console.log("******" + runningDb.numlist)
  });





});





const getDirNumFiles = async (dirName) => {
  const listFiles = await fsPromise.readdir(dirName);
  return listFiles.length;
}


async function originateCalls() {
  if(runningDb.status === 'idle') {
    clearInterval(runningDb.intervalPointer)
    runningDb.status= "idle";
        runningDb.numlist = [];
        runningDb.clilist= [];
        runningDb.maxChannels= 0,
        runningDb.intervalPointer= null;  
        return
  };

  if(runningDb.numlist.length === 0 ){
    const numFiles = await getDirNumFiles(cfg.calling_dir);
    if(numFiles === 0){
      clearInterval(runningDb.intervalPointer);
      console.log("Ending Campaign!!");
     
        runningDb.status= "idle";
        runningDb.numlist = [];
        runningDb.clilist= [];
        runningDb.maxChannels= 0,
        runningDb.intervalPointer= null;     
      
      return;
    }
    console.log(`Data finished, remaining calls in progress ${numFiles}`);
    return;
  } 
  //var channel = channels
  console.log("->>>>>>");
  // if (runningDb.status === 'idle') {

  //   return
  // }
  console.log('00000000000')
 
    //console.log("fddddddddddd->>"+files.length)
  
   
  console.log("Max Channels:" + runningDb.maxChannels)
  const numFiles = await getDirNumFiles(cfg.calling_dir);

  console.log("directory data-----" + numFiles);
  if (numFiles < runningDb.maxChannels ) {

    console.log('sssss')
    // console.log(data);
  
   
  console.log('readFile called');
      
    const numberToCall = runningDb.numlist.pop();
    const numfile = runningDb.numberList1.pop()

    let nextCli = runningDb.callerIdList[runningDb.callerIdIndex];
    if (runningDb.callerIdIndex >= runningDb.callerIdList.length - 1) {
      runningDb.callerIdIndex = 0
    } else {
      runningDb.callerIdIndex++;
    }

    // if(runningDb.numberList1.length !==0 ){
    //   await fsPromise.writeFile(`./${cfg.calling_dir}/${numfile}.call`,"aaa")
    // }else{
    //   return
    // }
    
    const data =  ` Channel: PJSIP/${numberToCall}${cfg.Gateway}\n Content:intCall \n Priority : 1 \n MaxRetries: 0 \n CallerId: ${nextCli} <${nextCli}> \n WaitTime: ${runningDb.waitTime}`
    await fsPromise.writeFile(`./${cfg.calling_dir}/${numberToCall}.call`, data);
    console.log("fileCreated " + numberToCall + ".call");
  }


}



router.delete('/del-campaign',async (req,res,next)=> {
       runningDb.status = "idle";
       const resp = {
        "status": "success",
        "message": "campaign deleted succesfully"
      };
       await res.send(JSON.stringify(resp))
       
})

module.exports = router;
