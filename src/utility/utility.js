export function shuffle(arr) {
  const result = [...arr];
  for (let i = result.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [result[i - 1], result[j]] = [result[j], result[i - 1]];
  }

  return result;
}

export function updateItemInArray(arr, id, callback) {
  const updatedItems = arr.map((item) => {
    if (item.id !== id) {
      return item;
    }

    const updatedItem = callback(item);
    return updatedItem;
  });

  return updatedItems;
}
