addLayer("p", {
        name: "Branches", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "🌳",
         // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
            points: new Decimal(0),
            time: new Number(0),
            ClickerMultiplier: new Decimal(1),
        }},
        color: "#4BDC13",
        requires: new Decimal(10), // Can be a function that takes requirement increases into account
        resource: "Tree Branches", // Name of prestige currency
        baseResource: "Water", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.5, // Prestige currency exponent
        update(diff) {player[this.layer].time+= diff},
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            if (hasUpgrade("p", 12)) mult = mult.times(upgradeEffect("p", 12))
            if (player.g.points > 0) mult = mult.times(player.g.MagnifyingLevel)
            if (hasUpgrade("p", 14)) mult = mult.times(player.p.ClickerMultiplier) 
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "p", description: "Reset for Tree Branches", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        clickables: {
            rows: 1,
            cols: 1,
            
            11: {
                unlocked() {if (hasUpgrade("p", 14)) {return true} else {return false}},
                display() {return "Multiplies Base Branch Gain (Increase by Clicking) Current Multiplier:" + format(player.p.ClickerMultiplier, 3) + "x"},
                canClick() {return true},
                onClick()  {return player.p.ClickerMultiplier = player.p.ClickerMultiplier.add(.01)}
                
            },
            
            
        },
        layerShown(){return true},
        upgrades: {
            rows: 4,
            cols: 4,
            11: {
                title: "Gain Water through the Photosynthesises",
                description: "Gain double the amount of branches you have in water",
                cost: new Decimal(1),
                
                effect() {
                    let ret = player[this.layer].points.multiply(2)
                    if (hasUpgrade("p", 1)) ret = ret.times(2)
                    if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
                        }
                    },
            12: {
                    title: "Branches On Branches",
                    description: "You gain more branches the more branches you have.",
                    cost: new Decimal(50),
                    unlocked() {if (hasUpgrade("p", 11)) return true; else false},
                    effect() {
                    {
                        let ret = player[this.layer].points 
                        if (ret < 1) {ret = ret.add(1)} else {ret = ret.pow(.2)}
                        if (hasUpgrade("p", 22)) ret = ret.pow(upgradeEffect("p", 22))
                        if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000");
                        return ret;
                            }
                        }
                },
            13: {
                    title: "Does Efficency Really Benefit Society?",
                    description: "Improves collection of branches in the first upgrade by 2x.",
                    cost: new Decimal(500),
                    unlocked() {if (hasUpgrade("p", 12)) return true; else false},
                    effect() {
                        let ret = new Decimal(2)
                        if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                        return ret;
                                }
                    }, 
            14: {
                    title: "Break Chemistry",
                    description: "Increases water gain based on amount of water. PS: Unlocks something too",
                    cost: new Decimal(1000),
                    unlocked() {if (hasUpgrade("p", 13)) return true; else false},
                    effect() {
                        let ret = player.points.pow(.2)
                        if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                        return ret;
                            }
                },
                
                22: {
                    title: "Exponential Branches",
                    description: "The above upgrade is taken to a power depending on your total branches.",
                    cost: new Decimal(2500),
                    unlocked() {if (hasUpgrade("p", 14)) return true; else false},
                    effect() {
                        {
                            let ret = player[this.layer].points 
                            if (ret < 1) {ret = ret.add(1)} else {ret = ret.pow(.001)}
                            if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000");
                            return ret;
                                }
                            }
                },         
                }
                
            }
            




    )
