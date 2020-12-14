import React, { useEffect } from "react";
import { connect } from "react-redux";
import { dateFormatted } from "../../helpers/dateFormatted";
import { getUsersTodos } from "../../redux/actions/todos";
import { RootState } from "../../redux/reducers";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const DashboardPage: React.FC<Props> = (props) => {
  const { todos, token, getUsersTodos } = props;

  useEffect(() => {
    getUsersTodos(token);
  }, [getUsersTodos, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
  };

  return (
    <div className="dashboard-page">
      <h1>Dashboard Page</h1>
      <ul className="event-card">
        {todos.length > 0 &&
          todos.map((todo) => {
            return (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={handleChange}
                />
                <div className={`${todo.completed && "event-done"} event `}>
                  <p className="event-text">{todo.description}</p>
                  <p className="event-date">{dateFormatted(todo.created_on)}</p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  token: state.auth.token,
  todos: state.todos.todos
});

const mapDispatchToProps = { getUsersTodos };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
