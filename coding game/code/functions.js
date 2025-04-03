// functions

function shuffle(person) {
  console.log("shuffling!")
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
  	if (draw.length > 3) {
    	for (let i = 0; i < 3; i++) {
      	let j = Math.floor(Math.random() * (draw.length));
      	hand.push(draw[j]);
      	draw.splice(j, 1);
      }
    } else if (draw.length < 3) {
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
  console.log('this should be the next animation: ' + type);
  queue.push(type);
  gs = "animation";
  console.log('this should HAVE been the next animation: ' + type);
}

function endturn() {
  picked = undefined;
  pickloc = undefined;
  if (turn == 'player') {
  	turn = 'enemy';
    // end the player's turn
  	for (let i = 2; i > -1; i--) {
    	if (hand[i] != undefined) {
      	discard.push(hand[i]);
      }
      hand.splice(i, 1);
    }
    // set up the enemy's turn
    drawCards('enemy');
    ai();
  } else if (turn == 'enemy') {
  	turn = 'player'; // maybe move this later if it causes bugs as you are able to do stuff before your cards are dealt and stuff
    // end the enemy's turn
    ediscard.push(ehand[0]);
    ehand.splice(0, 1);
    // set up the player's turn
    drawCards('player');
    mana += 3;
    if (mana > 5) {
    	mana = 5;
    }
  }
}

function ai() {
  if (turn == 'enemy') {
    console.log(ehand[0])
    if (ehand[0] != undefined) {
      ehand[0].use();
      console.log(ehand[0] + 'this value should be undefined');
    }
    setTimeout(endturn, 1000)
  } else {
  	console.log("how is ai being activated it isn't even the enemy's turn")
  }
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
      popup = 'mana';
      gs = 'popup';
      break;
    case 'lanes':
      console.log('wrong number of lanes selected'); // placeholder
      popup = 'lanes';
      gs = 'popup';
      break;
    case 'override':
      console.log('tower can not be placed on another tower'); // placeholder
      popup = 'override';
      gs = 'popup';
      break;
    case 'discardempty':
      console.log('no cards in discard to recall'); // placeholder
      popup = 'discardempty';
      gs = 'popup';
      break;
    case 'selection':
      console.log('no valid card selected'); // placeholder
      popup = 'selection';
      gs = 'popup';
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
    elanes = [undefined, undefined, undefined];
    ehand = [];
    edraw = [];
    new Tower('Time Altar', 100, 100, 0, 0.2, 0.2, 0, 'healing', 2, 'same', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'e1', false);
    new Tower('Time Altar', 100, 100, 0, 0.2, 0.2, 0, 'healing', 2, 'same', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'e2', false);
    new Tower('Time Altar', 100, 100, 0, 0.2, 0.2, 0, 'healing', 2, 'same', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'e3', false);
    new Card('damage', 'chronorandomdamage', undefined, undefined, 30, 1, 'm', 'enemy', false);
    new Card('damage', 'chronoallmagicdamage', undefined, undefined, 10, 3, 'm', 'enemy', false);
    new Card('damage', 'chronoallmagicdamage', undefined, undefined, 10, 3, 'm', 'enemy', false);
    new Card('damage', 'chronoallphysicaldamage', undefined, undefined, 10, 3, 'p', 'enemy', false);
    new Card('damage', 'chronoallphysicaldamage', undefined, undefined, 10, 3, 'p', 'enemy', false);
    new Card('special', 'chronomagicdefense', undefined, undefined, 10, 3, 'm', 'enemy', false);
    new Card('special', 'chronomagicdefense', undefined, undefined, 10, 3, 'm', 'enemy', false);
    new Card('special', 'chronophysicaldefense', undefined, undefined, 10, 3, 'p', 'enemy', false);
    new Card('special', 'chronophysicaldefense', undefined, undefined, 10, 3, 'p', 'enemy', false);
    new Card('healing', 'chronohealing', undefined, undefined, 20, 3, undefined, 'enemy', false);
    new Card('healing', 'chronohealing', undefined, undefined, 20, 3, undefined, 'enemy', false);

    drawCards('enemy');
  }
  // set up player
  php = 5;
  mana = 3;
  draw = [];
  discard = [];
  hand = [];
  lanes = [undefined, undefined, undefined];
  turn = 'player';
  switch (element) {
    case "fire":
      new Card('damage', 'Fireball', 1, 'Common', 10, 1, 'm', 'player', false);
      new Card('damage', 'Fireball', 1, 'Common', 10, 1, 'm', 'player', false);
      new Card('damage', 'Fireball', 1, 'Common', 10, 1, 'm', 'player', false);
      new Card('damage', 'Fireball', 1, 'Common', 10, 1, 'm', 'player', false);
      new Card('damage', 'Flame Strike', 1, 'Common', 10, 1, 'p', 'player', false);
      new Card('damage', 'Flame Strike', 1, 'Common', 10, 1, 'p', 'player', false);
      new Card('damage', 'Flame Strike', 1, 'Common', 10, 1, 'p', 'player', false);
      new Card('damage', 'Flame Strike', 1, 'Common', 10, 1, 'p', 'player', false);
      new Card('damage', 'Solar Flare', 2, 'Rare', 10, 3, 'm', 'player', false);
      new Card('damage', 'Solar Flare', 2, 'Rare', 10, 3, 'm', 'player', false);
      new Card('damage', 'Firebolt', 4, 'Legendary', 30, 1, 't', 'player', false);
      new Card('special', 'Fired Up', 2, 'Common', undefined, undefined, undefined, 'player', false);
      new Card('special', 'Fired Up', 2, 'Common', undefined, undefined, undefined, 'player', false);
      new Card('healing', 'Bonfire', 1, 'Common', 20, 1, undefined, 'player', false);
      new Card('healing', 'Bonfire', 1, 'Common', 20, 1, undefined, 'player', false);
      new Card('special', 'Combustion', 1, 'Common', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Wizard Tower', 3, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Wizard Tower', 3, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Wizard Tower', 3, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Volcano', 2, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Volcano', 2, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Volcano', 2, 'Rare', undefined, undefined, undefined, 'player', false);

      drawCards('player');
      break;
    case "water":
      new Card('special', 'Icicles', 1, 'Common', 10, 1, 'p', 'player', false);
      new Card('special', 'Icicles', 1, 'Common', 10, 1, 'p', 'player', false);
      new Card('special', 'Icicles', 1, 'Common', 10, 1, 'p', 'player', false);
      new Card('special', 'Icicles', 1, 'Common', 10, 1, 'p', 'player', false);
      new Card('damage', 'Tidal Wave', 2, 'Common', 10, 3, 'p', 'player', false);
      new Card('damage', 'Tidal Wave', 2, 'Common', 10, 3, 'p', 'player', false);
      new Card('damage', 'Acid Rain', 3, 'Rare', 20, 2, 'm', 'player', false);
      new Card('damage', 'Acid Rain', 3, 'Rare', 20, 2, 'm', 'player', false);
      new Card('defense', 'Ice Shield', 2, 'Common', 0.25, 1, 'p', 'player', false);
      new Card('defense', 'Ice Shield', 2, 'Common', 0.25, 1, 'p', 'player', false);
      new Card('defense', 'Water Wall', 2, 'Common', 0.25, 1, 'm', 'player', false);
      new Card('defense', 'Water Wall', 2, 'Common', 0.25, 1, 'm', 'player', false);
      new Card('healing', 'Healing Rain', 3, 'Rare', 20, 3, undefined, 'player', false);
      new Card('healing', 'Healing Rain', 3, 'Rare', 20, 3, undefined, 'player', false);
      new Card('tactic', 'Fish', 1, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Ice Castle', 3, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Ice Castle', 3, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Ice Castle', 3, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Underwater Ruin', 2, 'Common', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Underwater Ruin', 2, 'Common', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Underwater Ruin', 2, 'Common', undefined, undefined, undefined, 'player', false);

      drawCards('player');
      break;
    case "air":
      new Card('damage', 'Galeforce', 1, 'Common', 10, 1, 'm', 'player', false);
      new Card('damage', 'Galeforce', 1, 'Common', 10, 1, 'm', 'player', false);
      new Card('damage', 'Galeforce', 1, 'Common', 10, 1, 'm', 'player', false);
      new Card('damage', 'Galeforce', 1, 'Common', 10, 1, 'm', 'player', false);
      new Card('damage', 'Wind Slice', 1, 'Common', 10, 1, 'p', 'player', false);
      new Card('damage', 'Wind Slice', 1, 'Common', 10, 1, 'p', 'player', false);
      new Card('damage', 'Wind Slice', 1, 'Common', 10, 1, 'p', 'player', false);
      new Card('damage', 'Wind Slice', 1, 'Common', 10, 1, 'p', 'player', false);
      new Card('special', 'Tempest Ward', 2, 'Rare', 0.1, 3, undefined, 'player', false);
      new Card('special', 'Tempest Ward', 2, 'Rare', 0.1, 3, undefined, 'player', false);
      new Card('healing', 'Support Chinook', 2, 'Rare', 15, 2, undefined, 'player', false);
      new Card('healing', 'Support Chinook', 2, 'Rare', 15, 2, undefined, 'player', false);
      new Card('tactic', 'Prestidigitation', 0 , 'Legendary', undefined, undefined, undefined, 'player', false);
      new Card('tactic', 'Circulate', 1, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tactic', 'Conjure', 0, 'Common', undefined, undefined, undefined, 'player', false);
      new Card('tactic', 'Recall', 1, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Cloud', 2, 'Common', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Cloud', 2, 'Common', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Cloud', 2, 'Common', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Cloud', 2, 'Common', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Windmill', 3, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Windmill', 3, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Windmill', 3, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Windmill', 3, 'Rare', undefined, undefined, undefined, 'player', false);

      drawCards('player');
      break;
    case "earth":
      new Card('damage', 'Volley', 2, 'Common', 10, 3, 'p', 'player', false);
      new Card('damage', 'Volley', 2, 'Common', 10, 3, 'p', 'player', false);
      new Card('damage', 'Volley', 2, 'Common', 10, 3, 'p', 'player', false);
      new Card('damage', 'Earthquake', 3, 'Rare', 20, 2, 'p', 'player', false);
      new Card('damage', 'Earthquake', 3, 'Rare', 20, 2, 'p', 'player', false);
      new Card('defense', 'Overgrowth', 2, 'Common', 0.2, 1, 'p', 'player', false);
      new Card('defense', 'Overgrowth', 2, 'Common', 0.2, 1, 'p', 'player', false);
      new Card('special', "Gaia's Blessing", 4, 'Legendary', 30, 1, undefined, 'player', false);
      new Card('healing', 'Healing Spring', 3, 'Rare', 30, 2, undefined, 'player', false);
      new Card('healing', 'Healing Spring', 3, 'Rare', 30, 2, undefined, 'player', false);
      new Card('healing', 'Healing Spring', 3, 'Rare', 30, 2, undefined, 'player', false);
      new Card('special', 'Reflourish', 2, 'Rare', 10, 1, undefined, 'player', false);
      new Card('special', 'Reflourish', 2, 'Rare', 10, 1, undefined, 'player', false);
      new Card('tower', 'Archer Tower', 3, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Archer Tower', 3, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Archer Tower', 3, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Ancient Temple', 3, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Ancient Temple', 3, 'Rare', undefined, undefined, undefined, 'player', false);
      new Card('tower', 'Ancient Temple', 3, 'Rare', undefined, undefined, undefined, 'player', false);

      drawCards('player');
      break;
    default:
      break;
  }
  gs = "playing";
}

function newgame() {
  // new game function when you kill an enemy
}

// might add an animation to the hp text if the enemy or the player gets hit
// also you might have to change the hitting within the constructors to make it so that you can only hit once per turn or once per attack

function hit(who) {
  if (who == 'player') {
    php -= 1;
    if (php <= 0) {
      lose();
    }
  } else if (who == 'enemy') {
    if (enemy == 'The Chronomancer') {
      if (elanes[0].name != "Time Altar" || elanes[1].name != "Time Altar" || elanes[2].name != "Time Altar") {
        ehp -= 1;
      }
    }
    if (ehp <= 0) {
      win();
    }
  }
}

function win() {
  console.log('player has won')
  alert('you win')
  throw 'you won if you want to play again refresh the page';
}

function lose() {
  console.log('player has lost')
  alert('you lose, refresh the page to try again')
  throw 'you lost just refresh the page stop trying to find ways to keep going';
}

// pre-running

// event listeners

document.addEventListener("click", (event) => {
  //console.log(`click at (${event.x},${event.y})`);
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
      if (turn == 'player') {
        if (event.x > 1745 && event.x < 2195 && event.y > 1685 && event.y < 2135) {
          hand[0].use();
        } else if (event.x > 2245 && event.x < 2695 && event.y > 1685 && event.y < 2135) {
          hand[1].use();
        } else if (event.x > 2745 && event.x < 3195 && event.y > 1685 && event.y < 2135) {
          hand[2].use();
        } else if (event.x > 3345 && event.x < 3795 && event.y > 1685 && event.y < 2135) {
          endturn();
        } else if (event.x > 1720 && event.x < 2320 && event.y > 730 && event.y < 930) {
          if (!(/1/.test(cLanes.join()))) {
            cLanes.push(1);
          } else if (/1/.test(cLanes.join())) {
            cLanes.splice(cLanes.indexOf(1), 1);
          }
          cLanes.sort(function(a, b){return a - b});
        } else if (event.x > 2420 && event.x < 3020 && event.y > 730 && event.y < 930) {
          if (!(/2/.test(cLanes.join()))) {
            cLanes.push(2);
          } else if (/2/.test(cLanes.join())) {
            cLanes.splice(cLanes.indexOf(2), 1);
          }
          cLanes.sort(function(a, b){return a - b});
        } else if (event.x > 3120 && event.x < 3770 && event.y > 730 && event.y < 930) {
          if (!(/3/.test(cLanes.join()))) {
            cLanes.push(3);
          } else if (/3/.test(cLanes.join())) {
            cLanes.splice(cLanes.indexOf(3), 1);
          }
          cLanes.sort(function(a, b){return a - b});
        } else if (event.x > 125 && event.x < 725 && event.y > 1005 && event.y < 1505) {
          gs = 'popup';
          popup = 'discard pile';
        } else if (event.x > 925 && event.x < 1425 && event.y > 1005 && event.y < 1505) {
          gs = 'popup';
          popup = 'draw pile';
        }
      }
      break;
    case "popup":
      if (popup != 'draw pile' && popup != 'discard pile') {
        if (event.x > 1570 && event.x < 2270 && event.y > 1030 && event.y < 1330 && popup == 'mana') {
          popup = 'none';
          gs = 'playing';
        } else if (event.x > 1570 && event.x < 2270 && event.y > 1105 && event.y < 1355 && popup == 'lanes') {
          popup = 'none';
          gs = 'playing';
        } else if (event.x > 1570 && event.x < 2270 && event.y > 1130 && event.y < 1380 && popup == 'override') {
          popup = 'none';
          gs = 'playing';
        } else if (event.x > 1570 && event.x < 2270 && event.y > 1130 && event.y < 1380 && popup == 'discardempty') {
          popup = 'none';
          gs = 'playing';
        } else if (event.x > 1570 && event.x < 2270 && event.y > 1105 && event.y < 1355 && popup == 'selection') {
          popup = 'none';
          gs = 'playing';
        }
          /*
        } else if (!(event.x > 125 && event.x < 725 && event.y > 1005 && event.y < 1505)) {
          popup = 'none';
          gs = 'playing';
        } else if (!(event.x > 925 && event.x < 1425 && event.y > 1005 && event.y < 1505)) {
          popup = 'none';
          gs = 'playing';
        }
        */
      } else if (popup == 'discard pile' || popup == 'draw pile') {
        if (popup == 'draw pile') {
          for (let i = 0; i < draw.length; i++) {
            if (lastx > (920 + (350 * (i % 6))) && lastx < (1170 + (350 * (i % 6))) && lasty > (555 + (350 * Math.floor(i / 6))) && lasty < (805 + (350 * Math.floor(i / 6)))) {
              picked = draw[i];
              pickloc = 'draw';
            }
          }
        } else if (popup == 'discard pile') {
          for (let i = 0; i < discard.length; i++) {
            if (lastx > (920 + (350 * (i % 6))) && lastx < (1170 + (350 * (i % 6))) && lasty > (555 + (350 * Math.floor(i / 6))) && lasty < (805 + (350 * Math.floor(i / 6)))) {
              picked = discard[i];
              pickloc = 'discard';
            }
          }
        }
        console.log(pickloc, picked)
        if (!(event.x > 720 && event.x < 3120 && event.y > 180 && event.y < 1980)) {
          popup = 'none';
          gs = 'playing';
        }
      }
      break;
    case "animation":
      console.log('you are in an animation why are you clicking')
      break;
    default:
      break;
  }
});

