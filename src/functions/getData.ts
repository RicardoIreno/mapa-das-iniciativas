export async function getData(url: string) {
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
  