addLayer("c", {
        name: "Cans", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "💦", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { 
            
            return {
            unlocked: false,
            points: new Decimal(0),
            WaterMultiplier: new Decimal(0),
            
        }},
        base:new Decimal(2),
        update(diff) {player.c.WaterMultiplier = player.c.WaterMultiplier.times(.998)},
        
        
        tabFormat: {
            "Can Upgrades": 
            {content:[
                "main-display", "prestige-button", "resource-display", "milestones", "upgrades"] },
            "Can Filling": 
            {content:[
                "main-display",["bar", "bigBar"],"clickables", ],
            unlocked() {if (player.c.points.gte(5)) return true; else return false}     }
            
    },
        bars: {
            bigBar: {
                direction: UP,
                width: 50,
                height:  250,
                display() {return player.c.WaterMultiplier.round() + "X"},
                fillStyle: {'background-color' : "#0059b3"},
                baseStyle: {'background-color' : "#000000"},
                textStyle: {'color': '#70b7ff'},
                progress() {
                    return (player.c.WaterMultiplier.div(100)).toNumber()
                },
            ghostBar: {
                direction: RIGHT,
                width: 200,
                height:  100,
                progress() {
                    return (player.c.WaterMultiplier.div(100)).toNumber()
                },

            }    
            },
            
        },
        clickables: {
            rows: 1,
            cols: 1,
            
            11: {
                display() {return "Increase Water Level Current Water Level:" + player.c.WaterMultiplier.round()},
                canClick() {return true},
                onClick()  { if (player.c.WaterMultiplier < 99) {return player.c.WaterMultiplier = player.c.WaterMultiplier.add(1)}}
                
            },
            
            
        },
        branches: [["p", 1]],
        color: "#0059b3 ",
        requires: new Decimal(2500),
         // Can be a function that takes requirement increases into account
        resource: "Watering Cans", // Name of prestige currency
        baseResource: "Tree Branches", // Name of resource prestige is based on
        baseAmount() {return player.p.points}, // Get the current amount of baseResource
        type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        canBuyMax() {
            return hasMilestone("c", 1)
        },
        effect() {let ret = new Decimal(1).add(1).pow(player.c.points)
        return ret},
        effectDescription() {if (hasMilestone("c", 2)) {return "multiplying base water gain by " + 
        (new Decimal(2).pow(player.c.points.pow(.8)) + ", and fill level multiplying base water gain by " + 
        player.c.WaterMultiplier.round())} else {return "multiplying base water gain by " + (new Decimal(2).pow(player.c.points.pow(.8)))}},
        
        exponent: 1, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 1, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "c", description: "Reset for Watering Cans", onPress(){if (canReset(this.layer)) doReset(this.layer)}},

        ],
        layerShown(){if (player.p.points.gte(1250)) {return true} else if (player.c.points.gte(1)) {return true} else {return false}},
        milestones: {
            1: {
                requirementDescription: "2 Watering Cans",
                effectDescription: "-----Allows You to Max Buy Watering Cans-----",
                done() {if (player.c.points.gte(2)) {return true}else {return false}},

            },
            2: {
                requirementDescription: "5 Watering Cans",
                effectDescription: "---------Unlocks The Can Filling Tab---------",
                done() {if (player.c.points.gte(5)) {return true}else {return false}},

            }

        }



    }
    )
addLayer("g", {
        name: "Magnifier", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "🔍", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: false,
            points: new Decimal(0),
           MagnifyingLevel: new Decimal(1),
           currentMagnifyingRate: new Decimal(.001),
        }},
        update() {if (player.g.points > 0) {player.g.MagnifyingLevel = player.g.MagnifyingLevel.add(player.g.points.multiply(player.g.currentMagnifyingRate))} },
        branches: [["p", 1]],
        color: "#808080 ",
        requires: new Decimal(2500), // Can be a function that takes requirement increases into account
        
        resource: "Magnifying Glasses", // Name of prestige currency
        baseResource: "Tree Branches", // Name of resource prestige is based on
        baseAmount() {return player.p.points}, // Get the current amount of baseResource
        type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 1, // Prestige currency exponent
        base: new Decimal(2),
        effect() {let ret = new Decimal(1).add(1).pow(player.c.points)
            return ret},
        effectDescription() {if (hasMilestone("g", 2)) {return "and Magnifierying Levels go brrrr, multiplying base branch gain by " + 
        (format(player.g.MagnifyingLevel)) + ", which are producing the levels at a rate of " + 
        player.g.points.multiply(player.g.currentMagnifyingRate).multiply(20) + ", a second" } 
        else {return "and Magnifierying Levels go brrrr, multiplying base branch gain by " + (format(player.g.MagnifyingLevel)) + 
        ", which are producing the levels at a rate of " + 
        player.g.points.multiply(player.g.currentMagnifyingRate).multiply(20) + ", a second" }},
            
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 1, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "m", description: "Reset for Magnifying Glasses", onPress(){if (canReset(this.layer)) doReset(this.layer) }},
        ],
        canBuyMax() {
            return hasMilestone("g", 1)
        },
        layerShown(){if (player.p.points.gte(1250)) {return true} else if (player.g.points.gte(1)) {return true} else {return false}},
        upgrades: {
            rows: 2,
            cols: 3,
            
                
            },
        milestones: {
                1: {
                    requirementDescription: "2 Magnifying Glasses",
                    effectDescription: "---Allows You to Max Buy Magnifying Glasses---",
                    done() {if (player.g.points.gte(2)) {return true}else {return false}},
    
                },
                2: {
                    requirementDescription: "5 Magnifying Glasses",
                    effectDescription: "-------------Unlock The Magnifier------------- (Lmao Imagine Believing IN content",
                    done() {if (player.g.points.gte(5)) {return true}else {return false}},
    
                }}
        }
        



        
    )    