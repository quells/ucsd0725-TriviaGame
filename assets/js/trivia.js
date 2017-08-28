var TriviaGame = function(questions) {
	this.questions = questions;
	this.spentQuestions = [];
	// TODO: shuffle questions
	this.currentQuestion = this.questions.pop();

	this.correctAnswers = 0;
	this.totalAnswers = 0;

	this.reset = function() {
		this.correctAnswers = 0;
		this.totalAnswers = 0;

		this.questions = this.questions.concat(this.spentQuestions);
		this.spentQuestions = [];
		if (typeof this.currentQuestion !== "undefined") { this.questions.push(this.currentQuestion); }
		// TODO: shuffle questions
		this.currentQuestion = this.questions.pop();
	}

	this.handleSelection = function(answer, callback) {
		this.totalAnswers++;
		if (answer === this.currentQuestion.correct) { this.correctAnswers++; }
		
		if (this.questions.length < 1) {
			// End of questions
			callback(true);
		} else {
			callback(false);
		}
	}
}
