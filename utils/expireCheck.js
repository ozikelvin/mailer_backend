
const checkSub =(timeOfLogin, timeOfReg) =>{
    const dayOfReg = new Date(timeOfReg).getDate();
    const dayOfLogin = new Date(timeOfLogin).getDate();
    if((dayOfLogin - dayOfReg) > 2) return false;
    return true;
}

module.exports = checkSub
