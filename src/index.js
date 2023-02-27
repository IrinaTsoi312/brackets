module.exports = function check(str, bracketsConfig) {
  const pattern = [];
  const stack = [];
  let str2;
  let isCorrect = false;

  function findString(string) {
    string.forEach(item => {
      if(typeof item === "string") {
        pattern.push(item);
      } 
      else {
        findString(item);
      }
    });
  }
  findString(bracketsConfig);

  if(pattern.join("").includes("|") && pattern.length === 2) {
    const arr1 = pattern.filter(item => item === "|");
    const arr2 = str.split("").filter(item => item === "|");
    arr1.length === arr2.length ? isCorrect = true : isCorrect = false;
  }
  else if(pattern.join("").includes("|") && pattern.length !== 2) {
    if(pattern.join("").includes("|")) {
      str2 = str.split("").filter(item => item !== "|").join("");
      getIsCorrect(str2);
    }
  }
  else {
    getIsCorrect(str);
  }
  function getIsCorrect(str) {
    for(let char of str) {
      let index = pattern.indexOf(char);
      if(index % 2 === 0) { stack.push(index + 1);} 
      else { if(stack.pop() !== index) { return false; } }
    }
  }
  stack.length === 0 ? isCorrect = true : isCorrect = false;
  return isCorrect;
}