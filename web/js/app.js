const BASE_URL = 'http://localhost:3000';

const arrUrl = location.pathname.split('/');

const setLoading = (display) => document.querySelector('.loader').style.display = display;

const getDados = () => {
    setLoading('flex');
    let url = arrUrl[arrUrl.length - 1].replace('.html', '');
    let newScreen = document.querySelector('.list-cards');
    let texto = '';

    fetch(`${BASE_URL}/characters/${url}`)
        .then((res) => res.json(), () => {
            setLoading('none');
            texto += `
                <article class="card-area">
                    <div class="card-content">
                        <span class="card-text-placeholder">
                            Ops.. ocorreu um erro ao carregar os dados<br />
                        </span>
                    </div>
                </article>
                `;
            newScreen.innerHTML = texto;
            return false;
        })
        .then((res) => {
            if (res) {
                setLoading('none');
                res.forEach((item) => {
                    if (item.vivo) {
                        texto += `
                        <article class="card-area">
                            <div class="card-content">
                                <span class="card-text-placeholder">Nome: ${item.nome}</span>
                                <span class="card-text-placeholder">Gênero: ${item.genero}</span>
                                <span class="card-text-placeholder">Espécie: ${item.especie}</span>
                                <span class="card-text-placeholder">Profissão: ${item.profissao}</span>
                                <span class="card-text-placeholder">
                                    Este personagem apareceu ${item.qtdAparicoes} vezes ao
                                    longo do seriado
                                </span>
                            </div>
                        </article>
                        `;
                    }
                })
                newScreen.innerHTML = texto;
            }
        })

    // for (let i = 0; i < dados.articles.length; i++) {
    //     let noticia = dados.articles[i];

    //     let data = new Date(noticia.publishedAt);

    //     texto += `
    //     <article class="boxNoticias">
    //     <img src="${noticia.urlToImage}" alt="Imagem da notícia">
    //     <span class="titulo">${noticia.title}</span><br>
    //     <span class="creditos">${data.toLocaleDateString()} - ${noticia.source.name} - ${noticia.author}</span><br>
    //     <span class="text">${noticia.content}
    //     <a href="${noticia.url}" target="_blank">Leia mais ...</a>
    //     </span>
    //     <p>===============================</p>
    //     </article>
    //     `;
    // };
    // Preencher a div com o texto HTML
    // let loading = document.querySelector('.loader')
    // loading.style.display = 'none'
}

getDados();

// function pesquisar(evento) {
//     evento.preventDefault();
//     let query = document.getElementById('campoDePesquisa').value;

//     let newTela = document.getElementById('tela');

//     if (!query) {
//         newTela.innerHTML = '<h3>Por favor, insira alguma categoria de notícia</h3>';
//         return;
//     }

//     newTela.innerHTML = '';

//     let loading = document.querySelector('.loader');
//     loading.style.display = 'flex';

//     let xhr = new XMLHttpRequest();
//     xhr.onload = exibirNoticias;
//     xhr.open('GET', `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
//     xhr.send();
// }

// document.getElementById('btn').addEventListener('click', pesquisar);
