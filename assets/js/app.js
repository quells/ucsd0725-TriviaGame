var App = function(questions) {
	this.questions = questions;

	this.preLoadImages = function(callback) {
		var numToLoad = 1;

		this.headerImage = $("<img>").on("load", function() {
			numToLoad--;
		}).attr("src", "assets/img/WTP.png")

		for (var i = 0; i < questions.length; i++) {
			numToLoad += 2;
			var p = questions[i];
			$("<img>").attr("index", i).on("load", function() {
				var i = $(this).attr("index");
				questions[i].hiddenImage = $(this).addClass("img-fluid poke-overlay");;
				numToLoad--;
			}).attr("src", p.hiddenURL);
			$("<img>").attr("index", i).on("load", function() {
				var i = $(this).attr("index");
				questions[i].visibleImage = $(this).addClass("img-fluid poke-overlay");;
				numToLoad--;
			}).attr("src", p.visibleURL);
		}

		var loadingInterval = setInterval(function() {
			if (numToLoad < 1) {
				clearInterval(loadingInterval);
				callback();
			}
		}, 20);
	};

	this.main = function() {
		this.buildInterface();
		this.game = new TriviaGame(MysteryPokemon);
		this.handleQuestion(this.game.currentQuestion);
	};

	this.buildInterface = function() {
		var card = $("<div>").addClass("card mt-3");

		var header = $("<div>").addClass("card-img-top").attr("id", "poke-image").appendTo(card);
		this.headerImage.addClass("card-img-top img-fluid").attr("alt", "Who's That Pokemon?").appendTo(header);

		var body = $("<div>").addClass("card-body").appendTo(card);

		var row = $("<div>").addClass("row").appendTo(body);
		var col1 = $("<div>").addClass("col-12 col-md-6").appendTo(row);
		$("<h1>").addClass("card-title text-center text-md-left").text("Who’s That Pokémon?").appendTo(col1);
		var col2 = $("<div>").addClass("col-12 col-md-6").appendTo(row);
		$("<h2>").addClass("text-center text-md-right mt-md-4 mt-lg-2").attr("id", "timeRemaining").appendTo(col2);

		$("<hr>").appendTo(body);

		$("<div>").addClass("d-flex flex-column flex-md-row justify-content-start").attr("id", "buttons").appendTo(body);

		$("#container").append(card);
	};

	this.handleQuestion = function(question) {
		var buttons = $("#buttons");

		// Clear old interface
		$("#hiddenImage").remove();
		$("#visibleImage").remove();
		buttons.empty();

		// Setup new interface
		var hiddenImage = question.hiddenImage.attr("id", "hiddenImage");
		$("#poke-image").append(hiddenImage);
		var self = this;
		for (var i = 0; i < question.options.length; i++) {
			var option = question.options[i];
			var button = $("<button>").addClass("btn btn-poke m-1").text(option).click(function() {
				self.handleOptionSelection(self);
			});
			buttons.append(button);
		}

		// TODO: Setup countdown for question time limit
	};

	this.handleOptionSelection = function(self) {
		// Inactivate incorrect options
		$("button").each(function() {
			$(this).click(function(){});
			if ($(this).text() !== self.game.currentQuestion.correct) {
				$(this).addClass("inactive");
			}
		});

		// Swap overlay images
		$("#hiddenImage").remove();
		var visibleImage = this.game.currentQuestion.visibleImage.attr("id", "visibleImage");
		$("#poke-image").append(visibleImage);

		var gameIsFinished = this.game.handleOptionSelection($(this).text());
		if (gameIsFinished) {
			// TODO: Update UI with game stats, etc
		} else {
			// TODO: Get next question
			// TODO: Countdown to
		}
	};
};
