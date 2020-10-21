import React,{useState} from 'react';
import useForm from '../../hooks/useForm';



const TodoForm=function(props){
  const [item,setItem]=useState({});
  const [handleSubmit, handleChange, values] = useForm(setItemFn);
 
  function setItemFn (item) {
    props.handleSubmit(item)

    setItem({item});
  };

  return(
    
      <>
        <h3>Add Item</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <span>To Do Item</span>
            <input
              name="text"
              placeholder="Add To Do List Item"
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Difficulty Rating</span>
            <input defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleChange} />
          </label>
          <label>
            <span>Assigned To</span>
            <input type="text" name="assignee" placeholder="Assigned To" onChange={handleChange} />
          </label>
          <button>Add Item</button>
        </form>
      </>
      )
  }
export default TodoForm;
