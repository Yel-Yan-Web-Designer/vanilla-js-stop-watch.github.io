const stopWatch = document.querySelector(".stop-watch"),
      startBtn = document.querySelector(".start"),
      pauseBtn = document.querySelector(".pause"),
      resetBtn = document.querySelector(".restart"),
      continueBtn = document.querySelector(".continue");


/*--- ADD ACTIVE CLASS TO ALL BUTONS HEN CLICK--- */
document.querySelectorAll("button").forEach(x => {
    x.addEventListener("click", (e) => {
        removeAllActiveFromBtns();
        e.target.classList.toggle("active");
        console.log(e.target)
    })
})

const removeAllActiveFromBtns = () => {
    document.querySelectorAll("button").forEach(x => x.classList.remove("active"))
}
/*
1. Create active class for button when clicked
2. Fire click event to all btns 
3. Create updateTime for start btn and continue to update Timer
*/

let timerData = {
    hours : 0,
    mins : 0,
    seconds : 0,
    milliseconds : 0,
}

let saveWatch;  // to store save item from local storage after reload

const updateTime = () => {
    timerData.milliseconds += 10;
    if(timerData.milliseconds === 1000){
        timerData.milliseconds = 0;
        timerData.seconds++
    }
    if(timerData.seconds === 60){
        timerData.seconds =0;
        timerData.mins++
    }
    if(timerData.mins === 60){
        timerData.mins = 0;
        timerData.hours++
    }
    if(timerData.hours === 60){
        timerData.hours = 0;
    }

    let h = timerData.hours < 10 ? "0" + timerData.hours : timerData.hours;
    let m = timerData.mins < 10 ? "0" + timerData.mins : timerData.mins;
    let ss = timerData.seconds < 10 ? "0" + timerData.seconds : timerData.seconds;
    let ms = timerData.milliseconds < 100 ? "0" + timerData.milliseconds : timerData.milliseconds;
    let displayWatch = `${h} : ${m} : ${ss} : ${ms}`;
    
    localStorage.setItem("saveWatch", displayWatch);
    localStorage.setItem("saveHrs", timerData.hours);
    localStorage.setItem("saveMins", timerData.mins);
    localStorage.setItem("saveS", timerData.seconds);
    localStorage.setItem("saveMs", timerData.milliseconds);

    stopWatch.textContent = displayWatch;
}

//Create IntervalId to store setInterval in the future
let intervalId;

startBtn.addEventListener('click', () => {
    clearInterval(intervalId);
// if local exist, get that item and store in timerData, if not exist skip and run other line
    if(saveWatch){
        timerData = {
            hours : Number(localStorage.getItem("saveHrs")),
            mins : Number(localStorage.getItem("saveMins")),
            seconds : Number(localStorage.getItem('saveS')),
            milliseconds : Number(localStorage.getItem("saveMs"))
        }
    }
    intervalId = setInterval(updateTime, 10);
})
pauseBtn.addEventListener("click", () => {
    clearInterval(intervalId)
})
resetBtn.addEventListener("click", ()=> {
    clearInterval(intervalId); // stop the timer 
   timerData = {
    hours : 0,
    mins : 0,
    seconds : 0,
    milliseconds : 0,
}
   stopWatch.textContent = "00 : 00 : 00 : 000";
   localStorage.clear(saveWatch)
})
continueBtn.addEventListener("click", ()=> {
    clearInterval(intervalId); // clear interval first if not it will run double
    if(saveWatch){
        timerData ={
            hours : Number(localStorage.getItem("saveHrs")),
            mins : Number(localStorage.getItem("saveMins")),
            seconds : Number(localStorage.getItem('saveS')),
            milliseconds : Number(localStorage.getItem("saveMs"))
        }
    }
    intervalId = setInterval(updateTime, 10);
});

//After reload still put the UI the same
window.addEventListener("load", ()=> {
    saveWatch = localStorage.getItem("saveWatch");
    if(saveWatch){
        stopWatch.textContent = saveWatch;
    }
})

