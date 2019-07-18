//alert("Connected");

function main (){
	let numberSize = 4;
	let bulls = 0;
	let cows = 0;
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
	let allValidNumbersArr = getAllValidNumbersInArray(numberSize);
	showPossibleNumbersInTextArea(possAns,allValidNumbersArr);
	givenNumber = allValidNumbersArr.random();
	let givenNumberArr = numToArray(givenNumber);

	numInput.addEventListener("keyup", function(event) {
	  if (event.keyCode === 13) {
	    event.preventDefault();
	    checkButton.click();
	  }
	});

	checkButton.addEventListener("click",function(){
		if(isValid(numInput.value,numberSize)){
			trysCounter++;
			let myNumber = numInput.value;
			let myNumberArr = numToArray(myNumber);
			bulls = checkBulls(myNumberArr,givenNumberArr);
			cows = checkCows(myNumberArr,givenNumberArr);
			let text = "Try "+ trysCounter + " -> "+ myNumber + " -> " + bulls + " bulls & " + cows + " cows";
			textArea.value = textArea.value +"\n"+text;
			if(bulls===numberSize){
				alert("Congratulation! YOU WIN !");
			}else{
				// alert("WRONG! \n The number "+ myNumber + " have " + bulls + " bulls & " + cows + " cows")
			}
			bulls = 0;
			cows = 0;
			clearField(numInput);
		}else{
			alert("The number is not valid !");
		}
	});

	filterButton.addEventListener("click",function(){
		let filter = filterNumber(allValidNumbersArr);
	    clearField(possAns);
	    showPossibleNumbersInTextArea(possAns,filter);
	});

	newGameButton.addEventListener("click",function(){
		clearAllNumberFilterFields();
		checkedAllCheckBoxes();
		clearField(notepadArea);
		clearField(textArea);
		textArea.value = 'You can see your trys here :';
		givenNumber = allValidNumbersArr.random();
		filterButton.click();
	});

};
//-----------------------------------------------------------------------------

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
	clearField(document.getElementById("filterNumber1"));
	clearField(document.getElementById("filterNumber2"));
	clearField(document.getElementById("filterNumber3"));
	clearField(document.getElementById("filterNumber4"));
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
function getCheckBoxArray(){
	let checkBox0 = document.getElementById("zero");
	let checkBox1 = document.getElementById("one");
	let checkBox2 = document.getElementById("two");
	let checkBox3 = document.getElementById("three");
	let checkBox4 = document.getElementById("four");
	let checkBox5 = document.getElementById("five");
	let checkBox6 = document.getElementById("six");
	let checkBox7 = document.getElementById("seven");
	let checkBox8 = document.getElementById("eight");
	let checkBox9 = document.getElementById("nine");
	let array = [];
	array.push(checkBox0.checked);
	array.push(checkBox1.checked);
	array.push(checkBox2.checked);
	array.push(checkBox3.checked);
	array.push(checkBox4.checked);
	array.push(checkBox5.checked);
	array.push(checkBox6.checked);
	array.push(checkBox7.checked);
	array.push(checkBox8.checked);
	array.push(checkBox9.checked);
	return array;
}
//----------------------------------------------------------------------------
function checkedAllCheckBoxes(){
	document.getElementById("zero").checked = true;
	document.getElementById("one").checked = true;
	document.getElementById("two").checked = true;
	document.getElementById("three").checked = true;
	document.getElementById("four").checked = true;
	document.getElementById("five").checked = true;
	document.getElementById("six").checked = true;
	document.getElementById("seven").checked = true;
    document.getElementById("eight").checked = true;
	document.getElementById("nine").checked = true;
}
//----------------------------------------------------------------------------
function getImputNumberFilterArray(){
	let number1 = document.getElementById("filterNumber1");
	let number2 = document.getElementById("filterNumber2");
	let number3 = document.getElementById("filterNumber3");
	let number4 = document.getElementById("filterNumber4");
	let array=[]
	array.push(number1.value);
	array.push(number2.value);
	array.push(number3.value);
	array.push(number4.value);
	return array;
}
//----------------------------------------------------------------------------
function filterArr(array){
	let filteredArray = []
	let checkBoxArray = getCheckBoxArray();
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
function filterNumber(array){
	let inputNumberFilterArray = getImputNumberFilterArray();
	let newFilteredArray = [];
	let newArray = filterArr(array);
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