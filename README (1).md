
# Painel Pessoal - Deploy one-click (Render)

Este repositório contém um protótipo de painel pessoal com login e dados de mercado em tempo real (prototipo usando Twelve Data).
Arquivos:
- server/: backend Node/Express + Socket.io
- web/: frontend React + Vite
- render.yaml: configuração para deploy one-click no Render
- .env.example: variáveis de ambiente

**Atenção:** Não coloque chaves/segredos neste repositório. Preencha variáveis no painel do Render.

Passos rápidos (resumo):
1. Suba este repo para o GitHub (ou use o ZIP fornecido).
2. Crie conta no Render e conecte o GitHub.
3. Use o botão de Deploy (fornecido) ou crie serviços manualmente com render.yaml.
4. Configure variáveis (TWELVE_API_KEY, JWT_SECRET, DATABASE_URL).
5. Faça deploy e acesse o painel.

Veja `INSTRUCOES_PASSO_A_PASSO.md` para instruções detalhadas com imagens e comandos.
