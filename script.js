const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const previousButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const playButton = document.getElementById('play');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
]

let isPlaying = false;

//Play Method
function play() {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pause() {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
    music.pause();
}


// Event Listener
playButton.addEventListener('click', () => isPlaying ? pause() : play());

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//current Song
let songIndex = 0;

// Next Song
function nextSong() {

    songIndex++;

    if(songIndex > songs.length-1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    play();
}

function previousSong() {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    play();
}

// On load, select first

function updateProgressBar(event) {
    if(isPlaying){
        const {duration, currentTime} = event.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`

        // calculate duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration % 60);

        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Delay  switching duration
        if (durationSeconds) {
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }

        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;

    }
}

function setProgressBar(event) {
    
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const {duration} = music;
    music.currentTime = (clickX /width) * duration;
}

nextButton.addEventListener('click', nextSong);
previousButton.addEventListener('click', previousSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

loadSong(songs[songIndex]);