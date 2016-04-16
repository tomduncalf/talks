import * as React from 'react';

export default ({ item, index, onDone }) => (
    <li>
        {item}
        <a href='#' onClick={onDone}>Done</a>
    </li>
)
