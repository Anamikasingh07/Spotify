console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/song1.mp3');
audioElement.volume = 1.0;

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let volumeSlider = document.getElementById('volumeSlider');

let songs = [
  { songName: "Believer", filepath: "songs/song1.mp3", coverPath: "images/coverpage1.png" },
  { songName: "BrownRangDe", filepath: "songs/song2.mp3", coverPath: "images/coverpage2.png" },
  { songName: "Bekhayali", filepath: "songs/song3.mp3", coverPath: "images/coverpage3.png" },
  { songName: "LoveStory", filepath: "songs/song4.mp3", coverPath: "images/coverpage4.png" },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});
myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

volumeSlider.addEventListener('input', () => {
  audioElement.volume = volumeSlider.value / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((el) => {
    el.classList.remove('fa-circle-pause');
    el.classList.add('fa-circle-play');
  });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
  });
});

document.getElementById('next').addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = songs[songIndex].filepath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  audioElement.src = songs[songIndex].filepath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
});

// ✅ Smart Search in navbar
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  songItems.forEach((element, i) => {
    const songName = songs[i].songName.toLowerCase();
    element.style.display = songName.includes(query) ? 'flex' : 'none';
  });
});
