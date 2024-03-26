document.getElementById('file-input').addEventListener('change', function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        const result = reader.result;
        fetch('https://api.github.com/repos/seu-usuario/upload-arquivos/contents/' + file.name, {
            method: 'PUT',
            headers: {
                Authorization: 'token SEU_TOKEN_DE_ACESSO', // Substitua pelo seu token de acesso
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Upload de arquivo',
                content: btoa(result)
            })
        })
        .then(response => response.json())
        .then(data => console.log('Arquivo enviado:', data))
        .catch(error => console.error('Erro ao enviar arquivo:', error));
    };
    reader.readAsBinaryString(file);
});
