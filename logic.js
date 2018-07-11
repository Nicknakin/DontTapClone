var defaultColor = "CYAN";
var alternateColor = "ORANGE";
var startTime = new Date();
var lost = false;
var buttonsStartHeight = 100;
var buttonsWidth = 4;
var buttonsHeight = 4;
var buttonWidth;
var buttonHeight;
var buttons;

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
        }
    }
}

function draw(){
    for(row of buttons){
        for(button of row){
            button.draw();
        }
    }
}


function mousePressed(){
    if(!(mouseX < 0 || mouseX > width || mouseY < buttonsStartHeight ||  mouseY > height)){
        let y = Math.floor((mouseY-buttonsStartHeight)/buttonHeight);
        let x = Math.floor(mouseX/buttonWidth);
        buttons[y][x].click();
        buttons[y][x].draw();
        newActive(x, y);
    }
}

function newActive(x, y){
    let newX = (x + Math.floor(Math.random()*(buttonsWidth)))%buttonsWidth;
    let newY = (y + Math.floor(Math.random()*(buttonsHeight)))%buttonsHeight;
    buttons[newY][newX].state = true;
}
