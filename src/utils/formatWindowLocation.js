export function formatWindowLocationSearch(windowLocationSearch) {
  if (!windowLocationSearch) return
  const raw = windowLocationSearch
  const format = raw.slice(1, raw.length).split("&")
  const arr = format.map((s) => s.split("="))
  const obj = {}
  for (let i in arr) {
    obj[arr[i][0]] = arr[i][1]
  }
  return obj
}
