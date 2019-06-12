import React from 'react';
import ReactDOM from 'react-dom';

import Game from './utils/components/game';

const App = () => {
    return ( <Game /> );
};

ReactDOM.render(<App />, document.getElementById('root'));