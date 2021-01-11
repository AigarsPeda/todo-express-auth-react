import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { firstLetterUpper } from "../../helpers/firstLetterUpper";
import { RootState } from "../../redux/reducers";
import { ITodo } from "../../types";

import { updateTodo } from "../../redux/actions/todos";

interface IParamTypes {
  id: string;
}

const checkboxTags = ["work", "home", "fun"];

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const EditTodoPage: React.FC<Props> = (props) => {
  const { todos, token, updateTodo } = props;
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

  const handleSubmit = () => {
    updateTodo(todo, token, id);
    history.push("/");
  };

  return (
    <div className="edit-todo-page">
      <input
        type="text"
        name="description"
        value={todo.description}
        onChange={handleChange}
        placeholder="Task Title..."
      />
      <div className="edit-todo-checkbox-container">
        {checkboxTags.map((tag, index) => {
          return (
            <div key={index}>
              <label htmlFor={tag}>{firstLetterUpper(tag)}</label>
              <input
                type="checkbox"
                checked={isChecked(tag)}
                onChange={handleChangeChk}
                value={tag}
              />
            </div>
          );
        })}
      </div>
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  todos: state.todos.todos,
  token: state.auth.token
});

const mapDispatchToProps = { updateTodo };

export default connect(mapStateToProps, mapDispatchToProps)(EditTodoPage);
