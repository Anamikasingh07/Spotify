console.log("welcome to Spotify");
let songIndex =0;
let audioElement =new Audio ('song1.mp3');
let masterplay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs =[
   {songName: "Believer" , filepath:"song1.mp3", coverPath: "coverpage1.png"},
    {songName: "BrownRangDe" , filepath:"song2.mp3", coverPath: "coverpage2.png"},
    {songName: "Bekhayali" , filepath:"song3.mp3", coverPath: "coverpage3.png"},
    {songName: "LoveStory" , filepath:"song4.mp3", coverPath: "coverpage4.png"},

]
songItems.forEach((element,i)=>{
element.getElementsByTagName("img")[0].src = songs[i].coverPath;
element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
 
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity =1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate',()=>{
    
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
 
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays =()=>{
    e.target.classList.add('fa-circle-pause');
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
       element.classList.remove('fa-circle-pause'); 
        element.classList.add('fa-circle-play'); 
       
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
console.log(e.target);
makeAllPlays();

songIndex = parseInt(e.target.id);
e.target.classList.remove('fa-circle-play');
e.target.classList.add('fa-circle-pause');
audioElement.src = '$(songIndex+1).mp3';
masterSongName.innerText = songs[songIndex].songName;
audioElement.currentTime=0;
audioElement.play();
masterPlay.classList.remove('fa-circle-play');
masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=3){
        songIndex = 0
    }else{
        songIndex+= 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;

    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0
    }else{
        songIndex-= 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;

    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
 