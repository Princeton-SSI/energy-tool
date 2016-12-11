import React, { Component, PropTypes } from 'react';
import { AreaChart } from 'react-d3';
import TimeType from '../shared/enums.js';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class EnergyGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    /*
    request
      .get('http://fac220l-heatmap.princeton.edu/api/buildings')
      .set('svg_id', '')
      .set('begin_date_time', '')
      .set('end_data_time', '')
      .set('feed_type', '')
      .end(function(err, res) {
        if !err {
          this.setState({
            rawData: res.body
          });
        }
      }).bind(this);
      */
  }

  render() {
    const lineDataValues = [];
    for (let i = 0; i < 20; i++) {
      lineDataValues.push({x: i, y: getRandomInt(10, 20)});
    }

    var areaData = [
    {
      name: "series1",
      values: lineDataValues
    }
    ];


    let titleStr = "";
    switch (this.props.graphType) {
      case TimeType.DAY:
        titleStr = "Daily";
        break;
      case TimeType.MONTH:
        titleStr = "Monthly";
        break;
      case TimeType.YEAR:
        titleStr = "Yearly";
        break;
      default:
        titleStr = "";
    }

    titleStr = titleStr + " Energy Readings";
    
    return (
      <AreaChart
        legend={true}
        data={areaData}
        width={400}
        height={300}
        title={titleStr}
        xAxisLabel="Day"
        yAxisLabel="kwH"
      />
    );

  }
}

EnergyGraph.propTypes = {
  graphType: PropTypes.number.isRequired,
};
