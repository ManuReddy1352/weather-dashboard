import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FavoriteCard from "./FavoriteCard";

function SortableFavoriteCard({ city }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: city });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="sortable-wrapper">
      <div className="favorite-card-container">
        <div className="drag-handle" {...attributes} {...listeners}>
          ☰
        </div>
        <FavoriteCard city={city} />
      </div>
    </div>
  );
}

export default SortableFavoriteCard;
