
INSERT INTO UTILISATEUR (first_name, last_name, password, email, apogee, image, role) VALUES
('Elanrif', 'Said Baco', '123456', 'elanrif@gmail.fr', '123433789', NULL, 'ADMIN'),
('Marie', 'Lefevre', 'qwerty123', 'marie.lefevre@gmail.fr', 'C987654321', NULL, 'USER'),
('Paul', 'Smith', 'passpass', 'paul.smith@gmail.com', 'A1234567', NULL, 'USER'),
('Sophie', 'Jones', 'secretword', 'sophie.jones@gmail.com', 'B7654321', NULL, 'USER'),
('Luc', 'Martin', 'mysecretpass', 'luc.martin@gmail.fr', 'C456123789', NULL, 'USER'),
('Emily', 'Johnson', 'secure123', 'emily.johnson@gmail.com', 'D9876543', NULL, 'USER'),
('Pierre', 'Dubois', 'password789', 'pierre.dubois@gmail.fr', 'E987123456', NULL, 'USER'),
('Olivia', 'Brown', 'mypassword', 'olivia.brown@gmail.com', 'F5432167', NULL, 'USER'),
('Antoine', 'Thomas', '123456', 'antoine.thomas@gmail.fr', 'G876543219', NULL, 'USER'),
('Emma', 'Williams', 'hello123', 'emma.williams@gmail.com', 'H2345678', NULL, 'USER'),
('Nicolas', 'Lefevre', 'abcde', 'nicolas.lefevre@gmail.fr', 'I765432123', NULL, 'USER'),
('Ava', 'Taylor', 'pass123', 'ava.taylor@gmail.com', 'J8765432', NULL, 'USER'),
('Mathis', 'Martin', 'test123', 'mathis.martin@gmail.fr', 'K123456765', NULL, 'USER'),
('Chloe', 'Smith', 'mypassword123', 'chloe.smith@gmail.com', 'L4321567', NULL, 'USER'),
('Liam', 'Davis', '12345', 'liam.davis@gmail.com', 'M876543234', NULL, 'USER'),
('John', 'Doe', 'password1', 'john.doe@gmail.com', 'N1234567890', NULL, 'USER'),
('Jane', 'Smith', 'password2', 'jane.smith@gmail.com', 'O0987654321', NULL, 'USER'),
('Alice', 'Johnson', 'password3', 'alice.johnson@gmail.com', 'P5678901234', NULL, 'USER'),
('Bob', 'Brown', 'password4', 'bob.brown@gmail.com', 'Q6789012345', NULL, 'USER'),
('James', 'Anderson', 'password6', 'james.anderson@gmail.com', 'R2345678901', NULL, 'USER'),
('Olivia', 'Martinez', 'password7', 'olivia.martinez@gmail.com', 'S3456789012', NULL, 'USER'),
('William', 'Lopez', 'password8', 'william.lopez@gmail.com', 'T7890123456', NULL, 'USER'),
('Sophia', 'Garcia', 'password9', 'sophia.garcia@gmail.com', 'U8901234567', NULL, 'USER'),
('Liam', 'Taylor', 'password10', 'liam.taylor@gmail.com', 'V9012345678', NULL, 'USER'),
('Mia', 'Davis', 'password11', 'mia.davis@gmail.com', 'W4567890123', NULL, 'USER'),
('Benjamin', 'Hernandez', 'password12', 'benjamin.hernandez@gmail.com', 'X5678901234', NULL, 'USER'),
('Ava', 'Gonzalez', 'password13', 'ava.gonzalez@gmail.com', 'Y2345678901', NULL, 'USER'),
('Lucas', 'Rodriguez', 'password14', 'lucas.rodriguez@gmail.com', 'Z3456789012', NULL, 'USER'),
('Charlotte', 'Perez', 'password15', 'charlotte.perez@gmail.com', 'K1234567890', NULL, 'USER');


-- Insérer les associations
INSERT INTO ASSOCIATION (name, definition, description, date_creation, image) VALUES
    ("Etudiante Générale (AEG)", "L'Association Étudiante Générale représente l'ensemble des étudiants de notre établissement.", "L'AEG est l'association principale qui rassemble tous les étudiants et qui les représente auprès de l'administration de l'école.", '2023-10-01', NULL),
    ("Club de Débat", "Le Club de Débat réunit des étudiants intéressés par les débats et les discussions sur des sujets variés.", "Le Club de Débat offre aux étudiants l'opportunité d'améliorer leurs compétences en communication et d'apprendre à défendre leurs points de vue de manière convaincante.", '2023-10-01', NULL),
    ("Associations Sportives", "Si votre établissement dispose d'installations sportives, vous pourriez rejoindre l'une de ces associations pour créer des équipes sportives ou des clubs sportifs.", "Les associations sportives favorisent la participation aux activités sportives pour les étudiants intéressés par le sport.", '2023-10-30', NULL),
    ("Associations d'Échange Culturel", "Elles favorisent l'échange interculturel entre étudiants locaux et internationaux.", "Les associations d'échange culturel encouragent les échanges interculturels et la compréhension entre les différentes cultures présentes sur le campus.", '2023-10-01', NULL);

