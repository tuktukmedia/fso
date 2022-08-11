import { useState } from 'react'

const Statistics = ({good, bad, neutral, all}) => {
  if (all === 0) {
    return (
       <div>
            <p>No feedback given</p>
       </div> 
    )
  }

  return (
    <>
    <h2>Statistics</h2>

    <table><tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={(good-bad)/(all)} />
      <StatisticLine text="positive" value={(good/(all))*100+' %'} />
      </tbody></table>
    </>
  )
}

const StatisticLine = ({text,value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Button = ({handleClick, text}) =>  <button onClick={handleClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const clickGood = () => {
    return (
      setGood(good+1),
      setAll(all+1)
    )
  }
  const clickNeutral = () => {
    return (
      setNeutral(neutral+1),
      setAll(all+1)
    )
  }
  const clickBad = () => {
    return (
      setBad(bad+1),
      setAll(all+1)
    )
  }

   return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={clickGood} text="good" />
      <Button handleClick={clickNeutral} text="neutral" />
      <Button handleClick={clickBad} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} all={all} />
    </div>
  )
}

export default App