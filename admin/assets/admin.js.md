// admin.js

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. AUTENTICAÇÃO ADMIN
    // ======================
    checkAdminAuth();

    // ======================
    // 2. CARREGAR DADOS INICIAIS
    // ======================
    loadDashboardData();
    loadRecentActivity();

    // ======================
    // 3. EVENT LISTENERS
    // ======================
    setupEventListeners();
});

// =============================================
// FUNÇÕES PRINCIPAIS
// =============================================

/**
 * Verifica se o usuário está autenticado como admin
 */
async function checkAdminAuth() {
    const token = localStorage.getItem('admin_token');
    if (!token) {
        window.location.href = '/admin/login.html';
        return;
    }

    try {
        const response = await fetch('https://api.fitness.ao/admin/verify', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Acesso negado');
    } catch (error) {
        logoutAdmin();
    }
}

/**
 * Carrega os dados principais do dashboard
 */
async function loadDashboardData() {
    try {
        // Dados das academias
        const gymsResponse = await fetch('https://api.fitness.ao/admin/gyms');
        const gymsData = await gymsResponse.json();
        document.querySelector('.metric-card:nth-child(1) .value').textContent = gymsData.total;

        // Dados dos usuários
        const usersResponse = await fetch('https://api.fitness.ao/admin/users');
        const usersData = await usersResponse.json();
        document.querySelector('.metric-card:nth-child(2) .value').textContent = usersData.total.toLocaleString();

        // Dados financeiros
        const financeResponse = await fetch('https://api.fitness.ao/admin/finance');
        const financeData = await financeResponse.json();
        document.querySelector('.metric-card:nth-child(3) .value').textContent = `${(financeData.revenue / 1000000).toFixed(1)}M Kz`;

        // Inicializa gráficos
        initCharts(gymsData, financeData);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showAlert('error', 'Falha ao carregar dados do dashboard');
    }
}

/**
 * Carrega a lista de atividades recentes
 */
async function loadRecentActivity() {
    try {
        const response = await fetch('https://api.fitness.ao/admin/activity');
        const activities = await response.json();
        
        const activityList = document.querySelector('.activity-list');
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas ${getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-details">
                    <p>${activity.description}</p>
                    <small>${new Date(activity.timestamp).toLocaleString()}</small>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar atividades:', error);
    }
}

// =============================================
// FUNÇÕES AUXILIARES
// =============================================

/**
 * Configura listeners de eventos
 */
function setupEventListeners() {
    // Logout
    document.querySelector('.user-area').addEventListener('click', function() {
        document.querySelector('.user-dropdown')?.classList.toggle('show');
    });

    document.getElementById('logoutBtn')?.addEventListener('click', logoutAdmin);

    // Pesquisa
    document.querySelector('.search-bar button').addEventListener('click', searchData);
}

/**
 * Inicializa gráficos com Chart.js
 */
function initCharts(gymsData, financeData) {
    // Gráfico 1: Academias por bairro
    const ctx1 = document.getElementById('gymsByLocationChart');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: gymsData.locations.map(loc => loc.name),
            datasets: [{
                label: 'Academias',
                data: gymsData.locations.map(loc => loc.count),
                backgroundColor: '#FF6B00'
            }]
        }
    });

    // Gráfico 2: Receita mensal
    const ctx2 = document.getElementById('revenueChart');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: financeData.months,
            datasets: [{
                label: 'Receita (Kz)',
                data: financeData.revenues,
                borderColor: '#FF6B00',
                fill: false
            }]
        }
    });
}

/**
 * Faz logout do admin
 */
function logoutAdmin() {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login.html';
}

/**
 * Mostra alertas estilizados
 */
function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `admin-alert ${type}`;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => alertDiv.remove(), 5000);
}

// =============================================
// UTILITÁRIOS
// =============================================

function getActivityIcon(type) {
    const icons = {
        'new_gym': 'fa-dumbbell',
        'payment': 'fa-wallet',
        'user': 'fa-user-plus',
        'warning': 'fa-exclamation-triangle'
    };
    return icons[type] || 'fa-bell';
}