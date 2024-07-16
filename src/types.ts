

export type DataTablelineProps = {
  layer: string
  latitude: number
  longitude: number
  entity: string
  iniciative: string
  site: string
  contact: string
  desc: string
}

export type GeoJSONFeatureProps = {
  type: string,
  properties: {
    entity: string,
    iniciative: string,
    desc: string | null,
    site: string,
    contact: string
  },
  geometry: {
    type: string,
    coordinates: [number, number]
  }
};

export type GeoJSONProps = {
  type: string,
  features: GeoJSONFeatureProps[]
};