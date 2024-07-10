'use server'
import { db } from '@/lib/db'
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from '@prisma/client'


export const createUser = async (width: number, height: number, imageUrl: string, id: string) => {
  return await db.nayan.create({
    data: {
      width: width,
      height: height,
      imageUrl: imageUrl,
      croppedImageUrl: imageUrl,
      id: id,
    }
  })
}

export const updateCroppedImage = async ( imageUrl: string,  id: string) => {
   await db.nayan.update({
    where:{
      id
    },
    data: {
      croppedImageUrl: imageUrl
    }
   })
}


export type SaveConfigArgs = {
  color: CaseColor
  finish: CaseFinish
  material: CaseMaterial
  model: PhoneModel
  configId: string
}
 
export async function saveConfig({
  color,
  finish,
  material,
  model,
  configId,
}: SaveConfigArgs) {
  await db.nayan.update({
    where: { id: configId },
    data: { color, finish, material, model },
  })
}