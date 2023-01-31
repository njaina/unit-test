import './App.css';
import {useState} from "react";
import * as PropTypes from "prop-types";

function ListItem(props) {
    const {checkable, onCheck, id, item} = props;
    return <li className="list-item">
        {props.checkable && (
            <input type="checkbox" id={id}
                   onChange={checkable ? (event, item, i) => onCheck(event, item, i) : () => {
                   }}/>
        )}
        <label htmlFor={id}>{item}</label>
    </li>;
}

ListItem.propTypes = {
    id: PropTypes.string,
    key: PropTypes.string,
    item: PropTypes.string,
    checkable: PropTypes.bool,
    onCheck: PropTypes.func,
};

function List(props) {
    const {items, checkable, onCheck, children} = props;

    return (
        <div className='list-container'>
            <div className='list-children'>{children}</div>
            <ul className='list'>
                {items.map((item, i) => {
                    const uniqueId = `${item}-${i}`;
                    return (
                        <ListItem key={uniqueId} checkable={checkable} id={uniqueId}
                                  onCheck={event => onCheck(event, item, i)} item={item}/>
                    );
                })}
            </ul>
        </div>
    );
}

ListItem.propTypes = {
    items: PropTypes.array,
    checkable: PropTypes.bool,
    onCheck: PropTypes.func,
};

function App() {
    let [todo, setTodo] = useState([]);
    let [done, setDone] = useState([]);
    let [newItem, setNewItem] = useState(null);

    return (
        <div className="App">
            <List
                items={todo}
                checkable
                onCheck={(event, currentItem, i) => {
                    if (!event.target.checked) {
                        return;
                    }
                    setTodo(prevState => [...prevState].filter((_, j) => i !== j));
                    setDone(prevState => [...prevState, currentItem]);
                }}
            >
                <input type="text" onChange={event => setNewItem(event.target.value)} onKeyUp={event => {
                    const {code} = event;
                    if (code !== 'Enter') {
                        return;
                    }
                    setTodo(prevState => {
                        if (prevState.includes(newItem)) {
                            return [...prevState];
                        }
                        return [...prevState, newItem];
                    })
                    console.log(todo, newItem);
                }}/>
            </List>
            <List items={done}/>
        </div>
    );
}

export default App;
