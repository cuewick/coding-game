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
  gs = "animation";
	queue.push[type]
}

function endturn() {
  if (turn == 'player') {
  	turn == 'enemy';
    alert(turn);
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
  mana = 2;
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
      new Card('tactic', 'Combustion', 1, 'Common', undefined, undefined, undefined, 'player', false);
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
      new Card('tactic', 'Presgendary', undefined, undefined, undefined, 'player', false);
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
}

function lose() {
  console.log('player has lost')
  alert('you lose, refresh the page to try again')
}

// pre-running

// event listeners

document.addEventListener("click", (event) => {
  console.log(`click at (${event.x},${event.y})`);
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
        if (event.x > 1720 && event.x < 2320 && event.y > 50 && event.y < 650) {
          // enemy tower 1

        } else if (event.x > 2420 && event.x < 3020 && event.y > 50 && event.y < 650) {
          // enemy tower 2

        } else if (event.x > 3120 && event.x < 3720 && event.y > 50 && event.y < 650) {
          // enemy tower 3

        } else if (event.x > 1720 && event.x < 2320 && event.y > 1010 && event.y < 1610) {
          // player tower 1

        } else if (event.x > 2420 && event.x < 3020 && event.y > 1010 && event.y < 1610) {
          // player tower 2

        } else if (event.x > 3120 && event.x < 3720 && event.y > 1010 && event.y < 1610) {
          // player tower 3

        } else if (event.x > 1745 && event.x < 2195 && event.y > 1685 && event.y < 2135) {
          hand[0].use();
          alert('first hand thing clicked');
        } else if (event.x > 2245 && event.x < 2695 && event.y > 1685 && event.y < 2135) {
          hand[1].use();
          alert('second hand thing clicked');
        } else if (event.x > 2745 && event.x < 3195 && event.y > 1685 && event.y < 2135) {
          hand[2].use();
          alert('third hand thing clicked');
        } else if (event.x > 3345 && event.x < 3795 && event.y > 1685 && event.y < 2135) {
          endturn();
          alert("should've ended turn");
        } else if (event.x > 1720 && event.x < 2320 && event.y > 730 && event.y < 930) {
          if (!(/1/.test(cLanes.join))) {
            cLanes.push(1);
            alert('1st lane selected');
          } else if (/1/.test(cLanes.join)) {
            cLanes.splice(cLanes.indexOf(1), 1);
            alert('1st lane deselected');
          }
          cLanes.sort(function(a, b){return a - b});
        } else if (event.x > 2420 && event.x < 3020 && event.y > 730 && event.y < 930) {
          if (!(/2/.test(cLanes.join))) {
            cLanes.push(2);
            alert('2nd lane selected');
          } else if (/2/.test(cLanes.join)) {
            cLanes.splice(cLanes.indexOf(2), 1);
            alert('2nd lane deselected');
          }
          cLanes.sort(function(a, b){return a - b});
        } else if (event.x > 3120 && event.x < 2370 && event.y > 730 && event.y < 930) {
          if (!(/3/.test(cLanes.join))) {
            cLanes.push(3);
            alert('3rd lane selected');
          } else if (/3/.test(cLanes.join)) {
            cLanes.splice(cLanes.indexOf(3), 1);
            alert('3rd lane deselected');
          }
          cLanes.sort(function(a, b){return a - b});
        }
      }
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

let lastx;
let lasty;

document.addEventListener("mousemove", (event) => {
  console.log(`mouse moved to (${event.x},${event.y})`);
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
  	if (queue == []) {
    	gs = 'playing';
    } else {
    	queue.splice(0, 1);
      avar = 0;
    }
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
        let j = new RegExp(i);
        if ((gs == 'playing' || queue != []) && !(j.test(queue[0])) && !(/pdeath/.test(queue[0]))) {
          let k = (lanes[i].name.replace(/ /g, '_'));
          k = k.replace("'", "");
          c.drawImage(sprites[k], 1720 + (700*i), 1010, 600, 600);
        } else if (j.test(queue[0] && /pdeath/.test(queue[0]))) {
          let k = (lanes[i].name.replace(/ /g, '_'));
          k = k.replace("'", "");
          c.globalAlpha = 1 - (avar * (1/30));
          c.drawImage(sprites[k], 1720 + (700*i), 1010, 600, 600);
          c.globalAlpha = 1.0;
        }
      }
    }
    // draw enemy towers
    for (let i = 0; i < 3; i++) {
      if (elanes[i] != undefined) {
        let j = new RegExp(i);
        if ((gs == 'playing' || queue != []) && !(j.test(queue[0])) && !(/edeath/.test(queue[0]))) {
          let k = (elanes[i].name.replace(/ /g, '_'));
          k = k.replace("'", "");
          c.drawImage(sprites[k], 1720 + (700*i), 50, 600, 600);
        } else if (j.test(queue[0] && /edeath/.test(queue[0]))) {
          let k = (elanes[i].name.replace(/ /g, '_'));
          k = k.replace("'", "");
          c.globalAlpha = 1 - (avar * (1/30));
          c.drawImage(sprites[k], 1720 + (700*i), 50, 600, 600);
          c.globalAlpha = 1.0;
        }
      }
    }

    // draw hover text thing
    if (gs == 'playing' || gs == 'animation') {
      // player towers
      if (lastx > 1720 && lastx < 2320 && lasty > 1010 && lasty < 1610) {
        c.drawImage(sprites.Hoverbox, 1520, 160);

      }
      // enemy towers
      if (lastx > 1720 && lastx < 2320 && lasty > 50 && lasty < 650) {
        c.drawImage(sprites.Hoverbox, 1520, 700);
        write('bold 75px Courier New', elanes[0].name, 1550, 800, 0, 0, 0, 1);
        write('bold 100px Courier New', `${elanes[0].hp}/${elanes[0].maxhp} HP`, 1550, 900, 144, 238, 144, 1);
        printAtWordWrap()
      }
    }

    if (gs == "popup") {
      c.fillStyle = "rgba(0, 0, 0, 0.5)";
      c.fillRect(0, 0, canvas.width, canvas.height)
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
        // nevermind it is probably easier to make it add here
        case 'edeath1':
          avar++;
          break;
        case 'edeath2':
          avar++;
          break;
        case 'edeath3':
          avar++;
          break;
        case 'edeath12':
          avar++;
          break;
        case 'edeath13':
          avar++;
          break;
        case 'edeath23':
          avar++;
          break;
        case 'edeath123':
          avar++;
          break;
        case 'pdeath1':
          avar++;
          break;
        case 'pdeath2':
          avar++;
          break;
        case 'pdeath3':
          avar++;
          break;
        case 'pdeath12':
          avar++;
          break;
        case 'pdeath13':
          avar++;
          break;
        case 'pdeath23':
          avar++;
          break;
        case 'pdeath123':
          avar++;
          break;
        default:
          break;
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


