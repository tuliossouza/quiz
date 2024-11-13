let respostasErradas = [];
function nextQuestion(nextPage) {
    // Salvar a resposta no localStorage
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);
    for (let [name, value] of formData.entries()) {
        localStorage.setItem(name, value);
    }
    // Redirecionar para a próxima página
    window.location.href = nextPage;
}

function previousQuestion(previousPage) {
    // Redirecionar para a página anterior
    window.location.href = previousPage;
}

function finishQuiz() {
    // Salvar a resposta da última pergunta
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);
    for (let [name, value] of formData.entries()) {
        localStorage.setItem(name, value);
    }
    // Redirecionar para a página de resultado
    window.location.href = 'result.html';
}

window.onload = function() {
    if (window.location.pathname.includes('result.html')) {
        let score = 0;
        const totalQuestions = 5;

        // Respostas corretas
        const respostasCorretas = {
            q1: 'a',
            q2: 'b',
            q3: 'c',
            q4: 'b',
            q5: 'b'
        };

        // Verificação das respostas e cálculo da pontuação
        for (let i = 1; i <= totalQuestions; i++) {
            const respostaUsuario = localStorage.getItem(`q${i}`);
            if (respostaUsuario === respostasCorretas[`q${i}`]) {
                score++;
            } else {
                respostasErradas.push(`Questão ${i}: Sua resposta foi '${respostaUsuario}'`);
            }
        }

        const percentage = (score / totalQuestions) * 100;
        document.getElementById('result').innerText = `Você acertou ${score} de ${totalQuestions} perguntas (${percentage}%).`;

        // Exibir as respostas erradas
        atualizarRespostasErradas();
    }
};

function atualizarRespostasErradas() {
    const listaErros = document.getElementById("respostasErradas");
    listaErros.innerHTML = "";
    respostasErradas.forEach(erro => {
        const item = document.createElement("li");
        item.textContent = erro;
        listaErros.appendChild(item);
    });
}
