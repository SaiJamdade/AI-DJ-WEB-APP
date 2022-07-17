song = "";

function preload() {
    song = loadSound("music.mp3");
}

ScoreRightWrist = 0;
ScoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotposes);
}

function modelLoaded() {
    console.log("PoseNet Is Initialized");
}

function gotposes(results) {
    if(results.length > 0){
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        ScoreLeftWrist = results[0].pose.keypoints[9].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
    }
}

function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("FF0000");

    if(ScoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);

        if(rightWristX > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML = "Speed 0.5x";
            song.rate(0.5);
        }
        else if(rightWristX > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed 1x";
            song.rate(1);
        }
        else if(rightWristX > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed 1.5x";
            song.rate(1.5);
        }
        else if(rightWristX > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed 2x";
            song.rate(2);
        }
        else if(rightWristY > 400){
            document.getElementById("speed").innerHTML = "Speed 2.5x";
            song.rate(2.5);
        }
    }


if(ScoreLeftWrist > 0.2){
    circle(leftWristX,leftWristY,20);
    InNumberLeftWristY = Number(leftWristY);
    new_leftWristY = floor(InNumberLeftWristY *2);
    leftWristY_divide_1000 = new_leftWristY/1000;
    document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;
    song.setVolume(leftWristY_divide_1000);
}

}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

