const STORAGE_KEY = 'revise-cards-v2';

const DEFAULT_CARDS = [
    {
        id: 'discovery-intro-1',
        question: "Le fil rouge à ne jamais casser (4 réflexes) ?",
        answer: "1. Annonce avant d'agir — dis ce que tu vas chercher avant de le demander.\n2. Digère avant d'enchaîner — reformule chaque info reçue avant l'action suivante.\n3. Nomme tes outils — jamais \"un framework\", toujours le framework précis.\n4. Solution en tout dernier — seulement si le manager t'y pousse.",
        category: "Fil rouge"
    },
    {
        id: 'discovery-intro-2',
        question: "5 choses qu'un manager produit attend d'entendre ?",
        answer: "1. Une question posée en retour (tu challenges aussi)\n2. Une métrique de succès nommée\n3. Un test avant un développement complet\n4. Une réaction posée face à un challenge\n5. Une synthèse claire à la fin",
        category: "Fil rouge"
    },
    {
        id: 'discovery-intro-3',
        question: "Les 5 étapes de la structure de discovery ?",
        answer: "1. Cadrer — objectif, cible, contexte business\n2. Explorer — récolter l'info, une source à la fois\n3. Formuler — hypothèses explicites, à voix haute\n4. Prioriser — framework nommé, pas d'intuition\n5. Proposer — direction générale, prudente",
        category: "Fil rouge"
    },
    {
        id: 'fw-design-thinking',
        question: "Design Thinking — les 5 phases ?",
        answer: "Empathize → Define → Ideate → Prototype → Test.\nNe jamais sauter la phase d'empathie pour foncer sur la solution ; itérer par cycles courts.\n\nPhrase type : \"Je vais dérouler une logique proche du design thinking — d'abord comprendre en profondeur avant de définir le problème, puis générer des pistes, avant de tester une version légère.\"",
        category: "Framework global"
    },
    {
        id: 'fw-double-diamond',
        question: "Double Diamond — le principe ?",
        answer: "2 losanges : Discover/Define (diverger puis converger sur LE PROBLÈME) → Develop/Deliver (diverger puis converger sur LA SOLUTION).\nNe jamais converger vers une solution avant d'avoir fini de diverger sur la compréhension du problème.\n\nPhrase type : \"Je resterais encore dans le premier losange — celui de la compréhension du problème — avant de passer au second, où on explore les solutions possibles.\"",
        category: "Framework global"
    },
    {
        id: 'cadrer-objectif',
        question: "Cadrer — pourquoi clarifier l'objectif business en premier ?",
        answer: "Sans savoir ce qu'est \"le succès\" (volume, recrutement, satisfaction, image...), impossible de savoir quelles infos récolter. C'est la 1ère question à poser, avant même de penser aux utilisateurs.\nPiège : se lancer dans des hypothèses de solution avant cette clarté.\n\nPhrase type : \"Avant d'aller chercher de l'information, je voudrais clarifier l'objectif : qu'est-ce qu'on entend par succès ici ?\"",
        category: "Cadrer"
    },
    {
        id: 'cadrer-cible',
        question: "Cadrer — pourquoi situer la cible dès le départ ?",
        answer: "Cible déjà définie ou encore ouverte change complètement les actions à mener. Demande si c'est arbitré en interne ou encore ouvert, puis demande une description rapide si elle existe.\n\nPhrase type : \"Est-ce qu'on a déjà une cible précise pour ce projet, ou c'est encore ouvert à ce stade ?\"",
        category: "Cadrer"
    },
    {
        id: 'cadrer-declencheur',
        question: "Cadrer — pourquoi comprendre le déclencheur du projet ?",
        answer: "Pourquoi ce projet maintenant révèle souvent la vraie priorité business : réponse défensive à un concurrent ≠ opportunité identifiée en interne (données à consulter en premier).\n\nPhrase type : \"Pourquoi ce projet maintenant — une pression concurrentielle, une demande client, une opportunité identifiée ?\"",
        category: "Cadrer"
    },
    {
        id: 'cadrer-4-risques',
        question: "Les 4 risques de Marty Cagan ?",
        answer: "Désirabilité (valeur pour l'utilisateur) · Utilisation (l'utiliseront-ils vraiment) · Faisabilité (ressources tech) · Viabilité économique (rentable pour l'entreprise).\nBeaucoup de candidats oublient faisabilité et viabilité, restent bloqués sur la désirabilité.\n\nPhrase type : \"Je veux m'assurer de couvrir les quatre risques classiques — désirabilité, utilisation, faisabilité technique, viabilité économique.\"",
        category: "Cadrer"
    },
    {
        id: 'explorer-interviews',
        question: "Interviews utilisateurs — quand et comment ?",
        answer: "Pour comprendre le \"pourquoi\" derrière un comportement. Précise QUI interroger (clients, prospects, churnés), 2-3 thèmes de questions, questions ouvertes, échantillon 5-8 personnes.\nPiège : ne jamais demander \"achèteriez-vous...\" (hypothétique) — creuser le comportement actuel.\n\nPhrase type : \"Je voudrais interroger 5 à 8 clients existants pour comprendre leur processus d'achat actuel.\"",
        category: "Explorer"
    },
    {
        id: 'explorer-entonnoir',
        question: "Comment structurer l'enchaînement des questions en interview ?",
        answer: "Ne pas dérouler une liste préparée : question d'ouverture large → repérer un mot/moment fort dans la réponse → creuser ce point précis → répéter.\nRéflexe : après chaque réponse, se demander \"quel est le mot le plus intéressant qu'on vient de me dire ?\"\nPiège : couper une réponse pour revenir à sa liste préparée.\n\nPhrase type : \"Vous avez mentionné avoir dû renvoyer deux fois les mêmes documents — qu'est-ce qui s'est passé la première fois ?\"",
        category: "Explorer"
    },
    {
        id: 'explorer-interviews-internes',
        question: "Pourquoi interroger les équipes internes en premier ?",
        answer: "Source rapide et gratuite : vente/support/retail sont déjà en contact quotidien avec les clients. Cible les équipes en contact direct (pas le management), cherche les irritants récurrents déjà entendus.\n\nPhrase type : \"Avant d'aller chercher des utilisateurs externes, je veux d'abord parler aux équipes retail.\"",
        category: "Explorer"
    },
    {
        id: 'explorer-donnees',
        question: "Pourquoi analyser la donnée existante en premier réflexe ?",
        answer: "Plus rapide, moins coûteux, plus fiable qu'une hypothèse construite de zéro. Demande le détail (funnel étape par étape), pas juste un chiffre agrégé — c'est là que se cache l'insight.\n\nPhrase type : \"Est-ce qu'on a des données sur le trafic actuel — panier moyen, taux d'abandon par étape ?\"",
        category: "Explorer"
    },
    {
        id: 'explorer-benchmark',
        question: "Benchmark concurrentiel — utilité et limite ?",
        answer: "Situe le problème dans son contexte sectoriel, anticipe des pièges déjà rencontrés. Cherche ce qui a marché ET raté (les échecs sont plus instructifs).\nNe remplace jamais la discovery utilisateur : c'est un complément, pas une vérité.\n\nPhrase type : \"Je veux regarder comment d'autres acteurs du secteur ont géré leur entrée — ce qui a marché, ce qui a été un frein.\"",
        category: "Explorer"
    },
    {
        id: 'explorer-sondages',
        question: "Sondage — quand l'utiliser (et quand surtout pas) ?",
        answer: "Sert à quantifier à grande échelle une hypothèse déjà identifiée en qualitatif — jamais en première action de discovery.\nPiège : proposer un sondage en tout début d'exercice = signal négatif (pas encore de piste à valider).\n\nPhrase type : \"Une fois qu'on aura identifié 2-3 freins récurrents en interviews, je proposerais un sondage pour quantifier leur poids.\"",
        category: "Explorer"
    },
    {
        id: 'explorer-biais',
        question: "Comment limiter le biais de confirmation en interview ?",
        answer: "Risque : projeter sa propre compréhension et ne retenir que ce qui confirme son hypothèse — dès la formulation de la question.\nPoser des questions ouvertes non suggestives, préparées à l'avance plutôt qu'improvisées selon ce qu'on espère entendre.\n\nPhrase type : \"Je préfère demander 'comment tu procèdes aujourd'hui' plutôt que 'est-ce que tu trouves ça compliqué'.\"",
        category: "Explorer"
    },
    {
        id: 'explorer-continu',
        question: "Interview continu (Teresa Torres) — le principe ?",
        answer: "Garder un rythme d'échange régulier (ex. hebdo) plutôt que des campagnes ponctuelles isolées. Évite de tout redécouvrir à chaque nouveau sujet, détecte les signaux faibles tôt.\nMontre que la discovery est une habitude, pas une étape isolée avant le \"vrai\" travail.\n\nPhrase type : \"Je ne penserais pas cette discovery comme un sprint isolé — je garderais un contact régulier avec les utilisateurs même après le lancement.\"",
        category: "Explorer"
    },
    {
        id: 'explorer-histoires',
        question: "Pourquoi faire raconter un événement vécu plutôt que demander une opinion ?",
        answer: "Les gens sont peu fiables pour prédire leur comportement futur (ils répondent ce qu'ils pensent qu'on veut entendre). Demander un fait précis et récent est plus fiable.\n\nPhrase type : \"Plutôt qu'une opinion générale, je préférerais faire raconter la dernière fois où la personne a essayé d'acheter le produit.\"",
        category: "Explorer"
    },
    {
        id: 'atelier-brainstorm',
        question: "Brainstorming — quand et comment ?",
        answer: "Faire émerger un max d'idées en groupe sans juger, une fois le problème bien cadré — pas pour découvrir le problème lui-même.\nSépare bien génération d'idées (sans jugement) et tri/priorisation ensuite.\nPiège : brainstormer avant d'avoir cadré = générer des solutions dans le vide.\n\nPhrase type : \"Une fois le problème bien cadré, je réunirais l'équipe pour un brainstorming rapide.\"",
        category: "Ateliers collaboratifs"
    },
    {
        id: 'atelier-story-mapping',
        question: "Story Mapping — à quoi ça sert ?",
        answer: "Cartographier le parcours utilisateur en grandes étapes, puis détailler les actions fines sous chaque étape. Permet de voir tout le parcours avant de découper un MVP (ligne du dessus) du reste (reporté).\n\nPhrase type : \"Je cartographierais le parcours complet en story map, puis je découperais une V1 minimale sur la ligne du dessus.\"",
        category: "Ateliers collaboratifs"
    },
    {
        id: 'atelier-impact-mapping',
        question: "Impact Mapping — la structure et la différence avec le Story Mapping ?",
        answer: "Why (objectif business) → Who (acteurs qui l'influencent) → How (impact comportemental voulu) → What (livrables concrets).\nContrairement au story mapping (part du parcours utilisateur), l'impact mapping part de la stratégie business.\n\nPhrase type : \"Je structurerais ça en impact mapping — partant de l'objectif business, quels acteurs peuvent l'influencer, quelles fonctionnalités y contribuent.\"",
        category: "Ateliers collaboratifs"
    },
    {
        id: 'formuler-hypotheses',
        question: "Pourquoi et comment formuler des hypothèses explicites ?",
        answer: "Erreur n°1 : sauter de \"j'ai une info\" à \"voici ma solution\". Toujours passer par une hypothèse explicite, dite à voix haute, avant priorisation/solution.\n2-3 hypothèses max, falsifiables, reliées à une info précise récoltée (pas une intuition).\n\nPhrase type : \"Sur la base de ce que j'ai récolté, voici deux hypothèses : [hypothèse 1], [hypothèse 2].\"",
        category: "Formuler"
    },
    {
        id: 'formuler-supports',
        question: "3 supports pour synthétiser une discovery utilisateur ?",
        answer: "User persona (synthèse fictive construite à partir des infos récoltées) · Empathy map (dit/ressent/voit/entend) · User journey map (étapes + ressentis, pour repérer le point de friction).\nSi une case reste vide, c'est le signe qu'il manque une info.\n\nPhrase type : \"Je synthétiserais tout ça sous forme de user journey map pour repérer où se situe la friction.\"",
        category: "Formuler"
    },
    {
        id: 'prioriser-ost',
        question: "Opportunity Solution Tree — la structure ?",
        answer: "Outcome business (tronc) → Opportunités/besoins utilisateurs (branches) → Solutions possibles par opportunité → Hypothèses les plus risquées à tester (feuilles).\nMontre qu'on explore plusieurs branches avant de converger.\n\nPhrase type : \"Je structurerais ça comme un opportunity solution tree — l'outcome, c'est le volume de transactions. Je veux identifier 2-3 opportunités avant de me projeter sur une solution unique.\"",
        category: "Prioriser"
    },
    {
        id: 'prioriser-assumption-mapping',
        question: "Assumption mapping — le principe ?",
        answer: "Lister toutes les hypothèses sous-jacentes à une solution, identifier la plus risquée (celle qui ferait tout s'effondrer si fausse), et la tester en priorité — pas la plus facile à vérifier.\n\nPhrase type : \"Avant de développer, je listerais les hypothèses sous-jacentes, et je testerais en priorité la plus risquée.\"",
        category: "Prioriser"
    },
    {
        id: 'prioriser-jtbd',
        question: "Jobs To Be Done — le principe ?",
        answer: "Les gens n'achètent pas un produit pour lui-même, mais pour le \"job\" (fonctionnel, social, émotionnel) qu'il accomplit. Grille de lecture pour analyser une interview, pas une action à part entière.\n\nPhrase type : \"Je voudrais comprendre le job réel derrière l'achat — le produit, le statut, ou la garantie d'authenticité.\"",
        category: "Prioriser"
    },
    {
        id: 'prioriser-impact-effort',
        question: "Matrice Impact/Effort — comment l'utiliser ?",
        answer: "Classer les pistes sur 2 axes : impact business et effort de mise en œuvre. Prioriser fort impact/faible effort (quick wins).\nPiège : ne jamais estimer l'effort à l'intuition — préciser qu'il faut challenger l'équipe tech.\n\nPhrase type : \"Je proposerais une matrice impact/effort, en gardant à l'esprit que l'effort doit être challengé avec l'équipe tech.\"",
        category: "Prioriser"
    },
    {
        id: 'prioriser-rice',
        question: "RICE — les 4 dimensions et la formule ?",
        answer: "Reach (combien de personnes touchées) × Impact (ampleur du changement) × Confidence (niveau de confiance dans les estimations) / Effort.\nPlus rigoureux qu'impact/effort car il force à documenter ce qu'on sait vs ce qu'on suppose.\n\nPhrase type : \"Si on a plusieurs pistes à comparer, je préférerais un scoring RICE plutôt qu'une matrice simple.\"",
        category: "Prioriser"
    },
    {
        id: 'posture-questions-manager',
        question: "Pourquoi challenger aussi le manager pendant l'exercice ?",
        answer: "Un vrai PM ne subit pas l'exercice : demande du contexte, questionne les contraintes (timing, budget). Chaque question doit avoir un but clair.\n\nPhrase type : \"Est-ce qu'il y a une contrainte de timing ou de budget déjà fixée, qui orienterait mes priorités ?\"",
        category: "Posture"
    },
    {
        id: 'posture-metrique',
        question: "Pourquoi toujours associer une métrique à une recommandation ?",
        answer: "Une recommandation sans métrique est incomplète pour un manager produit — \"on ne peut pas améliorer ce qu'on ne mesure pas\". Relier la métrique à l'outcome business initial, préciser la durée d'observation.\n\nPhrase type : \"Je suivrais le taux de conversion post-sélection, sur un mois, comparé à la cohorte précédente.\"",
        category: "Posture"
    },
    {
        id: 'posture-test-leger',
        question: "3 façons de tester léger avant de développer ?",
        answer: "Fake door test (bouton qui n'existe pas encore, on mesure les clics) · Landing page test (page décrivant l'offre, on mesure l'intérêt) · Prototype cliquable (mockup testé sans code).\n\nPhrase type : \"Avant de développer la fonctionnalité complète, je proposerais un fake door test pour mesurer l'intérêt réel.\"",
        category: "Posture"
    },
    {
        id: 'posture-challenge',
        question: "Comment réagir quand le manager challenge une hypothèse ?",
        answer: "Éviter les 2 extrêmes : s'accrocher rigidement, ou abandonner immédiatement. Accueillir, reformuler, puis répondre ou ajuster si l'argument est solide. \"Je ne sais pas, il faudrait vérifier\" est une bonne réponse.\n\nPhrase type : \"C'est un bon point — dans ce cas, je nuancerais ma recommandation de la façon suivante...\"",
        category: "Posture"
    },
    {
        id: 'posture-cloture',
        question: "Comment bien clôturer l'exercice ?",
        answer: "Prendre 30 secondes pour récapituler, même sans qu'on te le demande. Structure en 3 temps : ce que j'ai appris / ce que je recommande / comment je mesure + la suite.\n\nPhrase type : \"Pour résumer : j'ai identifié [le problème], je recommande [la solution], je la testerais via [le test], je mesurerais via [la métrique].\"",
        category: "Posture"
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
