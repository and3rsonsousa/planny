import { useApp } from "../utility/AppContext";
import ClientAvatar from "../components/ClientAvatar";
import Flyover from "../components/Flyover";

export default function Idea({ idea, truncate }) {
  const { useLoading, updateIdea, deleteIdea } = useApp();
  const [loading, setLoading] = useLoading;

  return (
    <div
      className="p-4 bg-gray-50 rounded-lg text-gray-500 text-sm relative flex flyover-parent"
      key={idea.id}
    >
      <div>
        <ClientAvatar client={idea.client} size="small" />
      </div>

      {truncate ? (
        <div className="ml-4 truncate">{idea.title}</div>
      ) : (
        <div className="ml-4">
          <div className="text-xx uppercase text-gray-300 tracking-widest ">
            {idea.client.name}
          </div>

          <div>{idea.title}</div>
        </div>
      )}

      <Flyover
        item={idea}
        triggerDelete={deleteIdea}
        triggerUpdate={updateIdea}
        popupType="idea"
      />
    </div>
  );
}
