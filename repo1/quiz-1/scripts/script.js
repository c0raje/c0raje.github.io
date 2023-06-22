// Cargar el archivo JSON
fetch('jsons/json.json')
  .then(response => response.json())
  .then(data => {
    const verbs = data.verbos;
    const verbKeys = Object.keys(verbs);
    let currentVerbIndex = 0;
    const questionTypes = Object.keys(verbs[verbKeys[currentVerbIndex]]);
    let currentQuestionTypeIndex = 0;
    const pronouns = ["i", "you", "we", "they", "he", "she", "it"];
    let currentPronounIndex = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    // Mostrar la primera pregunta
    showQuestion();

    // Capturar la respuesta del usuario
    document.getElementById('quizForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const answer = document.getElementById('answerInput').value;

      // Comprobar la respuesta
      checkAnswer(answer);

      // Mostrar resultado actual y avanzar a la siguiente pregunta después de unos segundos
      setTimeout(() => {
        currentPronounIndex++;
        if (currentPronounIndex >= pronouns.length) {
          currentPronounIndex = 0;
          currentQuestionTypeIndex++;
          if (currentQuestionTypeIndex >= questionTypes.length) {
            currentQuestionTypeIndex = 0;
            currentVerbIndex++;
            if (currentVerbIndex >= verbKeys.length) {
              // Todas las preguntas han sido respondidas
              showFinalResult();
              return;
            }
          }
        }
        showQuestion();
      }, 1500); // Esperar 2 segundos antes de avanzar
    });

    // Función para mostrar la pregunta actual
    function showQuestion() {
      const questionElement = document.getElementById('question');
      const currentVerb = verbKeys[currentVerbIndex];
      const currentQuestionType = questionTypes[currentQuestionTypeIndex];
      const currentPronoun = pronouns[currentPronounIndex];
      const question = `¿Cómo se conjuga el verbo ${currentVerb} en ${currentQuestionType} con el pronombre ${currentPronoun}?`;
      questionElement.textContent = question;
      questionElement.style.color = 'black';
      document.getElementById('answerInput').value = '';
      document.getElementById('result').textContent = '';
    }

    // Función para comprobar la respuesta del usuario
    function checkAnswer(answer) {
      const resultElement = document.getElementById('result');
      const currentVerb = verbKeys[currentVerbIndex];
      const currentQuestionType = questionTypes[currentQuestionTypeIndex];
      const currentPronoun = pronouns[currentPronounIndex];
      const correctAnswer = verbs[currentVerb][currentQuestionType][currentPronoun];

      if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        resultElement.textContent = 'Respuesta correcta';
        resultElement.style.color = 'green';
        correctAnswers++;
      } else {
        resultElement.textContent = 'Respuesta incorrecta';
        resultElement.style.color = 'red';
        incorrectAnswers++;
      }
    }

    // Función para mostrar el resultado final
    function showFinalResult() {
      document.getElementById('quizForm').style.display = 'none';
      const finalResultElement = document.getElementById('finalResult');
      const totalQuestions = verbKeys.length * questionTypes.length * pronouns.length;
      finalResultElement.textContent = `Respuestas correctas: ${correctAnswers}/${totalQuestions}`;
      finalResultElement.style.color = 'green';
      const incorrectResultElement = document.getElementById('incorrectResult');
      incorrectResultElement.textContent = `Respuestas incorrectas: ${incorrectAnswers}/${totalQuestions}`;
      incorrectResultElement.style.color = 'red';
    }
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });
