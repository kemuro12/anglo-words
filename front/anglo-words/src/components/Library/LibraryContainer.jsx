import React from 'react';
import { connect } from 'react-redux';
import Library from './Library';
import { useEffect } from 'react';
import { getAllVocs, copyVoc } from '../../redux/library-reducer';

const LibraryContainer = (props) => {

    useEffect(() => {
        props.getAllVocs();
    }, [props.allVocs])

    return (
        <Library 
            allVocs={props.allVocs} 
            copyVoc={props.copyVoc} 
            userId={props.userId}
            isAuth={props.isAuth}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        allVocs : state.library.allVocs,
        userId : state.auth.userId,
        isAuth : state.auth.isAuth
    }
}

export default connect(mapStateToProps, { getAllVocs, copyVoc } )(LibraryContainer)