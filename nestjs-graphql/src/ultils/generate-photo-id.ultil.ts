import { v4 } from "uuid"

export const GeneratePhotoId = (filename: string , description:string ) => {
    return `${description.replace(/ /g, '-')}-${v4()}.${filename.split(".")[1]}`
}