import React, { useState } from "react";
import { connect } from "react-redux";
import { firstLetterUpper } from "../../helpers/firstLetterUpper";
import { addNewTodo } from "../../redux/actions/todos";
import { RootState } from "../../redux/reducers";

import AddIcon from "../../icons/AddIcon";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const checkboxTags = ["work", "home", "fun"];

const AddTodo: React.FC<Props> = (props) => {
  const { token, addNewTodo } = props;
  const [newTodo, setNewTodo] = useState({
    description: ""
  });
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo((state) => ({
      ...state,
      [name]: value
    }));
  };

  const handleClick = () => {
    if (newTodo.description.trim() === "") {
      return;
    }

    addNewTodo(newTodo.description, tags, token);
    setNewTodo((state) => ({
      ...state,
      description: ""
    }));
    setTags([]);
  };

  const handleChangeChk = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    if (e.target.checked) {
      setTags((sate) => [...sate, e.target.value]);
    } else {
      const newArray = tags.filter((tag) => tag !== e.target.value);
      setTags(newArray);
    }
  };

  const isChecked = (str: string) => {
    return tags.includes(str);
  };

  return (
    <div className="add-todo">
      <input
        type="text"
        name="description"
        value={newTodo.description}
        onChange={handleChange}
        placeholder="Task Title..."
      />
      <div className="add-todo-checkbox">
        {checkboxTags.map((checkboxTag, index) => {
          return (
            <div key={index}>
              <label htmlFor={checkboxTag}>
                {firstLetterUpper(checkboxTag)}
              </label>
              <input
                type="checkbox"
                checked={isChecked(checkboxTag)}
                onChange={handleChangeChk}
                value={checkboxTag}
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={handleClick}
        disabled={newTodo.description.trim() === "" ? true : false}
      >
        <AddIcon />
      </button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  token: state.auth.token
});

const mapDispatchToProps = { addNewTodo };

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
