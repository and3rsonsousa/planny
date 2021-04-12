import { useApp } from "../utility/AppContext";

const Flyover = ({
  item,
  triggerDelete,
  triggerUpdate,
  triggerDone,
  popupType,
}) => {
  if (!item) return "Sem item";
  const { id } = item;
  const { useLoading, useVisible, toUpdate, usePopup, setToUpdate } = useApp();
  const [loading, setLoading] = useLoading;
  const [visible, setVisible] = useVisible;
  const [popup, setPopup] = usePopup;

  const handleDelete = async (id) => {
    if (window.confirm("Deletar esse item?")) {
      setLoading(1);
      const deletedItem = await triggerDelete(id);
    }
  };

  const showUpdateForm = () => {
    if (!toUpdate) {
      setPopup(popupType);
      setToUpdate(id);
      setVisible(true);
    }
    return true;
  };

  return (
    <div className="flyover button-group">
      {/* DONE */}
      {["action"].find((pp) => pp === popupType) ? (
        <button onClick={triggerDone}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ) : (
        ""
      )}
      {/* UPDATE */}
      <button onClick={showUpdateForm}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-3"
        >
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
      {/* DELETE */}
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
