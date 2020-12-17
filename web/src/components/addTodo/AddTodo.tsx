import React from "react";
import AddIcon from "../../icons/AddIcon";

const AddTodo: React.FC = () => {
  return (
    <div className="add-todo">
      <button>
        <AddIcon />
      </button>
    </div>
  );
};

export default AddTodo;
