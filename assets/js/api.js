async function buscarRepos() {
    try {
      const response = await fetch('https://api.github.com/users/GiulianoCriscuoli/repos');
      const repos = await response.json();

      const principais = repos
        .sort((a, b) => a.stargazers_count - b.stargazers_count)
        .slice(0, 7); 

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
        document.querySelector('.foto').src = dados.foto;
        document.getElementById('cargo').innerText = dados.cargo;
        document.getElementById('email_url').innerText = dados.email;
        document.getElementById('telefone').innerText = dados.telefone;
        document.getElementById('email_url').href = dados.email_url;
        document.getElementById('telefone').href = dados.cel_url;

        redesItens = document.querySelectorAll('.redes-item');
        
        dados.redes.forEach((rede, i) => {
            redesItens[i].href = rede.url;
            redesItens[i].target = '_blank';
            redesItens[i].innerHTML = rede.nome;
        });

        dados.idiomas.forEach(idioma => {
            const item = document.createElement('li');
                            item.innerHTML = `
                                <h3 class="accordion-titulo">${idioma.nome}</h3>
                                <p>${idioma.nivel}</p>
                            `;
                            document.getElementById('idiomas').appendChild(item);
        });
          
        const spans = document.querySelectorAll('.experiencia-area span');
        const descricoes = document.querySelectorAll('.experiencia-area .descricao');

        dados.experiencias.forEach((experiencia, i) => {
            if (spans[i]) {
                spans[i].innerHTML = experiencia.periodo;
            }
            if (descricoes[i]) {
                descricoes[i].innerHTML = experiencia.descricao;
            }
        });

        const certificadosArea = document.querySelector('.certificado-area');   

        dados.certificados.forEach((certificado, i) => {
            const item = document.createElement('li');
            item.innerHTML = `
                <img class="certificado" src="${certificado.imagem}" alt="certificado">
            `;
            certificadosArea.appendChild(item);
        });

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

buscarDados();
buscarPerfil();
buscarRepos();
