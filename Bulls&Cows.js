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

while(!isValid(givenNumber)){
	if(numberSize === 4){
		givenNumber = Math.floor(Math.random() * 9000) +1000;//random from 1000 to 9999
	}else if(numberSize === 3){
		givenNumber = Math.floor(Math.random() * 900) +100;//random from 100 to 999
	}else if(numberSize === 5){
		givenNumber = Math.floor(Math.random() * 90000) +10000;//random from 10000 to 99999
	}else{
		alert("numberSize is not declarated !");
	}
}
var givenNumberArr = numToArray(givenNumber);
//-----------------------------------------------------------------------------
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
		alert("The number is not valid !")
	}
});