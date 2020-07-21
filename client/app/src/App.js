import React from 'react';
import { } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Tv from './pages/TvSeries'
import MovieDetail from './pages/MovieDetail'
import MyFav from './pages/MyFav'

function App() {

  return (
      <Router>
        <Navbar />
        <Switch>
          <div className="d-flex align-items-center bg-flix">
            <Route exact path="/" component={Home} />
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/movies/:id" component={MovieDetail} />
            <Route exact path="/tv" component={Tv} />
            <Route exact path="/myFav" component={MyFav} />
          </div>
        </Switch>
      </Router>
  )
}

export default App;
