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
}

getDados();
