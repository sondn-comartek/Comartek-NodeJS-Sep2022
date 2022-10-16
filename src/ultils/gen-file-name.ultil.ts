export const genFileId = (str: string) => {
   return (str.replace(/ /g, '-').toLowerCase() +
      '-' +
      (Math.random() + 1)
         .toString()
         .split('.')[1]
         .slice(16 - 5)
         .normalize('NFD')
         .replace(/[\u0300-\u036f]/g, '')
         .replace(/đ/g, 'd')
         .replace(/Đ/g, 'D')) as String
}
