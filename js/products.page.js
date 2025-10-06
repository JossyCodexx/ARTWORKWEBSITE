// // ✅ Hero Image Animation
// let heroIndex = 0;
// const heroImgs = document.querySelectorAll('.hero img');
// if (heroImgs.length > 0) {
//   setInterval(() => {
//     heroImgs[heroIndex].classList.remove('active');
//     heroIndex = (heroIndex + 1) % heroImgs.length;
//     heroImgs[heroIndex].classList.add('active');
//   }, 4000);
// }

// // ✅ Product Data
// const products = [
//   // Paintings, Sculptures, Digital
//   ...Array.from({ length: 40 }, (_, i) => ({
//     id: 'a' + (i + 1),
//     title: `Artwork ${i + 1}`,
//     category: i % 3 === 0 ? 'paintings' : i % 3 === 1 ? 'sculptures' : 'digital',
//     price: 100 + i * 10,
//     oldPrice: 150 + i * 10,
//     currency: '$',
//     vendor: 'ArtistryHub',
//     images: [`images/art${(i % 10) + 1}.jpg`]
//   })),

//   // Gallery
//   ...Array.from({ length: 20 }, (_, i) => ({
//     id: 'g' + (i + 1),
//     title: `Gallery ${i + 1}`,
//     category: 'gallery',
//     price: 200 + i * 5,
//     oldPrice: 250 + i * 5,
//     currency: '$',
//     vendor: 'ArtistryHub',
//     images: [`images/gallery${(i % 5) + 1}.jpg`]   // ✅ fixed path
//   })),

//   // Categories
//   ...Array.from({ length: 20 }, (_, i) => ({
//     id: 'c' + (i + 1),
//     title: `Collection ${i + 1}`,
//     category: 'categories',
//     price: 180 + i * 7,
//     oldPrice: 240 + i * 7,
//     currency: '$',
//     vendor: 'ArtistryHub',
//     images: [`images/categories${(i % 5) + 1}.jpg`]  // ✅ fixed path
//   })),

//   // Artists
//   ...Array.from({ length: 20 }, (_, i) => ({
//     id: 'ar' + (i + 1),
//     title: `By Artist ${i + 1}`,
//     category: 'artists',
//     price: 300 + i * 15,
//     oldPrice: 360 + i * 15,
//     currency: '$',
//     vendor: `Artist ${i + 1}`,
//     images: [`images/artist${(i % 5) + 1}.jpg`]  // ✅ fixed path
//   }))
// ];

// const productsEl = document.getElementById('products');
// const tabs = Array.from(document.querySelectorAll('.tab'));
// const searchInput = document.getElementById('search');
// const paginationEl = document.createElement('div');
// paginationEl.id = 'pagination';
// if (productsEl) productsEl.after(paginationEl);

// let currentCategory = 'all';
// let currentPage = 1;
// const perPage = 20;

// function formatPrice(p) {
//   return p?.toLocaleString();
// }

// function render(list) {
//   if (!productsEl) return;
//   productsEl.innerHTML = '';

//   if (list.length === 0) {
//     productsEl.innerHTML = '<div style="grid-column:1/-1;color:var(--muted)">No artworks found.</div>';
//     paginationEl.innerHTML = '';
//     return;
//   }

//   const start = (currentPage - 1) * perPage;
//   const end = start + perPage;
//   const paginated = list.slice(start, end);

//   paginated.forEach(p => {
//     const card = document.createElement('article');
//     card.className = 'card';
//     card.innerHTML = `
//       <img src="${p.images[0] || 'https://via.placeholder.com/600x400'}" alt="${p.title}">
//       <div class="title">${p.title}</div>
//       <div class="meta">${p.vendor}</div>
//       <div>
//         <span class="price">${p.currency}${formatPrice(p.price)}</span>
//         <span class="old">${p.currency}${formatPrice(p.oldPrice)}</span>
//       </div>
//       <div class="actions">
//         <button class="btn add">Add to cart</button>
//         <button class="btn view">View</button>
//       </div>`;
//     card.querySelector('.add').onclick = () => addToCart(p);
//     card.querySelector('.view').onclick = () => openModal(p);
//     productsEl.appendChild(card);
//   });

//   const totalPages = Math.ceil(list.length / perPage);
//   paginationEl.innerHTML = '';
//   for (let i = 1; i <= totalPages; i++) {
//     const btn = document.createElement('button');
//     btn.textContent = i;
//     btn.className = (i === currentPage ? 'active-page' : '');
//     btn.onclick = () => { currentPage = i; render(list); };
//     paginationEl.appendChild(btn);
//   }
// }

