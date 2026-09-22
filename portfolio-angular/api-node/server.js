const express = require("express");

const app = express();
const PORTA = 3000;

app.get("/api/projetos", (req, res) => {
    res.send(projetos);
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