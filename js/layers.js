function getMBuyableCost(id){
    return layers.m.buyables[id].cost()
}
function getMBuyableEff(id){
    return layers.m.buyables[id].effect()
}

addLayer("p", {
        name: "Branches", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "",
         // This appears on the layer's node. Default is the id with the first letter capitalized
        
         position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
         
        startData() { return {
            unlocked: true,
            points: new Decimal(0),
            time: new Number(0),
            ClickerMultiplier: new Decimal(1),
            mult: new Decimal(1),
            unlockOrder: new Decimal(0),
        }},
        nodeStyle() {
            {return {'border-color': 'rgba(75, 220, 19, 1)','background-image': 'url(https://scx2.b-cdn.net/gfx/news/2018/europeslostf.jpg)'}}
        },
        
        
        color: "#4BDC13",
        requires: new Decimal(10), // Can be a function that takes requirement increases into account
        resource: "Tree Branches", // Name of prestige currency
        baseResource: "Water", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.5, // Prestige currency exponent
        update() {
            if (hasMilestone("g", 2)) {player.p.points = player.p.points.add(getResetGain("p").times(player.g.magnifierbest.div(100)))};
            if (hasMilestone("c", 2)) {player.p.ClickerMultiplier = player.p.ClickerMultiplier.add((new Decimal(.05)).pow(player.p.ClickerMultiplier).div(20).times(player.c.WaterMultiplier.div(10)))}

            },

        gainMult() { // Calculate the multiplier for main currency from bonuses
            let mult = new Decimal(1)
            if (hasUpgrade("p", 12)) mult = mult.times(upgradeEffect("p", 12))
            if (player.g.points > 0) mult = mult.times(player.g.MagnifyingLevel)
            if (hasUpgrade("p", 14)) mult = mult.times(player.p.ClickerMultiplier) 
            if (player.m.points > 0) mult = mult.times(player.m.points.times(player.m.points).add(1))
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
                display() {return "Multiplies Base Branch Gain (Increase by Clicking with decreasing rewards) Current Multiplier:" + format(player.p.ClickerMultiplier, 3) + "x"},
                canClick() {return true},
                onClick()  {return player.p.ClickerMultiplier = player.p.ClickerMultiplier.add((new Decimal(.05)).pow(player.p.ClickerMultiplier))}
            },
            
            
        },
        layerShown(){return true},
        upgrades: {
            rows: 4,
            cols: 4,
            11: {
                title: "Some Branches Nose-Dive Into The Ground",
                description: "Gain double the amount of branches you have in water",
                cost() {return new Decimal(1) || hasMilestone("c", 1)} ,
                style: {'link' : "https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_str_style"},
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
                    title: "Clicking Branches",
                    description: "The above upgrade (Branches On Branches) is taken to a power depending on your total click Multiplier.",
                    cost: new Decimal(2500),
                    unlocked() {if (hasUpgrade("p", 14)) return true; else false},
                    effect() {
                        {
                            let ret = player.p.ClickerMultiplier
                            ret = (new Decimal(1.5).sub((new Decimal(1.5).sub(new Decimal(1))).div((ret.log(5)).add(1))))
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
        symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { 
            
            return {
            unlocked: false,
            points: new Decimal(0),
            WaterMultiplier: new Decimal(0),
            unlockOrder: new Number(0),
            WMCAD: new Decimal(1),
            canbuymax: false,
            
        }},
        nodeStyle() {
            {return {'border-color': 'rgba(0, 89, 179, 1)','background-image': 'url(data:image/jpeg;base64,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)', 'background-repeat':'no-repeat','background-size':'200px 100px','background-position':'-50px'}}
            },
            requires() {if (player[this.layer].unlockOrder > 0 &&! hasUpgrade("c", 12)) {return new Decimal(675000)} else {return new Decimal(2500)}},
        update(diff) {player.c.WaterMultiplier = player.c.WaterMultiplier.times(.998)
            if (getBuyableAmount("m" , 31) > 0 && getResetGain("c") > 1 && player[this.layer].unlocked == true) {generatePoints("c", (diff*(getMBuyableEff(31))))}
        },
        base() {if (player.c.canbuymax == true) {return new Decimal(100)} else {return new Decimal(2)}},
        
        tabFormat: {
            "Can Upgrades": 
            {content:[
                "main-display",["infobox", "lore"], "prestige-button", "resource-display", ["clickable", "12"], "milestones", "upgrades", ] },
            "Can Filling": 
            {content:[
                "main-display",["bar", "bigBar"],["clickable", "11"], ],
            unlocked() {if (hasMilestone("c", 2)) return true; else return false}     }
            
    },
   
   
        bars: {
            bigBar: {
                direction: UP,
                width: 50,
                height:  250,
                display() {return player.c.WaterMultiplier.round() + "G"},
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
            cols: 2,
            
            11: {
                display() {return "Increase Water Level Current Water Level:" + player.c.WaterMultiplier.round()},
                canClick() {return true},
                onClick()  { if (player.c.WaterMultiplier < 99) {if (player.c.WMCAD > 0) 
                return player.c.WaterMultiplier = player.c.WaterMultiplier.add(player.c.WMCAD)
                else player.c.WaterMultiplier = player.c.WaterMultiplier.add(1)}}
                
            },
            12: {
                display() {return "Swap Between Max Buy and Singular Buy With a Reduced Cost CanBuyMax:" + player.c.canbuymax},
                canClick() {return true},
                onClick() {player.c.canbuymax = !player.c.canbuymax},
                unlocked() {return hasMilestone("c", 1)}
            },
            
        },
        upgrades: {
            rows: 1,
            cols: 2,
            11: {
                title: "Fill Watering Cans With Your Own Water",
                description: "Water Per Second Increases Watering Multiplier",
                cost: new Decimal(2),
                effect() {
                    let ret = player.points.add(1).log(10).pow(.5)
                    return ret;
                },
            },
            12: {
                title: "Anyone Can Pretend",
                description: "Watering Cans Pretend As If You Chose Them First",
                cost: new Decimal(10),
                unlocked() {if  (player[this.layer].unlockOrder == new Decimal(0)) {return false} else return true },
                    },        
        
        },
        exponent() {if (getBuyableAmount("m", 31) < 1){return new Decimal(1)} else return new Decimal(.25)},
        branches: [["p", 1]],
        color: "#0059b3 ",
         // Can be a function that takes requirement increases into account
        resource: "Watering Cans", // Name of prestige currency
        baseResource: "Tree Branches", // Name of resource prestige is based on
        baseAmount() {return player.p.points}, // Get the current amount of baseResource
        type() {if (getBuyableAmount("m", 31) > 0) {return "normal"} else return "static"}, // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        canBuyMax() {
            return player.c.canbuymax
        },
        prestigeButtonText() {
            return "Reset for +" + getResetGain + " " + player.c.resource + " Req: " + player[this.layer].points + "/" + getNextAt

        },
        canReset() {return true},
        effect() {let ret = new Decimal(1).add(1).pow(player.c.points)
        return ret},
        effectDescription()
        {
            let mult = "multiplying base water gain by " + format(new Decimal(2).pow(player.c.points.pow(.8)).times(getMBuyableEff(21)))
            if (hasUpgrade("c", 11)) mult = "multiplying base water gain by " + 
            format(new Decimal(2).pow(player.c.points.pow(.8)).times(upgradeEffect("c", 11)).times(getMBuyableEff(21)))
            if (getBuyableAmount("m", 31)>0 && player.c.points > 0) mult = "multiplying base water gain by " + 
            format(new Decimal(2).pow((new Decimal(22).sub((new Decimal(22).sub(new Decimal(2))).div((player.c.points.log(2)).add(1))))).times(upgradeEffect("c", 11)).times(getMBuyableEff(21)))
            let fill = ", and fill level multiplying base water gain by " + player.c.WaterMultiplier.pow(.2).round()
            let click = ", and clicking the clicking multiplier by " + format(((new Decimal(.05)).pow(player.p.ClickerMultiplier).times(player.c.WaterMultiplier.div(10)))) + " times a second"
            if (hasMilestone("c", 2)) {return mult + fill + click} else return mult



        },
      
        increaseUnlockOrder: ["c", "g"],
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
        layerShown()
        {if (player.p.points.gte((tmp[this.layer].requires).times(.5))) {return true}; 
         if (player.m.points > 0) {return true}; 
         if (player[this.layer].points > 1) {player[this.layer].unlocked = true}  return player[this.layer].unlocked
        },
        milestones: {
            1: {
                requirementDescription: "2 Watering Cans",
                effectDescription: "Allows You to Max Buy Watering Cans And Swap It",
                done() {if (player.c.points.gte(2)) {return true}else {return false}},

            },
            2: {
                requirementDescription: "5 Watering Cans",
                effectDescription: "----------Unlocks The Can Filling Tab----------",
                done() {if (player.c.points.gte(5)) {return true}else {return false}},

            },

        }



    }
    )
addLayer("g", {
        name: "Magnifier", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: false,
            points: new Decimal(0),
            MagnifyingLevel: new Decimal(1),
            currentMagnifyingRate: new Decimal(.001),
            magnifierLevel: new Decimal(0),
            magnifierbest: new Decimal(0),
            unlockOrder: new Number(0),
            canbuymax: false,
            magnifyingleveladdrate: new Decimal(10),
            time: new Decimal(0),
        }},
        nodeStyle() {
            {return {'border-color': 'rgba(171, 171, 171, 1)','background-image': 'url(https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)', 'background-repeat':'no-repeat','background-size':'cover','background-position':'0px -25px'
        }}
        },
        increaseUnlockOrder: ["c", "g"],
        update(diff) {if (player.g.points > 0) {
        //if (getBuyableAmount("m", 32) > 0 && player.g.points > 0 && hasUpgrade("c", 1)) {player.g.MagnifyingLevel = player.g.MagnifyingLevel.add((new Decimal(200000000).sub((new Decimal(200000000).sub(new Decimal(2))).div(((player.g.points.multiply(player.g.currentMagnifyingRate)).log(2))))).times(upgradeEffect("g", 11).times(getMBuyableEff(22))).multiply(20))}
        //else if (getBuyableAmount("m", 32) > 0 && player.g.points > 0) {player.g.MagnifyingLevel = player.g.MagnifyingLevel.add((new Decimal(200000000).sub((new Decimal(200000000).sub(new Decimal(2))).div(((player.g.points.multiply(player.g.currentMagnifyingRate)).log(2))))).times(getMBuyableEff(22))).multiply(20)}
        if (getBuyableAmount("m", 32) > 0 && player.g.points > 0 && hasUpgrade("g", 11)) player.g.MagnifyingLevel = player.g.MagnifyingLevel.add(((new Decimal(200000000).sub((new Decimal(200000000).sub(new Decimal(2))).div(((player.g.points.multiply(player.g.currentMagnifyingRate)).log(2)).add(1))))).times(upgradeEffect("g", 11).times(getMBuyableEff(22))))
        else if (getBuyableAmount("m", 32) > 0 && player.g.points > 0) player.g.MagnifyingLevel = player.g.MagnifyingLevel.add(((new Decimal(200000000).sub((new Decimal(200000000).sub(new Decimal(2))).div(((player.g.points.multiply(player.g.currentMagnifyingRate)).log(2)).add(1))))).times((getMBuyableEff(22))))
        else if (player.g.points > 0 && hasUpgrade("g", 11)) {player.g.MagnifyingLevel = player.g.MagnifyingLevel.add(player.g.points.add(1).multiply(player.g.currentMagnifyingRate).times(upgradeEffect("g", 11).times(getMBuyableEff(22))).div(2))} 
        else if (player.g.points > 0) {player.g.MagnifyingLevel = player.g.MagnifyingLevel.add(player.g.points.add(1).multiply(player.g.currentMagnifyingRate).times((getMBuyableEff(22))).div(2))} 
        if (hasMilestone("g", 2)) {player.g.magnifierLevel = player.g.magnifierLevel.add(player.g.magnifyingleveladdrate)} 
        if (hasMilestone("g", 2) && player.g.magnifierLevel > 101) {player.g.magnifyingleveladdrate = new Decimal(-10)}
        if (hasMilestone("g", 2) && player.g.magnifierLevel < 0) {player.g.magnifyingleveladdrate = new Decimal(10)}
        if (getBuyableAmount("m" , 32) > 0 && getResetGain("g") > 1 && player[this.layer].unlocked == true) {generatePoints("g", (diff*(getMBuyableEff(32))))}
        }},
        branches: [["p", 1]],
        color: "#ababab ",
        base() {if (player.g.canbuymax == true) {return new Decimal(100)} else {return new Decimal(2)}},
        requires() {if (player[this.layer].unlockOrder > 0 &&! hasUpgrade("g", 12)) {return new Decimal(675000)} else {return new Decimal(2500)}}, // Can be a function that takes requirement increases into account
        tabFormat: {
            "Magnifying Upgrades": 
            {content:[
                "main-display", "prestige-button", "resource-display",["clickable", 12], "milestones", "upgrades", ] },
            "The Magnifier": 
            {content:[
                "main-display",
                ["bar", "DownBar"],
                ["row", [
                    ["column", [
                        ["bar", "RightBar"]],
                    ],
                    ["column", [
                        ["clickable", 11]],
                    ],
                    ["column", [
                        ["bar", "LeftBar"]],
                    ],
                ]
                
            ],
            ["bar", "UpBar"]
                ]
                ,
            unlocked() {if (hasMilestone("g", 2)) return true; else return false}     }
            
    },
        bars: {
            UpBar: {
                direction: UP,
                width: 100,
                height:  250,
                display() {return player.g.magnifierLevel.round()},
                fillStyle: {'background-color' : "#f9d71c"},
                baseStyle: {'background-color' : "#505050",},
                textStyle: {'color': '#000000'},
            
                progress() {
                    return (player.g.magnifierLevel.div(100)).toNumber()
                }
            },
            DownBar: {
                    direction: DOWN,
                    width: 100,
                    height:  250,
                    display() {return player.g.magnifierLevel.round()},
                    fillStyle: {'background-color' : "#f9d71c"},
                    baseStyle: {'background-color' : "#505050"},
                    textStyle: {'color': '#000000'},
                    progress() {
                        return (player.g.magnifierLevel.div(100)).toNumber()
                    },
                },
            RightBar: {
                        direction: RIGHT,
                        width: 250,
                        height:  100,
                        display() {return player.g.magnifierLevel.round()},
                        fillStyle: {'background-color' : "#f9d71c"},
                        baseStyle: {'background-color' : "#505050"},
                        textStyle: {'color': '#000000'},
                        progress() {
                            return (player.g.magnifierLevel.div(100)).toNumber()
                        }
                    },
            LeftBar: {
                            direction: LEFT,
                            width: 250,
                            height:  100,
                            display() {return player.g.magnifierLevel.round()},
                            fillStyle: {'background-color' : "#f9d71c"},
                            baseStyle: {'background-color' : "#505050"},
                            borderStyle:{'color' : "#ff0000"},
                            textStyle: {'color': '#000000'},
                            progress() {
                                return (player.g.magnifierLevel.div(100)).toNumber()
                            }            

                
            },
            
        },
        clickables: {
            rows: 1,
            cols: 1,
            
            11: {
                display() {return "MAGNIFY (Gain a percentage of total branch gain based on last magnify value) Current:" + player.g.magnifierbest + "%"},
                canClick() {return true},
                onClick()  {{player.g.magnifierbest = player.g.magnifierLevel}},
               // automate() {if () {}},
                style: {'background-color' : "#ff0000", 'font-size': "10pt"},
                
            },
            12: {
                display() {return "Swap Between Max Buy and Singular Buy With a Reduced Cost CanBuyMax:" + player.g.canbuymax},
                canClick() {return true},
                onClick() {player.g.canbuymax = !player.g.canbuymax},
                unlocked() {return hasMilestone("g", 1)}
            },
            
            
        },
        increaseUnlockOrder: ["c", "g"],
        resource: "Magnifying Glasses", // Name of prestige currency
        baseResource: "Tree Branches", // Name of resource prestige is based on
        baseAmount() {return player.p.points}, // Get the current amount of baseResource
        type() {if (getBuyableAmount("m", 32) > 0) {return "normal"} else return "static"}, // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent() {if (getBuyableAmount("m", 32) < 1){return new Decimal(1)} else return new Decimal(.25)}, // Prestige currency exponent
        effect() {let ret = new Decimal(1).add(1).pow(player.c.points)
            return ret},
        effectDescription() { {
        let mult = "and Magnifierying Levels go brrrr, multiplying base branch gain by " + format(player.g.MagnifyingLevel) 
        let rate = ", which are producing the levels at a rate of " + format(player.g.points.multiply(player.g.currentMagnifyingRate).multiply(getMBuyableEff(22)).multiply(20)) + " a second"
        if (hasUpgrade("g", 11)) rate = ", which are producing the levels at a rate of " + format(player.g.points.multiply(player.g.currentMagnifyingRate).multiply(upgradeEffect("g", 11)).multiply(getMBuyableEff(22)).multiply(20)) + " a second"
        
        if (getBuyableAmount("m", 32) > 0 && player.g.points > 0 && hasUpgrade("g", 11)) rate = ", which are producing the levels at a rate of " + format(((new Decimal(200000000).sub((new Decimal(200000000).sub(new Decimal(2))).div(((player.g.points.multiply(player.g.currentMagnifyingRate)).log(2)).add(1))))).times(upgradeEffect("g", 11).times(getMBuyableEff(22))).multiply(20)) + " a second" 
        else if (getBuyableAmount("m", 32) > 0 && player.g.points > 0) rate = ", which are producing the levels at a rate of " + format(((new Decimal(200000000).sub((new Decimal(200000000).sub(new Decimal(2))).div(((player.g.points.multiply(player.g.currentMagnifyingRate)).log(2)).add(1))))).times((getMBuyableEff(22))).multiply(20)) + " a second" 
        else if (player.g.points < 0) rate = ", which are producing the levels at a rate of 0 a second" 
        return mult + rate}},
            
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 1, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "g", description: "Reset for Magnifying Glasses", onPress(){if (canReset(this.layer)) doReset(this.layer) }},
        ],
        canBuyMax() {
  
                return player.g.canbuymax

        },
        layerShown(){if (player.p.points.gte((tmp[this.layer].requires).times(.5))) {return true};
        if (player.m.points > 0) {return true}; 
        if (player[this.layer].points > 1) {player[this.layer].unlocked = true}
        return player[this.layer].unlocked},
        upgrades: {
            rows: 1,
            cols: 2,
            11: {
                title: "Magnifying Magnifies",
                description: "Magnifying Glasses Generate More Based On How Many There Are",
                cost: new Decimal(2),
                effect() {
                    if (player.g.points > 0){
                    let ret = player.g.points.times(2).pow(.8)
                    if (getBuyableAmount("m", 32)) ret = player.g.points.times(2).pow(.2)
                    if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
            }}
                    },
                    12: {
                        title: "Anyone Can Pretend",
                        description: "Magnifying Glasses Pretend As If You Chose Them First",
                        cost: new Decimal(10),
                        unlocked() {if  (player[this.layer].unlockOrder == new Decimal(0)) {return false} else return true },
                            },        
                
            },
        milestones: {
                1: {
                    requirementDescription: "2 Magnifying Glasses",
                    effectDescription: "----Allows You to Max Buy Magnifying Glasses----",
                    done() {if (player.g.points.gte(2)) {return true}else {return false}},
    
                },
                2: {
                    requirementDescription: "5 Magnifying Glasses",
                    effectDescription: "--------------Unlock The Magnifier--------------",
                    done() {if (player.g.points.gte(5)) {return true}else {return false}
                },
                3: {
                    requirementDescription: "15 Watering Cans",
                    effectDescription: "----------Unlocks Automation Upgrades----------",
                    done() {if (player.g.points.gte(15)) {return true}else {return false}},
    
                },
    
                }}
        }
        



        
    )    
