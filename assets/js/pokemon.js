var Pokemon = function(correct, alternates, hiddenURL, visibleURL, fact) {
    this.hiddenURL = hiddenURL;
    this.visibleURL = visibleURL;

    this.correct = correct;
    this.alternates = alternates;
    this.fact = fact;

    this.options = alternates.slice(0); // Copy by value
    this.options.push(correct);
    this.options = FisherYatesShuffle(this.options);
};

var MysteryPokemon = [
    new Pokemon("Pikachu", ["Raichu", "Sandshrew", "Ratata"],
                "assets/img/pikachu-hidden.png",
                "assets/img/pikachu-visible.png",
                "When several of these Pokémon gather, their electricity could build and cause lightning storms."),
    new Pokemon("Nidoran", ["Raticate", "Clefable", "Vulpix"],
                "assets/img/nidoran-hidden.png",
                "assets/img/nidoran-visible.png",
                "The poison hidden in its small horn is extremely potent. Even a tiny scratch can have fatal results."),
    new Pokemon("Spearow", ["Pidgey", "Zubat", "Farfetch'd"],
                "assets/img/spearow-hidden.png",
                "assets/img/spearow-visible.png",
                "Inept at flying high. However, it can fly around very fast to protect its territory."),
    new Pokemon("Seaking", ["Magikarp", "Goldeen", "Seadra"],
                "assets/img/seaking-hidden.png",
                "assets/img/seaking-visible.png",
                "In the autumn spawning season, they can be seen swimming powerfully up rivers and creeks."),
    new Pokemon("Clefairy", ["Jigglypuff", "Chansey", "Mankey"],
                "assets/img/clefairy-hidden.png",
                "assets/img/clefairy-visible.png",
                "Its magical and cute appeal has many admirers. It is rare and found only in certain areas.")
];