-- Insérer les événements et associer les événements aux associations
INSERT INTO EVENEMENT (type, description, date, association_id) VALUES
    -- Événements pour l'association "Etudiante Générale (AEG)"
    ("Séminaire sur la Gestion du Temps", "Apprenez à gérer votre temps efficacement pour optimiser votre productivité.", "2023-10-15", 1),
    ("Journée de Bienvenue des Nouveaux Étudiants", "Une journée spéciale pour accueillir les nouveaux étudiants et les intégrer à la communauté.", "2023-10-20", 1),
    ("Atelier de Développement Personnel", "Découvrez des stratégies pour améliorer votre bien-être et votre épanouissement personnel.", "2023-11-05", 1),

    -- Événements pour l'association "Club de Débat"
    ("Débat sur les Enjeux Sociaux Actuels", "Participez à un débat animé sur les questions sociales qui touchent notre société.", "2023-10-10", 2),
    ("Atelier de Prise de Parole en Public", "Développez vos compétences en communication et en prise de parole en public.", "2023-10-25", 2),
    ("Tournoi de Débats Inter-Universités", "Affrontez d'autres universités dans un tournoi de débats compétitif.", "2023-11-15", 2),

    -- Événements pour l'association "Associations Sportives"
    ("Tournoi de Football Intra-Muros", "Un tournoi de football amical entre les équipes des différentes filières.", "2023-11-02", 3),
    ("Séance d'Entraînement de Basketball", "Entraînez-vous et améliorez vos compétences en basketball.", "2023-11-12", 3),
    ("Randonnée en Montagne", "Partez à l'aventure lors d'une randonnée en montagne avec d'autres passionnés d'aventure.", "2023-11-18", 3),

    -- Événements pour l'association "Associations d'Échange Culturel"
    ("Soirée Internationale de Partage Culturel", "Découvrez la diversité culturelle à travers des plats, des danses et des présentations de différents pays.", "2023-10-18", 4),
    ("Cours de Langue Étrangère", "Apprenez les bases d'une langue étrangère avec des locuteurs natifs.", "2023-10-27", 4),
    ("Visite Guidée de Musées Locaux", "Explorez l'histoire et la culture de la région à travers ses musées.", "2023-11-08", 4);


-- Association Étudiante Générale (AEG)
INSERT INTO commentaire (contenu, date, disliked, liked, association_id, user_id) VALUES
    ("Super association, j'adore être membre de l'AEG !", '2023-11-01', 0, 10, 1, 1),
    ("Les événements de l'AEG sont toujours géniaux !", '2023-11-05', 2, 8, 1, 2),
    ("L'AEG représente vraiment bien les étudiants, continuez comme ça !", '2023-11-10', 1, 9, 1, 3),
    ("Les initiatives de l'AEG ont un réel impact sur le campus.", '2023-11-15', 0, 10, 1, 4),
    ("L'AEG favorise la cohésion entre les étudiants, bravo !", '2023-11-20', 2, 8, 1, 5);

-- Club de Débat
INSERT INTO commentaire (contenu, date, disliked, liked, association_id, user_id) VALUES
    ("Le Club de Débat m'a beaucoup aidé à gagner en confiance en moi.", '2023-11-02', 0, 7, 2, 1),
    ("J'ai rencontré des gens formidables grâce au Club de Débat.", '2023-11-06', 1, 6, 2, 2),
    ("Le débat sur la justice sociale était incroyable !", '2023-11-11', 2, 8, 2, 3),
    ("Je recommande le Club de Débat à tous les étudiants !", '2023-11-16', 0, 9, 2, 4),
    ("Le Club de Débat est une expérience enrichissante.", '2023-11-21', 1, 7, 2, 5);

-- Associations Sportives
INSERT INTO commentaire (contenu, date, disliked, liked, association_id, user_id) VALUES
    ("Les tournois sportifs sont toujours très compétitifs et amusants !", '2023-11-03', 1, 7, 3, 1),
    ("J'adore faire partie d'une équipe dans les Associations Sportives.", '2023-11-07', 0, 8, 3, 2),
    ("Les associations sportives ont un rôle essentiel dans la vie étudiante.", '2023-11-12', 2, 6, 3, 3),
    ("Les séances d'entraînement sont super motivantes !", '2023-11-17', 0, 9, 3, 4),
    ("L'ambiance pendant les matchs est toujours électrique !", '2023-11-22', 1, 8, 3, 5);