let lastx;
let lasty;

document.addEventListener("mousemove", (event) => {
  //console.log(`mouse moved to (${event.x},${event.y})`);
  lastx = event.x;
  lasty = event.y;
})

// running

function run() {
  clear();

  if (gs == "selection") {
    c.drawImage(sprites.Selection, 0, 0);
  }

  if (avar >= 30) {
    console.log('avar has reached 30, cutting out the next animation')
    queue.splice(0, 1);
  	if (queue.length == 0) {
    	gs = 'playing';
    }
    avar = 0;
  }

  if (gs == "playing" || gs == "popup" || gs == "animation") {
    // draw game
    c.drawImage(sprites.Background, 0, 0);
    c.drawImage(sprites.Discard, 100, 980);
    c.drawImage(sprites.Draw, 900, 980);
    if (turn == 'player') {
      write('bold 150px Courier New', enemy, 25, 125, 0, 0, 0, 1);
      write('bold 150px Courier New', 'Player', 25, 1800, 0, 255, 0, 1);
    } else if (turn == 'enemy') {
      write('bold 150px Courier New', enemy, 25, 125, 0, 255, 0, 1);
      write('bold 150px Courier New', 'Player', 25, 1800, 0, 0, 0, 1);
    }
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
    switch (element) {
      case 'fire':
        c.drawImage(sprites.Fire, 1200, 1760, 300, 300);
        break;
      case 'water':
        c.drawImage(sprites.Water, 1200, 1760, 300, 300);
        break;
      case 'air':
        c.drawImage(sprites.Air, 1200, 1760, 300, 300);
        break;
      case 'earth':
        c.drawImage(sprites.Earth, 1200, 1760, 300, 300);
        break;
    }

    // draw hand
    for (let i = 0; i < 3; i++) {
      if (hand[i] != undefined) {
        let j = (hand[i].name).replace(/ /g, '_');
        j = j.replace("'", "");
        c.drawImage(sprites[j], 1745 + (500*i), 1685, 450, 450)
      }
    }

    // draw towers (if not dead)
    // draw player towers
    for (let i = 0; i < 3; i++) {
      if (lanes[i] != undefined) {
        let j = new RegExp(i+1);
        if (!(j.test(queue[0])) || !(/pdeath/.test(queue[0]))) {
          let k = (lanes[i].name.replace(/ /g, '_'));
          k = k.replace("'", "");
          c.drawImage(sprites[k], 1720 + (700*i), 1010, 600, 600);
        } else if (j.test(queue[0] && /pdeath/.test(queue[0]))) {
          let k = (lanes[i].name.replace(/ /g, '_'));
          k = k.replace("'", "");
          c.globalAlpha = 1 - (avar/30);
          c.drawImage(sprites[k], 1720 + (700*i), 1010, 600, 600);
          c.globalAlpha = 1.0;
        }
      }
    }
    // draw enemy towers
    for (let i = 0; i < 3; i++) {
      if (elanes[i] != undefined) {
        let j = new RegExp(i+1);
        if (!(j.test(queue[0])) || !(/edeath/.test(queue[0]))) {
          let k = (elanes[i].name.replace(/ /g, '_'));
          k = k.replace("'", "");
          c.drawImage(sprites[k], 1720 + (700*i), 50, 600, 600);
        } else if (j.test(queue[0] && /edeath/.test(queue[0]))) {
          let k = (elanes[i].name.replace(/ /g, '_'));
          k = k.replace("'", "");
          c.globalAlpha = 1 - (avar/30);
          c.drawImage(sprites[k], 1720 + (700*i), 50, 600, 600);
          c.globalAlpha = 1.0;
        }
      }
    }

    // draw lane selection

    if (/1/.test(cLanes.join())) {
      write('Bold 150px Courier New', 'Lane 1', 1745, 870, 0, 255, 0, 1);
    } else {
      write('Bold 150px Courier New', 'Lane 1', 1745, 870, 0, 0, 0, 1);
    }
    if (/2/.test(cLanes.join())) {
      write('Bold 150px Courier New', 'Lane 2', 2445, 870, 0, 255, 0, 1);
    } else {
      write('Bold 150px Courier New', 'Lane 2', 2445, 870, 0, 0, 0, 1);
    }
    if (/3/.test(cLanes.join())) {
      write('Bold 150px Courier New', 'Lane 3', 3145, 870, 0, 255, 0, 1);
    } else {
      write('Bold 150px Courier New', 'Lane 3', 3145, 870, 0, 0, 0, 1);
    }

    // draw hover text thing
    if (gs == 'playing' || gs == 'animation') {
      // player towers
      if (lastx > 1720 && lastx < 2320 && lasty > 1010 && lasty < 1610) {
        if (lanes[0] != undefined) {
          c.drawImage(sprites.Hoverbox, 1520, 150);
          write('bold 75px Courier New', lanes[0].name, 1550, 250, 0, 0, 0, 1);
          write('bold 100px Courier New', `${lanes[0].hp}/${lanes[0].maxhp} HP`, 1550, 350, 144, 238, 144, 1);
          if (lanes[0].mdef > 0) {
            write('bold 50px Courier New', `Has ${lanes[0].mdef * 100}% magic defense.`, 1550, 400, 10, 83, 168, 1);
          }
          if (lanes[0].pdef > 0) {
            write('bold 50px Courier New', `Has ${lanes[0].pdef * 100}% physical defense.`, 1550, 450, 10, 83, 168, 1);
          }
          let j = lanes[0].name.replace(/ /g, '_');
          c.font = 'bold 45px Courier New';
          c.fillStyle = "rgba(0, 0, 0, 1)"
          printAtWordWrap(descriptions[j], 1550, 550, 50, 950);
        }
      } else if (lastx > 2420 && lastx < 3020 && lasty > 1010 && lasty < 1610) {
        if (lanes[1] != undefined) {
          c.drawImage(sprites.Hoverbox, 2220, 150);
          write('bold 75px Courier New', lanes[1].name, 2250, 250, 0, 0, 0, 1);
          write('bold 100px Courier New', `${lanes[1].hp}/${lanes[1].maxhp} HP`, 2250, 350, 144, 238, 144, 1);
          if (lanes[1].mdef > 0) {
            write('bold 50px Courier New', `Has ${lanes[1].mdef * 100}% magic defense.`, 2250, 400, 10, 83, 168, 1);
          }
          if (lanes[1].pdef > 0) {
            write('bold 50px Courier New', `Has ${lanes[1].pdef * 100}% physical defense.`, 2250, 450, 10, 83, 168, 1);
          }
          let j = lanes[1].name.replace(/ /g, '_');
          c.font = 'bold 45px Courier New';
          c.fillStyle = "rgba(0, 0, 0, 1)"
          printAtWordWrap(descriptions[j], 2250, 550, 50, 950);
        }
      } else if (lastx > 3120 && lastx < 3720 && lasty > 1010 && lasty < 1610) {
        if (lanes[2] != undefined) {
          c.drawImage(sprites.Hoverbox, 2820, 150);
          write('bold 75px Courier New', lanes[1].name, 2850, 250, 0, 0, 0, 1);
          write('bold 100px Courier New', `${lanes[1].hp}/${lanes[1].maxhp} HP`, 2850, 350, 144, 238, 144, 1);
          if (lanes[2].mdef > 0) {
            write('bold 50px Courier New', `Has ${lanes[2].mdef * 100}% magic defense.`, 2850, 400, 10, 83, 168, 1);
          }
          if (lanes[2].pdef > 0) {
            write('bold 50px Courier New', `Has ${lanes[2].pdef * 100}% physical defense.`, 2850, 450, 10, 83, 168, 1);
          }
          let j = lanes[2].name.replace(/ /g, '_');
          c.font = 'bold 45px Courier New';
          c.fillStyle = "rgba(0, 0, 0, 1)"
          printAtWordWrap(descriptions[j], 2850, 550, 50, 950);
        }
      } 
      // enemy towers
      if (lastx > 1720 && lastx < 2320 && lasty > 50 && lasty < 650) {
        if (elanes[0] != undefined) {
          c.drawImage(sprites.Hoverbox, 1520, 700);
          write('bold 75px Courier New', elanes[0].name, 1550, 800, 0, 0, 0, 1);
          write('bold 100px Courier New', `${elanes[0].hp}/${elanes[0].maxhp} HP`, 1550, 900, 144, 238, 144, 1);
          if (elanes[0].mdef > 0) {
            write('bold 50px Courier New', `Has ${elanes[0].mdef * 100}% magic defense.`, 1550, 950, 10, 83, 168, 1);
          }
          if (elanes[0].pdef > 0) {
            write('bold 50px Courier New', `Has ${elanes[0].pdef * 100}% physical defense.`, 1550, 1000, 10, 83, 168, 1);
          }
          let j = elanes[0].name.replace(/ /g, '_');
          c.font = 'bold 45px Courier New';
          c.fillStyle = "rgba(0, 0, 0, 1)";
          printAtWordWrap(descriptions[j], 1550, 1100, 50, 950);
        }
      } else if (lastx > 2420 && lastx < 3020 && lasty > 50 && lasty < 650) {
        if (elanes[1] != undefined) {
          c.drawImage(sprites.Hoverbox, 2220, 700);
          write('bold 75px Courier New', elanes[1].name, 2250, 800, 0, 0, 0, 1);
          write('bold 100px Courier New', `${elanes[1].hp}/${elanes[1].maxhp} HP`, 2250, 900, 144, 238, 144, 1);
          if (elanes[1].mdef > 0) {
            write('bold 50px Courier New', `Has ${elanes[1].mdef * 100}% magic defense.`, 2250, 950, 10, 83, 168, 1);
          }
          if (elanes[1].pdef > 0) {
            write('bold 50px Courier New', `Has ${elanes[1].pdef * 100}% physical defense.`, 2250, 1000, 10, 83, 168, 1);
          }
          let j = elanes[1].name.replace(/ /g, '_');
          c.font = 'bold 45px Courier New';
          c.fillStyle = "rgba(0, 0, 0, 1)";
          printAtWordWrap(descriptions[j], 2250, 1100, 50, 950);
        }
      } else if (lastx > 3120 && lastx < 3720 && lasty > 50 && lasty < 650) {
        if (elanes[2] != undefined) {
          c.drawImage(sprites.Hoverbox, 2820, 700);
          write('bold 75px Courier New', elanes[2].name, 2850, 800, 0, 0, 0, 1);
          write('bold 100px Courier New', `${elanes[2].hp}/${elanes[2].maxhp} HP`, 2850, 900, 144, 238, 144, 1);
          if (elanes[2].mdef > 0) {
            write('bold 50px Courier New', `Has ${elanes[2].mdef * 100}% magic defense.`, 2850, 950, 10, 83, 168, 1);
          }
          if (elanes[2].pdef > 0) {
            write('bold 50px Courier New', `Has ${elanes[2].pdef * 100}% physical defense.`, 2850, 1000, 10, 83, 168, 1);
          }
          let j = elanes[2].name.replace(/ /g, '_');
          c.font = 'bold 45px Courier New';
          c.fillStyle = "rgba(0, 0, 0, 1)";
          printAtWordWrap(descriptions[j], 2850, 1100, 50, 950);
        }
      } else if (lastx > 1745 && lastx < 2245 && lasty > 1685 && lasty < 2185) {
        if (hand[0] != undefined) {
          c.drawImage(sprites.Hoverbox, 1495, 825);
          write('bold 75px Courier New', hand[0].name, 1525, 925, 0, 0, 0, 1);
          switch (hand[0].type) {
            case 'tower':
              write('bold 50px Courier New', `Tower - ${hand[0].rarity}`, 1525, 1025, 138, 76, 206, 1);
              break;
            case 'damage':
              write('bold 50px Courier New', `Damage - ${hand[0].rarity}`, 1525, 1025, 177, 2, 2, 1);
              break;
            case 'defense':
              write('bold 50px Courier New', `Defense - ${hand[0].rarity}`, 1525, 1025, 10, 83, 168, 1);
              break;
            case 'healing':
              write('bold 50px Courier New', `Healing - ${hand[0].rarity}`, 1525, 1025, 17, 115, 75, 1);
              break;
            case 'tactic':
              write('bold 50px Courier New', `Tactic - ${hand[0].rarity}`, 1525, 1025, 71, 56, 34, 1);
              break;
            case 'special':
              switch(hand[0].name) {
                case 'Combustion':
                  write('bold 50px Courier New', `Tactic - ${hand[0].rarity}`, 1525, 1025, 71, 56, 34, 1);
                  break;
                case 'Fired Up':
                  write('bold 50px Courier New', `Defense - ${hand[0].rarity}`, 1525, 1025, 10, 83, 168, 1);
                  break;
                case 'Icicles':
                  write('bold 50px Courier New', `Damage - ${hand[0].rarity}`, 1525, 1025, 177, 2, 2, 1);
                  break;
                case 'Tempest Ward':
                  write('bold 50px Courier New', `Defense - ${hand[0].rarity}`, 1525, 1025, 10, 83, 168, 1);
                  break;
                case "Gaia's Blessing":
                  write('bold 50px Courier New', `Healing - ${hand[0].rarity}`, 1525, 1025, 17, 115, 75, 1);
                  break;
                case 'Reflourish':
                  write('bold 50px Courier New', `Healing - ${hand[0].rarity}`, 1525, 1025, 17, 115, 75, 1);
                  break;
                default:
                  break;
              }
              break;
            default:
              break;
          }
          write('bold 75px Courier New', `Cost: ${hand[0].cost} Mana`, 1525, 1125, 109, 183, 225, 1);
          let j = hand[0].name.replace(/ /g, '_');
          j = j.replace("'", "");
          c.font = 'bold 45px Courier New';
          c.fillStyle = "rgba(0, 0, 0, 1)";
          printAtWordWrap(descriptions[j], 1525, 1225, 50, 950);
        }
      } else if (lastx > 2245 && lastx < 2745 && lasty > 1685 && lasty < 2185) {
        if (hand[1] != undefined) {
          c.drawImage(sprites.Hoverbox, 1995, 825);
          write('bold 75px Courier New', hand[1].name, 2025, 925, 0, 0, 0, 1);
          switch (hand[1].type) {
            case 'tower':
              write('bold 50px Courier New', `Tower - ${hand[1].rarity}`, 2025, 1025, 138, 76, 206, 1);
              break;
            case 'damage':
              write('bold 50px Courier New', `Damage - ${hand[1].rarity}`, 2025, 1025, 177, 2, 2, 1);
              break;
            case 'defense':
              write('bold 50px Courier New', `Defense - ${hand[1].rarity}`, 2025, 1025, 10, 83, 168, 1);
              break;
            case 'healing':
              write('bold 50px Courier New', `Healing - ${hand[1].rarity}`, 2025, 1025, 17, 115, 75, 1);
              break;
            case 'tactic':
              write('bold 50px Courier New', `Tactic - ${hand[1].rarity}`, 2025, 1025, 71, 56, 34, 1);
              break;
            case 'special':
              switch(hand[1].name) {
                case 'Combustion':
                  write('bold 50px Courier New', `Tactic - ${hand[1].rarity}`, 2025, 1025, 71, 56, 34, 1);
                  break;
                case 'Fired Up':
                  write('bold 50px Courier New', `Defense - ${hand[1].rarity}`, 2025, 1025, 10, 83, 168, 1);
                  break;
                case 'Icicles':
                  write('bold 50px Courier New', `Damage - ${hand[1].rarity}`, 2025, 1025, 177, 2, 2, 1);
                  break;
                case 'Tempest Ward':
                  write('bold 50px Courier New', `Defense - ${hand[1].rarity}`, 2025, 1025, 10, 83, 168, 1);
                  break;
                case "Gaia's Blessing":
                  write('bold 50px Courier New', `Healing - ${hand[1].rarity}`, 2025, 1025, 17, 115, 75, 1);
                  break;
                case 'Reflourish':
                  write('bold 50px Courier New', `Healing - ${hand[1].rarity}`, 2025, 1025, 17, 115, 75, 1);
                  break;
                default:
                  break;
              }
              break;
            default:
              break;
          }
          write('bold 75px Courier New', `Cost: ${hand[1].cost} Mana`, 2025, 1125, 109, 183, 225, 1);
          let j = hand[1].name.replace(/ /g, '_');
          j = j.replace("'", "");
          c.font = 'bold 45px Courier New';
          c.fillStyle = "rgba(0, 0, 0, 1)";
          printAtWordWrap(descriptions[j], 2025, 1225, 50, 950);
        }
      } else if (lastx > 2745 && lastx < 3245 && lasty > 1685 && lasty < 2185) {
        if (hand[2] != undefined) {
          c.drawImage(sprites.Hoverbox, 2495, 825);
          write('bold 75px Courier New', hand[2].name, 2525, 925, 0, 0, 0, 1);
          switch (hand[2].type) {
            case 'tower':
              write('bold 50px Courier New', `Tower - ${hand[2].rarity}`, 2525, 1025, 138, 76, 206, 1);
              break;
            case 'damage':
              write('bold 50px Courier New', `Damage - ${hand[2].rarity}`, 2525, 1025, 177, 2, 2, 1);
              break;
            case 'defense':
              write('bold 50px Courier New', `Defense - ${hand[2].rarity}`, 2525, 1025, 10, 83, 168, 1);
              break;
            case 'healing':
              write('bold 50px Courier New', `Healing - ${hand[2].rarity}`, 2525, 1025, 17, 115, 75, 1);
              break;
            case 'tactic':
              write('bold 50px Courier New', `Tactic - ${hand[2].rarity}`, 2525, 1025, 71, 56, 34, 1);
              break;
            case 'special':
              switch(hand[2].name) {
                case 'Combustion':
                  write('bold 50px Courier New', `Tactic - ${hand[2].rarity}`, 2525, 1025, 71, 56, 34, 1);
                  break;
                case 'Fired Up':
                  write('bold 50px Courier New', `Defense - ${hand[2].rarity}`, 2525, 1025, 10, 83, 168, 1);
                  break;
                case 'Icicles':
                  write('bold 50px Courier New', `Damage - ${hand[2].rarity}`, 2525, 1025, 177, 2, 2, 1);
                  break;
                case 'Tempest Ward':
                  write('bold 50px Courier New', `Defense - ${hand[2].rarity}`, 2525, 1025, 10, 83, 168, 1);
                  break;
                case "Gaia's Blessing":
                  write('bold 50px Courier New', `Healing - ${hand[2].rarity}`, 2525, 1025, 17, 115, 75, 1);
                  break;
                case 'Reflourish':
                  write('bold 50px Courier New', `Healing - ${hand[2].rarity}`, 2525, 1025, 17, 115, 75, 1);
                  break;
                default:
                  break;
              }
              break;
            default:
              break;
          }
          write('bold 75px Courier New', `Cost: ${hand[2].cost} Mana`, 2525, 1125, 109, 183, 225, 1);
          let j = hand[2].name.replace(/ /g, '_');
          j = j.replace("'", "");
          c.font = 'bold 45px Courier New';
          c.fillStyle = "rgba(0, 0, 0, 1)";
          printAtWordWrap(descriptions[j], 2525, 1225, 50, 950);
        }
      }
    }

    if (gs == "popup") {
      c.fillStyle = "rgba(0, 0, 0, 0.5)";
      c.fillRect(0, 0, canvas.width, canvas.height);

      // types of popups
      switch (popup) {
        case 'mana':
          c.drawImage(sprites.Retrymana, 1220, 730);
          break;
        case 'lanes':
          c.drawImage(sprites.Retrylanes, 1220, 730);
          break;
        case 'override':
          c.drawImage(sprites.Retryoverride, 1220, 730);
          break;
        case 'discardempty':
          c.drawImage(sprites.Discardempty, 1220, 730);
          break;
        case 'selection':
          c.drawImage(sprites.Selection, 1220, 730);
          break;
        case 'draw pile':
          c.drawImage(sprites.Drawpile, 720, 180);
          for (let i = 0; i < draw.length; i++) {
            let k = (draw[i].name.replace(/ /g, '_'));
            k = k.replace("'", "");
            c.drawImage(sprites[k], 920 + (350 * (i % 6)), 555 + (350 * Math.floor(i / 6)), 250, 250);
          }
          for (let i = 0; i < draw.length; i++) {
            if (lastx > (920 + (350 * (i % 6))) && lastx < (1170 + (350 * (i % 6))) && lasty > (555 + (350 * Math.floor(i / 6))) && lasty < (805 + (350 * Math.floor(i / 6)))) {
              if (i < 12) {
                c.drawImage(sprites.Hoverbox, (545 + (350 * (i % 6))), (855 + (350 * Math.floor(i / 6))));
                write('bold 75px Courier New', draw[i].name, (575 + (350 * (i % 6))), (955 + (350 * Math.floor(i / 6))), 0, 0, 0, 1);
                switch (draw[i].type) {
                  case 'tower': // x + 30, y + 200
                    write('bold 50px Courier New', `Tower - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (1055 + (350 * Math.floor(i / 6))), 138, 76, 206, 1);
                    break;
                  case 'damage':
                    write('bold 50px Courier New', `Damage - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (1055 + (350 * Math.floor(i / 6))), 177, 2, 2, 1);
                    break;
                  case 'defense':
                    write('bold 50px Courier New', `Defense - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (1055 + (350 * Math.floor(i / 6))), 10, 83, 168, 1);
                    break;
                  case 'healing':
                    write('bold 50px Courier New', `Healing - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (1055 + (350 * Math.floor(i / 6))), 17, 115, 75, 1);
                    break;
                  case 'tactic':
                    write('bold 50px Courier New', `Tactic - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (1055 + (350 * Math.floor(i / 6))), 71, 56, 34, 1);
                    break;
                  case 'special':
                    switch(draw[i].name) {
                      case 'Combustion':
                        write('bold 50px Courier New', `Tactic - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (1055 + (350 * Math.floor(i / 6))), 71, 56, 34, 1);
                        break;
                      case 'Fired Up':
                        write('bold 50px Courier New', `Defense - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (1055 + (350 * Math.floor(i / 6))), 10, 83, 168, 1);
                        break;
                      case 'Icicles':
                        write('bold 50px Courier New', `Damage - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (1055 + (350 * Math.floor(i / 6))), 177, 2, 2, 1);
                        break;
                      case 'Tempest Ward':
                        write('bold 50px Courier New', `Defense - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (1055 + (350 * Math.floor(i / 6))), 10, 83, 168, 1);
                        break;
                      case "Gaia's Blessing":
                        write('bold 50px Courier New', `Healing - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (1055 + (350 * Math.floor(i / 6))), 17, 115, 75, 1);
                        break;
                      case 'Reflourish':
                        write('bold 50px Courier New', `Healing - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (1055 + (350 * Math.floor(i / 6))), 17, 115, 75, 1);
                        break;
                      default:
                        break;
                    }
                    break;
                  default:
                    break;
                }
                write('bold 75px Courier New', `Cost: ${draw[i].cost} Mana`, (575 + (350 * (i % 6))), (1155 + (350 * Math.floor(i / 6))), 109, 183, 225, 1);
                let j = draw[i].name.replace(/ /g, '_');
                j = j.replace("'", "");
                c.font = 'bold 45px Courier New';
                c.fillStyle = "rgba(0, 0, 0, 1)";
                printAtWordWrap(descriptions[j], (575 + (350 * (i % 6))), (1255 + (350 * Math.floor(i / 6))), 50, 950);
              } else if (i >= 12) {
                c.drawImage(sprites.Hoverbox, (545 + (350 * (i % 6))), (-305 + (350 * Math.floor(i / 6))));
                write('bold 75px Courier New', draw[i].name, (575 + (350 * (i % 6))), (-205 + (350 * Math.floor(i / 6))), 0, 0, 0, 1);
                switch (draw[i].type) {
                  case 'tower': // x + 30, y + 200
                    write('bold 50px Courier New', `Tower - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (-105 + (350 * Math.floor(i / 6))), 138, 76, 206, 1);
                    break;
                  case 'damage':
                    write('bold 50px Courier New', `Damage - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (-105 + (350 * Math.floor(i / 6))), 177, 2, 2, 1);
                    break;
                  case 'defense':
                    write('bold 50px Courier New', `Defense - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (-105 + (350 * Math.floor(i / 6))), 10, 83, 168, 1);
                    break;
                  case 'healing':
                    write('bold 50px Courier New', `Healing - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (-105 + (350 * Math.floor(i / 6))), 17, 115, 75, 1);
                    break;
                  case 'tactic':
                    write('bold 50px Courier New', `Tactic - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (-105 + (350 * Math.floor(i / 6))), 71, 56, 34, 1);
                    break;
                  case 'special':
                    switch(draw[i].name) {
                      case 'Combustion':
                        write('bold 50px Courier New', `Tactic - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (-105 + (350 * Math.floor(i / 6))), 71, 56, 34, 1);
                        break;
                      case 'Fired Up':
                        write('bold 50px Courier New', `Defense - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (-105 + (350 * Math.floor(i / 6))), 10, 83, 168, 1);
                        break;
                      case 'Icicles':
                        write('bold 50px Courier New', `Damage - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (-105 + (350 * Math.floor(i / 6))), 177, 2, 2, 1);
                        break;
                      case 'Tempest Ward':
                        write('bold 50px Courier New', `Defense - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (-105 + (350 * Math.floor(i / 6))), 10, 83, 168, 1);
                        break;
                      case "Gaia's Blessing":
                        write('bold 50px Courier New', `Healing - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (-105 + (350 * Math.floor(i / 6))), 17, 115, 75, 1);
                        break;
                      case 'Reflourish':
                        write('bold 50px Courier New', `Healing - ${draw[i].rarity}`, (575 + (350 * (i % 6))), (-105 + (350 * Math.floor(i / 6))), 17, 115, 75, 1);
                        break;
                      default:
                        break;
                    }
                    break;
                  default:
                    break;
                }
                write('bold 75px Courier New', `Cost: ${draw[i].cost} Mana`, (575 + (350 * (i % 6))), (-5 + (350 * Math.floor(i / 6))), 109, 183, 225, 1);
                let j = draw[i].name.replace(/ /g, '_');
                j = j.replace("'", "");
                c.font = 'bold 45px Courier New';
                c.fillStyle = "rgba(0, 0, 0, 1)";
                printAtWordWrap(descriptions[j], (575 + (350 * (i % 6))), (95 + (350 * Math.floor(i / 6))), 50, 950);
              }
            }
          }
          break;
        case 'discard pile':
          c.drawImage(sprites.Discardpile, 720, 180);
          for (let i = 0; i < discard.length; i++) {
            let k = (discard[i].name.replace(/ /g, '_'));
            k = k.replace("'", "");
            c.drawImage(sprites[k], 920 + (350 * (i % 6)), 555 + (350 * Math.floor(i / 6)), 250, 250);
          }
          break;
        default:
          break;
      }
    }
    if (gs == "animation") {
      console.log(queue);
      if (queue[0][0] == 'p') {
        let j = queue[0].replace('p','');
        if (/1/.test(queue[0])) {
          let k = j.replace(/[1-3]/g, '');
          k = k.charAt(0).toUpperCase() + k.slice(1);
          c.globalAlpha = 1 - (avar/30);
          c.drawImage(sprites[k], 1720, 1010, 600, 600);
          c.globalAlpha = 1.0;
        }
        if (/2/.test(queue[0])) {
          let k = j.replace(/[1-3]/g, '');
          k = k.charAt(0).toUpperCase() + k.slice(1);
          c.globalAlpha = 1 - (avar/30);
          c.drawImage(sprites[k], 2420, 1010, 600, 600);
          c.globalAlpha = 1.0;
        }
        if (/3/.test(queue[0])) {
          let k = j.replace(/[1-3]/g, '');
          k = k.charAt(0).toUpperCase() + k.slice(1);
          c.globalAlpha = 1 - (avar/30);
          c.drawImage(sprites[k], 3120, 1010, 600, 600);
          c.globalAlpha = 1.0;
        }
      } else if (queue[0][0] == 'e') {
        let j = queue[0].replace('e','');
        if (/1/.test(queue[0])) {
          let k = j.replace(/[1-3]/g, '');
          k = k.charAt(0).toUpperCase() + k.slice(1);
          c.globalAlpha = 1 - (avar/30);
          c.drawImage(sprites[k], 1720, 50, 600, 600);
          c.globalAlpha = 1.0;
        }
        if (/2/.test(queue[0])) {
          let k = j.replace(/[1-3]/g, '');
          k = k.charAt(0).toUpperCase() + k.slice(1);
          c.globalAlpha = 1 - (avar/30);
          c.drawImage(sprites[k], 2420, 50, 600, 600);
          c.globalAlpha = 1.0;
        }
        if (/3/.test(queue[0])) {
          let k = j.replace(/[1-3]/g, '');
          k = k.charAt(0).toUpperCase() + k.slice(1);
          c.globalAlpha = 1 - (avar/30);
          c.drawImage(sprites[k], 3120, 50, 600, 600);
          c.globalAlpha = 1.0;
        }
      }
      avar++;
    }
  }
};

// draw background pdf
// draw buttons and info
// draw cards
// possibly add an overlay and not allow an event listener to work if it is in popup mode

setInterval(run, 1000/60)


