import * as React from 'react';

export default ({ item, onDone }) => (
    <li>
        <span className={item.done ? 'done' : ''}>{item.item}</span>
        &nbsp;<a href='#' onClick={onDone}>{ item.done ? 'Not done' : 'Done' }</a>
    </li>
)
