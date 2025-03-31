// functions

function shuffle(person) {
  if (person == "player") {
    for (let i = discard.length - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * (discard.length));
      draw.push(discard[j]);
      discard.splice(j, 1);
    }
  } else if (person == "enemy") {
    for (let i = ediscard.length - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * (ediscard.length));
      draw.push(ediscard[j]);
      ediscard.splice(j, 1);
    }
  }
};

function drawCards(person) {
  if (person == 'player') {
  	if (draw > 3) {
    	for (let i = 0; i < 3; i++) {
      	let j = Math.floor(Math.random() * (draw.length));
      	hand.push(draw[j]);
      	draw.splice(j, 1);
      }
    } else if (draw < 3) {
    	for (let i = draw.length - 1; i >= 0; i--) {
      	hand.push(draw[i]);
        draw.splice(i, 1);
      }
      shuffle("player");
      for (let i = 3 - hand.length; i > 0; i--) {
      	let j = Math.floor(Math.random() * (draw.length));
        hand.push(draw[j]);
        draw.splice(j, 1);
      }
    }
  } else if (person == 'enemy') {
    let j = Math.floor(Math.random() * (edraw.length));
    ehand.push(edraw[j]);
    edraw.splice(j, 1);
  }
}

function anim(type) {
  gs = "animation";
	queue.push[type]
}

function endturn() {
  if (turn == 'player') {
  	turn == 'enemy';
    // end the player's turn
  	for (let i = 0; i < 3; i++) {
    	if (hand[i] != undefined) {
      	discard.push(hand[i]);
      }
      hand.splice(i, 1);
    }
    // set up the enemy's turn
    drawCards('enemy');
    ai();
  } else if (turn == 'enemy') {
  	turn == 'player'; // maybe move this later if it causes bugs as you are able to do stuff before your cards are dealt and stuff
    // end the enemy's turn
    ediscard.push(ehand[0]);
    ehand.splice(0, 1);
    // set up the player's turn
    drawCards('player');
    mana += 2;
    if (mana > 5) {
    	mana = 5;
    }
  }
}

function ai() {
  if (turn == 'enemy') {
    if (ehand[0] != undefined) {
      ehand[0].use();
    }
    setTimeout(endturn, 1000)
  } else {
  	console.log("how is ai being activated it isn't even the enemy's turn")
  }
}

function preview(card) {
  // hover description
}

function verify() {
  // when ending turn without doing anything
}

function retry(type) {
  /* when using a card and you cant
  either:
    - no mana
    - wrong # of lanes selected
    - tower can not be placed on another tower
  */
  switch(type) {
    case 'mana':
      console.log('player has no mana'); // placeholder
      break;
    case 'lanes':
      console.log('wrong number of lanes selected'); // placeholder
      break;
    case 'override':
      console.log('tower can not be placed on another tower'); // placeholder
      break;
    default:
      break;
  }
};

function startgame(elmnt) {
  element = elmnt;
  // set up enemy
  if (enemy == "The Chronomancer") {
    ehp = 10;
    elanes = [undefined, undefined, undefined]
    ehand = [undefined]
    // new Tower(); //time altars
    // new Tower();
    // new Tower();
    edraw = [];
  }
  // set up player
  php = 10;
  mana = 2;
  draw = [];
  discard = [];
  hand = [undefined, undefined, undefined];
  lanes = [undefined, undefined, undefined];
  switch (element) {
    case "fire":
      break;
    case "water":
      break;
    case "air":
      break;
    case "earth":
      break;
    default:
      break;
  }
  gs = "playing";
}

function newgame() {
  // new game function when you kill an enemy
}

function lose() {
  // skill issue
}

// pre-running

// constructors

new Card('damage', 'Fireball', 1, 'Common', 10, 1, 'm', 'player', false);

// event listeners

document.addEventListener("click", (event) => {
  console.log(event.x);
  console.log(event.y);
  switch (gs) {
    case "selection":
      if (((event.x - event.y) < 1540) && ((event.x - event.y) > 692) && ((3148 - event.y) > event.x) && ((2300 - event.y) < event.x)) {
        console.log("fire has been chosen");
        startgame("fire");
      } else if (((event.x - event.y) < 649) && ((event.x - event.y) > -199) && ((3147 - event.y) > event.x) && ((2299 - event.y) < event.x)) {
        console.log("water has been chosen");
        startgame("water");
      } else if (((event.x - event.y) < 653) && ((event.x - event.y) > -195) && ((4035 - event.y) > event.x) && ((3187 - event.y) < event.x)) {
        console.log("air has been chosen");
        startgame("air");
      } else if (((event.x - event.y) < 1541) && ((event.x - event.y) > 3) && ((4039 - event.y) > event.x) && ((3191 - event.y) < event.x)) {
        console.log("earth has been chosen");
        startgame("earth");
      }
      break;
    case "playing":
      break;
    case "popup":
      break;
    case "animation":
      console.log('you are in an animation why are you clicking')
      break;
    default:
      break;
  }
});

