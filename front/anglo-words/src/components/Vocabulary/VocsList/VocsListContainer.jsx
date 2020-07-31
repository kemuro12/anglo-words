import React from 'react';
import VocsList from './VocsList';
import { connect } from 'react-redux';
import { updateVoc, deleteVoc } from '../../../redux/voc-reducer';
import { toggleModal } from '../../../redux/modal-reducer';

const VocsListContainer = (props) => {
   
    return (
        <VocsList 
            vocs={props.vocs} 
            updateVoc={props.updateVoc}
            deleteVoc={props.deleteVoc}
            toggleModal={props.toggleModal}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        vocs: state.vocabulary.vocs.reverse()
    }
}

export default connect(mapStateToProps, {updateVoc, deleteVoc, toggleModal})(VocsListContainer);