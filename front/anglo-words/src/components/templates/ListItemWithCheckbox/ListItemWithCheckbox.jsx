import React from 'react';
import styles from './ListItemWithCheckbox.module.css'
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Checkbox, Hidden } from '@material-ui/core';

const ListItemWithCheckbox = React.memo((props) => {
    
    const item = props.item;
    
    return (
        <ListItem divider className={ props.selected ? styles.selectedItem : ""}>
            <ListItemIcon>
                {props.num + 1}
            </ListItemIcon> 

            <ListItemText primary={item.title} />
            
            <ListItemSecondaryAction > 
                <div className={styles.rightBlock}>
                    {item.wordsCount && <ListItemText className={styles.wordsCount + " " + (props.selected ? styles.selectedItem : "")} primary={item.wordsCount + "/50 слов"}  />}

                    <Checkbox 
                        className={props.selected ? styles.selectedItem : styles.greenCheckbox}
                        checked={ props.selected }
                        onChange={() => props.toggleSelectedCheckbox(item.id) }
                    />    
                </div>
                              
            </ListItemSecondaryAction>  
        </ListItem>
    )
})

export default ListItemWithCheckbox;