import HeaderWrapper from "../components/HeaderWrapper";
import Header from "../components/HeaderWrapper";

const Roadmap = (props) => {
  return (
    <div>
      <HeaderWrapper></HeaderWrapper>
      <div className="p-8">
        <div className="prose">
          <h1 className="font-medium text-gray-600">Roadmap</h1>
          <h3>Geral</h3>
          <ol>
            <li>Inserir rodapé</li>
          </ol>
          <h3>Index</h3>
          <ol>
            <li>Inserir Popup de Edição na página Inicial</li>
            <li>Limitar as ideias visíveis</li>
          </ol>
          <h3>Plan</h3>
          <ol>
            <li>Disponibilizar ideias para cada cliente</li>
          </ol>
          <h3>Flyover</h3>
          <ol>
            <li>Inserir botão DONE.</li>
          </ol>
        </div>
      </div>
      <footer></footer>
    </div>
  );
};

export default Roadmap;
