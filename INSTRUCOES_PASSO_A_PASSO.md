
# Instruções passo-a-passo para Deploy (com imagens ASCII simples)

Abaixo estão os passos detalhados para você colocar o site no ar. Eu automatizei tudo que é possível — você só fará cliques/colagens.

## 1) Baixar o ZIP (já fornecido)
- Extraia o ZIP em uma pasta no seu computador.

## 2) Criar um repositório no GitHub e enviar os arquivos (duas opções)

### Opção A — usar GitHub web (mais simples)
1. Vá em https://github.com -> Sign in / Criar conta.
2. Clique em **New repository**.
3. Nomeie (ex: `painel-pessoal`) e **Create repository**.
4. No seu computador abra o terminal na pasta do projeto e rode:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/painel-pessoal.git
git push -u origin main
```
(Substitua a URL por aquela que o GitHub mostrou depois de criar o repo.)

### Opção B — GitHub CLI (um comando)
Se tiver o GitHub CLI instalado e autenticado (`gh auth login`), rode no terminal (na pasta do projeto):
```bash
gh repo create painel-pessoal --public --source=. --push
```
Isto cria o repo e envia tudo automaticamente.

## 3) Criar conta no Render e conectar ao GitHub
1. Acesse https://render.com e crie uma conta (ou faça login).
2. Conecte sua conta GitHub ao Render (Render pedirá autorização para acessar seus repositórios).

## 4) Deploy one-click / manual usando `render.yaml`
- No Render: clique em **New** → **Web Service** → **Connect a repository** → selecione o repositório `painel-pessoal`.
- Para o backend: aponte o serviço para a pasta `server` com `buildCommand: cd server && npm install` e `startCommand: cd server && node index.js`.
- Para o frontend: aponte para `web` com `buildCommand: cd web && npm install && npm run build` e `startCommand: cd web && npm run preview`.
- **Ou** use o botão de Deploy (se preferir; eu gerei um HTML que cria o deploy com um clique — veja `deploy_button.html`).

## 5) Configurar variáveis de ambiente no Render
No painel do Render, para cada serviço (backend/frontend) defina as variáveis abaixo (backend precisa de TWELVE_API_KEY e JWT_SECRET):
- TWELVE_API_KEY = sua chave do Twelve Data (crie em https://twelvedata.com)
- JWT_SECRET = uma senha aleatória
- DATABASE_URL = string de conexão do Postgres (opcional para protótipo)

## 6) Testar localmente (opcional)
Você pode testar local executando o backend e frontend localmente:
Backend:
```bash
cd server
npm install
node index.js
```
Frontend:
```bash
cd web
npm install
npm run dev
```
Abra http://localhost:5173 no navegador.

## 7) Acessar o painel
Após deploy, abra o URL público que o Render fornecer. Crie conta no frontend e entre.

---
Se quiser, eu também gerei scripts e um botão HTML para automatizar a criação do repo + deploy. Se preferir, posso **guiar você por cada clique** — basta dizer se prefere que eu gere imagens reais (screenshots) ou um vídeo curto (posso orientar como criar), mas screenshots exigem que você compartilhe telas — normalmente eu forneço instruções com imagens ASCII + prints automáticos passo a passo.
