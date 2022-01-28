
// All mongoose static methods
const unqiueNumber = (): number => {
    //get unix epoch time
    const unixTime = Math.floor(Date.now() / 1000);
    //get last 4 numbers of unix epoch time
    const last4 = Number(unixTime.toString().slice(-4));
    //generate a random number between 1000 and 9999
    const random = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    //multiply random with last4
    const result = random * last4;
    //add result to unix time
    const final = unixTime + result; 
    return final;
  };
  
  export { unqiueNumber };
  