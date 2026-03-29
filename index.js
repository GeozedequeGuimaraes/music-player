const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const skipForward = document.getElementById('skipForward');
const skipBack = document.getElementById('skipBack');
const albumArt = document.getElementById('albumArt');

// Formatar tempo em m:ss
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

// Play / Pause
playBtn.addEventListener('click', () => {
    if (audio.paused || audio.ended) {
        audio.play();
        playBtn.querySelector('.play-icon').classList.add('hide');
        playBtn.querySelector('.pause-icon').classList.remove('hide');
        albumArt.classList.add('spinning');
    } else {
        audio.pause();
        playBtn.querySelector('.play-icon').classList.remove('hide');
        playBtn.querySelector('.pause-icon').classList.add('hide');
        albumArt.classList.remove('spinning');
    }
});

// Atualizar progresso e tempo
audio.addEventListener('timeupdate', () => {
    const current = audio.currentTime;
    const duration = audio.duration;

    if (duration) {
        progressBar.value = current;
        progressBar.max = duration;

        // Atualizar gradiente visual da barra
        const percent = (current / duration) * 100;
        progressBar.style.background = `linear-gradient(to right, rgba(95, 128, 177, 0.96) ${percent}%, rgba(176, 177, 240, 0.4) ${percent}%)`;
    }

    currentTimeEl.textContent = formatTime(current);
});

// Quando metadata carrega, mostrar duracao total
audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
    progressBar.max = audio.duration;
});

// Clicar na barra para pular
progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
});

// Skip +10 / -10
skipForward.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
});

skipBack.addEventListener('click', () => {
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
});

// Quando a musica termina, resetar
audio.addEventListener('ended', () => {
    playBtn.querySelector('.play-icon').classList.remove('hide');
    playBtn.querySelector('.pause-icon').classList.add('hide');
    albumArt.classList.remove('spinning');
    progressBar.value = 0;
    progressBar.style.background = 'rgba(176, 177, 240, 0.4)';
    currentTimeEl.textContent = '0:00';
});
