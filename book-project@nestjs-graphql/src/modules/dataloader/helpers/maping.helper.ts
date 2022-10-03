export const maping = <T>(
   property : string,
   keys: string[],
   docs: T[],
) => {
   if(docs.length < keys.length) throw new Error('Dataloader : keys and docs not align!')
   let docsMap = {}
   for (let i = 0; i < docs.length; i++) {
      const doc = docs[i]
      if (doc && doc[property] ) docsMap[doc[property]] = doc ;
   }
   return keys.map( key => docsMap[key] || null) as T[]
}
