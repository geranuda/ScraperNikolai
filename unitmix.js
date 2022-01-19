// 🔲 For bedrooms and baths
// 🔲 FOR Rent we need to sum it or if it's a single number then extract the number and put it into Rents field

/*
1bed 1bath ✅
1b 1b ✅
1 bed 1 bath
3. 1bed 2 bath 4.1 bed two bath ❌
1b1b ✅
6 units  ====> 4 units 1bed1bath✅ / 1 2bed 2bath unit
31 units ====> 15 one bedroom 7 two bedrooms 7 three bedroom
2 bed 1 bath✅
4 b 2b✅
534 units ====> 277-1/1c, 143-2/2D, 24-3/2E, 78-EFF/A, 12-EFF/B
8 offices
all 2bd 1bath ✅
bed 1bath
3-2br, 1-1br
4 units 1bed1bath / 1 2bed 2bath unit
2 bedroom 1 1/2 bath
3 bd and 2bed 1baths
2bed 2bath 1bed 1bath
*/
const convertToNumber = (str) => {
  return str.replace(/[^0-9\.]+/g, "")
}

const removeSpacesAfterNumbers = (str) => {
  // remove spaces that are after numbers
  return str.replace(/\s+[a-z]+/g, "")
}

const removeSpacesAfterDots = (str) => {
  // remove spaces after dot character
  return str.replace(/\.\s+/g, ".")
  
}

removeCharactersTillNumbersStart = (str) => {
  // remove characters till first number
  let regex = /[a-z]+/g;
  let match;
  while ((match = regex.exec(str)) !== null) {
    str = str.replace(match[0], "");
  }
  return str.trim();
}

const replaceOneTen = (str)=>{
  return str.replace("one", 1).replace("two", 2).replace("three", 3).replace("four", 4).replace("five", 5).replace("six", 6).replace("seven", 7).replace("eight", 8).replace("nine", 9).replace("ten", 10)
}

function processUnits (rawData){
  let formattedData = {};
  let processedData;
  // Replace One, two, three.... ten with actual number
  processedData = replaceOneTen(rawData);
  console.log("🦶After replacing one, two, three.... ten with actual number: ", processedData);
  // remove spaces between number and alphabetic only when alphabet is after numbers 1 b 2 b => 1b 2b
  processedData = removeSpacesAfterNumbers(processedData);
  console.log("🦶🦶After removing spaces After each number: ", processedData);

  processedData = removeCharactersTillNumbersStart(processedData);
  console.log("🦶🦶After removing characters till reached first number: ", processedData);
  
  // processedData = removeSpacesAfterDots(processedData);
  // console.log("🦶🦶After removing spaces After dots: ", processedData,);
  
  // Split based on spaces or number right after alphabet
  // processedData = processedData.split(/\s+|[0-9]+/);
  processedData = processedData.split(" ");
  console.log("🦶🦶🦶After splitting: ", processedData, processedData.length);

  if(processedData.length < 2){
    console.log("Replace alphabets with nothing", rawData)
    // find all occurances of numbers in rawData string and push them into an array
    let numbers = [];
    let regex = /\d+/g;
    let match;
    while ((match = regex.exec(rawData)) !== null) {
      numbers.push(match[0]);
    }
    processedData = numbers;
  }
  if(processedData.length > 2 ){
    console.log("Odd rawData", rawData)
  }

  // remove any alphabets
  processedData = processedData.map(convertToNumber);
  console.log("🦶🦶🦶🦶After Removing alphabets: ", processedData);

  // return {beds: rawData[0], bath: rawData[1]}
  formattedData.beds = processedData[0];
  formattedData.baths = processedData[1];
  console.log("FormattedData", formattedData)
  return formattedData; 
}

// processUnits("1bed 1bath");
// processUnits("1 bed 1 bath");
// processUnits("1b1b");
// processUnits("1bed1bath");
// processUnits("2 bed 1 bath");
// processUnits("4 b 2b");
// processUnits("all 2bd 1bath");
// processUnits("bed 1bath");
processUnits("1bed 2 bath 4.1 bed two bath");
// console.log(replaceOneTen("this is one 2 three"));