-- Associations d'Échange Culturel
INSERT INTO commentaire (contenu, date, disliked, liked, association_id, user_id) VALUES
    ("La soirée de partage culturel était une expérience unique !", '2023-11-04', 0, 9, 4, 1),
    ("Les cours de langue étrangère sont très interactifs et intéressants.", '2023-11-08', 1, 8, 4, 2),
    ("La visite des musées locaux était très instructive.", '2023-11-13', 0, 10, 4, 3),
    ("Je me suis fait de nombreux amis grâce aux associations d'échange culturel.", '2023-11-18', 2, 7, 4, 4),
    ("Je recommande ces associations à tous les étudiants internationaux !", '2023-11-23', 1, 8, 4, 5);


-- Réponses à certains commentaires
INSERT INTO response (contenu, date, disliked, liked, comment_id, user_id) VALUES
    -- Réponses au premier commentaire
    ("C'est génial d'entendre que vous appréciez l'AEG ! Nous travaillons dur pour offrir des événements de qualité.", '2023-11-02', 0, 5, 1, 6),
    ("Je suis d'accord, les événements de l'AEG sont toujours super !", '2023-11-02', 1, 4, 2, 7),

    -- Réponses au deuxième commentaire
    ("C'est fantastique de savoir que le Club de Débat a eu un impact positif sur vous !", '2023-11-03', 0, 5, 2, 8),
    ("C'était une excellente expérience, n'est-ce pas ? Le Club de Débat est vraiment spécial.", '2023-11-03', 0, 5, 2, 9),

    -- Réponses au troisième commentaire
    ("Le débat sur la justice sociale était en effet remarquable. Merci d'avoir participé !", '2023-11-04', 0, 6,3 , 10),
    ("Je suis ravi que vous ayez apprécié le débat ! C'était un sujet très important.", '2023-11-04', 1, 4, 2, 11),

    -- Réponses au quatrième commentaire
    ("Nous sommes heureux que vous recommandiez le Club de Débat !", '2023-11-05', 0, 5, 4, 12),
    ("L'expérience du Club de Débat a un impact différent pour chacun, mais toujours positif !", '2023-11-05', 0, 6, 4, 13),

    -- Réponses au cinquième commentaire
    ("L'ambiance du Club de Débat est vraiment spéciale, n'est-ce pas ?", '2023-11-06', 1, 4, 5, 14),
    ("Nous sommes ravis que vous ayez trouvé l'expérience enrichissante !", '2023-11-06', 0, 5, 5, 15),

    -- Réponses au sixième commentaire
    ("Les tournois sportifs sont toujours compétitifs et excitants !", '2023-11-07', 0, 5, 6, 16),
    ("Nous sommes heureux que vous appréciiez les tournois sportifs !", '2023-11-07', 0, 6, 7, 17),

    -- Réponses au septième commentaire
    ("Faire partie d'une équipe est une expérience inoubliable, n'est-ce pas ?", '2023-11-08', 1, 4, 9, 18),
    ("Nous sommes ravis que vous appréciez l'expérience dans les Associations Sportives !", '2023-11-08', 0, 5, 14, 19),

    -- Réponses au huitième commentaire
    ("C'est merveilleux de savoir que les associations sportives ont un impact positif sur la vie étudiante !", '2023-11-09', 0, 6, 11, 20),
    ("Nous sommes fiers de contribuer à l'épanouissement des étudiants grâce aux associations sportives !", '2023-11-09', 1, 4, 17, 21),

    -- Réponses au neuvième commentaire
    ("Les séances d'entraînement sont conçues pour être motivantes et efficaces. Continuez comme ça !", '2023-11-10', 0, 5, 16, 22),
    ("Nous sommes ravis que vous appréciiez les séances d'entraînement !", '2023-11-10', 0, 6, 15, 23),

    -- Réponses au dixième commentaire
    ("L'ambiance des matchs est l'un des moments forts des associations sportives !", '2023-11-11', 1, 4, 13, 24),
    ("Nous sommes heureux que vous appréciez l'atmosphère des matchs !", '2023-11-11', 0, 5, 3, 25),

    -- Réponses au onzième commentaire
    ("La soirée de partage culturel était en effet une expérience inoubliable !", '2023-11-12', 0, 6, 4, 26),
    ("C'était un plaisir de partager cette soirée avec vous. Espérons qu'il y en ait plus à venir !", '2023-11-12', 0, 5, 13, 3),

    -- Réponses au douzième commentaire
    ("Les cours de langue étrangère sont conçus pour être interactifs et efficaces !", '2023-11-13', 1, 4, 5, 3),
    ("Nous sommes ravis que vous appréciez nos cours de langue étrangère !", '2023-11-13', 0, 5, 4, 15),

    -- Réponses au treizième commentaire
    ("La visite des musées locaux est en effet une expérience enrichissante.", '2023-11-14', 0, 6, 14, 6),
    ("Nous sommes heureux que vous ayez trouvé la visite des musées intéressante !", '2023-11-14', 1, 4, 18, 19),

    -- Réponses au quatorzième commentaire
    ("Faire des amis grâce aux associations d'échange culturel est une des plus belles choses qui puisse arriver.", '2023-11-15', 0, 5, 19, 2),
    ("Nous sommes ravis que vous ayez trouvé des amis grâce à nos associations d'échange culturel !", '2023-11-15', 0, 19,18 , 11),

    -- Réponses au quinzième commentaire
    ("Nous sommes ravis que vous recommandiez nos associations aux étudiants internationaux !", '2023-11-16', 1, 4,20, 15),
    ("Merci pour votre recommandation ! Nous sommes toujours heureux d'accueillir de nouveaux membres.", '2023-08-15',2,5,9,7)