// running

function run() {
  clear();

  if (gs == "selection") {
    c.drawImage(sprites.Selection, 0, 0);
  }

  if (gs == "animation") {
    switch (queue[queue.length-1]) {
      case 'edamage1':
        break;
      case 'edamage2':
        break;
      case 'edamage3':
        break;
      case 'edamage12':
        break;
      case 'edamage13':
        break;
      case 'edamage23':
        break;
      case 'edamage123':
        break;
      case 'pdamage1':
        break;
      case 'pdamage2':
        break;
      case 'pdamage3':
        break;
      case 'pdamage12':
        break;
      case 'pdamage13':
        break;
      case 'pdamage23':
        break;
      case 'pdamage123':
        break;
      case 'pdefense1':
        break;
      case 'pdefense2':
        break;
      case 'pdefense3':
        break;
      case 'pdefense12':
        break;
      case 'pdefense13':
        break;
      case 'pdefense23':
        break;
      case 'pdefense123':
        break;
      case 'edefense1':
        break;
      case 'edefense2':
        break;
      case 'edefense3':
        break;
      case 'edefense12':
        break;
      case 'edefense13':
        break;
      case 'edefense23':
        break;
      case 'edefense123':
        break;
      case 'phealing1':
        break;
      case 'phealing2':
        break;
      case 'phealing3':
        break;
      case 'phealing12':
        break;
      case 'phealing13':
        break;
      case 'phealing23':
        break;
      case 'phealing123':
        break;
      case 'ehealing1':
        break;
      case 'ehealing2':
        break;
      case 'ehealing3':
        break;
      case 'ehealing12':
        break;
      case 'ehealing13':
        break;
      case 'ehealing23':
        break;
      case 'ehealing123':
        break;
      /* death is funny so i might just make the code that originally draws the towers on the lanes have an if statement for death
      case 'edeath1':
        break;
      case 'edeath2':
        break;
      case 'edeath3':
        break;
      case 'edeath12':
        break;
      case 'edeath13':
        break;
      case 'edeath23':
        break;
      case 'edeath123':
        break;
      case 'pdeath1':
        break;
      case 'pdeath2':
        break;
      case 'pdeath3':
        break;
      case 'pdeath12':
        break;
      case 'pdeath13':
        break;
      case 'pdeath23':
        break;
      case 'pdeath123':
        break;
      */
      default:
        break;
    }
    avar++;
  }
  if (avar >= 30) {
  	if (queue == []) {
    	gs = 'playing';
    } else {
    	queue.splice(0, 1);
      avar = 0;
    }
  }

  if (gs == ("playing" || "popup" || "animation")) {
    c.drawImage(sprites.Background, 0, 0);
    c.drawImage(sprites.Discard, 100, 980);
    c.drawImage(sprites.Draw, 900, 980);
    write('bold 150px Courier New', enemy, 25, 125, 0, 0, 0, 1);
    write('bold 150px Courier New', 'Player', 25, 1800, 0, 0, 0, 1);
    c.drawImage(sprites.Heart, 50, 175, 300, 300);
    c.drawImage(sprites.Heart, 50, 1850, 300, 300);
    write('bold 400px Courier New', ehp, 400, 450, 255, 255, 255, 1);
    write('bold 400px Courier New', php, 400, 2125, 255, 255, 255, 1);
    write('bold 200px Courier New', 'Mana', 100, 700, 0, 0, 0, 1);
    let i = "Mana" + mana;
    c.drawImage(sprites[i], 100, 750);
    if (turn == 'player') {
      c.drawImage(sprites.End_Turn_On, 3345, 1685, 450, 450);
    } else {
      c.drawImage(sprites.End_Turn_Off, 3345, 1685, 450, 450);
    }
  }
};

// draw background pdf
// draw buttons and info
// draw cards
// possibly add an overlay and not allow an event listener to work if it is in popup mode

setInterval(run, 1000/60)


