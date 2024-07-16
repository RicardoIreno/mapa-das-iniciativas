export async function fetching(str: string) {
  return await fetch(str)
    .then((res) => res.json())
    .catch( (err) => (console.log('Erro: ', err)))
  
}