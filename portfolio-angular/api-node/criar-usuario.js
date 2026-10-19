const bcrypt = require("bcryptjs");
const pool = require("./db");

async function criar () {
    const email = process.argv[2]
    const senha = process.argv[3]
    if (!email || !senha) {
        console.log("Uso: node criar-usuarios.js email senha")
        return
    }

    const hash = await bcrypt.hash(senha, 10);
    const [resultado] = await pool.execute("insert into usuarios (email, senha_hash) values (?, ?)", [email, hash]);
    console.log("usuario " + resultado.insertId + " criado " + email);
    await pool.end();
}

criar()