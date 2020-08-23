import '../../assets/img/icon-34.png';
import '../../assets/img/icon-34_g.png';
import '../../assets/img/icon-34_r.png';
import '../../assets/img/icon-128.png';

console.log('This is the background page.');
console.log('Put the background scripts here.');

import mp3File from './aaa.mp3';

const wakeAudio = new Audio(mp3File);

const playSound = audioFile => {
    audioFile.play();
};

chrome.storage.onChanged.addListener(function(changes, namespace) {
    var temp = {};
    for (var key in changes) {
        var storageChange = changes[key].newValue;
        if (key === "restTime" && storageChange != 0){
            temp.restTime = storageChange;
        }else if (key === "startTime" && storageChange != 0){
            temp.startTime = storageChange;
        }else if (key === "workTime" && storageChange != 0){
            temp.workTime = storageChange;
        }
    }
    startTimer(temp);
});

const startTimer = times => {
    setInterval(() => {
      if (!!times.startTime) {
        const elapsed = new Date() - times.startTime;
        console.log(elapsed);
        const hours = ("0" + Math.floor(elapsed / 3600000)).slice(-2);
        const mins = ("0" + (Math.floor(elapsed / 60000) % 60)).slice(-2);
        const secs = ("0" + (Math.floor(elapsed / 1000) % 60)).slice(-2);
        const newW = !!((parseInt(hours) * 60 + parseInt(mins)) % (parseInt(times.restTime) + parseInt(times.workTime)) === times.workTime);
        if (newW){
            playSound(wakeAudio);
            alert("kjnn");
        }
      }
    }, 1000);
};

