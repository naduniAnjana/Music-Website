
const darshan = [
    {
        id: 1,
        songName: `Jeeja <br>
                    <div class="subtitle">Darshan Raval</div>`,
        poster: "images/darshan/music1.jpg",
    },

    {
        id: 2,
        songName: `Tu Hai <br>
                    <div class="subtitle">Darshan Raval, Prakriti Giri</div>`,
        poster: "images/darshan/music2.jpg",
    },

    {
        id: 3,
        songName: `Soni Soni <br>
                    <div class="subtitle">Darshan Raval, Jonita Gandhi</div>`,
        poster: "images/darshan/music3.jpg",
    },

    {
        id: 4,
        songName: `Tera Zikr <br>
                    <div class="subtitle">Darshan Raval</div>`,
        poster: "images/darshan/music4.jpg",
    },

    {
        id: 5,
        songName: `Hawa Banke <br>
                    <div class="subtitle">Darshan Raval</div>`,
        poster: "images/darshan/music5.jpg",
    },

    {
        id: 6,
        songName: `Do Din <br>
                    <div class="subtitle">Darshan Raval</div>`,
        poster: `images/darshan/music6.jpg`,
    },

    {
        id: 7,
        songName: `Mahiye Jinna Sohna <br>
                    <div class="subtitle">Darshan Raval </div>`,
        poster: `images/darshan/music7.jpg`,
    }
];


// Get references to elements
let masterPlay = document.getElementById('masterPlay');
let poster_master_play = document.getElementById('poster_master_play').querySelector('img');
let title = document.getElementById('title');
let container = document.querySelector('.container'); // Assuming there's a container class
let playpauseBtn = masterPlay; // Assuming masterPlay acts as the play/pause button

// Function to play music and update UI
function playMusic() {
    container.classList.add("paused");
    playpauseBtn.querySelector("i").innerText = "pause"; // Update this to match your icon library
    music.play();
}

// Function to pause music and update UI
function pauseMusic() {
    container.classList.remove("paused");
    playpauseBtn.querySelector("i").innerText = "play_arrow"; // Update this to match your icon library
    music.pause();
}

// Update song items with correct details
Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    const img = e.getElementsByTagName('img')[0];
    const h5 = e.getElementsByTagName('h5')[0];

    if (img) {
        img.src = darshan[i].poster;
    } else {
        console.error('Image element not found');
    }
    
    if (h5) {
        h5.innerHTML = darshan[i].songName;
    } else {
        console.error('h5 element not found');
    }
});

// Function to reset all play icons to 'play'
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el) => {
        el.classList.remove('pause');
        el.classList.add('play');
    });
};

// Function to reset all song backgrounds
const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((el) => {
        el.style.background = 'rgb(105, 105, 105, .0)';
    });
};

let index = 0;

// Event listener for each song in the playlist
Array.from(document.getElementsByClassName('playListPlay')).forEach((e) => {
    e.addEventListener('click', (el) => {
        index = el.target.id;

        // Update the audio source and poster image
        music.src = `songs/darshan/${index}.mp3`;
        
        if (poster_master_play) {
            poster_master_play.src = `images/darshan/${index}.jpg`; // Adjust image path if needed
        } else {
            console.error('Poster image element not found');
        }

        // Play the music and update UI
        playMusic();

        // Update song details
        let songTitles = darshan.filter((els) => els.id == index);
        songTitles.forEach(elss => {
            let { songName } = elss;
            title.innerHTML = songName;
        });

        // Update background and play icons
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
        makeAllPlays();
        el.target.classList.add('pause');
        el.target.classList.remove('play');
    });
});

// Toggle play/pause based on audio state
masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        playMusic();
    } else {
        pauseMusic();
    }
});

document.getElementById('next').addEventListener('click', nextMusic);
document.getElementById('prev').addEventListener('click', prevMusic);

let musicIndex = 1;


function nextMusic() {
    musicIndex++;
    if (musicIndex > darshan.length) {
        musicIndex = 1; // Wrap around to the first song
    }
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

function prevMusic() {
    musicIndex--;
    if (musicIndex < 1) {
        musicIndex = darshan.length; // Wrap around to the last song
    }
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

function loadMusic(index) {
    // Ensure music and poster are updated correctly
    music.src = `songs/darshan/${index}.mp3`;
    if (poster_master_play) {
        poster_master_play.src = `images/darshan/${index}.jpg`;
    }

    // Update song details
    let songTitles = darshan.filter((els) => els.id == index);
    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    });

    // Ensure play/pause icon is updated
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllPlays();
}

function playingSong() {
    // Update UI to reflect the currently playing song
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el) => {
        if (el.id == musicIndex) {
            el.classList.add('pause');
            el.classList.remove('play');
        } else {
            el.classList.add('play');
            el.classList.remove('pause');
        }
    });
}


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let progressArea = container.querySelector(".progress-area");
let music = document.getElementById('main-audio');
let progressWidth = document.getElementById('progressBar');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    

    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);

    // console.log(min1);
    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    currentEnd.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);


    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }
    currentStart.innerText = `${min2}:${sec2}`;


    let progressBar = parseInt((music_curr / music_dur) * 100);
    progressWidth.style.width = `${progressBar}%`;

});

progressArea.addEventListener("click", (e) => {
    let progressBar = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = music.duration;

    music.currentTime = (clickedOffsetX / progressBar) * songDuration;
    playMusic();
});


const repeatBtn = container.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "playback shuffled");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});

music.addEventListener("ended", () => {
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            music.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * ariana.length) * 1);
            do {
                randIndex = Math.floor((Math.random() * ariana.length) * 1);
            } while (musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            playingSong();
            break;
    }
});


document.addEventListener("DOMContentLoaded", () => {
    // Load the first song's details
    let firstSongIndex = 1;
    loadMusic(firstSongIndex);
    playingSong();

    // Wait for metadata to be loaded before displaying the duration
    music.addEventListener('loadedmetadata', () => {
        let music_dur = music.duration;

        let min1 = Math.floor(music_dur / 60);
        let sec1 = Math.floor(music_dur % 60);

        if (sec1 < 10) {
            sec1 = `0${sec1}`;
        }
        currentEnd.innerText = `${min1}:${sec1}`;
    });
});