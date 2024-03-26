document.getElementById('upload-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = async function () {
        const result = reader.result;
        const url = 'https://api.github.com/repos/0tns/0/contents/' + file.name;
        const content = btoa(result);
        const body = JSON.stringify({
            message: 'Upload de arquivo',
            content: content
        });
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Authorization: 'token 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', // Substitua pelo seu token de acesso
                    'Content-Type': 'application/json'
                },
                body: body
            });
            const data = await response.json();
            const fileUrl = data.content.download_url;
            const link = document.createElement('a');
            link.href = fileUrl;
            link.textContent = file.name;
            link.setAttribute('target', '_blank');
            fileList.appendChild(link);
            fileList.appendChild(document.createElement('br'));
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            alert('Erro ao fazer upload do arquivo. Por favor, tente novamente.');
        }
    };
    reader.readAsBinaryString(file);
});
