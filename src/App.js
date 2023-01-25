import React, { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid'
import { randomColor } from 'randomcolor'
import Draggable from 'react-draggable';


function App() {

  const [item, setItemi] = useState('')

  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])


  const newItem = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: uuidv4(),
        item: item,
        color: randomColor({
          luminosity: 'light',
        }),
        defaultPos: {
          x: 250,
          y: -450
        }
      }
      setItems((items) =>
        [...items, newItem])
      setItemi('')
    }
    else {
      alert('Enter something...')
      setItemi('')

    }
  }

  const deleteNode = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updatePos = (data, index) => {
    let newArray = [...items]
    newArray[index].defaultPos = { x: data.x, y: data.y }
    setItems(newArray)
  }

  const onKeyPres = (e) => {
    const code = e.keyCode || e.whitch
    if (code === 13) {
      newItem()
    }
  }



  return (
    <div className="App">
      <div className='wrapper'>
        <input
          value={item}
          type='text'
          placeholder='Enter something ...'
          onChange={(e) => setItemi(e.target.value)}
          onKeyDown={(e) => onKeyPres(e)}
        />
        <button className='enter' onClick={newItem}>
          ENTER
        </button>

      </div>
      {
        items.map((el, index) => {
          return (
            <Draggable
              key={index}
              defaultPosition={el.defaultPos}
              onStop={(_, data) => {
                updatePos(data, index)
              }}
            >
              <div className="todo__item" style={{ backgroundColor: el.color }} >
                {`${el.item}`}
                <button
                  className="delete"
                  onClick={() => deleteNode(el.id)}
                >
                  X
                </button>
              </div>
            </Draggable>
          )
        })
      }
    </div >
  );
}

export default App;
