# 🏥 Clínica Vida Plena — Cadastro de Pacientes

Sistema web simples para cadastro de pacientes de uma clínica médica, desenvolvido como projeto de estudo com **HTML5**, **CSS3** e **JavaScript**, utilizando o framework **Bootstrap** para estilização e responsividade.

## 📋 Sobre o projeto

O projeto é composto por duas telas principais:

- **`index.html`** — Tela de login/usuário. Ainda não está integrada com autenticação real (sem verificação de nome de usuário/senha), mas conta com um botão que direciona para a tela de cadastro de pacientes.
- **`cadastro.html`** — Formulário completo de cadastro de pacientes, dividido em cards temáticos, com validação de campos, preenchimento automático de endereço via CEP e listagem dos pacientes cadastrados.

Ambas as telas são **100% responsivas**, adaptando-se a celulares, tablets e desktops.

## ✨ Funcionalidades

**Tela de login (`index.html`)**
- Interface de acesso do usuário (login ainda não integrado a um backend/autenticação real)
- Botão de acesso que direciona para a tela de cadastro de pacientes
- Layout responsivo

**Tela de cadastro (`cadastro.html`)**
- **Cadastro completo do paciente**, dividido em seções:
  - Dados pessoais (nome, nascimento, sexo, documento, estado civil)
  - Endereço e contato (CEP, rua, número, bairro, cidade, e-mail, telefones)
  - Dados médicos (SUS, convênio, carteirinha, médico responsável, observações)
  - Envio de documentos (RG, carteirinha do convênio, exames)
- **Busca automática de endereço pelo CEP** (integração com a API ViaCEP)
- **Validação de campos obrigatórios** com feedback visual
- **Mensagens de sucesso/erro** ao enviar o formulário
- **Resumo do último paciente cadastrado**
- **Lista de todos os pacientes cadastrados**, exibida em tabela responsiva
- **Layout responsivo**, adaptado para dispositivos móveis, tablets e desktops

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3 (custom + Bootstrap)
- JavaScript (Vanilla JS)
- [Bootstrap](https://getbootstrap.com/)
- [API ViaCEP](https://viacep.com.br/) — preenchimento automático de endereço

## 📁 Estrutura de pastas

```
clinica-vida-plena/
├── index.html
├── cadastro.html
├── README.md
├── CSS/
│   ├── bootstrap.css
│   └── site.css
├── js/
│   └── script.js
└── imagem/
    ├── vidaplena.png
    └── rodape.png
```

## 🚀 Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/clinica-vida-plena.git
   ```
2. Entre na pasta do projeto:
   ```bash
   cd clinica-vida-plena
   ```
3. Abra o arquivo `index.html` (tela de login) diretamente no navegador — o botão de acesso leva à tela de cadastro (`cadastro.html`). Você também pode usar uma extensão como o **Live Server** (VS Code) para uma melhor experiência de desenvolvimento.

## 📌 Observações

- Este projeto tem fins **educacionais**, sendo desenvolvido para praticar HTML, CSS, JavaScript e integração com API pública.
- A tela de login (`index.html`) ainda não está conectada a um sistema real de autenticação de usuário — funciona apenas como ponto de entrada para a tela de cadastro.
- O envio do formulário de cadastro não se conecta a um backend real; os dados são manipulados apenas no lado do cliente (armazenamento local/em memória via JavaScript).

## 📄 Licença

Este projeto está disponível livremente para fins de estudo e aprendizado.
