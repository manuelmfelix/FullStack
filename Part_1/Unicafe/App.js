import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine  = (props) => (
  <div>{props.text}{props.value}{props.text2}</div>
)

const Statistics = (props) => {
  if (props.good+props.neutral+props.bad === 0) {
    return(
      <div>No feedback given</div>
    )
  }
  return(
    <table>
      <tr>
        <td>good</td>
        <td><StatisticLine  value={props.good}/></td>
      </tr>
      <tr>
        <td>neutral</td>
        <td><StatisticLine  value={props.neutral}/></td>
      </tr>
      <tr>
        <td>bad</td>
        <td><StatisticLine  value={props.bad}/></td>
      </tr>
      <tr>
        <td>all</td>
        <td><StatisticLine  value={props.good+props.neutral+props.bad}/></td>
      </tr>
      <tr>
        <td>average</td>
        <td><StatisticLine  value={(props.good*1+props.bad*(-1))/(props.good+props.neutral+props.bad)}/></td>
      </tr>
      <tr>
        <td>positive</td>
        <td><StatisticLine  value={(props.good/(props.good+props.neutral+props.bad))*100} text2=" %" /></td>
      </tr>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={() => setBad(bad+1)} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App