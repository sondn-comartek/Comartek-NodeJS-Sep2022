export async function generateQuoteId(): Promise<string> {
  let id = '';
  const numbers = '0123456789';
  const idLength = 10;

  for (let i = 0; i < idLength; i++) {
    id += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return id;
}
