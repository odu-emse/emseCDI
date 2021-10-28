import React from 'react'

const Lesson:React.FC = (props) => {
  return (
    <div>
      This is a Module {props.match.params.id}
    </div>
  )
}

export default Lesson
