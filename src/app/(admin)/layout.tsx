'use client'

/* eslint-disable @next/next/no-img-element */
import { LayoutProps } from '@/types/common'
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react'
import { Menu, MenuItem, Sidebar, sidebarClasses } from 'react-pro-sidebar';
import { ArrowDown, ArrowUp2, Blogger, Calendar2, Home, MenuBoard, Profile2User } from 'iconsax-react';
import NairaIcon from '@/components/custom-icons/NairaIcon';
import AdvertIcon from '@/components/custom-icons/AdvertIcon';
import CertificateIcon from '@/components/custom-icons/CertificateIcon';

// export const metadata: Metadata = {
//   title: "Administrator Panel | NIA-Kd",
//   description: "NIA-Kd Home",
// };

const MenuIcon = ({url}: {url: string}) => <Image alt='Menu' src={url} width={10} height={10} sizes='20vw' style={{width: '60%', height: 'auto'}} className='h-8 w-8' />
const ActivePrefix = () => {
  return (
    <div className='w-2 h-full py-2 bg-[#AB8144]'>
      
    </div>
  )
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const [toggled, setToggled] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  //const {jwt_token, user} = useAppSelector((state: RootState) => state.auth)

  //const dispatch = useAppDispatch()
  const pathname = usePathname()

  return (
    <div className='flex h-screen justify-between'>
      <div className={`${collapsed ? 'w-[5%]' : 'w-[16.4%]'} h-full bg-[#1E1A1C]`}>
        <Sidebar 
          className='h-full w-full overflow-hidden'
          breakPoint='xs'
          transitionDuration={1000}
          collapsed={collapsed}
          onBackdropClick={() => setToggled(false)} toggled={toggled}
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: '#1E1A1C',
            },
          }}
        >
          <div className='flex flex-col justify-between h-full'>
            <div>
              <div className='flex flex-col pl-7 text-white justify-center w-full h-28'>
                <Image
                    alt='NIA-KD'
                    src={'/assets/logo.svg'}
                    sizes='100vw'
                    width={50}
                    height={60}
                    style={{
                        width: '60%',
                        height: 'auto'
                    }} 
                />
                <span className='text-[12px]'>Kaduna State Chapter</span>
              </div>
              <div className='py-3'>
                <Menu
                  menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                      if (level === 0)
                        return {
                          color: active ? '#ffffff' : '#BFBFBF',
                          backgroundColor: active ? '#342D30' : undefined,
                          '&:hover': {
                            backgroundColor: '#342D29',
                          },
                      };
                    },
                  }}
                >
                  <MenuItem 
                    icon={<Home size="24" color={`${pathname.includes('dashboard') ? '#ffffff' : '#BFBFBF'}`} variant="Outline" />} 
                    component={<Link href="/dashboard" />}
                    active={pathname.includes('dashboard') && true}
                  > 
                    Home
                  </MenuItem>
                  <MenuItem icon={<Calendar2 size="24" color={`${pathname.includes('event') ? '#ffffff' : '#BFBFBF'}`} variant="Outline" />} 
                    component={<Link href="/event/list" />}
                    active={pathname.includes('event') && true}
                    suffix={0}
                  > 
                      Events
                  </MenuItem>
                  <MenuItem 
                      icon={<Profile2User size="24" color={`${pathname.includes('members') ? '#ffffff' : '#BFBFBF'}`} variant="Outline" />} 
                      component={<Link href="/members" />}
                      active={pathname.includes('members') && true}
                      suffix={0}
                  > 
                      Members
                  </MenuItem>
                  <MenuItem 
                      icon={<NairaIcon width={24} height={24} stroke={`${pathname.includes('members') ? '#ffffff' : '#BFBFBF'}`} />} 
                      component={<Link href="/dues" />}
                      active={pathname.includes('dues') && true}
                  > 
                      Dues
                  </MenuItem>
                  <MenuItem 
                      icon={<Blogger size="24" color={`${pathname.includes('blog') ? '#ffffff' : '#BFBFBF'}`} variant="Outline" />} 
                      component={<Link href="/blog/list" />}
                      active={pathname.includes('blog') && true}
                      suffix={0}
                  > 
                      Blog
                  </MenuItem>
                  <MenuItem 
                      icon={<AdvertIcon width={24} height={24} stroke={`${pathname.includes('members') ? '#ffffff' : '#BFBFBF'}`} />} 
                      component={<Link href="/ads" />}
                      active={pathname.includes('ads') && true}
                      suffix={0}
                  > 
                      Ads
                  </MenuItem>
                  <MenuItem 
                      icon={<CertificateIcon width={24} height={24} stroke={`${pathname.includes('members') ? '#ffffff' : '#BFBFBF'}`} />} 
                      component={<Link href="/certificate/list" />}
                      active={pathname.includes('certificate') && true}
                      suffix={0}
                  > 
                      Certificates
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <div className='bg-[#1E1A1C] px-4 py-2'>
              <div className='flex items-center space-x-2 w-full pb-2 cursor-pointer'>
                <img 
                    src={'/assets/profile.svg'} 
                    alt={'sa'} 
                    className='rounded-full h-8 w-8'
                />
                <div className='xs:hidden sm:block'>
                  <div className='flex space-x-2 leading-3 -mb-1'>
                    <h1 className='text-sm text-white leading-3'>Jimoh Abdulrazak</h1>
                    <ArrowUp2 variant='Outline' color='#ffffff' size={16} />
                  </div>
                  <span className='text-[12px] text-[#AC9FA4]'>Admin</span>
                </div>
              </div>
            </div>
          </div>
        </Sidebar>
      </div>
      <div className={`${collapsed ? 'w-[95%]' : 'w-[83.6%]'} h-full`}>
        <div className='w-full'>
          <main className='h-screen'>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout