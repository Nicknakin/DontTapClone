var defaultColor = "WHITE";
var alternateColor = "BLACK";
var startTime = new Date();
var lost = false;
var buttonsStartHeight = 100;
var buttonsWidth = 4;
var buttonsHeight = 4;
var buttonWidth;
var buttonHeight;
var buttons;
var activeButtons = [];
var inactiveButtons = [];
var freq = 0;
var score = 0;

function setup(){
    let canvas = createCanvas(600,700);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);
    buttonWidth = width/buttonsWidth;
    buttonHeight = (height-buttonsStartHeight)/buttonsHeight;
    buttons = new Array(buttonsHeight);
    for(let i = 0; i < buttonsHeight; i++){
        buttons[i] = new Array(buttonsWidth);
        for(let k = 0; k < buttonsWidth; k++){
            buttons[i][k] = new FastButton(k*buttonWidth, i*buttonHeight+buttonsStartHeight, buttonWidth, buttonHeight);
            inactiveButtons.push(buttons[i][k]);
        }
    }

    for(let i = 0; i < 3; i++){
        let random = Math.floor(Math.random()*inactiveButtons.length);
        activeButtons.push(inactiveButtons[random]);
        activeButtons[activeButtons.length-1].state = true;
        inactiveButtons.splice(random,1);
    }

}

function draw(){
    clear(0,0,width,height);
    if(!lost){
        fill("BLACK");
        text(score, width/2, 40)
        freqBar();
        for(row of buttons){
            for(button of row){
                button.draw();
            }
        }
    } else {
        fill("red");
        rect(0,buttonsStartHeight,width,height);
    }
}

function freqBar(){
    fill("BLACK");
    text((freq < 500)? Math.ceil(freq/100): 5, 0, 70)
    fill("WHITE")
    freq = (freq > 0)? freq-1: 0;
    rect(0,80,200,10);
    noStroke();
    fill("BLACK");
    rect(0,80,(freq%100)*2, 10);
}

function mousePressed(){
    if(!(mouseX < 0 || mouseX > width || mouseY < buttonsStartHeight ||  mouseY > height)){
        if(!lost){
            let y = Math.floor((mouseY-buttonsStartHeight)/buttonHeight);
            let x = Math.floor(mouseX/buttonWidth);
            if(buttons[y][x].state == false){
                lose();
            } else {
                score += (freq <= 500)? Math.ceil(freq/100): 5;
                freq += 30;
                buttons[y][x].click();
                buttons[y][x].draw();
                newActive(activeButtons.indexOf(buttons[y][x]));
            }
        } else {
            lost = false;
        }
    }
}

function lose(){
    lost = true;
    freq = 0;
    score = 0;
}

function newActive(index){
    let inactiveIndex = Math.floor(Math.random()*inactiveButtons.length);
    activeButtons.push(inactiveButtons[inactiveIndex]);
    inactiveButtons.splice(inactiveIndex, 1)
    inactiveButtons.push(activeButtons[index]);
    activeButtons.splice(index,1);
    activeButtons[activeButtons.length-1].state = true;
}
