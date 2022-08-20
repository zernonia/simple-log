export const convertJSONToString = (json: string) => {
  let text = ""
  let parsedJSON = JSON.parse(json)

  for (const [key, value] of Object.entries(parsedJSON)) {
    text += `${key}: ${JSON.stringify(value)}\n`
  }

  return text
}
