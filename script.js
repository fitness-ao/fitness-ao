// Dados simulados de ginásios
const gyms = [
    { name: "Academia Bodytech", location: "talatona", price: 15000, image: "assets/gym1.jpg" },
    { name: "Iron Nation", location: "morrobento", price: 20000, image: "assets/gym2.jpg" },
    { name: "Fitness Hut", location: "belas", price: 25000, image: "assets/gym3.jpg" },
    { name: "Ginásio Total Fit", location: "alvalade", price: 10000, image: "assets/gym4.jpg" },
    { name: "Pump Gym", location: "talatona", price: 30000, image: "assets/gym5.jpg" },
    { name: "Kixima Fitness", location: "maianga", price: 12000, image: "assets/gym6.jpg" }
];

// Função para carregar ginásios na página
function loadGyms() {
    const gymContainer = document.getElementById('gym-container');
    gymContainer.innerHTML = '';

    gyms.forEach(gym => {
        const gymCard = document.createElement('div');
        gymCard.className = 'gym-card';
        gymCard.innerHTML = `
            <img src="${gym.image}" alt="${gym.name}">
            <h4>${gym.name}</h4>
            <p><i class="fas fa-map-marker-alt"></i> ${gym.location}</p>
            <p><i class="fas fa-money-bill-wave"></i> ${gym.price.toLocaleString()} Kz/mês</p>
            <button>Ver Detalhes</button>
        `;
        gymContainer.appendChild(gymCard);
    });
}

// Filtro de ginásios
document.getElementById('location-filter').addEventListener('change', (e) => {
    const location = e.target.value;
    // Lógica de filtro (pode ser expandida)
    console.log(`Filtrar por: ${location}`);
});

// Carregar ginásios ao abrir a página
if (window.location.pathname.includes('gyms.html')) {
    loadGyms();
}