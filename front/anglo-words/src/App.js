import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login/Login';
import HeaderContainer from './components/Header/HeaderContainer';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import SnackbarContainer from './components/Snackbar/SnackbarContainer';
import VocabularyContainer from './components/Vocabulary/VocabularyContainer';
import ModalContainer from './components/Modal/ModalContainer';
import { compose } from 'redux';
import { withWidth } from '@material-ui/core';
import WordsContainer from './components/Words/WordsContainer';


function App(props) {
  
  useEffect(() => {
    if(!props.initialized) props.initializeApp();
  },[props.initialized])

  if(!props.initialized){
    return <div>loading</div>
  }
  
  return (
    <>
      <HeaderContainer  />

      <div className="app-content">
        <Route exact path="/" render={() => <div>main</div>} />
        <Route exact path="/vocabulary" render={() => <VocabularyContainer />} />
        <Route exact path="/vocabulary/:vocId" render={() => <WordsContainer />} />
        <Route path="/login" render={() => <Login />} />
      </div>
      
      <SnackbarContainer  />
      <ModalContainer />
    </> 
  );
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

export default compose(
  connect(mapStateToProps, { initializeApp }),
  withWidth()
)(App)