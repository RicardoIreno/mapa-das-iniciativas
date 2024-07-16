import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { Vector } from 'ol/layer.js';


export function newVectorLayer(data: object, color: string) {
  const styles: { [key: string]: Style } = {
  'Point': new Style({
    image: new CircleStyle({
      radius: 7,
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