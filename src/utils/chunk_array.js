/**
 * Chunk a array into parts
 * @param {Array<Array>} array
 * @param {number} size
 * @returns {Array<Array>}
 */
export const chunk_array = (array, size) => {
  if (!Array.isArray(array))
    return [[]]

  return Array.from(
    { length: Math.ceil(array.length / size) },
    (_, i) => array.slice(i * size, i * size + size)
  )
}
