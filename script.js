const quizData = [
    {
        question: "Qual tag HTML é usada para criar uma lista não ordenada?",
        alternatives: ["<ol>", "<li>", "<dl>", "<ul>"],
        correctAnswer: "<ul>"
    },
    {
        question: "Qual o propósito principal da linguagem CSS?",
        alternatives: ["Definir a estrutura do conteúdo", "Adicionar interatividade à página", "Estilizar e formatar o layout", "Gerenciar dados do servidor"],
        correctAnswer: "Estilizar e formatar o layout"
    },
    {
        question: "Qual palavra-chave JavaScript é usada para declarar uma variável cujo valor não pode ser reatribuído?",
        alternatives: ["var", "let", "const", "variable"],
        correctAnswer: "const"
    },
    {
        question: "Qual propriedade CSS controla o espaçamento interno de um elemento?",
        alternatives: ["margin", "border", "padding", "spacing"],
        correctAnswer: "padding"
    },
    {
        question: "Qual elemento HTML semântico é tipicamente usado para agrupar conteúdo de navegação (links)?",
        alternatives: ["<section>", "<nav>", "<main>", "<footer>"],
        correctAnswer: "<nav>"
    },
    {
        question: "No JavaScript, o que o operador '===' verifica?",
        alternatives: ["Igualdade de valor apenas", "Igualdade de tipo de dado apenas", "Igualdade de valor e tipo de dado", "Igualdade de objeto"],
        correctAnswer: "Igualdade de valor e tipo de dado"
    },
    {
        question: "Qual seletor CSS tem maior especificidade?",
        alternatives: [".class", "#id", "tag", "* (universal)"],
        correctAnswer: "#id"
    },
    {
        question: "O que significa a sigla DOM em desenvolvimento web?",
        alternatives: ["Data Object Model", "Document Order Method", "Document Object Model", "Design Object Manager"],
        correctAnswer: "Document Object Model"
    },
    {
        question: "Qual tag HTML é utilizada para linkar um arquivo JavaScript externo?",
        alternatives: ["<link>", "<style>", "<script>", "<a>"],
        correctAnswer: "<script>"
    },
    {
        question: "Qual propriedade CSS é essencial para utilizar o Flexbox?",
        alternatives: ["display: block;", "display: grid;", "display: inline;", "display: flex;"],
        correctAnswer: "display: flex;"
    },
    {
        question: "Em HTML, qual atributo de input é usado para exigir que um campo seja preenchido antes do envio do formulário?",
        alternatives: ["validate", "mandatory", "required", "check"],
        correctAnswer: "required"
    },
    {
        question: "No JavaScript, qual é o principal uso da estrutura 'try...catch'?",
        alternatives: ["Executar código em loop", "Gerenciar requisições assíncronas", "Tratar erros durante a execução", "Declarar funções anônimas"],
        correctAnswer: "Tratar erros durante a execução"
    },
    {
        question: "Qual dos seguintes não é um tipo de dado primitivo em JavaScript?",
        alternatives: ["string", "number", "array", "boolean"],
        correctAnswer: "array"
    },
    {
        question: "Qual é o principal componente do Box Model CSS que define o espaço entre a borda do elemento e os elementos vizinhos?",
        alternatives: ["Content", "Padding", "Border", "Margin"],
        correctAnswer: "Margin"
    },
    {
        question: "Qual função JavaScript é usada para agendar a execução de uma função após um determinado número de milissegundos?",
        alternatives: ["setInterval()", "requestAnimationFrame()", "setTimeout()", "delay()"],
        correctAnswer: "setTimeout()"
    }
];
let currentQuestionIndex = 0;
let score = 0;
let userName = "";
let answersHistory = []; 

const inicioScreen = document.getElementById('inicio-screen');
const quizArea = document.getElementById('quiz-area');
const resultsArea = document.getElementById('results-area');
const userNameInput = document.getElementById('user-name');
const startButton = document.getElementById('start-button');
const questionText = document.getElementById('question-text');
const alternativesContainer = document.getElementById('alternatives-container');
const nextButton = document.getElementById('next-button');

const summaryAcertos = document.getElementById('summary-acertos');
const summaryErros = document.getElementById('summary-erros');
const summaryPercentual = document.getElementById('summary-percentual');
const resultUserName = document.getElementById('result-user-name');
const performanceMessage = document.getElementById('performance-message');
const performanceChartCanvas = document.getElementById('performanceChart');

