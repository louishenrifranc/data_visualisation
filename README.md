# Introduction
La visualisation de donnée, permet d'explorer des données, de sauvegarder sous un format visuel (image), de rendre des données lisibles, ainsi que de faire passer un message.


# Abstraction et type de donnée
Les types de données bruts peuvent être sous différentes formes: des tables (multidimensionnelles), des graphes, des arbres, des cartes  
Un jeu de donnée est donc formée d'items qui ont des attributs (quantitatifs, qualitatifs, ordonnées, directionnels...), possiblement des lients entre eux

# Marques et données

## _Marque_: 
Ce sont des primitives géométriques tels que des point, des aires, des lignes, des connections
Quelle est la dimensionnalite de la manière dont on représente les données. 1D: points, lines, aires. 2D: conteneur, connection

## _Cannal_:
### Lien avec la marque
La manière de styliser une marque. Par exemple, styliser une marque comme une ligne, peut être fait en rajoutant de la couleur ) la ligne, des aires peuvent être de différentes taille.

### Les différents canaux
Combien d'attributs sont encodées avec ces marques. 
Les canaux les plus utilisés sont:
* la position
* la forme
* la taille
* le volume
* Mais aussi pour la couleur: le ton (hue), la saturation, ou la luminance
[Explication des différences](https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/HSL_color_solid_cylinder_alpha_lowgamma.png/197px-HSL_color_solid_cylinder_alpha_lowgamma.png)  
Le canal choisi doit exprimer toute, et uniquement l'attribut exprimé.  

### Bonne manière
* Des données catégorisables ne doivent pas être encodée avec des canaux catégorisables (encoder chaque pays par des ronds de différentes tailles pourrait laisser entendre que les gros ronds sont plus importants).  
* Le canal le plus efficace est le cannal spatial (mais celui ci est déja utilisé pour représenter les données en elle même).   
* Les canaux longueur et taille sont bonnes à utiliser pour les données 1D, moins bien pour les données 2D, et à éviter pour les données 3D.  
* Ne pas encoder plus de valeurs que le canal ne peut en supporter, sinon il est recommandable de changer de canal.  
* Les humains sont très sensibles aux mouvements, ajouter le mouvement dans un canal est bien (par exemple la force des vents).
* LineChar ou Barchart: Les lignes sous entendent une connexion entre les points. A éviter avec des données catégoriques, ou ordinales
### Définir la bonne utilisation d'un canal
Chaque canal possible remplit certains critères:
* Discriminabilité: peut on faire la différence entre deux canaux
* Associativé: Possibilité de regrouper les marques si les canaux changent
* Précision: Quantifier les différence entre les marques
* Ordonnabilité
* Amplitude


# Principe de design
* Intégrité graphique
* Taux de mensonge: taille de l'effet visuel montré sur le graphique / taille de l'effet dans les données
* Maximiser le rapport données/encre: surface de la viz consacrée aux données / surface totale en encre
* Montrer le contexte
* Haute densité de donnée
* Eviter les pie-charts
* Contraster au maximum: 2 police de caractère max, bie séparer les couleurs, les épaisseurs
* Répetition des choix de design 
* Aligner, et etre maniaque sur l'alignement
* Proximité: regrouper les éléments qui doivent être ensemble.

# Perception
* Perception vs Cognition. La perception consiste à capter l'image, la cognition consiste au traitement de l'image. 
La nuance entre les deux est analogiquement similaire entre entendre et écouter, ou bien voir et regarder.
La rétine est un tapis de capteur (comme le capteur d'une caméra). On a deux types de cellules: cône (couleurs), battonets (lumière, luminance). On a beaucoup de cone rouge, un peu de cône vert et très peu de cone bleu.


# Interaction
La perception force à l'interaction ...(lol)  
Les différents buts de l'interaction sont pour sélectionner, trier, encoder, filtrer, naviguer(montrer des choses différentes + ou - détaillées, connecter).

## Storyboard
Une sorte de manuel d'utilisateur pour répresenter notre interaction

## Donnée multidimensionnelles
Les coordonnées parallèles (techniques qui consistent à représenter chaque dimensions sur un axe vertical, puis pour chaque item, relier les points sur les axes avec des lignes: convient bien avec des données multidensionnelles, mais moins avec un très grand nombre d'item.

## Cartographie
