document.addEventListener('DOMContentLoaded', function() {
    // Alternar entre seções de configurações
    const settingsCategories = document.querySelectorAll('.settings-category');
    
    settingsCategories.forEach(category => {
        category.addEventListener('click', function() {
            // Remover classe active de todos
            settingsCategories.forEach(c => c.classList.remove('active'));
            
            // Adicionar ao item clicado
            this.classList.add('active');
            
            // Esconder todas as seções
            document.querySelectorAll('.settings-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Mostrar seção correspondente
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // Validação do formulário
    const settingsForm = document.querySelector('.settings-section.active form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Adicionar lógica de salvamento aqui
            alert('Configurações salvas com sucesso!');
        });
    }

    // Carregar configurações do servidor
    loadSettings();
});

async function loadSettings() {
    try {
        const response = await fetch('/admin/api/settings');
        const settings = await response.json();
        
        // Preencher formulários com os dados
        document.getElementById('platformName').value = settings.platformName || '';
        document.getElementById('adminEmail').value = settings.adminEmail || '';
        // ... preencher outros campos
        
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        showAlert('error', 'Falha ao carregar configurações');
    }
}

function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `admin-alert ${type}`;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => alertDiv.remove(), 5000);
}