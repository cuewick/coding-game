// canvas

let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');
canvas.width = 3840;
canvas.height= 2160;
c.imageSmoothingEnabled = false;

class Vector2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  add(that) {
    return new Vector2(this.x + that.x, this.y + that.y)
  }
  multiply(that) {
    return new Vector2(this.x * that, this.y * that)
  }
  toPolar() {
  return {
    a: Math.atan2(this.y, this.x),
    r: Math.sqrt(this.x ** 2 + this.y ** 2)
    }
  }
  normalize() {
    return this.multiply(1 / (Math.sqrt(this.x ** 2 + this.y ** 2)))
  }
  inBoundsRect(thatMin, thatMax) {
    let relativeThis = this.add(thatMin.multiply(-1))
    return (
      (
      0 < relativeThis.x
      &&
      relativeThis.x < thatMax.x
      )
      &&
      (
      0 < relativeThis.y
      &&
      relativeThis.y < thatMax.y
      )
    )
  }
}
Vector2.unit = new Vector2(1, 1)
Vector2.zero = new Vector2(0, 0)
Vector2.polar = (a, r) => {
  return new Vector2(Math.cos(a), Math.sin(a)).multiply(r)
}
function drawRect(pos, dim, r, g, b, a) {
  c.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
  c.fillRect(pos.x, pos.y, dim.x, dim.y)
}
function drawLine(list, r, g, b, a) {
  c.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`
  c.beginPath()
  c.moveTo(list[0].x, list[0].y)
  for (let i of list) {
    c.lineTo(i.x, i.y)
  }
  c.stroke()
}
function drawPoly(list, r, g, b, a) {
  c.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`
  c.beginPath()
  c.moveTo(list[0].x, list[0].y)
  for (let i of list) {
    c.lineTo(i.x, i.y)
  }
  c.stroke()
  c.fill()
}
function drawArc(pos, rad, sa, ea, clock, r, g, b, a) {
  c.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`
  c.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
  c.beginPath()
  c.arc(pos.x, pos.y, rad, sa, ea, !clock)
  c.stroke()
  c.fill()
}
function drawImg(img, pos, dim, transparency) {
  c.globalAlpha = transparency;
  c.drawImage(img, pos.x, pos.y, dim.x, dim.y)
  c.globalAlpha = 1.0;
}
/* welp i wasn't taught vectors so its time to remake the function!!!
function write(font, text, pos, r, g, b, a) {
  c.font = font;
  c.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
  c.fillText(text, pos.x, pos.y)
}
*/
function write(font, text, x, y, r, g, b, a) {
  c.font = font;
  c.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
  c.fillText(text, x, y)
}
function clear() {
  c.clearRect(0, 0, 3840, 2160)
}

// variables

let gs = "selection"; // game state: selection, playing, popup, animation
let avar = 0; // animation variable because im animating with a number representing the number of frames through the animation
let queue = [];
let turn = "player";

let php; // player hp not hypertext preprocessor
let element;
let mana = 0; // oops i kind of made most of the functions without this being included so
// and i also forgot to make each card go from hand to discard pile and crap wow
let hand = [undefined, undefined, undefined];
let draw = [];
let discard = [];
let lanes = [undefined, undefined, undefined];

let ehp;
let enemy = "The Chronomancer";
let ehand = [undefined];
let edraw = [];
let ediscard = [];
let elanes = [undefined, undefined, undefined];

let cLanes = []; // current lanes, formatted as 1, 2, 3, 1 2, 1 3, 2 3, 1 2 3
let affected = '';

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
    } else if (this.dest == "enemy") {
      edraw.push(this);
    }
    switch(this.type) {
      case "tower":
        this.use = () => {
          if (cLanes.length == 1) {
            switch(this.name) {
              case "Wizard Tower":
                new Tower('Wizard Tower', 50, 50, 0, 0, 0, 0, 'damage', 10, 'same', 'm', undefined, undefined, undefined, undefined, 'damage', 10, 'all', 'm', this.loc[0] + cLanes[0], false); // use location to tell where
                break;
              case "Volcano":
                new Tower('Volcano', 100, 100, 0, 0, 0, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'damage', 30, 'all', 'p', this.loc[0] + cLanes[0], false);
                break;
              case "Ice Castle":
                new Tower('Ice Castle', 100, 100, 0, 0, 0, 0, 'damage', 10, 'same', 'm', undefined, undefined, undefined, undefined, 'damage', 10, 'all', 'm', this.loc[0] + cLanes[0], false);
                break;
              case "Underwater Ruin":
                new Tower('Underwater Ruin', 50, 50, 0, 0, 0, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'damage', 30, 'same', 'p', this.loc[0] + cLanes[0], false);
                break;
              case "Cloud":
                new Tower('Cloud', 50, 50, 50, 0, 0, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, null, undefined, undefined, undefined, this.loc[0] + cLanes[0], false); // the null is to show that it exists but not like this
                break;
              case "Windmill":
                new Tower('Windmill', 50, 50, 0, 0, 0, 0, null, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.loc[0] + cLanes[0], false);
                break;
              case "Archer Tower":
                new Tower('Archer Tower', 50, 50, 0, 0, 0, 0, 'damage', 10, 'same', 'p', undefined, undefined, undefined, undefined, null, undefined, undefined, undefined, this.loc[0] + cLanes[0], false);
                break;
              case "Ancient Temple":
                new Tower('Ancient Temple', 50, 50, 0, 0, 0.2, 0, 'healing', 5, 'same', undefined, undefined, undefined, undefined, undefined, null, undefined, undefined, undefined, this.loc[0] + cLanes[0], false);
                break;
              case "The Mirror":
                if (elanes[0] == undefined || elanes[1] == undefined || elanes[2] == undefined) {
                  for (let i = 0; i < 3; i++) {
                    if (elanes[i] == undefined) {
                      new Tower('The Mirror', 1, 1, 80, 0, 0, 0, undefined, undefined, undefined, undefined, 'damage', 5, 'all', 't', undefined, undefined, undefined, undefined, this.loc[0] + i, false);
                      break;
                    }
                  }
                }
                break;
              case "The Prism of Eternity":
                if (elanes[0] == undefined || elanes[1] == undefined || elanes[2] == undefined) {
                  for (let i = 0; i < 3; i++) {
                    if (elanes[i] == undefined) {
                      new Tower('The Prism of Eternity', 'i dont know yet', 'idk', 0, 0, 0, 0, 'damage', 10+10, 'others', null, undefined, undefined, undefined, undefined, 'healing', '20%', 'others', undefined, this.loc[0] + i, false);
                      break;
                    }
                  }
                }
                break;
              default:
                break;
            }
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
                for (let i of cLanes) {
                  if (elanes[i-1] != undefined) {
                    if (((elanes[i-1].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i-1].chance) || elanes[i-1].chance == 0) || elanes[i-1].stunned == true) { // basically, if the tower has a chance of blocking and the tower does NOT block, or the tower just can't block: make it take damage
                      elanes[i-1].hp -= (this.abone * (1 - elanes[i-1][this.abthree + 'def']));
                      affected += i;
                      elanes[i-1].hitted();
                    }
                  } else {
                    hit('enemy');
                  }
                }
                if (affected != '') {
                	anim('edamage' + affected);
                }
                affected = '';
                for (let i = 0; i < 3; i++) {
                  if (elanes[i].hp <= 0) {
              	     elanes[i] = undefined;
                    affected += (i+1);
                  }
                }
               if (affected != '') {
                  anim('edeath' + affected);
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
            	let i = Math.floor(Math.random() * 3);
              if (lanes[i] != undefined) {
                if (((lanes[i].chance > 0 && (Math.floor(Math.random() + 100) + 1) > lanes[i].chance) || lanes[i].chance == 0) || lanes[i].stunned == true) {
                  lanes[i].hp -= (this.abone * (1- lanes[i][this.abthree + 'def']));
                  affected += (i+1);
                  lanes[i].hitted();
                }
              } else {
                hit('player');
              }
            } else if (this.abtwo == 3) {
            	affected = '';
            	for (let i = 0; i < 3; i++) {
                if (lanes[i] != undefined) {
              	  if ((lanes[i].chance > 0 && (Math.floor(Math.random() + 100) + 1) > lanes[i].chance) || lanes[i].chance == 0) {
                    lanes[i].hp -= (this.abone * (1- lanes[i][this.abthree + 'def']));
                    affected += (i+1);
                    lanes[i].hitted();
                  }
                } else {
                  hit('player');
                }
              }
            }
            if (affected != '') {
            	anim('pdamage' + affected);
            }
            affected = '';
            for (let i = 0; i < 3; i ++) {
            	if (lanes[i].hp <= 0) {
              	lanes[i] = undefined;
                affected += (i+1);
              }
            }
            if (affected != '') {
            	anim('pdeath' + affected);
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
                  if (lanes[i-1] != undefined) {
                    if (lanes[i-1][this.abthree + 'def'] < this.abone) {
                      lanes[i-1][this.abthree + 'def'] = this.abone;
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
                  affected += (i+1);
                }
              }
            } else if (this.abtwo == 3) {
            	affected = '';
              if (elanes[i] != undefined) {
                for (let i = 0; i < 3; i++) {
                  if (elanes[i][this.abthree + 'def']) {
                    elanes[i][this.abhtree + 'def'] = this.abone;
                    affected += (i+1);
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
                  if (lanes[i-1] != undefined) {
                    if (lanes[i-1].hp < lanes[i-1].maxhp) {
                      lanes[i-1].hp += this.abone;
                      affected += i;
                    }
                    if (lanes[i-1].hp > lanes[i-1].maxhp) {
                      lanes[i-1].hp = lanes[i-1].maxhp;
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
					switch(this.name) {
            case 'Fish':
              discard.push(this);
              let j = Math.floor(Math.random() * (draw.length));
            	hand[hand.indexOf(this)] = draw[j];
              draw.splice(j, 1);
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
            	if (mana < 5) {
              	mana++;
              }
              hand[hand.indexOf(this)] = undefined;
              discard.push(this);
            	break;
            case 'Recall':
              let k = Math.floor(Math.random() * (discard.length));
            	hand[hand.indexOf(this)] = discard[k];
              discard.splice(k, 1);
              discard.push(this);
            	break;
            case 'Foraging':
            	if (mana < 5) {
              	mana++;
              }
              hand[hand.indexOf(this)] = undefined;
              discard.push(this);
          	default:
            	break;
          }
        }
        break;
      case "special":
        this.use = () => {
          switch(this.name) {
            case 'Combustion':
              break;
            case 'Fired Up':
              if (mana >= this.cost) {
                if (cLanes.length == 1) {
                  mana -= this.cost
                  affected = ''
                  if (lanes[cLanes[0]] != undefined) {
                    lanes[cLanes[0]].hp -= 10;
                    lanes[cLanes[0]].hitted();
                  }
                  affected += cLanes[0];
                  if (affected != '') {
                    anim('pdamage' + affected); // i forgot to check if there is actually a tower there so make sure you do that later
                  }
                  affected = ''
                  if (lanes[cLanes[0]] != undefined) {
                    if (lanes[cLanes[0]].mdef < 0.2) {
                      lanes[cLanes[0]].mdef = 0.2;
                      affected += cLanes[0];
                    }
                  }
                  if (affected != '') {
                    anim('pdefense' + affected);
                  }
                }
              }
              break;
            case 'Icicles':
                if (mana >= this.cost) {
                  if (cLanes.length == this.abtwo) {
                    mana -= this.cost;
                    affected = '';
                    for (let i of cLanes) {
                      if (elanes[i-1] != undefined) {
                        if ((elanes[i-1].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i-1].chance) || elanes[i-1].chance == 0) { // basically, if the tower has a chance of blocking and the tower does NOT block, or the tower just can't block: make it take damage
                          elanes[i-1].hp -= (this.abone * (1 - elanes[i-1][this.abthree + 'def']));
                          elanes[i-1].stunned = true; // stun it
                          affected += i;
                          elanes[i-1].hitted();
                        }
                      } else {
                        hit('enemy');
                      }
                    }
                    if (affected != '') {
                      anim('edamage' + affected);
                    }
                    affected = '';
                    for (let i = 0; i < 3; i++) {
                      if (elanes[i].hp <= 0) {
                          elanes[i] = undefined;
                        affected += (i+1);
                      }
                    }
                    if (affected != '') {
                      anim('edeath' + affected);
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
                      if (lanes[i-1] != undefined) {
                        if (lanes[i-1][mdef] < this.abone || lanes[i-1][mdef] < this.abone) {
                          affected += i;
                        }
                        if (lanes[i-1][mdef] < this.abone) {
                          lanes[i-1][mdef] = this.abone;
                        }
                        if (lanes[i-1][pdef] < this.abone) {
                          lanes[i-1][pdef] = this.abone;
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
            case 'Prestidigitation':
              break;
            case 'Gaias Blessing':
              if (mana >= this.cost) {
                if (cLanes.length == this.abtwo) {
                  mana -= this.cost;
                  affected = '';
                  for (let i of cLanes) {
                    if (lanes[i-1] != undefined) {
                      lanes[i-1].maxhp += 20;
                      if (lanes[i-1].hp < lanes[i-1].maxhp) {
                        lanes[i-1].hp += this.abone;
                        affected += i;
                      }
                      if (lanes[i-1].hp > lanes[i-1].maxhp) {
                        lanes[i-1].hp = lanes[i-1].maxhp;
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
                    if (lanes[i-1] != undefined) {
                      lanes[i-1].maxhp += 20;
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
            if (this.htwo == 'same') {
              affected = '';
              let i = this.loc[1]-1;
              if (elanes[i] != undefined) {
                if (((elanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i].chance) || elanes[i].chance == 0) || elanes[i].stunned == true)
                  elanes[i] -= (this.hone * (1-elanes[i][this.hthree + 'def']));
                  elanes[i].hitted();
                  affected += i;
              } else {
                hit('enemy');
              }
              if (affected != '') {
                anim(this.loc[0] + 'damage' + affected);
              }
            } else if (this.htwo == 'others') {
              affected = '';
              let k = [0, 1, 2]
              k.splice(k.indexOf(this.loc[1]-1), 1);
              let i = k[0];
              let j = k[1];
              if (elanes[i] != undefined) {
                if (((elanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i].chance) || elanes[i].chance == 0) || elanes[i].stunned == true)
                  elanes[i] -= (this.hone * (1-elanes[i][this.hthree + 'def']));
                  elanes[i].hitted();
                  affected += i;
              } else {
                hit('enemy');
              }
              if (elanes[j] != undefined) {
                if (((elanes[j].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[j].chance) || elanes[j].chance == 0) || elanes[j].stunned == true)
                  elanes[j] -= (this.hone * (1-elanes[j][this.hthree + 'def']));
                  elanes[j].hitted();
                  affected += j;
              } else {
                hit('enemy');
              }
              if (affected != '') {
                anim(this.loc[0] + 'damage' + affected);
              }
            } else if (this.htwo == 'all') {
              affected = '';
              for (let i = 0; i < 3; i++) {
                if (elanes[i] != undefined) {
                  if (((elanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i].chance) || elanes[i].chance == 0) || elanes[i].stunned == true)
                    elanes[i] -= (this.hone * (1-elanes[i][this.hthree + 'def']));
                    elanes[i].hitted();
                    affected += i;
                } else {
                  hit('enemy');
                }
              }
              if (affected != '') {
                anim(this.loc[0] + 'damage' + affected);
              }
            }
            break;
          case "healing":
            if (this.htwo == 'same') {
              affected = '';
              let i = this.loc[1]-1;
              if (lanes[i] != undefined) {
                if (lanes[i].hp < lanes[i].maxhp) {
                  lanes[i].hp += this.hone;
                  affected += i;
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
              k.splice(k.indexOf(this.loc[1]-1));
              let i = k[0];
              let j = k[1];
              if (lanes[i] != undefined) {
                if (lanes[i].hp < lanes[i].maxhp) {
                  lanes[i].hp += this.hone;
                  affected += i;
                }
                if (lanes[i].hp > lanes[i].maxhp) {
                  lanes[i].hp = lanes[i].maxhp;
                }
              }
              if (lanes[j] != undefined) {
                if (lanes[j].hp < lanes[j].maxhp) {
                  lanes[j].hp += this.hone;
                  affected += i;
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
                    affected += i;
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
            break;
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
          for (let i = 0; i < 3; i++) {
            if (((lanes[i].chance > 0 && (Math.floor(Math.random() + 100) + 1) > lanes[i].chance) || lanes[i].chance == 0) || lanes[i].stunned == true) {
              lanes[i].hp -= 5;
              affected += i;
            }
          }
          if (affected != '') {
            anim('pdamage' + affected);
          }
        }
      }
    }
    this.destroyed = () => {
      if (this.stunned == false) {
        switch (this.onhit) {
          case "damage":
            if (this.htwo == 'same') {
              affected = '';
              let i = this.loc[1]-1;
              if (elanes[i] != undefined) {
                if (((elanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i].chance) || elanes[i].chance == 0) || elanes[i].stunned == true)
                  elanes[i] -= (this.hone * (1-elanes[i][this.hthree + 'def']));
                  elanes[i].hitted();
                  affected += i;
              } else {
                hit('enemy');
              }
              if (affected != '') {
                anim(this.loc[0] + 'damage' + affected);
              }
            } else if (this.htwo == 'others') {
              affected = '';
              let k = [0, 1, 2]
              k.splice(k.indexOf(this.loc[1]-1), 1);
              let i = k[0];
              let j = k[1];
              if (elanes[i] != undefined) {
                if (((elanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i].chance) || elanes[i].chance == 0) || elanes[i].stunned == true)
                  elanes[i] -= (this.hone * (1-elanes[i][this.hthree + 'def']));
                  elanes[i].hitted();
                  affected += i;
              } else {
                hit('enemy');
              }
              if (elanes[j] != undefined) {
                if (((elanes[j].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[j].chance) || elanes[j].chance == 0) || elanes[j].stunned == true)
                  elanes[j] -= (this.hone * (1-elanes[j][this.hthree + 'def']));
                  elanes[j].hitted();
                  affected += j;
              } else {
                hit('enemy');
              }
              if (affected != '') {
                anim(this.loc[0] + 'damage' + affected);
              }
            } else if (this.htwo == 'all') {
              affected = '';
              for (let i = 0; i < 3; i++) {
                if (elanes[i] != undefined) {
                  if (((elanes[i].chance > 0 && (Math.floor(Math.random() * (100)) + 1) > elanes[i].chance) || elanes[i].chance == 0) || elanes[i].stunned == true)
                    elanes[i] -= (this.hone * (1-elanes[i][this.hthree + 'def']));
                    elanes[i].hitted();
                    affected += i;
                } else {
                  hit('enemy');
                }
              }
              if (affected != '') {
                anim(this.loc[0] + 'damage' + affected);
              }
            }
            break;
          case "healing":
            if (this.htwo == 'same') {
              affected = '';
              let i = this.loc[1]-1;
              if (lanes[i] != undefined) {
                if (lanes[i].hp < lanes[i].maxhp) {
                  lanes[i].hp += this.hone;
                  affected += i;
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
              k.splice(k.indexOf(this.loc[1]-1));
              let i = k[0];
              let j = k[1];
              if (lanes[i] != undefined) {
                if (lanes[i].hp < lanes[i].maxhp) {
                  lanes[i].hp += this.hone;
                  affected += i;
                }
                if (lanes[i].hp > lanes[i].maxhp) {
                  lanes[i].hp = lanes[i].maxhp;
                }
              }
              if (lanes[j] != undefined) {
                if (lanes[j].hp < lanes[j].maxhp) {
                  lanes[j].hp += this.hone;
                  affected += i;
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
                    affected += i;
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
            break;
          default:
            break;
        }
      }
    }
  }
};


