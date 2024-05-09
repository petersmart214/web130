import "./physics.js";
import { PhysObject, DrivableObject, process_phys } from "./physics.js";
import "./pid.js";
import {pid} from "./pid.js";
var item = null;
var pids = null;
var loop = false;
var clicking = false;
var mouse_pos = [0, 0];
load()

document.addEventListener("keydown", (event) => {console.log(event.key); if ((!event.isComposing) && event.key === "Escape") end()})
document.addEventListener("keydown", (event) => {if ((!event.isComposing) && event.key === "Enter") start()});
document.addEventListener("mousemove", (event) => {mouse_pos = [event.clientX, event.clientY]});
document.addEventListener("mousedown", (event) => {clicking = true});
document.addEventListener("mouseup", (event) => {clicking = false; item[0].set_accel([0, 0])});

function load() {
    item = [new DrivableObject(10, [3, 3], [50, 50]), document.getElementById("runner-canvas")]
    pids = [new pid(5, 2, 0.1), new pid(5, 2, 0.1)];
}

async function process() {
    while (loop) {
        item[1].style.setProperty('top', item[0].position[1].toString()); 
        item[1].style.setProperty('left', item[0].position[0].toString());
        process_phys([item[0]]);
        
        if (clicking) {
            item[0].set_accel([Math.floor(pids[0].process(mouse_pos[0], item[0].position[0], item[0].velocity[0]) * 10), Math.floor(pids[1].process(mouse_pos[1], item[0].position[1], item[0].velocity[1]) * 10)]);
        }
        
        console.log(Math.floor(pids[0].process(mouse_pos[0], item[0].position[0], item[0].velocity[0]) * 10));
        console.log(item[0].acceleration);
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