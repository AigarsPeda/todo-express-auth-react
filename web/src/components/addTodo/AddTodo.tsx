import React, { useState } from "react";
import { connect } from "react-redux";
import AddIcon from "../../icons/AddIcon";
import { addNewTodo } from "../../redux/actions/todos";
import { RootState } from "../../redux/reducers";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const AddTodo: React.FC<Props> = (props) => {
  const { token, addNewTodo } = props;
  const [newTodo, setNewTodo] = useState({
    description: ""
  });
  const [tags, setTags] = useState<string[]>([]);
  // let tags: string[] = [];

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

    // console.log(e.target.checked);
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
        <label htmlFor="home">Home</label>
        <input
          type="checkbox"
          checked={isChecked("home")}
          onChange={handleChangeChk}
          value="home"
        />
        <label htmlFor="fun">Fun</label>
        <input
          type="checkbox"
          checked={isChecked("fun")}
          onChange={handleChangeChk}
          value="fun"
        />
        <label htmlFor="work">Work</label>
        <input
          type="checkbox"
          checked={isChecked("work")}
          onChange={handleChangeChk}
          value="work"
        />
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
