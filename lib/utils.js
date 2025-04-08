export const getList = (lists = [], name) => {
  return lists.find(list => list.name === name) || { entries: [] }
}