const STORAGE_KEY = 'revise-cards-v3';

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
        id: 'cadrer-north-star',
        question: "North Star Metric — comment la différencier d'une métrique de succès ponctuelle ?",
        answer: "La North Star Metric est LA métrique unique qui capture la valeur durable délivrée aux utilisateurs (ex : transactions récurrentes par mois) — elle reste stable dans le temps, contrairement à une métrique de succès par action qui change à chaque test.\nUtile pour vérifier qu'une recommandation ponctuelle sert bien l'objectif long terme, pas seulement un pic court terme.\n\nPhrase type : \"Cette action ferait bouger la conversion à court terme, mais je vérifierais qu'elle sert bien notre North Star — le volume de transactions récurrentes.\"",
        category: "Cadrer"
    },
    {
        id: 'cadrer-unit-economics',
        question: "Viabilité économique — quels 2 chiffres vérifier en priorité ?",
        answer: "CAC (coût d'acquisition client) et LTV (valeur générée par un client sur sa durée de vie) — une piste séduisante côté utilisateur peut rester non viable si le CAC dépasse la LTV.\nRepère courant : viser un ratio LTV/CAC d'au moins 3.\n\nPhrase type : \"Avant de recommander cette action d'acquisition, je vérifierais le ratio LTV/CAC — inutile de générer du volume si le coût d'acquisition dépasse la valeur générée.\"",
        category: "Cadrer"
    },
    {
        id: 'cadrer-sizing',
        question: "Comment cadrer rapidement la taille de l'opportunité (sizing) ?",
        answer: "TAM (marché total adressable) → SAM (marché atteignable avec ce business model) → SOM (part réaliste captée à moyen terme).\nUtile quand le manager demande \"est-ce que ça vaut le coup\" — donne un ordre de grandeur avant de choisir où investir en discovery.\n\nPhrase type : \"Avant d'aller plus loin, je cadrerais l'ordre de grandeur : combien de clients concernés au total, combien réalistement atteignables avec ce lancement.\"",
        category: "Cadrer"
    },
    {
        id: 'explorer-interviews',
        question: "Interviews utilisateurs — quand et comment ?",
        answer: "Pour comprendre le \"pourquoi\" derrière un comportement. Précise QUI interroger (clients, prospects, churnés), 2-3 thèmes de questions, questions ouvertes, échantillon 5-8 personnes.\nPiège : ne jamais demander \"achèteriez-vous...\" (hypothétique) — creuser le comportement actuel.\n\nPhrase type : \"Je voudrais interroger 5 à 8 clients existants pour comprendre leur processus d'achat actuel.\"",
        category: "Explorer"
    },
    {
        id: 'explorer-observation',
        question: "Observation terrain (contextual inquiry) — en quoi ça complète l'interview ?",
        answer: "Les utilisateurs racontent souvent un comportement différent de celui qu'ils ont réellement — observer en situation réelle révèle des frictions qu'ils ne verbalisent pas eux-mêmes.\nParticulièrement pertinent sur un cas retail/luxe : observer un client en boutique donne des insights qu'aucune interview ne remplace.\n\nPhrase type : \"Je compléterais les interviews par de l'observation en boutique — regarder comment les clients interagissent réellement avec le produit, pas seulement ce qu'ils en disent.\"",
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
        id: 'explorer-autres-biais',
        question: "Au-delà du biais de confirmation, quels autres biais guettent une interview ?",
        answer: "Biais de désirabilité sociale — la personne répond ce qui est socialement valorisant, pas ce qu'elle fait vraiment.\nBiais de question suggestive — une question qui contient déjà la réponse attendue oriente la personne sans qu'elle s'en rende compte.\nParade commune : recouper la déclaration avec un fait vécu précis.\n\nPhrase type : \"Je resterais vigilant sur le biais de désirabilité sociale ici — les clients du luxe ont tendance à valoriser l'artisanat même quand leur comportement d'achat dit autre chose.\"",
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
        id: 'prioriser-kano',
        question: "Modèle de Kano — à quoi sert-il en priorisation ?",
        answer: "Classe les fonctionnalités selon leur effet sur la satisfaction : Basique (son absence déçoit, sa présence n'enchante pas) · Performance (plus on en donne, plus la satisfaction augmente) · Attractif/Delighter (son absence ne gêne pas, sa présence enchante).\nComplète RICE/Impact-Effort en ajoutant une dimension qualitative : quel type de valeur crée la fonctionnalité, pas seulement son coût.\n\nPhrase type : \"Je classerais ces fonctionnalités avec le modèle de Kano — celle-ci est basique, son absence serait rédhibitoire, alors que celle-là est un delighter qui différencierait vraiment l'offre.\"",
        category: "Prioriser"
    },
    {
        id: 'prioriser-moscow',
        question: "MoSCoW — une alternative légère à RICE, quand l'utiliser ?",
        answer: "Must have / Should have / Could have / Won't have (cette fois-ci) — plus rapide à dérouler à l'oral que RICE quand le temps est compté ou qu'on manque de données chiffrées pour scorer précisément.\nMoins rigoureux que RICE (pas de calcul) : à présenter comme un raccourci assumé, pas comme LA méthode de référence.\n\nPhrase type : \"Faute de données précises pour scorer en RICE, je trierais rapidement en MoSCoW pour distinguer ce qui est indispensable en V1.\"",
        category: "Prioriser"
    },
    {
        id: 'posture-ouverture',
        question: "Comment ouvrir l'exercice de cas pratique dans les 30 premières secondes ?",
        answer: "Annoncer sa structure avant de plonger dedans : \"Je vais d'abord clarifier l'objectif et la cible, puis explorer, formuler des hypothèses, prioriser, avant de proposer une direction.\"\nÇa rassure le manager tout de suite sur ta méthode, et te donne un fil à suivre si tu perds le fil en cours d'exercice.\n\nPhrase type : \"Avant de commencer, voici comment je propose de structurer mon raisonnement : cadrer, explorer, formuler, prioriser, proposer.\"",
        category: "Posture"
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
        id: 'posture-usability-testing',
        question: "Test utilisateur sur prototype (usability testing) — comment le nommer précisément ?",
        answer: "Complète le fake door / landing page test : ici, on observe un utilisateur naviguer un prototype cliquable, en pensant à voix haute.\nModéré (tu observes en direct, tu peux creuser un blocage) vs non-modéré (à distance, sans observateur, plus rapide mais moins riche).\n\nPhrase type : \"Avant de valider cette direction, je testerais un prototype cliquable en usability testing modéré auprès de 5 utilisateurs, pour comprendre pourquoi ils bloquent, pas seulement où.\"",
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

// Spaced repetition (lightweight Leitner system): each card has a box (1-5)
// and a due date. Rating a card after reveal moves it between boxes so
// well-known cards resurface less often than shaky ones.
const PROGRESS_KEY = 'revise-progress-v1';
const BOX_INTERVAL_DAYS = [0, 0, 1, 3, 7, 16];
const MAX_BOX = 5;

function loadProgress() {
    try {
        const raw = localStorage.getItem(PROGRESS_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {};
}

function saveProgress(p) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

function getBox(id) {
    const p = progress[id];
    return (p && typeof p.box === 'number') ? p.box : 0;
}

function isDue(id) {
    const p = progress[id];
    if (!p) return true;
    return p.dueAt <= Date.now();
}

function rateCard(id, rating) {
    const p = progress[id] || { box: 0, reviews: 0, dueAt: 0 };
    let box = p.box || 0;
    if (rating === 'again') {
        box = 1;
    } else if (rating === 'good') {
        box = Math.min(Math.max(box, 1) + 1, MAX_BOX);
    } else if (rating === 'easy') {
        box = Math.min(Math.max(box, 1) + 2, MAX_BOX);
    }
    p.box = box;
    p.reviews = (p.reviews || 0) + 1;
    p.dueAt = Date.now() + BOX_INTERVAL_DAYS[box] * 86400000;
    progress[id] = p;
    saveProgress(progress);
}

// Interleaving: round-robin merge across categories instead of studying one
// category in a block. Mixing topics during practice is well documented to
// improve long-term retention compared to blocked practice.
function interleave(list) {
    const groups = new Map();
    list.forEach((c) => {
        const key = c.category || '';
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(c);
    });
    const buckets = Array.from(groups.values());
    const result = [];
    let added = true;
    while (added) {
        added = false;
        for (const bucket of buckets) {
            if (bucket.length) {
                result.push(bucket.shift());
                added = true;
            }
        }
    }
    return result;
}

function getDisplayCards() {
    if (reviewMode) {
        const due = cards.filter((c) => isDue(c.id));
        due.sort((a, b) => ((progress[a.id] && progress[a.id].dueAt) || 0) - ((progress[b.id] && progress[b.id].dueAt) || 0));
        return interleave(due);
    }
    return interleave(cards);
}

let cards = loadCards();
let progress = loadProgress();
let editingId = null;
let reviewMode = false;

const deckEl = document.getElementById('deck');
const emptyStateEl = document.getElementById('emptyState');
const reviewEmptyStateEl = document.getElementById('reviewEmptyState');
const progressEl = document.getElementById('progress');
const addBtn = document.getElementById('addBtn');
const emptyAddBtn = document.getElementById('emptyAddBtn');
const backToDeckBtn = document.getElementById('backToDeckBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const manageBtn = document.getElementById('manageBtn');
const reviewBtn = document.getElementById('reviewBtn');
const dueBadgeEl = document.getElementById('dueBadge');

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

function masteryDotsHtml(box) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<span class="dot${i <= box ? ' filled' : ''}"></span>`;
    }
    return html;
}

function render() {
    updateDueBadge();

    if (cards.length === 0) {
        emptyStateEl.classList.remove('hidden');
        reviewEmptyStateEl.classList.add('hidden');
        deckEl.classList.add('hidden');
        deckEl.innerHTML = '';
        updateProgress(0, 0);
        return;
    }

    const displayCards = getDisplayCards();

    if (reviewMode && displayCards.length === 0) {
        emptyStateEl.classList.add('hidden');
        reviewEmptyStateEl.classList.remove('hidden');
        deckEl.classList.add('hidden');
        deckEl.innerHTML = '';
        updateProgress(0, 0);
        return;
    }

    emptyStateEl.classList.add('hidden');
    reviewEmptyStateEl.classList.add('hidden');
    deckEl.classList.remove('hidden');
    deckEl.innerHTML = '';

    displayCards.forEach((card) => {
        const box = getBox(card.id);
        const section = document.createElement('section');
        section.className = 'card';
        section.dataset.id = card.id;
        section.innerHTML = `
            <div class="card-inner">
                ${card.category ? `<span class="card-category">${escapeHtml(card.category)}</span>` : ''}
                <div class="mastery-dots">${masteryDotsHtml(box)}</div>
                <span class="card-face-label">Question</span>
                <p class="card-text card-text-question">${escapeHtml(card.question)}</p>
                <div class="card-answer-blocks hidden"></div>
                <span class="card-hint">Touche pour voir la réponse</span>
                <div class="rating-row hidden">
                    <button type="button" class="rating-btn rating-again" data-rating="again">🔁 À revoir</button>
                    <button type="button" class="rating-btn rating-good" data-rating="good">🙂 Bien</button>
                    <button type="button" class="rating-btn rating-easy" data-rating="easy">✅ Facile</button>
                </div>
                <button class="card-edit" aria-label="Modifier">✎</button>
            </div>
        `;

        const inner = section.querySelector('.card-inner');
        inner.addEventListener('click', (e) => {
            if (e.target.closest('.card-edit') || e.target.closest('.rating-btn')) return;
            toggleFlip(section, card);
        });

        section.querySelector('.card-edit').addEventListener('click', (e) => {
            e.stopPropagation();
            openEditModal(card.id);
        });

        section.querySelectorAll('.rating-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                rateCard(card.id, btn.dataset.rating);
                const dotsEl = section.querySelector('.mastery-dots');
                if (dotsEl) dotsEl.innerHTML = masteryDotsHtml(getBox(card.id));
                updateDueBadge();
                const next = section.nextElementSibling;
                if (next && next.classList.contains('card')) {
                    setTimeout(() => next.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
                }
            });
        });

        deckEl.appendChild(section);
    });

    updateProgress(1, displayCards.length);
    setupProgressObserver();
}

function toggleFlip(section, card) {
    const flipped = section.classList.toggle('flipped');
    const label = section.querySelector('.card-face-label');
    const hint = section.querySelector('.card-hint');
    const questionEl = section.querySelector('.card-text-question');
    const answerBlocksEl = section.querySelector('.card-answer-blocks');
    const ratingRow = section.querySelector('.rating-row');
    const editBtn = section.querySelector('.card-edit');
    if (flipped) {
        label.textContent = 'Réponse';
        questionEl.classList.add('hidden');
        answerBlocksEl.innerHTML = '';
        renderAnswerBlocks(answerBlocksEl, card.answer);
        answerBlocksEl.classList.remove('hidden');
        hint.textContent = 'Touche pour revoir la question';
        ratingRow.classList.remove('hidden');
        editBtn.classList.add('hidden');
    } else {
        label.textContent = 'Question';
        questionEl.classList.remove('hidden');
        answerBlocksEl.classList.add('hidden');
        hint.textContent = 'Touche pour voir la réponse';
        ratingRow.classList.add('hidden');
        editBtn.classList.remove('hidden');
    }
}

// Turns the plain-text answer into visually distinct chunks: numbered list
// items get a number badge, "Piège :" / "Réflexe :" lines become callouts,
// and a trailing "Phrase type : ..." paragraph becomes a quote block.
// Chunking + signaling like this (vs. one dense paragraph) is easier to
// scan and recall.
function parseAnswerBlocks(text) {
    const outerParts = text.split('\n\n');
    let quote = null;
    let contentParts = outerParts;
    const last = outerParts[outerParts.length - 1];
    if (last && /^Phrase type\s*:/.test(last.trim())) {
        quote = last.trim().replace(/^Phrase type\s*:\s*/, '');
        contentParts = outerParts.slice(0, -1);
    }
    const lines = [];
    contentParts.forEach((part) => {
        part.split('\n').forEach((line) => {
            const trimmed = line.trim();
            if (trimmed) lines.push(trimmed);
        });
    });
    return { lines, quote };
}

function renderAnswerBlocks(container, text) {
    const { lines, quote } = parseAnswerBlocks(text);
    lines.forEach((line) => {
        const numberedMatch = line.match(/^(\d+)\.\s*(.*)$/);
        const calloutMatch = line.match(/^(Piège|Réflexe|Repère courant)\s*:\s*(.*)$/);
        if (numberedMatch) {
            const row = document.createElement('div');
            row.className = 'ans-numbered';
            const num = document.createElement('span');
            num.className = 'ans-num';
            num.textContent = numberedMatch[1];
            const txt = document.createElement('span');
            txt.textContent = numberedMatch[2];
            row.appendChild(num);
            row.appendChild(txt);
            container.appendChild(row);
        } else if (calloutMatch) {
            const row = document.createElement('div');
            row.className = 'ans-callout';
            const label = document.createElement('span');
            label.className = 'ans-callout-label';
            label.textContent = calloutMatch[1] + ' :';
            const txt = document.createElement('span');
            txt.textContent = calloutMatch[2];
            row.appendChild(label);
            row.appendChild(txt);
            container.appendChild(row);
        } else {
            const p = document.createElement('p');
            p.className = 'ans-line';
            p.textContent = line;
            container.appendChild(p);
        }
    });
    if (quote) {
        const q = document.createElement('div');
        q.className = 'ans-quote';
        const qLabel = document.createElement('span');
        qLabel.className = 'ans-quote-label';
        qLabel.textContent = '🗣️ Phrase type';
        const qText = document.createElement('p');
        qText.className = 'ans-quote-text';
        qText.textContent = quote;
        q.appendChild(qLabel);
        q.appendChild(qText);
        container.appendChild(q);
    }
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function updateProgress(currentIndex, total) {
    progressEl.textContent = `${currentIndex} / ${total}`;
}

function updateDueBadge() {
    const dueCount = cards.filter((c) => isDue(c.id)).length;
    dueBadgeEl.textContent = dueCount > 99 ? '99+' : String(dueCount);
    dueBadgeEl.classList.toggle('hidden', dueCount === 0);
    reviewBtn.classList.toggle('active', reviewMode);
}

let observer = null;
function setupProgressObserver() {
    if (observer) observer.disconnect();
    const cardEls = Array.from(document.querySelectorAll('.card'));
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                const idx = cardEls.indexOf(entry.target);
                if (idx >= 0) updateProgress(idx + 1, cardEls.length);
            }
        });
    }, { root: deckEl, threshold: [0.6] });

    cardEls.forEach((el) => observer.observe(el));
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
    delete progress[editingId];
    saveCards(cards);
    saveProgress(progress);
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

reviewBtn.addEventListener('click', () => {
    reviewMode = !reviewMode;
    render();
    deckEl.scrollTo({ top: 0 });
});

backToDeckBtn.addEventListener('click', () => {
    reviewMode = false;
    render();
});

manageBtn.addEventListener('click', () => {
    renderManageList();
    manageModal.classList.remove('hidden');
});

closeManageBtn.addEventListener('click', () => {
    manageModal.classList.add('hidden');
});

resetBtn.addEventListener('click', () => {
    if (!confirm('Réinitialiser toutes les fiches par défaut ? Tes fiches perso et ta progression seront perdues.')) return;
    cards = DEFAULT_CARDS.slice();
    progress = {};
    saveCards(cards);
    saveProgress(progress);
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
