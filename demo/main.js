let state = {
  duration: 12.821333,
  activeWordId: 0,
  element: undefined,
  interval: undefined,
  // prettier-ignore
  json: [{"word":"Please","speaker":"John","start":0.55,"end":0.91,"id":0},{"word":"call","speaker":"John","start":0.91,"end":1.21,"id":1},{"word":"Stella","speaker":"John","start":1.21,"end":2.02,"id":2},{"word":"and","speaker":"John","start":2.11,"end":2.26,"id":3},{"word":"ask","speaker":"John","start":2.26,"end":2.5,"id":4},{"word":"her","speaker":"John","start":2.5,"end":2.65,"id":5},{"word":"to","speaker":"John","start":2.65,"end":2.77,"id":6},{"word":"bring","speaker":"John","start":2.77,"end":3.04,"id":7},{"word":"these","speaker":"John","start":3.04,"end":3.31,"id":8},{"word":"things","speaker":"John","start":3.31,"end":3.67,"id":9},{"word":"with","speaker":"John","start":3.67,"end":3.91,"id":10},{"word":"her","speaker":"John","start":3.91,"end":4.21,"id":11},{"word":"from","speaker":"John","start":4.21,"end":4.42,"id":12},{"word":"the","speaker":"John","start":4.42,"end":4.51,"id":13},{"word":"store.","speaker":"John","start":4.51,"end":5.26,"id":14},{"word":"Six","speaker":"John","start":5.98,"end":6.4,"id":15},{"word":"spoons","speaker":"John","start":6.4,"end":6.91,"id":16},{"word":"of","speaker":"John","start":6.91,"end":7,"id":17},{"word":"fresh","speaker":"John","start":7,"end":7.36,"id":18},{"word":"snow","speaker":"John","start":7.36,"end":7.66,"id":19},{"word":"peas.","speaker":"John","start":7.66,"end":8.44,"id":20},{"word":"Five","speaker":"John","start":9.13,"end":9.55,"id":21},{"word":"thick","speaker":"John","start":9.55,"end":9.82,"id":22},{"word":"slabs","speaker":"John","start":9.82,"end":10.36,"id":23},{"word":"of","speaker":"John","start":10.36,"end":10.42,"id":24},{"word":"blue","speaker":"John","start":10.42,"end":10.69,"id":25},{"word":"cheese.","speaker":"John","start":10.69,"end":11.59,"id":26},{"word":"And","speaker":"John","start":12.19,"end":12.43,"id":27},{"word":"maybe","speaker":"John","start":12.43,"end":12.76,"id":28},{"word":"a","speaker":"John","start":12.76,"end":12.82,"id":29},{"word":"snack","speaker":"John","start":12.82,"end":13.27,"id":30},{"word":"for","speaker":"John","start":13.27,"end":13.45,"id":31},{"word":"her","speaker":"John","start":13.45,"end":13.54,"id":32},{"word":"brother,","speaker":"John","start":13.54,"end":13.9,"id":33},{"word":"Bob.","speaker":"John","start":13.9,"end":14.65,"id":34},{"word":"We","speaker":"John","start":15.55,"end":15.76,"id":35},{"word":"also","speaker":"John","start":15.76,"end":16.18,"id":36},{"word":"need","speaker":"John","start":16.18,"end":16.42,"id":37},{"word":"a","speaker":"John","start":16.42,"end":16.48,"id":38},{"word":"small","speaker":"John","start":16.48,"end":16.84,"id":39},{"word":"plastic","speaker":"John","start":16.84,"end":17.38,"id":40},{"word":"snake","speaker":"John","start":17.38,"end":18.16,"id":41},{"word":"and","speaker":"John","start":18.58,"end":18.76,"id":42},{"word":"a","speaker":"John","start":18.76,"end":18.85,"id":43},{"word":"big","speaker":"John","start":18.85,"end":19.15,"id":44},{"word":"toy","speaker":"John","start":19.15,"end":19.48,"id":45},{"word":"frog","speaker":"John","start":19.48,"end":20.38,"id":46},{"word":"for","speaker":"John","start":20.41,"end":20.65,"id":47},{"word":"the","speaker":"John","start":20.65,"end":20.77,"id":48},{"word":"kids.","speaker":"John","start":20.77,"end":21.55,"id":49},{"word":"You","speaker":"John","start":22.34,"end":22.45,"id":50},{"word":"can","speaker":"John","start":22.45,"end":22.66,"id":51},{"word":"scoop","speaker":"John","start":22.66,"end":23.05,"id":52},{"word":"these","speaker":"John","start":23.05,"end":23.32,"id":53},{"word":"things","speaker":"John","start":23.32,"end":23.71,"id":54},{"word":"into,","speaker":"John","start":23.8,"end":23.99,"id":55},{"word":"three","speaker":"John","start":24.01,"end":24.37,"id":56},{"word":"red","speaker":"John","start":24.37,"end":24.7,"id":57},{"word":"bags.","speaker":"John","start":24.7,"end":25.6,"id":58},{"word":"And","speaker":"John","start":25.9,"end":26.29,"id":59},{"word":"we","speaker":"John","start":26.29,"end":26.44,"id":60},{"word":"will","speaker":"John","start":26.44,"end":26.62,"id":61},{"word":"go","speaker":"John","start":26.62,"end":26.86,"id":62},{"word":"meet","speaker":"John","start":26.89,"end":27.16,"id":63},{"word":"her","speaker":"John","start":27.16,"end":27.4,"id":64},{"word":"Wednesday","speaker":"John","start":27.4,"end":28.12,"id":65},{"word":"at","speaker":"John","start":28.72,"end":28.9,"id":66},{"word":"the","speaker":"John","start":28.9,"end":28.99,"id":67},{"word":"train","speaker":"John","start":28.99,"end":29.32,"id":68},{"word":"station.","speaker":"John","start":29.32,"end":29.98,"id":69}],
};

/**
 * Runs several times per second while audio is playing, to highlight current word
 */

function highlightWord() {
  const currentTime = state.element.currentTime;

  // Get the current word (if there is one)
  const match = state.json.find(function (item) {
    return currentTime >= item.start && currentTime <= item.end;
  });

  if (match) {
    // Remove the .word-active class from the previously active word, which is now inactive
    const previousWord = document.querySelector(
      `[word-id="${state.activeWordId}"]`
    );
    previousWord.classList.remove("word-active");

    // Add the .word-active class to the newly active word
    const currentWord = document.querySelector(`[word-id="${match.id}"]`);
    currentWord.classList.add("word-active");

    // Record the id for the current word
    state.activeWordId = match.id;

    // Show matching word in console
    console.table(match);
  }
}

/**
 * Register events for audio interactions (play, pause, etc.)
 */

function registerEvents() {
  state.element.addEventListener("play", function (e) {
    // Run the highlightWord function every 100ms
    checkAudio = setInterval(highlightWord, 100);
  });

  state.element.addEventListener("pause", function (e) {
    // Stop running the highlightWord function every 100ms
    clearInterval(checkAudio);
  });

  state.element.addEventListener("ended", function (e) {
    // Stop running the highlightWord function every 100ms
    clearInterval(checkAudio);
    const previousWord = document.querySelector(
      `[word-id="${state.activeWordId}"]`
    );
    previousWord.classList.remove("word-active");
  });
}

/**
 * Store a reference to the audio element
 */

function configureAudio() {
  state.element = document.getElementById("my-audio");
}

window.onload = function () {
  configureAudio();
  registerEvents();
};
