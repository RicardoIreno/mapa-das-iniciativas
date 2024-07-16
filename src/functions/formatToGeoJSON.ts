import { DataTablelineProps, GeoJSONFeatureProps } from '../types'

export function formatToGeoJSON(data: object[]): object {
  const d = data as DataTablelineProps[]
  const features: GeoJSONFeatureProps[] = d.map(item => {
    return {
      type: "Feature",
      properties: {
        entity: item.entity,
        iniciative: item.iniciative,
        desc: item.desc,
        site: item.site,
        contact: item.contact
      },
      geometry: {
        type: "Point",
        coordinates: [item.longitude / 1e14, item.latitude / 1e14]
      }
    };
  });

  const jsonData = {
    type: "FeatureCollection",
    features: features
  }

  return jsonData
}