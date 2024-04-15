// Importing data and setting up data variables 

var Temp;

var pathToData = "data/mentalHealthData.csv";
var data;
var ages;
var hoursPerDay;
var bpm;

var anxietyLevel;
var depressionLevel;
var insomniaLevel;
var ocdLevel;

var whileWorking;
var musicEffect;

var mentalHealthData = [];
var mentalHealthData = [];
var mentalHealthDataSorted = [];
var mentalHealthGenres = ["Classical", "EDM", "Metal", "Pop", "Rock"];

var currentGenreIndex = 0;

//Sketch variables

var sketchHeight = 700;
var sketchWidth = 500;

var dataIndex;
var time = 0;
var labels = [];

var radius = 25;
var ellipseX = 60 - radius;
var ellipseY = 80 - radius;
var ellipseYincrement = 80;

var barX = 120;
var barY = 230;

var d1, d2, d3, d4;


var overButton1 = false;
var overButton2 = false;
var overButton3 = false;
var overButton4 = false;

var barR = 255;
var barG = 255;
var barB = 255;

var filterOn = false;

function setup() {
 
  // Creating Canvas
  canvas = createCanvas(sketchHeight, sketchWidth);
 
  // Importing Data from the .csv
  age = data.getColumn('Age');
  hoursPerDay = data.getColumn('Hours per day');
  bpm = data.getColumn('BPM');
  favGenre = data.getColumn('Fav genre');
  
  anxietyLevel = data.getColumn('Anxiety');
  depressionLevel = data.getColumn('Depression');
  insomniaLevel = data.getColumn('Insomnia');
  ocdLevel = data.getColumn('OCD');

  whileWorking = d = data.getColumn('While working');
  musicEffect = data.getColumn('Music effects');
  
  // Assigning the data to an array
  mentalHealthData.push(age);
  mentalHealthData.push(hoursPerDay);
  mentalHealthData.push(bpm);
  mentalHealthData.push(favGenre);
  
  mentalHealthData.push(anxietyLevel);
  mentalHealthData.push(depressionLevel);
  mentalHealthData.push(insomniaLevel);
  mentalHealthData.push(ocdLevel);
  
  mentalHealthData.push(whileWorking);
  mentalHealthData.push(musicEffect);

  // Testing to see if the data is actually there
  // print(mentalHealthData);

  dataIndex = 0;

  ellipseMode(CENTER);
  noStroke();

}  //End setup function

function draw() {
  strokeWeight(0);
  noStroke();
  
  background(60);
  time = time + deltaTime;
  
  barFunctionality();//Generates Bars
  buttonMaker();  // Generates buttons  
  
  // Filter Buttons Rollover Logic and Text Displays
  handleFilterButtons();

  // Title and Play Controls
  displayControls();

  // Genre Text
  displayGenreText();
  
}// End draw function 
  
