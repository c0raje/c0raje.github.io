// Obtener elementos HTML
var questionElement = document.getElementById('question');
var answerElement = document.getElementById('answer');
var submitButton = document.getElementById('submit');
var resultElement = document.getElementById('result');

// Cargar archivo JSON
fetch('jsons/questions.json')
  .then(response => response.json())
  .then(data => {
    // Obtener preguntas y respuestas del archivo JSON
    var questions = data.questions;

    // Inicializar índice de pregunta actual
    var currentQuestion = 0;

    // Mostrar primera pregunta
    showQuestion();

    // Función para mostrar una pregunta
    function showQuestion() {
      // Verificar si se han respondido todas las preguntas
      if (currentQuestion >= questions.length) {
        questionElement.textContent = '¡Quiz completado!';
        answerElement.style.display = 'none';
        submitButton.style.display = 'none';
        return;
      }

      // Obtener pregunta actual
      var current = questions[currentQuestion];

      // Mostrar pregunta en el elemento HTML correspondiente
      questionElement.textContent = current.question;
    }

    // Función para verificar la respuesta del usuario
    function checkAnswer() {
      // Obtener pregunta actual
      var current = questions[currentQuestion];

      // Obtener respuesta del usuario
      var userAnswer = answerElement.value.trim();

      // Verificar si la respuesta es correcta
      if (userAnswer.toLowerCase() === current.answer.toLowerCase()) {
        // Mostrar mensaje de respuesta correcta
        resultElement.textContent = '¡Respuesta correcta!';
        resultElement.classList.remove('incorrect');
        resultElement.classList.add('correct');
      } else {
        // Mostrar mensaje de respuesta incorrecta
        resultElement.textContent = 'Respuesta incorrecta. La respuesta correcta es: ' + current.answer;
        resultElement.classList.remove('correct');
        resultElement.classList.add('incorrect');
      }

      // Limpiar campo de respuesta
      answerElement.value = '';

      // Avanzar a la siguiente pregunta
      currentQuestion++;
      showQuestion();
    }

    // Agregar evento al botón de enviar respuesta
    submitButton.addEventListener('click', checkAnswer);

    // Agregar evento al presionar la tecla "Enter"
    answerElement.addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        checkAnswer();
      }
    });
  });
