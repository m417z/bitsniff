import React, { Component } from 'react';
import './app.css';
import { Link } from 'react-router-dom';
import ztable from 'ztable';
import bitcoinAnalysis from './demonstration-data/2019-09-05-01_00_00-01_59_59_real';
import bitcoinShiftedAnalysis from './demonstration-data/2019-09-05-00_00_00-00_59_59_shifted';
import youtubeAnalysis from './demonstration-data/2019-09-05_youtube_long';
import AnalysisChart from './components/AnalysisChart';

export default class App extends Component {
  render() {
    const { match } = this.props;

    let analyzerData = null;
    switch (match.params.exampleId) {
      case 'bitcoin':
        analyzerData = bitcoinAnalysis;
        break;

      case 'bitcoin-shifted':
        analyzerData = bitcoinShiftedAnalysis;
        break;

      case 'youtube':
        analyzerData = youtubeAnalysis;
        break;
    }

    return (
      <>
        {analyzerData ?
          <>
            <div className='verdictText'>
              {'The file represents Bitcoin activity with '}
              <span className='verdictTextNumber'>{calcResultPercentage(analyzerData.result)}</span> probability
            </div>
            <AnalysisChart data={analyzerData} />
          </>
          :
          <>
            <div className='examplesDescription'>Select one of the examples below or <a href='https://github.com/m417z/bitsniff'>clone the repository</a> to analyze your own log</div>
            <Link to={`${match.url}/bitcoin`} className='defaultButton'>
              Real Bitcoin node traffic
            </Link>
            <Link to={`${match.url}/bitcoin-shifted`} className='defaultButton'>
              Shifted Bitcoin node traffic
            </Link>
            <Link to={`${match.url}/youtube`} className='defaultButton'>
              YouTube watching traffic
            </Link>
          </>
        }
      </>
    );
  }
}

function calcResultPercentage(result) {
  const percentage = Number((ztable(result * 0.5) * 100).toFixed(1));
  const prefix = percentage === 100 ? 'nearly ' : '';
  return `${prefix}${percentage}%`;
}
