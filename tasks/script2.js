const readline = require('readline');

function recursiveComma(str, buff, i, j, n, result = []) 
{ 
    if (i == n) { 
        buff[j] = ''; 
        result.push(buff.join(''));
        return; 
    } else {
  
    buff[j] = str[i]; 
    recursiveComma(str, buff, i + 1, j + 1, n, result); 
  
    buff[j] = '.'; 
    buff[j+1] = str[i]; 
  
    recursiveComma(str, buff, i + 1 , j + 2, n, result); 
    }
    return result;
} 
   
function processRecursive(str) 
{ 
    const n = str.length; 

    let arr = [];
   
    let buf = arr.fill(0, 2 * n, null);  
  
    buf[0] = str[0]; 
  
    const res = recursiveComma(str, buf, 1, 1, n);
    console.log(res); 
} 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question("String: ", (string) => {
    console.time();
    const mem = process.memoryUsage().heapUsed;
    processRecursive(string);
    console.log((process.memoryUsage().heapUsed - mem) / 1024 / 1024);
    console.timeEnd();
    rl.close();
  });
