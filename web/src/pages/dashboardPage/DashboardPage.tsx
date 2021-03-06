import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteTodo,
  getUsersTodos,
  UpdateTodoStatus
} from "../../redux/actions/todos";
import { RootState } from "../../redux/reducers";
import { dateFormatted } from "../../helpers/dateFormatted";
import { ITodo } from "../../types";

import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";

import AddTodo from "../../components/addTodo/AddTodo";
import { today } from "../../helpers/today";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const optionTags = ["all", "home", "fun", "work"];

const DashboardPage: React.FC<Props> = (props) => {
  const {
    todos,
    token,
    user,
    getUsersTodos,
    UpdateTodoStatus,
    deleteTodo
  } = props;

  const [tag, setTag] = useState("all");

  useEffect(() => {
    getUsersTodos(token);
  }, [getUsersTodos, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    todosId: number
  ) => {
    UpdateTodoStatus(e.target.checked, token, todosId);
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTag(e.target.value);
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id, token);
  };

  const filterTodos = (arr: ITodo[]) => {
    if (tag === "all") {
      return arr;
    } else {
      return arr.filter((todo) => {
        return todo.tags.includes(tag);
      });
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        {user.username && <h1>{user.username} - Yours Today's schedule</h1>}
        <h2>{today()}</h2>
        <select name="tags" id="tags" onChange={handleSelectChange} value={tag}>
          {optionTags.map((opt, index) => {
            return (
              <option value={opt} key={index}>
                {opt}
              </option>
            );
          })}
        </select>
      </div>
      <div className="dashboard-schedule">
        <ul className="event-card">
          {todos.length > 0 &&
            filterTodos(todos).map((todo) => {
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
                            <span
                              key={index}
                              className={eventTagsClass(tag)}
                              onClick={() => setTag(tag)}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                      <div>
                        <Link to={`/todo/${todo.id}`}>
                          <button>
                            <EditIcon />
                          </button>
                        </Link>
                        <button onClick={() => handleDeleteTodo(todo.id)}>
                          <DeleteIcon />
                        </button>
                      </div>
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

const mapDispatchToProps = { getUsersTodos, UpdateTodoStatus, deleteTodo };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
