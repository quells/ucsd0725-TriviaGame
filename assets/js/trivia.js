var TriviaGame = function(questions) {
	this.questions = questions;
	this.spentQuestions = [];
	// TODO: shuffle questions
	this.currentQuestion = this.questions.pop();

	this.correctAnswers = 0;
	this.totalTime = 0;

	this.loopInterval;

	this.reset = function() {
		this.correctAnswers = 0;
		this.totalTime = 0;

		this.questions = this.questions.concat(this.spentQuestions);
		this.spentQuestions = [];
		if (typeof this.currentQuestion !== "undefined") { this.questions.push(this.currentQuestion); }
		// TODO: shuffle questions

		clearInterval(this.loopInterval);
	}
}
