const express = require("express");
const cors = require("cors");
const pool = require("./db")

const app = express();
const PORTA = 3000;

app.use(cors());
app.use(express.json())

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

app.post("/api/projetos", async (req, res) => {
    try {
        const dados = req.body;
        console.log(dados);
        if (!dados || !dados.nome) {
            return res.status(400).json({ erro: "Informe pelo menos o nome do projeto "});
        }
        const sql = "insert into projetos (nome, descricao, tecnologias, link_github, ano, status) values (?, ?, ?, ?, ?, ?)";
        const [resultado] = await pool.execute(sql, [
            dados.nome, dados.descricao ?? "", dados.tecnologias ?? "", dados.link_github ?? "", dados.ano ?? new Date().getFullYear(), "publicado"
        ]);
        res.status(201).json({id: resultado.insertId });
    } catch (erro) {
        res.status(500).json({ erro: "falha no servidor: " + erro.message})
    };
});

app.put("/api/projetos/:id", async (req, res) => {
    try {
        const dados = req.body;
        if (!dados || !dados.nome) {
            return res.status(400).json({ erro: "Informe pelo menos o nome do projeto"});
        }
        const sql = "update projetos set nome=?, descricao=?, tecnologias=?, link_github=?, ano=? where id=?";
        const [resultado] = await pool.execute(sql, [
            dados.nome, dados.descricao ?? "", dados.tecnologias ?? "", dados.link_github ?? "", dados.ano ?? new Date().getFullYear(), req.params.id
        ]);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "projeto não encontrado" });
        }
        res.json({ mensagem: "Projeto atualizado" });
    } catch (erro) {
        res.status(500).json({ erro: "Falha no servidor: " + erro.message})
    };
});

app.delete("/api/projetos/:id", async (req, res) => {
    try {
        const [resultado] = await pool.execute("delete from projetos where id = ?", [req.params.id]);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Projeto n~ão encontrado" });
        }
        res.status(204).end();
    }catch (erro) {
        res.status(500).json({ erro: "Falha no servidor" + erro.message})
    };
});


app.post("/api/tecnologias", async (req, res) => {
    try {
        const dados = req.body;
        console.log(dados);
        if (!dados || !dados.nome) {
            return res.status(400).json({ erro: "Informe pelo menos o nome de uma tecnologia "});
        }
        const sql = "insert into tecnologias (nome, categoria, descricao, ano_criacao) values (?, ?, ?, ?)";
        const [resultado] = await pool.execute(sql, [
            dados.nome, dados.descricao ?? "", dados.descricao ?? "", dados.ano_criacao ?? new Date().getFullYear()
        ]);
        res.status(201).json({id: resultado.insertId });
    } catch (erro) {
        res.status(500).json({ erro: "falha no servidor: " + erro.message})
    };
});

app.put("/api/tecnologias/:id", async (req, res) => {
    try {
        const dados = req.body;
        if (!dados || !dados.nome) {
            return res.status(400).json({ erro: "Informe pelo menos o nome da tecnologia"});
        }
        const sql = "update tecnologias set nome=?, categoria=?, descricao=?, ano_criacao=? where id=?";
        const [resultado] = await pool.execute(sql, [
            dados.nome, dados.categoria ?? "", dados.descricao ?? "", dados.ano ?? new Date().getFullYear(), req.params.id
        ]);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "projeto não encontrado" });
        }
        res.json({ mensagem: "Tecnologia atualizado" });
    } catch (erro) {
        res.status(500).json({ erro: "Falha no servidor: " + erro.message})
    };
});

app.delete("/api/tecnologias/:id", async (req, res) => {
    try {
        const [resultado] = await pool.execute("delete from tecnologias where id = ?", [req.params.id]);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "tecnologia não encontrada" });
        }
        res.status(204).end();
    }catch (erro) {
        res.status(500).json({ erro: "Falha no servidor" + erro.message})
    };
});

app.post("/api/login", async (req, res) => {
    try {
        const dados = req.body;
        console.log(dados);
        if (!dados || !dados.usuario || !dados.senha) {
            return res.status(400).json({ erro: "Informe o Usuario ou Senha"});
        };

        const usuarioCorreto = "Admin";
        const senhaCorreta = "24446666688888888";

        if (usuarioCorreto === dados.usuario && senhaCorreta === dados.senha){
            return res.status(200).json({ status: "Credenciais validas" });
        } else {
             return res.status(401).json({ erro: "Credenciais inválidas" });
        }
    } catch (erro) {
        res.status(500).json({ erro: "Falha no servidor: " + erro.message });

    }
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