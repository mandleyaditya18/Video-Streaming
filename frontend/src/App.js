import { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/Layout/Home';
import Navbar from './components/Layout/Navbar';
import PlayVideo from './components/UI/PlayVideo';
import Upload from './components/Upload/Upload';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>
        <Route path='/home' exact>
          <Home />
        </Route>
        <Route path='/home/:id' exact>
            <PlayVideo />
        </Route>
        <Route path='/upload' exact>
          <Upload />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
