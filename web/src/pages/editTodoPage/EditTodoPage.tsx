import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import { ITodo } from "../../types";

interface IParamTypes {
  id: string;
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const EditTodoPage: React.FC<Props> = (props) => {
  const { todos } = props;
  const { id } = useParams<IParamTypes>();
  const [todo, setTodo] = useState<ITodo>();

  useEffect(() => {
    setTodo(todos.find((t) => t.id === parseInt(id)));
  }, [todos, id]);

  return (
    <div className="edit-todo-page">
      {console.log(todo)}
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
