import {Loader, Navbar, Service, Transactions, Welcome } from './components'

const App = () => {

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar/>
        <Welcome/>
      </div>
      <Service className=""/>
      <Transactions/>
    </div>
  )
}

export default App
