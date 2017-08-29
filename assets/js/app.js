var App = function(questions) {
    this.questions = questions;
    this.timeRemaining = 0;
    this.countdownInterval;
    this.pokeballDark = new Pokeball(1, "#ccc");
    this.pokeballLight = new Pokeball(1, "#eee");

    this.preLoadImages = function(callback) {
        var numToLoad = 1;

        this.headerImage = $("<img>").on("load", function() {
            numToLoad--;
        }).attr("src", "assets/img/WTP.jpg")

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
        var col1 = $("<div>").addClass("col-12 col-md-5 col-lg-6").appendTo(row);
        $("<h1>").addClass("card-title text-center text-md-left").text("Who’s That Pokémon?").appendTo(col1);
        var col2 = $("<div>").addClass("col-12 col-md-7 col-lg-6").appendTo(row);
        $("<h2>").addClass("text-center text-md-right mt-md-4 mt-lg-2").attr("id", "timeRemaining").appendTo(col2);

        $("<hr>").appendTo(body);

        $("<div>").addClass("d-flex flex-column flex-md-row justify-content-center").attr("id", "buttons").appendTo(body);

        var pokeballs = $("<div>").addClass("text-center mt-4");
        for (var i = 0; i < 3; i++) {
            var pb = $("<canvas>").addClass("pokeball").attr({ "width": 50, "height": 50, "index": 2-i }).appendTo(pokeballs);
            var ctx = pb[0].getContext("2d");
            ctx.drawImage(this.pokeballLight.canvas, 5, 5);
        }
        body.append(pokeballs);

        $("#container").append(card);
    };

    this.handleQuestion = function(question) {
        var self = this;
        var buttons = $("#buttons");

        // Clear old interface
        $("#hiddenImage").remove();
        $("#visibleImage").remove();
        $("#pokeFact").remove();
        buttons.empty();

        // Setup new interface
        var hiddenImage = question.hiddenImage.attr("id", "hiddenImage");
        $("#poke-image").append(hiddenImage);
        for (var i = 0; i < question.options.length; i++) {
            var option = question.options[i];
            var button = $("<button>").addClass("btn btn-poke m-1").text(option).click(function() {
                self.handleOptionSelection($(this));
            });
            buttons.append(button);
        }

        // Setup countdown
        this.timeRemaining = 15;
        $("#timeRemaining").text(this.formatTime(this.timeRemaining) + " Remaining");
        this.countdownInterval = setInterval(function(self) {
            self.timeRemaining--;
            $("#timeRemaining").text(self.formatTime(self.timeRemaining) + " Remaining");
            if (self.timeRemaining < 1) {
                self.updateInterfaceForEndOfQuestion();
                self.game.handleOptionSelection("");
            }
        }, 1000, self);
    };

    this.updateInterfaceForEndOfQuestion = function() {
        var self = this;
        // Inactivate incorrect options
        $("button").each(function() {
            $(this).prop('onclick',null).off('click'); // Disable click events
            if ($(this).text() !== self.game.currentQuestion.correct) {
                $(this).addClass("inactive");
            }
        });

        // Swap overlay images
        $("#hiddenImage").remove();
        var visibleImage = this.game.currentQuestion.visibleImage.attr("id", "visibleImage");
        $("#poke-image").append(visibleImage);

        // Update interface
        $("#timeRemaining").text("Next Round Starts Soon");
        var pokeFact = $("<div>").attr("id", "pokeFact");
        pokeFact.append($("<hr>"));
        pokeFact.append($("<h3>").text(this.game.currentQuestion.fact));
        $("<hr>").before(pokeFact);
        $(".pokeball").each(function() {
            var ctx = $(this)[0].getContext("2d");
            ctx.clearRect(0, 0, $(this).width(), $(this).height());
            ctx.drawImage(self.pokeballDark.canvas, 5, 5);
        });

        // Start countdown to next round
        clearInterval(self.countdownInterval);
        this.timeRemaining = 3;
        this.countdownInterval = setInterval(function(self) {
            self.timeRemaining--;
            $(".pokeball").each(function() {
                var index = $(this).attr("index");
                var ctx = $(this)[0].getContext("2d");
                ctx.clearRect(0, 0, $(this).width(), $(this).height());
                if (index < self.timeRemaining) {
                    ctx.drawImage(self.pokeballDark.canvas, 5, 5);
                } else {
                    ctx.drawImage(self.pokeballLight.canvas, 5, 5);
                }
            });
            if (self.timeRemaining < 1) {
                clearInterval(self.countdownInterval);
                self.handleNextQuestion();
            }
        }, 1500, self);
    }

    this.handleOptionSelection = function(button) {
        this.updateInterfaceForEndOfQuestion();
        this.game.handleOptionSelection(button.text());
    };

    this.handleNextQuestion = function() {
        var gameIsFinished = this.game.handleNextQuestion();
        if (gameIsFinished) {
            console.log("game over");
            // TODO: Update UI with game stats, etc
        } else {
            this.handleQuestion(this.game.currentQuestion);
        }
    }

    this.formatTime = function(t) {
        t = Math.abs(t);
        var sec = t % 60;
        var min = Math.floor((t-sec)/60);
        if (sec < 10) { sec = "0" + sec; }
        if (min < 10) { min = "0" + min; }
        return min + ":" + sec;
    };
};
