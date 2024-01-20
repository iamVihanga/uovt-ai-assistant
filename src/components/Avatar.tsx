import React from 'react'
import { Avatar as UIAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type AvatarProps = {
  isOnline?: boolean,
  dot?: boolean,
  userType: UserType
}

export default function Avatar({ isOnline, dot, userType }: AvatarProps) {
  return (
    <div className="relative">
      <UIAvatar className={`${isOnline ? ' border-2 border-green-500/85' : ''}`}>
        <AvatarImage
          src={userType === 'user' ? 'user.jpg' : userType === 'ai' ? 'UoVT-icon.png' : ''}
          className={`bg-white ${userType !== 'user' && 'p-1'}`}
        />
        <AvatarFallback>UOVT</AvatarFallback>
      </UIAvatar>
      {dot && <div className='w-3 h-3 bottom-0 right-0 bg-green-400 rounded-full absolute' />}
    </div>
  )
}