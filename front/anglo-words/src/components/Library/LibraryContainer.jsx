import React from 'react';
import { connect } from 'react-redux';
import Library from './Library';
import { useEffect } from 'react';
import { getAllVocs, copyVoc, setRate, getRates } from '../../redux/library-reducer';

const LibraryContainer = (props) => {

    useEffect(() => {
        if(!props.allVocs.length) props.getAllVocs();
        if(!props.rates.length) props.getRates(props.userId);
    }, [])

    return (
        <Library 
            allVocs={props.allVocs} 
            copyVoc={props.copyVoc} 
            userId={props.userId}
            isAuth={props.isAuth}
            setRate={props.setRate}
            rates={props.rates}
            isLoading={props.isLoading}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        allVocs : state.library.allVocs,
        userId : state.auth.userId,
        isAuth : state.auth.isAuth,
        rates : state.library.rates,
        isLoading : state.preloader.isLoading
    }
}

export default connect(mapStateToProps, { getAllVocs, copyVoc, setRate, getRates } )(LibraryContainer)