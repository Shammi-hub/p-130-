song = "";
song1 = "";
song2 = "";
song_status = "";
song2_status = "";
function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
   // song = loadSound("");
   
}
scoreRightWrist = 0;
scoreLeftWrist = 0;

rightwristX = 0;
rightwristY = 0;

leftwristX = 0;
leftwristY = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(" scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);


        rightwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightwristX + "rightWristY = "+ rightwristY);

    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftwristX + "leftWristY = "+ leftwristY);

    }
    
}

function draw()
{
    image(video, 0, 0, 600, 500);

    song_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    { 
        circle(rightwristX, rightwristY,20);
      song2.stop();
      if(song_status == "false"){
          song1.play();
          
      document.getElementById("song").innerHTML = "Song played is Harry Potter Theme Song";
      
      }
      
      
    }

      
    if(scoreLeftWrist > 0.2)
    { 
        circle(leftwristX, leftwristY,20);
        song1.stop();
        
        if(song2_status == "false"){
            song2.play();
            
        document.getElementById("song").innerHTML = "Song played is Peter Pan";
        
        }
        
    }
    
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
