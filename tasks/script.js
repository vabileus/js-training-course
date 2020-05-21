const readline = require('readline');

function recursiveComma(result, left, right) {
    result.push((left.concat(right).join('.')));

    if (right.length > 1){
      for(let i = 1; i < right.length; i++){
        recursiveComma(result, left.concat(right.substring(0, i)), right.substring(i));
      }
    }

    return result;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("String: ", (string) => {
  console.time();
  const mem = process.memoryUsage().heapUsed;
  console.log(recursiveComma([], [], string));
  console.log((process.memoryUsage().heapUsed - mem) / 1024 / 1024);
  console.timeEnd();
  rl.close();
});
