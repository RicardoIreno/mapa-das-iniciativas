import { Map, View } from 'ol'
import { Tile } from 'ol/layer.js';
import { OSM } from 'ol/source.js'
import { fromLonLat } from 'ol/proj';
import {OverviewMap, defaults as defaultControls} from 'ol/control.js';
import { Select } from 'ol/interaction.js';
import { click } from 'ol/events/condition.js';
import { newVectorLayer } from './functions/newVectorLayer';
import { assert } from './functions/assert';
import { getData } from './functions/getData';
import { formatToGeoJSON } from './functions/formatToGeoJSON';
import { separateLayers } from './functions/separateLayers';
import './style.css'


const spreadsheetID = '1qyykcCiZUCmeH-Ae5zVZToqurcFCbL72XrooxXwoZLQ'
const url = `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq?tqx=out:json`
const spreadsheetData = await getData(url)

let camada1: object[] = []
let camada2: object[] = []
let camada3: object[] = []

await separateLayers(spreadsheetData, camada1, camada2, camada3)

const dataOne = newVectorLayer(formatToGeoJSON( camada1 ), "hsla(100, 50%, 50%, 0.8)")
const dataTwo = newVectorLayer(formatToGeoJSON( camada2 ), "hsla(200, 100%, 50%, 0.8)")
const dataThree = newVectorLayer(formatToGeoJSON( camada3 ), "hsla(10, 100%, 50%, 0.8)")

const checkbox1 = document.getElementById('checkbox1') as HTMLInputElement;
const checkbox2 = document.getElementById('checkbox2') as HTMLInputElement;
const checkbox3 = document.getElementById('checkbox3') as HTMLInputElement;

checkbox1.addEventListener('change', (event) => updateLayers(event, dataOne));
checkbox2.addEventListener('change', (event) => updateLayers(event, dataTwo));
checkbox3.addEventListener('change', (event) => updateLayers(event, dataThree));

const source = new OSM();
const overviewMapControl = new OverviewMap({
  layers: [
    new Tile({
      source: source,
    }),
  ],
});

const mapLayer = new Tile({
  source: new OSM()
});

const layersArray = [mapLayer, dataOne, dataTwo, dataThree]


function updateLayers(event: Event, data: any) {
  const checkbox = event.target as HTMLInputElement;
  if (!checkbox.checked) {
    map.removeLayer(data);
  } else {
    map.addLayer(data);
  }
}


const map = new Map({
  controls: defaultControls().extend([overviewMapControl]),
  target: 'map',
  layers: layersArray,
  view: new View({
    center: fromLonLat([-28, -15]),
    zoom: 4,
    minZoom: 4
  })
});



const selectClick = new Select({
  condition: click,
  layers: [dataOne, dataTwo, dataThree],
});

map.addInteraction(selectClick);

const infoEntity = document.getElementById('info-entity');
const infoIniciative = document.getElementById('info-iniciative');
const infoDesc = document.getElementById('info-desc');
const infoSite = document.getElementById('info-site');
const infoContact = document.getElementById('info-contact');

assert(infoEntity)
assert(infoIniciative)
assert(infoDesc)
assert(infoSite)
assert(infoContact)

selectClick.on('select', function (e) {
  const selectedFeatures = e.selected;
  if (selectedFeatures.length > 0) {
    const feature = selectedFeatures[0];
    const properties = feature.getProperties();
      infoEntity.innerHTML = properties.entity
      infoIniciative.innerHTML = properties.iniciative
      infoDesc.innerHTML = properties.desc
      infoSite.innerHTML = properties.site
      infoContact.innerHTML = properties.contact
      
      if (infoSite instanceof HTMLAnchorElement && infoSite.href === "") {
        infoSite.href = properties.site
      }
      if (infoContact instanceof HTMLAnchorElement && infoContact.href === "") {
        infoContact.href = properties.contact
      }

  } else {
      infoEntity.innerHTML = ""
      infoIniciative.innerHTML = ""
      infoDesc.innerHTML = ""
      infoSite.innerHTML = ""
      infoContact.innerHTML = ""
      if (infoSite instanceof HTMLAnchorElement) infoSite.href = ""
      if (infoContact instanceof HTMLAnchorElement) infoContact.href = ""

  }
});
