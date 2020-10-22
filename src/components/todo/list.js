import { Form, Button, Card, Dropdown, ListGroup,Toast,Badge } from 'react-bootstrap';
import { If, Then, Else } from './if';
import React, { useContext } from 'react';
import { SiteContext } from '../../context/site';
import {PaginatedList} from 'react-paginated-list';

function TodoList(props) {
    const siteContext = useContext(SiteContext);

    function _filterFn(list) {
      console.log('props.list ------>',list);
      let myArr =[];
      list.forEach(item => {
        if (siteContext.displayComplete) { // return all items
          myArr.push(item);
        } else { // return only not completed items
          if (!item.complete) {
          myArr.push(item);
          }
        }
      })
      return myArr
    }
    
    return (
      <PaginatedList
        list={_filterFn(props.list)}
        itemsPerPage={siteContext.itemsPerPage}
        renderList={(list) => (
          <>
            {list.map((item, id) => {
              return (
                <ul>
            {props.list.map(item => (
                <Toast
                     onClose={() => props.handleDelete(item._id)}
                     animation={true}
                    style={{ width: '15rem', marginLeft: '5rem', padding: '10px' }}
                >
                    <Toast.Header>
                        <Badge pill variant={item.complete ? "danger" : "success"}
                            className="mr-2"
                            onClick={() => props.handleComplete(item._id)}
                            style={{ cursor: "pointer" }}
                        >
                            {item.complete ? "Complete" : "Pendding"}
                        </Badge>
                       <h6  className="mr-auto">{item.assignee}</h6> 
                    </Toast.Header>
                    <Toast.Body>
                        {item.text}
                        <small>{item.difficulty}</small>
                    </Toast.Body>
                </Toast>
            ))}
        </ul>


              //   <ListGroup.Item className={`listGroupItem complete-${item.complete.toString()}`}
              //   key={id} >
              //   <span onClick={() => props.handleComplete(item._id)}>
              //     {item.text}
              //     {item.complete}
              //     {item.difficulty}
              //     {item.assignee}
              //   </span>
              //   <button onClick={_handleDelete}>delete</button>
              // </ListGroup.Item>
                // <div key={id}>
                //   {item.text} {item.complete}
                // </div>
              );
            })}
          </>
        )}
      />);



//     return (



//   <If condition={siteContext.displayComplete == true}>
//     <Then>
//     <ListGroup className='ListGroup' variant="flush">
//     {props.list.map((item,idx)=>(
//         <ListGroup.Item className={`listGroupItem complete-${item.complete.toString()}`}
//         key={idx} >
//         <span onClick={() => props.handleComplete(item._id)}>
//         {item.text} 
//         {item.complete} 
//         {item.difficulty} 
//         {item.assignee} 
//         </span>
//       </ListGroup.Item>
//     ))}
//   </ListGroup>
//     </Then>
//     <Else>
//   <ListGroup className='ListGroup' variant="flush">
//     {props.list.filter((item) => (
//       item.complete==false)).map((item,idx)=>(
//         <ListGroup.Item className={`listGroupItem complete-${item.complete.toString()}`}
//         key={idx} >
//         <span onClick={() => props.handleComplete(item._id)}>
//         {item.text} 
//         {item.complete} 
//         {item.difficulty} 
//         {item.assignee} 
//         </span>
//       </ListGroup.Item>
//     ))}
//   </ListGroup>
//     </Else>
//   </If>
// );
}
export default TodoList;