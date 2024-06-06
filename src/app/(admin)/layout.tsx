'use client'

/* eslint-disable @next/next/no-img-element */
import { LayoutProps } from '@/types/common'
import Link from 'next/link';
import Image from 'next/image';
import { redirect, usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import { Menu, MenuItem, Sidebar, sidebarClasses } from 'react-pro-sidebar';
import { ArrowDown, ArrowUp2, Blogger, Calendar2, HambergerMenu, Home, MenuBoard, Profile2User, NotificationStatus, NotificationBing, Notification1, Notification } from 'iconsax-react';
import NairaIcon from '@/components/custom-icons/NairaIcon';
import AdvertIcon from '@/components/custom-icons/AdvertIcon';
import CertificateIcon from '@/components/custom-icons/CertificateIcon';
import { PRIMARY_TWO } from '@/constant/Colors';
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, User } from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { RootState } from '@/features/store';
import { logOut } from '@/features/slices/authSlice';

// export const metadata: Metadata = {
//   title: "Administrator Panel | NIA-Kd",
//   description: "NIA-Kd Home",
// };

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const [toggled, setToggled] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const {token: isLoggedIn, user} = useAppSelector((state: RootState) => state.auth.userData)
  const dispatch = useAppDispatch()

  const pathname = usePathname()

  if(!isLoggedIn) {
    return redirect('/auth/login')
  }

  const getFullname = () => {
    if (user?.member?.firstName === undefined){
      return 'Super Admin'
    }
    return `${user?.member?.firstName} ${user?.member?.lastName}`
  }

  return (
    <div className='flex h-screen justify-between'>
      <div className={`${toggled ? '' : collapsed ? 'sm:w-[5%]' : 'sm:w-[16.4%]'} h-full`}>
        <Sidebar 
          className='h-full w-full overflow-hidden'
          breakPoint='xs'
          //customBreakPoint='400'
          transitionDuration={1000}
          collapsed={collapsed}
          onBackdropClick={() => setToggled(false)} 
          toggled={toggled}
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
                    alt='NIA-Kd'
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
                          fontSize: 14,
                      };
                    },
                    icon: ({active}) => {
                      return {
                        marginLeft: active ? -5 : undefined
                      }
                    }
                  }}
                  onClick={() => setToggled(!toggled)}
                >
                  <div className={`${pathname.includes('dashboard') && 'border-l-[5px] border-[#AB8144]'}`}>
                    <MenuItem 
                      icon={<Home size="24" color={`${pathname.includes('dashboard') ? '#ffffff' : '#BFBFBF'}`} variant="Outline" />} 
                      component={<Link href="/dashboard" />}
                      active={pathname.includes('dashboard') && true}
                    > 
                      Home
                    </MenuItem>
                  </div>
                  <div className={`${pathname.includes('event') && 'border-l-[5px] border-[#AB8144]'}`}>
                    <MenuItem icon={<Calendar2 size="24" color={`${pathname.includes('event') ? '#ffffff' : '#BFBFBF'}`} variant="Outline" />} 
                      component={<Link href="/event/list" />}
                      active={pathname.includes('event') && true}
                      suffix={0}
                    > 
                        Events
                    </MenuItem>
                  </div>
                  <div className={`${pathname.includes('members') && 'border-l-[5px] border-[#AB8144]'}`}>
                    <MenuItem 
                        icon={<Profile2User size="24" color={`${pathname.includes('members') ? '#ffffff' : '#BFBFBF'}`} variant="Outline" />} 
                        component={<Link href="/members" />}
                        active={pathname.includes('members') && true}
                        suffix={0}
                    > 
                        Members
                    </MenuItem>
                  </div>
                  <div className={`${pathname.includes('dues') && 'border-l-[5px] border-[#AB8144]'}`}>
                    <MenuItem 
                        icon={<NairaIcon width={24} height={24} fill='#ffffff' stroke={`${pathname.includes('dues') ? '#ffffff' : '#BFBFBF'}`} />} 
                        component={<Link href="/dues" />}
                        active={pathname.includes('dues') && true}
                    > 
                        Dues
                    </MenuItem>
                  </div>
                  <div className={`${pathname.includes('blog') && 'border-l-[5px] border-[#AB8144]'}`}>
                    <MenuItem 
                        icon={<Blogger size="24" color={`${pathname.includes('blog') ? '#ffffff' : '#BFBFBF'}`} variant="Outline" />} 
                        component={<Link href="/blogs/list" />}
                        active={pathname.includes('blog') && true}
                        suffix={0}
                    > 
                        Blog
                    </MenuItem>
                  </div>
                  <div className={`${pathname.includes('ads') && 'border-l-[5px] border-[#AB8144]'}`}>
                    <MenuItem 
                        icon={<AdvertIcon width={24} height={24} stroke={`${pathname.includes('ads') ? '#ffffff' : '#BFBFBF'}`} />} 
                        component={<Link href="/ads" />}
                        active={pathname.includes('ads') && true}
                        suffix={0}
                    > 
                        Ads
                    </MenuItem>
                  </div>
                  <div className={`${pathname.includes('certificates') && 'border-l-[5px] border-[#AB8144]'}`}>
                    <MenuItem 
                        icon={<CertificateIcon width={24} height={24} stroke={`${pathname.includes('certificates') ? '#ffffff' : '#BFBFBF'}`} />} 
                        component={<Link href="/certificates" />}
                        active={pathname.includes('certificates') && true}
                        suffix={0}
                    > 
                        Certificates
                    </MenuItem>
                  </div>
                </Menu>
              </div>
            </div>
            <div className='bg-[#1E1A1C] px-4 py-2'>
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: "/assets/profile.svg",
                    }}
                    className="transition-transform text-white"
                    description="Admin"
                    name={
                      <div className='flex space-x-2 leading-3 -mb-1'>
                        <h1 className='text-[12px] text-white leading-3'>{getFullname()}</h1>
                        <ArrowUp2 variant='Outline' color='#ffffff' size={16} />
                      </div>
                    }
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">@{user?.role.toLowerCase()}</p>
                  </DropdownItem>
                  <DropdownItem key="settings" as={Link} href='/profile'>
                    My Profile
                  </DropdownItem>
                  <DropdownItem key="logout" onClick={() => dispatch(logOut())}>
                      Log Out
                    </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Sidebar>
      </div>
      <div className={`${toggled ? 'xs:w-full' : collapsed ? 'sm:w-[95%]' : 'xs:w-full sm:w-[83.6%]'} h-full`}>
        <main className='h-screen w-full bg-[#F5F5F5] overflow-hidden'>
          <div className='flex justify-between xs:px-4 pt-4 sm:pr-12 xs:pb-3 sm:pb-0 w-full'>
            <div className='xs:hidden sm:flex'></div>
            <HambergerMenu className=' sm:py-0 sm:pl-0 xs:flex sm:hidden' size={20} variant='Outline' color={`${PRIMARY_TWO}`} onClick={() => setToggled(!toggled)} />
            {pathname.includes('dashboard') && <Notification className='xs:float-end' size={24} variant='Bold' color='#150D09' />}
          </div>
          <div className={`${pathname.includes('dashboard') ? 'sm:-mt-12' : 'sm:-mt-6'} xs:mt-0 h-full`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout