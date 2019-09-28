import React, { Component } from 'react';
import './app.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import logoImage from './assets/logo.png';
import Analyzer from './Analyzer';
import Demonstration from './Demonstration';
import MeasurementsGraph from './MeasurementsGraph';

function Header({ match, history }) {
  let toLink = null;
  switch (match.path) {
    case '/performance':
    case '/result/:resultId':
      toLink = '/';
      break;

    case '/example/:exampleId':
      toLink = '/example';
      break;
  }

  return (
    <header className={toLink && 'clickableHeader'} onClick={toLink && (() => history.push(toLink))}>
      <img src={logoImage} className={'logoImage' + (toLink ? ' logoImageSmall' : '')} alt='logo' />
      <div>BitSniff</div>
    </header>
  );
}

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={['/performance', '/example/:exampleId', '/result/:resultId']} component={Header} />
          <Route component={Header} />
        </Switch>
        <section className='mainSection'>
          <Switch>
            <Route path='/performance' component={MeasurementsGraph} />
            <Route path='/example/:exampleId?' component={Demonstration} />
            <Route path='/result/:resultId' component={Analyzer} />
            <Route component={Analyzer} />
          </Switch>
        </section>
        <footer>
          <div>
            &copy; <a href="https://github.com/m417z/bitsniff/graphs/contributors">The BitSniff team</a>
          </div>
        </footer>
      </Router>
    );
  }
}
