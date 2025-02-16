document.addEventListener("DOMContentLoaded", () => {
    const quizForm = document.getElementById("quiz-form");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    let score = 0;
    let timeLeft = 30; // l'utilisateur à 30 seconde pour finir le quiz

    // les reponses correct 
    const correctAnswers = {
        q1: "Rabat",
        q2: "4"
    };

    // Timer 
    const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("Time's up! Submitting your answers.");
            quizForm.submit();
        }
    }, 1000);

    
    quizForm.addEventListener("submit", (e) => {
        e.preventDefault();
        clearInterval(countdown); // arret du timer
        
        const formData = new FormData(quizForm);
        score = 0;
        
        for (const [question, answer] of Object.entries(correctAnswers)) {
            if (formData.get(question) === answer) {
                score += 1;
            }
        }

        scoreDisplay.textContent = `Score: ${score} / ${Object.keys(correctAnswers).length}`;
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
