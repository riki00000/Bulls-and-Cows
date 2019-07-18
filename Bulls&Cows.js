//alert("Connected");
var numberSize = 4;
var bulls = 0;
var cows = 0;
var givenNumber = 1111 ;//random not valid number
var trysCounter =0;
var checkButton = document.getElementById("checkButton");
var numInput = document.getElementById("input");
var textArea = document.getElementById("trysArea");
var possAns = document.getElementById("possibleAnswers");
var checkBox0 = document.getElementById("zero");
var checkBox1 = document.getElementById("one");
var checkBox2 = document.getElementById("two");
var checkBox3 = document.getElementById("three");
var checkBox4 = document.getElementById("four");
var checkBox5 = document.getElementById("five");
var checkBox6 = document.getElementById("six");
var checkBox7 = document.getElementById("seven");
var checkBox8 = document.getElementById("eight");
var checkBox9 = document.getElementById("nine");
// var checkBox = document.getElementsByName("checkbox");
var number1 = document.getElementById("filterNumber1");
var number2 = document.getElementById("filterNumber2");
var number3 = document.getElementById("filterNumber3");
var number4 = document.getElementById("filterNumber4");
var filterButton = document.getElementById("filterButton")
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
function isValid(num){
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
function getAllValidNumbersInArray(){
	let arr=[];
	for(let i = 1023;i<9876;i++){
		if(isValid(i)){
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
function getImputNumberFilterArray(){
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
var allValidNumbersArr = getAllValidNumbersInArray();
showPossibleNumbersInTextArea(possAns,allValidNumbersArr);
givenNumber = allValidNumbersArr.random();
var givenNumberArr = numToArray(givenNumber);

numInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    checkButton.click();
  }
});

checkButton.addEventListener("click",function(){
	if(isValid(numInput.value)){
		trysCounter++;
		var myNumber = numInput.value;
		var myNumberArr = numToArray(myNumber);
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