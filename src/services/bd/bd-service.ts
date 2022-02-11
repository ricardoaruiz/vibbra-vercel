import bd from './index'

export const getNextId = () => {
  const currentId = bd.last_id
  bd.last_id += 1
  return currentId
}
