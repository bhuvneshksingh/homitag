import { Line } from 'react-chartjs-2';
import React from 'react';
import { injectIntl } from 'react-intl'
import { array, object } from 'prop-types';


const LineChart = ({ labels, dataPoints, style }) => {

  const data = {
    labels: labels || [],
    datasets: [
      {
        type:'line',
        tension: 0,
        data: dataPoints || [],
        fill: false,
        borderColor: '#585858',
        backgroundColor: 'rgba(77,74,74,0.2)',
        pointRadius: 5,
        pointBorderColor: '#969696',
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        borderWidth: 1,
        pointBackgroundColor: 'rgba(116, 33, 223, 0.4)'
      }
    ]
	  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          display:false
        }
      }],
      yAxes: [{
		  display: false,
        gridLines: {
          display:false
        }   
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      displayColors: false,
      callbacks: {
        label(tooltipItem) {
          return tooltipItem.yLabel;
        }
      }
    }
  }
  
  return (
    <div style={style}>
  
      <Line
	  data={data}
	  options={options}
	  />
    </div>
    
  )
}
  
LineChart.propTypes = {
  dataPoints: array,
  // intl: object,
  labels: array,
  style: object
}

export default injectIntl(LineChart)