// function filterAndRender() {
//   const q = searchInput ? searchInput.value.toLowerCase() : '';
//   const filtered = products.filter(p =>
//     (currentCategory === 'all' || p.category === currentCategory) &&
//     (p.title.toLowerCase().includes(q) || p.vendor.toLowerCase().includes(q))
//   );
//   currentPage = 1;
//   render(filtered);
// }

// tabs.forEach(t => t.addEventListener('click', () => {
//   tabs.forEach(x => x.classList.remove('active'));
//   t.classList.add('active');
//   currentCategory = t.dataset.cat;
//   filterAndRender();
// }));
// if (searchInput) searchInput.addEventListener('input', filterAndRender);

// // ✅ Cart
// let cartItems = [];
// function addToCart(product) {
//   cartItems.push(product);
//   updateCartCount();
//   showCartMsg();
// }
// function updateCartCount() {
//   const el = document.getElementById('cart-count');
//   if (el) el.textContent = cartItems.length;
// }
// function showCartMsg() {
//   let msg = document.getElementById('cart-msg');
//   if (!msg) {
//     msg = document.createElement('div');
//     msg.id = 'cart-msg';
//     msg.className = 'cart-msg';
//     msg.textContent = 'Added to cart!';
//     document.body.appendChild(msg);
//   }
//   msg.style.display = 'block';
//   setTimeout(() => msg.style.display = 'none', 2000);
// }

// // ✅ Modal
// const modal = document.getElementById('modal');
// const mediaContainer = document.getElementById('media-container');
// const modalTitle = document.getElementById('modal-title');
// const modalPrice = document.getElementById('modal-price');
// const modalOld = document.getElementById('modal-old');
// const modalMeta = document.getElementById('modal-meta');
// const modalDesc = document.getElementById('modal-desc');
// const modalClose = document.getElementById('modal-close');
// const modalBuy = document.getElementById('modal-buy');
// const modalAdd = document.getElementById('modal-add');
// let currentProduct = null;
// let currentMediaIndex = 0, currentMedia = [];

// function openModal(p) {
//   if (!modal) return;
//   currentProduct = p;
//   modalTitle.textContent = p.title;
//   modalPrice.textContent = p.currency + formatPrice(p.price);
//   modalOld.textContent = p.currency + formatPrice(p.oldPrice);
//   modalMeta.textContent = `Category: ${p.category}`;
//   modalDesc.textContent = p.description || 'Beautiful artwork from ArtistryHub.';
//   currentMedia = [...(p.images || [])];
//   currentMediaIndex = 0;
//   renderMedia();
//   modal.style.display = 'flex';
// }
// function renderMedia() {
//   if (!mediaContainer) return;
//   mediaContainer.innerHTML = '';
//   currentMedia.forEach((src, i) => {
//     const img = document.createElement('img');
//     img.src = src;
//     img.className = i === currentMediaIndex ? 'active' : '';
//     mediaContainer.appendChild(img);
//   });
// }
// function prevMedia() {
//   currentMediaIndex = (currentMediaIndex - 1 + currentMedia.length) % currentMedia.length;
//   renderMedia();
// }
// function nextMedia() {
//   currentMediaIndex = (currentMediaIndex + 1) % currentMedia.length;
//   renderMedia();
// }
// window.prevMedia = prevMedia;
// window.nextMedia = nextMedia;
// if (modalClose) modalClose.onclick = () => modal.style.display = 'none';
// if (modal) modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
// if (modalAdd) modalAdd.onclick = () => { addToCart(currentProduct) };
// if (modalBuy) modalBuy.onclick = () => { window.location.href = `payment.html?id=${currentProduct.id}` };

// // ✅ Initial Render
// filterAndRender();
































// ✅ Hero Image Animation
let heroIndex = 0;
const heroImgs = document.querySelectorAll('.hero img');
if (heroImgs.length > 0) {
  setInterval(() => {
    heroImgs[heroIndex].classList.remove('active');
    heroIndex = (heroIndex + 1) % heroImgs.length;
    heroImgs[heroIndex].classList.add('active');
  }, 4000);
}

// ✅ Product Data
const products = [
  // Index Page Products (22 photos)
  ...Array.from({ length: 22 }, (_, i) => ({
    id: 'p' + (i + 1),
    title: `Product ${i + 1}`,
    category: i % 3 === 0 ? 'paintings' : i % 3 === 1 ? 'sculptures' : 'digital',
    price: 100 + i * 10,
    oldPrice: 150 + i * 10,
    currency: '$',
    vendor: 'ArtistryHub',
    images: [`images/photos${i + 1}.jpg`]   // ✅ matches index.html images
  })),

  // Gallery Products (20 artworks)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: 'g' + (i + 1),
    title: `Gallery ${i + 1}`,
    category: 'gallery',
    price: 200 + i * 5,
    oldPrice: 250 + i * 5,
    currency: '$',
    vendor: 'ArtistryHub',
    images: [`images/art-thumbnail${i + 1}.jpg`]   // ✅ matches gallery.html images
  }))
];