function startQuiz() {
    userName = userNameInput.value.trim();
    if (userName.length < 2) {
        alertUser("ALERTA: O NOME DEVE TER PELO MENOS 2 CARACTERES. Tente novamente.");
        return;
    }
    inicioScreen.classList.add('hidden');
    quizArea.classList.remove('hidden');
    loadQuestion();
}
function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        showResults();
        return;
    }
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = `[Q${currentQuestionIndex + 1}/${quizData.length}] ${currentQuestion.question}`;
    alternativesContainer.innerHTML = '';
    nextButton.disabled = true;

    currentQuestion.alternatives.forEach(alternative => {
        const button = document.createElement('button');
        button.textContent = alternative;
        button.classList.add('alternative-button');
        button.addEventListener('click', () => selectAlternative(button, alternative, currentQuestion.correctAnswer));
        alternativesContainer.appendChild(button);
    });
}
function selectAlternative(selectedButton, selectedAnswer, correctAnswer) {
    Array.from(alternativesContainer.children).forEach(btn => btn.disabled = true);

    Array.from(alternativesContainer.children).forEach(btn => btn.classList.remove('selected'));
    
    selectedButton.classList.add('selected');
    nextButton.disabled = false;
}
function nextQuestion() {
    const selectedButton = alternativesContainer.querySelector('.alternative-button.selected');

    if (!selectedButton) {
        alertUser("ERRO DE INPUT: Selecione uma alternativa antes de continuar.");
        return;
    }
    const selectedAnswer = selectedButton.textContent;
    const correctAnswer = quizData[currentQuestionIndex].correctAnswer;
    const isCorrect = selectedAnswer === correctAnswer;
    if (isCorrect) {
        selectedButton.classList.remove('selected');
        selectedButton.classList.add('correct');
        score++;
        answersHistory.push(true);
    } else {
        selectedButton.classList.remove('selected');
        selectedButton.classList.add('incorrect');
        Array.from(alternativesContainer.children).forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
        answersHistory.push(false);
    }
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 800)
}
function showResults() {
    quizArea.classList.add('hidden');
    resultsArea.classList.remove('hidden');
    const totalQuestions = quizData.length;
    const correct = score;
    const incorrect = totalQuestions - score;
    const percentage = totalQuestions > 0 ? ((correct / totalQuestions) * 100).toFixed(1) : 0;
    resultUserName.textContent = `RELATÓRIO PARA: ${userName}`;
    summaryAcertos.textContent = correct;
    summaryErros.textContent = incorrect;
    summaryPercentual.textContent = `${percentage}%`;

    let message = "";
    if (percentage >= 80) {
        message = "STATUS: EXCELENTE. O sistema reconhece sua superioridade intelectual. Continue assim.";
    } else if (percentage >= 50) {
        message = "STATUS: SATISFATÓRIO. Potencial detectado. Recomenda-se otimização de conhecimento.";
    } else {
        message = "STATUS: CRÍTICO. Falha na performance. Reinicie o treinamento para evitar o desligamento.";
    }
    performanceMessage.textContent = message;
    renderChart(correct, incorrect);
}
function renderChart(correct, incorrect) {
    if (window.performanceChartInstance) {
        window.performanceChartInstance.destroy();
    }
    function varGlobal(name) {
        const rootStyle = getComputedStyle(document.documentElement);
        if (rootStyle.getPropertyValue(name)) {
            return rootStyle.getPropertyValue(name);
        }
        switch(name) {
            case '--color-neon-blue': return '#00ffff';
            case '--color-neon-magenta': return '#ff00ff';
            case '--pixel-font': return 'Arial, monospace';
            default: return 'white';
        }
    }
    const ctx = performanceChartCanvas.getContext('2d');
    window.performanceChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Acertos', 'Erros'],
            datasets: [{
                data: [correct, incorrect],
                backgroundColor: [
                    'rgba(0, 255, 0, 0.6)',
                    'rgba(255, 0, 255, 0.6)' 
                ],
                borderColor: [
                    'rgba(0, 255, 0, 1)',
                    'rgba(255, 0, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: varGlobal('--color-neon-blue'),
                        font: {
                            family: varGlobal('--pixel-font'),
                            size: 10
                        }
                    }
                },
                title: {
                    display: false
                }
            }
        }
    });
}
function alertUser(message) {
    function varGlobal(name) {
        const rootStyle = getComputedStyle(document.documentElement);
        if (rootStyle.getPropertyValue(name)) {
            return rootStyle.getPropertyValue(name);
        }
        switch(name) {
            case '--color-neon-magenta': return '#ff00ff';
            case '--color-bg-dark': return '#0f0f0f';
            case '--pixel-font': return 'Arial, monospace';
            default: return 'white';
        }
    }
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: ${varGlobal('--color-neon-magenta')};
        color: ${varGlobal('--color-bg-dark')};
        font-family: ${varGlobal('--pixel-font')};
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 0 15px ${varGlobal('--color-neon-magenta')};
        font-size: 0.7rem;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (!inicioScreen.classList.contains('hidden') && userNameInput.value.trim().length >= 2) {
            startQuiz();
        } else if (!quizArea.classList.contains('hidden') && !nextButton.disabled) {
            nextQuestion();
        }
    }
});

userNameInput.addEventListener('input', () => {
    startButton.disabled = userNameInput.value.trim().length < 2;
});

startButton.disabled = true;
