export async function all(items: any[], fn: any): Promise<any[]> {
  const promises = items.map((item) => fn(item));
  return await Promise.all(promises);
}

export function series(items: any[], fn: any, label = 'chunking'): any {
  const result = [];

  return items
    .reduce((acc, item) => {
      acc = acc.then(() => {
        return fn(item).then((res) => {
          return result.push(res);
        });
      });
      return acc;
    }, Promise.resolve())
    .then(() => result);
}

export function splitToChunks(items: any[], chunkSize = 3): any[] {
  const result = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    result.push(items.slice(i, i + chunkSize));
  }
  return result;
}

export function chunks(
  items: any[],
  fn: any,
  chunkSize = 50,
  label = 'chunking',
): any {
  let result = [];
  const chunks = splitToChunks(items, chunkSize);
  return series(
    chunks,
    (chunk) => {
      return all(chunk, fn).then((res) => (result = result.concat(res)));
    },
    label,
  ).then(() => result);
}
