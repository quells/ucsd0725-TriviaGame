var Pokemon = function(correct, alternates, hiddenURL, visibleURL) {
	this.hiddenURL = hiddenURL;
	this.visibleURL = visibleURL;

	this.correct = correct;
	this.alternates = alternates;

	this.options = alternates.slice(0); // Copy by value
	this.options.push(correct);
	// TODO: shuffle options
};

var MysteryPokemon = [
	new Pokemon("Pikachu", ["Raichu", "Sandshrew", "Ratata"], "assets/img/pikachu-hidden.png", "assets/img/pikachu-visible.png")
];
