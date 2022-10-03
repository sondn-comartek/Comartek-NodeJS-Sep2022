export const genCode = (str: string) => {
   return str
      .replace(/ /g, '-')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D') as string
}
