console.log("hello");

// songs slider

$(function() {
    $('.main-carousel').flickity({
        // options
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        dragThreshold: 100
    });
});

// songlist

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let masterSongNameRes = document.getElementById('masterSongNameRes');
let masterImg = document.getElementById('masterImg');
let songItems = Array.from(document.getElementsByClassName('box'));
let repeat = document.getElementById('repeat');
let shuffle = document.getElementById('shuffle');

let songs = [
    { songName: "On My Way", filePath: "songs/1.mp3", coverPath: "images/on-my-way.jpg" },
    { songName: "Señorita", filePath: "songs/2.mp3", coverPath: "images/senorita.jpg" },
    { songName: "Stay", filePath: "songs/3.mp3", coverPath: "images/stay.jpg" },
    { songName: "See You Again", filePath: "songs/4.mp3", coverPath: "images/see-you-again.jpg" },
    { songName: "Let Me Love You", filePath: "songs/5.mp3", coverPath: "images/let-me-love-you.jpg" },
    { songName: "Let Me Down Slowly", filePath: "songs/6.mp3", coverPath: "images/let-me-down-slowly.jpg" },
    { songName: "Girls Like You", filePath: "songs/7.mp3", coverPath: "images/girls-like-you.jpg" },
    { songName: "Rockabye", filePath: "songs/8.mp3", coverPath: "images/rockabye.jpg" },
    { songName: "Pasoori", filePath: "songs/9.mp3", coverPath: "images/pasoori.jpg" },
    { songName: "Kehndi Hundi Si", filePath: "songs/10.mp3", coverPath: "images/kehndi-hundi-si.jpg" },
    { songName: "High Rated Gabru", filePath: "songs/11.mp3", coverPath: "images/high-rated-gabru.jpg" },
    { songName: "Backbone", filePath: "songs/12.mp3", coverPath: "images/backbone.jpg" },
    { songName: "Lahore", filePath: "songs/13.mp3", coverPath: "images/lahore.jpg" },
    { songName: "Laung Laachi", filePath: "songs/14.mp3", coverPath: "images/laung-laachi.jpg" },
    { songName: "Raataan Lambiyan", filePath: "songs/15.mp3", coverPath: "images/raataan-lambiyan.jpg" },
    { songName: "Khairiyat", filePath: "songs/16.mp3", coverPath: "images/khairiyat.jpg" },
    { songName: "Shayad", filePath: "songs/17.mp3", coverPath: "images/shayad.jpg" },
    { songName: "Dil Mein Ho Tum", filePath: "songs/18.mp3", coverPath: "images/dil-mein-ho-tum.jpg" },
    { songName: "Aayat", filePath: "songs/19.mp3", coverPath: "images/aayat.jpg" },
    { songName: "Muskurane", filePath: "songs/20.mp3", coverPath: "images/muskurane.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("mainImg")[0].src = songs[i].coverPath;
})


masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})

audioElement.addEventListener('timeupdate', () => {

    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

audioElement.addEventListener('ended', () => {
    if (songIndex >= 19) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterSongNameRes.innerText = songs[songIndex].songName;
    masterImg.src = songs[songIndex].coverPath;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-play');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-play');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        masterSongNameRes.innerText = songs[songIndex].songName;
        masterImg.src = songs[songIndex].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 19) {
        songIndex = 0
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongNameRes.innerText = songs[songIndex].songName;
    masterImg.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongNameRes.innerText = songs[songIndex].songName;
    masterImg.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('repeat').addEventListener('click', () => {
    let getText = repeat.innerText;
    switch (getText) {
        case "repeat":
            repeat.innerText = "repeat_one";
            audioElement.addEventListener('ended', () => {
                songIndex--;
                audioElement.src = `songs/${songIndex+1}.mp3`;
                masterSongName.innerText = songs[songIndex].songName;
                masterSongNameRes.innerText = songs[songIndex].songName;
                masterImg.src = songs[songIndex].coverPath;
                audioElement.play();
            })
            break;
        default:
            repeat.innerText = "repeat";
            audioElement.addEventListener('ended', () => {
                songIndex++;
                audioElement.src = `songs/${songIndex+1}.mp3`;
                masterSongName.innerText = songs[songIndex].songName;
                masterSongNameRes.innerText = songs[songIndex].songName;
                masterImg.src = songs[songIndex].coverPath;
                audioElement.play();
            })
            break;
    }

})

document.getElementById('shuffle').addEventListener('click', () => {
    let getText = shuffle.innerText;
    switch (getText) {
        case "shuffle":
            shuffle.innerText = "shuffle_on";
            songIndex = Math.floor(Math.random() * 19);
            break;
        default:
            shuffle.innerText = "shuffle";
            songIndex++;
            break;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongNameRes.innerText = songs[songIndex].songName;
    masterImg.src = songs[songIndex].coverPath;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})



// volume

var e = document.querySelector('.volume-slider-con');
var eInner = document.querySelector('.volume-slider');
var audio = audioElement;
var drag = false;
e.addEventListener('mousedown', function(ev) {
    drag = true;
    updateBar(ev.clientX);
});
document.addEventListener('mousemove', function(ev) {
    if (drag) {
        updateBar(ev.clientX);
    }
});
document.addEventListener('mouseup', function(ev) {
    drag = false;
});
var updateBar = function(x, vol) {
    var volume = e;
    var percentage;
    if (vol) {
        percentage = vol * 100;
    } else {
        var position = x - volume.offsetLeft;
        percentage = 100 * position / volume.clientWidth;
    }

    if (percentage > 100) {
        percentage = 100;
    }
    if (percentage < 0) {
        percentage = 0;
    }
    eInner.style.width = percentage + '%';
    audio.volume = percentage / 100;
};

let sound = document.getElementById('sound');
document.getElementById('sound').addEventListener('click', () => {
    let getText = sound.innerText;
    switch (getText) {
        case "volume_up":
            sound.innerText = "volume_off";
            eInner.style.width = 0 + '%';
            audio.volume = 0 / 100;
            break;
        default:
            sound.innerText = "volume_up";
            eInner.style.width = 100 + '%';
            audio.volume = 100 / 100;
            break;
    }
})