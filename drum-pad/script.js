const drumPads = document.querySelectorAll('.drum-pad');
const display = document.getElementById('display');

const playClip = (pad) => {
    const audio = pad.querySelector('.clip');
    audio.currentTime = 0;
    display.innerText = pad.id;
    audio.play();
};

drumPads.forEach((pad) => {
    pad.addEventListener('click', () => {
    playClip(pad);
    pad.classList.add('active');
    setTimeout(() => pad.classList.remove('active'), 100);
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    const pad = document.querySelector(`.drum-pad[data-key="${key}"]`);

    if (pad) {
    playClip(pad);
    pad.classList.add('active');
    setTimeout(() => pad.classList.remove('active'), 100);
    }
});