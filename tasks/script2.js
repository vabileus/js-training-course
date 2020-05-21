const readline = require('readline');

let result = [];

function recursiveComma(str, buff, i, j, n) 
{ 
    if (i == n) 
    { 
        buff[j] = ''; 
        result.push(buff.join(''));
        return; 
    }
  
    buff[j] = str[i]; 
    recursiveComma(str, buff, i + 1, j + 1, n); 
  
    buff[j] = '.'; 
    buff[j+1] = str[i]; 
  
    recursiveComma(str, buff, i + 1 , j + 2, n); 

} 
   
function processRecursive(str) 
{ 
    const n = str.length; 

    let arr = [];
   
    let buf = arr.fill(0, 2 * n, null);  
  
    buf[0] = str[0]; 
  
    recursiveComma(str, buf, 1, 1, n); 
} 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question("String: ", (string) => {
    processRecursive(string);
    console.log(result);
    rl.close();
  });
