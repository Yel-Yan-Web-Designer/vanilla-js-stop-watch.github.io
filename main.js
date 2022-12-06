let stopWatch = document.querySelector(".stop-watch"),
    startBtn = document.querySelector('.start'),
    pauseBtn = document.querySelector(".pause"),
    restartBtn = document.querySelector(".restart"),
    continueBtn = document.querySelector(".continue");


let [hours, mins, seconds, milliseconds] = [0, 0, 0, 0];
let displayWatch;

// reusable funtion to run watch 
function startTime () {
// 10 ms === 0.1seconds
    milliseconds += 10;

    if(milliseconds === 1000){
        milliseconds = 0;
        seconds += 1;
    }

    if(seconds === 60){
        seconds = 0;
        mins += 1;
    }

    if(mins === 60){
        mins = 0;
        hours += 1;
    }

    if(hours === 60) {
        hours = 0;
    }    

    let h = hours < 10 ? "0" + hours : hours;
    let m = mins < 10 ? "0" + mins : mins;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 100 ? "0" + milliseconds : milliseconds;

    displayWatch = `${h} : ${m} : ${s} : ${ms}`;

    localStorage.setItem("saveWatch", displayWatch);
    stopWatch.textContent =  displayWatch || localStorage.getItem("saveWatch");
}
// keep track of setInterval set in global
let intervalId;
// start the watch 
startBtn.addEventListener("click", () => {
    clearInterval(intervalId)
    intervalId = setInterval(startTime, 10);
})

pauseBtn.addEventListener("click", () => {
    clearInterval(intervalId);
})

restartBtn.addEventListener("click", ()=>{
    [hours, mins, seconds, milliseconds] = [0, 0, 0, 0];
    stopWatch.textContent =  `${hours}0 : ${mins}0 : ${seconds}0 : ${milliseconds}00`;
    localStorage.clear(displayWatch);
})
continueBtn.addEventListener("click", ()=> {
    //clearInterval first if not starttime will run double
    clearInterval(intervalId);
    intervalId = setInterval(startTime, 10);
})


window.addEventListener("load", () => {
    const saveWatch = localStorage.getItem("saveWatch");

    if( saveWatch){
        stopWatch.textContent = saveWatch;
    }
})

/**
 * Create four variables that keep track of hours,mins, and seconds, milliseconds
 * Set all of them to zero at the beginning ?
 * Data type wll be "number"
 */

/**
 * Problem, save in local storage when we click start btn, continue btn
 * clear local storage when click restart
 */