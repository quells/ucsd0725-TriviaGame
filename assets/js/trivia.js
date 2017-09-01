var TriviaGame = function(questions) {
    this.questions = questions;
    this.spentQuestions = [];
    this.currentQuestion = this.questions.pop();

    this.correctAnswers = 0;
    this.totalAnswers = 0;

    this.reset = function() {
        this.correctAnswers = 0;
        this.totalAnswers = 0;

        this.questions = this.questions.concat(this.spentQuestions);
        this.spentQuestions = [];
        if (typeof this.currentQuestion !== "undefined") { this.questions.push(this.currentQuestion); }

        for (var i = 0; i < this.questions.length; i++) {
            var q = this.questions[i];
            q.options = Shuffle(q.options);
            this.questions[i] = q;
        }
        this.questions = Shuffle(this.questions);

        this.currentQuestion = this.questions.pop();
    }

    this.handleOptionSelection = function(answer) {
        this.totalAnswers++;
        if (answer === this.currentQuestion.correct) { this.correctAnswers++; }
    }

    this.handleNextQuestion = function() {
        if (this.questions.length < 1) {
            // End of questions
            return true;
        }
        this.spentQuestions.push(this.currentQuestion);
        this.currentQuestion = this.questions.pop();
        return false;
    }

    this.reset();
}
