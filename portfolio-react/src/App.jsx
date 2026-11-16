import { useEffect, useState } from "react";
import API from "./api.js";
import Cabecalho from "./Cabecalho";
import Contato from "./Contato";
import CardProjeto from "./CardProjeto";
import Rodape from "./Rodape";

function App() {
  
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useStat("")

  async function buscarProjetos() {
    try{
      const resposta = await fetch(API + "/api/projetos");
      if (!resposta.ok) {
        throw new Error("a API respondeu " + resposta.status)
      }
      const dados = await resposta.json();
      setProjetos(dados);
    } catch{
      setErro("Não deu para carregar os projetos: " + falha.message);
    }
  setCarregando(false)
  }

  useEffect(() => {
  buscarProjetos();
  }, []);
  return (
    <>
      <Cabecalho />
      <main>
        <h2>Projetos</h2>
        {carregando && <p>carregando projetos..p/</p>}
        {erro && <p className="erro">{erro}</p>}
        <div className="cards">
         {projetos.map((p) => (
          <CardProjeto
          key={p.id}
           nome={p.nome}
           descricao={p.descricao}
           tecnologias={p.tecnologias}
           link_github={p.link_github}
           ano={p.ano}
           />
         ))}
        </div>
        <Contato/>
      </main>
      <Rodape />
    </>
  );
}

export default App;