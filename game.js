let score = 0;
let producers = 0;
let managers = 0;
let tickSpeed = 1; // Default tick speed

document.getElementById('clicker').addEventListener('click', function() {
    score++;
    updateScore();
});

document.getElementById('producer').addEventListener('click', function() {
    if (score >= 10) {
        score -= 10;
        producers++;
        updateScore();
    }
});

document.getElementById('manager').addEventListener('click', function() {
    if (score >= 100) {
        score -= 100;
        managers++;
        updateScore();
    }
});

setInterval(function() {
    if (producers > 0 || managers > 0) {
        let increment = producers + producers * managers;
        score += increment;
        updateScore();
    }
}, 1000 / tickSpeed);


function updateScore() {
    document.getElementById('counter').innerText = score;
    if (score >= 10) {
        document.getElementById('unlockProduction').style.display = 'block';
        document.getElementById('producer').style.display = 'block';
    }
    if (score >= 100) {
        document.getElementById('unlockManagement').style.display = 'block';
        document.getElementById('manager').style.display = 'block';
    }
}

function openTab(tabId) {
    document.getElementById('game').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
    document.getElementById(tabId).style.display = 'block';
}

document.getElementById('reset').addEventListener('click', function() {
    score = 0;
    producers = 0;
    managers = 0;
    updateScore();
});

document.getElementById('import').addEventListener('click', function() {
    const importedState = JSON.parse(prompt('Please paste your exported game state:'));
    if (importedState && typeof importedState.importedScore === 'number' && typeof importedState.importedProducers === 'number' && typeof importedState.importedManagers === 'number') {
        score = importedState.importedScore;
        producers = importedState.importedProducers;
        managers = importedState.importedManagers;
        updateScore();
    }
});

document.getElementById('export').addEventListener('click', function() {
    alert(JSON.stringify({ score, producers, managers }));
});

document.getElementById('tickSpeed').addEventListener('change', function(event) {
    tickSpeed = event.target.value;
});

// Open the game tab by default
openTab('game');
