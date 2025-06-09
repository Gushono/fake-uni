# QR Codes dos Usuários

Este documento descreve os QR codes dos usuários do sistema e suas URLs correspondentes.

## URLs dos QR Codes

Cada QR code direciona para a página pública do usuário com a URL no formato:
`http://localhost:8000/[email]`

### Exemplos de URLs:

- Hugo Bersi: `http://localhost:8000/hugo.bersi@aluno.wyden.edu.br`
- Gustavo Honorato: `http://localhost:8000/gustavo.honorato@aluno.wyden.edu.br`
- João Silva: `http://localhost:8000/joao.silva@aluno.wyden.edu.br`
- Guilherme Batista: `http://localhost:8000/guilherme.batista@aluno.wyden.edu.br`
- Ana Oliveira: `http://localhost:8000/ana.oliveira@prof.wyden.edu.br`
- Carlos Mendes: `http://localhost:8000/carlos.mendes@prof.wyden.edu.br`
- Maria Santos: `http://localhost:8000/maria.santos@prof.wyden.edu.br`
- Pedro Costa: `http://localhost:8000/pedro.costa@prof.wyden.edu.br`
- Ricardo Alves: `http://localhost:8000/ricardo.alves@prof.wyden.edu.br`
- Roberto Lima: `http://localhost:8000/roberto.lima@prof.wyden.edu.br`
- Silvia Martins: `http://localhost:8000/silvia.martins@prof.wyden.edu.br`
- Thiago Pereira: `http://localhost:8000/thiago.pereira@prof.wyden.edu.br`

## Arquivos de QR Code

Os arquivos de QR code estão localizados em `public/photos/`:

- `hugo-qrcode.png` - QR Code do estudante Hugo Bersi
- `gustavo-qrcode.png` - QR Code do estudante Gustavo Honorato
- `joao-qrcode.png` - QR Code do estudante João Silva
- `guilherme-qrcode.png` - QR Code do estudante Guilherme Batista
- `professor-ana-qrcode.png` - QR Code da professora Ana Oliveira
- `professor-carlos-qrcode.png` - QR Code do professor Carlos Mendes
- `professor-maria-qrcode.png` - QR Code da professora Maria Santos
- `professor-pedro-qrcode.png` - QR Code do professor Pedro Costa
- `professor-ricardo-qrcode.png` - QR Code do professor Ricardo Alves
- `professor-roberto-qrcode.png` - QR Code do professor Roberto Lima
- `professor-silvia-qrcode.png` - QR Code da professora Silvia Martins
- `professor-thiago-qrcode.png` - QR Code do professor Thiago Pereira

## Como Gerar um Novo QR Code

Para gerar um novo QR code:

1. Use um gerador de QR code online (como qr-code-generator.com)
2. Insira a URL completa do usuário (ex: `http://localhost:8000/hugo.bersi@aluno.wyden.edu.br`)
3. Baixe o QR code em formato PNG
4. Salve o arquivo em `public/photos/` seguindo o padrão de nomenclatura
5. Atualize este README com a nova informação

## Observações

- Os QR codes devem ser gerados em alta resolução
- O formato recomendado é PNG
- O tamanho recomendado é 200x200 pixels
- Mantenha os nomes dos arquivos em minúsculas e use hífen para separar palavras
- Certifique-se de que os QR codes sejam facilmente escaneáveis
- Teste cada QR code após a geração
- Mantenha um padrão visual consistente entre todos os QR codes
- Verifique se as URLs estão corretas antes de gerar os QR codes
- Atualize este documento sempre que adicionar ou modificar um QR code 