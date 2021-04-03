import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Menu from './shared/Menu';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Menu} />
      </div>
    </Router>
  );
}

export default App;
