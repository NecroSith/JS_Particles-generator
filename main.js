'use strict';

const POINT_COUNT = 10,
    POINT_SPEED = 5;

const canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d'),
    points = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// start();

// function start() {
//     requestAnimationFrame(tick);
// }

for (let i = 0; i < POINT_COUNT; i++) {
    const point = {
        x: 100,
        y: 100,
        angle: getRandom(0, 2 * Math.PI)
    }
    points.push(point);
}


tick();

function tick() {
    drawBackground();
    movePoints();
    drawPoints();
    requestAnimationFrame(tick);
}

function drawBackground() {
    context.fillStyle = '#ff4848';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// function createPoints() {
//     for (let i = 0; i < POINT_COUNT; i++) {
//         const point = {
//             x: 100,
//             y: 100,
//             angle: getRandom(0, 2 * Math.PI)
//         }
//         points.push(point);
//     }

// }

function drawPoints() {
    // * If this function is here it creates awesome effect
    // TODO make a game based on this effect where the player gotta get through sun's radiation to get a chest (scientific data) and get back
    // createPoints()
    for (const point of points) {
        context.beginPath();
        context.fillStyle = '#fff';
        context.arc(point.x, point.y, 2, 0, 2 * Math.PI);
        context.fill();
    }
}

function movePoints() {
    for (const point of points) {
        point.x = point.x + POINT_SPEED * Math.cos(point.angle);
        point.y = point.y + POINT_SPEED * Math.sin(point.angle);

        if (point.x < 0) {
            point.x = canvas.width + point.x;
        }
        if (point.x > canvas.width) {
            point.x = canvas.width - point.x;
        }
        if (point.y < 0) {
            point.y = canvas.height + point.y;
        }
        if (point.y > canvas.height) {
            point.y = canvas.height - point.y;
        }
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}