const dots = document.querySelectorAll('.dot');
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null, // Usa a viewport como root
    rootMargin: '-30% 0px', // Ativa a bolinha quando a seção estiver 30% visível
    threshold: 0.5 // Ativa a bolinha quando 50% da seção estiver visível
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetId = entry.target.id;
            dots.forEach(dot => dot.classList.toggle('active', dot.dataset.target === targetId));
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const targetId = dot.dataset.target;
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Efeito de fade no scroll da seção #quem-somos
const quemSomos = document.getElementById('quem-somos');
const fadeStart = quemSomos.offsetTop + quemSomos.offsetHeight * 0.2;
const fadeEnd = quemSomos.offsetTop + quemSomos.offsetHeight * 0.8;

window.addEventListener('scroll', () => {
  if (quemSomos) {
    const scrollPosition = window.scrollY;
    if (scrollPosition >= fadeStart && scrollPosition <= fadeEnd) {
      const opacity = 1 - ((scrollPosition - fadeStart) / (fadeEnd - fadeStart));
      quemSomos.style.opacity = opacity;
    } else if (scrollPosition < fadeStart) {
      quemSomos.style.opacity = 1;
    } else {
      quemSomos.style.opacity = 0;
    }
  }
});

const calendario = document.getElementById('calendario');
const tbody = calendario.querySelector('tbody');

// Função para gerar os horários
function gerarHorarios(inicio, fim) {
  const horarios = [];
  const [horaInicio, minutoInicio] = inicio.split(':').map(Number);
  const [horaFim, minutoFim] = fim.split(':').map(Number);

  let horaAtual = horaInicio;
  let minutoAtual = minutoInicio;

  while (horaAtual < horaFim || (horaAtual === horaFim && minutoAtual <= minutoFim)) {
    const horarioFormatado = `${horaAtual.toString().padStart(2, '0')}:${minutoAtual.toString().padStart(2, '0')}`;
    horarios.push(horarioFormatado);

    minutoAtual += 30;
    if (minutoAtual >= 60) {
      minutoAtual = 0;
      horaAtual++;
    }
  }

  return horarios;
}

const horarios = gerarHorarios('09:00', '17:30');

// Cria as linhas da tabela com os horários
horarios.forEach((horario, index) => {
  const row = tbody.insertRow();
  const horarioCell = row.insertCell();
  horarioCell.classList.add('horario');
  horarioCell.textContent = horario;

  // Adiciona os slots para os dias da semana (segunda a sábado)
  for (let i = 0; i < 6; i++) {
    const slotCell = row.insertCell();
    slotCell.classList.add('slot');
    slotCell.textContent = 'Livre';

    slotCell.addEventListener('click', () => {
      slotCell.classList.toggle('reserved');
      slotCell.textContent = slotCell.classList.contains('reserved') ? 'Reservado' : 'Livre';
    });
  }
});
