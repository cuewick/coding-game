// canvas

let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');
canvas.width = 3840;
canvas.height = 2160;
c.imageSmoothingEnabled = false;

function write(font, text, x, y, r, g, b, a) {
  c.font = font;
  c.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
  c.fillText(text, x, y)
}
function clear() {
  c.clearRect(0, 0, 3840, 2160)
}

function printAtWordWrap(text, x, y, lineHeight, fitWidth) {
  let words = text.split(' ');
  let currentLine = 0;
  let idx = 1;
  while (words.length > 0 && idx <= words.length) {
    let str = words.slice(0, idx).join(' ');
    let w = c.measureText(str).width;
    if (w > fitWidth) {
      if (idx == 1) {
        idx = 2;
      }
      c.fillText(words.slice(0, idx - 1).join(' '), x, y + (lineHeight * currentLine));
      currentLine++;
      words = words.splice(idx - 1);
      idx = 1;
    }
    else {
      idx++;
    }
  }
  if (idx > 0) {
    c.fillText(words.join(' '), x, y + (lineHeight * currentLine));
  }
}

// variables

let gs = "selection"; // game state: selection, playing, popup, animation
let avar = 0; // animation variable because im animating with a number representing the number of frames through the animation
let queue = [];
let turn = "player";
let popup = "none"; // popup type
let picked = undefined; // specifically for combustion and prestidigitation
let pickloc = undefined; // location of picked, not picklock

let php; // player hp not hypertext preprocessor
let element;
let mana = 0; 
let hand = [];
let draw = [];
let discard = [];
let used = []; // for cards that remove themselves for the rest of the match/game/encounter but will come back later
let lanes = [undefined, undefined, undefined];

let ehp;
let enemy = "The Chronomancer";
let ehand = [];
let edraw = [];
let ediscard = [];
let elanes = [undefined, undefined, undefined];

let cLanes = []; // current lanes, formatted as 1, 2, 3, 1 2, 1 3, 2 3, 1 2 3
let affected = '';
let blockers = '';

