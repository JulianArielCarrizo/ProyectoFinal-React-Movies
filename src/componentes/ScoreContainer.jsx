import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ScoreContainer = ({ score }) => {
    const movieScore = 75;
    return (
      <div style={{ width: '54px', textAlign: 'center' }}>
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          strokeWidth={11}
          styles={buildStyles({
            strokeLinecap: 'butt',
            textSize: '30px',
            textColor: 'beige',
            trailColor: '#1B1B7D',
        
          })}
        />
        
      </div>
    );
  };
  export default ScoreContainer;