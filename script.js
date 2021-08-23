var canvas = document.getElementById("canvas");
var firstPlayer = document.getElementById("player1");
var secondPlayer = document.getElementById("player2");

let p1 = 0;
let p2 = 0;
let currentMines1 = [];
let currentMines2 = [];
let currentLasers1 = [];
let currentLasers2 = [];

function checkMines1 () {
    if (currentMines1.length == 0) {
        alert("Bottom player wins. No mines from top player in 3 seconds.");
    }
}

function checkMines2 () {
    if (currentMines2.length == 0) {
        alert("Top player wins. No mines from bottom player in 3 seconds.");
    }
}

function move(e) {
    if (e.keyCode == 32) {
        startScreen.remove();
        setTimeout(checkMines1, 3000);
        setTimeout(checkMines2, 3000);
        setInterval(mineShot1, 10);
        setInterval(mineShot2, 10);
    }

    // shooting lasers
    if (e.keyCode == 83) {
        var laser = document.createElement("div");
        laser.classList.add("laser1");
        canvas.appendChild(laser);
        laser.style.left = p1 + 35 + "px";
        currentLasers2.push(laser);
        setTimeout(function() {laser.remove();}, 1000);
    }

        if (e.keyCode == 38) {
        var laser = document.createElement("div");
        laser.classList.add("laser2");
        canvas.appendChild(laser);
        laser.style.left = p2 + 35 + "px";
        currentLasers1.push(laser);
        setTimeout(function() {laser.remove();}, 1000);
    }

    // laying mines
    if (e.keyCode == 87) {
        var mine = document.createElement("div");
        mine.classList.add("mine");
        mine.style.backgroundColor = "lime";
        canvas.appendChild(mine);
        mine.style.left = p1 + 35 + "px";
        mine.style.top = 4 + "px";
        currentMines1.push(mine);
    }
    if (e.keyCode == 40) {
        var mine = document.createElement("div");
        mine.classList.add("mine");
        mine.style.backgroundColor = "orange";
        canvas.appendChild(mine);
        mine.style.left = p2 + 35 + "px";
        mine.style.top = 736 + "px";
        currentMines2.push(mine);
    }

    // moving left and right
    if (e.keyCode == 65) {
        p1 -= 40;
        if (p1 <= -1)
            p1 += 40;
        firstPlayer.style.left = p1 + "px";
    }
    if (e.keyCode == 68) {
        p1 += 40;
        if (p1 >= 960)
            p1 -= 40;
        firstPlayer.style.left = p1 + "px";
    }
    if (e.keyCode == 37) {
        p2 -= 40;
        if (p2 <= -1)
            p2 += 40;
        secondPlayer.style.left = p2 + "px";
    }
    if (e.keyCode == 39) {
        p2 += 40;
        if (p2 >= 960)
            p2 -= 40;
        secondPlayer.style.left = p2 + "px";
    }
}

function mineShot1() {
    for (let i = 0; i < currentMines1.length; i++) {
        let mineX = parseInt(window.getComputedStyle(currentMines1[i]).getPropertyValue("left"));
        let mineY = parseInt(window.getComputedStyle(currentMines1[i]).getPropertyValue("top"));
        for (let j = 0; j < currentLasers1.length; j++) {
            let laserX = parseInt(window.getComputedStyle(currentLasers1[j]).getPropertyValue("left"));
            let laserY = parseInt(window.getComputedStyle(currentLasers1[j]).getPropertyValue("top"));
            if ((mineX > laserX && mineX < laserX + 20 && mineY > laserY && mineY < laserY + 40) ||
                (mineX + 15 > laserX && mineX + 15 < laserX + 20 && mineY > laserY && mineY < laserY + 40) ||
                (mineX > laserX && mineX < laserX + 20 && mineY + 15 > laserY && mineY + 15 < laserY + 40) ||
                (mineX + 15 > laserX && mineX + 15 < laserX + 20 && mineY + 15 > laserY && mineY + 15 < laserY + 40)) {
                currentMines1[i].remove();
                currentMines1.splice(i, 1);
                if (currentMines1.length < 1) {
                    alert("Game Over. Bottom player wins");
                }
            }
        }
    }
}

function mineShot2() {
    for (let i = 0; i < currentMines2.length; i++) {
        let mineX = parseInt(window.getComputedStyle(currentMines2[i]).getPropertyValue("left"));
        let mineY = parseInt(window.getComputedStyle(currentMines2[i]).getPropertyValue("top"));
        for (let j = 0; j < currentLasers2.length; j++) {
            let laserX = parseInt(window.getComputedStyle(currentLasers2[j]).getPropertyValue("left"));
            let laserY = parseInt(window.getComputedStyle(currentLasers2[j]).getPropertyValue("top"));
            if ((mineX > laserX && mineX < laserX + 20 && mineY > laserY && mineY < laserY + 40) ||
                (mineX + 15 > laserX && mineX + 15 < laserX + 20 && mineY > laserY && mineY < laserY + 40) ||
                (mineX > laserX && mineX < laserX + 20 && mineY + 15 > laserY && mineY + 15 < laserY + 40) ||
                (mineX + 15 > laserX && mineX + 15 < laserX + 20 && mineY + 15 > laserY && mineY + 15 < laserY + 40)) {
                currentMines2[i].remove();
                currentMines2.splice(i, 1);
                if (currentMines2.length < 1) {
                    alert("Game Over. Top player wins");
                }
            }
        }
    }
}

document.onkeydown = move;