class Card {
  constructor(type, name, cost, rarity, abone, abtwo, abthree, loc, temporary) {
    this.type = type; // tower, damage, defense, healing, tactic (or special but that is because some cards work in diferrent ways)
    this.name = name;
    this.cost = cost; // mana
    this.rarity = rarity; // common, rare, legendary
    this.abone = abone; // main function: damage#, defense#/%, healing#, tactic
    this.abtwo = abtwo; // side function: lanes#
    this.abthree = abthree; // type of damage becaues i do not want to make more cases and it is single letter (p or m)
    this.loc = loc; // card location (player or enemy)
    this.temporary = temporary;
    if (this.loc == "player") {
      draw.push(this);
    } else if (this.loc == "enemy") {
      edraw.push(this);
    }
    switch (this.type) {
      case "tower":
        this.use = () => {
          switch (this.name) {
            case "Wizard Tower":
              if (mana >= this.cost) {
                if (cLanes.length == 1) {
                  if (lanes[cLanes[0] - 1] == undefined) {
                    new Tower('Wizard Tower', 50, 50, 0, 0, 0, 0, 'damage', 10, 'same', 'm', undefined, undefined, undefined, undefined, 'damage', 10, 'all', 'm', this.loc[0] + cLanes[0], false); // use location to tell where
                    mana -= this.cost;
                    hand[hand.indexOf(this)] = undefined;
                    discard.push(this);
                  } else {
                    retry('override');
                  }
                } else {
                  retry('lanes');
                }
              } else {
                retry('mana');
              }
              break;
            case "Volcano":
              if (mana >= this.cost) {
                if (cLanes.length == 1) {
                  if (lanes[cLanes[0] - 1] == undefined) {
                    new Tower('Volcano', 100, 100, 0, 0, 0, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'damage', 30, 'all', 'p', this.loc[0] + cLanes[0], false);
                    mana -= this.cost;
                    hand[hand.indexOf(this)] = undefined;
                    discard.push(this);
                  } else {
                    retry('override');
                  }
                } else {
                  retry('lanes');
                }
              } else {
                retry('mana');
              }
              break;
            case "Ice Castle":
              if (mana >= this.cost) {
                if (cLanes.length == 1) {
                  if (lanes[cLanes[0] - 1] == undefined) {
                    new Tower('Ice Castle', 100, 100, 0, 0, 0, 0, 'damage', 10, 'same', 'm', undefined, undefined, undefined, undefined, 'damage', 10, 'all', 'm', this.loc[0] + cLanes[0], false);
                    mana -= this.cost;
                    hand[hand.indexOf(this)] = undefined;
                    discard.push(this);
                  } else {
                    retry('override');
                  }
                } else {
                  retry('lanes');
                }
              } else {
                retry('mana');
              }
              break;
            case "Underwater Ruin":
              if (mana >= this.cost) {
                if (cLanes.length == 1) {
                  if (lanes[cLanes[0] - 1] == undefined) {
                    new Tower('Underwater Ruin', 50, 50, 0, 0, 0, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'damage', 30, 'same', 'p', this.loc[0] + cLanes[0], false);
                    mana -= this.cost;
                    hand[hand.indexOf(this)] = undefined;
                    discard.push(this);
                  } else {
                    retry('override');
                  }
                } else {
                  retry('lanes');
                }
              } else {
                retry('mana');
              }
              break;
            case "Cloud":
              if (mana >= this.cost) {
                if (cLanes.length == 1) {
                  if (lanes[cLanes[0] - 1] == undefined) {
                    new Tower('Cloud', 50, 50, 50, 0, 0, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'special', undefined, undefined, undefined, this.loc[0] + cLanes[0], false); // the null is to show that it exists but not like this
                    mana -= this.cost;
                    hand[hand.indexOf(this)] = undefined;
                    discard.push(this);
                  } else {
                    retry('override');
                  }
                } else {
                  retry('lanes');
                }
              } else {
                retry('mana');
              }
              break;
            case "Windmill":
              if (mana >= this.cost) {
                if (cLanes.length == 1) {
                  if (lanes[cLanes[0] - 1] == undefined) {
                    new Tower('Windmill', 50, 50, 0, 0, 0, 0, 'special', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.loc[0] + cLanes[0], false);
                    mana -= this.cost;
                    hand[hand.indexOf(this)] = undefined;
                    discard.push(this);
                  } else {
                    retry('override');
                  }
                } else {
                  retry('lanes');
                }
              } else {
                retry('mana');
              }
              break;
            case "Archer Tower":
              if (mana >= this.cost) {
                if (cLanes.length == 1) {
                  if (lanes[cLanes[0] - 1] == undefined) {
                    new Tower('Archer Tower', 50, 50, 0, 0, 0, 0, 'damage', 10, 'same', 'p', undefined, undefined, undefined, undefined, 'special', undefined, undefined, undefined, this.loc[0] + cLanes[0], false);
                    mana -= this.cost;
                    hand[hand.indexOf(this)] = undefined;
                    discard.push(this);
                  } else {
                    retry('override');
                  }
                } else {
                  retry('lanes');
                }
              } else {
                retry('mana');
              }
              break;
            case "Ancient Temple":
              if (mana >= this.cost) {
                if (cLanes.length == 1) {
                  if (lanes[cLanes[0] - 1] == undefined) {
                    new Tower('Ancient Temple', 50, 50, 0, 0, 0.2, 0, 'healing', 5, 'same', undefined, undefined, undefined, undefined, undefined, 'special', undefined, undefined, undefined, this.loc[0] + cLanes[0], false);
                    mana -= this.cost;
                    hand[hand.indexOf(this)] = undefined;
                    discard.push(this);
                  } else {
                    retry('override');
                  }
                } else {
                  retry('lanes');
                }
              } else {
                retry('mana');
              }
              break;
            case "The Mirror":
              if (elanes[0] == undefined || elanes[1] == undefined || elanes[2] == undefined) {
                for (let i = 0; i < 3; i++) {
                  if (elanes[i] == undefined) {
                    new Tower('The Mirror', 1, 1, 80, 0, 0, 0, undefined, undefined, undefined, undefined, 'damage', 5, 'all', 't', undefined, undefined, undefined, undefined, this.loc[0] + i, false);
                    ehand[ehand.indexOf(this)] = undefined;
                    ediscard.push(this);
                    break;
                  }
                }
              }
              break;
            case "The Prism of Eternity":
              if (elanes[0] == undefined || elanes[1] == undefined || elanes[2] == undefined) {
                for (let i = 0; i < 3; i++) {
                  if (elanes[i] == undefined) {
                    new Tower('The Prism of Eternity', 50, 50, 0, 0, 0, 0, 'special', '10+10', 'others', null, undefined, undefined, undefined, undefined, 'special', '20%', 'others', undefined, this.loc[0] + i, false);
                    ehand[ehand.indexOf(this)] = undefined;
                    ediscard.push(this);
                    break;
                  }
                }
              }
              break;
            default:
              break;
          }
        }
        break;
      case "damage":
        this.use = () => {
          if (this.loc == 'player') {
            if (mana >= this.cost) {
              if (cLanes.length == this.abtwo) {
                mana -= this.cost;
                affected = '';
                blockers = '';
                for (let i of cLanes) {
                  if (elanes[i - 1] != undefined) {
                    if (((elanes[i - 1].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i - 1].chance) || elanes[i - 1].chance == 0) || elanes[i - 1].stunned == true) { // basically, if the tower has a chance of blocking and the tower does NOT block, or the tower just can't block: make it take damage
                      elanes[i - 1].hp -= (this.abone * (1 - elanes[i - 1][this.abthree + 'def']));
                      affected += i;
                    } else {
                      blockers += i;
                    }
                  } else {
                    hit('enemy');
                  }
                }
                if (affected != '') {
                  console.log(affected);
                  anim('edamage' + affected);
                }
                for (let i of affected) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].hitted();
                  }
                }
                for (let i of blockers) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].blocked();
                  }
                }
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (elanes[i] != undefined) {
                    if (elanes[i].hp <= 0) {
                      affected += (i + 1);
                    }
                  }
                }
                if (affected != '') {
                  anim('edeath' + affected);
                }
                for (let i of affected) {
                  if (elanes[i-1] != undefined) {
                  elanes[i-1].destroyed();
                  }
                }
                hand[hand.indexOf(this)] = undefined;
                discard.push(this);
              } else {
                retry('lanes'); // maybe change the retry function so that the parameter is like the type of retry
              }
            } else {
              retry('mana');
            }
          } else if (this.loc == 'enemy') {
            if (this.abtwo == 1) {
              affected = '';
              blockers = '';
              let i = Math.floor(Math.random() * 3);
              if (lanes[i] != undefined) {
                if (((lanes[i].chance > 0 && (Math.floor(Math.random() + 100) + 1) > lanes[i].chance) || lanes[i].chance == 0) || lanes[i].stunned == true) {
                  lanes[i].hp -= (this.abone * (1 - lanes[i][this.abthree + 'def']));
                  affected += (i + 1);
                } else {
                  blockers += (i + 1);
                }
              } else {
                hit('player');
              }
            } else if (this.abtwo == 3) {
              affected = '';
              for (let i = 0; i < 3; i++) {
                if (lanes[i] != undefined) {
                  if (((lanes[i].chance > 0 && (Math.floor(Math.random() + 100) + 1) > lanes[i].chance) || lanes[i].chance == 0) || lanes[i].stunned == true) {
                    lanes[i].hp -= (this.abone * (1 - lanes[i][this.abthree + 'def']));
                    affected += (i + 1);
                  } else {
                    blockers += (i + 1);
                  }
                } else {
                  hit('player');
                }
              }
            }
            if (affected != '') {
              anim('pdamage' + affected);
            }
            for (let i of affected) {
              if (lanes[i-1] != undefined) {
                lanes[i-1].hitted();
              }
            }
            for (let i of blockers) {
              if (lanes[i-1] != undefined) {
                lanes[i-1].blocked();
              }
            }
            affected = '';
            for (let i = 0; i < 3; i++) {
              if (lanes[i] != undefined) {
                if (lanes[i].hp <= 0) {
                  affected += (i + 1);
                }
              }
            }
            if (affected != '') {
              anim('pdeath' + affected);
            }
            for (let i of affected) {
              if (lanes[i-1] != undefined) {
                lanes[i-1].destroyed();
              }
            }
            ehand[ehand.indexOf(this)] = undefined;
            ediscard.push(this);
          }
        }
        break;
      case "defense":
        this.use = () => {
          if (this.loc == 'player') {
            if (mana >= this.cost) {
              if (cLanes.length == this.abtwo) {
                mana -= this.cost;
                affected = '';
                for (let i of cLanes) {
                  if (lanes[i - 1] != undefined) {
                    if (lanes[i - 1][this.abthree + 'def'] < this.abone) {
                      lanes[i - 1][this.abthree + 'def'] = this.abone;
                      affected += i;
                    }
                  }
                }
                if (affected != '') {
                  anim('pdefense' + affected);
                }
                hand[hand.indexOf(this)] = undefined;
                discard.push(this);
              } else {
                retry('lanes');
              }
            } else {
              retry('mana');
            }
          } else if (this.loc == 'enemy') {
            if (this.abtwo == 1) {
              affected = '';
              let i = Math.floor(Math.random() * 3);
              if (elanes[i] != undefined) {
                if (elanes[i][this.abthree + 'def'] < this.abone) {
                  elanes[i][this.abthree + 'def'] = this.abone;
                  affected += (i + 1);
                }
              }
            } else if (this.abtwo == 3) {
              affected = '';
              if (elanes[i] != undefined) {
                for (let i = 0; i < 3; i++) {
                  if (elanes[i][this.abthree + 'def']) {
                    elanes[i][this.abhtree + 'def'] = this.abone;
                    affected += (i + 1);
                  }
                }
              }
            }
            if (affected != '') {
              anim('edefense' + affected);
            }
            ehand[ehand.indexOf(this)] = undefined;
            ediscard.push(this);
          }
        }
        break;
      case "healing":
        this.use = () => {
          if (this.loc == 'player') {
            if (mana >= this.cost) {
              if (cLanes.length == this.abtwo) {
                mana -= this.cost;
                affected = '';
                for (let i of cLanes) {
                  if (lanes[i - 1] != undefined) {
                    if (lanes[i - 1].hp < lanes[i - 1].maxhp) {
                      lanes[i - 1].hp += this.abone;
                      affected += i;
                    }
                    if (lanes[i - 1].hp > lanes[i - 1].maxhp) {
                      lanes[i - 1].hp = lanes[i - 1].maxhp;
                    }
                  }
                }
                if (affected != '') {
                  anim('phealing' + affected);
                }
                hand[hand.indexOf(this)] = undefined;
                discard.push(this);
              } else {
                retry('lanes');
              }
            } else {
              retry('mana');
            }
          } else if (this.loc == 'enemy') {
            if (this.abtwo == 1) {
              affected = '';
              let i = Math.floor(Math.random() * 3);
              if (elanes[i] != undefined) {
                if (elanes[i].hp < elanes[i].maxhp) {
                  elanes[i].hp += this.abone;
                  affected += i;
                }
                if (elanes[i].hp > elanes[i].maxhp) {
                  elanes[i].hp = elanes[i].maxhp;
                }
              }
            } else if (this.abtwo == 3) {
              affected = '';
              for (let i = 0; i < 3; i++) {
                if (elanes[i] != undefined) {
                  if (elanes[i].hp < elanes[i].maxhp) {
                    elanes[i].hp += this.abone;
                    affected += i;
                  }
                  if (elanes[i].hp > elanes[i].maxhp) {
                    elanes[i].hp = elanes[i].maxhp;
                  }
                }
              }
            }
            if (affected != '') {
              anim('ehealing' + affected);
            }
          }
        }
        break;
      case "tactic":
        this.use = () => {
          switch (this.name) {
            case 'Fish':
              discard.push(this);
              if (draw.length >= 1) {
                let j = Math.floor(Math.random() * (draw.length));
                hand[hand.indexOf(this)] = draw[j];
                draw.splice(j, 1);
              } else {
                shuffle('player');
                let j = Math.floor(Math.random() * (draw.length));
                hand[hand.indexOf(this)] = draw[j];
                draw.splice(j, 1);
              }
              break;
            case 'Prestidigitation':
              if (picked != undefined && pickloc == 'draw') {
                hand[hand.indexOf(this)] = picked;
              } else {
                retry('selection');
              }
              break;
            case 'Circulate':
              hand[hand.indexOf(this)] = undefined;
              discard.push(this);
              for (let i = 1; i > -1; i--) {
                if (hand[i] != undefined) {
                  draw.push(hand[i]);
                }
              }
              hand = [];
              for (let i = 0; i < 3; i++) {
                let j = Math.floor(Math.random() * (draw.length));
                hand.push(j);
                draw.splice(draw.indexOf(j), 1);
              }
              break;
            case 'Conjure':
              mana = (mana >= 4 ? 5 : mana + 1);
              hand[hand.indexOf(this)] = undefined;
              discard.push(this);
              break;
            case 'Recall':
              if (discard.length >= 1) {
                let k = Math.floor(Math.random() * (discard.length));
                hand[hand.indexOf(this)] = discard[k];
                discard.splice(k, 1);
                discard.push(this);
              } else {
                retry('discardempty');
              }
              break;
            case 'Foraging':
              mana = (mana >= 4 ? 5 : mana + 1);
              hand[hand.indexOf(this)] = undefined;
              discard.push(this);
            default:
              break;
          }
        }
        break;
      case "special":
        this.use = () => {
          switch (this.name) {
            case 'Combustion':
              if (picked != undefined) {
                if (mana >= cost) {
                  if (pickloc == 'draw') {
                    used.push(picked);
                    draw.splice(draw.indexOf(picked), 1);
                  } else if (pickloc == 'discard') {
                    used.push(picked);
                    discard.splice(draw.indexOf(picked), 1)
                  }
                  console.log('shouldve deleted a card')
                  hand[hand.indexOf(this)] = undefined;
                  discard.push(this);
                }
              } else {
                retry('selection');
              }
              break;
            case 'Fired Up':
              if (mana >= this.cost) {
                if (cLanes.length == 1) {
                  mana -= this.cost
                  affected = '';
                  if (lanes[cLanes[0] - 1] != undefined) {
                    lanes[cLanes[0] - 1].hp -= 10;
                    affected += cLanes[0];
                  }
                  
                  if (affected != '') {
                    anim('pdamage' + affected);
                  }
                  for (let i of affected) {
                    if (lanes[i-1] != undefined) {
                      lanes[i-1].hitted();
                    }
                  }
                  affected = '';
                  if (lanes[cLanes[0] - 1] != undefined) {
                    if (lanes[cLanes[0] - 1].mdef < 0.2) {
                      lanes[cLanes[0] - 1].mdef = 0.2;
                      affected += cLanes[0];
                    }
                  }
                  if (affected != '') {
                    anim('pdefense' + affected);
                  }
                  affected = '';
                  if (lanes[cLanes[0] - 1].hp <= 0) {
                    if (lanes[cLanes[0] - 1] != undefined) {
                      affected += cLanes[0];
                    }
                  }
                  if (affected != '') {
                    anim('pdeath' + affected);
                  }
                  for (let i of affected) {
                    if (lanes[i-1] != undefined) {
                      lanes[i-1].destroyed();
                    }
                  }
                  hand[hand.indexOf(this)] = undefined;
                  discard.push(this);
                }
              }
              break;
            case 'Icicles':
              if (mana >= this.cost) {
                if (cLanes.length == this.abtwo) {
                  mana -= this.cost;
                  affected = '';
                  blockers = '';
                  for (let i of cLanes) {
                    if (elanes[i - 1] != undefined) {
                      if ((elanes[i - 1].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i - 1].chance) || elanes[i - 1].chance == 0) { // basically, if the tower has a chance of blocking and the tower does NOT block, or the tower just can't block: make it take damage
                        elanes[i - 1].hp -= (this.abone * (1 - elanes[i - 1][this.abthree + 'def']));
                        elanes[i - 1].stunned = true; // stun it
                        affected += i;
                      } else {
                        blockers += i;
                      }
                    } else {
                      hit('enemy');
                    }
                  }
                  if (affected != '') {
                    anim('edamage' + affected);
                  }
                  for (let i of affected) {
                    if (elanes[i-1] != undefined) {
                      elanes[i-1].hitted();
                    }
                  }
                  for (let i of blockers) {
                    if (elanes[i-1] != undefined) {
                      elanes[i-1].blocked();
                    }
                  }
                  affected = '';
                  for (let i = 0; i < 3; i++) {
                    if (elanes[i] != undefined) {
                      if (elanes[i].hp <= 0) {
                        affected += (i + 1);
                      }
                    }
                  }
                  if (affected != '') {
                    anim('edeath' + affected);
                  }
                  for (let i of affected) {
                    if (elanes[i-1] != undefined) {
                      elanes[i-1].destroyed();
                    }
                  }
                  hand[hand.indexOf(this)] = undefined;
                  discard.push(this);
                } else {
                  retry('lanes'); // maybe change the retry function so that the parameter is like the type of retry
                }
              } else {
                retry('mana');
              }
              break;
            case 'Tempest Ward':
              if (mana >= this.cost) {
                if (cLanes.length == this.abtwo) {
                  mana -= this.cost;
                  affected = '';
                  for (let i of cLanes) {
                    if (lanes[i - 1] != undefined) {
                      if (lanes[i - 1][mdef] < this.abone || lanes[i - 1][mdef] < this.abone) {
                        affected += i;
                      }
                      if (lanes[i - 1][mdef] < this.abone) {
                        lanes[i - 1][mdef] = this.abone;
                      }
                      if (lanes[i - 1][pdef] < this.abone) {
                        lanes[i - 1][pdef] = this.abone;
                      }
                    }
                  }
                  if (affected != '') {
                    anim('pdefense' + affected);
                  }
                  hand[hand.indexOf(this)] = undefined;
                  discard.push(this);
                } else {
                  retry('lanes');
                }
              } else {
                retry('mana');
              }
              break;
            case 'Gaias Blessing':
              if (mana >= this.cost) {
                if (cLanes.length == this.abtwo) {
                  mana -= this.cost;
                  affected = '';
                  for (let i of cLanes) {
                    if (lanes[i - 1] != undefined) {
                      lanes[i - 1].maxhp += 20;
                      affected += i;
                      if (lanes[i - 1].hp < lanes[i - 1].maxhp) {
                        lanes[i - 1].hp += this.abone;
                      }
                      if (lanes[i - 1].hp > lanes[i - 1].maxhp) {
                        lanes[i - 1].hp = lanes[i - 1].maxhp;
                      }
                    }
                  }
                  if (affected != '') {
                    anim('phealing' + affected);
                  }
                  hand[hand.indexOf(this)] = undefined;
                  discard.push(this);
                } else {
                  retry('lanes');
                }
              } else {
                retry('mana');
              }
              break;
            case 'Reflourish':
              if (mana >= this.cost) {
                if (cLanes.length == this.abtwo) {
                  mana -= this.cost;
                  affected = '';
                  for (let i of cLanes) {
                    if (lanes[i - 1] != undefined) {
                      lanes[i - 1].maxhp += this.abone;
                      affected += i;
                    }
                  }
                  if (affected != '') {
                    anim('phealing' + affected);
                  }
                  hand[hand.indexOf(this)] = undefined;
                  discard.push(this);
                } else {
                  retry('lanes');
                }
              } else {
                retry('mana');
              }
              break;
            default:
              break;
          }
        }
        break;
      default:
        break;
    }
  }
};

