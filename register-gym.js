document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('gymRegistrationForm');
    const locationSelect = document.getElementById('gymLocation');
    const customLocation = document.getElementById('customLocation');
    const uploadTrigger = document.getElementById('uploadTrigger');
    const fileUpload = document.getElementById('fileUpload');

    // Mostrar campo de localização personalizada quando selecionar "Outro"
    locationSelect.addEventListener('change', function() {
        customLocation.style.display = this.value === 'outro' ? 'block' : 'none';
        if (this.value !== 'outro') customLocation.value = '';
    });

    // Trigger para upload de arquivo
    uploadTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        fileUpload.click();
    });

    // Visualização da imagem selecionada
    fileUpload.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            // Aqui você pode implementar o upload para um servidor
            // e obter a URL da imagem para colocar no campo gymImage
            alert('Funcionalidade de upload será implementada na versão final');
        }
    });

    // Envio do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const gymData = {
            name: document.getElementById('gymName').value,
            location: locationSelect.value === 'outro' 
                     ? customLocation.value 
                     : locationSelect.value,
            price: parseInt(document.getElementById('gymPrice').value),
            imageUrl: document.getElementById('gymImage').value,
            description: document.getElementById('gymDescription').value
        };

        try {
            const response = await fetch('http://localhost:3000/gyms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gymData)
            });

            if (response.ok) {
                alert('Ginásio registado com sucesso!');
                window.location.href = 'gyms.html';
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Erro ao registar');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert(`Erro: ${error.message}`);
        }
    });
});