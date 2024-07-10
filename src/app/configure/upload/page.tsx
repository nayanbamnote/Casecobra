'use client'
import { OurFileRouter } from '@/app/api/uploadthing/core'
import { cn } from '@/lib/utils'
import { UploadDropzone } from '@uploadthing/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createUser } from '@/lib/databaseOperations'
import { getImageDimensions } from '@/lib/getImageDimensions'

const Page = () => {
  const router = useRouter()
  const [isRedirect, setIsRedirect] = useState<boolean>(false)
  const [id, setId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false) 

  useEffect(() => {
    if (isRedirect && id) {
      router.push(`/configure/design/${id}`)
    }
  }, [isRedirect, id, router])

  const handleUploadComplete = async (res: any) => {
    setIsLoading(true)  // Set loading to true when upload is complete
    console.log('Files: ', res)
    const imageUrl = res[0].url
    const { width, height } = await getImageDimensions(imageUrl)
    console.log('Image dimensions:', width, height)
    const userId = crypto.randomUUID()
    const user = await createUser(width, height, imageUrl, userId);
    console.log(user)
    setId(userId)
    setIsRedirect(true)
  }

  return (
    <div
      className={cn(
        'relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center',
      )}
    >
      <div className='relative flex flex-1 flex-col items-center justify-center w-full'>
        {isLoading ? (  // Show loading message if isLoading is true
          <div className="text-center">
            <p>Redirecting, please wait...</p>
          </div>
        ) : (
          <UploadDropzone<OurFileRouter, "imageUploader">
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error: Error) => { console.error(error) }}
          />
        )}
      </div>
    </div>
  )
}

export default Page
