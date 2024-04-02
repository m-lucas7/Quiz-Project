import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Quiz from '../components/quizz';
import Questions from '../components/questions';

function App() {
  return (
    <div className="container">
      <Quiz />
      <Questions />
    </div>
  );
}

export default App;
