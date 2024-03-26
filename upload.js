document.getElementById('upload-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    const status = document.getElementById('status');

    const file = fileInput.files[0];
    if (!file) {
        status.textContent = 'Selecione um arquivo para enviar.';
        return;
    }

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
            status.textContent = 'Arquivo enviado com sucesso.';
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            status.textContent = 'Erro ao fazer upload do arquivo. Por favor, tente novamente.';
        }
    };
    reader.readAsBinaryString(file);
});
