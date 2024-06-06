'use client'

/* eslint-disable @next/next/no-img-element */
import { LayoutProps } from '@/types/common'
import Link from 'next/link';
import Image from 'next/image';
import { redirect, usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import { Menu, MenuItem, Sidebar, sidebarClasses } from 'react-pro-sidebar';
import { ArrowDown, ArrowDown2, ArrowUp2, Calendar2, HambergerMenu, Home, Notification } from 'iconsax-react';
import NairaIcon from '@/components/custom-icons/NairaIcon';
import { PRIMARY_TWO } from '@/constant/Colors';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { RootState } from '@/features/store';
import { logOut } from '@/features/slices/authSlice';
import { BellSimple, Books, Ticket } from '@phosphor-icons/react';


const MemberLayout: React.FC<LayoutProps> = ({ children }) => {
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
              backgroundColor: '#1E0D26',
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
                          backgroundColor: active ? '#301F38' : undefined,
                          '&:hover': {
                            backgroundColor: '#301F47',
                          },
                          fontSize: 14,
                      };
                    },
                    icon: ({active}) => {
                      return {
                        marginLeft: active ? 0 : undefined
                      }
                    }
                  }}
                  onClick={() => setToggled(!toggled)}
                >
                  <MenuItem 
                    icon={<Home size="24" color={`${pathname.includes('dashboard') ? '#ffffff' : '#BFBFBF'}`} variant="Outline" />} 
                    component={<Link href="/member/dashboard" />}
                    active={pathname.includes('dashboard') && true}
                  > 
                    Home
                  </MenuItem>
                  <MenuItem icon={<Calendar2 size="24" color={`${pathname.includes('event') ? '#ffffff' : '#BFBFBF'}`} variant="Outline" />} 
                    component={<Link href="/member/events" />}
                    active={pathname.includes('event') && true}
                  > 
                      Events
                  </MenuItem>
                  <MenuItem 
                      icon={<NairaIcon width={24} height={24} fill='#ffffff' stroke={`${pathname.includes('dues') ? '#ffffff' : '#BFBFBF'}`} />} 
                      component={<Link href="/member/dues" />}
                      active={pathname.includes('dues') && true}
                  > 
                      Dues
                  </MenuItem>
                  <MenuItem 
                      icon={<Books size="24" color={`${pathname.includes('transactions') ? '#ffffff' : '#BFBFBF'}`} />} 
                      component={<Link href="/member/transactions" />}
                      active={pathname.includes('transactions') && true}
                  > 
                      Transactions
                  </MenuItem>
                  <MenuItem 
                      icon={<Ticket width={24} height={24} stroke={`${pathname.includes('tickets') ? '#ffffff' : '#BFBFBF'}`} />} 
                      component={<Link href="/member/tickets" />}
                      active={pathname.includes('tickets') && true}
                  > 
                      Tickets
                  </MenuItem>
                  <MenuItem 
                      icon={<Books width={24} height={24} stroke={`${pathname.includes('resources') ? '#ffffff' : '#BFBFBF'}`} />} 
                      component={<Link href="/resources" />}
                      active={pathname.includes('resources') && true}
                  > 
                      Resources
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </Sidebar>
      </div>
      <div className={`${toggled ? 'xs:w-full' : collapsed ? 'sm:w-[95%]' : 'xs:w-full sm:w-[83.6%]'} h-full`}>
        <main className='h-screen w-full bg-[#F5F5F5] overflow-hidden'>
          <div className='flex justify-between xs:px-4 pt-4 sm:pr-6 xs:pb-3 sm:pb-0 w-full'>
            <div className='xs:hidden sm:flex'></div>
            <HambergerMenu className=' sm:py-0 sm:pl-0 xs:flex sm:hidden' size={20} variant='Outline' color={`${PRIMARY_TWO}`} onClick={() => setToggled(!toggled)} />
            <div className='flex items-center float-end xs:-mr-7 sm:mr-0 sm:gap-4'>
              <BellSimple className='float-start' size={24} color='#150D09' />
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: "/assets/profile.svg",
                    }}
                    className="transition-transform w-full"
                    name={
                      <div className='flex space-x-2 leading-3 -mb-1 xs:hidden sm:flex'>
                        <h1 className='text-[12px] leading-3'>{getFullname()}</h1>
                        <ArrowDown2 variant='Outline' color='#000' size={16} />
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
          <div className={`sm:-mt-6 xs:mt-0 h-full w-full`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MemberLayout