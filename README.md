# DOMORIUM

## C'est quoi ?
Domorium est un projet open source qui permettra a n'importe qui d'ajouter une 
touche de technologie pour son aquarium.

Le but de Domorium est de pouvoir consulter en temps réel comment se comporte 
votre aquarium et voir son évolution au fil du temps.

Domorium peut être installé avant ou après la mise en place d'un aquarium.
Si vous installez Domorium avant de mettre en place votre aquarium vous 
pourrez savoir a quel moment vous pouvez ajouter des poissons

## Ce qu'il vous faut
Pour mener à bien ce projet, je vais m'appuyer sur d'autres outils open source 
afin de ne pas avoir à tout réécrire

Dans un premier temps, il vous faudra installer et configurer 
[Home Assistant](https://home-assistant.io/)

Ensuite, nous créerons trois objets connectés, voici la liste de course :
- 1 ESP32 [Lien](https://www.amazon.fr/gp/product/B07Z83H831/ref=ewc_pr_img_1?smid=A1X7QLRQH87QA3&psc=1)
- 1 capteur TDS (Total Dissolved Solids) [Lien](https://www.amazon.fr/gp/product/B08KXRHK7H/ref=ewc_pr_img_3?smid=A22SB6W8K59090&psc=1)
- 1 capteur de pH [Lien](https://www.amazon.fr/gp/product/B081QK9TX2/ref=ewc_pr_img_2?smid=A2KRFTGU6PBCQ4&psc=1)
- 1 capteur de température [Lien](https://www.amazon.fr/gp/product/B01MZG48OE/ref=ewc_pr_img_1?smid=A1X7QLRQH87QA3&psc=1)

## Comment crééer facilement les 3 objets connectés ?
Etant donné que ces 3 objets seront importés dans Home Assistant, nous allons 
utiliser un projet créé lui aussi par Nabu Casa à 
savoir [ESPHome](https://esphome.io/)

Comme vous devez vous en douter dans le nom il y a ESP, ce qui signifie que 
nous utiliserons des ESP32 pour pouvoir créer des composants customs.
Vous les retrouverez dans la liste de courses juste au-dessus.

## Mise en place de l'environnement
Une fois que vous avez installé et configuré Home Assistant, vous allez donc 
installer ESPHome.

Pour ce faire, suivez cette doc : [ICI](https://esphome.io/guides/getting_started_hassio.html)