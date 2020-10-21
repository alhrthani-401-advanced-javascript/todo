import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjax from '../../hooks/useAjax';
import Control from './control';


import './todo.scss';

const todoAPI = 'https://alhrthani-todos.herokuapp.com/api/v1/todos';

const ToDo = () => {

  const [list, setList] = useState([]);
  const [axiosApiInstance] = useAjax();

  const _addItem = (item) => {
    item.due = new Date();
    axiosApiInstance(
      todoAPI,
      'post',
      item
    ).then(({ data: savedItem }) => {
        setList([...list, savedItem])
      })
      .catch(console.error);
  };

  const _toggleComplete = id => {
    console.log('_toggleComplete called');

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      axiosApiInstance(url, "put", item)
        .then(() => {
          setList(list.map(listItem => listItem._id === item._id ? item : listItem));
        })
        .catch(console.error);
    }
  };

  const _getTodoItems = () => {
    console.log('_getTodoItems called');

    axiosApiInstance(todoAPI, "get")
      .then(({ data }) => setList(data.results))
      .catch(console.error);
  };

  useEffect(_getTodoItems, []);


  const _deleteItem = id => {
    console.log('_deleteItem called');


    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      let url = `${todoAPI}/${id}`;

      axiosApiInstance(url, "delete")
        .then(() => {
          setList(list.filter(listItem => listItem._id !== item._id));
        })
        .catch(console.error);
    }
  };

  return (
    <>
      <header>
        <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
        </h2>
      </header>

      <section className="todo">

        <div>
          <TodoForm handleSubmit={_addItem} />
        </div>

        
        <div>
             <Control/>

             </div>



        <div>
          <TodoList
            list={list}
            deleteItem={_deleteItem}
            handleComplete={_toggleComplete}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;
