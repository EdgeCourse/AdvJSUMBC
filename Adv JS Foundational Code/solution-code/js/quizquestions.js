
class Quiz {
    constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.currentQuestionIndex = 0;
    }
  
    guess(answer) {
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
      }
      this.currentQuestionIndex++;
    }
  
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
  
    hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
    }
  }
  
  class Question {
    constructor(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
    }
  
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }
  
  const QuizUI = {
    displayNext() {
      if (quiz.hasEnded()) {
        this.displayScore();
      } else {
        this.displayQuestion();
        this.displayChoices();
        this.displayProgress();
      }
    },
  
    displayQuestion() {
      this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
  
    displayChoices() {
      const choices = quiz.getCurrentQuestion().choices;
  
      for (let i = 0; i < choices.length; i++) {
        this.populateIdWithHTML("choice" + i, choices[i]);
        this.guessHandler("guess" + i, choices[i]);
      }
    },
  
    displayScore() {
      const gameOverHTML = `<h2>Results</h2>
                             <h2> Your score is: ${quiz.score}/${quiz.questions.length}</h2>`;
      this.populateIdWithHTML("quiz", gameOverHTML);
    },
  
    populateIdWithHTML(id, text) {
      document.getElementById(id).innerHTML = text;
    },
  
    guessHandler(id, guess) {
      document.getElementById(id).onclick = () => {
        quiz.guess(guess);
        this.displayNext();
      };
    },
    
  /*
    displayProgress() {
      const currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.populateIdWithHTML("progress", `Question ${currentQuestionNumber} of ${quiz.questions.length}`);
   
    }
  */
 
    displayProgress() {
      const currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.populateIdWithHTML("progress", `Question ${currentQuestionNumber} of ${quiz.questions.length}`);
  
      const canvas = document.getElementById('progressBar');
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
  
      ctx.clearRect(0, 0, width, height);
  
      const progress = (currentQuestionNumber / quiz.questions.length) * width;
  
      ctx.fillStyle = 'lightgreen';
      ctx.fillRect(0, 0, progress, height);
  
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0, 0, width, height);
    }
  };
  
  // Create Questions
  const questions = [
    new Question("Which one is a client-side language?", ["Python", "JavaScript", "PHP", "Perl"], "JavaScript"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS/CSS3", "XML"], "CSS/CSS3"),
    new Question("Which can be used for object-oriented code?", ["HTML5", "CSS3", "JavaScript", "None"], "JavaScript"),
    new Question("What is implemented in mobile-first design?", ["HTML5", "CSS3", "Media Queries", "All"], "All"),
    new Question("MVC is a _____.", ["Language", "Library", "Framework", "All"], "Framework")
  ];
  
  // Create Quiz
  const quiz = new Quiz(questions);
  
  // Display Quiz
  QuizUI.displayNext();

  //es5

  /* 
      function Quiz(questions) {
      this.score = 0;
      this.questions = questions;
      this.currentQuestionIndex = 0;
    }

    Quiz.prototype.guess = function(answer) {
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
      }
      this.currentQuestionIndex++;
    };

    Quiz.prototype.getCurrentQuestion = function() {
      return this.questions[this.currentQuestionIndex];
    };

    Quiz.prototype.hasEnded = function() {
      return this.currentQuestionIndex >= this.questions.length;   

    };

    function Question(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
    }

    Question.prototype.isCorrectAnswer = function(choice) {
      return this.answer === choice;   

    };

    var QuizUI = {
      displayNext: function() {
        if (quiz.hasEnded()) {
          this.displayScore();
        } else {
          this.displayQuestion();
          this.displayChoices();
          this.displayProgress();
        }
      },

      displayQuestion: function() {
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
      },

      displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;

        for (var i = 0; i < choices.length; i++) {
          this.populateIdWithHTML("choice"   
 + i, choices[i]);
          this.guessHandler("guess" + i, choices[i]);
        }
      },

      displayScore: function() {
        var gameOverHTML = "<h2>Results</h2>";
        gameOverHTML += "<h2> Your score is: " + quiz.score   
 + "/" + quiz.questions.length + "</h2>";
        this.populateIdWithHTML("quiz", gameOverHTML);
      },

      populateIdWithHTML: function(id, text) {
        var element = document.getElementById(id);   

        element.innerHTML = text;
      },

      guessHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
          quiz.guess(guess);
          QuizUI.displayNext();
        };
      },

      displayProgress: function() {
        var currentQuestionNumber = quiz.currentQuestionIndex   
 + 1;
        this.populateIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);   

      }
    };

    // Create Questions
    var questions = [
      new Question("Which one is a client-side language?", ["Python", "JavaScript", "PHP", "Perl"], "JavaScript"),
      new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS/CSS3", "XML"], "CSS/CSS3"),
      new Question("Which can be used for object-oriented scripting?", ["HTML5", "CSS3", "JavaScript", "None"], "JavaScript"),
      new Question("What is implemented in mobile-first design?", ["HTML5", "CSS3", "Media Queries", "All"], "All"),
      new Question("MVC is a _____.", ["Language", "Library", "Framework", "All"], "Framework")
    ];

    // Create Quiz
    var quiz = new Quiz(questions);

    // Display Quiz
    QuizUI.displayNext();
  */