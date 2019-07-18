//alert("Connected");

function main (){
	let numberSize = 4;
	let userBulls = 0;
	let userCows = 0;
	let givenNumber = 1111 ;//random not valid number
	let userTrysCounter =0;
	let checkButton = document.getElementById("checkButton");
	let numInput = document.getElementById("input");
	let textArea = document.getElementById("userTrysArea");
	let userPossibleAnswersArea = document.getElementById("possibleAnswers");
	let newGameButton = document.getElementById("newGameButton");
	let notepadArea = document.getElementById("notepad");
	let filterButton = document.getElementById("filterButton");
	// var checkBox = document.getElementsByName("checkbox");
	let userTurn = true;
	let checkButton2 = document.getElementById("checkButtonC");
	let inputBulls = document.getElementById("inputBulls");
	let inputCows = document.getElementById("inputCows");
	let userContainer = document.getElementsByClassName("userContainer");
	let computerContainer = document.getElementsByClassName("computerContainer");
	let compGuess = document.getElementById("compGuess");
	let compPossibleAnswersArea = document.getElementById("possibleAnswersC");
	let compTextArea = document.getElementById("compTrysArea");
	let compTrysCounter =0;
	let compTrysArray = [];
	let compBullsArray = [];
	let compCowsArray = [];





	let allValidNumbersArr = getAllValidNumbersInArray(numberSize);
	showPossibleNumbersInTextArea(userPossibleAnswersArea,allValidNumbersArr);
	showPossibleNumbersInTextArea(compPossibleAnswersArea,allValidNumbersArr);
	givenNumber = allValidNumbersArr.random();
	let givenNumberArr = numToArray(givenNumber);

	numInput.addEventListener("keyup", function(event) {
	  if (event.keyCode === 13) {
	    event.preventDefault();
	    if(userTurn){
	    	checkButton.click();
	    }else{
	    	checkButton2.click();
	    }
	  }
	});

	checkButton.addEventListener("click",function(){
		if(isValid(numInput.value,numberSize)){
			userTrysCounter++;
			let myNumber = numInput.value;
			let myNumberArr = numToArray(myNumber);
			userBulls = checkBulls(myNumberArr,givenNumberArr);
			userCows = checkCows(myNumberArr,givenNumberArr);
			textArea.value +="\n"+ printTry(userTrysCounter,myNumber,userBulls,userCows);
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
			compTrysCounter++;
			if(compTrysCounter<2){
				compGuess.value = allValidNumbersArr[0];
				compTrysArray.push(parseInt(compGuess.value));
			}else{
				compGuess.value = compTrysArray[compTrysCounter-1]
			}
		}else{
			alert("The number is not valid !");
		}
	});

	checkButton2.addEventListener("click",function(){
		if(validBullsCows(inputBulls.value,inputCows.value,numberSize)){
			if(inputBulls.value == ""){
				inputBulls.value =0;
			}
			if(inputCows.value == ""){
				inputCows.value =0;
			}
			compBullsArray.push(parseInt(inputBulls.value));
			compCowsArray.push(parseInt(inputCows.value));
			//--------------------------------------------------------------------------------
			if(compBullsArray[compTrysCounter-1]==0 && compCowsArray[compTrysCounter-1]==0){
				let arr = numToArray(compGuess.value);
				for(let i =0;i<arr.length;i++){
					document.getElementById("compCheck"+arr[i]).checked = false;
				}
				
			}
			//--------------------------------------------------------------------------------
			if(compTrysCounter>=2){
				if(compBullsArray[compTrysCounter-2] + compCowsArray[compTrysCounter-2] !=0 ){
					let previusNumberBigger = undefined;
					if(compBullsArray[compTrysCounter-2] + compCowsArray[compTrysCounter-2] < compBullsArray[compTrysCounter-1] + compCowsArray[compTrysCounter-1]){
						previusNumberBigger = false;
					}else if(compBullsArray[compTrysCounter-2] + compCowsArray[compTrysCounter-2] > compBullsArray[compTrysCounter-1] + compCowsArray[compTrysCounter-1]){
						previusNumberBigger = true;
					}else if (compBullsArray[compTrysCounter-2] + compCowsArray[compTrysCounter-2] == compBullsArray[compTrysCounter-1] + compCowsArray[compTrysCounter-1]){
						previusNumberBigger = undefined;
					}
					let previusNumber = numToArray(compTrysArray[compTrysCounter-2]);
					let currentNumber = numToArray(compTrysArray[compTrysCounter-1]);
					let flag = 0;
					let index = null;
					for(let i =0;i<4;i++){
						if(previusNumber[i] != currentNumber[i]){
							flag++;
							index = i;
						}
					}
					if(flag == 1 && previusNumberBigger==false){
						document.getElementById("compCheck"+previusNumber[index]).checked = false;
					}else if(flag==1 && previusNumberBigger == true){
						document.getElementById("compCheck"+currentNumber[index]).checked = false;
					}
					compTrysArray.push(parseInt(compTrysArray[compTrysCounter-1]+1));
				}else{
					compTrysArray.push(parseInt(compTrysArray[compTrysCounter-1]+1));
				}

			}else{
				compTrysArray.push(parseInt(compTrysArray[compTrysCounter-1]+1));
			}

			//----------------------------------------------------------------------------------
			console.log(compBullsArray[compTrysCounter-1] + compCowsArray[compTrysCounter-1]);
			if(compBullsArray[compTrysCounter-1] + compCowsArray[compTrysCounter-1] == 4){
				let answer = numToArray(compTrysArray[compTrysCounter-1]);
				for(let i = 0;i<10;i++){
					if(answer[0] != i && answer[1] != i && answer[2] != i && answer[3] != i ){
						document.getElementById("compCheck"+i).checked = false;
					}
				}
				
			}
			//----------------------------------------------------------------------------------
			let compFilter = filterNumber(allValidNumbersArr,getCheckBoxArray("comp"),getImputNumberFilterArray("comp"));
	    	clearField(compPossibleAnswersArea);
	    	for(let i=0;i<compFilter.length;i++){
	    		for(let j=0;j<compTrysArray.length;j++){
					if(compTrysArray[j] == compFilter[i]){
						compFilter.splice(i,1);
					}
	    		}
			}
	    	showPossibleNumbersInTextArea(compPossibleAnswersArea,compFilter);
	    	//-----------------------------------------------------------------------------------
	    	if(compBullsArray[compTrysCounter-1]==0 && compCowsArray[compTrysCounter-1]==0){
	    		compTrysArray.push(parseInt(compFilter[0]));
	    	}
	    	compTextArea.value +="\n"+ printTry(compTrysCounter,compTrysArray[compTrysCounter-1],inputBulls.value,inputCows.value);
	    	if(compBullsArray[compTrysCounter-1]==4){
	    		alert("Computer WIN ! You Lose ! Try Again !");
	    		newGameButton.click();
	    	}
	    	clearField(inputBulls);
	    	clearField(inputCows);
			checkButton.disabled = false;
			checkButton2.disabled = true;
			inputBulls.disabled = true;
			inputCows.disabled = true;
			numInput.disabled = false;
			clearField(compGuess);
			userContainer.bgColor = "red";//not work
			computerContainer.bgColor = "#F5F5F5";//not work
			userTurn = true;
			let valid = false;
			while(valid == false){
				for(let i=0;i<compFilter.length;i++){
					if(compTrysArray[compTrysCounter-1] == compFilter[i]){
						compFilter.splice(i,1);
					}
					if(compTrysArray[compTrysCounter] == compFilter[i]){
						valid=true;
					}
				}
				if(valid==false){
					compTrysArray[compTrysCounter]++;
				}	
			}
			if(compFilter.length == 0){
	    		alert("Your number does not exist ! You are a cheater!");
	    		newGameButton.click();
	    	}
		}else{
			alert("The number of Bulls or Cows is not valid !");
		}
	});

	filterButton.addEventListener("click",function(){
		let filter = filterNumber(allValidNumbersArr,getCheckBoxArray("user"),getImputNumberFilterArray());
	    // console.log(getCheckBoxArray("user"));
	    clearField(userPossibleAnswersArea);
	    showPossibleNumbersInTextArea(userPossibleAnswersArea,filter);
	});

	newGameButton.addEventListener("click",function(){
		clearAllNumberFilterFields("user");
		checkedAllCheckBoxes("user");
		clearField(notepadArea);
		clearField(textArea);
		textArea.value = 'You can see your trys here :';
		givenNumber = allValidNumbersArr.random();
		showPossibleNumbersInTextArea(userPossibleAnswersArea,allValidNumbersArr);
		clearAllNumberFilterFields("comp");
		checkedAllCheckBoxes("comp");
		clearField(compTextArea);
		compTextArea.value='You can see Comp trys here :';
		showPossibleNumbersInTextArea(compPossibleAnswersArea,allValidNumbersArr);
		compTrysArray = [];
		compBullsArray = [];
		compCowsArray = [];
	});

};
//-----------------------------------------------------------------------------
function printTry(trysCounter,guessNumber,bulls,cows){
	let text = "Try "+ trysCounter + " -> "+ guessNumber + " -> " + bulls + " bulls & " + cows + " cows";
	return text;
}
//-----------------------------------------------------------------------------
function validBullsCows(bulls,cows,numberSize){
	let sum = parseInt(bulls) + parseInt(cows);
	if(bulls>=0 && cows>=0 && bulls<=4 && cows<=4 && sum<=4){
		return true;
	}else{
		return false;
	}
}
//-----------------------------------------------------------------------------
function arrayToNum(array){
	let num = 0;
	num+=array[0]*1000;
	num+=array[1]*100;
	num+=array[2]*10;
	num+=array[3]*1;
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
function clearAllNumberFilterFields(player){
	for(let i =1;i<=4;i++){
		let curr = document.getElementById(player + "FilterNumber"+i);
		curr = "" ;
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
function getImputNumberFilterArray(player){
	let array=[]
	for(let i = 1 ; i<=4;i++){
		array.push(document.getElementById(player + "FilterNumber"+i).value);
	}
	return array;
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