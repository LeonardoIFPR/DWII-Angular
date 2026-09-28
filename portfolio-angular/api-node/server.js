const express = require("express");
const cors = require("cors");
const pool = require("./db")

const app = express();
const PORTA = 3000;

app.use(cors());

app.get("/api/projetos", async (req, res) => {
    try {
    const sql = "select id , nome, descricao, link_github, ano from projetos where status = 'publicado' order by ano desc, id";
    const [projetos] = await pool.query(sql);
    res.json(projetos)
    } catch (erro) {
        res.status(500).json({ erro: "falha no servidor" + erro.message});
    }
});

app.get("/api/tecnologias", async (req, res) => {
    try {
    const sql = "select id , nome, categoria, descricao, ano_criacao from tecnologias where status = 'ativo' order by categoria, nome";
    const [tecnologias] = await pool.query(sql);
    res.json(tecnologias)
    } catch (erro) {
        res.status(500).json({ erro: "falha no servidor" + erro.message});
    }
});


app.get("/api/projetos/:id", async (req, res) => {
    const sql = "select id , nome, descricao, link_github, ano from projetos where id = ? and status = 'publicado'";
    const [linhas] = await pool.execute(sql, [req.params.id]);
    if (linhas.length === 0) {
        return res.status(404).json({ erro: "projeto não encontrado"});
    }
    res.json(linhas[0]);
});


app.listen(PORTA, () => {
     console.log("API rodando na porta http://localhost:" + PORTA);
});

const projetos = [
    {
    id: 1,
    nome: "portfolio-angular",
    descricao: "Meu portfolio com angular e angular material",
    tecnologias: "Angular,TypeScript",
    link_github: "https://github.com/LeonardoIFPR/DWII-Angular",
    ano: 2026
    },
    {
    id: 2,
    nome: "API do projeto em PHP",
    descricao: "endpoins do projeto e catalogo com PDO e MariaDB",
    tecnologias: "`PHP, MariaDB`",
    link_github: null,
    ano: 2026
    },
    {
    id: 3,
    nome: "Sistema de Cadastro v1",
    descricao: "CRUD em PHP do 1 trimestre",
    tecnologias: "PHP, MariaDB, BootsTrap",
    link_github: null,
    ano: 2026
    },
    
]