const quizData = [
    {
      question: 'A set of intructions that tells the computer how to behave, what to do and derive at a solution to a particular problem is:',
      options: ['Algorithm', 'Pseudocode', 'Programming', 'Program'],
      answer: 'Program',
    },
    {
      question: 'A set of logically sequenced instructions that allows to find the solution to a problem is:',
      options: ['Algorithm', 'Pseudocode', 'Programming', 'Program'],
      answer: 'Algorithm',
    },
    {
      question: 'The six stages of program development in logical order are:',
      options: ['Define, Analyze, Write, Test, Document, Debug', 'Define, Analyze, Develop, Write, Test and Debug, Document', 'Define, Write, Develop, Analyze, Test, Document', 'Define, Develop, Write, Test, Document, Debug'],
      answer: 'Define, Analyze, Develop, Write, Test and Debug, Document',
    },
    {
      question: 'The programming language that is used to show pupils the concept and structure of programming is called:',
      options: ['Basic', 'Cobol', 'Pascal', 'Java'],
      answer: 'Pascal',
    },
    {
      question: 'Java is an example of which generation programming language',
      options: [
        '4GLs',
        '3rd',
        '2nd',
        '1st',
      ],
      answer: '3rd',
    },
    {
      question: 'Which of the following generations of programming language executed code faster:',
      options: ['4GLs', '3rd', '2nd', '1st'],
      answer: '1st',
    },
    {
      question: 'Algorithms must be all of the following except:',
      options: [
        'Logical',
        'Ambiguous',
        'Concise',
        'Precise',
      ],
      answer: 'Ambiguous',
    },
    {
      question: 'Which language had codes such as MOV, ADD, SUB',
      options: ['Java', 'Binary', 'Pascal', 'Assembly'],
      answer: 'Assembly',
    },
    {
      question: 'Which of the following had executes programming codes line by line, rather than the whole program',
      options: [
        'Compiler',
        'Interprete',
        'Executer',
        'Translator',
      ],
      answer: 'Interpreter',
    },
    {
      question: 'All the following are examples of third programming language except:',
      options: ['Pascal', 'C#', 'Basic', 'Fortran'],
      answer: 'Fortran',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();