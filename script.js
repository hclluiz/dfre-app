// =========================================================
// NAVEGAÇÃO 3D POR SCROLL
// A ideia: cada painel (.panel) tem uma posição "de chegada"
// baseada no tanto que o usuário já rolou a página.
// Rolando pra baixo, o painel atual se aproxima (fica grande
// e nítido), depois continua crescendo e sumindo pra frente
// da tela — como se você tivesse voado através dele — enquanto
// o próximo painel já vem se aproximando atrás.
// =========================================================

const painéis = document.querySelectorAll('.panel');
const totalPaineis = painéis.length;

function atualizarPaineis() {
  const scrollY = window.scrollY;
  const alturaTela = window.innerHeight;

  painéis.forEach((painel, indice) => {
    // "progresso" representa quão perto estamos deste painel:
    // negativo = ainda não chegou perto
    // 0 = exatamente centralizado na tela
    // positivo = já passou e está indo embora
    const progresso = (scrollY / alturaTela) - indice;

    let escala;
    let profundidadeZ;
    let opacidade;

    if (progresso <= -1) {
      // painel ainda muito distante, nem começou a aparecer
      escala = 0.2;
      profundidadeZ = -3000;
      opacidade = 0;

    } else if (progresso <= 0) {
      // fase de aproximação: de -1 até 0
      const t = progresso + 1; // vai de 0 até 1
      escala = 0.2 + t * 0.8;           // cresce de 0.2 até 1
      profundidadeZ = -3000 + t * 3000; // de -3000px até 0px
      opacidade = t;

    } else if (progresso <= 1) {
      // fase de afastamento: o painel continua crescendo e
      // "passa voando" por cima da câmera, sumindo
      const t = progresso; // vai de 0 até 1
      escala = 1 + t * 2.2;        // cresce de 1 até 3.2
      profundidadeZ = t * 1600;    // de 0px até 1600px (pra frente)
      opacidade = 1 - t;

    } else {
      // painel já passou faz tempo
      escala = 3.2;
      profundidadeZ = 1600;
      opacidade = 0;
    }

    painel.style.transform =
      `translate(-50%, -50%) translateZ(${profundidadeZ}px) scale(${escala})`;
    painel.style.opacity = opacidade;

    // painéis quase invisíveis não devem capturar cliques
    painel.style.pointerEvents = opacidade > 0.15 ? 'auto' : 'none';

    // marca o painel de produtos como "ativo" quando estiver
    // bem próximo do centro, pra disparar a animação em cascata
    // dos cards (ver style.css)
    if (painel.classList.contains('panel-produtos')) {
      if (progresso > -0.35 && progresso < 0.35) {
        painel.classList.add('ativo');
      } else {
        painel.classList.remove('ativo');
      }
    }
  });
}

// usamos requestAnimationFrame pra deixar a animação suave,
// evitando recalcular a cada pixel rolado
let animando = false;
window.addEventListener('scroll', () => {
  if (!animando) {
    animando = true;
    requestAnimationFrame(() => {
      atualizarPaineis();
      animando = false;
    });
  }
});

// calcula a posição inicial assim que a página carrega
atualizarPaineis();

// =========================================================
// NAVEGAÇÃO PELO MENU
// Como os painéis não seguem o fluxo normal da página, um
// link comum tipo href="#sobre" não funcionaria. Em vez disso,
// cada link tem um data-index e a gente rola a página até a
// posição de scroll correspondente àquele painel.
// =========================================================
const linksDeNavegacao = document.querySelectorAll('[data-index]');

linksDeNavegacao.forEach((link) => {
  link.addEventListener('click', (evento) => {
    evento.preventDefault();
    const indice = Number(link.dataset.index);
    const alturaTela = window.innerHeight;
    window.scrollTo({
      top: indice * alturaTela,
      behavior: 'smooth'
    });
  });
});

// =========================================================
// GALÁXIA DO APP
// Ao clicar em um elemento flutuante, ele fica em destaque,
// os outros escurecem, e o cartão de informação aparece com
// o título/descrição daquele elemento específico.
// =========================================================
const elementosGalaxia = document.querySelector('.galaxia-elementos');
const nosGalaxia = document.querySelectorAll('.galaxia-no');
const infoGalaxia = document.querySelector('.galaxia-info');
const infoTitulo = document.querySelector('.galaxia-info-titulo');
const infoDesc = document.querySelector('.galaxia-info-desc');
const botaoFecharGalaxia = document.querySelector('.galaxia-fechar');
const containerEstrelas = document.querySelector('.galaxia-estrelas');

// gera um punhado de estrelinhas em posições aleatórias,
// cada uma piscando em um tempo levemente diferente
function gerarEstrelas(quantidade) {
  if (!containerEstrelas) return;

  for (let i = 0; i < quantidade; i++) {
    const estrela = document.createElement('div');
    estrela.className = 'estrela';
    estrela.style.top = `${Math.random() * 100}%`;
    estrela.style.left = `${Math.random() * 100}%`;
    estrela.style.animationDelay = `${Math.random() * 3}s`;
    estrela.style.opacity = (0.3 + Math.random() * 0.5).toFixed(2);
    containerEstrelas.appendChild(estrela);
  }
}

gerarEstrelas(40);

function abrirNoGalaxia(no) {
  nosGalaxia.forEach((item) => item.classList.remove('selecionado'));
  no.classList.add('selecionado');
  elementosGalaxia.classList.add('tem-selecionado');

  infoTitulo.textContent = no.dataset.titulo;
  infoDesc.textContent = no.dataset.desc;
  infoGalaxia.classList.add('visivel');
}

function fecharGalaxia() {
  nosGalaxia.forEach((item) => item.classList.remove('selecionado'));
  elementosGalaxia.classList.remove('tem-selecionado');
  infoGalaxia.classList.remove('visivel');
}

nosGalaxia.forEach((no) => {
  no.addEventListener('click', () => abrirNoGalaxia(no));
});

if (botaoFecharGalaxia) {
  botaoFecharGalaxia.addEventListener('click', fecharGalaxia);
}

// =========================================================
// FORMULÁRIO DE CONTATO
// =========================================================
const formulario = document.querySelector('.contato-form');

if (formulario) {
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    alert('Mensagem recebida! Em breve entraremos em contato.');
    formulario.reset();
  });
}