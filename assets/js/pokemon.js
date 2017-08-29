var Pokemon = function(correct, alternates, hiddenURL, visibleURL, fact) {
    this.hiddenURL = hiddenURL;
    this.visibleURL = visibleURL;

    this.correct = correct;
    this.alternates = alternates;
    this.fact = fact;

    this.options = alternates.slice(0); // Copy by value
    this.options.push(correct);
    // TODO: shuffle options
};

var MysteryPokemon = [
    new Pokemon("Pikachu", ["Raichu", "Sandshrew", "Ratata"],
                "assets/img/pikachu-hidden.png",
                "assets/img/pikachu-visible.png",
                "When several of these Pokémon gather, their electricity could build and cause lightning storms."),
    new Pokemon("Nidoran", ["Raticate", "Clefable", "Vulpix"],
				"assets/img/nidoran-hidden.png",
				"assets/img/nidoran-visible.png",
				"")
];
