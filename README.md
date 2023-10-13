<h3>Este é um projeto de API em Node.js para gerenciar uma lista de livros e usuários.</h3>

## Requisitos

- [X] - Cadastro de usuário (name, password, email)
- [X] - Cadastro de livro (name, author, company, read, dateRead, description, rate)
- [x] - Listagem de livros do usuário
- [x] - Atualizar usuário
- [x] - Deletar livro
- [x] - Deletar usuário
- [x] - Edição e inserir notas para o livro

## Regras de negócio

- [X] - Não é possível cadastrar um usuário com email já existente
- [X] - Não é possível cadastrar mesmo livro
- [X] - Não é possível deletar uma conta inexistente
- [x] - Não é possível deletar um livro inexistente
- [X] - Não posso atribuir nenhuma nota ao livro que não foi lido
- [x] 	- Não posso atribuir nota para um livro que não foi lido

## Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript
- MongoDB
- JWT para autenticação de usuário

##  Como baixar o projeto

```bash
    # Clonar o repositório
    $ git clone https://github.com/jailtonmendes/book-api-node-mongo-db

    # Entrar no diretório
    $ cd book-api-node-mongo-db

    # Instalar as dependências
    $ yarn install

    # Iniciar o projeto
    $ yarn dev
```