function handleFilterButtons() {
  // Filter Buttons Rollover Logic
  
      // Button 1
  if (dist(mouseX, mouseY, ellipseX + radius, ellipseY + radius) < radius) {
    overButton1 = true; } else { overButton1 = false;}

      // Button 2
  if (dist(mouseX, mouseY, ellipseX + radius, ((ellipseY + ellipseYincrement) + radius) ) < radius) {
    overButton2 = true;} else { overButton2 = false;}

      // Button 3
if (dist(mouseX, mouseY, ellipseX + radius, ((ellipseY + ellipseYincrement*2) + radius) ) < radius) {
    overButton3 = true;} else { overButton3 = false;}

      // Button 4
  if (dist(mouseX, mouseY, ellipseX + radius, ((ellipseY + ellipseYincrement*3) + radius) ) < radius) {
    overButton4 = true;} else { overButton4 = false;}
  
  // End Filter Buttons Rollover Logic
  
  //Filter Buttons Rollover and Click Events
      //Initializing Text
      textAlign(LEFT);
      textStyle(NORMAL);
      textSize(12);
  if (overButton1 == true) {
    fill(0);
    rect(mouseX, mouseY-12, 45, 12.5);
    fill(245);
    rect(mouseX + 0.5, mouseY - 11.5, 45 - 1,12 -1);
    fill(0);
    text('Anxiety', mouseX + 1.2, mouseY - 1.3 - 10);
    
    canvas.mouseClicked(changeMentalDiagnostic);
  }
  if (overButton2 == true) {
    fill(0);
    rect(mouseX, mouseY-12, 64, 12.5 );
    fill(245);
    rect(mouseX + 0.5, mouseY - 11.5, 64 - 1, 12.5 -1);
    fill(0);
    text('Depression', mouseX + 1.2, mouseY - 1.3 - 10);
    
    canvas.mouseClicked(changeMentalDiagnostic);
  }
  if (overButton3 == true) {
    fill(0);
    rect(mouseX, mouseY-12, 52, 12.5 );
    fill(245);
    rect(mouseX + 0.5, mouseY - 11.5, 52 - 1, 12.5 - 1);
    fill(0);
    text('Insomnia', mouseX + 1.2, mouseY - 1.3 - 10);
    
    canvas.mouseClicked(changeMentalDiagnostic);
  }
  if (overButton4 == true) {
    fill(0);
    rect(mouseX, mouseY-12, 30, 12.5 );
    fill(245);
    rect(mouseX + 0.5, mouseY - 11.5, 30 - 1, 12.5 - 1);
    fill(0);
    text('OCD', mouseX + 1.2, mouseY - 1.3 - 10);
    
    canvas.mouseClicked(changeMentalDiagnostic);
  }
  //End Filter Buttons Rollover and Click Events

}
  
function displayControls() {
  fill(255);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(18);
  text("Music & Mental Health Diagnostics", width / 2, barY + 150);

  // Play Button and Controls
  image(img_playButton, width / 2 - img_playButton.width / 7 / 2, barY + 180, img_playButton.width / 7, img_playButton.height / 7);
  image(img_forwardButton, (width / 2 + 60), barY + 192, img_forwardButton.width / 7, img_forwardButton.height / 7);
  image(img_backButton, (width / 2 - 60 - img_backButton.width / 7), barY + 192, img_backButton.width / 7, img_backButton.height / 7);
}

function displayGenreText() {
  fill(255);
  textAlign(CENTER);
  textSize(16);
  text("Genre: " + mentalHealthGenres[currentGenreIndex], width / 2, barY + 120);
}

function barFunctionality() {
  push();
  strokeWeight(1);
  let genreFilter = mentalHealthGenres[currentGenreIndex]; // current genre
  let filteredIndexes = [];
  for (let i = 0; i < favGenre.length; i++) {
    if (favGenre[i] === genreFilter) {
      filteredIndexes.push(i);
    }
  }

  // Find the maximum number of entries among all genres
  let maxGenreEntries = 0;
  for (let genre of mentalHealthGenres) {
    let genreEntries = favGenre.filter(genre => genre === genreFilter).length;
    maxGenreEntries = max(maxGenreEntries, genreEntries);
  }
  
  // Calculate the width of each bar based on the maximum number of entries
  let barWidth = (200 / maxGenreEntries) * 2.6; // Double the width

  // Loop through the filtered indexes and draw bars for each
  for (let i = 0; i < filteredIndexes.length; i++) {
    fill(barR, barG, barB); // Use dynamic colors
    stroke(2);
    let index = filteredIndexes[i];
    let barHeight = map(hoursPerDay[index], 0, 10, 0, 80); // Scale height based on data
    let barHeightReflect = map(hoursPerDay[index], 0, 10, 0, 40); // Scales "reflection" to make it shorter than the "real" one
    
    // Draw the bar using the calculated width
    rect((barX + (barWidth * i)), barY, barWidth, -barHeight);
    fill(barR, barG, barB, 50);
    rect((barX + (barWidth * i)), barY, barWidth, barHeightReflect);
  }
  pop();
} // Ends bars

