function getBuyableCost(layer, id){
    return layers[layer].buyables[id].cost()
}
function getBuyableEff(layer, id){
    return layers[layer].buyables[id].effect()
}
function getBuyableUnlock(layer, id){
    return layers[layer].buyables[id].unlocked()
}
function multiplyerthingy(prop,x){
    prop=((Number(prop)+1)*10)+x
    return prop
}
/*11: {
    display() {return ""},
    canClick() {if (player.s.time <= 0) return !(player.s.numberright.gte(0))},
    onClick() {player.s.time=15},
    style: {
       'background-color': "#0000ff", 
    },

}, */
const clicktext={
0:"",
1:"",
2:"",3:"",
4:"a",5:"z",
6:"7",
7:"s",
8:"17",
9:"7",
10:"?",11:"4",
12:"435",
13:"248",14:"432",
15:"376",16:"5549",
17:"5084",
18:"4327",
19:"4473",
20:"parabola",21:"hyperbola",
22:"exponential-line",
23:"circle",
24:"(((θ*θ^2)/θ^3)*θ^4)/θ^5",25:"bunton on the calculator",26:"(θ) − (θ^3)/(3!) + (θ^5)/5! − (θ^7)/7!...",
27:"hyp/tan",
28:"81",
29:"+-infinity",
30:"'0'/0",31:"27",32:"2.96×10−3",
33:"1.33×10−3",
34:"5.46×10−4",
35:"2.56×10−3",
36:"cheetos",37:"1.-1 2.-2",
38:"1.x^3 2.y^2",
39:"1.3 2.1",
40:"There's only 3 ways",
41:"Ish liebe dish",42:" Nominative: der, die, das, die, Accusative: den, die, das, die, Dative: dem, der, dem, den, Genitive: des, der, des, der",
43:" Nominative: der, die, das, die, Accusative: den, die, das, die, Dative: dem, der, dem, dem, Genitive: des, der, des, der",
44:"being a furry",45:"idle games", 46:"happiness",47:"to do",48:'number go brrr',49:"there isn't one",50:"sit here until I die",51:"insert an actual good reason",52:"I'm",53:"A",54:"Hungry",55:"Boi",56:"Wrong",57:"Wrong",
58:"Right",59:"Wrong",60:"",
61:"",62:"",
63:"",64:"",65:"",66:"",67:"",68:"",69:"",70:"",71:"",72:"",73:"",74:"",75:"",76:"I",77:"Am",78:"Become",79:"Death",
};
const clicktextright={
0:0,
1:0,
2:0,3:1,
4:0,5:1,
6:0,
7:0,
8:0,
9:0,
10:0,11:1,
12:0,
13:0,14:1,
15:0,16:1,
17:0,
18:0,
19:0,
20:0,21:1,
22:0,
23:0,
24:0,25:1,26:1,
27:0,
28:0,
29:0,
30:0,31:1,32:1,
33:0,
34:0,
35:0,
36:0,37:1,
38:0,
39:0,
40:0,
41:0,42:1,
43:0,
44:2,45:1,46:1,47:1,48:1,49:1,50:1,51:1,52:1,53:1,54:1,55:1,56:1,57:1,
58:0,59:1,60:1,
61:0,62:1,
63:0,64:1,65:1,66:1,67:1,68:1,69:1,70:1,71:1,72:1,73:1,74:1,75:1,76:1,77:1,78:1,79:1,

};
sundeclarations=["what color is the combination of red and green", 
"what is the last letter of the english alphabet", 
"what is two+two",
"what is 16*27",
"if x=43 and y=3x^2+2 what is the value of y",
"what geometric shape/line does x^2/49-y^2/36=1 make",
"what the formula for the sin of θ",
"what is the computation of lim x->27 x-27/x^(1/3)-3",
"The wave function of a particle is defined as ψ(x)=M(x^2−a^2) for −a{<}x{<}a and ψ(x)=0 for anywhere else. Calculate the probability of finding the particle in an infinitesimal interval 0.004a at x=a/3.",
"Let X and Y be topological spaces. Describe under which condition a function f : X → Y is said to be 1. continuous, 2. an identification map.",
"what all the different forms of the in German",
"what is the meaning of life",
"what the point in this is",
"nom nom",
"you think you can help it at this point?",
"insert text",
"blah",
"laj agsd",
"2",
"Oppeheimer"
];
backgroundcolor=["#ff0000","#00ff00","#0000ff","#ffff00","","","",""]
function makeClickables() {
    let obj = {};
    obj.rows = 20;
    obj.cols = 4;
    obj.textnum = 0;
    for (let i = 1; i <= obj.rows; i++) {
      for (let j = 1; j <= obj.cols; j++) {
        
        obj[i + "" + j] = {
            display() {return clicktext[j+i*4-5]},
            style: {
                "background-color":backgroundcolor[j+i*4-5]
            },
            
            canClick() {if (player.s.time <= 0) return !(player.s.numberright.gte(i-1))},
            onClick() {if (clicktextright[j+i*4-5]==2) return hardReset(); else if (!clicktextright[j+i*4-5]) {player.s.time=new Decimal(1.33).pow(player.s.numberright.add(1)).times(15), player.s.numberright=new Decimal(-1)} else {player.s.numberright=player.s.numberright.add(1)}},
         
        };
        
      }  
    }
    return obj;
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
            if (hasMilestone("g", 2)) {player.p.points = player.p.points.add(getResetGain("p").times(player.g.magnifierbest.div(100).div(20)))};
            if (hasMilestone("c", 2)) {player.p.ClickerMultiplier = player.p.ClickerMultiplier.add((new Decimal(.05)).pow(player.p.ClickerMultiplier).div(20).times(player.c.WaterMultiplier.div(10)))}
            
            },

        gainMult() { // Calculate the multiplier for main currency from bonuses
            let mult = new Decimal(1)
            if (hasUpgrade("p", 12)) mult = mult.times(upgradeEffect("p", 12))
            if (player.g.points.gte(1)) mult = mult.times(player.g.MagnifyingLevel)
            if (hasUpgrade("p", 14)) mult = mult.times(player.p.ClickerMultiplier) 
            if (player.m.points.gte(1)) mult = mult.times(player.m.points.times(player.m.points).add(1))
            if (player.o.wooorms.gte(1)) mult = mult.times(player.o.wooorms.sqrt())
            
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
                    let ret = player[this.layer].points
                    if (hasUpgrade("p", 23)) ret = ret.times(upgradeEffect("p", 23))
                    ret = ret.multiply(2)
                    if (hasUpgrade("p", 13)) ret = ret.times(upgradeEffect("p", 13))
                    if (hasUpgrade("p", 24)) ret = ret.pow(upgradeEffect("p", 24))
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
                        if (hasUpgrade("p", 23)) ret = ret.times(upgradeEffect("p", 23))
                        if (ret < 1) {ret = ret.add(1)} else {ret = ret.pow(.2)}
                        if (hasUpgrade("p", 22)) ret = ret.pow(upgradeEffect("p", 22))
                        if (hasUpgrade("p", 24)) ret = ret.pow(upgradeEffect("p", 24))
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
                        if (hasUpgrade("p", 23)) ret = ret.times(upgradeEffect("p", 23))
                        if (hasUpgrade("p", 24)) ret = ret.times(2)
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
                        let ret = player.points
                        if (hasUpgrade("p", 23)) ret = ret.times(upgradeEffect("p", 23))
                        ret = ret.pow(.2)
                        if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                        return ret;
                            }
                },
                21: {
                    title: "Yo this going the wrong way?",
                    description: "Watering Cans Also Produce Water.",
                    cost: new Decimal("1e750"),
                    unlocked() {if (hasMilestone("m", 3)) return true; else false},
                    effect() {
                        {
                            let ret = player.c.points
                            if (hasUpgrade("p", 23)) ret = ret.times(upgradeEffect("p", 23))
                            ret = ret.pow(.1)
                            if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000");
                            return ret;
                                }
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
                            if (hasUpgrade("p", 23)) ret = ret.times(upgradeEffect("p", 23))
                            ret = (new Decimal(1.5).sub((new Decimal(1.5).sub(new Decimal(1))).div((ret.log(5)).add(1))))
                            if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000");
                            return ret;
                                }
                            }
                },
                23: {
                    title: "Aye we back over here?",
                    description: "Amount of Upgrades in this layer increase the effectiveness of all the upgrades",
                    cost: new Decimal("1e965"),
                    unlocked() {if (hasUpgrade("p", 21)) return true; else false},
                    effect() {
                        {
                            let ret = player.p.upgrades.length
                            ret = new Decimal(1.7).pow(ret)
                            if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000");
                            return ret;
                                }
                            }
                },
                24: {
                    title: "Extra THICC Tree",
                    description: "All tree branch related upgrades are powered based on how many upgrades are owned",
                    cost: new Decimal("1e2250"),
                    unlocked() {if (hasUpgrade("p", 23)) return true; else false},
                    effect() {
                        {
                            let ret = player.p.upgrades.length
                            ret = new Decimal(.001).times(ret).add(1)
                            if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000");
                           return ret
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
        update(diff) {if (player.c.WaterMultiplier.lte( new Decimal(100).times(new Decimal(3).pow(player.o.points)))) player.c.WaterMultiplier = player.c.WaterMultiplier.times(.998)
             else player.c.WaterMultiplier = new Decimal(100).times(new Decimal(3).pow(player.o.points)).sub(new Decimal(2).times(new Decimal(3).pow(player.o.points)))
             if (getBuyableAmount("m" , 31).gt(0) && player[this.layer].unlocked == true) {generatePoints("c", (diff*(getBuyableEff("m", 31))))}
           // if (player.o.points.gt(0)) {layers.c.clickables.click(new Decimal(1.1).pow(player.o.points))}
           if (player.o.points.gte(1)) player.c.WaterMultiplier = player.c.WaterMultiplier.add((player.c.WMCAD.times(new Decimal(2).pow(player.o.points))).times(new Decimal(1.5).pow(player.o.points)).div(20))
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
                width: 100,
                height:  250,
                display() {return format(player.c.WaterMultiplier.round()) + "G"},
                fillStyle: {'background-color' : "#0059b3"},
                baseStyle: {'background-color' : "#000000"},
                textStyle: {'color': '#70b7ff'},
                progress() {
                    return (player.c.WaterMultiplier.div(new Decimal(100).times(new Decimal(3).pow(player.o.points)))).toNumber()
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
                display() {return "Increase Current Water Level by:" + format(player.c.WMCAD.times(new Decimal(2).pow(player.o.points))) },
                canClick() {return true},
                onClick()  { if (player.c.WaterMultiplier.lte(new Decimal(100).times(new Decimal(3).pow(player.o.points)))) {if (player.c.WMCAD.gt(0)) 
                return player.c.WaterMultiplier = player.c.WaterMultiplier.add(player.c.WMCAD.times(new Decimal(2).pow(player.o.points)))
                else return player.c.WaterMultiplier = player.c.WaterMultiplier.add(1).times(new Decimal(2).pow(player.o.points))}}
                
            },
            12: {
                display() {return "Swap Between Max Buy and Singular Buy With a Reduced Cost CanBuyMax:" + player.c.canbuymax},
                canClick() {return true},
                onClick() {player.c.canbuymax = !player.c.canbuymax},
                unlocked() {if ( hasMilestone("c", 1) && getBuyableAmount("m", 31) < 1) return true; else return false }
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
                unlocked() {if  (player.c.unlockOrder < new Decimal(1)) {return false} else return true },
                    },        
        
        },
        exponent() {if (getBuyableAmount("m", 31) < 1){return new Decimal(1)} else return new Decimal(.25)},
        branches: [["p", 1]],
        color: "#0059b3 ",
         // Can be a function that takes requirement increases into account
        resource: "Watering Cans", // Name of prestige currency
        baseResource: "Tree Branches", // Name of resource prestige is based on
        baseAmount() {return player.p.points}, // Get the current amount of baseResource
        type() {if (getBuyableAmount("m", 31).gt(0)) {return "normal"} else return "static"}, // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
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
            let mult = "multiplying base water gain by " + format(new Decimal(2).pow(player.c.points.pow(.8)).times(getBuyableEff("m", 21)).pow(new Decimal(1.1).pow(player.o.points)))
            if (hasUpgrade("c", 11)) mult = "multiplying base water gain by " + 
            format(new Decimal(2).pow(player.c.points.pow(.8)).times(upgradeEffect("c", 11)).times(getBuyableEff("m", 21)))
            if (getBuyableAmount("m", 31)>0 && player.c.points.gt(0)) mult = "multiplying base water gain by " + 
            format(new Decimal(2).pow((new Decimal(22).sub((new Decimal(22).sub(new Decimal(2))).div((player.c.points.log(2)).add(1))))).times(upgradeEffect("c", 11)).times(getBuyableEff("m", 21)).pow(new Decimal(1.1).pow(player.o.points)))
            let fill = ", and fill level multiplying base water gain by " + player.c.WaterMultiplier.pow(.2).round()
            let click = ", and clicking the clicking multiplier by " + format(((new Decimal(.05)).pow(player.p.ClickerMultiplier).times(player.c.WaterMultiplier.div(10)))) + " times a second"
            if (hasMilestone("c", 2)) {return mult + fill + click} else return mult



        },
      //  resetsNothing() { if (hasMilestone("c", 3)) {return true} else false },
        increaseUnlockOrder: ["c", "g"],
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            if (player.o.enooogy.gte(1)) mult = mult.times( player.o.enooogy.pow(new Decimal(1).div(10)))
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
         if (player.m.points.gt(0)) {return true}; 
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
       /*     3: {
                requirementDescription: "10 Watering Cans",
                effectDescription: "----------Don't Reset Previous Layer On Can Reset----------",
                done() {if (player.c.points.gte(10)) {return true}else {return false}},

            }, */

        },
  
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
        update(diff) {if (player.g.points.gt(0)) {
        //if (getBuyableAmount("m", 32).gt(0) && player.g.points.gt(0) && hasUpgrade("c", 1)) {player.g.MagnifyingLevel = player.g.MagnifyingLevel.add((new Decimal(200000000).sub((new Decimal(200000000).sub(new Decimal(2))).div(((player.g.points.multiply(player.g.currentMagnifyingRate)).log(2))))).times(upgradeEffect("g", 11).times(getBuyableEff("m", 22))).multiply(20))}
        //else if (getBuyableAmount("m", 32).gt(0) && player.g.points.gt(0)) {player.g.MagnifyingLevel = player.g.MagnifyingLevel.add((new Decimal(200000000).sub((new Decimal(200000000).sub(new Decimal(2))).div(((player.g.points.multiply(player.g.currentMagnifyingRate)).log(2))))).times(getBuyableEff("m", 22))).multiply(20)}
        if (getBuyableAmount("m", 32).gt(0) && player.g.points.gt(0) && hasUpgrade("g", 11)) player.g.MagnifyingLevel = player.g.MagnifyingLevel.add(((new Decimal(200000000).sub((new Decimal(200000000).sub(new Decimal(2))).div(((player.g.points.multiply(player.g.currentMagnifyingRate)).log(2)).add(1))))).times(upgradeEffect("g", 11).times(getBuyableEff("m", 22))))
        else if (getBuyableAmount("m", 32).gt(0) && player.g.points.gt(0)) player.g.MagnifyingLevel = player.g.MagnifyingLevel.add(((new Decimal(200000000).sub((new Decimal(200000000).sub(new Decimal(2))).div(((player.g.points.multiply(player.g.currentMagnifyingRate)).log(2)).add(1))))).times((getBuyableEff("m", 22))))
        else if (player.g.points.gt(0) && hasUpgrade("g", 11)) {player.g.MagnifyingLevel = player.g.MagnifyingLevel.add(player.g.points.add(1).multiply(player.g.currentMagnifyingRate).times(upgradeEffect("g", 11).times(getBuyableEff("m", 22))).div(2))} 
        else if (player.g.points.gt(0)) {player.g.MagnifyingLevel = player.g.MagnifyingLevel.add(player.g.points.add(1).multiply(player.g.currentMagnifyingRate).times((getBuyableEff("m", 22))).div(2))} 
        if (hasMilestone("g", 2)) {player.g.magnifierLevel = player.g.magnifierLevel.add(player.g.magnifyingleveladdrate)} 
        if (hasMilestone("g", 2) && player.g.magnifierLevel > 101) {player.g.magnifyingleveladdrate = new Decimal(-10)}
        if (hasMilestone("g", 2) && player.g.magnifierLevel <= 0) {player.g.magnifyingleveladdrate = new Decimal(10), player.g.magnifierLevel = new Decimal(0)}
        }
        if (getBuyableAmount("m" , 32).gt(0) && player[this.layer].unlocked == true) {generatePoints("g", (diff*(getBuyableEff("m", 32))))}
    },
      //  resetsNothing() { if (hasMilestone("g", 3)) {return true} else false },
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
                unlocked() {if ( hasMilestone("g", 1) && getBuyableAmount("m", 32) < 1) return true; else return false }
            },
            
            
        },
        increaseUnlockOrder: ["c", "g"],
        resource: "Magnifying Glasses", // Name of prestige currency
        baseResource: "Tree Branches", // Name of resource prestige is based on
        baseAmount() {return player.p.points}, // Get the current amount of baseResource
        type() {if (getBuyableAmount("m", 32).gt(0)) {return "normal"} else return "static"}, // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent() {if (getBuyableAmount("m", 32) < 1){return new Decimal(1)} else return new Decimal(.25)}, // Prestige currency exponent
        effect() {let ret = new Decimal(1).add(1).pow(player.c.points)
            return ret},
        effectDescription() { {
        let mult = "and Magnifierying Levels go brrrr, multiplying base branch gain by " + format(player.g.MagnifyingLevel) 
        let rate = ", which are producing the levels at a rate of " + format(player.g.points.multiply(player.g.currentMagnifyingRate).multiply(getBuyableEff("m", 22)).multiply(20)) + " a second"
        if (hasUpgrade("g", 11)) rate = ", which are producing the levels at a rate of " + format(player.g.points.multiply(player.g.currentMagnifyingRate).multiply(upgradeEffect("g", 11)).multiply(getBuyableEff("m", 22)).multiply(20)) + " a second"
        
        if (getBuyableAmount("m", 32).gt(0) &&  getBuyableAmount("m", 22).gt(0) && player.g.points.gt(0) && hasUpgrade("g", 11) ) rate = ", which are producing the levels at a rate of " + format(((new Decimal(200000000).sub((new Decimal(200000000).sub(new Decimal(2))).div(((player.g.points.multiply(player.g.currentMagnifyingRate)).log(2)).add(1))))).times(upgradeEffect("g", 11).times(getBuyableEff("m", 22))).multiply(20)) + " a second" 
        else if (getBuyableAmount("m", 32).gt(0) && player.g.points.gt(0) && hasUpgrade("g", 11) ) rate = ", which are producing the levels at a rate of " + format(((new Decimal(200000000).sub((new Decimal(200000000).sub(new Decimal(2))).div(((player.g.points.multiply(player.g.currentMagnifyingRate)).log(2)).add(1))))).times(upgradeEffect("g", 11)).multiply(20)) + " a second" 
        else if (getBuyableAmount("m", 32).gt(0)&&  getBuyableAmount("m", 22).gt(0)&& player.g.points.gt(0)) rate = ", which are producing the levels at a rate of " + format(((new Decimal(200000000).sub((new Decimal(200000000).sub(new Decimal(2))).div(((player.g.points.multiply(player.g.currentMagnifyingRate)).log(2)).add(1))))).times((getBuyableEff("m", 22))).multiply(20)) + " a second" 
        else if (getBuyableAmount("m", 32).gt(0) && player.g.points.gt(0)) rate = ", which are producing the levels at a rate of " + format(((new Decimal(200000000).sub((new Decimal(200000000).sub(new Decimal(2))).div(((player.g.points.multiply(player.g.currentMagnifyingRate)).log(2)).add(1))))).multiply(20)) + " a second" 
        else if (player.g.points<= 0) rate = ", which are producing the levels at a rate of 0 a second" 
        return mult + rate}},
            
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            if (player.o.enooogy.gte(1)) mult = mult.times( player.o.enooogy.pow(new Decimal(1).div(10)))
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
        if (player.m.points.gt(0)) {return true}; 
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
                    if (player.g.points.gt(0)){
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
                        unlocked() {if  (player.g.unlockOrder < new Decimal(1)) {return false} else return true },
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
                    done() {if (player.g.points.gte(5)) {return true}else {return false}},
                },
               /* 3: {
                    requirementDescription: "10 Magnifying Glasses",
                    effectDescription: "----No longer reset Previous Layers on Can Reset----",
                    done() {if (player.g.points.gte(10)) {return true}else {return false}},
    
                }, */
    
                },
               
                
            
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
            if (getBuyableAmount("m", 12).gt(0)) {player.m.factoriesextra = player.m.factoriesextra.add(getBuyableEff("m", 12).div(20))}
            if (getBuyableAmount("m", 13).gt(0)) {player.m.samuelsextra = player.m.samuelsextra.add(getBuyableEff("m", 13).div(20))}
            if (getBuyableAmount("m", 14).gt(0)) {player.m.apesextra = player.m.apesextra.add(getBuyableEff("m", 14).div(20))}
            if (getBuyableAmount("m", 15).gt(0)) {player.m.godsextra = player.m.godsextra.add(getBuyableEff("m", 15).div(20))}
        },
        
        automate() {
            if (hasMilestone("m", 2)) {if (canReset(this.layer)) {doReset(this.layer)}}
           
            if (hasUpgrade("m", 15) && player.m.autobuyon == true) {
                if (getBuyableAmount("m", 15).add(10).times(750).add(8000).round().lte(player.m.points)) {player.m.buyables[15] = player.m.buyables[15].plus(10)}
            else {layers.m.buyables[15].buy()}}
            if (hasUpgrade("m", 14) && player.m.autobuyon == true) { 
                if (getBuyableAmount("m", 14).add(10).times(500).add(5000).round().lte(player.m.points)) {player.m.buyables[14] = player.m.buyables[14].plus(10)}
            else {layers.m.buyables[14].buy()}}
            if (hasUpgrade("m", 13) && player.m.autobuyon == true) {
                if (getBuyableAmount("m", 13).add(10).times(250).add(2750).round().lte(player.m.points)) {player.m.buyables[13] = player.m.buyables[13].plus(10)}
            else {layers.m.buyables[13].buy()}}
            if (hasUpgrade("m", 12) && player.m.autobuyon == true) {
                if (getBuyableAmount("m", 12).add(100).times(20).add(100).round().lte(player.m.points)) {player.m.buyables[12] = player.m.buyables[12].plus(100)}
                else {layers.m.buyables[12].buy()}}
            if (hasUpgrade("m", 11) && player.m.autobuyon == true) {
                if (getBuyableAmount("m", 11).add(100).times(2).round().lte(player.m.points)) {player.m.buyables[11] = player.m.buyables[11].plus(100)}
                else {layers.m.buyables[11].buy()}}
            if (hasUpgrade("m", 32)) {
                if (player.m.autobuyon == true) {
                    if (new Decimal(1.1).pow(getBuyableAmount("m", 21).add(1000)).round().lte(player.c.points)) {player.m.buyables[21] = player.m.buyables[21].plus(1000)}
                else {layers.m.buyables[21].buy()}}
                if (player.m.autobuyon == true) {if (new Decimal(1.1).pow(getBuyableAmount("m", 22).add(1000)).round().lte(player.g.points)) {player.m.buyables[22] = player.m.buyables[22].plus(1000)}
                else {layers.m.buyables[22].buy()}}
                if (player.m.autobuyon == true) {   
                if (player.m.autobuyon == true) {if (new Decimal(1.5).pow(getBuyableAmount("m", 31).add(100)).round().lte(player.c.points)) {player.m.buyables[31] = player.m.buyables[31].plus(100)}
                else {layers.m.buyables[31].buy()}}}
                if (player.m.autobuyon == true) {if (new Decimal(1.5).pow(getBuyableAmount("m", 32).add(100)).round().lte(player.g.points)) {player.m.buyables[32] = player.m.buyables[32].plus(100)}
                else {layers.m.buyables[32].buy()}}
                if (player.m.autobuyon == true) {
                    if (new Decimal(1.1).pow(getBuyableAmount("m", 21).add(10000)).round().lte(player.c.points)) {player.m.buyables[21] = player.m.buyables[21].plus(10000)}
                else {layers.m.buyables[21].buy()}}
                if (player.m.autobuyon == true) {if (new Decimal(1.1).pow(getBuyableAmount("m", 22).add(10000)).round().lte(player.g.points)) {player.m.buyables[22] = player.m.buyables[22].plus(10000)}
                else {layers.m.buyables[22].buy()}}
                if (player.m.autobuyon == true) {   
                if (player.m.autobuyon == true) {if (new Decimal(1.5).pow(getBuyableAmount("m", 31).add(1000)).round().lte(player.c.points)) {player.m.buyables[31] = player.m.buyables[31].plus(1000)}
                else {layers.m.buyables[31].buy()}}}
                if (player.m.autobuyon == true) {if (new Decimal(1.5).pow(getBuyableAmount("m", 32).add(1000)).round().lte(player.g.points)) {player.m.buyables[32] = player.m.buyables[32].plus(1000)}
                else {layers.m.buyables[32].buy()}}
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
                style() {if (hasMilestone("m", 1)) return {"background": "url(https://www.transparenttextures.com/patterns/black-paper.png), #7b9095",}; else return {"background": "#7b9095", }}

            },
            2: {
                requirementDescription: "50 Metal",
                effectDescription: "Metal Autobuys Itself ",
                done() {if (player.m.points.gte(50)) {return true}else {return false}},
                style() {if (hasMilestone("m", 2)) return {"background": "url(https://www.transparenttextures.com/patterns/black-paper.png), #7b9095",}; else return {"background": "#7b9095", }}
            },
            

            3: {
                requirementDescription: "16000 Metal",
                effectDescription: "Unlocks Three More Tree Upgrades",
                unlocked() {return hasUpgrade("m", 32)},
                done() {if (player.m.points.gte(15000)) {return true}else {return false}},
                style() {if (hasMilestone("m", 3)) return {"background": "url(https://www.transparenttextures.com/patterns/black-paper.png), #7b9095",}; else return {"background": "#7b9095", }}
          },
            },
        requires: new Decimal(20), // Can be a function that takes requirement increases into account
        base(){
            
            if (getBuyableAmount("m", 11).gt(0) && (new Decimal(100).div(getBuyableEff("m", 11))) > 1)  return new Decimal(100).div(getBuyableEff("m", 11))
            else if (getBuyableAmount("m", 11).gt(0) && (new Decimal(100).div(getBuyableEff("m", 11))).lte(1)) {return new Decimal(1.00000001)} else {return (new Decimal(100))}
            
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
            if (player.o.scoooles.gte(1)) mult = mult.times(player.o.scoooles.pow(new Decimal(1).div(100)))
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
            unlocked() {return hasMilestone("m", 2)},
            style() {if (player.m.autobuyon == true) return {"background": "url(https://www.transparenttextures.com/patterns/black-paper.png), #7b9095",}; else return {"background": "#7b9095", }}

        },},
        buyables: {
            rows: 3,
            cols: 5,
            11: {
                display() {
                let desc = "<b><h2>Factory (Divides the Cost of the Metal)</h2></b><br>"    
                let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 11) +"+" + format(player.m.factoriesextra) + " generated</b><br>"
                let eff = "<b><h2>Effect</h2>:  ÷" + format(getBuyableEff("m", 11)) + " </b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("m", 11)) + " Metal</b><br>"
                return desc + start + eff + cost},
              
                cost(a) {
                    let ret = getBuyableAmount("m", 11).times(2).round()
                    if (ret < 1) ret = new Decimal(1)
                    return ret;
                },
                style: {
                    'color': "#FFFFFF","text-shadow" : '#000000 0px 0px 20px', 'width' : "175px", 'height' : "175px", 'font-size' : "8pt", 'background-image' : "url(https://negativespace.co/wp-content/uploads/2020/05/negative-space-old-factory-building-1536x1025.jpg)" 
                },
                effect() {
                    if ((getBuyableAmount("m", 11).add(player.m.factoriesextra)).gt(0)) {let x = ((new Decimal(100).sub((new Decimal(100).sub(new Decimal(1))).div(((getBuyableAmount("m", 11).add(player.m.factoriesextra)).log(10)).add(1)))))
                    
                    return x}
        },
                canAfford() {if (player.m.points.gte(getBuyableCost("m", 11))) {return true}},
                unlocked() {if (player.m.points.gte(2) || getBuyableAmount("m", 11).gt(0) || tmp.m.buyables[11].unlocked) {return true} else false},
                buy(ticks=1) {let cost = getBuyableCost("m", 11)
                    if (!layers.m.buyables[11].canAfford()) return
                    player.m.buyables[11] = player.m.buyables[11].plus(1)
                    if (!hasUpgrade("m", 25)) {player.m.points = player.m.points.minus(cost)}}
            },
            12: {
                display() {
                let desc = "<b><h2>Samuel Slaters (Produces Factories)</h2></b><br>"    
                let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 12) +"+" + format(player.m.samuelsextra) + " generated</b><br>"
                let eff = "<b><h2>Effect</h2>: generates Factories " + format(getBuyableEff("m", 12)) + " times a second</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("m", 12)) + " Metal</b><br>"
                return desc + start + eff + cost},
                buyMax() {return hasUpgrade("m", 32)},
                cost(a) {
                    let ret = getBuyableAmount("m", 12).times(20).add(100).round()
                    if (ret < 1) ret = new Decimal(100)
                    return ret;
                },
                style: {
                    'color': "#ffffff", "text-shadow" : '#000000 0px 0px 20px', 'width' : "175px", 'height' : "175px", 'font-size' : "8pt", 'background-image' : "url(https://cdn.britannica.com/35/180935-050-9949F288/Samuel-Slater.jpg)" 
                },
                effect() {
                    let x = getBuyableAmount("m", 12).add(player.m.samuelsextra).pow(.9)
                    if (hasUpgrade("m", 21)) x = x.times(upgradeEffect("m", 21))
                    if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                    x = x.times(player.m.points.pow(2))
                    
                    return x;
                },
                canAfford() {if (player.m.points.gte(getBuyableCost("m", 12))) {return true}},
                unlocked() {if (player.m.points.gte(50) || getBuyableAmount("m", 12).gt(0) || tmp.m.buyables[12].unlocked) {return true} else false},
                buy(ticks=1) {let cost = getBuyableCost("m", 12)
                    if (!layers.m.buyables[12].canAfford()) return
                    player.m.buyables[12] = player.m.buyables[12].plus(1)
                    if (!hasUpgrade("m", 25)) {player.m.points = player.m.points.minus(cost)}}
            },
            13: {
                display() {
                let desc = "<b><h2>Apes (Produces Samuel Slaters)</h2></b><br>"    
                let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 13) +"+" + format(player.m.apesextra) + " generated</b><br>"
                let eff = "<b><h2>Effect</h2>: generates Samuel Slaters " + format(getBuyableEff("m", 13)) + " times a second</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("m", 13)) + " Metal</b><br>"
                return desc + start + eff + cost},
                buyMax() {return hasUpgrade("m", 32)},
                cost(a) {
                    let ret = getBuyableAmount("m", 13).times(250).add(2750).round()
                    if (ret < 1) ret = new Decimal(2000)
                    return ret;
                },
                style: {
                    'color': "#ffffff", "text-shadow" : '#000000 0px 0px 20px','width' : "175px", 'height' : "175px", 'font-size' : "8pt", 'background-image' : "url(https://media.npr.org/assets/img/2015/10/08/istock_000013696787_small-40f929a109f759d798fc1d8afc718cc78a2ac18b-s800-c85.jpg)" 
                },
                effect() {
                    let x = getBuyableAmount("m", 13).add(player.m.apesextra).pow(.8)
                    if (hasUpgrade("m", 22)) x = x.times(upgradeEffect("m", 22))
                    if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                    x = x.times(player.m.points.pow(2))
                    if (getBuyableAmount("m", 13).lte(0)) x = new Decimal(1)
                    return x;
                },
                canAfford() {if (player.m.points.gte(getBuyableCost("m", 13))) {return true}},
                unlocked() {if (player.m.points.gte(2000) || getBuyableAmount("m", 13).gt(0) || tmp.m.buyables[13].unlocked) {return true} else false},
                buy(ticks=1) {let cost = getBuyableCost("m", 13)
                    if (!layers.m.buyables[13].canAfford()) return
                    player.m.buyables[13] = player.m.buyables[13].plus(1)
                    if (!hasUpgrade("m", 25)) {player.m.points = player.m.points.minus(cost)}}
            },
            14: {
                display() {
                let desc = "<b><h2>Gods (Produces Apes)</h2></b><br>"    
                let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 14) +"+" + format(player.m.godsextra) + " generated</b><br>"
                let eff = "<b><h2>Effect</h2>: generates Apes " + format(getBuyableEff("m", 14)) + " times a second</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("m", 14)) + " Metal</b><br>"
                return desc + start + eff + cost},
                buyMax() {return hasUpgrade("m", 32)},
                cost(a) {
                    let ret = getBuyableAmount("m", 14).times(500).add(5000).round()
                    
                    if (ret < 1) ret = new Decimal(4000)
                    return ret;
                },
                style: {
                    'color': "#ffffff", "text-shadow" : '#000000 0px 0px 20px','width' : "175px", 'height' : "175px", 'font-size' : "8pt", 'background-image' : "url(https://www.nme.com/wp-content/uploads/2020/08/Doom-Eternal.jpg)", 'background-size':'contain' 
                },
                effect() {
                    let x = getBuyableAmount("m", 14).add(player.m.godsextra).pow(.7)
                    if (hasUpgrade("m", 23)) x = x.times(upgradeEffect("m", 23))
                    if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                    x = x.times(player.m.points.pow(2))
                    if (getBuyableAmount("m", 14) <= 0) x = new Decimal(1)
                    return x;
                },
                canAfford() {if (player.m.points.gte(getBuyableCost("m", 14))) {return true}},
                unlocked() {if (player.m.points.gte(4500) || getBuyableAmount("m", 14).gt(0) || tmp.m.buyables[14].unlocked) {return true} else false},
                buy(ticks=1) {let cost = getBuyableCost("m", 14)
                    if (!layers.m.buyables[14].canAfford()) return
                    player.m.buyables[14] = player.m.buyables[14].plus(1)
                    if (!hasUpgrade("m", 25)) {player.m.points = player.m.points.minus(cost)}}
            },
            15: {
                display() {
                let desc = "<b><h2>P̷̧̢̨̢̨̢̡̢̨̨̧̢̧̢̛̛̲͙̱͔̼̤͖̣̣̪̲̳̳̯͙̲͈͓̦̖̝͖̯̖͚͖̺̦̮̳̰̬̣͚͉̥͚̙̱̰̟̻̫̼̳̘̪̱̭͈͙̲̤̠̗̯̬̻͔̮̟̯͎̯͍̹̻̰̜̘͉͖̣̱̙̼̖̻̪̗̝̥͖͉͕͕̺̙͙̘̰̰̥̲̪̖̯̣̩͈̤͉̖̫͖̬̰̻̜̱̖̲̲̝̺̦̠̼͎̱̜̳̲̜͍͈͉̜̥̰̲̫̋͋̀̆̿̔̄́̆̑́̐͐̒̍͗̉͋͛̒͛̀͐̈́̅̏̅̇́́̽̒͆̓̅̈̿̃̈̔̀̋̅̃̓́̃̃̈̒̈́̍̀̚͘͘͘̕̕̚̚̚͜͜͜͝͝͝͝͝͠ͅͅͅͅở̴̧̢̢̢̧̨̧̡̢̧̧̨̡̨̡̡̨̡̢̛̙͍̼̞͙̣̝͍̙̭̲̥̞̫̳̥̹̖̱̯̱̪̳̖͖̰̭̣̠̖̯̤̦͔̯̥̞̩̙̯̬͙̠̠̦͎̬͎̖̻̯͙̭͎͓̲͓͕̞͙͇͎͕̯͚̪̹̰͎̙̜̩̩͈̘̝̜̼̲̣̣̺̯̠͙̣̝̞̘̤͈̱̳̲͖͚̠̩͎̭͎̺͕̳͈̰̙͚̰͔͇͎̰͚̥̙͙̞̪̬͙̯̗͕͉̹͈͖̘̗͕̗̤̟͍̲̜͔̥͚̲̪͈̜̮̳̤̮̹͇̻̉̍̇͛͑̑̈́̈̍̂͂̌̔̋̇̂̇̏͊̓̌̒̄̄̋̐̏̅͂̿̀͑̓̄̿̏͆͌̋̀̿̽̌͒͒̀͒̎̓̽̽̊̉̈́́͛̂̉̊̀́̀́͆͌̅̂̈̊̃͆̈̌͑̄͊̔̂̐̎̑̓͐́̄̊̽́̀̔̾́̉̃̓͐̊̄̀́̑̐̽͋͆̍̒̊̋͐̀̈̂̓̎̌́̒̔̀̈́̊͊̅̎́̌̓̐̾̃́̈́̀̚͘͘͘͘̕̚͘̚͜͜͜͜͜͜͜͠͝͠͝͝͠͝͝͝͝͝͝ͅͅͅͅṭ̸̢̡̢̢̨̢̧̢̢̢̧̡̢̨̛̛̘̩̟̥̬̺̟̟̲͈̠̝̘̝͉͙̻̞̫̮̝͚̝̟̝̝̩̟̣̝̭͖̩͉̹̲͕̭̬̤̖̤͕̟͎̯̣̬̤͎̯̲̮̲̝̬͙̬̗̗͕̪͕͔̯̹̟͕̱̲̯̞̮̠͎͍̠̹͚̖͚͙͚̬̺̤̲̰̞̣̬̲̰̰̝̼̺͖̳̳̯͚͓͎̼̮̠̼̮̲̖̰̦̘͉͔̟͖̤̙͈̮͚̪̭͕̪̰̮̤̝̈́̎͊̾̈́̽̈́̓̂̐̔̃̎̏̒̑̓̔́̔́̑̇̾̂͐̆̔̅̏͛̊͒͋̈́̌̽̒͆͒̀̇̈͑̈́͗̾̓̿̒̌́̍̌̆̍̀͗͛̇̑̈̑̍̔̄̇̽̂͋̈̉̀͐͐̊̽̂͂̿̈̈́͗̆̈́̍̅̀͋̈̋̿̍͒̃́̍̾̒̈́͗̐̈̀̊̎̅́̾̓͋̎́̒̓̆͂̆̆͆͗̏͌̾͐̍̄͑̒̄̎͌̀̽̏̋̂̾̇̚̚͘̕̚͘̚̚̕͘̚͘̚͜͜͜͝͠͝͠͝͠͝͝͝͝͠͝͝͝͝͝͝͠͝͠ͅͅͅͅͅͅͅȃ̶̢̧̧̡̧̡̢̨̨̡̢̢̛̛̛̛͖̻̙͉̫͍̜̖͓̭͓̭͓̗̫̳͇̻̝͖͍̞̰̠̦͙͉̖̟̮͙̠̼͖̫͎̪̜̰͓͕̣̞̟͓͚͓̙̲̳̳͈̥̯̗̼̤͕̹̪̱̖̙̣̝̮̖̭̞͕̣͙̺̪̱̱̦̳̦͔̘̟͍̩͎̮̲̘͎̼̥͖̠̬̺̤̟͙̼̝͙̱̯̻͙̔̏͊̌̒͒̀͒́͂͆͐̐̀͂̾̌̑̉͛͛͊̓̆́́̿͊͆͛͒̇̄̄̒͌̐͐̐̅̓͌̏̆̈́̓̌͗͒̍̉͌̆͛̈́̀̆̆̾̇̕̕͘͜͜͝͠͝͝͠ͅt̷̡̧̡̢̢̡̢̢̢̧̢̧̡̡̨̡̡̢̛̲͙̘͉͉͚̞͕̘̭͈̝̝̤̦͓͍̳̼̼̘̗̣̮͖̟̥̖̺̪̣̫̗̟͙̭̻̙͉̭͇̝̣̲̤̱̖̯̣̩͉̝̻̙̱̲̩͉͚͔̞̗̩͇̩̹̣̘̰̰͔͕̮͙̩̮̦̻̩̤̫̟̲̹̠̤̩͓͍̫̳̲̪̱̯̠̰̯̞̬͈̰̻̙̺͓̞̙̞̱̙̻̮̦̳̖̞̩̘̘̝̮̼̱̱̫͉̙͍͔̠̻̩̥͚͈̳͓̪̘͇͉̜̪̘̹͍̠͎̝̣̻̰̰͚̠̖̣̜͖͍͌̂̾̽̌̿̒̉̋́̆͑̋̄̔̔̽̓̓̊̇͗͆̎̑̃̀́̈́̽͌́͊̎̍̈́͒́́́̽̑̇̉̓͑̾̒̋̀̊́̔̍͗̉͌̆̈́̍̽͒̆̓̓̐͗̋̏̅̔̒͋̈́́̂̌͒̽̂̓͐͌̀͌͌̃͊̀̓̀̉̔̾̌̉̀̒̅̌̊͋́̏͌͂̊͑́̄̃̉͌̽̽̓̾̅̎̇̀̂͂̔̃͒͗̂̀͌̋̏̀̎̓͌́̂͐͋̏̈́̔́̇͊̍̀̇͂͊́̚͘̚̕̚̚͘̕̕̚̚̕͘̕͜͜͠͝͠͠͝͝͝͠͠͝͝ͅͅở̷̡̧̧̨̧̨̧̨̡̧̧̛̛̫̫͍̙̞̣̱̫̙̤͉̻̬͔̹̮̙̻̗̞̩̦̹̳̺̜͕̹̝̩͎̲͔͇̘̥̝͍̰̱͍̪̦̦͍̤͇͎̟̼̦̫̯̪̱̲̜͇͙͍̯̯̣͖̟͒̀̓̊̎͋͊͆̄̈́̄͛̽͐̈̈́͊̓̓͊̆̍̒͛̓̈͐͗̋̍̈́̏͋̿̈́̆̈̉̅̌̌͗͊̌̏̂͒̓̐̈́́̾͒̉̉̽̾́̀̎̏̑̍̍͆̈͆̎̑͒̉͋͛͌͊̊̊̀̀̽́̂̽̂̅̓̑͆̓͒̈́̇̽̚̚̚̕͘̕̕͘̚̚̕͝͝͠͝͠ͅͅͅ ̸̡̨̡̧̡̧̧̨̡̛̪̹̖̻̥̬͙̥͙͍̞̩̲̤̖̹̝̯̹̩̝̦̥͈͓̘̘̝̥̬̤͙̙̯͍̼̜̣̘̜͔͉̺͎͇̮̗̯̥̯̝̻͓̙̼̲̬̠͍̗̩̫̥̮̱͔͖̥͙̯̰̙͉̙̌͛̀̿̊̿̊͋͆̂͋̎͂̊̈́̐͋̽͒͒̂͑̿̌̅͌̈́̄͊́̐̍̈́͗̍͋́̋̏̃͒̊̊̓̏̉̒͂́͂̇̓̄̔͊̈́̈́̀͑̑̑̿̇́̈́͌̐̃̀͐͛̄̐͛͐̏̾͑̿̇̔̍̑̅̾̏̒̚̚͘̕̚͘͝͠͠͝͝͠ͅͅM̴̧̨̧̢̡̡̧̛̛̛̙̦͉̤̻͔̝̱̰̣̦̺̺̞̙͇̹̞͎̻͇̪̪̗͕͓̞̲̲̖̱͙͇̮̲̭͓͈̤͚͙͓̰̠͍̳͎̮͇̺̳̻̮̩̦͉͚͈͕̭̖̳̘͍̤̺̦͎̻̳̙͓̰̩̺̯͍̯̳̻̦͚̻̦̯͔̲̭̮̥̳̬͙͙̞̞̙̟͔͓̻̤̩̻͇̫̪͉̃̒͛̆̊̓̎͂̍̇̉̅̀͒̇̇̋̉͑͋̍̎͗̈́͛̋̒̏̾̍͒̅̃̃̀̑̄͛̇͂̎͂͋͒̍̋̄̑͆͛̓̄̍͒́̀̏̌͐́͂͌̔͋̍̍̓̏̋̓̋͋̏͆̃̾̏̃͂̓̏͆̔͊̏͑̈́̕͘̕̚͘̕̚̚͘͝͠͠͝͝͠͝ͅͅͅͅͅâ̷̢̡̢̢̡̨̢̩͙͕͕̞͖͖̼̪̥̟̬̳͍̖̩̖̹̩͖͖̬̦̹͙͉̳̬̠̣̩̩͉̦̖͓̤͈͔̩͕̰̝̫͍͕̪̲̰̩̙̣̰͚͚̣͔̪̤̫̪͖̯̣̣̞̬̱̫͓̙̺̠̠̰̩͙̙̗͍̹̹̬̗̪͖̠̼͉͚͎̗̪͈̞̯̫͍͚̱̮̱̤̥̙͖̜͙͖͖̦͇̲͙͇̦̳̺̭͈̻̱͎͎͈̝̝̙̺̺̝̙̬̮̝̮̘͎͔̠̙͌̓̎̊̂͑̓͊̽̈͗͑̎̋̅̃̋̈́̿̓͊́͑́̾̈͒͋̊͑͑͑̃͌̃͂̏̑̆̀́̍͊̽̃̈́̆̍̈́̏̆͗͛͋̆̆͑̚͜͜͜͜͜͜͜͜͜͝͝͝͠͝ͅͅͅͅͅn̶̨̧̨̧̧̨̢̡̡̡̢̧̧̢̛̛̛̛̛̝̖̹̫͉̭̪̻̪̹̮̣̹̠̼̣͈͕͇͎̦̬͇̮̙͕̳̦̹̳̤͖̱̩̘̝̺̮̼̣̙͎͚̖͙̼̻̻̯͙̖̞̤͉̯̝̝̹͕̬͇̤͓̦̞̯̺̟̪̬̭̭̭̤̼̭̪͔͇̭̳̠͚̝̫̮̹̪̯̻̙̺͎̲̗͚̦̤̤̯̘͔̲̺͚͉͔̤̠̜͉͚̺̻͍̤̯͈̮̱̜̦͖͎̞̻̯͔̻̬͓͇̰̥̈́̒̒̏̐̋̊̎̈́̆̓̉́͗̋̽̍̈́̓̾̂̀̾̅͑͆̽̊̉̿͗̎́̂̔͒̊̀̊͊̂̋̑͗̈̀͐͌̒̈́̈́̉̉͆̃̈́̿̇̏̓̔́̍͆̒̏́̉͆̀̿̑͐̒̏̇͂̒̑͌͂̓̾̇̈́̋́̍̔̇̐̎̍͋͗̈́̓͛̋̈́̇́̓̔̕̚͘̚͘͘̚̚͜͜͜͜͜͝͝͝͠͝͝͠͠͝͠ͅͅͅͅ </h2></b><br>"    
                //let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 15) +"+" + format(player.m) + " generated</b><br>"
                //let eff = "<b><h2>Effect</h2>: generates Gods " + format(getBuyableEff("m", 15)) + " times a second</b><br>"
                let cost = "<b><h2></h2>" + format(getBuyableCost("m", 15)) + "</b><br>"
                return desc + cost},
                buyMax() {return hasUpgrade("m", 32)},
                cost(a) {
                    let ret = getBuyableAmount("m", 15).times(750).add(8000).round()
                    if (ret < 1) ret = new Decimal(6500)
                    return ret;
                },
                style: {
                    'color': "#860111","text-shadow" : '#000000 0px 0px 20px', 'width' : "175px", 'height' : "175px", 'font-size' : "8pt", 'background-image' : "url(https://gardendesk.typepad.com/.a/6a00e54efed40888340133f4a245f0970b-pi)" 
                },
                effect() {
                    let x = getBuyableAmount("m", 15).add(player.m).pow(2)
                    if (hasUpgrade("m", 24)) x = x.times(upgradeEffect("m", 24))
                    if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                    x = x.times(player.m.points.pow(2))
                    if (getBuyableAmount("m", 15) < 1) x = new Decimal(1)
                    return x;
                },
                canAfford() {if (player.m.points.gte(getBuyableCost("m", 15))) {return true}},
                unlocked() {if (player.m.points.gte(6500) || getBuyableAmount("m", 15).gt(0) || tmp.m.buyables[15].unlocked) {return true} else false},
                buy(ticks=1) {let cost = getBuyableCost("m", 15)
                    if (!layers.m.buyables[15].canAfford()) return
                    player.m.buyables[15] = player.m.buyables[15].plus(1)
                    if (!hasUpgrade("m", 25)) {player.m.points = player.m.points.minus(cost)}}
            },
            31: {
                display() {
                let desc = "<b><h2>Watering Cans Autogain(Makes Cans A Normal Cost Layer)</h2></b><br>"    
                let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 31) + "</b><br>"
                let eff = "<b><h2>Effect</h2>: " + format(getBuyableEff("m", 31).times(100)) + "%</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("m", 31)) + " Watering Cans</b><br>"
                return desc + start + eff + cost},
                cost(a) {
                    let ret = new Decimal(1.5).pow(getBuyableAmount("m", 31)).round()
                    if (ret < 1) ret = new Decimal(1)
                    return ret;
                },
                effect() {
                    let x = getBuyableAmount("m", 31).div(100)
                    if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                    x = x.times(player.m.points.pow(2))
                    return x;
        },
                style: {"background": "url(https://www.transparenttextures.com/patterns/black-paper.png), #7b9095"},
                canAfford() {if (player.c.points.gte(getBuyableCost("m", 31))) {return true}},
                unlocked() {if (player.m.points.gte(1) || getBuyableAmount("m", 11).gt(0)) {return true} else false},
                buy() {let cost = getBuyableCost("m", 31)
                    if (!layers.m.buyables[31].canAfford()) return
                    player.m.buyables[31] = player.m.buyables[31].plus(1)
                    player.c.points = player.c.points.minus(cost)}
            },
            32: {
                display() {
                    let desc = "<b><h2>Magnify CLicker Autogain(Makes Magnifying Glasses A Normal Cost Layer)</h2></b><br>"    
                    let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 32) + "</b><br>"
                    let eff = "<b><h2>Effect</h2>: " + format(getBuyableEff("m", 32).times(100)) + " %</b><br>"
                    let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("m", 32)) + " Magnifying Glasses</b><br>"
                    return desc + start + eff + cost},
                    cost(a) {
                        let ret = new Decimal(1.5).pow(getBuyableAmount("m", 32)).round()
                        if (ret < 1) ret = new Decimal(1)
                        return ret;
                    },
                    effect() {
                        let x =  getBuyableAmount("m", 32).div(100)
                        if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                        x = x.times(player.m.points.pow(2))
                        
                        return x;
            },
            style: {"background": "url(https://www.transparenttextures.com/patterns/black-paper.png), #7b9095"},
                    canAfford() {if (player.g.points.gte(getBuyableCost("m", 32))) {return true}},
                    unlocked() {if (player.m.points.gte(1) || getBuyableAmount("m", 11).gt(0)) {return true} else false},
                    buy() {let cost = getBuyableCost("m", 32)
                        if (!layers.m.buyables[32].canAfford()) return
                        player.m.buyables[32] = player.m.buyables[32].plus(1)
                        player.g.points = player.g.points.minus(cost)}
                },

            21: {
                display() {
                    let desc = "<b><h2>Watering Can Eff Inc</h2></b><br>"    
                    let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 21) + "</b><br>"
                    let eff = "<b><h2>Effect</h2>: " + format(getBuyableEff("m", 21)) + "X</b><br>"
                    let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("m", 21)) + " Watering Cans</b><br>"
                    return desc + start + eff + cost},
                    cost(a) {
                        let ret = new Decimal(1.1).pow(getBuyableAmount("m", 21)).round()
                        return ret;
                    },
                    effect() {
                        let x = getBuyableAmount("m", 21).times(2)
                        if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                        x = x.times(player.m.points.pow(2))
                        if (getBuyableAmount("m", 21) < 1) {x = new Decimal(1)}
                        return x;
            },
            style: {"background": "url(https://www.transparenttextures.com/patterns/black-paper.png), #7b9095"},
                    canAfford() {if (player.c.points.gte(getBuyableCost("m", 21))) {return true}},
                    unlocked() {if (player.m.points.gte(1) || getBuyableAmount("m", 11).gt(0)) {return true} else false},
                    buy() {let cost = getBuyableCost("m", 21)
                        if (!layers.m.buyables[21].canAfford()) return
                        player.m.buyables[21] = player.m.buyables[21].plus(1)
                        player.c.points = player.c.points.minus(cost)}
            },
            22: {
                display() {
                    let desc = "<b><h2>Magnifying Gen Rate Inc</h2></b><br>"    
                    let start = "<b><h2>Amount</h2>: " + getBuyableAmount("m" , 22) + "</b><br>"
                    let eff = "<b><h2>Effect</h2>: " + format(getBuyableEff("m", 22)) + "X</b><br>"
                    let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("m", 22)) + " Magnifying Glasses</b><br>"
                    return desc + start + eff + cost},
                    cost(a) {
                        let ret = new Decimal(1.1).pow(getBuyableAmount("m", 22)).round()
                        return ret;
                    },
                    effect() {
                        let x = getBuyableAmount("m", 22).times(2)
                        if (hasUpgrade("m", 31)) x = x.times(upgradeEffect("m", 31))
                        x = x.times(player.m.points.pow(2))
                        if (getBuyableAmount("m", 22) < 1) {x = new Decimal(1)}
                        return x;
            },
            style: {"background": "url(https://www.transparenttextures.com/patterns/black-paper.png), #7b9095"},
                    canAfford() {if (player.g.points.gte(getBuyableCost("m", 22))) {return true}},
                    unlocked() {if (player.m.points.gte(1) || getBuyableAmount("m", 11).gt(0)) {return true} else false},
                    buy() {let cost = getBuyableCost("m", 22)
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
                unlocked( ) {if (getBuyableAmount("m", 11).gt(0)) return true}
            },      
            12: {
                title: "Automation v2.0",
                description: "Automates Samuel Buying",
                cost: new Decimal(100),
                unlocked( ) {if (getBuyableAmount("m", 12).gt(0)) return true}
            
            },       
            13: {
                title: "Automation v3.0",
                description: "Automates Ape Buying",
                cost: new Decimal(2000),
                unlocked( ) {if (getBuyableAmount("m", 13).gt(0)) return true}
            
            },
            14: {
                title: "Automation v4.0",
                description: "Automates God Buying",
                cost: new Decimal(3000),
                unlocked( ) {if (getBuyableAmount("m", 14).gt(0)) return true}
            },
            15: {
                title: "Automation v5.0",
                description: "Automates Potato Man Buying",
                cost: new Decimal(8500),
                unlocked( ) {if (getBuyableAmount("m", 15).gt(0)) return true}
            },
            21: {
                title: "Cult v1.0",
                description: "The More Samuels Bought The Faster They Produce Factories",
                cost: new Decimal(50),
                unlocked( ) {if (getBuyableAmount("m", 11).gt(0)) return true},
                effect() {
                    if (getBuyableAmount("m", 12).gt(0)){
                    let ret = getBuyableAmount("m", 12).div(100).add(1)
                    if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
            }}
            },      
            22: {
                title: "Cult v2.0",
                description: "The More Apes Bought The Faster They Produce Samuels",
                cost: new Decimal(100),
                unlocked( ) {if (getBuyableAmount("m", 13).gt(0)) return true},
                effect() {
                    if (getBuyableAmount("m", 13).gt(0)){
                    let ret = getBuyableAmount("m", 13).div(50).add(1)
                    if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
            }}
            },       
            23: {
                title: "Cult v3.0",
                description: "The More Gods Bought The Faster They Produce Apes",
                cost: new Decimal(250),
                unlocked( ) {if (getBuyableAmount("m", 14).gt(0)) return true},
                effect() {
                    if (getBuyableAmount("m", 14).gt(0)){
                    let ret = getBuyableAmount("m", 14).div(25).add(1)
                    if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
            }}
            },
            24: {
                title: "Cult v4.0",
                description: "The More Potato Mans Bought The Faster They Produce Gods",
                cost: new Decimal(250),
                unlocked( ) {if (getBuyableAmount("m", 15).gt(0)) return true},
                effect() {
                    if (getBuyableAmount("m", 15).gt(0)){
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
                cost: new Decimal(10500),
                unlocked( ) {if (hasUpgrade("m", 25)) return true},
                effect() {
                    if (getBuyableAmount("m", 11).gt(0)){
                    let ret = getBuyableAmount("m", 11).div(10).add(1)
                    if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
            }}
            },
            32: {
                title: "Annoyingness Is Forever Elimenated",
                description: "Autobuy The Metal Buyables",
                cost: new Decimal(14500),
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
            () => getBuyableAmount("m", 11).gt(0) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Factory_system'>Factories:</a> The factory system is a method of manufacturing using machinery and division of labour. Because of the high capital cost of machinery and factory buildings, factories were typically privately owned by wealthy individuals who employed the operative labour. Use of machinery with the division of labour reduced the required skill level of workers and also increased the output per worker.The factory system was first adopted in Britain at the beginning of the Industrial Revolution in the late eighteenth century and later spread around the world. It replaced the putting-out system (domestic system). The main characteristic of the factory system is the use of machinery, originally powered by water or steam and later by electricity. Other characteristics of the system mostly derive from the use of machinery or economies of scale, the centralization of factories, and standardization of interchangeable parts.</a></p><br>"] : null,
            () => getBuyableAmount("m", 12).gt(0) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Samuel_Slater'>Samuel Slater:</a> Samuel Slater (June 9, 1768 – April 21, 1835) was an early English-American industrialist known as the 'Father of the American Industrial Revolution' (a phrase coined by Andrew Jackson) and the 'Father of the American Factory System'. In the UK, he was called 'Slater the Traitor' because he brought British textile technology to America, modifying it for United States use. He stole the designs of textile factory machinery as an apprentice to a pioneer in the British industry before migrating to the United States at the age of 21. He designed the first textile mills in the US and later went into business for himself, developing a family business with his sons. He eventually owned thirteen spinning mills and had developed tenant farms and company towns around his textile mills, such as Slatersville, Rhode Island.</a></p><br>"] : null,
            () => getBuyableAmount("m", 13).gt(0) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Human_evolution'>Apes:</a> Human evolution is the evolutionary process that led to the emergence of anatomically modern humans, beginning with the evolutionary history of primates—in particular genus Homo—and leading to the emergence of Homo sapiens as a distinct species of the hominid family, which includes the great apes. This process involved the gradual development of traits such as human bipedalism and language, as well as interbreeding with other hominins, which indicate that human evolution was not linear but a web.</a></p><br>"] : null,
            () => getBuyableAmount("m", 14).gt(0) ? ["display-text", "<p><a href='https://en.wikipedia.org/wiki/Deity'>Gods:</a> A deity or god is a supernatural being considered divine or sacred. The Oxford Dictionary of English defines deity as 'a god or goddess (in a polytheistic religion)'', or anything revered as divine. C. Scott Littleton defines a deity as 'a being with powers greater than those of ordinary humans, but who interacts with humans, positively or negatively, in ways that carry humans to new levels of consciousness, beyond the grounded preoccupations of ordinary life'. A goddess is a female deity.</a></p><br>"] : null,
            () => getBuyableAmount("m", 15).gt(0) ? ["display-text", "<p><a href='https://www.ebay.com/p/1975962941'>Potato Man:</a> Mr. Potato Head is ABOVE ALL!</a></p><br>"] : null,
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
addLayer("o", {
    name: "Oceans", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        wooorms: new Decimal(0),
        scoooles: new Decimal(0),
        sooond: new Decimal(0),
        dooona: new Decimal(0),
        enooogy: new Decimal(0),
        wormsasec: new Decimal(0),
        scalesasec: new Decimal(0),
        sandasec: new Decimal(0),
        dnaasec: new Decimal(0),
       energysasec: new Decimal(0),
       fishieasec: new Decimal(0),
       crabasec: new Decimal(0),
       algaeasec: new Decimal(0),
       fishie2asec: new Decimal(0),
       sharkasec: new Decimal(0),
       crocasec: new Decimal(0),
       fishie3asec: new Decimal(0),
       fishieextra: new Decimal(0),
       crabextra: new Decimal(0),
       algaeextra: new Decimal(0),
       fishie2extra: new Decimal(0),
       sharkextra: new Decimal(0),
       crocsextra: new Decimal(0),
       fishie3extra: new Decimal(0),
        alreadyreset: new Decimal(0),
        godswrath: new Decimal(0),
        gemsunlocked: new Decimal(0),
        animationson: false,
        space: new Decimal(0),
        mind: new Decimal(0),
        reality: new Decimal(0),
        power: new Decimal(0),
        time: new Decimal(0),
        soul: new Decimal(0),
        fish2capreached: false,
        fishunlocked: false,
        crabunlocked: false,
        algayunlocked: false,
        fish2unlocked: false,
        sharkunlocked: false,
        dinounlocked: false,
        fish3unlocked: false,
        spoocewhaleunlocked: false,
        cthulluunlocked: false,
        fishgodunlocked: false,
        
    }},
    nodeStyle() {
        {return {'border-color': '#4fb3ff','background-image': 'url(https://images.theconversation.com/files/223729/original/file-20180619-126566-1jxjod2.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop', 'background-repeat':'no-repeat','background-size':'cover','background-position':'', "animation":"none"
    }}},
    
    branches: [["c", 1]],
    color: "#4fb3ff ",
    requires() {return new Decimal("e785")}, // Can be a function that takes requirement increases into account
    resource: "Oceans", // Name of prestige currency
    baseResource: "Watering Cans", // Name of resource prestige is based on
    baseAmount() {return player.c.points}, // Get the current amount of baseResource
    base(){if (player.o.points.gte(100)) return new Decimal("e400"); else if (hasMilestone("o", 2)) return "e35"; else return "e25"},
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {if(player.o.points.gte(64)) return new Decimal(3); else if(player.o.points.gte(55)) return new Decimal(2.31); else if(player.o.points.gte(50)) return new Decimal(2.11); else 
        if(player.o.points.gte(25)) return new Decimal(1.65); else return new Decimal(1.5)}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    resetsNothing() {return hasMilestone("o", 2)},
    tabFormat: { 
        "Oceans": {
            unlocked() {return player.o.buyables[41].gte(1)},
        content: [
            "main-display", "prestige-button", "resource-display",  "milestones", 
            ["display-text", function() {if (hasMilestone("o", 1)) return "<h2>Ocean Creatures and Resources</h2>\n\
            <p>Each Different Resource Boosts the Production of Previous Layers and the Producers of the Layer Produce These Resources.</p>" + "Wooorms Boost Tree Branch Gain by: " + format(player.o.wooorms.sqrt())
            + ", Scoooles Multiplying Metal Gain by: " + format(player.o.scoooles.pow(new Decimal(1).div(100))) 
            + ", Sooond Multiplying Water Gain by: " + format(player.o.sooond.pow(new Decimal(1).div(10))) 
            + ", Dooona Multiplying production of all Producers by: " + format(player.o.dooona.add(2).log(2))
            + ", and Enooogy Boost Glasses and Cans Gain by: " + format(player.o.enooogy.pow(new Decimal(1).div(10)))
        }],
        ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13], ["clickable", 14], ["clickable", 15],]],"buyables","blank","blank", "upgrades",],
    },
    "Portal": {
        unlocked() {return player.o.buyables[41].gte(1)},
    content: [
        ["display-text", function() {return "Now that you have stupidly discovered the existance of the Elder Gods they will do EVERYTHING in their power to stop you." 
         + " Wrath is dividing your water production by " + format(player.o.godswrath)
          + ", Wrath Dividing Tree Branch Gain by: " + format(player.o.sooond.pow(new Decimal(1).div(10))) 
        + ", Wrath Powering Can and Glasses Gain by: " + format(player.o.dooona.add(2).log(2))
      +  ", and Wrath Powering Ocean Resource Gain by: " + format(player.o.enooogy.pow(new Decimal(1).div(10)))}
    ],
        ["display-text", "<text style='color:#ff0000;'><h1>AQUIRE THE GEMS AT ALL COSTS</h1>"],
        ["display-text", function(){return "Wrath:" + format(player.o.godswrath)}],
        ["clickable", 27],
        ["clickable", 21],
        ["row", [["clickable", 22],["clickable", 23],]],
        ["row", [["clickable", 24],["clickable", 25],]]
        
]}
},
     /*        "Pollution":
             {content:[
                 ["display-text", function() {if (hasMilestone("o", 1)) return "<h2>Pollution Challenges</h2>\n\
                 <p>Enter worlds where pollution decreases the effectivitey of your fishies and gather enough resources to return. After enduring these harder conditions your fishies will be better equiped in their jobs.</p>" 
                 
             }], 
             ],
                 unlocked() {return player.o.buyables[13].gte(75)}
                  }*/ 
                 
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update() {
        if (player.o.gemsunlocked = new Decimal(0) && player.o.buyables[41].gte(1)) {
        if (player.o.godswrath.gt(0) && player.o.godswrath.lte(250)) player.o.godswrath = player.o.godswrath.pow(1.01)
        } else if (player.o.gemsunlocked = new Decimal(1) && player.o.buyables[41].gte(1)) {
        if (player.o.godswrath.gt(0) && player.o.godswrath.lte("1e10")) player.o.godswrath = player.o.godswrath.pow(1.01)
        }
        if (player.o.points.gte(1)) {
        if (getBuyableAmount("o", 11).gte(1)) {
        player.o.wormsasec = getBuyableEff("o", 11)
        player.o.scalesasec = getBuyableEff("o", 11)
        player.o.sandasec = getBuyableEff("o", 11)
        player.o.dnaasec = getBuyableEff("o", 11)
        player.o.energysasec = getBuyableEff("o", 11)}
        if (getBuyableAmount("o", 12).gte(1)) {
            
            player.o.scalesasec = getBuyableEff("o", 11).add(getBuyableEff("o", 12))
            player.o.sandasec = getBuyableEff("o", 11).add(getBuyableEff("o", 12))
            
           
        }
        if (getBuyableAmount("o", 13).gte(1)) {
   
            player.o.sandasec = getBuyableEff("o", 11).add(getBuyableEff("o", 12)).add(getBuyableEff("o", 13))
            player.o.dnaasec = getBuyableEff("o", 11).add(getBuyableEff("o", 13))
 
        }
        if (getBuyableAmount("o", 14).gte(1)) {
            player.o.wormsasec = getBuyableEff("o", 11).times(getBuyableEff("o", 14))
            player.o.scalesasec = getBuyableEff("o", 11).add(getBuyableEff("o", 12)).times(getBuyableEff("o", 14))
            player.o.sandasec = getBuyableEff("o", 11).add(getBuyableEff("o", 12)).add(getBuyableEff("o", 13)).times(getBuyableEff("o", 14))
            player.o.dnaasec = getBuyableEff("o", 11).add(getBuyableEff("o", 13)).times(getBuyableEff("o", 14))
            player.o.energysasec =  getBuyableEff("o", 11).times(getBuyableEff("o", 14))
        }
       
        if (getBuyableAmount("o", 21).gte(1)) {
        player.o.fishieasec = getBuyableEff("o", 21)
        player.o.crabasec = getBuyableEff("o", 21)
        }
        if (getBuyableAmount("o", 22).gte(1)) {
            player.o.crabasec = getBuyableEff("o", 21).add(getBuyableEff("o", 22))
            player.o.algaeasec = getBuyableEff("o", 22)
           }
           if (getBuyableAmount("o", 23).gte(1)) {
            player.o.fishieasec = getBuyableEff("o", 21).pow(getBuyableEff("o", 23).log(10).add(1))
            player.o.crabasec = getBuyableEff("o", 21).add(getBuyableEff("o", 22)).pow(getBuyableEff("o", 23).log(10).add(1))
            player.o.algaeasec = getBuyableEff("o", 22).pow(getBuyableEff("o", 23).log(10).add(1))
            player.o.fishie2asec = getBuyableEff("o", 23)
           }
           if (getBuyableAmount("o", 31).gte(1)) {
            player.o.fishieasec = getBuyableEff("o", 31).add(getBuyableEff("o", 21)).pow(getBuyableEff("o", 23).log(10).add(1))
            player.o.crabasec = getBuyableEff("o", 31).add(getBuyableEff("o", 21)).add(getBuyableEff("o", 22)).pow(getBuyableEff("o", 23).log(10).add(1))
            player.o.algaeasec = getBuyableEff("o", 31).add(getBuyableEff("o", 22)).pow(getBuyableEff("o", 23).log(10).add(1))
            player.o.sharkasec = getBuyableEff("o", 31)
            player.o.crocasec = getBuyableEff("o", 31)
           }
            }
        if (getBuyableAmount("o", 11).gte(1)) {
        player.o.wooorms = player.o.wooorms.add(player.o.wormsasec.div(20))
        player.o.scoooles = player.o.scoooles.add(player.o.scalesasec.div(20))
        player.o.sooond = player.o.sooond.add( player.o.sandasec.div(20))
        player.o.dooona = player.o.dooona.add(player.o.dnaasec.div(20))
        player.o.enooogy = player.o.enooogy.add(player.o.energysasec.div(20)) }
        if (getBuyableAmount("o", 21).gte(1)) {
        player.o.fishieextra = player.o.fishieextra.add(player.o.fishieasec.div(20))
        player.o.crabextra = player.o.crabextra.add(player.o.crabasec.div(20))
        player.o.algaeextra = player.o.algaeextra.add(player.o.algaeasec.div(20))
        player.o.fishie2extra = player.o.fishie2extra.add(player.o.fishie2asec.div(20))}
        if (getBuyableAmount("o", 31).gte(1)) {
            player.o.sharkextra = player.o.sharkextra.add(player.o.sharkasec.div(20))
            player.o.crocsextra = player.o.crocsextra.add(player.o.crocasec.div(20))
            player.o.fishie3extra = player.o.fishie3extra.add(player.o.fishie3asec.div(20))}
            if (hasUpgrade("o", 11)) {
                if ((new Decimal(1.25).pow(getBuyableAmount("o", 11).add(1000)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.wooorms)) {player.o.buyables[11] = player.o.buyables[11].plus(1000)}
                else if ((new Decimal(1.25).pow(getBuyableAmount("o", 11).add(100)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.wooorms)) {player.o.buyables[11] = player.o.buyables[11].plus(100)}
                else if ((new Decimal(1.25).pow(getBuyableAmount("o", 11).add(10)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.wooorms)) {player.o.buyables[11] = player.o.buyables[11].plus(10)};
                 if ((new Decimal(1.25).pow(getBuyableAmount("o", 12).add(1000)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.scoooles) && (new Decimal(1.25).pow(getBuyableAmount("o", 12).add(1000)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.sooond)) {player.o.buyables[12] = player.o.buyables[12].plus(1000)}
                else if ((new Decimal(1.25).pow(getBuyableAmount("o", 12).add(100)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.scoooles) && (new Decimal(1.25).pow(getBuyableAmount("o", 12).add(100)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.sooond)) {player.o.buyables[12] = player.o.buyables[12].plus(100)}
                else if ((new Decimal(1.25).pow(getBuyableAmount("o", 12).add(10)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.scoooles) && (new Decimal(1.25).pow(getBuyableAmount("o", 12).add(10)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.sooond)) {player.o.buyables[12] = player.o.buyables[12].plus(10)};
                if ((new Decimal(1.25).pow(getBuyableAmount("o", 13).add(1000)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.dooona) && (new Decimal(1.25).pow(getBuyableAmount("o", 13).add(1000)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.sooond)) {player.o.buyables[13] = player.o.buyables[13].plus(1000)}
                else if ((new Decimal(1.25).pow(getBuyableAmount("o", 13).add(100)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.dooona) && (new Decimal(1.25).pow(getBuyableAmount("o", 13).add(100)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.sooond)) {player.o.buyables[13] = player.o.buyables[13].plus(100)}
                else if ((new Decimal(1.25).pow(getBuyableAmount("o", 13).add(10)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.dooona) && (new Decimal(1.25).pow(getBuyableAmount("o", 13).add(10)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.sooond)) {player.o.buyables[13] = player.o.buyables[13].plus(10)};
                if (player.o.fish2capreached == false) {
                if (player.o.fish3unlocked == false && getBuyableAmount("o", 14) < 249 ) {
                if ((new Decimal(2.5).pow(getBuyableAmount("o", 14).add(100)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.enooogy)) {player.o.buyables[14] = player.o.buyables[14].plus(100)}
                else if ((new Decimal(2.5).pow(getBuyableAmount("o", 14).add(10)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.enooogy)) {player.o.buyables[14] = player.o.buyables[14].plus(10)}
                else if ((new Decimal(2.5).pow(getBuyableAmount("o", 14).add(1)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.enooogy)) {player.o.buyables[14] = player.o.buyables[14].plus(1)};
            } else if ((new Decimal(5).pow(getBuyableAmount("o", 14).add(100)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.enooogy)) {player.o.buyables[14] = player.o.buyables[14].plus(100)}
            else if ((new Decimal(5).pow(getBuyableAmount("o", 14).add(10)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.enooogy)) {player.o.buyables[14] = player.o.buyables[14].plus(10)}
            else if ((new Decimal(5).pow(getBuyableAmount("o", 14).add(1)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.enooogy)) {player.o.buyables[14] = player.o.buyables[14].plus(1)};
            }}
       if (hasUpgrade("o", 13)) {
        if ((new Decimal(1.25).pow(getBuyableAmount("o", 21).add(100)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.buyables[11])) {player.o.buyables[21] = player.o.buyables[21].plus(100)}
        else if ((new Decimal(1.25).pow(getBuyableAmount("o", 21).add(10)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.buyables[11])) {player.o.buyables[21] = player.o.buyables[21].plus(10)}
        else if ((new Decimal(1.25).pow(getBuyableAmount("o", 21).add(1)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.buyables[11])) {player.o.buyables[21] = player.o.buyables[21].plus(1)}
         if ((new Decimal(1.25).pow(getBuyableAmount("o", 22).add(100)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.buyables[12]) ) {player.o.buyables[22] = player.o.buyables[22].plus(100)}
        else if ((new Decimal(1.25).pow(getBuyableAmount("o", 22).add(10)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.buyables[12]) ) {player.o.buyables[22] = player.o.buyables[22].plus(10)}
        else if ((new Decimal(1.25).pow(getBuyableAmount("o", 22).add(1)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.buyables[12]) ) {player.o.buyables[22] = player.o.buyables[22].plus(1)}
        if ((new Decimal(50).pow(getBuyableAmount("o", 23).add(100)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.enooogy)) {player.o.buyables[23] = player.o.buyables[23].plus(100)}
        else if ((new Decimal(50).pow(getBuyableAmount("o", 23).add(10)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.enooogy) ) {player.o.buyables[23] = player.o.buyables[23].plus(10)}
        else if ((new Decimal(50).pow(getBuyableAmount("o", 23).add(1)).div(new Decimal(2).pow(player.o.points)).round()).lte(player.o.enooogy) ) {player.o.buyables[23] = player.o.buyables[23].plus(1)}
        
}
//if (player.o.fishie2extra.add(getBuyableAmount("o", 14)).gte(5000)) {player.o.buyables[14] = new Decimal(5000), player.o.fishie2extra = new Decimal(0)}
    },
    effectDescription()
        {
            let mult = "multiplying base water gain by " + format(new Decimal(10).pow(player.o.points))
            + ", powering watering can effectivity gain by " + format(new Decimal(1.1).pow(player.o.points))
            let fill = ", multiplying maximum fill level by " + format(new Decimal(3).pow(player.o.points))
            let click = ", multiplying the click effectivitey by " + format(new Decimal(2).pow(player.o.points))
            let clickrate = ", and clicking the watering can fill 0 times a second"
            if (player.o.points.gte(1)) clickrate = ", and clicking the watering can fill by " + format(new Decimal(1.5).pow(player.o.points)) + " times a second" 
            let divrate = ""
            if (hasMilestone("o", 1)) divrate = ", and dividing all ocean costs second layer and above by " + format(new Decimal(2).pow(player.o.points))
            let specialdivrate = ""
            if (hasUpgrade("o", 12)) specialdivrate = ", and dividing spoooce whales by " + format(new Decimal(1.029).pow(player.o.points))

            return mult + fill + click + clickrate + divrate + specialdivrate



        },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "Reset for Oceans", onPress(){if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown(){if (new Decimal("e500").lte(player.c.points)) {return true}
         else if (player.o.points.gte(1)) {player.o.unlocked = true}
         return player.o.unlocked},
         milestones: {
            1: {
                requirementDescription: "3 Oceans",
                effectDescription: "----Unlocks Foooshies----",
                done() {if (player.o.points.gte(3)) {return true}else {return false}},
                style() {if (hasMilestone("o", 1)) return {"background": "linear-gradient( #2e8196, #003c4b, #002b36)", "background-size": "100% 50%","animation": "compact 10s linear infinite"}; else return {"background": "linear-gradient( #4fdcff, #00cafc, #0089ab)", "background-size": "100% 50%","animation": "compact 10s linear infinite"};}
            },
            2: {
                requirementDescription: "10 Oceans",
                effectDescription: "----Ocean Reset Resets Nothing----",
                done() {if (player.o.points.gte(10)) {return true}else {return false}},
                unlocked() {return hasMilestone("o", 1)},
                style() {if (hasMilestone("o", 2)) return {"background": "linear-gradient( #2e8196, #003c4b, #002b36)", "background-size": "100% 50%","animation": "compact 10s linear infinite"}; else return {"background": "linear-gradient( #4fdcff, #00cafc, #0089ab)", "background-size": "100% 50%","animation": "compact 10s linear infinite"};}


            },
           },
           clickables: {
            rows: 2,
            cols: 5,
            
            11: {
                display() {return "Gather Wooorms " + "<br> Current Wooorm:" + format(player.o.wooorms.round()) + " Wooorms a second: " + format(player.o.wormsasec)  },
                canClick() {return true},
                onClick()  { player.o.wooorms = player.o.wooorms.add(player.o.wormsasec).add(1)},
                style: {
                   "text-stroke-width" : '.5px',"text-stroke-color" : '#ffffff','color': "	#ffffff", 'width' : "125px", 'height' : "123px", 'font-size' : "12pt", 'background-image' : "url(https://www.hakaimagazine.com/wp-content/uploads/header-plastic-poop.jpg)" , 'background-size' : "cover"
                },
                unlocked() {return hasMilestone("o", 1)}
            },
            12: {
                display() {return "Gather Scoooles " + " Current Scoool:" + format(player.o.scoooles.round()) + " Scoooles a second: " + format(player.o.scalesasec) },
                canClick() {return true},
                onClick()  { player.o.scoooles = player.o.scoooles.add(player.o.scalesasec).add(1)},
                style: {
                    "text-stroke-width" : '.5px',"text-stroke-color" : '#ffffff','color': "	#ffffff", 'width' : "125px", 'height' : "125px", 'font-size' : "12pt", 'background-image' : "url(data:image/jpeg;base64,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)" , 'background-size' : "cover"
                },unlocked() {return hasMilestone("o", 1)} },
            13: {
                display() {return "Gather Sooond" + " Current Sooond:" + format(player.o.sooond.round()) + " Soond a second:" + format(player.o.sandasec)},
                canClick() {return true},
                onClick()  { player.o.sooond = player.o.sooond.add(player.o.sandasec).add(1)},
                style: {
                    "text-stroke-width" : '.5px',"text-stroke-color" : '#ffffff','color': "	#ffffff", 'width' : "125px", 'height' : "125px", 'font-size' : "12pt", 'background-image' : "url(https://cdn.mos.cms.futurecdn.net/wtqqnkYDYi2ifsWZVW2MT4-1200-80.jpg)",  'background-size' : "cover"
                },
                unlocked() {return hasMilestone("o", 1)}
            },
            14: {
                display() {return "Gather Dooona " + " Current Dooona:" + format(player.o.dooona.round()) + " Doona a second: " + format(player.o.dnaasec) },
                canClick() {return true},
                onClick()  { player.o.dooona = player.o.dooona.add(player.o.dnaasec).add(1)},
                style: {
                    "text-stroke-width" : '.5px',"text-stroke-color" : '#ffffff','color': "	#ffffff", 'width' : "125px", 'height' : "125px", 'font-size' : "12pt", 'background-image' : "url(https://images.newscientist.com/wp-content/uploads/2019/05/03155847/gettyimages-932737574-2.jpg)",  'background-size' : "cover"
                },
                unlocked() {return hasMilestone("o", 1)}
            },
            15: {
                display() {return "Gather Enooogy " + " Current Enooogy:" + format(player.o.enooogy.round()) + " Enoogy a second: " + format(player.o.energysasec)},
                canClick() {return true},
                onClick()  { player.o.enooogy = player.o.enooogy.add(player.o.energysasec).add(1)},
                style: {
                    "text-stroke-width" : '.5px',"text-stroke-color" : '#ffffff','color': "	#ffffff", 'width' : "125px", 'height' : "125px", 'font-size' : "12pt", 'background-image' : "url(https://d32r1sh890xpii.cloudfront.net/article/1200x900/a750861ccac3dc80e7543977280c54bb.jpg)",  'background-size' : "cover", 'background-position' : "-25px"
                },
                unlocked() {return hasMilestone("o", 1)}
            },
            21: {
                display() {return "<b><h3>Space Stone</h3> Required: 1e10,000,000 Water Current:" + format(player.o.space) },
                canClick() {return (player.points.gte("1e10000000"))},
                onClick()  { player.points = player.points.div("1e10000000")
                player.o.space = player.o.space.plus(1)
                player.o.points = new Decimal(1),
                player.o.fishieextra= new Decimal(0),
                player.o.crabextra= new Decimal(0),
                player.o.algaeextra= new Decimal(0),
                player.o.fishie2extra= new Decimal(0),
                player.o.sharkextra= new Decimal(0),
                player.o.crocsextra= new Decimal(0),
                player.o.fishie3extra= new Decimal(0),
                player.p.points = new Decimal(1),
                player.c.points = new Decimal(1),
                player.g.points = new Decimal(1),

               player.o.buyables[11] = new Decimal(1),
               player.o.buyables[12] = new Decimal(0),
               player.o.buyables[13] = new Decimal(0),
               player.o.buyables[14] = new Decimal(0),
               player.o.buyables[21] = new Decimal(0),
               player.o.buyables[22] = new Decimal(0),
               player.o.buyables[23] = new Decimal(0),
               player.o.buyables[31] = new Decimal(0),
               player.o.buyables[32] = new Decimal(0),
               rowReset(1, "p")
               rowReset(1, "c")
               rowReset(1, "o")
               
            },
                style() {
                    let style = {"border-width": '3px','font-size' : "10pt","border-color" : '#000000','color': "	#000000", 'width' : "125px", 'height' : "123px", "background": "url(https://media.comicbook.com/2016/11/marvel-cinematic-universe-infinity-stones-the-tesseract-space-st-208682.jpg)",
                    "background-size" : "cover", "background-position": "center"}
                    if (player.o.animationson == false) style = {
                    "animation": "superdense 1s ease-in-out infinite","border-width": '3px','font-size' : "10pt","border-color" : '#000000','color': "	#000000", 'width' : "125px", 'height' : "123px", "background": "url(https://media.comicbook.com/2016/11/marvel-cinematic-universe-infinity-stones-the-tesseract-space-st-208682.jpg)",
                    "background-size" : "cover", "background-position": "center",}
                    return style
                    
                },
                unlocked() {return player.o.buyables[41].gte(1)}
            },
            22: {
                display() {return "<h3>Mind Stone</h3> Required: 1e70,000 of all base resources" },
                canClick() {return (player.o.wooorms.gte("1e70000") && player.o.scoooles.gte("1e70000") && player.o.sooond.gte("1e70000") && player.o.dooona.gte("1e70000") && player.o.enooogy.gte("1e70000"))},
                onClick()  { 
                (player.o.wooorms = player.o.wooorms.div("1e70000"))
                player.o.scoooles = player.o.wooorms.div("1e70000") 
                player.o.sooond= player.o.sooond.div("1e70000") 
                player.o.dooona= player.o.dooona.div("1e70000") 
                player.o.enooogy= player.o.enooogy.div("1e70000")
                player.o.mind = player.o.mind.plus(1)
                player.o.fishieextra= new Decimal(0),
                player.o.crabextra= new Decimal(0),
                player.o.algaeextra= new Decimal(0),
                player.o.fishie2extra= new Decimal(0),
                player.o.sharkextra= new Decimal(0),
                player.o.crocsextra= new Decimal(0),
                player.o.fishie3extra= new Decimal(0),
                player.m.buyables[21] = new Dcimal(0),
                player.m.buyables[22] = new Dcimal(0),
                player.m.buyables[31] = new Dcimal(0),
                player.m.buyables[32] = new Dcimal(0)
                rowReset(1, "o")
            },
                style() {
                    let style ={"border-width": '3px','font-size' : "10pt","border-color" : '#000000','color': "	#000000", 'width' : "125px", 'height' : "123px", "background-image": "url(https://i.pinimg.com/474x/b3/f4/48/b3f44801750d96a662aa20097ee62643.jpg)",
                    "background-size" : "cover","background-position": "center", }
                    if (player.o.animationson == false) style = {
                    "animation": "lighten 1s ease-in-out infinite", "border-width": '3px','font-size' : "10pt","border-color" : '#000000','color': "	#000000", 'width' : "125px", 'height' : "123px", "background-image": "url(https://i.pinimg.com/474x/b3/f4/48/b3f44801750d96a662aa20097ee62643.jpg)",
                     "background-size" : "cover","background-position": "center",}
                    return style
                },
                unlocked() {return player.o.space.gte(new Decimal(1))}
            },
           
            23: {
                display() {return "<b><h3>Reality Stone</h3> Required: 500,000,000 Metal" },
                canClick() { return (player.m.points.gte("500000000"))},
                onClick()  { player.m.points = player.m.points.sub(500000000)
                player.o.fishieextra= new Decimal(0),
                player.o.crabextra= new Decimal(0),
                player.o.algaeextra= new Decimal(0),
                player.o.fishie2extra= new Decimal(0),
                player.o.sharkextra= new Decimal(0),
                player.o.crocsextra= new Decimal(0),
                player.o.fishie3extra= new Decimal(0),
                player.m.factoriesextra= new Decimal(0),
                player.m.samuelsextra= new Decimal(0),
                player.m.apesextra= new Decimal(0),
                player.m.godsextra= new Decimal(0),
                player.o.reality = player.o.reality.plus(1)
                rowReset(1, "o")            },
                style() {
                    let style =
                    {"border-width": '3px','font-size' : "10pt","border-color" : '#000000','color': "	#000000", 'width' : "125px", 'height' : "123px", "background": "url(https://cdnb.artstation.com/p/assets/images/images/017/719/749/large/-reality-render.jpg?1557093857)",
                    "background-position": "center", "background-size" : "cover"}
                    if (player.o.animationson == false) style = {
                        "animation": "lighten 10s ease-in-out infinite", "border-width": '3px','font-size' : "10pt","border-color" : '#000000','color': "	#000000", 'width' : "125px", 'height' : "123px", "background": "url(https://cdnb.artstation.com/p/assets/images/images/017/719/749/large/-reality-render.jpg?1557093857)",
                    "background-position": "center", "background-size" : "cover"}
                    return style
                    
                },
                unlocked() {return player.o.mind.gte(new Decimal(1))}
            },
            24: {
                display() {return "<b><h3>Power Stone</h3> Required: 1e2,500,000 Cans and Glasses" },
                canClick() { return (player.c.points.gte("1e2500000") && player.g.points.gte("1e2500000"))},
                onClick()  { 
                player.c.points = player.c.points.div("1e2500000")
                player.g.points = player.g.points.div("1e2500000")
                player.o.fishieextra= new Decimal(0),
                player.o.crabextra= new Decimal(0),
                player.o.algaeextra= new Decimal(0),
                player.o.fishie2extra= new Decimal(0),
                player.o.sharkextra= new Decimal(0),
                player.o.crocsextra= new Decimal(0),
                player.o.fishie3extra= new Decimal(0),
                player.m.factoriesextra= new Decimal(0),
                player.m.samuelsextra= new Decimal(0),
                player.m.apesextra= new Decimal(0),
                player.m.godsextra= new Decimal(0),
                player.o.power = player.o.power.plus(1)
                rowReset(1, "o")            },
                style() {
                    let style = {
                    "border-width": '3px','font-size' : "10pt","border-color" : '#000000','color': "	#000000", 'width' : "125px", 'height' : "123px", "background": "url(https://preview.redd.it/nazmvdv0tqn11.jpg?width=960&crop=smart&auto=webp&s=cef031de1e5786dec10af7bb5f8c6fc0a504e446)",
                     "background-size" : "cover","background-position": "center",}
                    if (player.o.animationson == false) style = {
                    "animation": "power 2s ease-in-out infinite","border-width": '3px','font-size' : "10pt","border-color" : '#000000','color': "	#000000", 'width' : "125px", 'height' : "123px", "background": "url(https://preview.redd.it/nazmvdv0tqn11.jpg?width=960&crop=smart&auto=webp&s=cef031de1e5786dec10af7bb5f8c6fc0a504e446)",
                     "background-size" : "cover","background-position": "center",}
                    return style
                },
                unlocked() {return player.o.reality.gte(new Decimal(1))}
            },
            25: {
                display() {return "<b><h3>Time Stone</h3> Required: 1e3,000,000 Cans and Glasses" },
                canClick() { return (player.c.points.gte("1e3000000") && player.g.points.gte("1e3000000"))},
                onClick()  { 
                player.c.points = player.c.points.sub(1e3000000)
                player.g.points = player.g.points.sub(1e3000000)
                player.o.fishieextra= new Decimal(0),
                player.o.crabextra= new Decimal(0),
                player.o.algaeextra= new Decimal(0),
                player.o.fishie2extra= new Decimal(0),
                player.o.sharkextra= new Decimal(0),
                player.o.crocsextra= new Decimal(0),
                player.o.fishie3extra= new Decimal(0),
                player.m.factoriesextra= new Decimal(0),
                player.m.samuelsextra= new Decimal(0),
                player.m.apesextra= new Decimal(0),
                player.m.godsextra= new Decimal(0),
                player.o.time = player.o.time.plus(1)
                rowReset(1, "o")            },
                style() {
                    let style = { "border-width": '3px','font-size' : "10pt","border-color" : '#000000','color': "	#000000", 'width' : "125px", 'height' : "123px", "background": "url(https://www.quirkybyte.com/wp-content/uploads/2018/03/time-stone-780x337.jpg)",
                    "background-size" : "cover","background-position": "center", }
                    if (player.o.animationson == false) style = { "animation": "time 2s ease-in-out infinite","border-width": '3px','font-size' : "10pt","border-color" : '#000000','color': "	#000000", 'width' : "125px", 'height' : "123px", "background": "url(https://www.quirkybyte.com/wp-content/uploads/2018/03/time-stone-780x337.jpg)",
                     "background-size" : "cover","background-position": "center",};
                     return style

                },
                unlocked() {return player.o.power.gte(new Decimal(1))}
            },
            26: {
                display() {return "<b><h3>Space Stone</h3> Required: 1e10,000,000 Water" },
                canClick() { return (player.points.gte("1e250000"))},
                onClick()  { player.points = player.points.div("1e10000000")
                player.o.space = player.o.space.plus(1)
                player.o.fishieextra= new Decimal(0),
                player.o.crabextra= new Decimal(0),
                player.o.algaeextra= new Decimal(0),
                player.o.fishie2extra= new Decimal(0),
                player.o.sharkextra= new Decimal(0),
                player.o.crocsextra= new Decimal(0),
                player.o.fishie3extra= new Decimal(0)
                rowReset(1, "o")
            },
                style: {
                    "animation": "superdense 1s ease-in-out infinite","border-width": '3px','font-size' : "10pt","border-color" : '#000000','color': "	#000000", 'width' : "125px", 'height' : "123px", "background": "url(https://media.comicbook.com/2016/11/marvel-cinematic-universe-infinity-stones-the-tesseract-space-st-208682.jpg)",
                    "background-position": "center", "background-size" : "contain",
                },
                unlocked() {return player.o.buyables[41].gte(1)}
            },
            27: {
                display() {return "<b><h3>Disable Animations</h3> Current State: " + player.o.animationson},
                canClick() {return true},
                onClick()  { player.o.animationson = !player.o.animationson
            },
            style() {if (player.o.animationson == true) return {"animation": "compact 10s linear infinite","background": "linear-gradient( #2e8196, #003c4b, #002b36)", "background-size": "100% 50%",}; else return {"animation": "compact 10s linear infinite","background": "linear-gradient( #4fdcff, #00cafc, #0089ab)", "background-size": "100% 50%",};},
                unlocked() {return player.o.buyables[41].gte(1)}
            },
           
            
        
        },
        upgrades: {
            rows: 1,
            cols: 3,
            11: {
                title: "Fine. I'm not that Evil",
                description: "AutoBuy First Layer of Producers",
                cost: new Decimal(3),
                currencyDisplayName: "Spoooce Whales",
                currencyLocation()  {return player[this.layer].buyables},
                currencyInternalName: [31],
                unlocked() {if (player.o.buyables[31].gte(1)) return true; else return (hasUpgrade("o", 11))}
   
            },
            12: {
                title: "I mean how else would you progress",
                description: "Oceans affect the cost of spoooce whales as well at a reduced rate",
                cost: new Decimal(155),
                currencyDisplayName: "fooshie^3s",
                currencyLocation()  {return player[this.layer].buyables},
                currencyInternalName: [23],
                unlocked() {return (hasUpgrade("o", 11))}
                    },
            13: {
                title: "Fine. I'm kinda Evil",
                description: "Autobuy Second Layer of Producers",
                cost: new Decimal(4),
                currencyDisplayName: "Spoooce Whales",
                currencyLocation()  {return player[this.layer].buyables},
                currencyInternalName: [31],
                unlocked() {return (hasUpgrade("o", 12))}
                    },        
        
        },
         buyables: {
            rows: 4,
            cols: 5,
            11: {
                display() {
                let desc = "<b><h2>Enslave some Fooshies</h2></b><br>"    
                let start = "<b><h2>Fooshies</h2>: " + format(getBuyableAmount("o" , 11))  + " + " + format(player.o.fishieextra) + " Extra</b><br>"
                let eff = "<b><h2>Gather</h2>: " + format(getBuyableEff("o", 11)) + " everything a second</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("o", 11)) + " Wooorms</b><br>"
                return desc + start + eff + cost},
                cost(a) {
                    let ret = new Decimal(1.25).pow(getBuyableAmount("o", 11)).div(new Decimal(2).pow(player.o.points)).round()

                    if (ret < 1) ret = new Decimal(1)
                    return ret;
                },
                style: {
                    "text-stroke-width" : '.5px',"text-stroke-color" : '#ffffff','color': "	#ffffff", 'width' : "150px", 'height' : "150px", 'font-size' : "8pt", 'background-image' : "url(https://conservefish.org/wordpress/wp-content/uploads/3-colorful-reef-fish.jpg)" 
                },
                effect() {
                    if ((getBuyableAmount("o", 11)).gt(0)) {let x = ((getBuyableAmount("o", 11)).add(player.o.fishieextra)).times(player.o.dooona.add(1).log(2))
                    return x} else return new Decimal(1)
        },
                canAfford() {if (player.o.wooorms.gte(getBuyableCost("o", 11))) {return true}},
                unlocked() {if (hasMilestone("o", 1) || getBuyableAmount("o", 11).gt(0)) {player.o.fishunlocked = true} return player.o.fishunlocked},
                buy(ticks=1) {let cost = getBuyableCost("o", 11)
                    if (!layers.o.buyables[11].canAfford()) return
                    player.o.buyables[11] = player.o.buyables[11].plus(1)
                    player.o.wooorms = player.o.wooorms.minus(cost)
                   }
            }, 
            12: {
                display() {
                let desc = "<b><h2>Enslave some Crooobs</h2></b><br>"    
                let start = "<b><h2>Crooobies</h2>: " + format(getBuyableAmount("o" , 12))  + " + " + format(player.o.crabextra) + " Extra</b><br>"
                let eff = "<b><h2>Gather</h2>: " + format(getBuyableEff("o", 12)) + " Scoooles and Sooond a second</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("o", 12)) + " Scoooles and Sooond</b><br>"
                return desc + start + eff + cost},
                cost(a) {
                    let ret = new Decimal(1.25).pow(getBuyableAmount("o", 12)).div(new Decimal(2).pow(player.o.points)).round()
                   
           
                    if (ret < 1) ret = new Decimal(1)
                    return ret;
                },
                style: {
                    "text-stroke-width" : '.5px',"text-stroke-color" : '#ffffff','color': "	#ffffff","background-position" : "-50px", 'width' : "150px", 'height' : "150px", 'font-size' : "8pt", 'background-image' : "url(https://i.ytimg.com/vi/QtBnA1xnnqM/maxresdefault.jpg)"
                },
                effect() {
                    if ((getBuyableAmount("o", 11)).gt(0)) {let x = ((getBuyableAmount("o", 12)).add(player.o.crabextra)).times(player.o.dooona.add(1).log(2))
                   
                    return x} else return new Decimal (1)
        },
                canAfford() {if ((player.o.scoooles.gte(getBuyableCost("o", 12))) && (player.o.sooond.gte(getBuyableCost("o", 12)))) {return true}},
                unlocked() {if (getBuyableAmount("o", 11).gte(70) || getBuyableAmount("o", 12).gt(0)) {player.o.crabunlocked = true} return player.o.crabunlocked},
                buy(ticks=1) {let cost = getBuyableCost("o", 12)
                    if (!layers.o.buyables[12].canAfford()) return
                    player.o.buyables[12] = player.o.buyables[12].plus(1)
                    player.o.scoooles = player.o.scoooles.minus(cost)
                    player.o.sooond = player.o.sooond.minus(cost)
                   }
            },
            13: {
                display() {
                let desc = "<b><h2>Enslave some Algae</h2></b><br>"    
                let start = "<b><h2>Algaeies</h2>: " + format(getBuyableAmount("o" , 13)) + " + " + format(player.o.algaeextra) + " Extra</b><br>"
                let eff = "<b><h2>Gather</h2>: " + format(getBuyableEff("o", 13)) + " Sooond and Dooona a second</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("o", 13)) + " Sooond and Dooona</b><br>"
                return desc + start + eff + cost},
                cost(a) {
                    let ret = new Decimal(1.25).pow(getBuyableAmount("o", 13)).div(new Decimal(2).pow(player.o.points)).round()
                  
                    if (ret < 1) ret = new Decimal(1)
                    return ret;
                },
                style: { 
                    "text-stroke-width" : '.5px',"text-stroke-color" : '#ffffff','color': "	#ffffff", 'width' : "150px", 'height' : "150px", 'font-size' : "8pt", 'background-image' : "url(https://earthalivect.com/wp-content/uploads/2018/08/Alga_subheader.jpg)" 
                },
                effect() {
                    if ((getBuyableAmount("o", 13)).gt(0)) {let x = ((getBuyableAmount("o", 13)).add(player.o.algaeextra)).times(player.o.dooona.add(1).log(2))
                    
                    return x} else return new Decimal (1)
        },
                canAfford() {if (player.o.dooona.gte( getBuyableCost("o", 13)) && player.o.sooond.gte(getBuyableCost("o", 13))) {return true}},
                unlocked() {if ((getBuyableAmount("o", 12).gte(75)) || getBuyableAmount("o", 13).gt(0)) {player.o.algayunlocked = true} return player.o.algayunlocked},
                buy(ticks=1) {let cost = getBuyableCost("o", 13)
                    if (!layers.o.buyables[13].canAfford()) return
                    player.o.buyables[13] = player.o.buyables[13].plus(1)
                    player.o.sooond = player.o.sooond.minus(cost)
                    player.o.dooona = player.o.dooona.minus(cost)
                   }
            },
            14: {
                display() {
                let desc = "<b><h2>Enslave some Fooshie^2</h2></b><br>"    
                let start = "<b><h2>Fooshie^2</h2>: " + format(getBuyableAmount("o" , 14)) + " + " + format(player.o.fishie2extra) + " Extra</b><br>"
                let eff = "<b><h2>Multiplies Base Gain By</h2>: " + format(getBuyableEff("o", 14)) + " </b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("o", 14)) + " Enoogy</b><br>"
                return desc + start + eff + cost},
                cost(a) {
                    let ret = new Decimal(2.5).pow(getBuyableAmount("o", 14)).div(new Decimal(2).pow(player.o.points)).round()
                    if (player.o.fish3unlocked == true && getBuyableAmount("o", 14) > 249) ret = new Decimal(5).pow(getBuyableAmount("o", 14)).div(new Decimal(2).pow(player.o.points)).round()
                    if (ret < 1) ret = new Decimal(1)
                    if (player.o.fish2capreached == true) ret = Infinity
                    if (getBuyableAmount("o", 14).gte(new Decimal(75000))) player.o.fish2capreached = true
                    return ret;
                },
                style: {
                  "background-position" : "-20px",  "text-stroke-width" : '.5px',"text-stroke-color" : '#ffffff','color': "	#ffffff", 'width' : "150px", 'height' : "150px", 'font-size' : "8pt", 'background-image' : "url(data:image/jpeg;base64,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)" 
                },
                effect() {
                    if ((getBuyableAmount("o", 14)).gt(0)) {let x = (new Decimal(2).pow(getBuyableAmount("o", 14).add(player.o.fishie2extra)))
                //    if (player.o.buyables[14].gte(500)) x = ((new Decimal("1e450").sub((new Decimal("1e450").sub(new Decimal(1))).div(((getBuyableAmount("o", 14).add(player.o.fishie2sextra)).log(10)).add(1)))))
                if (player.o.buyables[32].gte(1)) x = x.pow(getBuyableEff("o", 32))
                    return x} else return new Decimal (1)
        },
                canAfford() {if (player.o.enooogy.gte(getBuyableCost("o", 14))) {return true}},
                unlocked() {if ((getBuyableAmount("o", 13).gte(75))  || getBuyableAmount("o", 14).gt(0)) {player.o.fish2unlocked = true}return player.o.fish2unlocked},
                buy() {let cost = getBuyableCost("o", 14)
                    if (!layers.o.buyables[14].canAfford()) return
                    player.o.buyables[14] = player.o.buyables[14].plus(1)
                    player.o.enooogy = player.o.enooogy.minus(cost)
                   }
            },
            21: {
                display() {
                let desc = "<b><h2>Enslave some Shookies</h2></b><br>"    
                let start = "<b><h2>Shookies</h2>: " + format(getBuyableAmount("o" , 21)) +" + " + format(player.o.sharkextra) + " Enslaved</b><br>"
                let eff = "<b><h2>Enslave</h2>: " + format(getBuyableEff("o", 21)) + " Fooshies and Crooobs a second</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("o", 21)) + " Fooshies</b><br>"
                return desc + start + eff + cost},
                cost(a) {
                    let ret = new Decimal(1.25).pow(getBuyableAmount("o", 21)).div(new Decimal(2).pow(player.o.points)).round()
              
                    if (ret < 1) ret = new Decimal(1)
                    return ret;
                },
                style: {
                    "text-stroke-width" : '.5px',"text-stroke-color" : '#ffffff','color': "	#ffffff", 'width' : "150px", 'height' : "150px", 'font-size' : "8pt", 'background-image' : "url(https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2019/05/great-white-shark-social.jpg)" 
                },
                effect() {
                    if ((getBuyableAmount("o", 21)).gt(0)) {let x = ((getBuyableAmount("o", 21)).add(player.o.sharkextra)).times(player.o.dooona.add(1).log(2))
                    if (getBuyableAmount("o", 23).gt(0)) x = x.pow(getBuyableEff("o", 23))
              
                    return x} else return new Decimal (1)
        },
                canAfford() {if (player.o.buyables[11].gte(getBuyableCost("o", 21))) {return true}},
                unlocked() {if (getBuyableAmount("o", 14).gte(115) || getBuyableAmount("o", 21).gt(0)) {player.o.sharkunlocked = true} return player.o.sharkunlocked},
                buy(ticks=1) {let cost = getBuyableCost("o", 21)
                    if (!layers.o.buyables[21].canAfford()) return
                    player.o.buyables[21] = player.o.buyables[21].plus(1)
                    player.o.buyables[11] = player.o.buyables[11].minus(cost)
                   }
            },
            22: {
                display() {
                let desc = "<b><h2>Enslave some Dino Croooooocs</h2></b><br>"    
                let start = "<b><h2>Crocies</h2>: " + format(getBuyableAmount("o" , 22)) +" + " + format(player.o.crocsextra) + " Enslaved</b><br>"
                let eff = "<b><h2>Enslave</h2>: " + format(getBuyableEff("o", 22)) + " Croobs and Algaea second</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("o", 22)) + " Croobs</b><br>"
                return desc + start + eff + cost},
                cost(a) {
                    let ret = new Decimal(1.25).pow(getBuyableAmount("o", 22)).div(new Decimal(2).pow(player.o.points)).round()
             
                    if (ret < 1) ret = new Decimal(1)
                    return ret;
                },
                style: {
                    "text-stroke-width" : '.5px',"text-stroke-color" : '#000000','color': "	#000000", 'width' : "150px", 'height' : "150px", 'font-size' : "8pt", 'background-image' : "url(https://images-na.ssl-images-amazon.com/images/I/71DM0mNsMIL._AC_UX395_.jpg)", "background-size" : "contain"
                },
                effect() {
                    if ((getBuyableAmount("o", 22)).gt(0)) {let x = ((getBuyableAmount("o", 22).add(player.o.crocsextra)).times(player.o.dooona.add(1).log(2))
                    )
                    if (getBuyableAmount("o", 23).gt(0)) x = x.pow(getBuyableEff("o", 23))
                     
                    return x} else return new Decimal (1)
        },
                canAfford() {if (player.o.buyables[12].gte(getBuyableCost("o", 22))) {return true}},
                unlocked() {if (getBuyableAmount("o", 21).gte(75) || getBuyableAmount("o", 22).gt(0)) {player.o.dinounlocked = true} return player.o.dinounlocked},
                buy(ticks=1) {let cost = getBuyableCost("o", 22)
                    if (!layers.o.buyables[22].canAfford()) return
                    player.o.buyables[22] = player.o.buyables[22].plus(1)
                    player.o.buyables[12] = player.o.buyables[12].minus(cost)
                   }
            },
            23: {
                display() {
                let desc = "<b><h2></h2></b><br>"    
                let start = "<b><h2>Supreme Fooshies^3</h2>: " + format(getBuyableAmount("o" , 23)) +" + " + format() + " Enslaved</b><br>"
                let eff = "<b><h2>Powers</h2>: All this layer gain ^" + format(getBuyableEff("o", 23)) + " and enslaves this many fooshie^2 a second</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("o", 23)) + " Enoogy</b><br>"
                return   start + eff + cost},
                cost(a) {
                    let ret = new Decimal(50).pow(getBuyableAmount("o", 23)).div(new Decimal(2).pow(player.o.points)).round()
                   
                    if (ret < 1) ret = new Decimal(1)
                    return ret;
                },
                style: {
                    "background-position" : "-35px", "text-stroke-width" : '.5px',"text-stroke-color" : '#ffffff','color': "	#ffffff", 'width' : "150px", 'height' : "150px", 'font-size' : "8pt", 'background-image' : "url(https://www.popsci.com/resizer/kbH4SeK-6dZp6zXDP6NfqJoJ1vQ=/760x488/cloudfront-us-east-1.images.arcpublishing.com/bonnier/7EOVFCY2NBEZJGO3DNXWXNX4TU.jpg)" 
                },
                effect() {
                    if ((getBuyableAmount("o", 23)).gt(0)) {let x = ((getBuyableAmount("o", 23).log(10).add(1)))
                    if (player.o.buyables[32].gte(1)) x = x.tetrate(getBuyableEff("o", 32))
                    return x} else return new Decimal (1)
        },
                canAfford() {if (player.o.enooogy.gte(getBuyableCost("o", 23))) {return true}},
                unlocked() {if ((getBuyableAmount("o", 22).gte(75)) || getBuyableAmount("o", 23).gt(0)) {player.o.fish3unlocked = true} return player.o.fish3unlocked},
                buy(ticks=1) {let cost = getBuyableCost("o", 23)
                    if (!layers.o.buyables[23].canAfford()) return
                    player.o.buyables[23] = player.o.buyables[23].plus(1)
                    player.o.enooogy = player.o.enooogy.minus(cost)
                   }
            },
            31: {
                display() {
                let desc = "<b><h2>Gain the Respect of Spoooce Whales</h2></b><br>"    
                let start = "<b><h2>Respect</h2>: " + format(getBuyableAmount("o" , 31)) + "</b><br>"
                let eff = "<b><h2>Produce</h2>: " + format(getBuyableEff("o", 31)) + " All previous regular creatures</b><br>"
                let cost = "<b><h2>Requires</h2>: " + format(getBuyableCost("o", 31)) + " Of all in the previous layer</b><br>"
                return desc + start + eff + cost},
                cost(a) {
                    let ret = new Decimal(10).pow(getBuyableAmount("o", 31)).round()
                    if (hasUpgrade("o", 12)) ret = ret.div(new Decimal(1.029).pow(player.o.points)).round()
                    if (ret < 1) ret = new Decimal(1)
                    return ret;
                },
                style: {
                    "background-position" : "-50px", 'color': "#ffffff", 'width' : "150px", 'height' : "150px", 'font-size' : "8pt", 'background-image' : "url(https://www.laphamsquarterly.org/sites/default/files/images/roundtable/rt_main_space_whale.jpg)" 
                },
                effect() {
                    if ((getBuyableAmount("o", 11)).gt(0)) {let x = new Decimal(9).pow(getBuyableAmount("o", 31)).round()
                    if (player.o.buyables[32].gte(1)) x = x.pow(getBuyableEff("o", 32))
                     
                    return x} else return new Decimal (1)
        },
                canAfford() {if (player.o.buyables[21].gte(getBuyableCost("o", 31)) && player.o.buyables[22].gte(getBuyableCost("o", 31)) && player.o.buyables[23].gte(getBuyableCost("o", 31))) {return true}},
                unlocked() {if ((getBuyableAmount("o", 23).gte(100)) || getBuyableAmount("o", 31).gt(0)) {player.o.spoocewhaleunlocked = true} return player.o.spoocewhaleunlocked},
                buy(ticks=1) {let cost = getBuyableCost("o", 31)
                    if (!layers.o.buyables[31].canAfford()) return
                    player.o.buyables[31] = player.o.buyables[31].plus(1)
                    player.o.buyables[21] = player.o.buyables[21].minus(cost)
                    player.o.buyables[22] = player.o.buyables[22].minus(cost)
                    player.o.buyables[23] = player.o.buyables[23].minus(cost)
                   }
            },
            32: {
                display() {
                let desc = "<b><h2>Praise Fooshie^4: </h2></b><br>"    
                let start = "<b><h2></h2>" + format(getBuyableAmount("o" , 32)) +  "</b><br>"
                let eff = "<b><h2>Tetrating Fish^3 and Powering All other Special Producers by</h2>: " + format(getBuyableEff("o", 32)) + "</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost("o", 32)) + " Oceans</b><br>"
                return desc + start + eff + cost},
                cost(a) {
                    let ret = new Decimal(2).pow(getBuyableAmount("o", 32)).round()
                    if (ret < 1) ret = new Decimal(1)
                    return ret;
                },
                style: {
                    "background-position" : "-50px",'color': "#ffffff", 'width' : "150px", 'height' : "150px", 'font-size' : "8pt", 'background-image' : "url(https://ksr-ugc.imgix.net/assets/026/598/698/9fa2af8cd6da9a25e6a1a73f1d5d1c9b_original.jpg?ixlib=rb-2.1.0&crop=faces&w=1552&h=873&fit=crop&v=1569379860&auto=format&frame=1&q=92&s=a019e547dad832795a4bc56ad5f1e1be)" 
                },
                effect() {
                    if ((getBuyableAmount("o", 32)).gt(0)) {let x = ((getBuyableAmount("o", 32).times(.1).add(1)))
                     
                    return x} else return new Decimal (1)
        },
                canAfford() {if (player.o.points.gte(getBuyableCost("o", 32))) {return true}},
                unlocked() {if (hasUpgrade("o", 13) || getBuyableAmount("o", 32).gt(0)) {player.o.cthulluunlocked = true} return player.o.cthulluunlocked },
                buy(ticks=1) {let cost = getBuyableCost("o", 32)
                    if (!layers.o.buyables[32].canAfford()) return
                    player.o.buyables[32] = player.o.buyables[32].plus(1)
                    player.o.points = player.o.points.minus(cost)
                   }
            },
            41: {
                display() {
                let desc = "<b><h2>Fear The [Redacted]</h2></b><br>"
                if (player.o.buyables[41].gte(1)) desc = "<b><h2>Fear The Elder Gods</h2></b><br>"
                let start = "<b><h2></h2>: " + format(getBuyableAmount("o" , 41)) + "</b><br>"
                let eff = "<b><h2>[Redacted]</h2>: " + format(getBuyableEff("o", 41)) + " [Redacted]</b><br>"
                if (player.o.buyables[41].gte(1)) eff = "<b><h2>Wrath</h2>: " + format(player.o.godswrath) + "</b><br>"
                let cost = "<b><h2>[Redacted]</h2>: " + format(getBuyableCost("o", 41)) + " [Redacted]</b><br>"
                if (player.o.buyables[41].gte(1)) cost = ""
                return desc + start + eff + cost},
                cost(a) {
                    let ret = new Decimal(1.25).pow(getBuyableAmount("o", 41)).round()
                    if (getBuyableAmount("o", 41) > 0) ret = Infinity
                    if (ret < 1) ret = new Decimal(1)
                    return ret;
                },
                style: {
                    'color': "#ffffff", 'width' : "150px", 'height' : "150px", 'font-size' : "8pt", 'background-image' : "url(https://static.wikia.nocookie.net/lovecraft/images/2/29/Azathoth_the_blind_idiot_god.jpg/revision/latest?cb=20180305005840)" 
                },
                effect() {
                    if ((getBuyableAmount("o", 41)).gt(0)) {} else return new Decimal (1)
        },
                canAfford() {if (player.o.wooorms.gte(getBuyableCost("o", 41))) {return true}},
                unlocked() {if ((player.points.gte("1e10000000")) || getBuyableAmount("o", 41).gt(0)) {player.o.fishgodunlocked = true} return player.o.fishgodunlocked},
                buy(ticks=1) {let cost = getBuyableCost("o", 41)
                    if (!layers.o.buyables[41].canAfford()) return
                    player.o.buyables[41] = player.o.buyables[41].plus(1)
                   player.o.godswrath = new Decimal(2)//s player.o = player.o.minus(cost)
                   }
            },},
            
   
    }


    
)        
iqcaps=[10,25,50,75,100,120,140,160,180,200,250,350,500,1000,2000,5000,10000,50000,100000,1000000];
iqdescriptions=[
    " Well Didn't say it was going to be smart. Your sun can understand nothing at the moment.",
    " Well I mean, I guess the number went up sooo. Your sun can understand colors.",
    " Well I mean, I think it's still higher than yours. Your sun can understand the alpahbet.",
    " Well i guess its maybe a first grader. Your sun can understand addition.",
    " OOH your little baby is growing up awwwwwwwwww. Your sun can understand multiplication.",
    " Aye it's average! Your sun can understand algebra.",
" Oh no he getting kinda smart. Your sun can understand geometry.",
" Bro what he doin. Your sun can understand triginometry.",
" Bro he's smarter than like 99.99% of the population. Your sun can understand calculus.",
" Bro he smarter than Einstein. Your sun can understand quantum physics.",
" Bro he almost smarter than anyone ever. Your sun can understand topology.",
" Bro I think he's kinda a singularity at this point. Your sun can understand all languages.",
" Bro how he doing that. Your sun can understand the meaning of life.",
" Bro still kinda low ngl. Your sun knows all knowledge ever known by anyone.",
" He knows so much... Your sun eats humans.",
" Mans almost a god. Your sun can understand the fourth dimension.",
" Yo how? Your sun can understand all dimensions.",
" There is no freewill. Your sun can predict the superposition of every particle and therefore the future.",
" He is God. Your sun can understand all.",
" I am become death",
    ];
   function getIntelligenceGain() {
            x=new Decimal(1.5)
            if (hasUpgrade("s", 11))  x=x.sub(upgradeEffect("s", 11)),
            x=x.pow(player.s.numberright.add(1))
            x=x.times(15)
            return x
        };
addLayer("s", {
    name: "Suns", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
       iq: new Decimal(1),
       time: new Number(0),
       numberright: new Decimal(-1)
    }},
    branches: [["g", 1]],
    resetDescription() {if (player.s.points.gte(1)) return "Combine Your Sun With Another of "; else return "Discover an Intelligent Body of "},
    nodeStyle() {
        {return {'border-color': '#f5bd1f','background-image': 'url(https://www.deccanherald.com/sites/dh/files/articleimages/2020/07/13/sun%20istock-1594647126.jpg', 'background-repeat':'no-repeat','background-size':'cover','background-position':'center'
    }}},
    tabFormat: { 
        "Suns": {
        
        content: [
            "main-display", "prestige-button", "resource-display",  "milestones", 
      "upgrades"],
    }, 
   
  
    "Intelligence": {
     
    content: [
        ["display-text", function() {
        base = "Your Sun has an IQ of <text style='color:#f5bd1f; text-shadow: 0px 0px 10px #f5bd1f'>" + format(player.s.iq) + "</text style='color:#f5bd1f; text-shadow: 0px 0px 10px #f5bd1f'>.<p>";
        iqdesc=""
        for (const prop in iqcaps)
        {
            if (player.s.iq.gte(iqcaps[prop])) {
                iqdesc=iqdescriptions[prop]
            }
            
        }
        if (!iqdesc) {return base} else return base + iqdesc}
        
    ],
    "blank",  "blank",
    ["display-text", function() {if (player.s.iq.gte(10)) return "Your sun needs help!" + 
    "<p>It needs to know the correct answer to some problems to learn much like an AI. " +
    "Each time you answer incorrectly you must wait a certain duration before you can answer again." +
    "It will also reset your correct questions as it has learned the wrong thing and must restart." +
    "Also, the farther along the question is that you miss the longer the wait will be before you can answer again." +
    "<p>You may attempt another question in " + format(Math.max(0, player.s.time)) + 
    " seconds." +"On a wrong answer you will reset to " + format(getIntelligenceGain()) + " seconds."
    }],
    "blank", "blank",
declaration="",
clickys="",
    function() {
        for (const prop in sundeclarations) {
            if (player.s.iq.gte(iqcaps[prop]) && (player.s.numberright.lt(prop))) { declaration=["display-text", "Your sun needs to know " + sundeclarations[prop]]}
            else if (player.s.iq.gte(iqcaps[prop])) declaration=["display-text", "Your sun knows " + sundeclarations[prop]]
            
        }
        return declaration
        
 },
 function() {
    for (const prop in sundeclarations) {
        toNumber(prop)

        if (player.s.iq.gte(iqcaps[prop])) {clickys=["row", [["clickable", multiplyerthingy(prop, 1)], ["clickable", multiplyerthingy(prop, 2)], ["clickable", multiplyerthingy(prop, 3)], ["clickable", multiplyerthingy(prop, 4)]]]
    }
} return clickys

    },
  
    
    
  //  function() {if (player.s.iq.gte(10) && (player.s.numberright.lt(0))) return ["display-text", "Your sun needs to know what color is the combination of red and green."]
    //else if (player.s.iq.gte(10)) return ["display-text", "Your sun knows what color is the combination of red and green is."]},
  
]}
},
    color: "#f5bd1f ",
    requires: new Decimal("e785"), // Can be a function that takes requirement increases into account
    resource: "Kilometers", // Name of prestige currency
    baseResource: "Magnifying Glasses", // Name of resource prestige is based on
    baseAmount() {return player.g.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: .1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description() {if (player.s.points.gte(1)) return "Combine Your Sun With Another"}, onPress(){if (canReset(this.layer)) doReset(this.layer) }},
    ],
  
    update(diff) {
    if (player.s.time>0) {player.s.time -= diff}
    let x= player.s.iq
    if (hasMilestone("s",1)) x=x.add(player.s.points.pow(.01).div(20))
    for (const prop in iqcaps)
        {
            if (x.gte(iqcaps[prop])&&(!player.s.numberright.gte(prop))) {x=new Decimal(iqcaps[prop])}
        }
    
    player.s.iq=x
    },
    layerShown(){if (new Decimal("e500").lte(player.g.points)) {return true}
    else if (player.s.points.gte(1)) {player.s.unlocked = true}
    return player.s.unlocked}, 
    clickables: makeClickables(),

    milestones: {

        1: {
            requirementDescription: "Evolution: 1 Kilometer",
            effectDescription() {return "Size of the intelligent body results in intelligence production.<p>" + format((player.s.points.pow(.01))) + " Intelligence a second."},
            done() {if (player.s.points.gte(1)) {return true}else {return false}},

        },
        2: {
            requirementDescription: "Evolution: 10000 Kilometer",
            effectDescription() {return "Metal Buyables no longer cost anything." },
            done() {if (player.s.points.gte(10000)) {return true}else {return false}},

        },
        3: {
            requirementDescription: "Evolution: 100000 Kilometer",
            effectDescription() {return "Automatically gain 100% of Size."},
            done() {if (player.s.points.gte(100000)) {return true}else {return false}},

        },
        },
        upgrades: {
            rows: 1,
            cols: 3,
11: {
                title: "Oop gotta make other layers useful.",
                description: "Magnifying Glasses reduce wait increase rate.",
                cost: new Decimal("1e4275"),
                currencyDisplayName: "Water",
                currencyInternalName: "points",
currencyLocation() { return player },
                effect() {return player.m.points.pow(.01).sub(1)},
                unlocked() {if (player.s.iq.gte(50)) return true; else return (hasUpgrade("s", 11))}
   
            },
           
        
        },
  
    }
    


    
)  

/*      
addLayer("d", {
    name: "Dyson Sphere", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌕", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
       
        
    }},
    branches: [["m", 1],["s", 1]],
    color: "#aaa9ad ",
    requires: new Decimal(2000), // Can be a function that takes requirement increases into account
    resource: "Dyson Spheres", // Name of prestige currency
    baseResource: "Metal and Sunpower", // Name of resource prestige is based on
    baseAmount() {return player.m.points && player.s.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "Reset for Dyson Spheres", onPress(){if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown(){if (player.m.points.gte(1000) && player.s.points.gte(1000)) {return true} else if (player.d.points.gte(1)) {return true} else {return false}},
    upgrades: {
        rows: 2,
        cols: 3,
        
            
        }
    }


    
)        
addLayer("e", {

    name: "Meteor Extractor", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "☄️", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
       
        
    }},
    branches: [["m", 1],["o", 1]],
    color: "#CCCC66 ",
    requires: new Decimal(2000), // Can be a function that takes requirement increases into account
    resource: "Meteor Extractors", // Name of prestige currency
    baseResource: "Oceans and Metal", // Name of resource prestige is based on
    baseAmount() {return player.o.points && player.m.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "Reset for Meteor Extractors", onPress(){if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown(){if (player.o.points.gte(1000) && player.m.points.gte(1000)) {return true} else if (player.e.points.gte(1)) {return true} else {return false}},
    upgrades: {
        rows: 2,
        cols: 3,
        
            
        }
    }


    
)        
*/