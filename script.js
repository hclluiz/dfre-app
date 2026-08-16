// Faz cada seção aparecer com animação quando o usuário rola a página até ela
const secoesAnimadas = document.querySelectorAll('.sobre, .produtos, .contato');

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
    }
  });
}, { threshold: 0.15 });

secoesAnimadas.forEach((secao) => observador.observe(secao));

// Envio do formulário de contato (por enquanto só um retorno visual,
// depois conectamos com um serviço de e-mail ou backend de verdade)
const formulario = document.querySelector('.contato-form');

if (formulario) {
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    alert('Mensagem recebida! Em breve entraremos em contato.');
    formulario.reset();
  });
}