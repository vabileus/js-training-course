const readline = require('readline');

function recursiveComma(result, left, right) {
    result.push((left.concat(right).join()).replace( /,/g, '.' ));

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
  console.log(recursiveComma([], [], string));
  rl.close();
});
