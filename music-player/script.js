const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')


const songs = [
    {
        name: 'lutan-1',
        displayName: 'Lutan Fyah - Mama Love',
        artist: 'Lutan Fyah',
    },
    {
        name: 'josh-1',
        displayName: 'Josh Breaks - Easy',
        artist: 'Josh Breaks',
    },
    {
        name: 'happy-1',
        displayName: 'Το Τραγούδι Του Καιρού',
        artist: 'Kostas Doxas',
    },
    {
        name: 'eros-1',
        displayName: 'Un emozione per sempre',
        artist: 'Eros Ramazzotti',
    },
    {
        name: 'konstantinos-1',
        displayName: 'Μετρώ Αντίστροφα (5,4,3,2,1)',
        artist: 'Κωνσταντίνος Κουφός',
    }

]

let isPLaying = false;

function playSong() {
    isPLaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause')
    music.play();
}

function pauseSong() {
    isPLaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play')
    music.pause()
}


playBtn.addEventListener('click', () => (isPLaying ? pauseSong() : playSong()))

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src =`music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

let songIndex = 0;

function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length -1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++;
    if(songIndex > songs.length -1){
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex])
    playSong()
}

loadSong(songs[songIndex])


function updateProgressBar(e) {
    if (isPLaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = ( currentTime / duration ) * 100;
        progress.style.width = `${progressPercent}%`
        // Ovde prikazujemo na displeju vreme odbrojavanja
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
            // Ovde prikazujemo na displeju vreme odbrojavanja
            const currentMinutes = Math.floor(currentTime / 60)
            let currentSeconds = Math.floor(currentTime % 60)
            if (currentSeconds < 10) {
                currentSeconds = `0${currentSeconds}`
            }
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

        // Postavljamo progres bar da moze kada kliknemo da ucita od bilo koje sekunde

        function setProgressBar(e) {
            const width = this.clientWidth;
            const clickX = e.offsetX;
            const { duration } = music;
            music.currentTime = (clickX / width) * duration;
        }

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended',nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)
