import {
    geoNaturalEarth1,
    geoPath,
    geoGraticule,
  } from 'd3';
  
  const projection = geoNaturalEarth1();
  const path = geoPath(projection);
  const graticule = geoGraticule();
  
  export const Marks = ({
    worldAtlas: { land, interiors },
    data,
    sizeScale,
    sizeValue
  }) => (
    <>
      <g className="marks">
        <path
          className="sphere"
          d={path({ type: 'Sphere' })}
        />
        <path
          fill="none"
          stroke="#D4D4D4"
          className="graticules"
          d={path(graticule())}
        />
        {land.features.map((feature) => (
          <path
            fill="#05426C"
            className="land"
            d={path(feature)}
          />
        ))}
        <path
          fill="#05426C"
          className="interiors"
          d={path(interiors)}
        />
        {data.map((d) => {
          const [x, y] = projection(d.coords);
          return (
            <circle
              r={sizeScale(sizeValue(d))}
              cx={x}
              cy={y}
            />
          );
        })}
      </g>
    </>
  );
  