import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [selected, setSelected] = useState(0)
  const [allNumbers, setNumbers] = useState([])
  const [votes, setVotes] = useState([0,0,0,0,0,0,0])
const [maximum, setMaximum] = useState(0)

  const newAnecdote = () => {
    
    const number = Math.floor(Math.random()*6)
    setNumbers(allNumbers.concat(number))
    setSelected(number)
    console.log("number: ", number)
    console.log("last number of array: ", allNumbers[allNumbers.length-1])
    console.log("Votes: ", votes)
  }

  const voting = () => {
    const copy = [...votes]
    copy[selected] += 1
    console.log("Copy: ", copy)
    setVotes(copy)
    console.log("Votes: ", votes)
    setMaximum(copy.indexOf(Math.max(...copy)))
    console.log("Maximum:", maximum)
  }

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <div>{anecdotes[selected]}</div>
      <div>Has {votes[selected]} votes.</div>
      <br/>
      <Button handleClick={newAnecdote} text="next anecdote" />
      <Button handleClick={voting} text="vote" />
      <br/>
      <h3>Anecdote with most votes</h3>
      <div>{anecdotes[maximum]}</div>
      <div>Has {votes[maximum]} votes.</div>
    </div>
  )
}

export default App