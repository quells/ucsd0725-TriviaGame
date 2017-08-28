var game;
var headerImage;

$(document).ready(function() {
	// Pre-load all images
	var numToLoad = 1;

	headerImage = $("<img>").on("load", function() {
		numToLoad--;
	}).attr("src", "assets/img/WTP.png")

	for (var i = 0; i < MysteryPokemon.length; i++) {
		numToLoad += 2;
		var p = MysteryPokemon[i];
		$("<img>").attr("index", i).on("load", function() {
			var i = $(this).attr("index");
			MysteryPokemon[i].hiddenImage = $(this).addClass("img-fluid poke-overlay");;
			numToLoad--;
		}).attr("src", p.hiddenURL);
		$("<img>").attr("index", i).on("load", function() {
			var i = $(this).attr("index");
			MysteryPokemon[i].visibleImage = $(this).addClass("img-fluid poke-overlay");;
			numToLoad--;
		}).attr("src", p.visibleURL);
	}

	var loadingInterval = setInterval(function() {
		if (numToLoad < 1) {
			clearInterval(loadingInterval);
			AppMain();
			return;
		}
	}, 20);
});

function BuildInterface() {
	var card = $("<div>").addClass("card mt-3");

	var header = $("<div>").addClass("card-img-top").attr("id", "poke-image").appendTo(card);
	headerImage.addClass("card-img-top img-fluid").attr("alt", "Who's That Pokemon?").appendTo(header);

	var body = $("<div>").addClass("card-body").appendTo(card);

	var row = $("<div>").addClass("row").appendTo(body);
	var col1 = $("<div>").addClass("col-12 col-md-6").appendTo(row);
	$("<h1>").addClass("card-title text-center text-md-left").text("Who’s That Pokémon?").appendTo(col1);
	var col2 = $("<div>").addClass("col-12 col-md-6").appendTo(row);
	$("<h2>").addClass("text-center text-md-right mt-md-4 mt-lg-2").attr("id", "timeRemaining").appendTo(col2);

	$("<hr>").appendTo(body);

	$("<div>").addClass("d-flex flex-column flex-md-row justify-content-start").attr("id", "buttons").appendTo(body);

	var container = $("#container");
	container.append(card);
}

function HandleQuestion(game) {
	var hiddenImage = game.currentQuestion.hiddenImage.attr("id", "hiddenImage");
	$("#poke-image").append(hiddenImage);
	var buttons = $("#buttons");
	buttons.empty();
	for (var i = 0; i < game.currentQuestion.options.length; i++) {
		var option = game.currentQuestion.options[i];
		var button = $("<button>").addClass("btn btn-poke m-1").text(option).click(HandleSelection);
		buttons.append(button);
	}
}

function HandleSelection() {
	$("button").each(function() {
		$(this).click(function(){});
		if ($(this).text() !== game.currentQuestion.correct) {
			$(this).addClass("inactive");
		}
	});

	$("#hiddenImage").remove();
	var visibleImage = game.currentQuestion.visibleImage.attr("id", "visibleImage");
	$("#poke-image").append(visibleImage);

	game.handleSelection($(this).text(), function(gameIsFinished) {
		console.log(gameIsFinished);
	});
}

function AppMain() {
	// Remove loading interface
	exitLoadingLoop = true;
	$("#loading-container").remove();
	BuildInterface();

	game = new TriviaGame(MysteryPokemon);
	HandleQuestion(game)
}
