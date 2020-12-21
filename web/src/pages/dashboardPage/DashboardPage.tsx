import React, { useEffect } from "react";
import { connect } from "react-redux";
import AddTodo from "../../components/addTodo/AddTodo";
import { dateFormatted } from "../../helpers/dateFormatted";
import DeleteIcon from "../../icons/DeleteIcon";
import {
  deleteTodo,
  getUsersTodos,
  upDateTodoStatus
} from "../../redux/actions/todos";
import { RootState } from "../../redux/reducers";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const DashboardPage: React.FC<Props> = (props) => {
  const {
    todos,
    token,
    user,
    getUsersTodos,
    upDateTodoStatus,
    deleteTodo
  } = props;

  useEffect(() => {
    getUsersTodos(token);
  }, [getUsersTodos, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    todosId: number
  ) => {
    upDateTodoStatus(e.target.checked, token, todosId);
  };

  const eventTagsClass = (tag: string) => {
    if (tag === "home") {
      return "event-home";
    } else if (tag === "fun") {
      return "event-fun";
    } else {
      return "event-work";
    }
  };

  const today = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const d = new Date();
    const day = days[d.getDay()];
    const date = d.getDate();

    return `${day} ${date}`;
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id, token);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>{user.username} - Yours Today's schedule</h1>
        <h2>{today()}</h2>
      </div>
      <div className="dashboard-schedule">
        <ul className="event-card">
          {todos.length > 0 &&
            todos.map((todo) => {
              return (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => handleChange(e, todo.id)}
                  />
                  <div className={`${todo.completed && "event-done"} event`}>
                    <div className="event-main-section">
                      <p className="event-text">{todo.description}</p>
                      <p className="event-date">
                        {dateFormatted(todo.created_on)}
                      </p>
                    </div>
                    <div className="event-tags">
                      <div>
                        {todo.tags.map((tag, index) => {
                          return (
                            <span key={index} className={eventTagsClass(tag)}>
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                      <button onClick={() => handleDeleteTodo(todo.id)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="dashboard-controls">
        <AddTodo />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  token: state.auth.token,
  todos: state.todos.todos,
  user: state.user.user
});

const mapDispatchToProps = { getUsersTodos, upDateTodoStatus, deleteTodo };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
