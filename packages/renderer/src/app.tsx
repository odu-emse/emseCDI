import * as React from 'react'
import Nav from './components/Nav'
import Container from '/@/components/Container'

const App: React.FC = () => {

  return(
    <div className="flex">
      <Nav />
      <Container />
    </div>
  )
}

export default App
