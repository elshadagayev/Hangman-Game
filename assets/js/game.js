var game = {
	question_index: -1,
	wins: 0,
	loses: 0,
	questions: [
		{
			img: 'http://www.micwil.com/images/blurb/genio_bookpod_ultra_portable_book_holder_200x200.jpg',
			guess_limit: 12,
			word: 'book',
			letters_guessed: [],
			tries: 0,
			correct: 0,
		},
		{
			img: 'http://e-cdn-images.deezer.com/images/artist/9dbde7b7c8186fa8cc93975db3987537/200x200-000000-80-0-0.jpg',
			guess_limit: 12,
			word: 'blonde',
			letters_guessed: [],
			tries: 0,
			correct: 0,
		},
		{
			img: 'http://d1marr3m5x4iac.cloudfront.net/images/block200/I0-001/039/168/069-1.jpeg_/2-hour-gangster-tour-new-york-69.jpeg',
			guess_limit: 12,
			word: 'gangster',
			letters_guessed: [],
			tries: 0,
			correct: 0,
		},
	],
	init: function() {
		this.updateStats();
		this.next();
	},
	guess: function(letter) {
		var question = this.questions[this.question_index];
		if(question.letters_guessed.indexOf(letter) === -1)
			question.letters_guessed.push(letter);
		question.tries++;
		this.updateQuestion(this.question_index);
	},
	updateStats: function() {
		// wins
		document.querySelector('.wins').innerHTML = this.wins;
		// loses
		document.querySelector('.loses').innerHTML = this.loses;
	},
	updateQuestion: function (i) {
		var question = this.questions[i];
		if(!question) {
			alert("End");
			return;
		}

		var word = [];
		for(var i in question.word) {
			if(question.letters_guessed.indexOf(question.word[i]) !== -1) {
				word.push(question.word[i]);
				question.correct++;
			}
			else
				word.push('-');
		}

		if(word.indexOf('-') === -1) {
			alert("You won");
			this.wins++;
			this.updateStats();
			this.next();
			return;
		}

		var guessed_letters = question.letters_guessed.join(', ');
		var guess_remains = question.guess_limit - question.tries;
		var img = question.img;

		document.querySelector('.word').innerHTML = word.join('');
		document.querySelector('.guessed_letters').innerHTML = guessed_letters;
		document.querySelector('.guess_remains').innerHTML = guess_remains;
		document.querySelector('.game_img').innerHTML = '<img src="' + img + '">';

		if(guess_remains <= 0) {
			alert("You losed");
			this.loses++;
			this.updateStats();
			this.next();
			return;
		}
	},
	next: function () {
		this.updateQuestion(++this.question_index);
	}
}

game.init();
document.onkeyup = function(event) {
	if(event.keyCode > 64 && event.keyCode < 91)
		game.guess(event.key);
}