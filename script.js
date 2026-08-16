// Faz a seção "Sobre" aparecer com animação quando o usuário rola a página até ela
const secaoSobre = document.querySelector('.sobre');

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
    }
  });
}, { threshold: 0.2 });

observador.observe(secaoSobre);
