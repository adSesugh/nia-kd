/* eslint-disable @next/next/no-img-element */
import NIAFooter from '@/components/footer'
import SubHeader from '@/components/sub-header'
import React from 'react'
import ShowcaseCard from '@/components/landing/showcase/ShowcaseCard'
import { TeamCardProps } from '@/types/common'
import TeamCardBlack from '@/components/landing/team/TeamCardBlack'
import members from '@/assets/data/members.json'

const teams: TeamCardProps[] = members 

// [
//   {
//     imageUrl: '/assets/team/9.png',
//     name: 'Arc. Stephen. J. Filiya FNIA',
//     designation: 'Chairman, NIA Kaduna',
//     social_media: {
//         twitter: '',
//         linkedin: ''
//     }
//   },
//   {
//     imageUrl: '/assets/team/10.png',
//     name: 'Arc. Binta Danmaliki FNIA',
//     designation: 'Vice Chairman',
//     social_media: {
//         twitter: '',
//         linkedin: ''
//     }
//   },
//   {
//     imageUrl: '/assets/team/2.png',
//     name: 'Arc. Danjuma S. Ageni MNIA',
//     designation: 'General Secretary',
//     social_media: {
//         twitter: 'https://x.com/DanjAgeni',
//         linkedin: 'https://www.linkedin.com/in/danjuma-ageni-mpm-mnia-173b7279'
//     }
//   },
//   {
//     imageUrl: '/assets/team/4.png',
//     name: 'Arc. Gbenga Popoola MNIA',
//     designation: 'Treasurer',
//     social_media: {
//         twitter: '',
//         linkedin: ''
//     }
//   },
//   {
//     imageUrl: '/assets/team/avatar.jpeg',
//     name: 'Arc. Deborah Sabo MNIA',
//     designation: 'Financial Secretary',
//     social_media: {
//       twitter: '',
//       linkedin: ''
//     }
//   },
//   {
//     imageUrl: '/assets/team/11.png',
//     name: 'Arc. (Dr) Juliet A. Obaje MNIA',
//     designation: 'PRO',
//     social_media: {
//       twitter: 'https://x.com/JulietObaje?t=F82TtkeMl9HWbPs-9ybhqw&s=08',
//       linkedin: 'https://www.linkedin.com/in/arc-dr-juliet-obaje-02a73830'
//     }
//   },
//   {
//     imageUrl: '/assets/team/7.png',
//     name: 'Arc Fatima  Baba  Ciroma MNIA',
//     designation: 'Students Affairs Officer',
//     social_media: {
//       linkedin: 'http://www.linkedin.com/in/fatima-baba-ciroma-88b961226',
//       twitter: '',
//     }
//   },
//   {
//     imageUrl: '/assets/team/avatar.jpeg',
//     name: 'Arc. (Dr.) K. S. Daroda MNIA',
//     designation: 'Chair Ethics',
//     social_media: {
//       twitter: '',
//       linkedin: ''
//     }
//   },
//   {
//     imageUrl: '/assets/team/avatar.jpeg',
//     name: 'Arc. Dr. Abbas Muazu MNIA',
//     designation: 'Chair Practice',
//     social_media: {
//       twitter: '',
//       linkedin: ''
//     }
//   },
//   {
//     imageUrl: '/assets/team/8.png',
//     name: 'Arc Samuel Aliyu Obaje FNIA',
//     designation: 'Past Chairman',
//     social_media: {
//       twitter: '',
//       linkedin: 'https://www.linkedin.com/in/obaje-samuel-216829214'
//     }
//   },
//   {
//     imageUrl: '/assets/team/avatar.jpeg',
//     name: 'Arc. Caleb M. Gaiya FNIA',
//     designation: 'ARCON Rep.',
//     social_media: {
//       twitter: '',
//       linkedin: ''
//     }
//   },
//   {
//     imageUrl: '/assets/team/avatar.jpeg',
//     name: 'Arc. Dimeji Adene FNIA',
//     designation: 'Ex-Officio',
//     social_media: {
//       twitter: '',
//       linkedin: ''
//     }
//   },
//   {
//     imageUrl: '/assets/team/3.png',
//     name: 'Arc. Olulaja M. Balogun FNIA',
//     designation: 'Ex Officio Member, ECNIAK',
//     social_media: {
//         twitter: '',
//         linkedin: ''
//     }
//   },
//   {
//     imageUrl: '/assets/team/1.png',
//     name: 'Bawa Y. Chindo',
//     designation: 'Assistant Secretary I',
//     social_media: {
//         twitter: 'https://x.com/bawa_chindo',
//         linkedin: ''
//     }
//   },
//   {
//     imageUrl: '/assets/team/5.png',
//     name: 'Lut Adinoyi Abdulazeez',
//     designation: 'Assistant PRO',
//     social_media: {
//       linkedin: 'https://www.linkedin.com/in/abdulazeez-lut-adinoyi-992210139',
//       twitter: 'https://x.com/Lut95566869',
//     }
//   },
//   {
//     imageUrl: '/assets/team/avatar.jpeg',
//     name: 'Arc. Tech. Umar S. Fatika',
//     designation: 'Assistant Secretary II',
//     social_media: {
//       twitter: '',
//       linkedin: ''
//     }
//   },
//   {
//     imageUrl: '/assets/team/6.png',
//     name: 'Arc. Tech. Michael Okhumeode',
//     designation: 'Admin Secretary',
//     social_media: {
//       linkedin: 'https://www.linkedin.com/in/abdulazeez-lut-adinoyi-992210139',
//       twitter: 'https://x.com/okhumeodemich1',
//     }
//   }
// ]

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
          <p className='pb-2'>{'The Nigeria Institute of Architects (NIA) Kaduna State Chapter was inaugurated on 11th of November 1972 as the then Northern Central State Chapter with a membership of 24, in line with the Vision of the Institute which is to attain excellence in the creative management of the physical environment and the Mission which is to mobilize informed membership for quickly service.'}</p>
          <p className='pb-2'>{"The first election of Executive took place on 2nd September of 1973 which saw late Arc. Adeyemi I. Bilewu of the then Ministry of Works and Transport as the Chairman and Arc. Fola Adeyemi of Niger Consultants as the Secretary. Shortly after the first Exco come on board, the Chapter went dormant for some few years, after co-opting active Architect into the Exco, the chapter was reactivated in 1983."}</p>
          <p className='pb-2'>{"On 23rd February 1984 a new Executive was elected with Arc. (Chief) Gabriel Yakubu Audu of Archon Nigeria Limited as the Chairman and Arc. Daniel Attah Agamba as the Secretary. The Chapter's Bye-law was formerly ratified in April 1984 and four standing Committees were constituted to undertake special assignments and to generate activities for the Chapter. The monthly general meetings then held in members' houses, guest houses or offices on rotational basis were now held bi-monthly in line with the provision of the bye-law."}</p>
          <p className='pb-2'>{"In 1988, Arc. (Obong) Victor Bassey Attah of Inter Design Partnership became the Chairman and in 1990 another election was held with late Arc. Samuel A. Alabi of Habitat Associates elected Chairman with Arc. D.A. Agamah of Archon Nigeria Limited as the Secretary."}</p>
          <p className='pb-2'>{"In 1994 a new Executive was elected with Late Arc. Nuhu Nahiwda of New Method Design Associates and Late Arc. Thomas O. Adekunle of NBTE emerging as Chairman and Secretary respectively."}</p>
          <p className='pb-2'>{"In 1999, Late Arc. Umaru B. Kubau of the Kaduna State Ministry of Works and Transport and Arc. Ayuba Nasia of Archon Nigeria Limited emerged as Chairman and Secretary."}</p>
          <p className='pb-2'>{"In 2002, Late Arc. Ibraheem Aliyu Arab of Anjias Resources and Arc. Matthew Giwa Rwauan of Kaduna Polytechnic emerged as Chairman and Secretary."}</p>
          <p className='pb-2'>{"In 2009, Arc. Akinlolu O. Odeyemi of Ackod Presentation and Arc. Samuel A. Obaje of Archon Nigeria Limited emerged as Chairman and Secretary. Arc. Josiah G. Dziniga of Kaduna State Ministry of Land and Survey became the Chairman and Arc. Stephen Jatau Filya of Altigra Nigeria Limited became the Secretary in 2015."}</p>
          <p className='pb-2'>{"2017 saw the emergence of Arc. Ja'afaru Saidu of the Ministry of Works and Housing and Transport as the Chairman and Arc. Stephen J. Filya retained the position of the Secretary."}</p>
          <p className='pb-2'>{"In 2019, Arc. Samuel A. Obaje of Archon Nigeria Limited became the Chairman and Arc. Binta Othman Danmallki of Systems Property Consult as the Secretary."}</p>
          <p className='pb-2'>{"The NIA Kaduna State Chapter has produced two Presidents of the Nigerian Institute of Architects; the 14th President Arc. (Chief) Gabriel Yakubu Audu, FNIA, PPNIA, OON, who is the current Chairman Board of Trustee of the Institute and Arc. (Obong) Victor Bassey Attah FNIA, PPNIA, who became the 17th President at the 1997 Bi-Annual General Meeting (BGM) held in Kaduna and also currently a member of the Board of Trustee of the Institute."}</p>
          <p className='pb-2'>{"In 2008, the Institute's Annual General Meeting (AGM) was held at the Hamdala Hotel in Kaduna, at the meeting then Governor of Kaduna State, His Excellency, Arc. Namadi Sambo, FNIA, GCON who later became the Vice President of the Federal Republic of Nigeria was elevated to the Fellowship Membership Class. The Chapter has a membership toll of over 200."}</p>
        </div>
      </div>
      <div className='flex flex-col sm:px-28 xs:px-6 bg-[#1E1A1C] py-20 items-center justify-center'>
        <div className='pb-8'>
          <h1 className='text-[30px] text-white font-semibold'>Team</h1>
        </div>
        <div>
          <div className='grid sm:grid-cols-3 xs:grid-cols-1 gap-8 columns-auto row-auto w-full'>
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
      <div className='w-full bg-[#F3ECE2]'>
        <div className='pt-16 flex items-center justify-center w-full'>
          <h1 className='font-semibold text-4xl'>Out Impact in numbers</h1>
        </div>
        <div className='grid sm:grid-cols-4 xs:grid-cols-2 sm:h-48 xs:h-48 py-6 mb-16 divide divide-x-2'>
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='sm:text-[48px] xs:text-[20x] font-semibold'>230</h1>
            <h6>Total members</h6>
          </div>
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='sm:text-[48px] xs:text-[20x] font-semibold'>230</h1>
            <h6>Total members</h6>
          </div>
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='sm:text-[48px] xs:text-[20x] font-semibold'>230</h1>
            <h6>Total members</h6>
          </div>
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='sm:text-[48px] xs:text-[20x] font-semibold'>230</h1>
            <h6>Total members</h6>
          </div>
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