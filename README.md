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