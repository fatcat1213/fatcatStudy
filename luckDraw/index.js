var start = document.querySelector(".luck_start");
var luck = document.querySelectorAll('.luck_item');
var currentLuck = 0;//当前
var completeLuck = true;//完成
var activeClassName = "luck_active";
var luckTime = 7000;//
var luckDelay = 50;//毫秒
var luckTimeStart;
var luckTimeCurrent;
var onceComplete = true;
var result;
var mineResult =  Number(location.search.split("=")[1]);
var getResult = function(){
		var resultNum = Math.floor(Math.random()*100 + 1);//1-100
		resultNum = Math.floor(Math.random()*7 + 1);
		return resultNum;
}

luck = [].concat(Array.prototype.slice.call(luck,0,4),Array.prototype.slice.call(luck,5));
function getCurrentLuck(){
	var index;
	currentLuck = currentLuck <= (luck.length - 1)?currentLuck + 1: 1;
	for(let i = 0; i < luck.length; i++) {
		let num = Number(luck[i].dataset.id);
		if(num === currentLuck) {
			index = i;
			break;
		}
	}
	return index;
}

function luckActiveToggle(index,result){
	var active = document.querySelector(`.${activeClassName}`);
	if(active) {
		active.classList.toggle(activeClassName);
	}
	luck[index].classList.toggle(activeClassName);	
}
function luckChange(){
	if(!completeLuck) {
		luckTimeCurrent = Date.now();
		var diffTime = luckTimeCurrent - luckTimeStart;
		onceComplete = false;
		if(diffTime >= 5000) {
			luckDelay = luckDelay + Math.round(diffTime/Math.ceil(Math.random()*10 + 49));
		}
		if(diffTime >= luckTime) {
			if(!result || currentLuck === result) {
				completeLuck = true;
				luckDelay = 50;
				return;
			}
		}
		luckActiveToggle(getCurrentLuck());
		setTimeout(function(){
			// console.log(currentLuck)
			luckChange();
		},luckDelay);
	}
}
function luckDrawStart(){
	if(completeLuck) {
		if(mineResult || mineResult === 0) {
			result = mineResult;
		}else {
			result = getResult();
		}
		console.log(result)
		luckTimeStart = Date.now();
		completeLuck = false;
		luckChange();
	}
}
start.addEventListener("click",luckDrawStart);