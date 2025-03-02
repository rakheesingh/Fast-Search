export async function fetchComment(query: string, limit: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?q=${query}&_limit=${limit}`
  );
  const dataJson = await response.json();
  return dataJson;
}