INSERT INTO BUREAU (desc, first_name, last_name, status, association_id)
VALUES
    ("Supervise et guide les activités de l'association.", "John", "Doe", "président", 1),
    ("Gère les finances de l'association, y compris les budgets et les rapports financiers.", "Jane", "Doe", "trésorier", 1),
    ("Gère la communication interne et externe de l'association.", "Alex", "Smith", "secrétaire", 1),
    ("Soutient et assiste le président dans ses fonctions.", "Sarah", "Johnson", "vice-président", 1),
    ("Assiste le trésorier dans ses tâches financières.", "Michael", "Brown", "trésorier adjoint", 1),
    ("Assiste le secrétaire dans ses responsabilités de communication.", "Laura", "Williams", "secrétaire adjointe", 1),
    ("Ancien dirigeant ayant une influence consultative.", "David", "Lee", "président", 2),
    ("Ancien gestionnaire des finances ayant une influence consultative.", "Emily", "Taylor", "trésorier", 2),
    ("Ancien gestionnaire de la correspondance ayant une influence consultative.", "James", "Clark", "secrétaire", 2),
    ("Ancien soutien du président avec une influence consultative.", "Olivia", "Wilson", "vice-président", 2),
    ("Ancien assistant trésorier avec une influence consultative.", "Daniel", "Harris", "trésorier adjoint", 2),
    ("Ancienne assistante secrétaire avec une influence consultative.", "Emma", "Martinez", "secrétaire adjointe", 2),
    ("Membre honorifique avec une contribution précieuse à l'association.", "Matthew", "Garcia", "président", 3),
    ("Membre honorifique avec une contribution précieuse aux finances de l'association.", "Ava", "Lopez", "trésorier", 3),
    ("Membre honorifique avec une contribution précieuse à la correspondance de l'association.", "Ryan", "Gonzalez", "secrétaire", 3),
    ("Membre honorifique avec un rôle de soutien et d'assistance précieux.", "Isabella", "Rodriguez", "vice-président", 3),
    ("Membre honorifique assistant trésorier avec une contribution précieuse.", "Ethan", "Hernandez", "trésorier adjoint", 3),
    ("Membre honorifique assistante secrétaire avec une contribution précieuse.", "Mia", "Brown", "secrétaire adjointe", 3),
    ("Membre associé avec des responsabilités de direction au sein de l'association.", "Christopher", "Smith", "président", 4),
    ("Membre associé responsable de la gestion des finances de l'association.", "Sofia", "Lee", "trésorier", 4),
    ("Membre associé responsable de la communication de l'association.", "Aiden", "Johnson", "secrétaire", 4),
    ("Membre associé avec un rôle de soutien et d'assistance.", "Amelia", "Clark", "vice-président", 4),
    ("Membre associé assistant trésorier avec des responsabilités financières.", "Grace", "Taylor", "trésorier adjoint", 4),
    ("Membre associé assistante secrétaire avec des responsabilités de communication.", "Elijah", "Martinez", "secrétaire adjointe", 4);


INSERT INTO benevoles (user_id, association_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 1),
    (6, 2),
    (7, 3),
    (8, 4),
    (9, 1),
    (10, 2),
    (11, 3),
    (12, 4),
    (13, 1),
    (14, 2),
    (15, 3),
    (16, 4),
    (17, 1),
    (18, 2),
    (19, 3),
    (20, 4);
