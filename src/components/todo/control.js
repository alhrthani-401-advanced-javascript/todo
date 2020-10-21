import React, { useContext,useEffect } from 'react';

import { SiteContext } from '../../context/site'

function Control(props) {
    // in function components you can use useContext(context) 
    // you can use any number of contexts here using useContext    
    const context = useContext(SiteContext);

    const _toggleComplete=(e)=>{
        context.displayComplete=!context.displayComplete;
        context.setDisplayComplete(context.displayComplete);
        if(context.displayComplete){
            e.target.textContent='Hide completed';
        }else{
            e.target.textContent='Show completed';
        }
    }

    const _setResultesPerPage=(e)=>{
        context.setItemsPerPage(e.target.value)
    }
    

    const _setSortBy=(e)=>{
        console.log(e.target.value);
        context.setSorting(e.target.value)
    }

 


    return (
        <>
            <button onClick={_toggleComplete} >Show complete</button>
            
                <select onChange={_setResultesPerPage} className="dropdownmenu" id="dropdownmenu" name="dropdownmenu">

                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>                    

                </select>

                <select onChange={_setSortBy} className="dropdownmenu" id="dropdownmenu" name="dropdownmenu">
                    <option value="byTask">By Task</option>
                    <option value="byPerson">By Person</option>
                    <option value="byDifficult">By Difficult</option>                 

                </select>
          
        </>
    )
}

export default Control;