import React from 'react';

const TodoList=function(props){

  return (
    <ul>
      {props.list.map(item => (
        <li
          className={`complete-${item.complete.toString()}`}
          key={item._id}
        >
          <span onClick={() => props.handleComplete(item._id)}>
            {item.text}
          </span>
          <button onClick={()=>props.deleteItem(item._id)}>Delete</button>
          <button onClick={()=>props.deleteItem(item._id)}>Update</button>

        </li>
      ))}
    </ul>
  );

}



export default TodoList;
