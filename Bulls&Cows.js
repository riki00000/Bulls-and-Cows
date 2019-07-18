//alert("Connected");

function main (){
	let numberSize = 4;
	let userBulls = 0;
	let userCows = 0;
	let givenNumber = 1111 ;//random not valid number
	let trysCounter =0;
	let checkButton = document.getElementById("checkButton");
	let numInput = document.getElementById("input");
	let textArea = document.getElementById("trysArea");
	let possAns = document.getElementById("possibleAnswers");
	let newGameButton = document.getElementById("newGameButton");
	let notepadArea = document.getElementById("notepad");
	let filterButton = document.getElementById("filterButton");
	// var checkBox = document.getElementsByName("checkbox");
	let userTurn = true;
	let checkButton2 = document.getElementById("checkButtonC");
	let imputBulls = document.getElementById("inputBulls");
	let imputCows = document.getElementById("inputCows");
	let userContainer = document.getElementsByClassName("userContainer");
	let computerContainer = document.getElementsByClassName("computerContainer");




	let allValidNumbersArr = getAllValidNumbersInArray(numberSize);
	showPossibleNumbersInTextArea(possAns,allValidNumbersArr);
	givenNumber = allValidNumbersArr.random();
	let givenNumberArr = numToArray(givenNumber);


	if(userTurn){
		checkButton.disabled = false;
		checkButton2.disabled = true;
		inputBulls.disabled = true;
		inputCows.disabled = true;
		numInput.disabled = false;
		userContainer.bgColor = "red";
		computerContainer.bgColor = "#F5F5F5";

	}else{
		
	}

	numInput.addEventListener("keyup", function(event) {
	  if (event.keyCode === 13) {
	    event.preventDefault();
	    checkButton.click(); //turns
	  }
	});

	checkButton.addEventListener("click",function(){
		if(isValid(numInput.value,numberSize)){
			trysCounter++;
			let myNumber = numInput.value;
			let myNumberArr = numToArray(myNumber);
			userBulls = checkBulls(myNumberArr,givenNumberArr);
			userCows = checkCows(myNumberArr,givenNumberArr);
			textArea.value +="\n"+ printTry(trysCounter,myNumber,userBulls,userCows);
			if(userBulls===numberSize){
				alert("Congratulation! YOU WIN !");
			}
			userBulls = 0;
			userCows = 0;
			clearField(numInput);
			checkButton.disabled = true;
			checkButton2.disabled = false;
			numInput.disabled = true;
			inputBulls.disabled = false;
			inputCows.disabled = false;
			userContainer.bgColor = "#F5F5F5";//not work
			computerContainer.bgColor = "red";//not work
			userTurn = false;
		}else{
			alert("The number is not valid !");
		}
	});

	checkButton2.addEventListener("click",function(){
		if(validBullsCows(imputBulls.value,imputCows.value,numberSize)){








			checkButton.disabled = false;
			checkButton2.disabled = true;
			inputBulls.disabled = true;
			inputCows.disabled = true;
			numInput.disabled = false;
			userContainer.bgColor = "red";//not work
			computerContainer.bgColor = "#F5F5F5";//not work
			userTurn = true;
		}else{
			alert("The number of Bulls or Cows is not valid !");
		}
	});

	filterButton.addEventListener("click",function(){
		let filter = filterNumber(allValidNumbersArr,getCheckBoxArray("user"),getImputNumberFilterArray());
	    clearField(possAns);
	    showPossibleNumbersInTextArea(possAns,filter);
	});

	newGameButton.addEventListener("click",function(){
		clearAllNumberFilterFields();
		checkedAllCheckBoxes("user");
		clearField(notepadArea);
		clearField(textArea);
		textArea.value = 'You can see your trys here :';
		givenNumber = allValidNumbersArr.random();
		filterButton.click();
	});

};
//-----------------------------------------------------------------------------
function printTry(trysCounter,guessNumber,bulls,cows){
	let text = "Try "+ trysCounter + " -> "+ guessNumber + " -> " + bulls + " bulls & " + cows + " cows";
	return text;
}
//-----------------------------------------------------------------------------
function validBullsCows(bulls,cows,numberSize){
	if(bulls>0 && cows>0 && bulls<=numberSize && cows<=numberSize){
		return true;
	}else{
		return false;
	}
}
//-----------------------------------------------------------------------------
function numToArray(num) {
    let arr = [];
    let numToStr = num.toString();
    for(let i = 0; i < numToStr.length; i++) {
        arr.push(parseInt(numToStr[i]));
    }
    return arr;
};
//-----------------------------------------------------------------------------
function isValid(num,numberSize){
	let arr = numToArray(num);
	if(arr[0] == 0){
		return false;
	}
	for(let i=0;i<numberSize-1;i++){
		for(let j=i+1;j<numberSize;j++){
			if(arr[i] === arr[j]){
				return false;
			}
		}
	}
	return true;
};
//----------------------------------------------------------------------------
function checkBulls(myNumberArr,givenNumberArr){
	let bulls =0 ;
	for(let i=0 ; i<myNumberArr.length;i++){
		if(myNumberArr[i]===givenNumberArr[i]){
			bulls++;
		}
	}
	return bulls;
};
//----------------------------------------------------------------------------
function checkCows(myNumberArr,givenNumberArr){
	let cows =0;
	for(let i = 0; i<myNumberArr.length;i++){
		for(let j=0; j<myNumberArr.length;j++){
			if(myNumberArr[i]===givenNumberArr[j] && myNumberArr[i]!==givenNumberArr[i]){
				cows++;
			}
		}
	}
	return cows;
};
//----------------------------------------------------------------------------
function clearField(input) {
    input.value = "";
};
//----------------------------------------------------------------------------
function clearAllNumberFilterFields(){
	for(let i =1;i<=4;i++){
		clearField(document.getElementById("filterNumber"+i));
	}
}
//----------------------------------------------------------------------------
function getAllValidNumbersInArray(numberSize){
	let arr=[];
	for(let i = 1023;i<9876;i++){
		if(isValid(i,numberSize)){
		   arr.push(parseInt(i));

		}
	}
	return arr;
}
//----------------------------------------------------------------------------
function showPossibleNumbersInTextArea(area,array){
	area.value =array.length + " variations : " + "\n" 
	for(let i=0;i<array.length;i++){
		area.value = area.value + "\n" + array[i];
	}
}
//----------------------------------------------------------------------------
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}
//----------------------------------------------------------------------------
function getCheckBoxArray(player){
	let array = [];
	for(let i =0;i<10;i++){
		array.push(document.getElementById(player+"Check"+i).checked);
	}
	return array;
}
//----------------------------------------------------------------------------
function checkedAllCheckBoxes(player){
	for(let i = 0;i<10;i++){
		document.getElementById(player+"Check"+i).checked = true;
	}
}
//----------------------------------------------------------------------------
function getImputNumberFilterArray(){
	let array=[]
	for(let i = 1 ; i<=4;i++){
		array.push(document.getElementById("filterNumber"+i).value);
	}
	return array;
}
//----------------------------------------------------------------------------
function filterArr(array,checkBoxArray){
	let filteredArray = []
	let flag = 0;
	for(let i=0;i<array.length;i++){
		let currNum = numToArray(array[i]);
		for(let j=0;j<currNum.length;j++){
			if(checkBoxArray[currNum[j]]){
				flag++;
			}
		}
		if(flag === currNum.length){
			filteredArray.push(parseInt(array[i]));
		}
		flag = 0;
	}
	return filteredArray;
}
//----------------------------------------------------------------------------
function filterNumber(array,checkBoxArray,inputNumberFilterArray){
	let newFilteredArray = [];
	let newArray = filterArr(array,checkBoxArray);
	let haveNumFlag = false;
	let haveNumFlagArr = [];
	let haveNumCounter = 0;
	for(let j=0;j<inputNumberFilterArray.length;j++){
		if(inputNumberFilterArray[j] != ""){
			haveNumFlag = true;
			haveNumFlagArr.push(true);
			haveNumCounter++;
		}else{
			haveNumFlagArr.push(false);
		}	
	}
	if(haveNumFlag){
		for(let i=0;i<newArray.length;i++){
			let currNum = numToArray(newArray[i]);
			let flag = 0;
			for(let j=0;j<inputNumberFilterArray.length;j++){
				if(inputNumberFilterArray[j] == currNum[j] && haveNumFlagArr[j] === true){
					flag++;
				}	
			}
			if(flag === haveNumCounter){
				newFilteredArray.push(parseInt(newArray[i]));
			}
		}
		return  newFilteredArray ;
	}else{
		return newArray;
	}

}
//----------------------------------------------------------------------------
// function randomGenerateValidNumber(givenNumber,numberSize){
// 	while(!isValid(givenNumber)){
// 		if(numberSize === 4){
// 			givenNumber = Math.floor(Math.random() * 9000) +1000;//random from 1000 to 9999
// 		}else if(numberSize === 3){
// 			givenNumber = Math.floor(Math.random() * 900) +100;//random from 100 to 999
// 		}else if(numberSize === 5){
// 			givenNumber = Math.floor(Math.random() * 90000) +10000;//random from 10000 to 99999
// 		}else{
// 			alert("numberSize is not declarated !");
// 		}
// 	}	
// }
//-----------------------------------------------------------------------------

main();