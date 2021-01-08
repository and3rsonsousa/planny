import { useApp } from "../utility/AppContext";

const Flyover = ({ id, deleteAction, updateAction }) => {
  const { useLoading, useVisible, toUpdate, setToUpdate } = useApp();
  const [loading, setLoading] = useLoading;
  const [visible, setVisible] = useVisible;

  const handleDelete = async (id) => {
    if (window.confirm("Deletar esse item?")) {
      setLoading(1);
      const deletedItem = await deleteAction(id);
    }
  };

  const handleUpdate = () => {
    if (!toUpdate) {
      setToUpdate(id);
      setVisible(true);
    }
    return true;
  };

  return (
    <div className="flyover button-group">
      <button onClick={handleUpdate}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-3"
        >
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
      <button onClick={() => handleDelete(id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-3"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Flyover;
