document.addEventListener("DOMContentLoaded", () => {
    const configForm = document.getElementById("formdeconfig");
    const quizContainer = document.getElementById("quiz-container");
    const quizForm = document.getElementById("quiz-form");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    let score = 0;
    let timeLeft = 0;
    let countdown;

    // chercher les fonctions de l'API
    async function fetchQuestions(amount, category, difficulty) {
        const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    }

    // generer un quiz de l'api
    function generateQuiz(questions) {
        quizForm.innerHTML = "";
        questions.forEach((q, index) => {
            const answers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
            const questionHTML = `
                <div class="question" data-correct="${q.correct_answer}">
                    <p>${q.question}</p>
                    ${answers.map(ans => `
                        <label>
                            <input type="radio" name="q${index}" value="${ans}"> ${ans}
                        </label><br>
                    `).join('')}
                </div>
            `;
            quizForm.innerHTML += questionHTML;
        });
        quizForm.innerHTML += '<button type="submit">Submit</button>';
    }
    

    // Start quiz
    configForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const amount = parseInt(document.getElementById("amount").value,10);
        const category = document.getElementById("category").value;
        const difficulty = document.getElementById("difficulty").value;
        const questions = await fetchQuestions(amount, category, difficulty);
        generateQuiz(questions);
        quizContainer.style.display = "block";
        startTimer(amount);
    });

    // Set timer
   

    function startTimer(amount) {
        timeLeft = amount*10;
        clearInterval(countdown);
        countdown = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(countdown);
                alert("Time's up! Submitting your answers.");
                quizForm.submit();
            }
        }, 1000);
    }

    // submitting counting grades
    quizForm.addEventListener("submit", (e) => {
        e.preventDefault();
        clearInterval(countdown);
        score = 0;
        
        const formData = new FormData(quizForm);
        const questions = Array.from(quizForm.querySelectorAll(".question"));
    
        questions.forEach((q, index) => {
            const selectedAnswer = formData.get(`q${index}`); 
            const correctAnswer = q.dataset.correct; 
    
            if (selectedAnswer === correctAnswer) {
                score++; 
            }
        });
    
        scoreDisplay.textContent = `Score: ${score} / ${questions.length}`;
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    
});


