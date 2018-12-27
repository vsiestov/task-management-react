import React, { Component, Fragment } from 'react';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import Input from "../components/Input";
import Search from "../components/Search";
import TaskItem from "../components/TaskItem";
import { isFormValid } from "../helpers/validator";
import * as tasksActions from "../store/tasks/actions";
import * as usersActions from "../store/users/actions";
import { errorMessage } from "../helpers/constants";

class TasksPage extends Component {
  state = {
    form: {
      _id: '',
      description: '',
      due: ''
    },
    isFormVisible: false,
    search: ''
  };

  onCreateTask = () => {
    this.setState(() => {
      return {
        isFormVisible: true
      }
    });
  };

  componentWillMount() {
    this.props.dispatch(tasksActions.list());
  }

  onSubmit = (event) => {
    event.preventDefault();

    const form = this.state.form;

    if (!isFormValid(this.state.form, {})) {
      return this.props.dispatch(usersActions.error(errorMessage('Fill all required fields')));
    }

    const data = {
      ...form,
      due: new Date(form.due).getTime()
    };

    if (form._id) {
      return this.props.dispatch(tasksActions.update(form._id, data))
        .then(() => {
            this.onCancelTask();
        });
    }

    return this.props.dispatch(tasksActions.create(data))
      .then(() => {
        this.onCancelTask();
      });
  };

  onCancelTask = () => {
    this.setState(() => {
      return {
        isFormVisible: false,
        form: {
          description: '',
          due: ''
        }
      }
    });
  };

  onSearch = (value) => {
    this.setState(() => {
      return {
        search: value
      }
    });
  };

  onChangeTask = (task) => {
    this.setState(() => {
      return {
        isFormVisible: true,
        form: {
          _id: task._id,
          description: task.description,
          due: format(task.due, 'YYYY-MM-DDTHH:MM')
        }
      }
    });

  };

  onInputChange = (field, value) => {
    this.setState((state) => {
      return {
        form: {
          ...state.form,
          [field]: value
        }
      }
    });
  };

  onDeleteTask = (task) => {
    return this.props.dispatch(tasksActions.remove(task._id));
  };

  render() {
    const { form, isFormVisible, search } = this.state;
    const { tasks } = this.props;

    return (
      <div className="layout">
        <div className="tasks__header">
          <h1>Your tasks</h1>

          <button className="tasks__action button blue" onClick={this.onCreateTask}>
            <span>Create task</span>
          </button>
        </div>

        {isFormVisible &&
        <Fragment>
          <div className="tasks__form">
            <div className="align-center">
              <form onSubmit={this.onSubmit} noValidate className="form form__inside">
                <Input
                  type="textarea"
                  placeholder="Description"
                  name="description"
                  value={form.description}
                  onInput={(value) => {
                    this.onInputChange('description', value);
                  }}/>

                <Input
                  type="datetime-local"
                  name="due"
                  value={form.due}
                  onInput={(value) => {
                    this.onInputChange('due', value);
                  }} required={true}/>

                <div className="input__controls">
                  <button className="button" type="button" onClick={this.onCancelTask}>
                    <span>Cancel</span>
                  </button>
                  <button className="button blue" type="submit" formNoValidate>
                    {
                      form._id ? <span>Update task</span> : <span>Add task</span>
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
        }

        {
          tasks.length ?

            <div>
              <Search onInput={this.onSearch}/>

              <ul className="tasks__list">
                {
                  tasks
                    .filter((item) => {
                      if (!search) {
                        return true;
                      }

                      return item.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
                    })
                    .map((item) => {
                      return <TaskItem
                        item={item}
                        key={item._id}
                        onChange={this.onChangeTask}
                        onDelete={this.onDeleteTask}
                      />
                  })
                }
              </ul>
            </div>

            :

            <div className="tasks__placeholder">
              You have not tasks yet
            </div>
        }
      </div>
    );
  }
}

const initMapStateToProps = (state) => {
  return {
    tasks: state.tasks
  };
};

export default connect(initMapStateToProps)(TasksPage);
