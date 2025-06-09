# 📸 Pasta de Fotos dos Usuários

Esta pasta contém as fotos dos usuários do sistema. Para adicionar uma foto, siga as instruções abaixo:

## 📁 Estrutura de Arquivos

Cada usuário tem um caminho específico definido nos mocks:

### 🎒 **Estudantes**
- **Hugo Bersi**: `hugo-bersi.jpg`
- **João Silva**: `joao-silva.jpg`
- **Guilherme Batista**: `guilherme-batista.jpg`
- **Daniel Bersi**: `daniel-bersi.jpg`
- **Eduardo Henrique**: Sem foto (hasPhoto: false)
- **Fábio Henrique**: `fabio-henrique.jpg`

### 👨‍🏫 **Staff**
- **Prof. Maria Santos**: `maria-santos.jpg`
- **Carlos Admin**: Sem foto (hasPhoto: false)

## 🔧 Como Adicionar uma Foto

1. **Prepare sua foto**:
   - Formato: JPG ou PNG
   - Dimensões ideais: 300x400px (proporção 3:4)
   - Tamanho máximo: 2MB
   - Qualidade: Alta resolução

2. **Renomeie o arquivo** com o nome exato listado acima

3. **Coloque na pasta** `public/photos/`

## 💡 Exemplo

Para adicionar a foto do Hugo:
```bash
# Copie sua foto para a pasta e renomeie
cp minha-foto.jpg public/photos/hugo-bersi.jpg
```

## ⚙️ Configuração nos Mocks

No arquivo `user-mocks.js`, cada usuário tem:
```javascript
{
    hasPhoto: true,           // Indica se tem foto
    photoPath: 'photos/hugo-bersi.jpg'  // Caminho da foto
}
```

## 🔄 Fallback Automático

Se a foto não for encontrada:
- ✅ O sistema mostra automaticamente um ícone de usuário
- ✅ Não quebra a interface
- ✅ Continua funcionando normalmente

## 📋 Lista de Fotos Necessárias

- [ ] `hugo-bersi.jpg` - Hugo Bersi
- [ ] `joao-silva.jpg` - João Silva Santos  
- [ ] `guilherme-batista.jpg` - Guilherme Batista Silva
- [ ] `daniel-bersi.jpg` - Daniel Bersi Oliveira
- [ ] `fabio-henrique.jpg` - Fábio Henrique Costa
- [ ] `maria-santos.jpg` - Prof. Maria Santos

## 🚫 Usuários Sem Foto

Estes usuários estão configurados para não ter foto:
- Eduardo Henrique Santos (pode ser alterado nos mocks)
- Carlos Admin (administrador sem foto)

---

**Nota**: As fotos são opcionais. O sistema funciona perfeitamente sem elas! 