class Tower {
  constructor(name, hp, maxhp, chance, pdef, mdef, tdef, onhit, hone, htwo, hthree, onblock, bone, btwo, bthree, ondestroy, done, dtwo, dthree, loc, stunned) {
    this.name = name;
    this.hp = hp;
    this.maxhp = maxhp;
    this.chance = chance; // block chance (if exists
    this.pdef = pdef; // physical defense
    this.mdef = mdef; // magical defense
    this.tdef = tdef; // true defense, literally is not supposed to exist it is only so that my code wont say "variable tdef doesn't exist"
    this.onhit = onhit; // affect
    this.hone = hone; // abone
    this.htwo = htwo; // abtwo - same, others, all
    this.hthree = hthree; // abthree
    this.onblock = onblock;
    this.bone = bone;
    this.btwo = btwo;
    this.bthree = bthree;
    this.ondestroy = ondestroy;
    this.done = done;
    this.dtwo = dtwo;
    this.dthree = dthree;
    this.loc = loc; // location  of the tower: p1, p2, p3, e1, e2, e3
    this.stunned = stunned;
    if (this.loc[0] == "p") {
      lanes[+this.loc[1] - 1] = this;
    } else if (this.loc[0] == "e") {
      elanes[+this.loc[1] - 1] = this;
    }

    // add the things below when you are able to actually get cards working because like there are some enemy nuances in how i might decide to make them use cards because the ai just might be a lot simpler
    this.hitted = () => {
      if (this.stunned == false) {
        switch (this.onhit) {
          case "damage":
            if (this.loc[0] == 'p') {
              if (this.htwo == 'same') {
                affected = '';
                blockers = '';
                let i = this.loc[1] - 1;
                if (elanes[i] != undefined) {
                  if (((elanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i].chance) || elanes[i].chance == 0) || elanes[i].stunned == true) {
                    elanes[i].hp -= (this.hone * (1 - elanes[i][this.hthree + 'def']));
                    affected += i+1;
                  } else {
                    blockers += i+1;
                  }
                } else {
                  hit('enemy');
                }
                if (affected != '') {
                  anim(this.loc[0] + 'damage' + affected);
                }
                for (let i of affected) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].hitted();
                  }
                }
                for (let i of blockers) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].blocked();
                  }
                }
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (elanes[i] != undefined) {
                    if (elanes[i].hp <= 0) {
                      affected += (i + 1);
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'death' + affected);
                }
                for (let i of affected) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].destroyed();
                  }
                }
              } else if (this.htwo == 'others') {
                affected = '';
                blockers = '';
                let k = [0, 1, 2]
                k.splice(k.indexOf(this.loc[1] - 1), 1);
                let i = k[0];
                let j = k[1];
                if (elanes[i] != undefined) {
                  if (((elanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i].chance) || elanes[i].chance == 0) || elanes[i].stunned == true) {
                    elanes[i].hp -= (this.hone * (1 - elanes[i][this.hthree + 'def']));
                    affected += i+1;
                  } else {
                    blockers += i+1;
                  }
                } else {
                  hit('enemy');
                }
                if (elanes[j] != undefined) {
                  if (((elanes[j].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[j].chance) || elanes[j].chance == 0) || elanes[j].stunned == true) {
                    elanes[j].hp -= (this.hone * (1 - elanes[j][this.hthree + 'def']));
                    affected += j+1;
                  } else {
                    blockers += j+1;
                  }
                } else {
                  hit('enemy');
                }
                if (affected != '') {
                  anim(this.loc[0] + 'damage' + affected);
                }
                for (let i of affected) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].hitted();
                  }
                }
                for (let i of blockers) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].blocked();
                  }
                }
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (elanes[i] != undefined) {
                    if (elanes[i].hp <= 0) {
                      affected += (i + 1);
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'death' + affected);
                }
                for (let i of affected) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].destroyed();
                  }
                }
              } else if (this.htwo == 'all') {
                affected = '';
                blockers = '';
                for (let i = 0; i < 3; i++) {
                  if (elanes[i] != undefined) {
                    if (((elanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i].chance) || elanes[i].chance == 0) || elanes[i].stunned == true) {
                      elanes[i].hp -= (this.hone * (1 - elanes[i][this.hthree + 'def']));
                      affected += i+1;
                    } else {
                      blockers += i+1;
                    }
                  } else {
                    hit('enemy');
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'damage' + affected);
                }
                for (let i of affected) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].hitted();
                  }
                }
                for (let i of blockers) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].blocked();
                  }
                }
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (elanes[i] != undefined) {
                    if (elanes[i].hp <= 0) {
                      affected += (i + 1);
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'death' + affected);
                }
                for (let i of affected) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].destroyed();
                  }
                }
              }
            } else if (this.loc[0] == 'e') {
              if (this.htwo == 'same') {
                affected = '';
                blockers = '';
                let i = this.loc[1] - 1;
                if (lanes[i] != undefined) {
                  if (((lanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > lanes[i].chance) || lanes[i].chance == 0) || lanes[i].stunned == true) {
                    lanes[i].hp -= (this.hone * (1 - lanes[i][this.hthree + 'def']));
                    affected += i+1;
                  } else {
                    blockers += i+1;
                  }
                } else {
                  hit('player');
                }
                if (affected != '') {
                  anim(this.loc[0] + 'damage' + affected);
                }
                for (let i of affected) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].hitted();
                  }
                }
                for (let i of blockers) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].blocked();
                  }
                }
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (lanes[i] != undefined) {
                    if (lanes[i].hp <= 0) {
                      affected += (i + 1);
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'death' + affected);
                }
                for (let i of affected) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].destroyed();
                  }
                }
              } else if (this.htwo == 'others') {
                affected = '';
                blockers = '';
                let k = [0, 1, 2]
                k.splice(k.indexOf(this.loc[1] - 1), 1);
                let i = k[0];
                let j = k[1];
                if (lanes[i] != undefined) {
                  if (((lanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > lanes[i].chance) || lanes[i].chance == 0) || lanes[i].stunned == true) {
                    lanes[i].hp -= (this.hone * (1 - lanes[i][this.hthree + 'def']));
                    affected += i+1;
                  } else {
                    blockers += i+1;
                  }
                } else {
                  hit('player');
                }
                if (lanes[j] != undefined) {
                  if (((lanes[j].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > lanes[j].chance) || lanes[j].chance == 0) || lanes[j].stunned == true) {
                    lanes[j].hp -= (this.hone * (1 - lanes[j][this.hthree + 'def']));
                    affected += j+1;
                  } else {
                    blockers += j+1;
                  }
                } else {
                  hit('player');
                }
                if (affected != '') {
                  anim(this.loc[0] + 'damage' + affected);
                }
                for (let i of affected) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].hitted();
                  }
                }
                for (let i of blockers) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].blocked();
                  }
                }
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (lanes[i] != undefined) {
                    if (lanes[i].hp <= 0) {
                      affected += (i + 1);
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'death' + affected);
                }
                for (let i of affected) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].destroyed();
                  }
                }
              } else if (this.htwo == 'all') {
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (lanes[i] != undefined) {
                    if (((lanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > lanes[i].chance) || lanes[i].chance == 0) || lanes[i].stunned == true) {
                      lanes[i].hp -= (this.hone * (1 - lanes[i][this.hthree + 'def']));
                      affected += i+1;
                    } else {
                      blockers += i+1;
                    }
                  } else {
                    hit('player');
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'damage' + affected);
                }
                for (let i of affected) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].hitted();
                  }
                }
                for (let i of blockers) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].blocked();
                  }
                }
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (lanes[i] != undefined) {
                    if (lanes[i].hp <= 0) {
                      affected += (i + 1);
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'death' + affected);
                }
                for (let i of affected) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].destroyed();
                  }
                }
              }
            }
            break;
          case "healing":
            if (this.loc[0] == 'p') {
              if (this.htwo == 'same') {
                affected = '';
                let i = this.loc[1] - 1;
                if (lanes[i] != undefined) {
                  if (lanes[i].hp < lanes[i].maxhp) {
                    lanes[i].hp += this.hone;
                    affected += i+1;
                  }
                  if (lanes[i].hp > lanes[i].maxhp) {
                    lanes[i].hp = lanes[i].maxhp;
                  }
                  if (affected != '') {
                    anim(this.loc[0] + 'healing' + affected);
                  }
                }
              } else if (this.htwo == 'others') {
                affected = '';
                let k = [0, 1, 2];
                k.splice(k.indexOf(this.loc[1] - 1));
                let i = k[0];
                let j = k[1];
                if (lanes[i] != undefined) {
                  if (lanes[i].hp < lanes[i].maxhp) {
                    lanes[i].hp += this.hone;
                    affected += i+1;
                  }
                  if (lanes[i].hp > lanes[i].maxhp) {
                    lanes[i].hp = lanes[i].maxhp;
                  }
                }
                if (lanes[j] != undefined) {
                  if (lanes[j].hp < lanes[j].maxhp) {
                    lanes[j].hp += this.hone;
                    affected += j+1;
                  }
                  if (lanes[j].hp > lanes[j].maxhp) {
                    lanes[j].hp = lanes[j].maxhp;
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'healing' + affected);
                }
              } else if (this.htwo == 'all') {
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (lanes[i] != undefined) {
                    if (lanes[i].hp < lanes[i].maxhp) {
                      lanes[i].hp += this.hone;
                      affected += i+1;
                    }
                    if (lanes[i].hp > lanes[i].maxhp) {
                      lanes[i].hp = lanes[i].maxhp;
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'healing' + affected)
                }
              }
            } else if (this.loc[0] == 'e') {
              if (this.htwo == 'same') {
                affected = '';
                let i = this.loc[1] - 1;
                if (elanes[i] != undefined) {
                  if (elanes[i].hp < elanes[i].maxhp) {
                    elanes[i].hp += this.hone;
                    affected += i+1;
                  }
                  if (elanes[i].hp > elanes[i].maxhp) {
                    elanes[i].hp = elanes[i].maxhp;
                  }
                  if (affected != '') {
                    anim(this.loc[0] + 'healing' + affected);
                  }
                }
              } else if (this.htwo == 'others') {
                affected = '';
                let k = [0, 1, 2];
                k.splice(k.indexOf(this.loc[1] - 1));
                let i = k[0];
                let j = k[1];
                if (elanes[i] != undefined) {
                  if (elanes[i].hp < elanes[i].maxhp) {
                    elanes[i].hp += this.hone;
                    affected += i+1;
                  }
                  if (elanes[i].hp > elanes[i].maxhp) {
                    elanes[i].hp = elanes[i].maxhp;
                  }
                }
                if (elanes[j] != undefined) {
                  if (elanes[j].hp < elanes[j].maxhp) {
                    elanes[j].hp += this.hone;
                    affected += j+1;
                  }
                  if (elanes[j].hp > elanes[j].maxhp) {
                    elanes[j].hp = elanes[j].maxhp;
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'healing' + affected);
                }
              } else if (this.htwo == 'all') {
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (elanes[i] != undefined) {
                    if (elanes[i].hp < elanes[i].maxhp) {
                      elanes[i].hp += this.hone;
                      affected += i+1;
                    }
                    if (elanes[i].hp > elanes[i].maxhp) {
                      elanes[i].hp = elanes[i].maxhp;
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'healing' + affected)
                }
              }
            }
            if (this.name == 'Time Altar') {
              if (this.hp < 25) {
                this.maxhp += 20;
                anim('ehealing' + this.loc[1]);
              }
            }
            break;
          case 'special':
            switch (this.name) {
              case 'Windmill':
                mana = (mana >= 4 ? 5 : mana + 1);
                break;
              case 'The Prism of Eternity':
                affected = '';
                blockers = '';
                let k = [0, 1, 2];
                k.splice(k.indexOf(this.loc[1] - 1));
                let i = k[0];
                let j = k[1];
                if (lanes[i] != undefined) {
                  if (((lanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > lanes[i].chance) || lanes[i].chance == 0) || lanes[i].stunned == true) {
                    lanes[i].hp -= (10 * (1 - lanes[i]['mdef']));
                    lanes[i].hp -= (10 * (1 - lanes[i]['pdef']));
                    affected += i+1;
                  } else {
                    blockers += i+1;
                  }
                } else {
                  hit('player');
                }
                if (lanes[j] != undefined) {
                  if (((lanes[j].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > lanes[j].chance) || lanes[j].chance == 0) || lanes[j].stunned == true) {
                    lanes[i].hp -= (10 * (1 - lanes[i]['mdef']));
                    lanes[i].hp -= (10 * (1 - lanes[i]['pdef']));
                    affected += j+1;
                  } else {
                    blockers += j+1;
                  }
                } else {
                  hit('player');
                }
                if (affected != '') {
                  anim(this.loc[0] + 'damage' + affected);
                }
                for (let i of affected) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].hitted();
                  }
                }
                for (let i of blockers) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].blocked();
                  }
                }
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (lanes[i] != undefined) {
                    if (lanes[i].hp <= 0) {
                      affected += (i + 1);
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'death' + affected);
                }
                for (let i of affected) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].destroyed();
                  }
                }
                break;
            }
          default:
            break;
        }
      }
    }
    this.blocked = () => {
      if (this.stunned == false) {
        // literally only the mirror has this so lets just make that one specifically
        if (this.name == 'The Mirror') {
          affected = '';
          blockers = '';
          for (let i = 0; i < 3; i++) {
            if (lanes[i] != undefined) {
              if (((lanes[i].chance > 0 && (Math.floor(Math.random() + 100) + 1) > lanes[i].chance) || lanes[i].chance == 0) || lanes[i].stunned == true) {
                lanes[i].hp -= 5;
                affected += i+1;
              } else {
                blockers += i+1;
              }
            }
          }
          if (affected != '') {
            anim('pdamage' + affected);
          }
          for (let i of affected) {
            if (lanes[i-1] != undefined) {
              lanes[i-1].hitted();
            }
          }
          for (let i of blockers) {
            if (lanes[i-1] != undefined) {
              lanes[i-1].blocked();
            }
          }
          affected = '';
          for (let i = 0; i < 3; i++) {
            if (lanes[i] != undefined) {
              if (lanes[i].hp <= 0) {
                affected += (i + 1);
              }
            }
          }
          if (affected != '') {
            anim(this.loc[0] + 'death' + affected);
          }
          for (let i of affected) {
            if (lanes[i-1] != undefined) {
              lanes[i-1].destroyed();
            }
          }
        }
      }
    }
    this.destroyed = () => {
      if (this.stunned == false) {
        switch (this.onhit) {
          case "damage":
            if (this.loc[0] == 'p') {
              if (this.htwo == 'same') {
                affected = '';
                blockers = '';
                let i = this.loc[1] - 1;
                if (elanes[i] != undefined) {
                  if (((elanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i].chance) || elanes[i].chance == 0) || elanes[i].stunned == true) {
                    elanes[i].hp -= (this.hone * (1 - elanes[i][this.hthree + 'def']));
                    affected += i+1;
                  } else {
                    blockers += i+1;
                  }
                } else {
                  hit('enemy');
                }
                if (affected != '') {
                  anim(this.loc[0] + 'damage' + affected);
                }
                lanes[lanes.indexOf(this)] = undefined;
                for (let i of affected) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].hitted();
                  }
                }
                for (let i of blockers) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].blocked();
                  }
                }
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (elanes[i] != undefined) {
                    if (elanes[i].hp <= 0) {
                      affected += (i + 1);
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'death' + affected);
                }
                for (let i of affected) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].destroyed();
                  }
                }
              } else if (this.htwo == 'others') {
                affected = '';
                blockers = '';
                let k = [0, 1, 2]
                k.splice(k.indexOf(this.loc[1] - 1), 1);
                let i = k[0];
                let j = k[1];
                if (elanes[i] != undefined) {
                  if (((elanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i].chance) || elanes[i].chance == 0) || elanes[i].stunned == true) {
                    elanes[i].hp -= (this.hone * (1 - elanes[i][this.hthree + 'def']));
                    affected += i+1;
                  } else {
                    blockers += i+1;
                  }
                } else {
                  hit('enemy');
                }
                if (elanes[j] != undefined) {
                  if (((elanes[j].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[j].chance) || elanes[j].chance == 0) || elanes[j].stunned == true) {
                    elanes[j].hp -= (this.hone * (1 - elanes[j][this.hthree + 'def']));
                    affected += j+1;
                  } else {
                    blockers += j+1;
                  }
                } else {
                  hit('enemy');
                }
                if (affected != '') {
                  anim(this.loc[0] + 'damage' + affected);
                }
                lanes[lanes.indexOf(this)] = undefined;
                for (let i of affected) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].hitted();
                  }
                }
                for (let i of blockers) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].blocked();
                  }
                }
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (elanes[i] != undefined) {
                    if (elanes[i].hp <= 0) {
                      affected += (i + 1);
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'death' + affected);
                }
                for (let i of affected) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].destroyed();
                  }
                }
              } else if (this.htwo == 'all') {
                affected = '';
                blockers = '';
                for (let i = 0; i < 3; i++) {
                  if (elanes[i] != undefined) {
                    if (((elanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i].chance) || elanes[i].chance == 0) || elanes[i].stunned == true) {
                      elanes[i].hp -= (this.hone * (1 - elanes[i][this.hthree + 'def']));
                      affected += i+1;
                    } else {
                      blockers += i+1;
                    }
                  } else {
                    hit('enemy');
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'damage' + affected);
                }
                lanes[lanes.indexOf(this)] = undefined;
                for (let i of affected) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].hitted();
                  }
                }
                for (let i of blockers) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].blocked();
                  }
                }
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (elanes[i] != undefined) {
                    if (elanes[i].hp <= 0) {
                      affected += (i + 1);
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'death' + affected);
                }
                for (let i of affected) {
                  if (elanes[i-1] != undefined) {
                    elanes[i-1].destroyed();
                  }
                }
              }
            } else if (this.loc[0] == 'e') {
              if (this.htwo == 'same') {
                affected = '';
                blockers = '';
                let i = this.loc[1] - 1;
                if (lanes[i] != undefined) {
                  if (((lanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > lanes[i].chance) || lanes[i].chance == 0) || lanes[i].stunned == true) {
                    lanes[i].hp -= (this.hone * (1 - lanes[i][this.hthree + 'def']));
                    affected += i+1;
                  } else {
                    blockers += i+1;
                  }
                } else {
                  hit('enemy');
                }
                if (affected != '') {
                  anim(this.loc[0] + 'damage' + affected);
                }
                elanes[elanes.indexOf(this)] = undefined;
                for (let i of affected) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].hitted();
                  }
                }
                for (let i of blockers) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].blocked();
                  }
                }
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (lanes[i] != undefined) {
                    if (lanes[i].hp <= 0) {
                      affected += (i + 1);
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'death' + affected);
                }
                for (let i of affected) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].destroyed();
                  }
                }
              } else if (this.htwo == 'others') {
                affected = '';
                blockers = '';
                let k = [0, 1, 2]
                k.splice(k.indexOf(this.loc[1] - 1), 1);
                let i = k[0];
                let j = k[1];
                if (lanes[i] != undefined) {
                  if (((lanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > lanes[i].chance) || lanes[i].chance == 0) || lanes[i].stunned == true) {
                    lanes[i].hp -= (this.hone * (1 - lanes[i][this.hthree + 'def']));
                    affected += i+1;
                  } else {
                    blockers += i+1;
                  }
                } else {
                  hit('enemy');
                }
                if (lanes[j] != undefined) {
                  if (((lanes[j].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > lanes[j].chance) || lanes[j].chance == 0) || lanes[j].stunned == true) {
                    lanes[j].hp -= (this.hone * (1 - lanes[j][this.hthree + 'def']));
                    affected += j+1;
                  } else {
                    blockers += j+1;
                  }
                } else {
                  hit('enemy');
                }
                if (affected != '') {
                  anim(this.loc[0] + 'damage' + affected);
                }
                elanes[elanes.indexOf(this)] = undefined;
                for (let i of affected) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].hitted();
                  }
                }
                for (let i of blockers) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].blocked();
                  }
                }
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (lanes[i] != undefined) {
                    if (lanes[i].hp <= 0) {
                      affected += (i + 1);
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'death' + affected);
                }
                for (let i of affected) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].destroyed();
                  }
                }
              } else if (this.htwo == 'all') {
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (lanes[i] != undefined) {
                    if (((lanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > lanes[i].chance) || lanes[i].chance == 0) || lanes[i].stunned == true) {
                      lanes[i].hp -= (this.hone * (1 - lanes[i][this.hthree + 'def']));
                      affected += i+1;
                    } else {
                      blockers += i+1;
                    }
                  } else {
                    hit('enemy');
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'damage' + affected);
                }
                elanes[elanes.indexOf(this)] = undefined;
                for (let i of affected) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].hitted();
                  }
                }
                for (let i of blockers) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].blocked();
                  }
                }
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (lanes[i] != undefined) {
                    if (lanes[i].hp <= 0) {
                      affected += (i + 1);
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'death' + affected);
                }
                for (let i of affected) {
                  if (lanes[i-1] != undefined) {
                    lanes[i-1].destroyed();
                  }
                }
              }
            }
            break;
          case "healing":
            if (this.loc[0] == 'p') {
              if (this.htwo == 'same') {
                affected = '';
                let i = this.loc[1] - 1;
                if (lanes[i] != undefined) {
                  if (lanes[i].hp < lanes[i].maxhp) {
                    lanes[i].hp += this.hone;
                    affected += i+1;
                  }
                  if (lanes[i].hp > lanes[i].maxhp) {
                    lanes[i].hp = lanes[i].maxhp;
                  }
                  if (affected != '') {
                    anim(this.loc[0] + 'healing' + affected);
                  }
                  lanes[lanes.indexOf(this)] = undefined;
                }
              } else if (this.htwo == 'others') {
                affected = '';
                let k = [0, 1, 2];
                k.splice(k.indexOf(this.loc[1] - 1));
                let i = k[0];
                let j = k[1];
                if (lanes[i] != undefined) {
                  if (lanes[i].hp < lanes[i].maxhp) {
                    lanes[i].hp += this.hone;
                    affected += i+1;
                  }
                  if (lanes[i].hp > lanes[i].maxhp) {
                    lanes[i].hp = lanes[i].maxhp;
                  }
                }
                if (lanes[j] != undefined) {
                  if (lanes[j].hp < lanes[j].maxhp) {
                    lanes[j].hp += this.hone;
                    affected += j+1;
                  }
                  if (lanes[j].hp > lanes[j].maxhp) {
                    lanes[j].hp = lanes[j].maxhp;
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'healing' + affected);
                }
                lanes[lanes.indexOf(this)] = undefined;
              } else if (this.htwo == 'all') {
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (lanes[i] != undefined) {
                    if (lanes[i].hp < lanes[i].maxhp) {
                      lanes[i].hp += this.hone;
                      affected += i+1;
                    }
                    if (lanes[i].hp > lanes[i].maxhp) {
                      lanes[i].hp = lanes[i].maxhp;
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'healing' + affected)
                }
                lanes[lanes.indexOf(this)] = undefined;
              }
            } else if (this.loc[0] == 'e') {
              if (this.htwo == 'same') {
                affected = '';
                let i = this.loc[1] - 1;
                if (elanes[i] != undefined) {
                  if (elanes[i].hp < elanes[i].maxhp) {
                    elanes[i].hp += this.hone;
                    affected += i+1;
                  }
                  if (elanes[i].hp > elanes[i].maxhp) {
                    elanes[i].hp = elanes[i].maxhp;
                  }
                  if (affected != '') {
                    anim(this.loc[0] + 'healing' + affected);
                  }
                  elanes[elanes.indexOf(this)] = undefined;
                }
              } else if (this.htwo == 'others') {
                affected = '';
                let k = [0, 1, 2];
                k.splice(k.indexOf(this.loc[1] - 1));
                let i = k[0];
                let j = k[1];
                if (elanes[i] != undefined) {
                  if (elanes[i].hp < elanes[i].maxhp) {
                    elanes[i].hp += this.hone;
                    affected += i+1;
                  }
                  if (elanes[i].hp > elanes[i].maxhp) {
                    elanes[i].hp = elanes[i].maxhp;
                  }
                }
                if (elanes[j] != undefined) {
                  if (elanes[j].hp < elanes[j].maxhp) {
                    elanes[j].hp += this.hone;
                    affected += j+1;
                  }
                  if (elanes[j].hp > elanes[j].maxhp) {
                    elanes[j].hp = elanes[j].maxhp;
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'healing' + affected);
                }
                elanes[elanes.indexOf(this)] = undefined;
              } else if (this.htwo == 'all') {
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (elanes[i] != undefined) {
                    if (elanes[i].hp < elanes[i].maxhp) {
                      elanes[i].hp += this.hone;
                      affected += i;
                    }
                    if (elanes[i].hp > elanes[i].maxhp) {
                      elanes[i].hp = elanes[i].maxhp;
                    }
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'healing' + affected)
                }
                elanes[elanes.indexOf(this)] = undefined;
              }
            }
            break;
          case 'special':
            switch (this.name) {
              case 'Cloud':
                new Card('tower', 'Cloud', 2, 'Common', undefined, undefined, undefined, 'player', false);
                lanes[lanes.indexOf(this)] = undefined;
                break;
              case 'Archer Tower':
                new Card('damage', 'Volley', 2, 'Common', 10, 3, 'p', 'player', true);
                lanes[lanes.indexOf(this)] = undefined;
                break;
              case 'Ancient Temple':
                mana = (mana >= 4 ? 5 : mana + 1);
                lanes[lanes.indexOf(this)] = undefined;
                break;
              case 'The Prism of Eternity':
                affected = '';
                let k = [0, 1, 2];
                k.splice(k.indexOf(this.loc[1] - 1));
                let i = k[0];
                let j = k[1];
                if (elanes[i] != undefined) {
                  if (elanes[i].hp < elanes[i].maxhp) {
                    elanes[i].hp + (elanes[i].maxhp * 0.2);
                    affected += i+1;
                  }
                  if (elanes[i].hp > elanes[i].maxhp) {
                    elanes[i].hp = elanes[i].maxhp;
                  }
                }
                if (elanes[j] != undefined) {
                  if (elanes[j].hp < elanes[j].maxhp) {
                    elanes[j].hp += (elanes[j].maxhp * 0.2);
                    affected += j+1;
                  }
                  if (elanes[j].hp > elanes[j].maxhp) {
                    elanes[j].hp = elanes[j].maxhp;
                  }
                }
                if (affected != '') {
                  anim(this.loc[0] + 'healing' + affected);
                }
                elanes[elanes.indexOf(this)] = undefined;
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
      }
    }
  }
};

