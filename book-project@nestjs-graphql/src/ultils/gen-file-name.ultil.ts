export const genFileId = (str: string) => {
   return (
      str.replace(/ /g, '-').toLowerCase() +
      '-' +
      (Math.random() + 1)
         .toString()
         .split('.')[1]
         .slice(16 - 5)
   ) as string
}
