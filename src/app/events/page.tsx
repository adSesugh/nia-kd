'use client'

import EventCard from '@/components/event/event-card'
import NIAFooter from '@/components/footer'
import SubHeader from '@/components/sub-header'
import TextFieldWithIcon from '@/components/textfield-withicon'
import { Form, Formik, FormikHelpers } from 'formik'
import { SearchNormal } from 'iconsax-react'
import React, { useState } from 'react'
import EventPicture from '@/assets/event.svg'

import * as Yup from 'yup'

const EventSchema = Yup.object().shape({
  query: Yup.string().required('Search name is required'),
});

type EventSearchForm = {
  query: string
}

const events = [
  {
    id: 'safafj12',
    photoUrl: EventPicture,
    title: 'Innovate Architecture Conference',
    registered: 30,
    meeting_mode: 'Offline',
    registration_status: 'Open',
    event_date: 'Jun 23, 2023',
    event_starts: '09:00 AM', 
    event_fee: 25000
  },
  {
    id: 'safafj12sfdsf',
    photoUrl: EventPicture,
    title: 'Innovate Architecture Conference',
    registered: 40,
    meeting_mode: 'Offline',
    registration_status: 'Closed',
    event_date: 'Jun 23, 2023',
    event_starts: '09:00 AM', 
    event_fee: 250000
  },
  {
    id: 'safafj12weee',
    photoUrl: EventPicture,
    title: 'Innovate Architecture Conference',
    registered: 56,
    meeting_mode: 'Offline',
    registration_status: 'Open',
    event_date: 'Jun 23, 2023',
    event_starts: '09:00 AM', 
    event_fee: 2500
  },
  {
    id: 'safafj12swwd',
    photoUrl: EventPicture,
    title: 'Innovate Architecture Conference',
    registered: 23,
    meeting_mode: 'Offline',
    registration_status: 'Open',
    event_date: 'Jun 23, 2023',
    event_starts: '09:00 AM', 
    event_fee: 2500
  },
  {
    id: 'safafj12rtyw',
    photoUrl: EventPicture,
    title: 'Innovate Architecture Conference',
    registered: 70,
    meeting_mode: 'Offline',
    registration_status: 'Open',
    event_date: 'Jun 23, 2023',
    event_starts: '09:00 AM', 
    event_fee: 250000
  },
  {
    id: 'safafj12piiiut',
    photoUrl: EventPicture,
    title: 'Innovate Architecture Conference',
    registered: 80,
    meeting_mode: 'Offline',
    registration_status: 'Closed',
    event_date: 'Jun 23, 2023',
    event_starts: '09:00 AM', 
    event_fee: 50000
  }
]

const Events = () => {
  const [selectedSearch, setSelectedSearch] = useState('all')
  const initialValues: EventSearchForm = { query: '' };

  return (
    <React.Fragment>
      <SubHeader title='Events' subtitle={'Explore our latest events and programmes'} />
      <div className='bg-[#F3ECE2] sm:px-28 xs:px-6 w-full'>
        <div className='flex sm:flex-row xs:flex-col-reverse py-8 items-center gap-6 xs:-mx-1.5 sm:mx-0'>
          <div className='flex bg-white h-12 px-1 items-center'>
            <button onClick={() => setSelectedSearch('all')} className={`${selectedSearch === 'all' && 'bg-[#1E1A1C] text-white'} h-10 w-[122px] py-1.5 `}>All</button>
            <button onClick={() => setSelectedSearch('upcoming')} className={`${selectedSearch === 'upcoming' && 'bg-[#1E1A1C] text-white'} h-10 w-[122px] py-1.5 `}>Upcoming</button>
            <button onClick={() => setSelectedSearch('past')} className={`${selectedSearch === 'past' && 'bg-[#1E1A1C] text-white'} h-10 w-[122px] py-1.5 `}>Past</button>
          </div>
          <div className='flex-1 items-center h-full w-full'>
            <Formik
              initialValues={initialValues}
              validationSchema={EventSchema}
              onSubmit={(values: EventSearchForm, { setSubmitting }: FormikHelpers<EventSearchForm>) => {
                console.log(values);
                setSubmitting(false)
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
                <Form onSubmit={handleSubmit} autoComplete='off' className='-mt-4 sm:w-3/5 xs:w-full relative'>
                  <TextFieldWithIcon 
                      name='query' 
                      placeholder='Search events' 
                      type='text'
                      className={errors.query && touched.query ? 'ring-red-500 pr-10 rounded-none h-12 flex': 'pr-10 rounded-none h-12 flex'}
                      LeftIcons={<SearchNormal variant='Outline' size={24} color='gray' />}
                    />
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div>
          <h1 className='pb-2'>Showing 6 events</h1>
          <div className='grid sm:grid-cols-3 xs:grid-cols-1 gap-12 justify-between pb-6'>
            {events.map((event, index) => (
              <EventCard event={event} href={`/events/${event.id}`} key={index} />
            ))}
          </div>
        </div>
      </div>
      <NIAFooter />
    </React.Fragment>
  )
}

export default Events