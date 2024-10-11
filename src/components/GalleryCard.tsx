import React from 'react'
import Image from 'next/image'

const GalleryCard: React.FC<{gallery: {imageUrl: string, id: number}}> = ({ gallery }) => {
    return (
        <div className=''>
            <Image 
                src={gallery.imageUrl}
                alt={`gallery-${gallery.id}`}
                width={120}
                height={299}
                sizes='100vw'
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        </div>
    )
}

export default GalleryCard