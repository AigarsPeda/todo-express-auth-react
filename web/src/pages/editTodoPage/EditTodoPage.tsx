import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import { ITodo } from "../../types";

interface IParamTypes {
  id: string;
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const EditTodoPage: React.FC<Props> = (props) => {
  const { todos } = props;
  const { id } = useParams<IParamTypes>();
  const history = useHistory();
  const [todo, setTodo] = useState<ITodo>();
  const [description, setDescription] = useState("");

  useEffect(() => {
    const foundTodo = todos.find((t) => t.id === parseInt(id));
    setTodo(foundTodo);
    if (foundTodo) {
      setDescription(foundTodo.description);
    }
  }, [todos, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDescription(value);
  };

  return (
    <div className="edit-todo-page">
      <button onClick={() => history.goBack()}>Back</button>
      {console.log(todo)}
      {console.log(description)}
      <input
        type="text"
        name="description"
        value={description}
        onChange={handleChange}
        placeholder="Task Title..."
      />
      <h1>{id}</h1>
      <h1>Yes</h1>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  todos: state.todos.todos
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditTodoPage);
