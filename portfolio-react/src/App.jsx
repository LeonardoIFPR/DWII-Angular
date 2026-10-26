import Cabecalho from "./Cabecalho";
import CardProjeto from "./CardProjeto";
import Rodape from "./Rodape";

function App() {
  return (
    <>
      <Cabecalho />
      <main>
        <h2>Projetos</h2>
        <div className="cards">
          <CardProjeto
            nome="Portfolio Angular"
            descricao="Meu portfolio Angular e Angular Material."
            tecnologias="Angular, TypeScript"
            link_github="https://github.com/LeonardoIFPR/DWII-Angular"
            ano={2026}
          />
          <CardProjeto
            nome="API do portfolio em PHP"
            descricao="Endpoints de projetos e catalogo com PDO e MariaDB"
            tecnologias="PHP, MariaDB"
            link_github={null}
            ano={2026}
          />
           <CardProjeto
            nome="Sistema de Cadastro v1"
            descricao="CRUD em PHP 1 trimestre"
            tecnologias="PHP, MariaDB, BootStrap"
            link_github={null}
            ano={2026}
          />
        </div>
      </main>
      <Rodape />
    </>
  );
}

export default App;