import { useState,useEffect } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Display =({ anecdote, votes }) => <><p>{anecdote}</p><p>has {votes} votes</p></>

const ShowAnecdote = ({anecdotes, points, selected, setPoints, setSelected}) => {
 
  const nextAnecdote = () =>{
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const vote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  return (
      <div>
        <h1>Anecdote of the day</h1>
        <Display anecdote={anecdotes[selected]} votes={points[selected]} />
        <Button handleClick={vote} text="vote" />
        <Button handleClick={nextAnecdote} text="next anecdote" />
        
      </div>
  )
}

const ShowBestAnecdote = ({anecdotes, points, best}) => 
  <div><h2>Anecdote with most votes</h2><Display anecdote={anecdotes[best]} votes={points[best]} /></div>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(7).fill(0))
  const best = points.indexOf(Math.max(...points))
 

  console.log('current', points)
  console.log('selected', selected)
  console.log('best', best)


  return (
    <div>
      <ShowAnecdote anecdotes={anecdotes} points={points} selected={selected} setPoints={setPoints} setSelected={setSelected} />
      <ShowBestAnecdote anecdotes={anecdotes} points={points} best={best} />
    </div>
  )
}

export default App