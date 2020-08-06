import React from 'react';
import { List } from '@material-ui/core';
import ListItemWithCheckbox from '../../templates/ListItemWithCheckbox/ListItemWithCheckbox';

const GamesVocList = (props) => {
    
    const voc_mas = props.vocs.filter(voc => voc.wordsCount).map( (voc, count) => voc.wordsCount ?
        <ListItemWithCheckbox
            key={voc.id}
            num={count}
            selected={ props.selectedVocs.find( selId => selId === voc.id) ? true : false }
            item={voc}
            toggleSelectedCheckbox={ props.toggleSelectedVoc }
        />
        : ""
    )

    return (
        <List>
            { voc_mas }
        </List>
    )
}

export default GamesVocList;