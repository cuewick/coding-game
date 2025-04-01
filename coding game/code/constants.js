const descriptions = {
    // FIRE CARDS
    Fireball: 'Deal 10 magic damage to one lane.',
    // when calling descriptions, remember to use replace() to replace spaces with underscores (and also use [] instead of . to call the variable)
    // also remove all apostrophes because gaias blessing 
    // ^^ actually i might not have to i forgot that "" is prioritized over '' so " ' " or something like that CAN exist
    Flame_Strike: "Deal 10 physical damage to one lane.",
    Solar_Flare: "Deal 10 magic damage to all lanes.",
    Firebolt: "Deal 30 true damage to one lane.",
    Fired_Up: "Give a tower 20% magic defense, but reduce its HP by 10. Does not stack.",
    Bonfire: "Increase a tower's HP by 20.",
    Combustion: "Temporarily remove this card and another card, but deal 20 magic damage to one lane.",
    Wizard_Tower: "Has 50 HP.\nOn Hit: Deal 10 magic damage to the same lane.\nOn Destroy: Deal 10 magic damage to all lanes.",
    Volcano: "Has 100 HP\nOn Destroy: Deal 30 physical damage to all lanes.",
    // WATER CARDS
    Icicles: "Deal 10 physical damage to and stun one lane.",
    Tidal_Wave: "Deal 10 physical damage to all lanes",
    Acid_Rain: "Deal 20 magic damage to two lanes.",
    Ice_Shield: "Give a tower 25% physical defense. Does not stack.",
    Water_Wall: "Give a tower 25% magic defense. Does not stack",
    Healing_Rain: "Increase all of your towers' HPs by 20.",
    Fish: "Move a card from your draw pile into your hand.",
    Ice_Castle: "Has 100 HP\nOn Hit: Deal 10 magic damage to the same lane.\nOn Destroy: Deal 10 magic damage to all lanes.",
    Underwater_Ruin: "Has 50 HP\nOn Destroy: Deal 30 physical damage to the same lane.",
    // AIR CARDS
    Galeforce: "Deal 10 magic damage to one lane.",
    Wind_Slice: "Deal 10 physical damage to one lane.",
    Tempest_Ward: "Give all of your towers 10% magic and physical defense. Does not stack.",
    Support_Chinook: "Increase two of your towers' HPs by 15.",
    Prestidigitation: "Turn this card into a selected card from your draw pile.",
    Circulate: "Temporarily remove this card and put all other cards in your hand back into your draw pile. Then, draw 3 new cards.",
    Conjure: "Gain 1 mana.",
    Recall: "Move a card from your discard pile back into your hand.",
    Cloud: "Has 50 HP. 50% chance to dodge incoming attacks.\nOn Destroy: This tower comes back to your discard pile.",
    Windmill: "Has 50 HP.\nOn Hit: Gain 1 mana.",
    // EARTH CARDS
    Volley: "Deal 10 physical damage to all lanes.",
    Earthquake: "Deal 20 physical damage to two lanes.",
    Overgrowth: "Give a tower 20% physical defense. Does not stack.",
    Gaias_Blessing: "Increase a tower's max HP by 20 and its HP by 30.", // might move this one more down as it is typically sorted by type and then rarity
    Healing_Spring: "Increase two towers' HPs by 30.",
    Reflourish: "Increase a tower's max HP by 10.",
    Foraging: "Gain 1 mana.",
    Archer_Tower: "Has 50 HP.\nOn Hit: Deal 10 physical damage to the same lane.\nOn Destroy: Add a temporary Volley card to your draw pile.",
    Ancient_Temple: "Has 50 HP. 20% defense against magic damage.\nOn Hit: Heal 5 HP.\nOn Destroy: Gain 1 mana.",
    // BOSS TOWERS
    Time_Altar: "Has 100 HP. You must destroy every Time Altar before attacking The Chronomancer\nHas 20% defense against magic and physical damage.\nOn Hit: Heal 2 HP.\nIf a Time Altar reaches critical condition (less than 25 HP) for the first time, it will gain 20 HP.",
    The_Mirror: "Has 1 HP. 80% chance to block incoming attacks.\nOn Block: All of your towers take 5 damage.",
    The_Prism_Of_Eternity: "Has ?? HP. Deals 100% more damage for every other Prism of Eternity currently in play.\nOn Hit: Your other two lanes take 10 physical damage and 10 magic damage each.\nOn Destroy: Heal both of the other lanes by 20% of their max HP."
};

