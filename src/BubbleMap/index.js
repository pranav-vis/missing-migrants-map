import { max, scaleSqrt } from 'd3';
import React from 'react';
import { Marks } from './marks.js';
import { useWorldAtlas } from '../useWorldAtlas.js';

export const BubbleMap = ({data, worldAtlas}) => {
  const sizeValue = (d) => d['Total Dead and Missing'];
  const citiesRadius = 15;
  const sizeScale = scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, citiesRadius]);

  return (
    <Marks
      worldAtlas={worldAtlas}
      data={data}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  );
};
