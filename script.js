// =========================================================
// FADE-IN AO ROLAR
// Cada seção principal aparece suavemente quando entra na
// tela. Leve, porque usa apenas opacity/transform (não pesa
// no processamento do celular) e roda uma vez por elemento.
// =========================================================
const elementosParaAnimar = document.querySelectorAll(
  '.transformacao, .beneficios, .sistema, .autoridade, .comprar, .faq'
);

elementosParaAnimar.forEach((el) => el.classList.add('aparecer'));

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target); // anima só uma vez
    }
  });
}, { threshold: 0.15 });

elementosParaAnimar.forEach((el) => observador.observe(el));

// =========================================================
// FAQ (accordion)
// =========================================================
const perguntasFaq = document.querySelectorAll('.faq-pergunta');

perguntasFaq.forEach((botao) => {
  botao.addEventListener('click', () => {
    const item = botao.closest('.faq-item');
    const jaEstavaAberto = item.classList.contains('aberto');

    // fecha todos antes de abrir o clicado, pra manter só
    // uma resposta visível por vez
    document.querySelectorAll('.faq-item.aberto').forEach((aberto) => {
      aberto.classList.remove('aberto');
    });

    if (!jaEstavaAberto) {
      item.classList.add('aberto');
    }
  });
});