const productsEl = document.getElementById('products');
const tabs = Array.from(document.querySelectorAll('.tab'));
const searchInput = document.getElementById('search');
const paginationEl = document.createElement('div');
paginationEl.id = 'pagination';
if (productsEl) productsEl.after(paginationEl);

let currentCategory = 'all';
let currentPage = 1;
const perPage = 20;

function formatPrice(p) {
  return p?.toLocaleString();
}

function render(list) {
  if (!productsEl) return;
  productsEl.innerHTML = '';

  if (list.length === 0) {
    productsEl.innerHTML = '<div style="grid-column:1/-1;color:var(--muted)">No artworks found.</div>';
    paginationEl.innerHTML = '';
    return;
  }

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginated = list.slice(start, end);

  paginated.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.images[0] || 'https://via.placeholder.com/600x400'}" alt="${p.title}">
      <div class="title">${p.title}</div>
      <div class="meta">${p.vendor}</div>
      <div>
        <span class="price">${p.currency}${formatPrice(p.price)}</span>
        <span class="old">${p.currency}${formatPrice(p.oldPrice)}</span>
      </div>
      <div class="actions">
        <button class="btn add">Add to cart</button>
        <button class="btn view">View</button>
      </div>`;
    card.querySelector('.add').onclick = () => addToCart(p);
    card.querySelector('.view').onclick = () => openModal(p);
    productsEl.appendChild(card);
  });

  const totalPages = Math.ceil(list.length / perPage);
  paginationEl.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = (i === currentPage ? 'active-page' : '');
    btn.onclick = () => { currentPage = i; render(list); };
    paginationEl.appendChild(btn);
  }
}

function filterAndRender() {
  const q = searchInput ? searchInput.value.toLowerCase() : '';
  const filtered = products.filter(p =>
    (currentCategory === 'all' || p.category === currentCategory) &&
    (p.title.toLowerCase().includes(q) || p.vendor.toLowerCase().includes(q))
  );
  currentPage = 1;
  render(filtered);
}

tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => x.classList.remove('active'));
  t.classList.add('active');
  currentCategory = t.dataset.cat;
  filterAndRender();
}));
if (searchInput) searchInput.addEventListener('input', filterAndRender);

// ✅ Cart
let cartItems = [];
function addToCart(product) {
  cartItems.push(product);
  updateCartCount();
  showCartMsg();
}
function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = cartItems.length;
}
function showCartMsg() {
  let msg = document.getElementById('cart-msg');
  if (!msg) {
    msg = document.createElement('div');
    msg.id = 'cart-msg';
    msg.className = 'cart-msg';
    msg.textContent = 'Added to cart!';
    document.body.appendChild(msg);
  }
  msg.style.display = 'block';
  setTimeout(() => msg.style.display = 'none', 2000);
}

// ✅ Modal
const modal = document.getElementById('modal');
const mediaContainer = document.getElementById('media-container');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalOld = document.getElementById('modal-old');
const modalMeta = document.getElementById('modal-meta');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.getElementById('modal-close');
const modalBuy = document.getElementById('modal-buy');
const modalAdd = document.getElementById('modal-add');
let currentProduct = null;
let currentMediaIndex = 0, currentMedia = [];

function openModal(p) {
  if (!modal) return;
  currentProduct = p;
  modalTitle.textContent = p.title;
  modalPrice.textContent = p.currency + formatPrice(p.price);
  modalOld.textContent = p.currency + formatPrice(p.oldPrice);
  modalMeta.textContent = `Category: ${p.category}`;
  modalDesc.textContent = p.description || 'Beautiful artwork from ArtistryHub.';
  currentMedia = [...(p.images || [])];
  currentMediaIndex = 0;
  renderMedia();
  modal.style.display = 'flex';
}
function renderMedia() {
  if (!mediaContainer) return;
  mediaContainer.innerHTML = '';
  currentMedia.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = i === currentMediaIndex ? 'active' : '';
    mediaContainer.appendChild(img);
  });
}
function prevMedia() {
  currentMediaIndex = (currentMediaIndex - 1 + currentMedia.length) % currentMedia.length;
  renderMedia();
}
function nextMedia() {
  currentMediaIndex = (currentMediaIndex + 1) % currentMedia.length;
  renderMedia();
}
window.prevMedia = prevMedia;
window.nextMedia = nextMedia;
if (modalClose) modalClose.onclick = () => modal.style.display = 'none';
if (modal) modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
if (modalAdd) modalAdd.onclick = () => { addToCart(currentProduct) };
if (modalBuy) modalBuy.onclick = () => { window.location.href = `payment.html?id=${currentProduct.id}` };

// ✅ Initial Render
filterAndRender();
