import React from 'react';
import './App.css';
import SearchBox from '../SearchBox/SearchBox';

import {fetchVideos} from '../../api/youtube';

const App = () => (
  <div className="App">
    Heloooo
      <header className="App-header">
      <SearchBox search = {fetchVideos}/>
      </header>
    </div>
  );

export default App;
