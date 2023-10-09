INSERT INTO UTILISATEUR (first_name, last_name, password, email, apogee, image, role) VALUES
('Elanrif', 'Said Baco', 'password123', 'elanrif.saidbaco@gmail.fr', '123433789', NULL, 'ADMIN'),
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


INSERT INTO ASSOCIATION (name, definition, description, date_creation, image) VALUES
    ("Association Polydisciplinaire", "La meilleur association existante dans notre faculté. Avec nous vous ne serrez pas déçu.", "Ici, nous organisons des évènements de toute genre…e vous promets que vous serrez épanouï avec nous.", '2023-10-15', NULL),
    ("Etudiante Générale (AEG)", "L'Association Étudiante Générale représente l'ensemble des étudiants de notre établissement.", "L'AEG est l'association principale qui rassemble tous les étudiants et qui les représente auprès de l'administration de l'école.", '2023-10-01', NULL),
    ("Club de Débat", "Le Club de Débat réunit des étudiants intéressés par les débats et les discussions sur des sujets variés.", "Le Club de Débat offre aux étudiants l'opportunité d'améliorer leurs compétences en communication et d'apprendre à défendre leurs points de vue de manière convaincante.", '2023-10-01', NULL),
    ("Associations Humanitaires et de Service", "Ces associations se concentrent sur des actions bénévoles et des projets de service à la communauté.", "Les associations humanitaires et de service sont axées sur la fourniture de services pour aider les personnes dans le besoin.", '2023-09-20', NULL),
    ("Associations Sportives", "Si votre établissement dispose d'installations sportives, vous pourriez rejoindre l'une de ces associations pour créer des équipes sportives ou des clubs sportifs.", "Les associations sportives favorisent la participation aux activités sportives pour les étudiants intéressés par le sport.", '2023-10-30', NULL),
    ("Artististique", "Si vous êtes passionné par les arts, vous pourriez envisager de rejoindre une association d'artistes pour promouvoir la créativité sur le campus.", "Les associations d'artistes rassemblent des étudiants talentueux pour organiser des expositions, des spectacles et des ateliers artistiques.", '2023-10-01', NULL),
    ("Associations de Bien-Être Étudiant", "Ces associations se concentrent sur le bien-être mental, physique et émotionnel des étudiants.", "Les associations de bien-être étudiant mettent l'accent sur les activités visant à améliorer la qualité de vie des étudiants.", '2023-10-01', NULL),
    ("Associations d'Échange Culturel", "Elles favorisent l'échange interculturel entre étudiants locaux et internationaux.", "Les associations d'échange culturel encouragent les échanges interculturels et la compréhension entre les différentes cultures présentes sur le campus.", '2023-10-01', NULL),
    ("caritative", "Définition de notre association caritative.", "Veuillez lire attentivement la description. Cela vous aidera à bien comprendre l'utilité de notre association.", '2023-10-07', NULL),
    ("Associations et de Service", "Ces associations se concentrent sur des actions bénévoles et des projets de service à la communauté.", "Les associations humanitaires et de service sont axées sur la fourniture de services pour aider les personnes dans le besoin.", '2023-09-20', NULL);


INSERT INTO commentaire (contenu, date, disliked, liked, association_id, user_id)
VALUES
  ('Super produit, je l\'adore !', '2023-10-03', 0, 0, 1, 1),
  ('Excellent rapport qualité-prix.', '2023-10-04', 0, 0, 2, 2),
  ('Livraison rapide et bien emballé.', '2023-10-05', 0, 0, 1, 3),
  ('Je suis déçu de la qualité du produit.', '2023-10-06', 0, 0, 2, 4),
  ('Service client très réactif, merci !', '2023-10-07', 0, 0, 1, 5),
  ('Très satisfait de mon achat.', '2023-10-08', 0, 0, 2, 6);




INSERT INTO EVENEMENT (type, description, date)
VALUES
("Atelier de Développement Personnel", "Un atelier pour aider les étudiants à améliorer leurs compétences en communication et en gestion du temps.", "2023-09-15"),
("Journée de Sensibilisation à l'Environnement", "Une journée dédiée à sensibiliser les étudiants à l'importance de la durabilité et de la protection de l'environnement.", "2023-09-20"),
("Tournoi de Football Inter-Associations", "Un tournoi amical entre différentes associations étudiantes pour promouvoir le sport et l'esprit d'équipe.", "2023-09-25"),
("Séance de Méditation et de Relaxation", "Une séance pour aider les étudiants à gérer le stress et à trouver un équilibre mental.", "2023-09-30"),
("Rencontre avec des Professionnels de l'Industrie", "Un événement où des professionnels partagent leurs expériences avec les étudiants.", "2023-10-05"),
("Collecte de Fonds pour une Cause Caritative", "Une collecte de fonds pour soutenir une organisation caritative locale.", "2023-10-10"),
("Conférence sur l'Entrepreneuriat Étudiant", "Une conférence pour inspirer les étudiants à poursuivre leurs propres projets entrepreneuriaux.", "2023-10-15"),
("Atelier d'Art et d'Expression Créative", "Un atelier pour permettre aux étudiants de libérer leur créativité à travers l'art.", "2023-10-20"),
("Séance de Yoga en Plein Air", "Une séance de yoga pour promouvoir le bien-être physique et mental des étudiants.", "2023-10-25"),
("Cours de Développement Web", "Un cours intensif pour apprendre les bases du développement web.", "2023-10-30"),
("Fête de Fin de Semestre", "Une fête pour célébrer la fin du semestre et se détendre avec les camarades de classe.", "2023-11-05"),
("Forum de Discussion sur la Santé Mentale", "Un espace pour les étudiants afin de discuter de la santé mentale et du bien-être.", "2023-11-10");

INSERT INTO BUREAU (first_name, last_name, status)
VALUES
("John", "Doe", "président"),
("Jane", "Doe", "trésorier"),
("Alex", "Smith", "secrétaire"),
("Sarah", "Johnson", "vice-président"),
("Michael", "Brown", "trésorier adjoint"),
("Laura", "Williams", "secrétaire adjointe"),
("David", "Lee", "président"),
("Emily", "Taylor", "trésorier"),
("James", "Clark", "secrétaire"),
("Olivia", "Wilson", "vice-président"),
("Daniel", "Harris", "trésorier adjoint"),
("Emma", "Martinez", "secrétaire adjointe"),
("Matthew", "Garcia", "président"),
("Ava", "Lopez", "trésorier"),
("Ryan", "Gonzalez", "secrétaire"),
("Isabella", "Rodriguez", "vice-président"),
("Ethan", "Hernandez", "trésorier adjoint"),
("Mia", "Brown", "secrétaire adjointe"),
("Christopher", "Smith", "président"),
("Sofia", "Lee", "trésorier"),
("Aiden", "Johnson", "secrétaire"),
("Amelia", "Clark", "vice-président"),
("Grace", "Taylor", "trésorier adjoint"),
("Elijah", "Martinez", "secrétaire adjointe");