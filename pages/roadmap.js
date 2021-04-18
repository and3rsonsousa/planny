import LayoutWrapper from "../components/LayoutWrapper";

const Roadmap = (props) => {
  return (
    <LayoutWrapper>
      <div className="container mx-auto">
        <div className="p-8">
          <div className="prose">
            <h1 className="font-medium text-gray-600">Roadmap</h1>
            <h3>Geral</h3>
            <ol>
              <li>Fechar popup clicando fora.</li>
              <li>Fechar popup com tecla ESC.</li>
            </ol>
            <h3>Home</h3>
            <ol></ol>
            <h3>Plan</h3>
            <ol></ol>
            <h3>Flyover</h3>
            <ol>
              <li>Inserir botão DONE.</li>
            </ol>
          </div>
        </div>
        <footer></footer>
      </div>
    </LayoutWrapper>
  );
};

export default Roadmap;
