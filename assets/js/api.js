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

async function buscarDados() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GiulianoCriscuoli/portfolio/refs/heads/master/dados/dados.json');
        const dados = await response.json();

        document.getElementById('nome').innerText = dados.nome;
        document.getElementById('cargo').innerText = dados.cargo;
        document.getElementById('email').innerText = dados.email;
        document.getElementById('telefone').innerText = dados.telefone;

        
        dados.redes.forEach(rede => {
            const item = document.createElement('li');
            item.innerHTML = `
                    <a href="${rede.url}" target="_blank">${rede.nome}</a>
                `;
            document.getElementById('redes').appendChild(item);
        });

        dados.idiomas.forEach(idioma => {
            const item = document.createElement('li');
                            item.innerHTML = `
                                <h3 class="accordion-titulo">${idioma.nome}</h3>
                                <p>${idioma.nivel}</p>
                            `;
                            document.getElementById('idiomas').appendChild(item);
        });
   
        
        console.log(dados.redes);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

buscarDados();
buscarPerfil();
buscarRepos();
