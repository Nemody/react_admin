
import React from 'react';
import ReactDOM from 'react-dom';

import {getItem} from './utils/storageUtils';
import MemoryUtils from './utils/memoryUtils';
import App from './App';

const user=getItem();

if(user){
    MemoryUtils.user=user;
}


ReactDOM.render(<App />,document.getElementById('root'));