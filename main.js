'use strict';

const POINT_COUNT = 50,
    POINT_SPEED = 2,
    LINE_MIN_DISTANCE = 150;

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
        x: getRandom(0, canvas.width),
        y: getRandom(0, canvas.height),
        angle: getRandom(0, 2 * Math.PI)
    }
    points.push(point);
}


tick();

function tick() {
    drawBackground();
    movePoints();
    drawPoints();
    drawLines();
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

function drawLines() {
    for (let i = 0; i < POINT_COUNT - 1; i++) {
        for (let j = i + 1; j < POINT_COUNT; j++) {
            const pointA = points[i],
                pointB = points[j],
                dist = getDistance(pointA, pointB);

            if (dist <= LINE_MIN_DISTANCE) {
                context.beginPath();
                context.strokeStyle = '#fff';
                context.lineWidth = (1 - dist / LINE_MIN_DISTANCE) ** 0.8;
                context.moveTo(pointA.x, pointA.y);
                context.lineTo(pointB.x, pointB.y);
                context.stroke();
            }
        }
    }
}

function getDistance(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + ((a.y - b.y) ** 2));
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}