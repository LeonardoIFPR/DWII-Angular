import { Route, Routes } from 'react-router-dom';
import Cabecalho from './Cabecalho.jsx';
import Gestao from './Gestao.jsx';
import Inicio from './Inicio.jsx';
import Rodape from './Rodape.jsx';

function App() {
  return (
    <>
      <Cabecalho />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/gestao" element={<Gestao />} />
        </Routes>
      </main>
      <Rodape />
    </>
  );
}

export default App;
