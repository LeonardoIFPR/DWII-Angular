# 💼 Meu Portfólio - Angular & PHP API

Este é um projeto de portfólio pessoal desenvolvido em Angular, criado com o objetivo de apresentar minhas habilidades, projetos desenvolvidos e trajetória profissional. A aplicação consome uma API dinâmica desenvolvida em PHP para listagem de projetos e tecnologias.

---

## 🛠️ Ambiente de Desenvolvimento (Reprodutibilidade)

Para garantir que o projeto execute exatamente da mesma forma em qualquer máquina, as seguintes versões de ferramentas foram utilizadas no desenvolvimento:

* **Node.js:** `v24.14.0`
* **Package Manager (npm):** `11.9.0`
* **Angular CLI:** `21.2.13`
* **Framework Principal:** Angular 21
* **PHP (Backend):** `v8.3.6`
* **Banco de Dados:** MariaDB `10.11.14`

---

## 📦 Configuração do Banco de Dados (MariaDB)

Antes de rodar a API, acesse o terminal do seu banco de dados e execute o script abaixo para criar o banco de dados `dwii_db` e as tabelas necessárias:

```sql
CREATE DATABASE dwii_db;
USE dwii_db;

CREATE TABLE projetos (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    descricao TEXT NOT NULL,
    tecnologias VARCHAR(200) NOT NULL,
    link_github VARCHAR(300) NULL DEFAULT NULL,
    ano YEAR NOT NULL,
    status ENUM('rascunho','publicado','arquivado') NOT NULL DEFAULT 'rascunho',
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE tecnologias (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    descricao TEXT,
    ano_criacao INT,
    status ENUM('ativo','inativo') NOT NULL DEFAULT 'ativo',
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


## 🎯 Autoavaliação
Conceito pretendido: A

Justificativa (cite o arquivo de cada critério):
- Consumo da API (Projetos): projeto.service.ts (GET) + projetos.ts (subscribe)
- Catalogo + botao GitHub: tecnologia.service.ts + projetos.html (mat-card-actions)
- Boas praticas: a URL/HTTP fica no service; o componente so exibe
- Acho que fui bem, busco o conceito A nesta atividade minhas alterações nos arquivos para isso foram o uso do async para fazer com que carregase os dados sem ter que clicar no link 2 vezes e um if else nos arquivos para mostrar uma determinada mensagem caso não haja projetos ou tecnologias cadastradas 

### aula 22:a API le o banco  

antes de subir o Banco o MARIADB precisa estar de pe 

    sudo service mariadb start
    cd api-node
    node server.js

Rotas que leem do "dwii_db"

    curl -i http://localhost:3000/api/projetos
    curl -i http://localhost:3000/api/projetos/5
    curl -i http://localhost:3000/api/tecnologias


### Aula 23: a API cria, altera e apaga

A API em uso e a de `api-node/`. Os arquivos `api/*.php` e `conexao.php` ficam no
repositorio como historico do 2o trimestre.

    curl -i -X POST http://localhost:3000/api/projetos -H "Content-Type: application/json" -d '{"nome":"Projeto de teste","ano":2026}'
    curl -i -X PUT http://localhost:3000/api/projetos/7 -H "Content-Type: application/json" -d '{"nome":"Projeto de teste (editado)","ano":2026}'
    curl -i -X DELETE http://localhost:3000/api/projetos/7

### Aula 24: a tranca

Quem escreve precisa de um token. Antes do primeiro uso, crie a tabela e o dono:

    sudo mariadb dwii_db < sql/usuarios.sql
    cd api-node
    npm install
    node criar-usuario.js dono@portfolio.dev portfolio2026

Login e escrita com o token:

    curl -i -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"email":"dono@portfolio.dev","senha":"portfolio2026"}'
    curl -i -X POST http://localhost:3000/api/projetos -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"nome":"Projeto com tranca","ano":2026}'
    curl -i -X PUT http://localhost:3000/api/projetos/8 -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"nome":"Projeto com tranca (editado)","ano":2026}'


### Aula 24: melhorias na API e autenticação

Alterações para melhorar a segurança e o funcionamento da API.

- Adicionamos `try/catch` no GET por ID para tratar erros do servidor com status 500.
- Criamos o GET `/api/projetos/todos`, que permite visualizar projetos publicados e rascunhos somente com token.
- Protegemos os DELETE de projetos e tecnologias usando `autenticar`.
- Adicionamos o `COALESCE` no PUT para permitir alterar o status do projeto e manter o antigo caso não seja enviado outro.
- Alteramos a validade do JWT de 2h para 1h para diminuir o tempo de utilização caso o token seja roubado.
- Adicionamos quatro comentários sobre o `SEGREDO` e a Aula 29 no `server.js`.
- O login retorna uma única resposta porque usamos `return` nos erros, interrompendo a função antes que outra resposta seja enviada.

### Como rodar a API do zero

Primeiro iniciamos o banco, executamos `setup.sql` e `usuarios.sql`, instalamos as dependências e criamos o usuário.

Na raiz do repositório:

```bash
sudo service mariadb start
sudo mariadb < portfolio-angular/sql/setup.sql
sudo mariadb dwii_db < portfolio-angular/sql/usuarios.sql
cd portfolio-angular/api-node
npm install
```

Criamos o administrador com nosso próprio email e senha, sem publicar a senha no GitHub.

```bash
read -r -p "Email: " EMAIL
read -r -s -p "Senha: " SENHA
echo
node criar-usuario.js "$EMAIL" "$SENHA"
unset EMAIL SENHA
node server.js
```

### Testes das alterações

Os resultados abaixo são exemplos esperados e precisam ser conferidos no terminal.

**GET público:**

```bash
curl -i http://localhost:3000/api/projetos
# HTTP/1.1 200 OK
# Corpo: [{"id":1,"nome":"Projeto publicado",...}]
```

**GET por ID inexistente:**

```bash
curl -i http://localhost:3000/api/projetos/99999
# HTTP/1.1 404 Not Found
# Corpo: {"erro":"projeto não encontrado"}
```

**POST, PUT e DELETE de projetos:**

Usamos o token recebido no login e o ID retornado pelo POST.

```bash
TOKEN="COLE_SEU_TOKEN"
ID=7

curl -i -X POST http://localhost:3000/api/projetos -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"nome":"Teste","ano":2026}'
# HTTP/1.1 201 Created
# Corpo: {"id":7}

curl -i -X PUT http://localhost:3000/api/projetos/$ID -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"nome":"Teste editado","ano":2026,"status":"publicado"}'
# HTTP/1.1 200 OK
# Corpo: {"mensagem":"Projeto atualizado"}

curl -i -X DELETE http://localhost:3000/api/projetos/$ID -H "Authorization: Bearer $TOKEN"
# HTTP/1.1 204 No Content
# Corpo: vazio
```

**POST, PUT e DELETE de tecnologias:**

```bash
curl -i -X POST http://localhost:3000/api/tecnologias -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"nome":"Teste","categoria":"Backend"}'
# HTTP/1.1 201 Created
# Corpo: {"id":8}

curl -i -X PUT http://localhost:3000/api/tecnologias/8 -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"nome":"Teste editado","categoria":"Backend"}'
# HTTP/1.1 200 OK
# Corpo: {"mensagem":"Tecnologia atualizado"}

curl -i -X DELETE http://localhost:3000/api/tecnologias/8 -H "Authorization: Bearer $TOKEN"
# HTTP/1.1 204 No Content
# Corpo: vazio
```

### Os 7 testes da tranca

**1. Login sem dados:**

```bash
curl -i -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{}'
# HTTP/1.1 400 Bad Request
# Corpo: {"erro":"Informe email e senha"}
```

**2. Login incorreto:**

```bash
curl -i -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"email":"inexistente@teste.com","senha":"errada"}'
# HTTP/1.1 401 Unauthorized
# Corpo: {"erro":"Email e senha invalidos"}
```

**3. Login correto:**

```bash
curl -i -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"email":"SEU_EMAIL","senha":"SUA_SENHA"}'
# HTTP/1.1 200 OK
# Corpo: {"token":"TOKEN_GERADO"}
```

**4. GET privado sem token:**

```bash
curl -i http://localhost:3000/api/projetos/todos
# HTTP/1.1 401 Unauthorized
# Corpo: {"erro":"Token ausente"}
```

**5. GET privado com token inválido:**

```bash
curl -i http://localhost:3000/api/projetos/todos -H "Authorization: Bearer invalido"
# HTTP/1.1 401 Unauthorized
# Corpo: {"erro":"Token invalido ou expirado"}
```

**6. GET privado com token válido:**

```bash
curl -i http://localhost:3000/api/projetos/todos -H "Authorization: Bearer $TOKEN"
# HTTP/1.1 200 OK
# Corpo: [{"id":1,"nome":"Teste","status":"rascunho",...}]
```

**7. DELETE sem token:**

```bash
curl -i -X DELETE http://localhost:3000/api/projetos/1
# HTTP/1.1 401 Unauthorized
# Corpo: {"erro":"Token ausente"}
```

### Rotas e autenticação

| Rota                | Verbo  | Token |
| ------------------- | ------ | ----- |
| /api/projetos       | GET    | Não   |
| /api/projetos/      | GET    | Não   |
| /api/projetos/todos | GET    | Sim   |
| /api/projetos       | POST   | Sim   |
| /api/projetos/      | PUT    | Sim   |
| /api/projetos/      | DELETE | Sim   |
| /api/tecnologias    | GET    | Não   |
| /api/tecnologias    | POST   | Sim   |
| /api/tecnologias/   | PUT    | Sim   |
| /api/tecnologias/   | DELETE | Sim   |
| /api/login          | POST   | Não   |

### O que esta API ainda não faz

- Não possui recuperação de senha por email.
- Não permite invalidar individualmente um token JWT antes de ele expirar.

### GitHub

Adicionamos `.gitignore` com `node_modules/` e retiramos as dependências do versionamento.
