/* eslint-disable @next/next/no-img-element */
import NIAFooter from '@/components/footer'
import SubHeader from '@/components/sub-header'
import React from 'react'
import ShowcaseCard from '@/components/landing/showcase/ShowcaseCard'
import { TeamCardProps } from '@/types/common'
import TeamCardBlack from '@/components/landing/team/TeamCardBlack'

const teams: TeamCardProps[] = [
  {
    imageUrl: '/assets/team/3.jpeg',
    name: 'Arc. Olulaja M. Balogun',
    designation: 'Ex Officio Member, ECNIAK',
    social_media: {
        twitter: '',
        linkedin: ''
    }
  },
  {
      imageUrl: '/assets/team/2.jpeg',
      name: 'Danjuma Sokolayam Ageni',
      designation: 'Chapter Secretary',
      social_media: {
          twitter: '',
          linkedin: ''
      }
  },
  {
      imageUrl: '/assets/team/1.jpeg',
      name: 'Bawa Y. Chindo',
      designation: 'Assistant Secretary',
      social_media: {
          twitter: '',
          linkedin: ''
      }
  },
  {
      imageUrl: '/assets/team/4.jpg',
      name: 'Gbenga Popoola',
      designation: 'Financial Secretary',
      social_media: {
          twitter: '',
          linkedin: ''
      }
  },
  {
    imageUrl: '/assets/team/1.jpeg',
    name: 'Jimoh Abdulrazak',
    designation: 'President',
    social_media: {
      linkedin: '',
      twitter: '',
    }
  },
  {
    imageUrl: '/assets/team/3.jpeg',
    name: 'Jimoh Abdulrazak',
    designation: 'President',
    social_media: {
      linkedin: '',
      twitter: '',
    }
  }
]

const About = () => {
  return (
    <div className=''>
      <SubHeader title='About Us' subtitle={''} />
      <div className='flex gap-8 overflow-hidden bg-[#1E1A1C] pb-28 xs:px-6 sm:px-0'>
        <ShowcaseCard photoUrl={'/assets/showcase/1.jpeg'} className='border-2 border-white rounded-2xl' />
        <ShowcaseCard photoUrl={'/assets/showcase/3.jpeg'} className='border-2 border-white rounded-2xl' />
        <ShowcaseCard photoUrl={'/assets/showcase/2.jpeg'} className='border-2 border-white rounded-2xl' />
        <ShowcaseCard photoUrl={'/assets/showcase/1.jpeg'} className='border-2 border-white rounded-2xl' />
      </div>
      <div className='flex justify-center py-12 xs:px-6 sm:px-0'>
        <div className='sm:w-6/12 xs:w-full'>
          <h1 className='pb-2 sm:text-[40px] xs:text-[20px] font-bold'>Brief History</h1>
          <p className='text-[15px] pb-2'>The Nigerian Institute of Architects (NIA) was founded on the 1st of April 1960 as an association of independent professional architects with the aims and objectives of fostering friendship amongst members, cater for their welfare and establish mutual support and cooperation amongst them.</p>
          <p className='text-[15px] pb-2'>The idea for the formation of an independent professional architect’s organization in Nigeria was first conceived and motivated by three Nigerian architects while still pursuing their training in England in the early fifties.</p>
          <p className='text-[15px]'>In 1958, an 8-member study group was formed to carry out the detailed planning for the establishment of the Institute which ultimately culminated in inauguration of the Institute. From a modest 13 members at inauguration, the Institute has experienced a phenomenal growth in its membership, activities, stature and influence both at national and international levels. Total membership today stands at about 12000 in 5 classes of membership including Fellows, Full members, Associates, Graduates _ Students members spread across 31 Chapters and the Federal Capital...</p>
        </div>
      </div>
      <div className='flex flex-col sm:px-28 xs:px-6 bg-[#1E1A1C] py-20 items-center justify-center'>
        <div className='pb-8'>
          <h1 className='text-[30px] text-white font-semibold'>Team</h1>
        </div>
        <div>
          <div className='grid sm:grid-cols-3 xs:grid-cols-1 gap-8'>
            {teams.map((team: TeamCardProps, index: number) => (
              <TeamCardBlack
                key={index}
                imageUrl={team.imageUrl}
                name={team.name}
                designation={team.designation}
                social_media={team.social_media} 
              />
            ))}
          </div>
        </div>
      </div>
      <div className='grid sm:grid-cols-4 xs:grid-cols-2 sm:h-36 xs:h-44 bg-[#F3ECE2] py-6 divide divide-x-2'>
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='sm:text-[48px] xs:text-[20px] font-semibold'>230</h1>
          <h6>Total members</h6>
        </div>
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='sm:text-[48px] xs:text-[20px] font-semibold'>230</h1>
          <h6>Total members</h6>
        </div>
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='sm:text-[48px] xs:text-[20px] font-semibold'>230</h1>
          <h6>Total members</h6>
        </div>
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='sm:text-[48px] xs:text-[20px] font-semibold'>230</h1>
          <h6>Total members</h6>
        </div>
      </div>
      <div className='sm:px-28 xs:px-6 py-16 w-full'>
        <h1 className='sm:text-[30px] xs:text-[20px] font-bold pb-16 text-center'>Awards and Recognition</h1>
        <div className='sm:flex sm:items-center sm:justify-center sm:space-x-8 xs:space-x-0 xs:pl-5 sm:pl-0 xs:grid xs:grid-cols-2 xs:gap-2 pb-10'>
          <img src='/assets/awards/1.svg' alt='Award 1' className='xs:h-36 xs:w-36 sm:h-56 sm:w-56' />
          <img src='/assets/awards/2.svg' alt='Award 2' className='xs:h-36 xs:w-36 sm:h-56 sm:w-56' />
          <img src='/assets/awards/3.svg' alt='Award 3' className='xs:h-36 xs:w-36 sm:h-56 sm:w-56' />
          <img src='/assets/awards/4.svg' alt='Award 4' className='xs:h-36 xs:w-36 sm:h-56 sm:w-56' />
        </div>
      </div>
    </div>
  )
}

export default About