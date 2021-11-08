import React from 'react'

const Course = ({ course }) => {

    return(
      <div>
        {course.map(course => <div key={course.id}>
          <h1>
            {course.name}
          </h1>
          <p>
            {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
          </p>
          Total Exercises:  {course.parts.reduce(function(sum, parts) {
                              console.log("test: ", sum, parts.exercises)
                              return sum + parts.exercises
                            }, 0)}
  
        </div>)}
      </div>
    )
  }

export default Course
