export async function generateQuoteId(): Promise<string> {
  let id: string = "";
  const numbers: string = "0123456789";
  const idLength: number = 10;

  for (let i = 0; i < idLength; i++) {
    id += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return id;
}
