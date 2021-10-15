import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import {
  csv,
  max,
  extent,
  format,
  timeFormat,
  scaleBand,
  scaleLinear,
  scaleTime,
  scaleSqrt,
} from 'd3';
import { useWorldAtlas } from './useWorldAtlas.js';
import { useData } from './useData.js';
import { BubbleMap } from './BubbleMap/index.js';
import { DateHistogram } from './DateHistogram/index.js';

const width = 960;
const height = 500;
const DateHistogramSize = 0.2;

const margin = {
  top: 20,
  bottom: 80,
  left: 100,
  right: 20,
};

const centerX = width / 2;
const centerY = height / 2;

export const App = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();

  if (!worldAtlas || !data) {
    return (
      <pre id="message-container">Data is loading</pre>
    );
  }

  return (
    <svg width={width} height={height}>
      <BubbleMap data={data} worldAtlas={worldAtlas} />
      <g transform ={`translate(0,${height - DateHistogramSize*height})`}>
         <rect
        className="THIS RECT"
        width={width}
        height={height}
        fill="white"
      />
      <DateHistogram data={data} height = {DateHistogramSize*height}/>
      </g>
    </svg>
  );
};