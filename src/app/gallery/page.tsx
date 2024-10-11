import SubHeader from '@/components/sub-header'
import React from 'react'

const Gallery = () => {
    return (
        <div className='bg-gray-400 w-full h-full overflow-y-scroll'>
            <SubHeader title='Gallery' subtitle={'Explore our latest galleries'} />
            <div className='px-32 py-12 w-full'>
                {/* Proposed NIAKD secretariat  */}
                <div>
                    <h1 className='text-white my-2'>Proposed NIAKD Secretariat.</h1>
                    <div className='grid grid-cols-2 place-content-center gap-3'></div>
                </div>
            </div>
        </div>
    )
}

export default Gallery