# Task Manager

Une application de gestion de tâches moderne et responsive construite avec React, TypeScript et Tailwind CSS.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- **Node.js** (version 16 ou supérieure)
- **npm** (fourni avec Node.js)

Vérifiez vos versions :
```bash
node --version
npm --version
```

## Installation et Lancement

### 1. Cloner ou télécharger le projet

```bash
git clone https://github.com/ashandcompany/task-manager.git
cd task-manager
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer l'application en mode développement

```bash
npm run dev
```

L'application sera accessible à l'adresse : **http://localhost:5173**

> Le serveur de développement supporte le rechargement à chaud (HMR). Vos modifications seront visibles instantanément dans le navigateur.

## Autres commandes utiles

### Build pour la production
```bash
npm run build
```
Crée une version optimisée du projet dans le dossier `dist/`.

### Prévisualiser la version production
```bash
npm run preview
```
Permet de tester la version build localement avant le déploiement.

### Vérifier la qualité du code
```bash
npm run lint
```
Exécute ESLint pour détecter les erreurs et les problèmes de style.

## Fonctionnement et Utilisation

### Vue d'ensemble
Task Manager est une application pour gérer les tâches quotidiennes. Elle permet de créer, modifier, supprimer et organiser des tâches selon leur priorité, catégorie et date limite.

### Fonctionnalités principales

#### 1. **Ajouter une tâche**
- Cliquez sur le bouton **"+ Ajouter"** en haut à droite
- Une modal s'ouvre avec le formulaire de création
- Remplissez les champs suivants :
  - **Description** : Le titre/description de votre tâche
  - **Priorité** : Choisissez entre Basse, Moyenne ou Haute
  - **Catégorie** : Sélectionnez Travail, Personnel ou Urgent
  - **Date limite** : Définissez la date d'échéance
- Cliquez sur **"Ajouter"** pour créer la tâche

#### 2. **Modifier une tâche**
- Cliquez sur le menu (⋮) à droite de la tâche
- Sélectionnez **"Modifier"**
- Changez les informations souhaitées
- Cliquez sur **"Modifier"** pour valider les changements

#### 3. **Supprimer une tâche**
- Cliquez sur le menu (⋮) à droite de la tâche
- Sélectionnez **"Supprimer"**
- La tâche est immédiatement supprimée

#### 4. **Filtrer par catégorie**
- Utilisez le bouton **"Filtrer par catégorie"** en haut
- Choisissez une catégorie pour afficher uniquement les tâches de cette catégorie
- Sélectionnez **"Toutes les catégories"** pour afficher toutes les tâches

#### 5. **Trier par date limite**
- Cliquez sur le bouton **"Trier par date limite"**
- Les tâches sont triées en ordre croissant ou décroissant
- Un indicateur montre le nombre de jours restants avant l'échéance

### Interface et affichage

**Chaque tâche affiche :**
- La description et la catégorie
- Un badge de priorité coloré :
  - **Rose foncé** = Priorité Haute
  - **Rose** = Priorité Moyenne
  - **Rose clair** = Priorité Basse
- Le temps restant avant la date limite
  - Exemples : "5 jours restants", "Dernier jour", "Expiré"
- ⋮ Un menu d'actions (Modifier / Supprimer)

### Conseils d'utilisation

- **Organisez vos tâches** : Utilisez les catégories pour regrouper les tâches par type
- **Priorisez** : Réglez la priorité pour identifier rapidement ce qui est urgent
- **Suivez les délais** : Consultez régulièrement le temps restant pour ne pas manquer vos échéances
- **Filtrez intelligemment** : Utilisez les filtres pour vous concentrer sur une catégorie spécifique
- **Triez efficacement** : Organisez vos tâches par date pour voir les plus urgentes en premier

### Responsive et Mobile
L'application s'adapte à tous les écrans :
- **Mobile** : Interface optimisée avec navigation tactile
- **Desktop** : Affichage complet avec tous les détails visibles
- **Tablette** : Mise en page flexible

## Stack technologique

- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Bundler et serveur de développement
- **Tailwind CSS** - Framework CSS utilitaire
- **Lucide React** - Icônes
- **ESLint** - Linting et qualité de code

## Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── ModalWrapper.tsx
│   └── TaskFormFields.tsx
├── App.tsx             # Composant principal
├── App.css             # Styles globaux
├── TaskForm.tsx        # Formulaire des tâches
├── TaskList.tsx        # Liste des tâches
├── types.ts            # Définitions TypeScript
└── main.tsx            # Point d'entrée de l'application
public/                 # Fichiers statiques
```

## Développement

### Mode développement
```bash
npm run dev
```
Démarre le serveur Vite avec HMR activé pour un développement rapide.

### Vérifier les types TypeScript
```bash
npx tsc
```

## Déploiement

1. Générez la build de production :
```bash
npm run build
```

2. Les fichiers optimisés se trouvent dans le dossier `dist/`

3. Déployez le contenu du dossier `dist/` sur votre serveur d'hébergement.