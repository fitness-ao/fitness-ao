document.addEventListener('DOMContentLoaded', function() {
    // Atualizar botões de autenticação
    updateAuthButtons();
    
    // Galeria de imagens
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remover classe active de todas as thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Adicionar classe active à thumbnail clicada
            this.classList.add('active');
            
            // Atualizar imagem principal
            mainImage.src = this.src;
        });
    });
    
    // LightGallery para ver todas as imagens
    const gallery = document.getElementById('gymGallery');
    if (gallery) {
        lightGallery(gallery, {
            selector: '.thumbnail',
            download: false,
            counter: false
        });
    }
    
    // Botão de favorito
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const isFavorite = this.classList.contains('active');
            
            if (isFavorite) {
                this.innerHTML = '<i class="fas fa-heart"></i> Favorito';
                // Aqui você pode adicionar lógica para salvar nos favoritos
            } else {
                this.innerHTML = '<i class="far fa-heart"></i> Favorito';
            }
        });
    }
    
    // Tabs de horários
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // Aqui você pode carregar os horários do dia selecionado
        });
    });
    
    // Avaliação por estrelas
    const stars = document.querySelectorAll('.rating-input .stars i');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            
            // Atualizar visualização das estrelas
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('active');
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
    
    // Carregar dados do ginásio
    loadGymData();
});

// Função para carregar dados do ginásio da API
async function loadGymData() {
    try {
        // Obter ID do ginásio da URL
        const urlParams = new URLSearchParams(window.location.search);
        const gymId = urlParams.get('id');
        
        if (!gymId) return;
        
        const response = await fetch(`http://localhost:3000/gyms/${gymId}`);
        const gym = await response.json();
        
        if (response.ok) {
            // Preencher os dados na página
            document.getElementById('gymName').textContent = gym.name;
            document.getElementById('gymDescription').textContent = gym.description;
            document.getElementById('gymAddress').textContent = gym.address;
            document.getElementById('gymHours').textContent = gym.openingHours;
            
            // Atualizar imagens (exemplo)
            const mainImage = document.getElementById('mainImage');
            if (mainImage && gym.images.length > 0) {
                mainImage.src = gym.images[0];
            }
            
            // Atualizar thumbnails
            const thumbnailContainer = document.querySelector('.thumbnail-container');
            if (thumbnailContainer && gym.images.length > 0) {
                thumbnailContainer.innerHTML = '';
                gym.images.forEach((img, index) => {
                    const thumb = document.createElement('img');
                    thumb.src = img;
                    thumb.alt = `Thumbnail ${index + 1}`;
                    thumb.className = 'thumbnail' + (index === 0 ? ' active' : '');
                    thumbnailContainer.appendChild(thumb);
                });
            }
        }
    } catch (error) {
        console.error('Erro ao carregar dados do ginásio:', error);
    }
}