async function buscarRepos() {
    try {
      const response = await fetch('https://api.github.com/users/GiulianoCriscuoli/repos');
      const repos = await response.json();

      const principais = repos
        .sort((a, b) => a.stargazers_count - b.stargazers_count)
        .slice(0, 5); 

      const lista = document.getElementById('repos');

      principais.forEach(repo => {
        const item = document.createElement('li');
        item.innerHTML = `
          <h3 class="projeto-titulo">${repo.name}</h3>
          <div class="descricao">
            <p>${repo.description || 'Nenhuma descrição disponível.'}</p>
            <a href="${repo.html_url}" target="_blank">Acessar o projeto</a>
          </div>
        `;
        lista.appendChild(item);
      });

    } catch (error) {
      console.error('Erro ao buscar repositórios:', error);
    }
  }

async function buscarPerfil() {
try {
    const response = await fetch('https://api.github.com/users/GiulianoCriscuoli');
    const perfil = await response.json();

    document.getElementById('bio').innerText = perfil.bio || 'Sem bio definida.';

} catch (error) {
    console.error('Erro ao buscar perfil:', error);
}
}

buscarPerfil();
buscarRepos();
