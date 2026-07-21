const STORAGE_KEY = 'revise-cards-v1';

const DEFAULT_CARDS = [
    {
        id: 'sample-1',
        question: "Bienvenue 👋 Comment ça marche ?",
        answer: "Fais glisser vers le haut pour passer à la fiche suivante. Tape sur une carte pour retourner et voir la réponse.",
        category: "Guide"
    },
    {
        id: 'sample-2',
        question: "Comment j'ajoute mes propres fiches ?",
        answer: "Appuie sur le bouton + en bas à droite. Tu peux aussi tout gérer (modifier / supprimer) via le menu ☰ en haut.",
        category: "Guide"
    },
    {
        id: 'sample-3',
        question: "Capitale de l'Australie ?",
        answer: "Canberra (pas Sydney !)",
        category: "Exemple"
    }
];

function loadCards() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    saveCards(DEFAULT_CARDS);
    return DEFAULT_CARDS.slice();
}

function saveCards(cards) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function uid() {
    return 'c-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
}

let cards = loadCards();
let editingId = null;

const deckEl = document.getElementById('deck');
const emptyStateEl = document.getElementById('emptyState');
const progressEl = document.getElementById('progress');
const addBtn = document.getElementById('addBtn');
const emptyAddBtn = document.getElementById('emptyAddBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const manageBtn = document.getElementById('manageBtn');

const cardModal = document.getElementById('cardModal');
const modalTitle = document.getElementById('modalTitle');
const questionInput = document.getElementById('questionInput');
const answerInput = document.getElementById('answerInput');
const categoryInput = document.getElementById('categoryInput');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const deleteCardBtn = document.getElementById('deleteCardBtn');

const manageModal = document.getElementById('manageModal');
const manageList = document.getElementById('manageList');
const closeManageBtn = document.getElementById('closeManageBtn');
const resetBtn = document.getElementById('resetBtn');

function render() {
    deckEl.innerHTML = '';
    if (cards.length === 0) {
        emptyStateEl.classList.remove('hidden');
        deckEl.classList.add('hidden');
        updateProgress(0);
        return;
    }
    emptyStateEl.classList.add('hidden');
    deckEl.classList.remove('hidden');

    cards.forEach((card) => {
        const section = document.createElement('section');
        section.className = 'card';
        section.dataset.id = card.id;
        section.innerHTML = `
            <div class="card-inner">
                ${card.category ? `<span class="card-category">${escapeHtml(card.category)}</span>` : ''}
                <span class="card-face-label">Question</span>
                <p class="card-text">${escapeHtml(card.question)}</p>
                <span class="card-hint">Touche pour voir la réponse</span>
                <button class="card-edit" aria-label="Modifier">✎</button>
            </div>
        `;

        const inner = section.querySelector('.card-inner');
        inner.addEventListener('click', (e) => {
            if (e.target.closest('.card-edit')) return;
            toggleFlip(section, card);
        });

        section.querySelector('.card-edit').addEventListener('click', (e) => {
            e.stopPropagation();
            openEditModal(card.id);
        });

        deckEl.appendChild(section);
    });

    updateProgress(1);
    setupProgressObserver();
}

function toggleFlip(section, card) {
    const flipped = section.classList.toggle('flipped');
    const label = section.querySelector('.card-face-label');
    const text = section.querySelector('.card-text');
    const hint = section.querySelector('.card-hint');
    if (flipped) {
        label.textContent = 'Réponse';
        text.textContent = card.answer;
        hint.textContent = 'Touche pour revoir la question';
    } else {
        label.textContent = 'Question';
        text.textContent = card.question;
        hint.textContent = 'Touche pour voir la réponse';
    }
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function updateProgress(currentIndex) {
    progressEl.textContent = `${currentIndex} / ${cards.length}`;
}

let observer = null;
function setupProgressObserver() {
    if (observer) observer.disconnect();
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                const id = entry.target.dataset.id;
                const idx = cards.findIndex((c) => c.id === id);
                if (idx >= 0) updateProgress(idx + 1);
            }
        });
    }, { root: deckEl, threshold: [0.6] });

    document.querySelectorAll('.card').forEach((el) => observer.observe(el));
}

function openAddModal() {
    editingId = null;
    modalTitle.textContent = 'Nouvelle fiche';
    questionInput.value = '';
    answerInput.value = '';
    categoryInput.value = '';
    deleteCardBtn.classList.add('hidden');
    cardModal.classList.remove('hidden');
    questionInput.focus();
}

function openEditModal(id) {
    const card = cards.find((c) => c.id === id);
    if (!card) return;
    editingId = id;
    modalTitle.textContent = 'Modifier la fiche';
    questionInput.value = card.question;
    answerInput.value = card.answer;
    categoryInput.value = card.category || '';
    deleteCardBtn.classList.remove('hidden');
    cardModal.classList.remove('hidden');
    manageModal.classList.add('hidden');
}

function closeCardModal() {
    cardModal.classList.add('hidden');
    editingId = null;
}

saveBtn.addEventListener('click', () => {
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();
    const category = categoryInput.value.trim();
    if (!question || !answer) return;

    if (editingId) {
        const card = cards.find((c) => c.id === editingId);
        card.question = question;
        card.answer = answer;
        card.category = category;
    } else {
        cards.push({ id: uid(), question, answer, category });
    }
    saveCards(cards);
    closeCardModal();
    render();
});

deleteCardBtn.addEventListener('click', () => {
    if (!editingId) return;
    cards = cards.filter((c) => c.id !== editingId);
    saveCards(cards);
    closeCardModal();
    render();
});

cancelBtn.addEventListener('click', closeCardModal);
addBtn.addEventListener('click', openAddModal);
emptyAddBtn.addEventListener('click', openAddModal);

shuffleBtn.addEventListener('click', () => {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    saveCards(cards);
    render();
    deckEl.scrollTo({ top: 0 });
});

manageBtn.addEventListener('click', () => {
    renderManageList();
    manageModal.classList.remove('hidden');
});

closeManageBtn.addEventListener('click', () => {
    manageModal.classList.add('hidden');
});

resetBtn.addEventListener('click', () => {
    if (!confirm('Réinitialiser toutes les fiches par défaut ? Tes fiches perso seront perdues.')) return;
    cards = DEFAULT_CARDS.slice();
    saveCards(cards);
    manageModal.classList.add('hidden');
    render();
});

function renderManageList() {
    manageList.innerHTML = '';
    if (cards.length === 0) {
        manageList.innerHTML = '<p style="color:var(--text-dim); font-size:14px;">Aucune fiche.</p>';
        return;
    }
    cards.forEach((card) => {
        const item = document.createElement('div');
        item.className = 'manage-item';
        item.innerHTML = `
            <span class="manage-item-text">${escapeHtml(card.question)}</span>
            <button aria-label="Modifier">✎</button>
        `;
        item.querySelector('button').addEventListener('click', () => openEditModal(card.id));
        manageList.appendChild(item);
    });
}

render();
