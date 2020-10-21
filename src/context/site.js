import React, {useState} from 'react';


export const SiteContext = React.createContext();

function SiteProvider(props) {
    const [displayComplete, setDisplayComplete] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [sorting, setSorting] = useState('byName');
    //[byName, byDifficulty, byAsignee]
    
    const state = {
        displayComplete,
        setDisplayComplete,
        itemsPerPage,
        setItemsPerPage,
        sorting,
        setSorting
    }

    return (
        <SiteContext.Provider value={state}>
            {props.children}
        </SiteContext.Provider>
    )
} 

export default SiteProvider;