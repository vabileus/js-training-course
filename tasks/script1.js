const readline = require('readline');

function loopComma(str) 
{ 
    const n = str.length; 
    const opsize = Math.pow(2, n - 1); 
    let result = [];  
    for (let counter = 0; counter < opsize; counter++)  
    {         
        let temp = '';
        
        for (let j = 0; j < n; j++)  
        { 
            temp += str[j];

            if (counter & (1 << j)) 
            temp += '.'; 
        }
        result.push(temp);  
    } 
    console.log(result);
} 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question("String: ", (string) => { 
    console.time();
    const mem = process.memoryUsage().heapUsed;
    loopComma(string);
    console.log((process.memoryUsage().heapUsed - mem) / 1024 / 1024);
    console.timeEnd();
    rl.close();
  });