addLayer("m", {
        name: "Metal", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: false,
            points: new Decimal(0),
            factoriesextra: new Decimal(0),
            samuelsextra: new Decimal(0),
            apesextra: new Decimal(0),
            godsextra: new Decimal(0),
            autobuyon: false,
        }},
        update(diff)
        {
            if (getBuyableAmount("m", 12) > 0) {player.m.factoriesextra = player.m.factoriesextra.add(getMBuyableEff(12).div(20))}
            if (getBuyableAmount("m", 13) > 0) {player.m.samuelsextra = player.m.samuelsextra.add(getMBuyableEff(13).div(20))}
            if (getBuyableAmount("m", 14) > 0) {player.m.apesextra = player.m.apesextra.add(getMBuyableEff(14).div(20))}
            if (getBuyableAmount("m", 15) > 0) {player.m.godsextra = player.m.godsextra.add(getMBuyableEff(15).div(20))}
        },
        
        automate() {
            if (hasMilestone("m", 2)) {if (canReset(this.layer)) {doReset(this.layer)}}
           
            if (hasUpgrade("m", 15) && player.m.autobuyon == true) {layers.m.buyables[15].buy()}
            if (hasUpgrade("m", 14) && player.m.autobuyon == true) {layers.m.buyables[14].buy()}
            if (hasUpgrade("m", 13) && player.m.autobuyon == true) {layers.m.buyables[13].buy()}
            if (hasUpgrade("m", 12) && player.m.autobuyon == true) {layers.m.buyables[12].buy()}
            if (hasUpgrade("m", 11) && player.m.autobuyon == true) {layers.m.buyables[11].buy()}
            if (hasUpgrade("m", 32)) {
                if (player.m.autobuyon == true) {layers.m.buyables[21].buy()}
                if (player.m.autobuyon == true) {layers.m.buyables[22].buy()}
                if (player.m.autobuyon == true) {layers.m.buyables[31].buy()}
                if (player.m.autobuyon == true) {layers.m.buyables[32].buy()}
            }
            /* } else {
            if (hasUpgrade("m", 15) && player.m.autobuyon == true) {buyMaxBuyable("m", 15)}
            if (hasUpgrade("m", 14) && player.m.autobuyon == true) {buyMaxBuyable("m", 15)}
            if (hasUpgrade("m", 13) && player.m.autobuyon == true) {buyMaxBuyable("m", 13)}
            if (hasUpgrade("m", 12) && player.m.autobuyon == true) {buyMaxBuyable("m", 12)}
            if (hasUpgrade("m", 11) && player.m.autobuyon == true) {buyMaxBuyable("m", 11)}
            }
            
            */
            
        },
        branches: [["c", 1], ["g", 1]],
        nodeStyle() {
            {return {'border-color': '#7b9095','background-image': 'url(data:image/jpeg;base64,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)', 'background-repeat':'no-repeat','background-size':'cover','background-position':''
        }}},
        color: "#7b9095",
        effectDescription() {
            let mult = "multiplying buyables effect and base water and branch gain by " + format(player.m.points.times(player.m.points).add(1))
            //if (hasUpgrade("c", 11)) mult = "multiplying base water gain by " + format(new Decimal(2).pow(player.c.points.pow(.8)).times(upgradeEffect("c", 11)))
            //let fill = ", and fill level multiplying base water gain by " + player.c.WaterMultiplier.pow(.2).round()
            //let click = ", and clicking the clicking multiplier by " + format(((new Decimal(.05)).pow(player.p.ClickerMultiplier).times(player.c.WaterMultiplier.div(10)))) + " times a second"
            //if (hasMilestone("c", 2)) {return mult + fill + click} else 
            return mult
        },
        canBuyMax() {
            if (hasMilestone("m", 1)) return true
        },
        
        milestones: {
            1: {
                requirementDescription: "2 Metal",
                effectDescription: "----Imagine Reseting Everything Smh(PSTtt unlocks somethings) {PPs capitalims go beraerr}----",
                done() {if (player.m.points.gte(2)) {return true}else {return false}},

            },
            2: {
                requirementDescription: "50 Metal",
                effectDescription: "Metal Autobuys Itself",
                done() {if (player.m.points.gte(50)) {return true}else {return false}
            },
            

            }},
        requires: new Decimal(20), // Can be a function that takes requirement increases into account
        base(){
            
            if (getBuyableAmount("m", 11) > 0 && (new Decimal(100).div(getMBuyableEff(11))) > 1)  return new Decimal(100).div(getMBuyableEff(11))
            else if (getBuyableAmount("m", 11) > 0 && (new Decimal(100).div(getMBuyableEff(11))).lte(1)) {return new Decimal(1.00000001)} else {return (new Decimal(100))}
            
        },
        resource: "Metal", // Name of prestige currency
        baseResource: "Watering Cans and Magnifying Glasses", // Name of resource prestige is based on
        baseAmount() {
        if (player.c.points.gte( player.g.points) ) {return player.g.points}
        else {return player.c.points}}, // Get the current amount of baseResource
        type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 1, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
           
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 2, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "m", description: "Reset for Metal", onPress(){ if (canReset(this.layer)) {doReset(this.layer)} }},
        ],
        resetsNothing() { if (hasMilestone("m", 1)) {return true} else false },
        layerShown(){if (layers.m.requires.times(.5).lte( player.c.points && player.g.points)) {return true}
         else if (player.m.points.gte(1)) {player.m.unlocked = true} 
         
         return player.m.unlocked},
         clickables: 
         {  
             rows: 1,
            cols: 1,
            11: {
            display() {return "Swap Between Autobuying Factories on And Off:" + player.m.autobuyon},
            canClick() {return true},
            onClick() {player.m.autobuyon = !player.m.autobuyon},
            unlocked() {return hasMilestone("m", 2)}
        },},
        buyables: {
            rows: 3,
            cols: 5,
            11: {
                display() {
                let desc = "<b><h2>Factory (Divides the Cost of the Metal)</h2></b><br>"    
                let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 11) +"+" + format(player.m.factoriesextra) + " generated</b><br>"
                let eff = "<b><h2>Effect</h2>:  ÷" + format(getMBuyableEff(11)) + " (unaffected by metal multiplier)</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getMBuyableCost(11)) + " Metal</b><br>"
                return desc + start + eff + cost},
                buyMax() {
                    let cost = getMBuyableCost(11)
                        if (!layers.m.buyables[11].canAfford()) return
                        player.m.buyables[11] = player.m.buyables[11].plus(1)
                        if (!hasUpgrade("m", 25)) player.m.points = player.m.points.minus(cost)
                },
                cost(a) {
                    let ret = getBuyableAmount("m", 11).times(2).round()
                    if (ret < 1) ret = new Decimal(1)
                    return ret;
                },
                style: {
                //    'color': "#FFFFFF", 'width' : "175px", 'height' : "175px", 'font-size' : "8pt", 'background-image' : "url(https://negativespace.co/wp-content/uploads/2020/05/negative-space-old-factory-building-1536x1025.jpg)" 
                },
                effect() {
                    if ((getBuyableAmount("m", 11).add(player.m.factoriesextra)) > 0) {let x = ((new Decimal(100).sub((new Decimal(100).sub(new Decimal(1))).div(((getBuyableAmount("m", 11).add(player.m.factoriesextra)).log(10)).add(1)))))
                    
                    return x}
        },
                canAfford() {if (player.m.points.gte(getMBuyableCost(11))) {return true}},
                unlocked() {if (player.m.points.gte(2) || getBuyableAmount("m", 11) > 0) {return true} else false},
                buy(ticks=1) {let cost = getMBuyableCost(11)
                    if (!layers.m.buyables[11].canAfford()) return
                    player.m.buyables[11] = player.m.buyables[11].plus(1)
                    if (!hasUpgrade("m", 25)) {player.m.points = player.m.points.minus(cost)}}
            },
            12: {
                display() {
                let desc = "<b><h2>Samuel Slaters (Produces Factories)</h2></b><br>"    
                let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 12) +"+" + format(player.m.samuelsextra) + " generated</b><br>"
                let eff = "<b><h2>Effect</h2>: generates Factories " + format(getMBuyableEff(12)) + " times a second(unaffected by metal multiplier)</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getMBuyableCost(12)) + " Metal</b><br>"
                return desc + start + eff + cost},
                buyMax() {return hasUpgrade("m", 32)},
                cost(a) {
                    let ret = getBuyableAmount("m", 12).times(20).add(100).round()
                    if (ret < 1) ret = new Decimal(100)
                    return ret;
                },
                style: {
                //    'color': "#ffffff", 'width' : "175px", 'height' : "175px", 'font-size' : "8pt", 'background-image' : "url(https://cdn.britannica.com/35/180935-050-9949F288/Samuel-Slater.jpg)" 
                },
                effect() {
                    let x = getBuyableAmount("m", 12).add(player.m.samuelsextra).pow(.9)
                    if (hasUpgrade("m", 21)) x = x.times(upgradeEffect("m", 21))
                    if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                    x = x.times(player.m.points.pow(2))
                    
                    return x;
                },
                canAfford() {if (player.m.points.gte(getMBuyableCost(12))) {return true}},
                unlocked() {if (player.m.points.gte(50) || getBuyableAmount("m", 12) > 0) {return true} else false},
                buy(ticks=1) {let cost = getMBuyableCost(12)
                    if (!layers.m.buyables[12].canAfford()) return
                    player.m.buyables[12] = player.m.buyables[12].plus(1)
                    if (!hasUpgrade("m", 25)) {player.m.points = player.m.points.minus(cost)}}
            },
            13: {
                display() {
                let desc = "<b><h2>Apes (Produces Samuel Slaters)</h2></b><br>"    
                let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 13) +"+" + format(player.m.apesextra) + " generated</b><br>"
                let eff = "<b><h2>Effect</h2>: generates Samuel Slaters " + format(getMBuyableEff(13)) + " times a second(unaffected by metal multiplier)</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getMBuyableCost(13)) + " Metal</b><br>"
                return desc + start + eff + cost},
                buyMax() {return hasUpgrade("m", 32)},
                cost(a) {
                    let ret = getBuyableAmount("m", 13).times(250).add(2000).round()
                    if (ret < 1) ret = new Decimal(2000)
                    return ret;
                },
                style: {
                  //  'color': "#ffffff", 'width' : "175px", 'height' : "175px", 'font-size' : "8pt", 'background-image' : "url(https://media.npr.org/assets/img/2015/10/08/istock_000013696787_small-40f929a109f759d798fc1d8afc718cc78a2ac18b-s800-c85.jpg)" 
                },
                effect() {
                    let x = getBuyableAmount("m", 13).add(player.m.apesextra).pow(.8)
                    if (hasUpgrade("m", 22)) x = x.times(upgradeEffect("m", 22))
                    if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                    x = x.times(player.m.points.pow(2))
                    if (x < 1) x = new Decimal(1)
                    return x;
                },
                canAfford() {if (player.m.points.gte(getMBuyableCost(13))) {return true}},
                unlocked() {if (player.m.points.gte(1500) || getBuyableAmount("m", 13) > 0) {return true} else false},
                buy(ticks=1) {let cost = getMBuyableCost(13)
                    if (!layers.m.buyables[13].canAfford()) return
                    player.m.buyables[13] = player.m.buyables[13].plus(1)
                    if (!hasUpgrade("m", 25)) {player.m.points = player.m.points.minus(cost)}}
            },
            14: {
                display() {
                let desc = "<b><h2>Gods (Produces Apes)</h2></b><br>"    
                let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 14) +"+" + format(player.m.godsextra) + " generated</b><br>"
                let eff = "<b><h2>Effect</h2>: generates Apes " + format(getMBuyableEff(14)) + " times a second(unaffected by metal multiplier)</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getMBuyableCost(14)) + " Metal</b><br>"
                return desc + start + eff + cost},
                buyMax() {return hasUpgrade("m", 32)},
                cost(a) {
                    let ret = getBuyableAmount("m", 14).times(500).add(4000).round()
                    
                    if (ret < 1) ret = new Decimal(4000)
                    return ret;
                },
                style: {
                //    'color': "#ffffff", 'width' : "175px", 'height' : "175px", 'font-size' : "8pt", 'background-image' : "url(https://www.nme.com/wp-content/uploads/2020/08/Doom-Eternal.jpg)", 'background-size':'contain' 
                },
                effect() {
                    let x = getBuyableAmount("m", 14).add(player.m.godsextra).pow(.7)
                    if (hasUpgrade("m", 23)) x = x.times(upgradeEffect("m", 23))
                    if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                    x = x.times(player.m.points.pow(2))
                    if (x < 1) x = new Decimal(1)
                    return x;
                },
                canAfford() {if (player.m.points.gte(getMBuyableCost(14))) {return true}},
                unlocked() {if (player.m.points.gte(3000) || getBuyableAmount("m", 14) > 0) {return true} else false},
                buy(ticks=1) {let cost = getMBuyableCost(14)
                    if (!layers.m.buyables[14].canAfford()) return
                    player.m.buyables[14] = player.m.buyables[14].plus(1)
                    if (!hasUpgrade("m", 25)) {player.m.points = player.m.points.minus(cost)}}
            },
            15: {
                display() {
                let desc = "<b><h2>P̷̧̢̨̢̨̢̡̢̨̨̧̢̧̢̛̛̲͙̱͔̼̤͖̣̣̪̲̳̳̯͙̲͈͓̦̖̝͖̯̖͚͖̺̦̮̳̰̬̣͚͉̥͚̙̱̰̟̻̫̼̳̘̪̱̭͈͙̲̤̠̗̯̬̻͔̮̟̯͎̯͍̹̻̰̜̘͉͖̣̱̙̼̖̻̪̗̝̥͖͉͕͕̺̙͙̘̰̰̥̲̪̖̯̣̩͈̤͉̖̫͖̬̰̻̜̱̖̲̲̝̺̦̠̼͎̱̜̳̲̜͍͈͉̜̥̰̲̫̋͋̀̆̿̔̄́̆̑́̐͐̒̍͗̉͋͛̒͛̀͐̈́̅̏̅̇́́̽̒͆̓̅̈̿̃̈̔̀̋̅̃̓́̃̃̈̒̈́̍̀̚͘͘͘̕̕̚̚̚͜͜͜͝͝͝͝͝͠ͅͅͅͅở̴̧̢̢̢̧̨̧̡̢̧̧̨̡̨̡̡̨̡̢̛̙͍̼̞͙̣̝͍̙̭̲̥̞̫̳̥̹̖̱̯̱̪̳̖͖̰̭̣̠̖̯̤̦͔̯̥̞̩̙̯̬͙̠̠̦͎̬͎̖̻̯͙̭͎͓̲͓͕̞͙͇͎͕̯͚̪̹̰͎̙̜̩̩͈̘̝̜̼̲̣̣̺̯̠͙̣̝̞̘̤͈̱̳̲͖͚̠̩͎̭͎̺͕̳͈̰̙͚̰͔͇͎̰͚̥̙͙̞̪̬͙̯̗͕͉̹͈͖̘̗͕̗̤̟͍̲̜͔̥͚̲̪͈̜̮̳̤̮̹͇̻̉̍̇͛͑̑̈́̈̍̂͂̌̔̋̇̂̇̏͊̓̌̒̄̄̋̐̏̅͂̿̀͑̓̄̿̏͆͌̋̀̿̽̌͒͒̀͒̎̓̽̽̊̉̈́́͛̂̉̊̀́̀́͆͌̅̂̈̊̃͆̈̌͑̄͊̔̂̐̎̑̓͐́̄̊̽́̀̔̾́̉̃̓͐̊̄̀́̑̐̽͋͆̍̒̊̋͐̀̈̂̓̎̌́̒̔̀̈́̊͊̅̎́̌̓̐̾̃́̈́̀̚͘͘͘͘̕̚͘̚͜͜͜͜͜͜͜͠͝͠͝͝͠͝͝͝͝͝͝ͅͅͅͅṭ̸̢̡̢̢̨̢̧̢̢̢̧̡̢̨̛̛̘̩̟̥̬̺̟̟̲͈̠̝̘̝͉͙̻̞̫̮̝͚̝̟̝̝̩̟̣̝̭͖̩͉̹̲͕̭̬̤̖̤͕̟͎̯̣̬̤͎̯̲̮̲̝̬͙̬̗̗͕̪͕͔̯̹̟͕̱̲̯̞̮̠͎͍̠̹͚̖͚͙͚̬̺̤̲̰̞̣̬̲̰̰̝̼̺͖̳̳̯͚͓͎̼̮̠̼̮̲̖̰̦̘͉͔̟͖̤̙͈̮͚̪̭͕̪̰̮̤̝̈́̎͊̾̈́̽̈́̓̂̐̔̃̎̏̒̑̓̔́̔́̑̇̾̂͐̆̔̅̏͛̊͒͋̈́̌̽̒͆͒̀̇̈͑̈́͗̾̓̿̒̌́̍̌̆̍̀͗͛̇̑̈̑̍̔̄̇̽̂͋̈̉̀͐͐̊̽̂͂̿̈̈́͗̆̈́̍̅̀͋̈̋̿̍͒̃́̍̾̒̈́͗̐̈̀̊̎̅́̾̓͋̎́̒̓̆͂̆̆͆͗̏͌̾͐̍̄͑̒̄̎͌̀̽̏̋̂̾̇̚̚͘̕̚͘̚̚̕͘̚͘̚͜͜͜͝͠͝͠͝͠͝͝͝͝͠͝͝͝͝͝͝͠͝͠ͅͅͅͅͅͅͅȃ̶̢̧̧̡̧̡̢̨̨̡̢̢̛̛̛̛͖̻̙͉̫͍̜̖͓̭͓̭͓̗̫̳͇̻̝͖͍̞̰̠̦͙͉̖̟̮͙̠̼͖̫͎̪̜̰͓͕̣̞̟͓͚͓̙̲̳̳͈̥̯̗̼̤͕̹̪̱̖̙̣̝̮̖̭̞͕̣͙̺̪̱̱̦̳̦͔̘̟͍̩͎̮̲̘͎̼̥͖̠̬̺̤̟͙̼̝͙̱̯̻͙̔̏͊̌̒͒̀͒́͂͆͐̐̀͂̾̌̑̉͛͛͊̓̆́́̿͊͆͛͒̇̄̄̒͌̐͐̐̅̓͌̏̆̈́̓̌͗͒̍̉͌̆͛̈́̀̆̆̾̇̕̕͘͜͜͝͠͝͝͠ͅt̷̡̧̡̢̢̡̢̢̢̧̢̧̡̡̨̡̡̢̛̲͙̘͉͉͚̞͕̘̭͈̝̝̤̦͓͍̳̼̼̘̗̣̮͖̟̥̖̺̪̣̫̗̟͙̭̻̙͉̭͇̝̣̲̤̱̖̯̣̩͉̝̻̙̱̲̩͉͚͔̞̗̩͇̩̹̣̘̰̰͔͕̮͙̩̮̦̻̩̤̫̟̲̹̠̤̩͓͍̫̳̲̪̱̯̠̰̯̞̬͈̰̻̙̺͓̞̙̞̱̙̻̮̦̳̖̞̩̘̘̝̮̼̱̱̫͉̙͍͔̠̻̩̥͚͈̳͓̪̘͇͉̜̪̘̹͍̠͎̝̣̻̰̰͚̠̖̣̜͖͍͌̂̾̽̌̿̒̉̋́̆͑̋̄̔̔̽̓̓̊̇͗͆̎̑̃̀́̈́̽͌́͊̎̍̈́͒́́́̽̑̇̉̓͑̾̒̋̀̊́̔̍͗̉͌̆̈́̍̽͒̆̓̓̐͗̋̏̅̔̒͋̈́́̂̌͒̽̂̓͐͌̀͌͌̃͊̀̓̀̉̔̾̌̉̀̒̅̌̊͋́̏͌͂̊͑́̄̃̉͌̽̽̓̾̅̎̇̀̂͂̔̃͒͗̂̀͌̋̏̀̎̓͌́̂͐͋̏̈́̔́̇͊̍̀̇͂͊́̚͘̚̕̚̚͘̕̕̚̚̕͘̕͜͜͠͝͠͠͝͝͝͠͠͝͝ͅͅở̷̡̧̧̨̧̨̧̨̡̧̧̛̛̫̫͍̙̞̣̱̫̙̤͉̻̬͔̹̮̙̻̗̞̩̦̹̳̺̜͕̹̝̩͎̲͔͇̘̥̝͍̰̱͍̪̦̦͍̤͇͎̟̼̦̫̯̪̱̲̜͇͙͍̯̯̣͖̟͒̀̓̊̎͋͊͆̄̈́̄͛̽͐̈̈́͊̓̓͊̆̍̒͛̓̈͐͗̋̍̈́̏͋̿̈́̆̈̉̅̌̌͗͊̌̏̂͒̓̐̈́́̾͒̉̉̽̾́̀̎̏̑̍̍͆̈͆̎̑͒̉͋͛͌͊̊̊̀̀̽́̂̽̂̅̓̑͆̓͒̈́̇̽̚̚̚̕͘̕̕͘̚̚̕͝͝͠͝͠ͅͅͅ ̸̡̨̡̧̡̧̧̨̡̛̪̹̖̻̥̬͙̥͙͍̞̩̲̤̖̹̝̯̹̩̝̦̥͈͓̘̘̝̥̬̤͙̙̯͍̼̜̣̘̜͔͉̺͎͇̮̗̯̥̯̝̻͓̙̼̲̬̠͍̗̩̫̥̮̱͔͖̥͙̯̰̙͉̙̌͛̀̿̊̿̊͋͆̂͋̎͂̊̈́̐͋̽͒͒̂͑̿̌̅͌̈́̄͊́̐̍̈́͗̍͋́̋̏̃͒̊̊̓̏̉̒͂́͂̇̓̄̔͊̈́̈́̀͑̑̑̿̇́̈́͌̐̃̀͐͛̄̐͛͐̏̾͑̿̇̔̍̑̅̾̏̒̚̚͘̕̚͘͝͠͠͝͝͠ͅͅM̴̧̨̧̢̡̡̧̛̛̛̙̦͉̤̻͔̝̱̰̣̦̺̺̞̙͇̹̞͎̻͇̪̪̗͕͓̞̲̲̖̱͙͇̮̲̭͓͈̤͚͙͓̰̠͍̳͎̮͇̺̳̻̮̩̦͉͚͈͕̭̖̳̘͍̤̺̦͎̻̳̙͓̰̩̺̯͍̯̳̻̦͚̻̦̯͔̲̭̮̥̳̬͙͙̞̞̙̟͔͓̻̤̩̻͇̫̪͉̃̒͛̆̊̓̎͂̍̇̉̅̀͒̇̇̋̉͑͋̍̎͗̈́͛̋̒̏̾̍͒̅̃̃̀̑̄͛̇͂̎͂͋͒̍̋̄̑͆͛̓̄̍͒́̀̏̌͐́͂͌̔͋̍̍̓̏̋̓̋͋̏͆̃̾̏̃͂̓̏͆̔͊̏͑̈́̕͘̕̚͘̕̚̚͘͝͠͠͝͝͠͝ͅͅͅͅͅâ̷̢̡̢̢̡̨̢̩͙͕͕̞͖͖̼̪̥̟̬̳͍̖̩̖̹̩͖͖̬̦̹͙͉̳̬̠̣̩̩͉̦̖͓̤͈͔̩͕̰̝̫͍͕̪̲̰̩̙̣̰͚͚̣͔̪̤̫̪͖̯̣̣̞̬̱̫͓̙̺̠̠̰̩͙̙̗͍̹̹̬̗̪͖̠̼͉͚͎̗̪͈̞̯̫͍͚̱̮̱̤̥̙͖̜͙͖͖̦͇̲͙͇̦̳̺̭͈̻̱͎͎͈̝̝̙̺̺̝̙̬̮̝̮̘͎͔̠̙͌̓̎̊̂͑̓͊̽̈͗͑̎̋̅̃̋̈́̿̓͊́͑́̾̈͒͋̊͑͑͑̃͌̃͂̏̑̆̀́̍͊̽̃̈́̆̍̈́̏̆͗͛͋̆̆͑̚͜͜͜͜͜͜͜͜͜͝͝͝͠͝ͅͅͅͅͅn̶̨̧̨̧̧̨̢̡̡̡̢̧̧̢̛̛̛̛̛̝̖̹̫͉̭̪̻̪̹̮̣̹̠̼̣͈͕͇͎̦̬͇̮̙͕̳̦̹̳̤͖̱̩̘̝̺̮̼̣̙͎͚̖͙̼̻̻̯͙̖̞̤͉̯̝̝̹͕̬͇̤͓̦̞̯̺̟̪̬̭̭̭̤̼̭̪͔͇̭̳̠͚̝̫̮̹̪̯̻̙̺͎̲̗͚̦̤̤̯̘͔̲̺͚͉͔̤̠̜͉͚̺̻͍̤̯͈̮̱̜̦͖͎̞̻̯͔̻̬͓͇̰̥̈́̒̒̏̐̋̊̎̈́̆̓̉́͗̋̽̍̈́̓̾̂̀̾̅͑͆̽̊̉̿͗̎́̂̔͒̊̀̊͊̂̋̑͗̈̀͐͌̒̈́̈́̉̉͆̃̈́̿̇̏̓̔́̍͆̒̏́̉͆̀̿̑͐̒̏̇͂̒̑͌͂̓̾̇̈́̋́̍̔̇̐̎̍͋͗̈́̓͛̋̈́̇́̓̔̕̚͘̚͘͘̚̚͜͜͜͜͜͝͝͝͠͝͝͠͠͝͠ͅͅͅͅ </h2></b><br>"    
                //let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 15) +"+" + format(player.m) + " generated</b><br>"
                //let eff = "<b><h2>Effect</h2>: generates Gods " + format(getMBuyableEff(15)) + " times a second(unaffected by metal multiplier)</b><br>"
                let cost = "<b><h2></h2>" + format(getMBuyableCost(15)) + "</b><br>"
                return desc + cost},
                buyMax() {return hasUpgrade("m", 32)},
                cost(a) {
                    let ret = getBuyableAmount("m", 15).times(750).add(6500).round()
                    if (ret < 1) ret = new Decimal(6500)
                    return ret;
                },
                style: {
                    'color': "#860111",// 'width' : "175px", 'height' : "175px", 'font-size' : "8pt", 'background-image' : "url(https://gardendesk.typepad.com/.a/6a00e54efed40888340133f4a245f0970b-pi)" 
                },
                effect() {
                    let x = getBuyableAmount("m", 15).add(player.m).pow(2)
                    if (hasUpgrade("m", 24)) x = x.times(upgradeEffect("m", 24))
                    if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                    x = x.times(player.m.points.pow(2))
                    if (x < 1) x = new Decimal(1)
                    return x;
                },
                canAfford() {if (player.m.points.gte(getMBuyableCost(15))) {return true}},
                unlocked() {if (player.m.points.gte(5500) || getBuyableAmount("m", 15) > 0) {return true} else false},
                buy(ticks=1) {let cost = getMBuyableCost(15)
                    if (!layers.m.buyables[15].canAfford()) return
                    player.m.buyables[15] = player.m.buyables[15].plus(1)
                    if (!hasUpgrade("m", 25)) {player.m.points = player.m.points.minus(cost)}}
            },
            31: {
                display() {
                let desc = "<b><h2>Watering Cans Autogain(Makes Cans A Normal Cost Layer)</h2></b><br>"    
                let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 31) + "</b><br>"
                let eff = "<b><h2>Effect</h2>: " + format(getMBuyableEff(31).times(100)) + "%</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getMBuyableCost(31)) + " Watering Cans</b><br>"
                return desc + start + eff + cost},
                cost(a) {
                    let ret = getBuyableAmount("m", 31).pow(10).round()
                    if (ret < 1) ret = new Decimal(1)
                    return ret;
                },
                effect() {
                    let x = getBuyableAmount("m", 31).div(100)
                    if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                    x = x.times(player.m.points.pow(2))
                    return x;
        },
                canAfford() {if (player.c.points.gte(getMBuyableCost(31))) {return true}},
                unlocked() {if (player.m.points.gte(1) || getBuyableAmount("m", 11) > 0) {return true} else false},
                buy() {let cost = getMBuyableCost(31)
                    if (!layers.m.buyables[31].canAfford()) return
                    player.m.buyables[31] = player.m.buyables[31].plus(1)
                    player.c.points = player.c.points.minus(cost)}
            },
            32: {
                display() {
                    let desc = "<b><h2>Magnify CLicker Autogain(Makes Magnifying Glasses A Normal Cost Layer)</h2></b><br>"    
                    let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 32) + "</b><br>"
                    let eff = "<b><h2>Effect</h2>: " + format(getMBuyableEff(32).times(100)) + " %</b><br>"
                    let cost = "<b><h2>Cost</h2>: " + format(getMBuyableCost(32)) + " Magnifying Glasses</b><br>"
                    return desc + start + eff + cost},
                    cost(a) {
                        let ret = getBuyableAmount("m", 32).pow(10).round()
                        if (ret < 1) ret = new Decimal(1)
                        return ret;
                    },
                    effect() {
                        let x =  getBuyableAmount("m", 32).div(100)
                        if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                        x = x.times(player.m.points.pow(2))
                        
                        return x;
            },
                   
                    canAfford() {if (player.g.points.gte(getMBuyableCost(32))) {return true}},
                    unlocked() {if (player.m.points.gte(1) || getBuyableAmount("m", 11) > 0) {return true} else false},
                    buy() {let cost = getMBuyableCost(32)
                        if (!layers.m.buyables[32].canAfford()) return
                        player.m.buyables[32] = player.m.buyables[32].plus(1)
                        player.g.points = player.g.points.minus(cost)}
                },

            21: {
                display() {
                    let desc = "<b><h2>Watering Can Eff Inc</h2></b><br>"    
                    let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 21) + "</b><br>"
                    let eff = "<b><h2>Effect</h2>: " + format(getMBuyableEff(21)) + "X</b><br>"
                    let cost = "<b><h2>Cost</h2>: " + format(getMBuyableCost(21)) + " Watering Cans</b><br>"
                    return desc + start + eff + cost},
                    cost(a) {
                        let ret = getBuyableAmount("m", 21).add(1).pow(1.5).round()
                        return ret;
                    },
                    effect() {
                        let x = getBuyableAmount("m", 21).times(2)
                        if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                        x = x.times(player.m.points.pow(2))
                        if (x < 1) {x = new Decimal(1)}
                        return x;
            },
                    canAfford() {if (player.c.points.gte(getMBuyableCost(21))) {return true}},
                    unlocked() {if (player.m.points.gte(1) || getBuyableAmount("m", 11) > 0) {return true} else false},
                    buy() {let cost = getMBuyableCost(21)
                        if (!layers.m.buyables[21].canAfford()) return
                        player.m.buyables[21] = player.m.buyables[21].plus(1)
                        player.c.points = player.c.points.minus(cost)}
            },
            22: {
                display() {
                    let desc = "<b><h2>Magnifying Gen Rate Inc</h2></b><br>"    
                    let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 22) + "</b><br>"
                    let eff = "<b><h2>Effect</h2>: " + format(getMBuyableEff(22)) + "X</b><br>"
                    let cost = "<b><h2>Cost</h2>: " + format(getMBuyableCost(22)) + " Magnifying Glasses</b><br>"
                    return desc + start + eff + cost},
                    cost(a) {
                        let ret = getBuyableAmount("m", 22).add(1).pow(1.5).round()
                        return ret;
                    },
                    effect() {
                        let x = getBuyableAmount("m", 22).times(2)
                        if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                        x = x.times(player.m.points.pow(2))
                        if (x < 1) {x = new Decimal(1)}
                        return x;
            },
                    canAfford() {if (player.g.points.gte(getMBuyableCost(22))) {return true}},
                    unlocked() {if (player.m.points.gte(1) || getBuyableAmount("m", 11) > 0) {return true} else false},
                    buy() {let cost = getMBuyableCost(22)
                        if (!layers.m.buyables[22].canAfford()) return
                        player.m.buyables[22] = player.m.buyables[22].plus(1)
                        player.g.points = player.g.points.minus(cost)}
            },
        },
        upgrades: {
            rows: 3,
            cols: 5,
            11: {
                title: "Automation v1.0",
                description: "Automates Factory Buying",
                cost: new Decimal(50),
                unlocked( ) {if (getBuyableAmount("m", 11) > 0) return true}
            },      
            12: {
                title: "Automation v2.0",
                description: "Automates Samuel Buying",
                cost: new Decimal(100),
                unlocked( ) {if (getBuyableAmount("m", 12) > 0) return true}
            
            },       
            13: {
                title: "Automation v3.0",
                description: "Automates Ape Buying",
                cost: new Decimal(2000),
                unlocked( ) {if (getBuyableAmount("m", 13) > 0) return true}
            
            },
            14: {
                title: "Automation v4.0",
                description: "Automates God Buying",
                cost: new Decimal(3000),
                unlocked( ) {if (getBuyableAmount("m", 14) > 0) return true}
            },
            15: {
                title: "Automation v5.0",
                description: "Automates Potato Man Buying",
                cost: new Decimal(8500),
                unlocked( ) {if (getBuyableAmount("m", 15) > 0) return true}
            },
            21: {
                title: "Cult v1.0",
                description: "The More Samuels Bought The Faster They Produce Factories",
                cost: new Decimal(50),
                unlocked( ) {if (getBuyableAmount("m", 11) > 0) return true},
                effect() {
                    if (getBuyableAmount("m", 12) > 0){
                    let ret = getBuyableAmount("m", 12).div(100).add(1)
                    if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
            }}
            },      
            22: {
                title: "Cult v2.0",
                description: "The More Apes Bought The Faster They Produce Samuels",
                cost: new Decimal(100),
                unlocked( ) {if (getBuyableAmount("m", 13) > 0) return true},
                effect() {
                    if (getBuyableAmount("m", 13) > 0){
                    let ret = getBuyableAmount("m", 13).div(50).add(1)
                    if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
            }}
            },       
            23: {
                title: "Cult v3.0",
                description: "The More Gods Bought The Faster They Produce Apes",
                cost: new Decimal(250),
                unlocked( ) {if (getBuyableAmount("m", 14) > 0) return true},
                effect() {
                    if (getBuyableAmount("m", 14) > 0){
                    let ret = getBuyableAmount("m", 14).div(25).add(1)
                    if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
            }}
            },
            24: {
                title: "Cult v4.0",
                description: "The More Potato Mans Bought The Faster They Produce Gods",
                cost: new Decimal(250),
                unlocked( ) {if (getBuyableAmount("m", 15) > 0) return true},
                effect() {
                    if (getBuyableAmount("m", 15) > 0){
                    let ret = getBuyableAmount("m", 15).div(10).add(1)
                    if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
            }}
            },
            25: {
                title: "Annoying",
                description: "No Producers Cost Metal",
                cost: new Decimal(8500),
                unlocked( ) {if (hasUpgrade("m", 24)) return true},
                
            },
            31: {
                title: "Ultimate CULT",
                description: "Factories Bought Increase All Buyables",
                cost: new Decimal(10000),
                unlocked( ) {if (hasUpgrade("m", 25)) return true},
                effect() {
                    if (getBuyableAmount("m", 11) > 0){
                    let ret = getBuyableAmount("m", 11).div(10).add(1)
                    if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
            }}
            },
            32: {
                title: "Annoyingness Is Forever Elimenated",
                description: "Autobuy The Metal Buyables",
                cost: new Decimal(12500),
                unlocked( ) {if (hasUpgrade("m", 31)) return true},
                
            },
                
            
        },
    
    }


        
    )        
