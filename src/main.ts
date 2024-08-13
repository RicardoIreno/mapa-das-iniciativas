import { Map, View } from 'ol'
import { OSM } from 'ol/source.js'
import { Tile } from 'ol/layer.js'
import Overlay from 'ol/Overlay.js';
import { fromLonLat } from 'ol/proj';
import { Select } from 'ol/interaction.js';
import { click } from 'ol/events/condition.js';
import { OverviewMap, defaults as defaultControls} from 'ol/control.js';
import {
  formatToGeoJSON,
  handleSelect,
  newVectorLayer,
  separateLayers
} from './functions'
import './style.css'

async function getData(url: string) {
  const data: object[] = []

  await fetch(url)
    .then(res => res.text())
    .then(text => {
      const jsData = JSON.parse(text.substr(47).slice(0, -2))
      const col: string[] = []

      jsData.table.cols.forEach((heading: any) => {
        if (heading.label) {
          col.push(heading.label.toLowerCase()) 
        }
      })
      jsData.table.rows.forEach((main: any) => {
        const row: { [key: string]: any } = {};
        col.forEach((e, i) => {
          row[e] = (main.c[i] != null) ? main.c[i].v : ''
        })
        data.push(row)
      })
    })
  return data
}

const spreadsheetID = '1qyykcCiZUCmeH-Ae5zVZToqurcFCbL72XrooxXwoZLQ'
const url = `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq?tqx=out:json`
const spreadsheetData = await getData(url)

let camada1: object[] = []
let camada2: object[] = []
let camada3: object[] = []

separateLayers(spreadsheetData, camada1, camada2, camada3)

const dataOne = newVectorLayer(formatToGeoJSON( camada1 ), "hsla(100, 50%, 50%, 0.8)")
const dataTwo = newVectorLayer(formatToGeoJSON( camada2 ), "hsla(200, 100%, 50%, 0.8)")
const dataThree = newVectorLayer(formatToGeoJSON( camada3 ), "hsla(10, 100%, 50%, 0.8)")

const checkbox1 = document.getElementById('checkbox1') as HTMLInputElement;
const checkbox2 = document.getElementById('checkbox2') as HTMLInputElement;
const checkbox3 = document.getElementById('checkbox3') as HTMLInputElement;

checkbox1.addEventListener('change', (event) => updateLayers(event, dataOne));
checkbox2.addEventListener('change', (event) => updateLayers(event, dataTwo));
checkbox3.addEventListener('change', (event) => updateLayers(event, dataThree));

// const infoEntity = document.getElementById('info-entity');
// const infoIniciative = document.getElementById('info-iniciative');
// const infoDesc = document.getElementById('info-desc');
// const infoSite = document.getElementById('info-site');
// const infoContact = document.getElementById('info-contact');
const closer = document.getElementById('popup-closer');
const popup = document.getElementById('popup');


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

const overlay = new Overlay({
  element: popup as HTMLElement | undefined,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

const map = new Map({
  controls: defaultControls().extend([overviewMapControl]),
  target: 'map',
  overlays: [overlay],
  layers: layersArray,
  view: new View({
    center: fromLonLat([-28, -15]),
    zoom: 4,
    minZoom: 4
  })
});

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

const selectClick = new Select({
  condition: click,
  layers: [dataOne, dataTwo, dataThree],
});


selectClick.on('select', function (e) {
  handleSelect(e);
});

map.addInteraction(selectClick);

map.on('singleclick', function (e) {
  const coordinate = e.coordinate;
  // popup.innerHTML = '<p>You clicked here:</p><code>'  '</code>';
  overlay.setPosition(coordinate);
});


