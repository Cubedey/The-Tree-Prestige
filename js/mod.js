let modInfo = {
	name: "The Tree Prestige",
	id: "MYTrees",
	pointsName: "Water",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.11111",
	name: "Idk Bro Cooleresterererererestereereestttttttttttttttttttttttttttttttt Trees Go brrrr",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

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
	if (player.c.points.gte(1) &&! (getBuyableAmount("m", 31) > 0)) {base = base.add(1).pow(player.c.points.pow(.8)).times(getBuyableEff("m", 21)).pow(new Decimal(1.1).pow(player.o.points))}
	else if (getBuyableAmount("m", 31) > 0 && player.c.points > 0) {base = new Decimal(2).pow((new Decimal(22).sub((new Decimal(22).sub(new Decimal(2))).div((player.c.points.log(2)).add(1))))).times(upgradeEffect("c", 11)).times(getBuyableEff("m", 21)).pow(new Decimal(1.1).pow(player.o.points))}
	if (hasUpgrade("c", 11)) {base = base.times(upgradeEffect("c", 11))}
	if (hasMilestone("c", 2)) {base = base.times(player.c.WaterMultiplier.pow(.2))}
	if (player.m.points.gte(1) && player.c.points > 0) {base = base.times(getBuyableEff("m",21))}
	if (player.m.points.gte(1)) base = base.times((player.m.points.times(player.m.points).add(1)))
	if (player.o.points.gte(1)) base = base.times(new Decimal(10).pow(player.o.points))
	gain = base
	if (hasUpgrade("p", 11)) gain = gain.times(upgradeEffect("p", 11))
	if (hasUpgrade("p", 13)) gain = gain.times(upgradeEffect("p", 13))
	if (hasUpgrade("p", 14)) gain = gain.times(upgradeEffect("p", 14))
	if (hasUpgrade("p", 21)) gain = gain.times(upgradeEffect("p", 21))
	if (player.o.sooond.gte(1)) gain = gain.times(player.o.sooond.pow(new Decimal(1).div(10)))
	//if (player.o.scoooles.gte(1)) gain = gain.times(player.o.scoooles.pow(new Decimal(1).div(1000)))
	if (gain < 1 && base > 0) {gain = base} 
	if (gain.lt(1)) {gain = new Decimal(1)}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	
		"<br/>",
		() => player.p.points < 0 ? "<br/>" :
			  player.p.points <  15?          `Your Tree Is the Size of ${format(player.p.points.div(1.7))} Human Beans` :
			  player.p.points <  8.6 * 1000?        `Your Tree Is the Size of ${format(player.p.points.div(15))} Oak Trees` :
			  player.p.points <  2.3 * 1000 * 1000?    `Your Tree Is the Size of ${format(player.p.points.div(8600))} Large Hadron Colliders` :
			  player.p.points <  12.7 * 1000 * 1000? `Your Tree Is the Size of ${format(player.p.points.div(2300 * 1000))} Plutos` :
			  player.p.points <  64 * 1000 * 1000?    `Your Tree Is the Size of ${format(player.p.points.div(12.7 * 1000 * 1000))} Earfs` :
			  player.p.points <  1.4 * 1000 * 1000 * 1000? `Your Tree Is the Size of ${format(player.p.points.div(64 * 1000 * 1000))} MineCraft Worlds` :
			  player.p.points <  10 * 1000 * 1000 * 1000?    `Your Tree Is the Size of ${format(player.p.points.div(1.4 * 1000 * 1000 * 1000))} Suns` :
			  player.p.points <  134 * 1000 * 1000 * 1000  ? `Your Tree Is the Size of ${format(player.p.points.div(10 * 1000 * 1000 * 1000))}<br>
			  Now Say We Stacked All the Humans On Top of Eachother` :
			  player.p.points <  1.5 * 10**13?    `Your Tree Is the Size of ${format(player.p.points.div(134 * 1000 * 1000 * 1000))} Largest Suns in the Universe` :
			  player.p.points <  9.46 * 10**15 ? `Your Tree Is the Size of ${format(player.p.points.div("1.5e13"))} Solar Systems` :
			  player.p.points <  5 * 10**20 ?    `Your Tree Is the Size of ${format(player.p.points.div("9.46e15"))} Lightyears` :
			  player.p.points <  1.21 * 10**21 ? `Your Tree Is the Size of ${format(player.p.points.div("5e20"))} Sombrero Galaxies` :
			  player.p.points <  10**23 ? `Your Tree Is the Size of ${format(player.p.points.div("1.2e21"))} Milky Way Galaxies` :
			  player.p.points <  4.4 * 10**26 ? `Your Tree Is the Size of ${format(player.p.points.div("e23"))} Local Groups` :
			  player.p.points <  10**100 ? `Your Tree Is the Size of ${format(player.p.points.div("4.4e26"))} Universes` :
			  player.p.points <  10**308 ?  `Your Tree Is the Size of ${format(player.p.points.div("e100"))} Multiverses` :
			  new Decimal(10).pow(716).gte(player.p.points) ? `Your Tree Is the Size of ${format(player.p.points.div("e308"))} Omniverses` :
			   `Your Tree Is the Size of ${format(player.p.points.div("e716"))} Omegaverses`,
			  //new Decimal(24 * 365).times("3e1000").gte(player.p.points) ? `Your Tree Is the Size of ${format(player.p.points.div(24 * 365 * 1000000000))} eons of work` :
											//		  `Your Tree Is the Size of heat death ^${format(player.points.log(new Decimal(24).mul(365).mul("1e1000")))} of work`
		" (Based On Branches) "
]

// Determines when the game "ends"
function isEndgame() {
	return player.p.points.gte(new Decimal("e200000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}