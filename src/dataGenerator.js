const debug = x => {
  console.log(x)
  return x
}
export default function genDateValue (n, shift = 0) {
  return Array(n)
    .fill(1)
    .map((d, i) => {
      return {
        date: new Date(Date.now() - i * 3600000),
        value: Math.max(250, (Math.random() * 3000) | 0) + shift * n,
        event: Math.random() < 0.4 ? 'none' : Math.random() > 0.5 ? 'unbirthday' : 'birthday'
      }
    })
}
