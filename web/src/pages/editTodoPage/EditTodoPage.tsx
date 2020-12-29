import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import BackIcon from "../../icons/BackIcon";
import { RootState } from "../../redux/reducers";
import { ITodo } from "../../types";

interface IParamTypes {
  id: string;
}

const checkboxTags = ["work", "home", "fun"];

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const EditTodoPage: React.FC<Props> = (props) => {
  const { todos } = props;
  const { id } = useParams<IParamTypes>();
  const history = useHistory();
  const [todo, setTodo] = useState<ITodo>({
    completed: false,
    created_on: "",
    description: "",
    id: 0,
    tags: [],
    user_id: 0
  });

  useEffect(() => {
    const foundTodo = todos.find((t) => t.id === parseInt(id));
    if (foundTodo) {
      setTodo(foundTodo);
    }
  }, [todos, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo((state) => ({
      ...state,
      [name]: value
    }));
  };

  const isChecked = (str: string) => {
    return todo.tags.includes(str);
  };

  const handleChangeChk = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    if (e.target.checked) {
      setTodo((state) => ({
        ...state,
        tags: [...todo.tags, e.target.value]
      }));
    } else {
      const newArray = todo.tags.filter((tag) => tag !== e.target.value);
      setTodo((state) => ({
        ...state,
        tags: newArray
      }));
    }
  };

  return (
    <div className="edit-todo-page">
      {console.log(todo.tags)}
      {console.log(todo.description)}
      <input
        type="text"
        name="description"
        value={todo.description}
        onChange={handleChange}
        placeholder="Task Title..."
      />
      <div className="edit-todo-checkbox-container">
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
      <button onClick={() => history.goBack()}>
        <BackIcon /> Back
      </button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  todos: state.todos.todos
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditTodoPage);
