const todayDate = ()=>{
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const currentDate = `${day}/${month}/${year}`;

    return currentDate;
}

module.exports = todayDate;