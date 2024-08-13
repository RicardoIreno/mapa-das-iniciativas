import { Feature } from 'ol';
import Point from 'ol/geom/Point.js';
import {Icon, Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Vector } from 'ol/layer.js';

const iconFeature = new Feature({
  geometry: new Point([0, 0]),
  name: 'Null Island',
  population: 4000,
  rainfall: 500,
});

const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'icon.svg',
  }),
});

iconFeature.setStyle(iconStyle);


export function newVectorLayer(data: object, color: string) {
  const styles: { [key: string]: Style } = {
  'Point': new Style({
    image: new CircleStyle({
      radius: 8,
      fill: new Fill({color: color}),
      stroke: new Stroke({ color: 'hsla(0, 0%, 100%, 1)', width: 3 }),
    }),
  }),
  };


  const styleFunction = (feature: any): Style | undefined => {
    return styles[feature.getGeometry().getType()]
  }

    

  return new Vector({ 
    source: new VectorSource({
      features: new GeoJSON().readFeatures(data, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
        // EPSG:3857 (Web Mercator) - expected by OpenLayers
        // EPSG: 4326 (latitude and longitude) - used in json
      })
    }),
    style: styleFunction,
  });
}