const readline = require('readline');

function loopComma(str) 
{ 
    const n = str.length; 
    const opsize = Math.pow(2, n - 1); 
  
    for (let counter = 0; counter < opsize; counter++)  
    { 
        let temp = [];
        
        for (let j = 0; j < n; j++)  
        { 
            temp.push(str[j]);

            if (counter & (1 << j)) 
            temp.push('.'); 
        } 
        console.log(temp.join().replace( /,/g, ''));
    } 
} 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question("String: ", (string) => {
    loopComma(string);
    rl.close();
  });