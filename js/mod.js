let modInfo = {
	name: "The Tree",
	id: "MYTrees",
	pointsName: "Water",
	discordName: "",
	discordLink: "",
	changelogLink: "https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md",
    offlineLimit: 1,  // In hours
    initialStartPoints: new Decimal (10) // Used for hard resets and new players
}

// Set your version in num and name
let VERSION = {
	num: "1.05",
	name: "Idk Bro Cool Trees Go brrrr",
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calwlate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	let base = new Decimal(1)
	if (player.c.points > 0 &&! (getBuyableAmount("m", 21) > 0)) {base = base.add(1).pow(player.c.points.pow(.8))}
	else if (getBuyableAmount("m", 21) > 0 && player.c.points > 0) {base = base.add(1).pow((new Decimal(17).sub((new Decimal(17).sub(new Decimal(2))).div((player.c.points.log(2)).add(1)))))}
	if (hasUpgrade("c", 11)) {base = base.times(upgradeEffect("c", 11))}
	if (hasMilestone("c", 2)) {base = base.times(player.c.WaterMultiplier.pow(.2))}
	if (player.m.points.gte(1)) {base = base.times(getMBuyableEff(11))}
	gain = base
	if (hasUpgrade("p", 11)) gain = gain.times(upgradeEffect("p", 11))
	if (hasUpgrade("p", 13)) gain = gain.times(upgradeEffect("p", 13))
	if (hasUpgrade("p", 14)) gain = gain.times(upgradeEffect("p", 14))
	if (gain < 1 && base > 0) {gain = base} 
	if (gain.lt(1)) {gain = new Decimal(1)}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600000) // Default is 1 hour which is just arbitrarily large
}