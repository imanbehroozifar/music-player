//Music

const songs = [
    {
        path: 'media/SirvanKhosravi-Emrooz Mikham.mp3',
        displayName: 'Emrooz Mikham behet begam',
        artist: 'Sirvan Khosravi',
        cover: 'images/sirvan-khosravi.jpg'
    },
    {
        path: 'media/Ali Yasini - Alaki (128).mp3',
        displayName: 'Alaki',
        artist: 'Ali Yasini',
        cover: 'images/yasini.jpg'
    },
    {
        path: 'media/Ehsan Khajeh Amiri - Yekio Daram (128).mp3',
        displayName: 'Yekio Daram',
        artist: 'Ehsan Khajeh Amiri',
        cover: 'images/ehsan.jpg'
    },
    {
        path: 'media/Garsha Rezaei - Mage Paeez Oomade 128.mp3',
        displayName: 'Mage Paeez Oomade',
        artist: 'Garsh Razaei',
        cover: 'images/rezaii.jpg'
    },
    {
        path: 'media/Mehdi Ahmadvand - Mashine Zaman [128].mp3',
        displayName: 'Mashine Zaman',
        artist: 'Mehdi Ahmadvand',
        cover: 'images/Mehdi-Ahmadvand.jpg'
    }
]

//variables

const background = document.querySelector('#background'),
    image = document.querySelector('#cover'),
    title = document.querySelector("#title"),
    artist = document.querySelector("#artist"),
    music = document.querySelector('audio'),
    currentTimeEl = document.querySelector('#current-time'),
    durationEl = document.querySelector('#duration'),
    progressContainer = document.querySelector('#progress-container'),
    progress = document.querySelector('#progress'),
    prevBtn = document.querySelector("#prev"),
    playBtn = document.querySelector("#play"),
    nextBtn = document.querySelector("#next")


//check if playing

let isPlaying = false

//paly
const playSong = () => {
    isPlaying = true
    playBtn.src = 'svgs/pause.svg'
    music.play()
}
//pause
const pauseSong = () => {
    isPlaying = false
    playBtn.src = 'svgs/play.svg'
    music.pause()

}
//play or pause
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

//update DOM

const loadSong = (song) => {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = song.path
    changeCover(song.cover)
}

const changeCover = (cover) => {
    image.classList.remove('active')
    setTimeout(() => {
        image.src = cover;
        image.classList.add("active");
    }, 100);
    background.src = cover;
}

// current song
let songIndex = 0

const prevSong = () => {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex]);
    playSong()

}
const nextSong = () => {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex]);
    playSong()
}
// On Load - Select First Song
loadSong(songs[songIndex]);

// update progress bar & time

const updateProgressBar = (event) => {
    if (isPlaying) {
        const duration = event.target.duration
        const currentTime = event.target.currentTime
        //darsad pishraft
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`

        calcDuration(duration)
        calcCurrentTime(currentTime)
    }
}

const calcDuration = (totalSecound) => {
    const time = converetToHour(totalSecound)
    let hour = time.hour
    let minutes = time.minutes
    let secound = Math.floor(time.secound)
    if (hour < 10) {
        hour = `0${hour}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (secound < 10) {
        secound = `0${secound}`
    }
    if (minutes || secound) {
        durationEl.textContent = `${minutes}:${secound}`
    }
}

const calcCurrentTime = (totalSecound) => {
    const time = converetToHour(totalSecound)
    let hour = time.hour
    let minutes = time.minutes
    let secound = Math.floor(time.secound)
    if (hour < 10) {
        hour = `0${hour}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (secound < 10) {
        secound = `0${secound}`
    }

    currentTimeEl.textContent = `${minutes}:${secound}`

}


const converetToHour = (totalSecound) => {
    const totalMinutes = Math.floor(totalSecound / 60)
    // totalMinutes = 5
    const secound = totalSecound % 60
    //secound = 2.3
    const hour = Math.floor(totalMinutes / 60)
    //hour = 0
    const minutes = Math.floor(totalSecound / 60)
    return { hour, minutes, secound }
}

const setProgressBar = (event) => {
    const width = event.target.clientWidth;
    const clickX = event.offsetX;
    const duration = music.duration;
    music.currentTime = (clickX / width) * duration;
}


// EventListeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)