// Start buttonMaker function

function buttonMaker() {
  // for (let i = 0; i < 4; i++) {
  //   // print("hi");
  //   fill(255);
  //   ellipse(ellipseX + 25, ellipseY + 25 + i*ellipseYincrement, radius*2, radius*2);
  // }
  
  image(img_AnxietyButton, ellipseX , ellipseY, radius*2, radius*2);
  image(img_DepressionButton, ellipseX, (ellipseY + ellipseYincrement), radius*2, radius*2);
  image(img_InsomniaButton, ellipseX, (ellipseY + ellipseYincrement*2), radius*2, radius*2);
  image(img_OCDButton, ellipseX, (ellipseY + ellipseYincrement*3), radius*2, radius*2);
}
 

// End buttonMaker function 

function changeMentalDiagnostic() {
  
  switchy()
  
  if (overButton1 == true) {
    barR = 255;
    barG = 255;  // Yellow
    barB = 102; // / anxietyLevel;
    if (filterOn == true && overButton1 == true) {
      barR = 255;
      barG = 255;  // Revert (white)
      barB = 255;
    }
    print("This is button 1");
  }
  
  if (overButton2 == true) {
    barR = 0;
    barG = 0;
    barB = 255;
    if (filterOn == true && overButton2 == true) {
      barR = 255;
      barG = 255;  // Revert (white)
      barB = 255;
    }
    print("This is button 2"); 
  }
  
  if (overButton3 == true) {
    barR = 120;
    barG = 0;
    barB = 120; // Purple
    if (filterOn == true && overButton3 == true) {
      barR = 255;
      barG = 255;  // Revert (white)
      barB = 255;
    }
     print("This is button 3"); 
  }
  
  if (overButton4 == true) {
    barR = 0;
    barG = 151;
    barB = 151; // Cyan/Mint
    if (filterOn == true && overButton4 == true) {
      barR = 255;
      barG = 255;  // Revert (white)
      barB = 255;
    }
     print("This is button 4"); 
  }
}

function switchy() {
  
  if (filterOn == false) {
    filterOn = true;
  } else if (filterOn == true) {
    filterOn = false;
  }
  
}function initialDataSort() {
  for (let i = 0; i++; i < (mentalHealthData.length - 1)) {
    
    
  }
}

function mouseClicked() {
  // Check if the click is on the forward button
  if (mouseX > (width / 2 + 60) && mouseX < (width / 2 + 60 + img_forwardButton.width / 7) && mouseY > (barY + 180) && mouseY < (barY + 180 + img_forwardButton.height / 7)) {
    currentGenreIndex = (currentGenreIndex + 1) % mentalHealthGenres.length;
    redraw(); // Force redraw of the canvas
  }
  // Check if the click is on the back button
  else if (mouseX > (width / 2 - 60 - img_backButton.width / 7) && mouseX < (width / 2 - 60) && mouseY > (barY + 180) && mouseY < (barY + 180 + img_backButton.height / 7)) {
    currentGenreIndex = (currentGenreIndex - 1 + mentalHealthGenres.length) % mentalHealthGenres.length;
    redraw(); // Force redraw of the canvas
  }
}



function preload() {
  
  data = loadTable(pathToData, "csv", "header");
  img_playButton = loadImage('stuff/Play_button_white2.png');
  img_pauseButton = loadImage('stuff/Pause_Button_White.png');
  img_forwardButton = loadImage('stuff/Forward_Button_White.png');
  img_backButton = loadImage('stuff/Back_Button_White.png');
  img_AnxietyButton = loadImage('stuff/Anxiety_Symbol.png');
  img_DepressionButton = loadImage('stuff/Depression_Symbol.png');
  img_InsomniaButton = loadImage('stuff/Insomnia_Symbol.png');
  img_OCDButton = loadImage('stuff/OCD_Symbol.png');

}  // End preload function