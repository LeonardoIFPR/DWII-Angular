import { useEffect, useState } from 'react';
import API from './api.js';
import CardProjeto from './CardProjeto.jsx';
import Contato from './Contato.jsx';

function Inicio() {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(API + '/api/projetos');
        const dados = await resposta.json();
        if (!resposta.ok) {
          throw new Error(dados.erro || 'Erro ao carregar projetos');
        }
        setProjetos(dados);
      } catch (falha) {
        setErro(falha.message);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return (
    <>
      <h2>Projetos</h2>
      {carregando && <p>Carregando projetos...</p>}
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
      <Contato />
    </>
  );
}

export default Inicio;