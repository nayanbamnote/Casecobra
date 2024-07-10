

 
export   const getImageDimensions = (imageUrl: string) => {
    return new Promise<{ width: number; height: number }>((resolve, reject) => {
        const img = new Image()
        img.src = imageUrl
        img.onload = () => {
        resolve({ width: img.width, height: img.height })
        }
        img.onerror = (error) => {
        console.error('Error getting image dimensions:', error)
        reject(error)
        }
    })
}
