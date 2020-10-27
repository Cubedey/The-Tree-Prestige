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
            player.p.ClickerMultiplier = player.p.ClickerMultiplier.add(player.c.WaterMultiplier.div(10000))

            },
           
        gainMult() { // Calculate the multiplier for main currency from bonuses
            let mult = new Decimal(1)
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
                title: "Some Branches Nose-Dive Into The Ground",
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
                    title: "Clicking Branches",
                    description: "The above upgrade is taken to a power depending on your total click Multiplier.",
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
        }},
        nodeStyle() {
            {return {'border-color': 'rgba(0, 89, 179, 1)','background-image': 'url(data:image/jpeg;base64,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)', 'background-repeat':'no-repeat','background-size':'200px 100px','background-position':'-50px'}}
            },
            requires() {if (player[this.layer].unlockOrder > 0) {return new Decimal(675000)} else {return new Decimal(2500)}},
        base() {
            if (player[this.layer].points >= 5) {return new Decimal(100)} else {return new Decimal(2)}
        },
        update() {player.c.WaterMultiplier = player.c.WaterMultiplier.times(.998)
        },
        
        
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
        player.c.WaterMultiplier.pow(.2).round()) + ", and clicking the clicking multiplier by times" + 
        format(player.c.WaterMultiplier.div(10000).times(20)) + " a second"} 
        else {return "multiplying base water gain by " + (new Decimal(2).pow(player.c.points.pow(.8)))}},
        increaseUnlockOrder: ["c", "g"],
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
        layerShown(){if (player.p.points.gte((tmp[this.layer].requires).times(.5))) {return true} else if (player.c.points.gte(1)) {return true} else {return false}},
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
        }},
        nodeStyle() {
            {return {'border-color': 'rgba(171, 171, 171, 1)','background-image': 'url(https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)', 'background-repeat':'no-repeat','background-size':'cover','background-position':'0px -25px'
        }}
        },
        increaseUnlockOrder: ["c", "g"],
        update() {if (player.g.points > 0) {player.g.MagnifyingLevel = player.g.MagnifyingLevel.add(player.g.points.multiply(player.g.currentMagnifyingRate))}; 
        if (hasMilestone("g", 2) && (player.g.magnifierLevel < 101)) {player.g.magnifierLevel = player.g.magnifierLevel.add(10)} 
        else if (hasMilestone("g", 2)) {player.g.magnifierLevel = player.g.magnifierLevel.times(0)}},
        branches: [["p", 1]],
        color: "#ababab ",
        base() {
            if (player[this.layer].points >= 5) {return new Decimal(100)} else {return new Decimal(2)}
        },
        requires() {if (player[this.layer].unlockOrder > 0) {return new Decimal(675000)} else {return new Decimal(2500)}}, // Can be a function that takes requirement increases into account
        tabFormat: {
            "Magnifying Upgrades": 
            {content:[
                "main-display", "prestige-button", "resource-display", "milestones", "upgrades"] },
            "The Magnifier": 
            {content:[
                "main-display",
                ["bar", "DownBar"],
                ["row", [
                    ["column", [
                        ["bar", "RightBar"]],
                    ],
                    ["column", [
                        ["clickables", 11]],
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
                style: {'background-color' : "#ff0000", 'font-size': "10pt"},
                
            },
            
            
        },
        increaseUnlockOrder: ["c", "g"],
        resource: "Magnifying Glasses", // Name of prestige currency
        baseResource: "Tree Branches", // Name of resource prestige is based on
        baseAmount() {return player.p.points}, // Get the current amount of baseResource
        type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 1, // Prestige currency exponent
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
        layerShown(){if (player.p.points.gte((tmp[this.layer].requires).times(.5))) {return true} else if (player.g.points.gte(1)) {return true} else {return false}},
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
                    done() {if (player.g.points.gte(5)) {return true}else {return false}
                },
                3: {
                    requirementDescription: "15 Watering Cans",
                    effectDescription: "---------Unlocks Automation Upgrades---------",
                    done() {if (player.g.points.gte(15)) {return true}else {return false}},
    
                },
    
                }}
        }
        



        
    )    