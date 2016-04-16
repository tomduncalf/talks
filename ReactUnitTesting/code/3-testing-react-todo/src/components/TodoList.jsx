import * as React from 'react';

import TodoItem from 'components/TodoItem'

export default ({ items, onItemDone }) => (
    <ul>
        { items.map((item, index) =>
            <TodoItem key={index} item={item} onDone={onItemDone.bind(null, index)} />)
        }
    </ul>
)