function imgsrc(src) {
    const img = new Image();
    img.src = src;
    return img;
}

const sprites = {
    // MAIN GAME
    Background: imgsrc("../assets/main game/background.png"),
    Selection: imgsrc("../assets/main game/selection.png"),
    Discard: imgsrc("../assets/main game/discard.png"),
    Draw: imgsrc("../assets/main game/draw.png"),
    Hoverbox: imgsrc("../assets/main game/hoverbox.png"),
    End_Turn_Off: imgsrc("../assets/main game/end turn off.png"), // might shorten the names of these two
    End_Turn_On: imgsrc("../assets/main game/end turn on.png"),

    // MANA
    Mana0: imgsrc("../assets/main game/mana0.png"),
    Mana1: imgsrc("../assets/main game/mana1.png"),
    Mana2: imgsrc("../assets/main game/mana2.png"),
    Mana3: imgsrc("../assets/main game/mana3.png"),
    Mana4: imgsrc("../assets/main game/mana4.png"),
    Mana5: imgsrc("../assets/main game/mana5.png"),

    // SYMBOLS
    Heart: imgsrc("../assets/main game/heart.png"),
        // add the element symbols later

    // ANIMATIONS
    Damage: imgsrc("../assets/main game/damage.png"),
    Defense: imgsrc("../assets/main game/defense.png"),
    Healing: imgsrc("../assets/main game/healing.png"),


    // CARDS & TOWERS

    Fireball: imgsrc("../assets/cards/fireball.png"),
    Flame_Strike: imgsrc("../assets/cards/flame strike.png"),
    Solar_Flare: imgsrc("../assets/cards/solar flare.png"),
    Firebolt: imgsrc("../assets/cards/firebolt.png"),
    Fired_Up: imgsrc("../assets/cards/fired up.png"),
    Bonfire: imgsrc("../assets/cards/bonfire.png"),
    Combustion: imgsrc("../assets/cards/combustion.png"),
    Wizard_Tower: imgsrc("../assets/cards/wizard tower.png"),
    Volcano: imgsrc("../assets/cards/volcano.png"),
    // WATER CARDS
    Icicles: imgsrc("../assets/cards/icicles.png"),
    Tidal_Wave: imgsrc("../assets/cards/tidal wave.png"),
    Acid_Rain: imgsrc("../assets/cards/acid rain.png"),
    Ice_Shield: imgsrc("../assets/cards/ice shield.png"),
    Water_Wall: imgsrc("../assets/cards/water wall.png"),
    Healing_Rain: imgsrc("../assets/cards/healing rain.png"),
    Fish: imgsrc("../assets/cards/fish.png"),
    Ice_Castle: imgsrc("../assets/cards/ice castle.png"),
    Underwater_Ruin: imgsrc("../assets/cards/underwater ruin.png"),
    // AIR CARDS
    Galeforce: imgsrc("../assets/cards/galeforce.png"),
    Wind_Slice: imgsrc("../assets/cards/wind slice.png"),
    Tempest_Ward: imgsrc("../assets/cards/tempest ward.png"),
    Support_Chinook: imgsrc("../assets/cards/support chinook.png"),
    Prestidigitation: imgsrc("../assets/cards/prestidigitation.png"),
    Circulate: imgsrc("../assets/cards/circulate.png"),
    Conjure: imgsrc("../assets/cards/conjure.png"),
    Recall: imgsrc("../assets/cards/recall.png"),
    Cloud: imgsrc("../assets/cards/cloud.png"),
    Windmill: imgsrc("../assets/cards/windmill.png"),
    // EARTH CARDS
    Volley: imgsrc("../assets/cards/volley.png"),
    Earthquake: imgsrc("../assets/cards/earthquake.png"),
    Overgrowth: imgsrc("../assets/cards/overgrowth.png"),
    Gaias_Blessing: imgsrc("../assets/cards/gaias blessing.png"),
    Healing_Spring: imgsrc("../assets/cards/healing spring.png"),
    Reflourish: imgsrc("../assets/cards/reflourish.png"),
    Foraging: imgsrc("../assets/cards/foraging.png"),
    Archer_Tower: imgsrc("../assets/cards/archer tower.png"),
    Ancient_Temple: imgsrc("../assets/cards/ancient temple.png"),
    // BOSS TOWERS
    Time_Altar: imgsrc("../assets/cards/time altar.png"),
    The_Mirror: imgsrc("../assets/cards/the mirror.png"),
    The_Prism_Of_Eternity: imgsrc("../assets/cards/the prism of eternity.png"),
};