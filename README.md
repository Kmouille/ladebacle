# La Débâcle

Site web du groupe de rock toulousain La Débâcle.

## Modifier les dates de concert

Éditez `dates.csv` (colonnes : `date,venue,city,link`, date au format `JJ/MM/AAAA`),
puis commit/push. Le tri "À venir" / "Passées" se fait automatiquement par rapport à
la date du jour, pas besoin de déplacer une ligne d'un tableau à l'autre.

## Prévisualiser en local

Ouvrir `index.html` directement (double-clic) ne suffit pas : le chargement de
`dates.csv` est bloqué par le navigateur en `file://`. Depuis le dossier du site :

```
python -m http.server 8000
```

puis ouvrir `http://localhost:8000/index.html`. Une fois publié sur GitHub Pages
(servi en `https://`), ça fonctionne normalement, sans serveur local.

Thanks to [gtcore902](https://gtcore902.github.io/free-rock-band-website-template/)!
