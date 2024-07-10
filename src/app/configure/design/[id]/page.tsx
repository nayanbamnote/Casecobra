
import { notFound} from 'next/navigation'
import DesignConfigurator from '@/components/DesignConfigurator'
import { db } from '@/lib/db'

interface Params {
  id: string;
}

const Page = async ({ params }: { params: Params }) => {
  const { id } = params;
  console.log(id)
  if (!id || typeof id !== 'string') {
    return notFound();
  }

  const configuration = await db.nayan.findUnique({
    where: { id },
  })

  if (!configuration) {
    return notFound()
  }

  const { imageUrl, width, height } = configuration

  return (
    <DesignConfigurator
      configId={configuration.id}
      imageDimensions={{ width, height }}
      imageUrl={imageUrl}
    />
  )
}

export default Page