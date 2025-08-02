document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // Salva o token JWT
                    localStorage.setItem('fitness_ao_token', data.access_token);
                    localStorage.setItem('fitness_ao_user', JSON.stringify(data.user));
                    
                    // Redireciona para a página inicial
                    window.location.href = '../index.html';
                } else {
                    throw new Error(data.message || 'Erro ao fazer login');
                }
            } catch (error) {
                alert(error.message);
                console.error('Login error:', error);
            }
        });
    }
    
    // Atualiza os botões de auth baseado no estado de login
    updateAuthButtons();
});

function updateAuthButtons() {
    const authButtons = document.querySelector('.auth-buttons');
    const token = localStorage.getItem('fitness_ao_token');
    
    if (authButtons) {
        if (token) {
            authButtons.innerHTML = `
                <a href="#" class="user-profile">
                    <i class="fas fa-user-circle"></i>
                    ${JSON.parse(localStorage.getItem('fitness_ao_user')).name}
                </a>
                <a href="#" class="logout-btn" id="logoutBtn">
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            `;
            
            document.getElementById('logoutBtn').addEventListener('click', logout);
        } else {
            authButtons.innerHTML = `
                <a href="auth/login.html" class="login-btn">
                    <i class="fas fa-user"></i> Login
                </a>
                <a href="auth/register-user.html" class="register-btn">
                    Criar Conta
                </a>
            `;
        }
    }
}

function logout() {
    localStorage.removeItem('fitness_ao_token');
    localStorage.removeItem('fitness_ao_user');
    updateAuthButtons();
    window.location.href = 'index.html';
}

// Adicione ao evento DOMContentLoaded
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validação básica
        if (document.getElementById('password').value !== 
            document.getElementById('confirmPassword').value) {
            alert('As senhas não coincidem!');
            return;
        }
        
        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            userType: document.getElementById('userType').value
        };
        
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Conta criada com sucesso! Faça login para continuar.');
                window.location.href = 'login.html';
            } else {
                throw new Error(data.message || 'Erro ao registrar');
            }
        } catch (error) {
            alert(error.message);
            console.error('Registration error:', error);
        }
    });
}