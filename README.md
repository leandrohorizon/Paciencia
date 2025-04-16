# Paciência

Um jogo de Paciência clássico desenvolvido em JavaScript puro, sem dependências externas.

![Preview do Jogo](https://user-images.githubusercontent.com/67444676/131235707-cec0a0b2-6ef6-4e7d-93af-dda6fb576d76.png)

## 🎮 Sobre o Jogo

Paciência é um jogo de cartas solitário onde o objetivo é organizar todas as cartas em sequência decrescente e alternando cores (vermelho e preto) nas mesas, e em sequência crescente do mesmo naipe nas casas.

## 🚀 Como Jogar

1. Acesse https://leandrohorizon.github.io/Paciencia/
2. Clique nas cartas para movê-las
3. Arraste e solte cartas para organizá-las
4. Duplo clique em uma carta para movê-la automaticamente para uma casa válida
5. Clique no deck para virar novas cartas

## 🛠️ Tecnologias Utilizadas

- JavaScript Vanilla (ES6+)
- HTML5
- CSS3

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura modular baseada em componentes, implementando os seguintes padrões de design:
- Module Pattern
- Singleton Pattern
- Factory Pattern
- Observer Pattern

## 📁 Estrutura do Projeto

```
├── scripts/
│   ├── card/         # Componente de carta
│   ├── slot/         # Componente de slots (mesas e casas)
│   ├── historic/     # Componente de histórico
│   ├── game/         # Lógica principal do jogo
│   ├── globals.js    # Estado global
│   └── main.js       # Ponto de entrada
├── css/              # Estilos do jogo
├── assets/           # Recursos visuais
└── index.html        # Página principal
```
