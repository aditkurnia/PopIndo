const provinces = [
    "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan",
    "Bengkulu", "Lampung", "Kepulauan Bangka Belitung", "Kepulauan Riau", "DKI Jakarta",
    "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Banten", "Bali",
    "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Barat", "Kalimantan Tengah",
    "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara",
    "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo",
    "Sulawesi Barat", "Maluku", "Maluku Utara", "Papua Barat", "Papua"
];

const provinceDropdown = document.getElementById('province-dropdown');
const startGameButton = document.getElementById('start-game');
const gameContainer = document.getElementById('game-container');
const clickArea = document.getElementById('click-area');
const popImage = document.getElementById('pop-image');
const scoreValue = document.getElementById('score-value');
const topProvinces = document.getElementById('top-provinces');

let selectedProvince = '';
let score = 0;
let leaderboard = {};

// Populate province dropdown
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    option.textContent = province;
    provinceDropdown.appendChild(option);
});

startGameButton.addEventListener('click', () => {
    selectedProvince = provinceDropdown.value;
    if (selectedProvince) {
        document.getElementById('province-selection').style.display = 'none';
        gameContainer.style.display = 'block';
        initGame();
    } else {
        alert('Silakan pilih provinsi terlebih dahulu!');
    }
});

function initGame() {
    score = 0;
    updateScore();
    clickArea.addEventListener('click', handleClick);
}

function handleClick() {
    score++;
    updateScore();
    toggleImage();
    updateLeaderboard();
}

function toggleImage() {
    popImage.src = popImage.src.includes('image1.jpg') ? 'image2.jpg' : 'image1.jpg';
}

function updateScore() {
    scoreValue.textContent = score;
}

function updateLeaderboard() {
    leaderboard[selectedProvince] = (leaderboard[selectedProvince] || 0) + 1;
    const sortedProvinces = Object.entries(leaderboard)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    topProvinces.innerHTML = '';
    sortedProvinces.forEach(([province, score]) => {
        const li = document.createElement('li');
        li.textContent = `${province}: ${score}`;
        topProvinces.appendChild(li);
    });

    // Di sini Anda akan mengirim skor ke server untuk disimpan di database MySQL
    // Contoh: sendScoreToServer(selectedProvince, score);
}

// Fungsi ini harus diimplementasikan di sisi server
// function sendScoreToServer(province, score) {
//     fetch('/api/update-score', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ province, score }),
//     })
//     .then(response => response.json())
//     .then(data => console.log('Score updated:', data))
//     .catch(error => console.error('Error updating score:', error));
// }

function sendScoreToServer(province, score) {
    fetch('update_score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ province, score }),
    })
    .then(response => response.json())
    .then(data => console.log('Score updated:', data))
    .catch(error => console.error('Error updating score:', error));
}