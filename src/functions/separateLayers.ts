import { DataTablelineProps } from "../types";

export function separateLayers(
  spreadsheetData: object[],
  camada1: object[],
  camada2: object[],
  camada3: object[]) {
  const data = spreadsheetData as DataTablelineProps[]
  data.forEach(d => {
    switch (d.layer) {
      case "camada1": {
        camada1.push(d)
        break
      }
      case "camada2": {
        camada2.push(d)
        break
      }
      case "camada3": {
        camada3.push(d)
        break
      }
    }
  })
}