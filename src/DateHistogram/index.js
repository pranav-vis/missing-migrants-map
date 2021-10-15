import {
    csv,
    max,
    min,
    sum,
    histogram as bin,
    select,
    extent,
    format,
    brushX,
    timeFormat,
    scaleBand,
    scaleLinear,
    scaleTime,
    timeMonths,
  } from 'd3';
  import {useRef, useEffect} from 'react';
  import { AxisBottom } from './AxisBottom.js';
  import { AxisLeft } from './AxisLeft.js';
  import { Marks } from './Marks.js';
  
  const width = 960;
  const height = 80;
  
  const margin = {
    top: 0,
    bottom: 20,
    left: 80,
    right: 20,
  };
  
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const tooltipFormat = timeFormat('%b-%y');
  const tickFormat = timeFormat('%b-%y');
  const xAxisLabel = 'Time';
  const yAxisLabel = 'Total Dead and Missing';
  
  export const DateHistogram = ({ data, width, height }) => {
    const xValue = (d) => d['Reported Date'];
    const yValue = (d) => d['Total Dead and Missing'];

    const brushRef = useRef();
  
    const xScale = scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice();
  
    const timeStart = min(xScale.domain());
    const timeStop = max(xScale.domain());
    const binnedData = bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(timeMonths(timeStart, timeStop))(data)
      .map((array) => ({
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1,
      }));
  
    const yScale = scaleLinear()
      .domain([0, max(binnedData, (d) => d.y)])
      .range([innerHeight, 0])
      .nice();

      useEffect(() => {

        const brush = brushX().extent([0,0],[innerWidth, innerHeight]).on();
        brush(select(brushRef.current));
        //console.log(brushRef.current);
      }, [innerWidth, innerHeight]);
  
    return (
      <>
        <g
          className="mark"
          transform={`translate(${margin.left}, ${margin.top})`}
        >
          <text
            className="axisLabel"
            x={innerWidth / 2}
            y={innerHeight + 30}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={tickFormat}
            tickOffset={5}
          />
          <text
            className="axisLabel"
            y={innerHeight / 2}
            textAnchor="middle"
            transform={`translate(${-80}, ${innerHeight / 2})
            rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} />
          <Marks
            binnedData={binnedData}
            xScale={xScale}
            yScale={yScale}
            tooltipFormat={tooltipFormat}
            innerHeight={innerHeight}
          />
          <g ref= {brushRef}/>
        </g>
      </>
    );
  };
  