import React from 'react';
import GamesVocList from './GamesVocList';
import { connect } from 'react-redux';
import { toggleSelectedVoc } from '../../../redux/games-reducer';

const GamesVocListContainer = (props) => {
    return (
        <GamesVocList 
            selectedVocs={props.selectedVocs}  
            toggleSelectedVoc={props.toggleSelectedVoc}
            vocs={props.vocs}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        selectedVocs: state.games.selectedVocs,
        vocs: state.vocabulary.vocs
    }
}

export default connect(mapStateToProps, { toggleSelectedVoc })(GamesVocListContainer);