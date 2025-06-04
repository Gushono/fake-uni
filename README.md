# 🎓 Portal Universitário - Faculdade Wyden

Um portal universitário completo desenvolvido em React, apresentando as funcionalidades essenciais de um sistema acadêmico moderno.

## 🚀 Funcionalidades

- **Sistema de Autenticação** com múltiplos tipos de usuário
- **Dashboard Personalizado** para estudantes, professores e administradores
- **Carteirinha Virtual** com dados completos e funcionalidade de impressão
- **Gestão Acadêmica** com notas, disciplinas e informações do curso
- **Interface Responsiva** com design moderno e profissional

## 👥 Usuários de Teste

### 🎒 **Estudantes**
- **gustavo.honorato@aluno.wyden.edu.br** - Gustavo Honorato Nicolau (Sistemas de Informação)
- **joao.silva@aluno.wyden.edu.br** - João Silva Santos (Sistemas de Informação)
- **guilherme.batista@aluno.wyden.edu.br** - Guilherme Batista Silva (Administração)
- **daniel.bersi@aluno.wyden.edu.br** - Daniel Bersi Oliveira (Marketing)
- **eduardo.henrique@aluno.wyden.edu.br** - Eduardo Henrique Santos (Direito)
- **fabio.henrique@aluno.wyden.edu.br** - Fábio Henrique Costa (Psicologia)

### 👨‍🏫 **Staff**
- **maria.santos@wyden.edu.br** - Prof. Maria Santos (Departamento de Tecnologia)
- **carlos.admin@wyden.edu.br** - Carlos Admin (Administração Acadêmica)

## 📸 Sistema de Fotos dos Usuários

O sistema agora suporta fotos personalizadas para cada usuário através de caminhos dinâmicos:

### 📁 **Estrutura de Fotos**
```
public/photos/
├── gustavo-honorato.jpg     # Gustavo Honorato Nicolau
├── joao-silva.jpg          # João Silva Santos
├── guilherme-batista.jpg   # Guilherme Batista Silva
├── daniel-bersi.jpg        # Daniel Bersi Oliveira
├── fabio-henrique.jpg      # Fábio Henrique Costa
└── maria-santos.jpg        # Prof. Maria Santos
```

### 🔧 **Como Adicionar Fotos**

1. **Coloque sua foto** na pasta `public/photos/`
2. **Nomeie o arquivo** exatamente como especificado nos mocks
3. **Formato recomendado**: JPG/PNG, 300x400px, máx 2MB

```bash
# Exemplo para adicionar sua foto, Gustavo:
cp sua-foto.jpg public/photos/gustavo-honorato.jpg

# Exemplo para outros usuários:
cp foto-joao.jpg public/photos/joao-silva.jpg
```

### ⚙️ **Configuração nos Mocks**

Cada usuário tem configuração específica em `user-mocks.js`:
```javascript
{
    hasPhoto: true,                           // Ativa/desativa foto
    photoPath: 'photos/gustavo-honorato.jpg' // Caminho específico
}
```

### 🔄 **Fallback Automático**
- Se a foto não existir → Mostra ícone de usuário
- Interface nunca quebra
- Sistema funciona com ou sem fotos

### 👥 **Status das Fotos**
- **✅ Com foto**: Gustavo, João, Guilherme, Daniel, Fábio, Prof. Maria
- **❌ Sem foto**: Eduardo Henrique, Carlos Admin

## 🖥️ Como Executar

### Opção 1: NPM (Recomendado)
```bash
# Instalar dependências (apenas na primeira vez)
npm install

# Iniciar o servidor na porta 8000
npm start

# Ou alternativamente
npm run dev

# Acesse: http://localhost:8000
```

### Opção 2: Servidor Python (Alternativo)
```bash
# Na pasta do projeto
cd public
python3 -m http.server 8000

# Acesse: http://localhost:8000
```

### Opção 3: NPX Direto (Sem instalação)
```bash
# Executa diretamente sem instalar
npx serve -s public -l 8000
```

## 📋 Comandos NPM Disponíveis

```bash
# Desenvolvimento
npm start              # Inicia servidor na porta 8000
npm run dev            # Mesmo que npm start
npm run open           # Inicia servidor e abre no navegador
npm run serve          # Inicia em porta aleatória
npm run serve:port 3000 # Inicia em porta específica

# Utilitários
npm run info           # Mostra informações do projeto
npm run clean          # Limpa e reinstala dependências
npm run build          # Info sobre build (React via CDN)
npm run test           # Info sobre testes
```

## 📁 Estrutura do Projeto

```
fake-university/
├── public/
│   ├── index.html              # Página principal
│   ├── index-offline.html      # Versão offline
│   ├── app.js                  # Aplicação React principal
│   ├── user-mocks.js          # Dados dos usuários
│   ├── styles.css             # Estilos customizados
│   ├── gustavo-photo.jpg      # Foto do Gustavo (adicionar)
│   └── wyden-logo.svg         # Logo da instituição
├── package.json               # Configurações do projeto
└── README.md                  # Este arquivo
```

## 🎨 Recursos Técnicos

- **React 18** via CDN
- **Bootstrap 5** para responsividade
- **Font Awesome 6** para ícones
- **CSS Custom Properties** para temas
- **Sistema de Autenticação** simulado
- **Dados Persistentes** em mocks JavaScript

## 🔐 Sistema de Login

- **Email**: Use qualquer um dos emails listados acima
- **Senha**: Qualquer senha (sistema de demonstração)
- **Redirecionamento**: Automático baseado no tipo de usuário

## 📱 Design Responsivo

- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Otimizado para telas médias
- **Mobile**: Interface adaptada para smartphones

## 🎯 Características Especiais

### 💳 **Carteirinha Virtual**
- Dados dinâmicos do usuário logado
- Frente e verso com informações completas
- QR Code e código de barras
- Funcionalidade de impressão
- Foto personalizada (para Gustavo)

### 📊 **Dashboard Acadêmico**
- Notas e disciplinas em tempo real
- Coeficiente de rendimento (CR)
- Situação acadêmica
- Carga horária cursada/total

### 🎨 **Identidade Visual**
- Cores institucionais da Wyden
- Logo personalizada
- Gradientes e efeitos modernos
- Animações CSS suaves

## 🌐 Navegação

1. **Página Inicial**: Apresentação da instituição
2. **Cursos**: Catálogo de cursos oferecidos
3. **Portal**: Sistema de login
4. **Perfil**: Dados acadêmicos completos (pós-login)
5. **Carteirinha**: Identificação virtual (pós-login)

## 🔧 Personalização

Para personalizar o sistema:

1. **Dados dos usuários**: Edite `public/user-mocks.js`
2. **Estilos**: Modifique `public/styles.css`
3. **Funcionalidades**: Atualize `public/app.js`
4. **Logo**: Substitua `public/wyden-logo.svg`

## 📄 Licença

Este projeto é uma demonstração educacional. Todos os dados são fictícios e destinados apenas para fins de desenvolvimento e apresentação.

---

**Desenvolvido com ❤️ para demonstração de um sistema acadêmico moderno e funcional.** 