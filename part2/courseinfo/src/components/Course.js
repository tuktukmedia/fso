import React from 'react'

const Course = ({course}) => 
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} /> 
    </div>

const Header = ({name}) => 
    <h2>{name}</h2>

const Content = ({parts}) =>
    <>{parts.map(part => <Part part={part.name} exercises={part.exercises} key={part.id} />)}</>

const Part = ({part, exercises}) => 
    <p>{part} {exercises} </p>
    

const Total = ({parts}) =>
    <p><b>Total of {parts.reduce((total, currentValue) => total + currentValue.exercises, 0)} exercises</b></p>

export default Course