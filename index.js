#!/usr/bin/env node

const fs = require("fs");   
let arguments = process.argv.slice(2);

let flags = [];   
let filenames= [];
let secondaryarguments = [];

for(let i of arguments){
  if(i[0]== "-"){         
      flags.push(i);
  }
  else if (i[0] == "$") {
    secondaryarguments.push(i.slice(1));
  }
  else{
    filenames.push(i);      
  } 
}

for(let file of filenames){
    if (!(flags.includes("-r"))){
    let fileData = fs.readFileSync(file,"utf-8");
    
        for(let flag of flags){
            if(flag =="-rs"){    // removes spaces between words of txt file
                fileData= removeAll(fileData," ");
            
            }
          
            if(flag =="-rn")     // removes new lines of a txt file  
          {
                fileData = removeAll(fileData,"\r\n");
          }
          
          if(flag == "-rsc"){     // removes special character in a text file 
            for(let secondaryargument of secondaryarguments){
                fileData= removeAll(fileData,secondaryargument);
              }
            
          }
          
          else if(flag=="-s"){   // prints line no in front of lines
              fileData  = addSequence(fileData);
              // console.log(fileData);
          }
          
          else if(flag=="-sn"){
              fileData = addSequenceTnel(fileData);
              // console.log(data);
          }
          
          else if(flag =="-rel"){     // removes extra lines between lines
            let ans = removeextraline(fileData);
            // console.log(typeof(ans));
            fileData="";
            for(let i = 0; i< ans.length ;i++){  
                if(ans[i]!=""){
                  
                  fileData+= ans[i];
                  fileData+="\r\n";
                  fileData+="\r\n";
                }
            }
            
          }
          
        }
      console.log(fileData);
    }
}

for(let flag of flags){     // my added function feature 1
  
    if(flag=="-c"){            // copies the data of n files in the 1st file
      for(let i = 1; i < filenames.length ; i++){
      fs.appendFileSync(filenames[0],fs.readFileSync   (filenames[i]));
      
      }
    }    
    if (flag=="-r"){     // function that renames a file 1 with specified file 2
    fs.rename(filenames[0],filenames[1],()=>{
        console.log("filename succesffully renamed");
      })
    }
    else if(flag=="-df"){  //delete a file
            fs.unlink(filenames[0],(err)=>{
              if(err) console.log(err);
              console.log('successfully deleted the file');
            })
    }
}

  function removeAll(string, removalData){
    return string.split(removalData).join("");
  }

  function addSequence(content){
    let contentArr = content.split("\r\n");
    for(let i = 0 ; i < contentArr.length;i++){
        contentArr[i]= i + 1 +" "+contentArr[i];  
    }
    return contentArr;
  }

  function addSequenceTnel(content){
    let contentArr = content.split("\r\n");
    let count = 1; 
    for(let i = 0 ; i < contentArr.length;i++){
      if(contentArr[i]!="") {  
        contentArr[i]=count+" "+contentArr[i];  
        count++;
      }     
    }
    return contentArr;
  }

    function removeextraline(fileData){
      
      let contentArr=fileData.split("\r\n");
      let count=1;

      for(let i = 0 ; i < contentArr.length ; i++){
        if(contentArr[i]!=""){

          contentArr[i]= count+" "+contentArr[i];  
          count++;

        }
      }
      return contentArr;
    }