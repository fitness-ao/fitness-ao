// script.js (alternativo)
async function loadGyms() {
  // Dados de exemplo (remova quando a API estiver funcionando)
  const mockGyms = [
    { name: "Academia Bodytech", location: "Talatona", price: 15000 },
    { name: "Iron Nation", location: "Morro Bento", price: 20000 }
  ];

  const gymContainer = document.getElementById('gym-container');
  gymContainer.innerHTML = mockGyms.map(gym => `
    <div class="gym-card">
      <h4>${gym.name}</h4>
      <p>Local: ${gym.location}</p>
      <p>Preço: ${gym.price} Kz/mês</p>
    </div>
  `).join('');
}