import React from 'react';
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';

const ListItemWithCheckbox = React.memo((props) => {
    console.log("ITEM")
    const item = props.item;
    
    return (
        <ListItem divider >
            <ListItemIcon>
                {props.num + 1}
            </ListItemIcon> 

            <ListItemText primary={item.title} />
            
            <ListItemSecondaryAction > 
                <Checkbox 
                    style={{color:"rgb(67,160,71)"}}
                    checked={ props.selected }
                    onChange={() => props.toggleSelectedCheckbox(item.id) }
                />                  
            </ListItemSecondaryAction>  
        </ListItem>
    )
})

export default ListItemWithCheckbox;