addLayer("i", {
        symbol: "!",
        name: "Info", // This layer is linked on the side and provides guidance.
        startData() { return {
            unlocked: true,
           notifications: new Decimal(1),
           pnotification: new Decimal(0),
           cnotification: new Decimal(0),
           gnotification: new Decimal(0),
           mnotification: new Decimal(0),
           factorynotification: new Decimal(0)
        }},
        nodeStyle() {
            {if (player.i.notifications < 1) return {
            'color' : 'transparent','border-color': '#be7757','background-image': 'url(https://images.ctfassets.net/cnu0m8re1exe/4KwrJVfCGeyOKwm8PS2tjI/30026753d97e3b41a50560063126ded8/shutterstock_135114548.jpg?w=650&h=433&fit=fill)', 'background-repeat':'no-repeat','background-size':'cover','background-position':'-10px 0px'
        }
        else return {'color' : 'yellow','border-color': 'yellow','background-image': 'url(https://images.ctfassets.net/cnu0m8re1exe/4KwrJVfCGeyOKwm8PS2tjI/30026753d97e3b41a50560063126ded8/shutterstock_135114548.jpg?w=650&h=433&fit=fill)', 'background-repeat':'no-repeat','background-size':'cover','background-position':'-10px 0px'}
    }},
        
    update() {
        
        if (player.tab == "i") {player.i.notifications = new Decimal(0)}
       
         
    },
        style: {'background-color': '#f2dcb1', 'border' : '10px solid #654321', 'color' : 'black'},
        color: "#be7757",
        type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        row: "side", // Row the layer is in on the tree (0 is the first row)
        layerShown() {return true}, // Condition for when layer appears on the tree
        hotkeys: [
            {key: "h", description: "H: open Help menu", onPress(){player.tab = "h"}},
        ],
        tooltip() { // Optional, tooltip displays when the layer is unlocked
            let tooltip = "Info"
            return tooltip
        },
        shouldNotify() {},
        componentStyles: {
            "challenges"() {return {'height': '200px'}},
            "prestige-button"() {return {'color': '#AA66AA'}},
            
        },
         infoboxes: {
             
            TreeStart: {
                style: {"background-color" : '#4BDC13', "border-color" : 'green'},
                title: ("Your Tree"),
                body: "You've woken up in a strange new place. All you see are the surroundings of a cave. You notice it's extreme beauty, but you also feel a sudden attraction and connection between you and a tree in the middle of the cave. You look up and notice some sort of electronic board. You can make out what looks to be like numbers and the word water as your eyes start to adjust to your new surroundings.<br/>" +
               "You somehow know that your new life here is connected with this tree. You decide to redirect some of the water from various sources in this cave onto the tree. It shoots up from a little fern to a humoungous redwood in size and you notice the numbers on the screen skyrocket aswell. You should keep doing this."
        },  
        WateringCan: {
            style: {"background-color" : '#0075eb', "border-color" : 'blue'},
             title: "Can Life",
             body: "You remember from some random history class or youtube video how early humans made simple tools out of wood. Following your ancestors you decide to create a simple wooden watering can to increase your water gathering rate.<br/>" +
            "You can feel your memories of your last life slipping away, but for some reason this doesn't bother you. You like things better with this tree."
     },
     MagnifyingGlasses: {
        style: {"background-color" : '#ababab', "border-color" : 'gray'},
         title: "All My Homies Hate Cans",
         body: "One day in this new world after growing your tree to a ridiculous amount an idea pops into your brain. Tree need sun, magnifying glass make more sun make, more powerful sun, you need make mangnifying glass now. <br/>" +
        "You can feel your memories of your last life slipping away, but for some reason this doesn't bother you. You like things better with this tree."
 },
 Metal: {
    style: {"background-color" : '#7b9095', "border-color" : 'silver'},
     title: "Cold Cold Metal",
     body: "You seem to rembember in your last life mining for resources in some sort of game maybe it was called MineMake or MakeMine. Either way you should gather some new resources using your newly created tools.<br/>" +
    "You can feel your memory becoming fogier and fogier. At this point all that seems to matter is to make number go up."
},
Factories: {
     style: {"background-color" : '#7b9095', "border-color" : 'silver'},
     title: "Capitalism",
     body: "With great intelligencea and some magic you manige to recreate an entire factory to increase the metal efficency gain. It seems this cave keeps getting bigger and bigger to accomadate all of your newly built tools and machines.<br/>"
}
    }, 
tabFormat: {
    
    "Game Info" : {
        style: {'--color' : "#000000"},
        content: [
            
            ["display-text", "<h2>Scientific Explanations</h2>\n\
            <p>These Are Explanations of Almost Every Aspect of This Game and What They Represent or How They Work. Each One Leads to a Link Further Explaining the Topic if You Would Like to Explore.</p>"],
            ["display-text", "<br><br><h3>Tree Branches</h3><br>\n\
            <p><a href='https://en.wikipedia.org/wiki/Branch'>Prestige Button:</a> A branch (UK: /ˈbrɑːntʃ/ or UK: /ˈbræntʃ/, US: /ˈbræntʃ/) or tree branch (sometimes referred to in botany as a ramus) is a woody structural member connected to but not part of the central trunk of a tree (or sometimes a shrub). Large branches are known as boughs and small branches are known as twigs. The term 'twig' often refers to a terminus, while 'bough' refers only to branches coming directly from the trunk.</a></p><br>"],
            () => hasUpgrade("p", 11) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Transpiration_stream#:~:text=1%2DWater%20is%20passively%20transported,by%20diffusion%20through%20the%20stomata.'>11:</a> In plants, the transpiration stream is the uninterrupted stream of water and solutes which is taken up by the roots and transported via the xylem to the leaves where it evaporates into the air/apoplast-interface of the substomatal cavity. It is driven by capillary action and in some plants by root pressure. The main driving factor is the difference in water potential between the soil and the substomatal cavity caused by transpiration.</a></p><br>"] : null,
            () => hasUpgrade("p", 12) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Tree'>12:</a> In botany, a tree is a perennial plant with an elongated stem, or trunk, supporting branches and leaves in most species. In some usages, the definition of a tree may be narrower, including only woody plants with secondary growth, plants that are usable as lumber or plants above a specified height. In wider definitions, the taller palms, tree ferns, bananas, and bamboos are also trees. Trees are not a taxonomic group but include a variety of plant species that have independently evolved a trunk and branches as a way to tower above other plants to compete for sunlight. Trees tend to be long-lived, some reaching several thousand years old. Trees have been in existence for 370 million years. It is estimated that there are some three trillion mature trees in the world.</a></p><br>"] : null,
            () => hasUpgrade("p", 13) ? ["display-text", "<p><a href='https://www.coursera.org/lecture/microeconomics-part2/4-1-3-negative-externalities-implications-for-efficiency-8LZFj'>13:</a> Perfect markets achieve efficiency: maximizing total surplus generated. But real markets are imperfect. In this course we will explore a set of market imperfections to understand why they fail and to explore possible remedies including as antitrust policy, regulation, government intervention. Examples are taken from everyday life, from goods and services that we all purchase and use.</a></p><br>"] : null,
            () => hasUpgrade("p", 14) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Cohesion_(chemistry)'>14:</a> Cohesion (from Latin cohaesiō 'cling' or 'unity') or cohesive attraction or cohesive force is the action or property of like molecules sticking together, being mutually attractive. It is an intrinsic property of a substance that is caused by the shape and structure of its molecules, which makes the distribution of surrounding electrons irregular when molecules get close to one another, creating electrical attraction that can maintain a microscopic structure such as a water drop. In other words, cohesion allows for surface tension, creating a 'solid-like' state upon which light-weight or low-density materials can be placed.</a></p><br>"] : null,
            () => hasUpgrade("p", 22) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Manual_labour'>22:</a> Manual work is physical work done by humans, in contrast to labour by machines and working animals. It is most literally work done with the hands (the word 'manual' comes from the Latin word for hand) and, by figurative extension, it is work done with any of the muscles and bones of the body. For most of human prehistory and history, manual labour and its close cousin, animal labour, have been the primary ways that physical work has been accomplished. Mechanisation and automation, which reduce the need for human and animal labour in production, have existed for centuries, but it was only starting in the 18th and 19th centuries that they began to significantly expand and to change human culture. To be implemented, they require that sufficient technology exist and that its capital costs be justified by the amount of future wages that they will obviate. Semi-automation is an alternative to worker displacement that combines human labour, automation, and computerization to leverage the advantages of both man and machine.</a></p><br>"] : null,
            
            () => tmp.c.layerShown == true ? ["display-text", "<br><br><h3>Watering Cans</h3><br>\n\
            <p><a href='https://en.wikipedia.org/wiki/Woodworking'>Prestige Button:</a> Along with stone, clay and animal parts, wood was one of the first materials worked by early humans. Microwear analysis of the Mousterian stone tools used by the Neanderthals show that many were used to work wood. The development of civilization was closely tied to the development of increasingly greater degrees of skill in working these materials.</a></p><br>"] : null,
            () => hasUpgrade("c", 11) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Watering_can'>11:</a> A watering can (or watering pot) is a portable container, usually with a handle and a funnel, used to water plants by hand. It has been in use since at least 79 A.D. and has since seen many improvements in design. Apart from watering plants, it has varied uses, as it is a fairly versatile tool.</a></p><br>"] : null,
            () => hasUpgrade("c", 12) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Supply_and_demand'>12:</a> In microeconomics, supply and demand is an economic model of price determination in a market. It postulates that, holding all else equal, in a competitive market, the unit price for a particular good, or other traded item such as labor or liquid financial assets, will vary until it settles at a point where the quantity demanded (at the current price) will equal the quantity supplied (at the current price), resulting in an economic equilibrium for price and quantity transacted.</a></p><br>"] : null,
            
            
            () => tmp.g.layerShown == true ? ["display-text", "<br><br><h3>Magnifying Glasses</h3><br>\n\
            <p><a href='https://en.wikipedia.org/wiki/Logging'>Prestige Button:</a> Logging is the process of cutting, processing, and moving trees to a location for transport. It may include skidding, on-site processing, and loading of trees or logs onto trucks or skeleton cars.Logging is the beginning of a supply chain that provides raw material for many products societies worldwide use for housing, construction, energy, and consumer paper products. Logging systems are also used to manage forests, reduce the risk of wildfires, and restore ecosystem functions.</a></p><br>"] : null,
            () => hasUpgrade("g", 11) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Magnifying_glass'>11:</a> A magnifying glass (called a hand lens in laboratory contexts) is a convex lens that is used to produce a magnified image of an object. The lens is usually mounted in a frame with a handle. A magnifying glass can be used to focus light, such as to concentrate the sun's radiation to create a hot spot at the focus for fire starting.</a></p><br>"] : null,
            () => hasUpgrade("g", 12) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Microeconomics'>12:</a> Microeconomics (from Greek prefix mikro- meaning 'small' + economics) is a branch of economics that studies the behavior of individuals and firms in making decisions regarding the allocation of scarce resources and the interactions among these individuals and firms. One goal of microeconomics is to analyze the market mechanisms that establish relative prices among goods and services and allocate limited resources among alternative uses. Microeconomics shows conditions under which free markets lead to desirable allocations. It also analyzes market failure, where markets fail to produce efficient results.While microeconomics focuses on firms and individuals, macroeconomics focuses on the sum total of economic activity, dealing with the issues of growth, inflation, and unemployment and with national policies relating to these issues. Microeconomics also deals with the effects of economic policies (such as changing taxation levels) on microeconomic behavior and thus on the aforementioned aspects of the economy. Particularly in the wake of the Lucas critique, much of modern macroeconomic theories has been built upon microfoundations—i.e. based upon basic assumptions about micro-level behavior.</a></p><br>"] : null,
            
            
            () => tmp.m.layerShown == true ? ["display-text", "<br><br><h3>Metal</h3><br>\n\
            <p><a href='https://en.wikipedia.org/wiki/Innovation'>Prestige Button:</a> Innovation is commonly defined as the 'carrying out of new combinations' that include 'the introduction of new goods, ... new methods of production, ... the opening of new markets, ... the conquest of new sources of supply ... and the carrying out of a new organization of any industry' However, many scholars and governmental organizations has given their own definition of the concept. Some common element in the different definitions is a focus on newness, improvement and spread. It is also often viewed as taking place through the provision of more-effective products, processes, services, technologies, art works or business models that innovators make available to markets, governments and society. An innovation is something original and more effective and, as a consequence, new, that 'breaks into' the market or society. Innovation is related to, but not the same as, invention: innovation is more apt to involve the practical implementation of an invention (i.e. new / improved ability) to make a meaningful impact in a market or society, and not all innovations require a new invention. Technical Innovation often[quantify] manifests itself via the engineering process when the problem being solved is of a technical or scientific nature. The opposite of innovation is exnovation.</a></p><br>\n\
            <p><a href='https://en.wikipedia.org/wiki/Technological_singularity'>Efficency Buyables:</a> The technological singularity—also, simply, the singularity—is a hypothetical point in time at which technological growth becomes uncontrollable and irreversible, resulting in unforeseeable changes to human civilization. According to the most popular version of the singularity hypothesis, called intelligence explosion, an upgradable intelligent agent will eventually enter a 'runaway reaction' of self-improvement cycles, each new and more intelligent generation appearing more and more rapidly, causing an 'explosion' in intelligence and resulting in a powerful superintelligence that qualitatively far surpasses all human intelligence.</a></p><br>\n\
            <p><a href='https://en.wikipedia.org/wiki/Materialism'>Automatic Gain Buyables:</a> Materialism is a form of philosophical monism that holds that matter is the fundamental substance in nature, and that all things, including mental states and consciousness, are results of material interactions. According to philosophical materialism, mind and consciousness are by-products or epiphenomena of material processes (such as the biochemistry of the human brain and nervous system), without which they cannot exist. This concept directly contrasts with idealism, where mind and consciousness are first-order realities to which matter is subject and material interactions are secondary.</a></p><br>"] : null,
            () => hasUpgrade("m", 11) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Automation'>11-15:</a> Automation is the technology by which a process or procedure is performed with minimal human assistance. Automation, or automatic control, is the use of various control systems for operating equipment such as machinery, processes in factories, boilers, and heat-treating ovens, switching on telephone networks, steering, and stabilization of ships, aircraft, and other applications and vehicles with minimal or reduced human intervention.</a></p><br>"] : null,
            () => hasUpgrade("m", 21) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Cult'>21-24:</a> In modern English, a cult is a social group that is defined by its unusual religious, spiritual, or philosophical beliefs, or by its common interest in a particular personality, object or goal. This sense of the term is controversial, having divergent definitions both in popular culture and academia, and has also been an ongoing source of contention among scholars across several fields of study.:348–56 It is usually considered pejorative.</a></p><br>"] : null,
            () => hasUpgrade("m", 25) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Annoyance'>25:</a> Annoyance is an unpleasant mental state that is characterized by irritation and distraction from one's conscious thinking. It can lead to emotions such as frustration and anger. The property of being easily annoyed is called irritability.</a></p><br>"] : null,
            () => hasUpgrade("m", 31) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Religion'>31:</a> Religion is a social-cultural system of designated behaviors and practices, morals, worldviews, texts, sanctified places, prophecies, ethics, or organizations, that relates humanity to supernatural, transcendental, or spiritual elements. However, there is no scholarly consensus over what precisely constitutes a religion.</a></p><br>"] : null,
            () => getBuyableAmount("m", 11) > 0 ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Factory_system'>Factories:</a> The factory system is a method of manufacturing using machinery and division of labour. Because of the high capital cost of machinery and factory buildings, factories were typically privately owned by wealthy individuals who employed the operative labour. Use of machinery with the division of labour reduced the required skill level of workers and also increased the output per worker.The factory system was first adopted in Britain at the beginning of the Industrial Revolution in the late eighteenth century and later spread around the world. It replaced the putting-out system (domestic system). The main characteristic of the factory system is the use of machinery, originally powered by water or steam and later by electricity. Other characteristics of the system mostly derive from the use of machinery or economies of scale, the centralization of factories, and standardization of interchangeable parts.</a></p><br>"] : null,
            () => getBuyableAmount("m", 12) > 0 ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Samuel_Slater'>Samuel Slater:</a> Samuel Slater (June 9, 1768 – April 21, 1835) was an early English-American industrialist known as the 'Father of the American Industrial Revolution' (a phrase coined by Andrew Jackson) and the 'Father of the American Factory System'. In the UK, he was called 'Slater the Traitor' because he brought British textile technology to America, modifying it for United States use. He stole the designs of textile factory machinery as an apprentice to a pioneer in the British industry before migrating to the United States at the age of 21. He designed the first textile mills in the US and later went into business for himself, developing a family business with his sons. He eventually owned thirteen spinning mills and had developed tenant farms and company towns around his textile mills, such as Slatersville, Rhode Island.</a></p><br>"] : null,
            () => getBuyableAmount("m", 13) > 0 ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Human_evolution'>Apes:</a> Human evolution is the evolutionary process that led to the emergence of anatomically modern humans, beginning with the evolutionary history of primates—in particular genus Homo—and leading to the emergence of Homo sapiens as a distinct species of the hominid family, which includes the great apes. This process involved the gradual development of traits such as human bipedalism and language, as well as interbreeding with other hominins, which indicate that human evolution was not linear but a web.</a></p><br>"] : null,
            () => getBuyableAmount("m", 14) > 0 ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Deity'>Gods:</a> A deity or god is a supernatural being considered divine or sacred. The Oxford Dictionary of English defines deity as 'a god or goddess (in a polytheistic religion)'', or anything revered as divine. C. Scott Littleton defines a deity as 'a being with powers greater than those of ordinary humans, but who interacts with humans, positively or negatively, in ways that carry humans to new levels of consciousness, beyond the grounded preoccupations of ordinary life'. A goddess is a female deity.</a></p><br>"] : null,
            () => getBuyableAmount("m", 15) > 0 ? ["display-text", "<p><a href='https://www.ebay.com/p/1975962941'>Potato Man:</a> Mr. Potato Head is ABOVE ALL!</a></p><br>"] : null,
            "blank",
            "blank",
            "blank",
           
        ],
    },
    "Tree Size": {
        style: {'--color' : "#000000"},
        
        content: [
            
            [ "display-text", "<h2>Universal Objects</h2>\n\
            <p>These Are Definitions of the Objects Your Tree Has Surpased in Size.</p>\n\
            <p>There are tottaly only "] ,
            ["display-text", () => (player.p.points < 0 ? `18` :
              player.p.points < 1.7? `17`:
			  player.p.points <  15?          `16` :
			  player.p.points <  8.6 * 1000?        `15` :
			  player.p.points <  2.3 * 1000 * 1000?    `14` :
			  player.p.points <  12.7 * 1000 * 1000? `13` :
			  player.p.points <  64 * 1000 * 1000?    `12` :
			  player.p.points <  1.4 * 1000 * 1000 * 1000? `11` :
			  player.p.points <  10 * 1000 * 1000 * 1000?    `10` :
			  player.p.points <  134 * 1000 * 1000 * 1000  ? `9` :
			  player.p.points <  1.5 * 10**13?    `8` :
			  player.p.points <  9.46 * 10**15 ? `7` :
			  player.p.points <  5 * 10**20 ?    `6` :
			  player.p.points <  1.21 * 10**21 ? `5` :
			  player.p.points <  10**23 ? `4` :
			  player.p.points <  4.4 * 10**26 ? `3` :
			  player.p.points <  10**100 ? `2` :
			  player.p.points <  10**308 ?  `1` :
			  new Decimal(10).pow(716).gte(player.p.points) ? `0` :
			   `-1`) +" objects left to surpass"],
        
            
            "blank",
            () => player.p.points >= 0?  ["display-text", "<p>One of Your Branches: A regular tree branch (Size: 1 meter [rough estimate])</p><br>\n\
            ",] : null,
            () => player.p.points >= 1.7? ["display-text", "<p>Human Bean: (Size: 1.7 meters)</p><br>\n\
            ",] : null,
            () => player.p.points >=  15? ["display-text", "<p>Oak Tree: (Size: 1.5e1 meters)</p><br>\n\
            "] : null,
            () => player.p.points >=  8.6 * 1000? ["display-text", "<p>Large Hadron Collider: (Size: 8.6e3 meters)</p><br>\n\
            "] : null,
            () => player.p.points >=  2.3 * 1000 * 1000?    ["display-text", "<p>Pluto: (Size: 2.3e6 meters)</p><br>\n\
            "] : null,
            () => player.p.points >=  12.7 * 1000 * 1000? ["display-text", "<p>Earfs: (Size: 1.27e7 meters)</p><br>\n\
            "] : null,
            () => player.p.points >=  64 * 1000 * 1000?    ["display-text", "<p>MineCraft World: (Size: 6.4e7 meters)</p><br>\n\
            "] : null,
            () => player.p.points >=  1.4 * 1000 * 1000 * 1000? ["display-text", "<p>Sun: (Size: 1.4e9 meters)</p><br>\n\
            "] : null,
            () => player.p.points >=  10 * 1000 * 1000 * 1000?    ["display-text", "<p>Now Say We Stacked All the Humans On Top of Eachother: (Size: 1e10 meters)</p><br>\n\
            "] : null,
            () => player.p.points >=  134 * 1000 * 1000 * 1000  ? ["display-text", "<p>Largest Sun in the Universe: (Size: 1.34e11 meters)</p><br>\n\
            "] : null,
            () => player.p.points >=  1.5 * 10**13?    ["display-text", "<p>Solar System/ Kuiper Belt: (Size: 1.5e13 meters)</p><br>\n\
            "] : null,
            () => player.p.points >=  9.46 * 10**15 ? ["display-text", "<p>Lightyear: (Size: 9.46e15 meters)</p><br>\n\
            "] : null,
            () => player.p.points >=  5 * 10**20 ?    ["display-text", "<p>Sombrero Galaxy: (Size: 5e20 meters)</p><br>\n\
            "] : null,
            () => player.p.points >=  1.21 * 10**21 ? ["display-text", "<p>Milky Way Galaxy: (Size: 1.21e21 meters)</p><br>\n\
            "] : null,
            () => player.p.points >=  10**23 ? ["display-text", "<p>Local Group: (Size: 1e23 meters)</p><br>\n\
            "] : null,
            () => player.p.points >=  4.4 * 10**26 ? ["display-text", "<p>Universe: (Size: 4.4e26 meters)</p><br>\n\
            "] : null,
            () => player.p.points >=  10**100 ? ["display-text", "<p>Multiverse: (Size: 1e100 meters)</p><br>\n\
            "] : null,
            () => player.p.points >=  10**308 ?  ["display-text", "<p>Omniverse: (Size: 1e308 meters)</p><br>\n\
            "] : null,
            () => player.p.points.gte(new Decimal("1e716")) ? ["display-text", "<p>Omegaverse: (Size: 1e716 meters)</p><br>\n\
            "] : null,
            "blank",
            "blank",
            "blank",
            ,
        ],
    },
    "Notifications": {
        style: {'--color' : "#000000"},
        content: [
            
            ["display-text", "<h2>Notifications</h2>\n\
            <p>Current advancements and past ones</p>"], 
            "blank",
            () => tmp.p.layerShown == true? ["infobox", "TreeStart"] : null,
            () => tmp.c.layerShown == true? ["infobox", "WateringCan"] : null,
            () => tmp.g.layerShown == true? ["infobox", "MagnifyingGlasses"] : null,
            () => tmp.m.layerShown == true? ["infobox", "Metal"] : null,
            () => hasMilestone("m", 1) == true? ["infobox", "Factories"] : null,
            () => {if (tmp.p.layerShown == true && player.i.pnotification.lt(new Decimal(1))) {player.i.notifications = new Decimal(1), player.i.pnotification = new Decimal(1)}
            if (tmp.c.layerShown == true && player.i.cnotification.lt(new Decimal(1))) {player.i.notifications = new Decimal(1), player.i.cnotification = new Decimal(1)}
            if (tmp.g.layerShown == true && player.i.gnotification.lt(new Decimal(1))) {player.i.notifications = new Decimal(1), player.i.gnotification = new Decimal(1)}
            if (tmp.m.layerShown == true && player.i.mnotification.lt(new Decimal(1))) {player.i.notifications = new Decimal(1), player.i.mnotification = new Decimal(1)}
            if (hasMilestone("m", 1) == true && player.i.factorynotification.lt(new Decimal(1))) {player.i.notifications = new Decimal(1), player.i.factorynotification = new Decimal(1)} }
        ],
       
    },

    }
}

)
    