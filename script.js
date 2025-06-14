const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(el => observer.observe(el));


const modal = document.getElementById('product-modal');
const modalImg = modal.querySelector('.modal-img');
const modalTitle = modal.querySelector('.modal-title');
const modalDesc = modal.querySelector('.modal-desc');
const modalClose = modal.querySelector('.modal-close');

async function fetchDescriptionById(id) {
  const res = await fetch('descriptions.txt');
  const text = await res.text();
  
  const regex = new RegExp(`\\[${id}\\]\\s*([\\s\\S]*?)(?:\\n---|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : 'Descrição não encontrada.';
}

document.querySelectorAll('.products-list .product').forEach(product => {
  product.addEventListener('click', async () => {
    modalImg.src = product.getAttribute('data-img');
    modalImg.alt = product.getAttribute('data-title');
    modalTitle.textContent = product.getAttribute('data-title');
    modalDesc.textContent = 'Carregando...';
    modal.classList.add('open');
    const id = product.getAttribute('data-id');
    const desc = await fetchDescriptionById(id);
    modalDesc.textContent = desc;
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('open');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('open');
  }
});


const scrollIndicator = document.getElementById('scroll-indicator');
const productsSection = document.querySelector('.products');
if (scrollIndicator && productsSection) {
  scrollIndicator.addEventListener('click', () => {
    productsSection.scrollIntoView({ behavior: 'smooth' });
  });
}
