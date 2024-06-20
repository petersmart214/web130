import "./physics.js";
import { PhysObject, DrivableObject, process_phys, Collider } from "./physics.js";
import "./pid.js";
import {pid} from "./pid.js";
var item = null;
var pids = null;
var loop = false;
var clicking = false;
var mouse_pos = [0, 0];

//TODO BLAST EM GONE
var test_tmp = new PhysObject(10, [0, 0], [100, 100], new Collider([100, 100], [150, 150]));
load();

//this is disgusting
document.addEventListener("keydown", (event) => {console.log(event.key); if ((!event.isComposing) && event.key === "Escape") end()})
document.addEventListener("keydown", (event) => {if ((!event.isComposing) && event.key === "Enter") start()});
document.addEventListener("mousemove", (event) => {mouse_pos = [event.clientX, event.clientY]});
document.addEventListener("mousedown", (event) => {clicking = true});
document.addEventListener("mouseup", (event) => {clicking = false; item[0].set_accel([0, 0])});

function load() {
    item = [new DrivableObject(10, [0, 0], [50, 50], new Collider([150, 100], [150, 150])), document.getElementById("runner-canvas")]
    pids = [new pid(5, 2, 0.1), new pid(5, 2, 0.1)];
}

async function process() {
    while (loop) {
        //Partial copypaste from https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
        var canvas = document.getElementById('test-canvas');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath(); // Start a new path
        ctx.moveTo(...test_tmp.collider.position1); 
        ctx.lineTo(...test_tmp.collider.position2); 
        ctx.stroke(); 

        //much more disgusting
        item[1].style.setProperty('top', item[0].position[1].toString()); 
        item[1].style.setProperty('left', item[0].position[0].toString());
        process_phys([item[0], test_tmp]);
        //...possibly disgusting? prone to errors if mouseup is never called. (like moving mouse out of window) Possibly inefficent.
        if (clicking) {
        //using lists like this, while possibly more efficient, is a pain for readability and programming...
            item[0].set_accel([Math.floor(pids[0].process(mouse_pos[0], item[0].position[0], item[0].velocity[0]) * 10), Math.floor(pids[1].process(mouse_pos[1], item[0].position[1], item[0].velocity[1]) * 10)]);
        }
        await new Promise(r => setTimeout(r, 25));
    }
}

function start() {
    if(loop === false) {
        loop = true;
        process();
    }
}

function end() {
    loop = false;
}