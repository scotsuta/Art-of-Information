var osc, osc2, osc3, envelope1, envelope2, envelope3, fft, time, noteRan1, noteRan2, noteRan3;

var scaleArray = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84];
var note = 0;
var timeSlider, timeSlider2, timeSlider3;

function setup() {
  createCanvas(710, 200);
    
  timeSlider = createSlider(0,20,2,1);  
  timeSlider2 = createSlider(0,20,2,1);  
  timeSlider3 = createSlider(0,20,2,1);
      
  osc = new p5.SinOsc();
  osc2 = new p5.SinOsc();
  osc3 = new p5.SinOsc();

  envelope1 = new p5.Env();
  envelope1.setADSR(0.001, 0.5, 0.1, 0.5);
  envelope1.setRange(1, 0);
    
  envelope2 = new p5.Env();
  envelope2.setADSR(0.001, 0.5, 0.5, 0.5);
  envelope2.setRange(1, 0);
    
  envelope3 = new p5.Env();
  envelope3.setADSR(0.001, 0.5, 0.1, 0.5);
  envelope3.setRange(1, 0);

  osc.start();
  osc2.start();
  osc3.start();

  fft = new p5.FFT();
  noStroke();
}

function draw() {
  background(20);
  time= random(60,80);
  noteRan1 = floor(random(-6,6));
  noteRan2 = floor(random(-4,8));
  noteRan3 = floor(random(-7,3));
    
  if (frameCount % time < timeSlider.value() || frameCount == 1) {
    var midiValue = scaleArray[note];
    var freqValue = midiToFreq(midiValue);
    osc.freq(freqValue);

    envelope1.play(osc, 0, 0.1);
    note = (note + noteRan1) % scaleArray.length;
   
  }  
  if (frameCount % time < timeSlider2.value() || frameCount == 1) {
    noteRan = floor(random(-6,6))
    var midiValue = scaleArray[note];
    var freqValue = midiToFreq(midiValue);
    osc2.freq(freqValue);

    envelope2.play(osc2, 0, 0.1);
    note = (note + noteRan2) % scaleArray.length;
   
  }
  if (frameCount % time < timeSlider2.value() || frameCount == 1) {
    noteRan = floor(random(-6,6))
    var midiValue = scaleArray[note];
    var freqValue = midiToFreq(midiValue);
    osc3.freq(freqValue);

    envelope3.play(osc3, 0, 0.1);
    note = (note + noteRan3) % scaleArray.length;
   
  }

  // plot FFT.analyze() frequency analysis on the canvas
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length/20; i++) {
    fill(spectrum[i], spectrum[i]/10, 0);
    var x = map(i, 0, spectrum.length/20, 0, width);
    var h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height, spectrum.length/20, -h);
  }
}
