export function generateTree(items, mark = '|----') {
  let tmp = []
  for (const item of items) {
    const children = item.children
    tmp.push({
      id: item.id,
      title: repeat(mark, item.level) + item.title
    })
    if (typeof children !== 'undefined') {
      const child = generateTree(children)
      tmp = tmp.concat(child)
    }
  }
  return tmp
}

function repeat(str, num) {
  let tmp = ''
  for (let i = 0; i < num; i++) {
    tmp += str
  }
  return tmp
}
