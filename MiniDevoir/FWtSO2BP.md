# Commentaires sur la visualisation [Four Ways to Slice Obama’s 2013 Budget Proposal](http://www.nytimes.com/interactive/2012/02/13/us/politics/2013-budget-proposal-graphic.html)

- [Explication des différents encodages](#1.-explication-des-différents-encodages)
- [Public visé](#2.-quel-est-le-public-visé?)
- [Questions](#quels-questions-vient-on-à-se-poser-?)
- [Marques, canaux, et interactions](#quels-sont-les-canaux-marques-interactions?)
- [10 principes et leur mise en application](#application-des-10-principaux-principes-de-design)
- [Erreurs de compréhension](#erreurs-faites-en-regardant-la-visualisation)
- [Pros & cons](#points-positifs-et-négatifs)

# 1. Explication des différents encodages
La visualisation permet d'analyser le budget proposé par le président 0bama en 2013 pour l'année. Le budget est dépensé suivant un ligne de conduite à l'année (_discretionnary_), mais aussi en respect avec les lois en vigueur (_mandatory_).
Plusieurs visualisations sont disponibles, et chacune est annotée pour guider l'utilisateur dans la compréhension des données. Deux types d'annotations:
* des informations contextuels supplémentaires,
* un résumé de l'information extrait de l'encodage et des données pour faciliter la compréhension.

### Encodage des données
#### Encodage commun à toutes les visualisations
* Les budgets sont représentées par des bulles de différentes tailles et couleurs.
L'aire de la bulle est proportionnelle à la taille du budget, et la couleur de la bulle suit un dégradé de teintes qui correspond à la variation entre la budget investi pour l'année 2013 et l'année d'avant.
Il est possible de naviguer dans les données, grâce à l'intéraction _hoover on a bubble_; cela nous permet d'obtenir plus d'informations (budget exact, variation par rapport à l'année précédentes, département gérant le budget, nom du budget, type de budget).

#### Encodage pour __All spending__ 
L'axe vertical permet d'ordonner grossièrement les budgets suivant la différence entre l'allocation en 2013 et celle de 2012 pour le même budget.
L'axe horizontal n'apporte aucune information, les données sont centrées afin que leur enveloppe convexe ait la forme d'une bulle aussi.

#### Encodage pour __Types of spending__
Séparation entre les deux types de budgets évoquées précedemment

#### Encodage pour __Changes__
L'axe horizontal encode désormais la catégorie du budget, mais cela est supposé implicite car non mentionné dans la légende. Contrairement aux deux visualisations précédentes, un axe de la variabilité du budget 2012-2013 est ajouté. Cela apporte plus de précision, qui est rendu lisible par l'ajout de ligne horizontal en pointillée pour rapporter le point à sa valeur sur l'axe vertical. 
A noter, seulement les budgets de type _discretionnary_ sont représentées, et cela est expliqué, dans le titre certe, mais aussi en suivant les bulles lors des transitions entre les visualisations.

#### Encodage pour __Department totals__
Les bulles sont maintenant regroupées par département, et une bulle, répondant aux même encodage de taille, MAIS sans couleur, correspondant au profit fait par le département. La variation des recettes par rapport à l'année précédentes est maintenant représenté par une fine ligne autour du disque

# 2. Quel est le public visé
tldr: lecteur du journal, personne lambda  
En se basant sur le postulat que les données exacts (les chiffres) ne sont disponibles qu'en naviguant mais que l'imprécision n'empêche pas d'extraire de l'information, il me semble que cette visualisation soit accessible à tout lecteur du _nytimes_.  
La visualisation semble avoir aussi une certaine temporalité... je m'explique: Aucune information n'est faite à ce propos, mais l'année 2013 correspond à la première année complète du second mandat de Barack Obama, qui s'était fait ré-élire en portant comme projet de réformer complètement le régime de santé. J'imagine donc que la visualisation permet de voir où les moyens ont été mis. Humain de ce monde, en 2017, j'avoue manqué lourdement de contexte pour saisir complètement le but de cette visualisation.
 

# Quels questions vient-on à se poser?
* C'est bien beau de dépenser, mais combien d'argent vont être récupéré? Info disponible dans la dernière visualisation, mais pas de chiffre cumulatif (info existante mais sous-jacente)
* Faire varier les années? Impossible. Encore une fois, sans contexte, il est bien difficile de saisir le sens de la visualisation. Comparé deux mandats d'un même président? Pourquoi ne pas comparer avec les mandats d'un président républicain?
* Quel est le budget associé à l'environnement? Oui, grâce à la dernière visualisation
* Comparer des budgets? Répondu en partie grâce à ... wait for it.. la dernière visualisation.

# Quels sont les canaux-marques-interactions?
## Marques
Les différentes marques sont des __aires__, des __lignes__.
  
## Canaux
Les aires sont stylisées par leur __teinte__, et par la __taile de leur aire__.  
Le choix des teintes est particulièrement bien choisi et cela discrimine bien les données entre elles.  
L'aire aussi est un bon choix, cela permet une bonne amplitude du budget, une ordonnabilité facilement perceptible, au d'une précision.  
La position des bulles est aussi encodée dans la plupart des visualisations.

## Interactions
Deux types d'interactions ici:
* La __navigation__ (au sens de la visualisation de donnée) permet d'explorer les données et d'avoir des informations plus précis à propos des différents budgets
* La __connection__ entre les différentes visualisations est ici principalement esthétique mais permet quand même de comprendre quels données sont présentées à chaque visualisation (exemple de la visu _Changes_ ou la moitié des données disparaissent). Cette connection est proposée à l'utilisateur lorsqu'il clique sur les différents boutons, __reconfigurant__ la disposition des données.

# Application des principaux principes de design
* __Répétition du design__ 
	* Altérée par le choix d'encoder les recettes dans la dernière visualisation; en effet la fine bande de couleur remplace le disque de couleur. Ont-ils voulu le rajouter à la fin?
	* Mise à part cette altération, l'échelle des teintes et des aires reste la même entres les visualisations. Les items (bulles) ne s'adaptent pas aux différentes visualisations, mais c'est les visualisations qui contextualisent les items.
* __Eviter les pie-charts__: evité :)...
* __Alignement__: Oui globalement pas de problème.
* __Proximité des données similaire__: Dans la première visualisation, la disposition horizontale est discutable. 
* __Ratio Encre/Données__: Beaucoup d'encre (animations, mutliples visualisations de données qui utilisent toutes les MEMES données), chacune mettant en avant des attributs différents des données (département, variation du budget).
* __Intégrité graphique__: 
	* La visualisation est assez neutre, rien n'est pointé du doigt implicitement; les données sont là, et l'interprétation est libre. Ici on cherche plus à proposer une exploration, qu'on ne veut passer un message. 
	* La teinte rouge m'évoque un manque, un danger, un drame... mais cela est hautement discutable.
* __Taux de mensonge__: Le déficit représenté par une bulle qui n'est pas à l'échelle globale est trompeur. 

# Erreurs faites en regardant la visualisation
Comme mentionné précédemment, la taille du déficit laisse penser que le déficit est équivalent au budget, ou dans l'autre sens, que le budget est aussi important que le déficit (ce qui serait dément).

# Points positifs et négatifs
## Points négatifs
* Problème d'échelle sur la première visualisation entre le budget alloué et la dette actuel: rapidement on a l'impression que le montant de la dette est égale aux budget pour les centres de santé: FAUX!
* Impossible de chercher par département
* La légende est absente (que représente l'axe horizontale sur la troisième visualisation ?)
* La bulle blanche correspondant aux recettes est un vrai accroc: cela complique la compréhension, et altère le design globale
* Critique facile, mais souvent absente des visualisations: pourquoi ne pas proposer une barre de recherche. Avec cela, va l'impossibilité de suivre un budget au cours des quatre visualisations. 
* Si l'on ne devait en garder qu'une, la dernière ferait l'affaire, les autres sont un plus, mais pas essentielle.
* Manque de mise en context, et par desssus ca, mon intérêt à comprendre le système américain est proche du néant, résultat je ne vois pas vraiment l'intérêt d'avoir choisi ces données.

## Points positifs
* Facilité d'exploitation: Information intéressantes, et même si les visualisations sont globalement redondantes entre elles, leur multiplicité permet d'afficher différentes informations compréhensibles par l'utilisateur de manière aisée, sans avoir à chercher. 


