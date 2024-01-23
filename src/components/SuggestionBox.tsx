import React, { Dispatch, useEffect, MouseEventHandler, SetStateAction } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { suggestions } from '@/lib/data';

type SuggestionBoxProps = {
  handleSendMessage: (string?: string) => Promise<void>;
}

interface SuggestionBadgeProps {
  children: React.ReactNode,
  onClick: MouseEventHandler<HTMLDivElement>
}

const SuggestionBox = ({ handleSendMessage }: SuggestionBoxProps) => {
  return (
    <Card className='w-full bg-cyan-50 border-teal-200 border rounded-xl'>

      <CardHeader>
        <div className="flex flex-row items-center gap-x-1">
          <img src="ai-icon.svg" alt="" className='w-14 h-1w-14' />
          <div>
            <CardTitle>
              <div className="flex items-center">
                <span className='text-green-400 font-medium mr-1'>Hello</span>
                <span className='font-bold text-cyan-500'>UOVT !</span>
              </div>
            </CardTitle>
            <CardDescription className='text-[10px] text-gray-600'>Start with a little suggestion.</CardDescription>
          </div>
        </div>
      </CardHeader>


      <CardContent className='flex items-center flex-wrap gap-2'>
        {suggestions.map((suggestion, index) =>
          <SuggestionBadge key={index} onClick={() => handleSendMessage(suggestion)}>
            {suggestion}
          </SuggestionBadge>
        )}
      </CardContent>

      <CardFooter className='mt-3 flex justify-center'>
        <div className="flex flex-col">
          <p className="text-gray-500 text-[10px] text-center">Developed by</p>
          <p className="mt-1 text-xs font-medium text-center">Department of Software Technology</p>
          <p className="text-[9px] text-center">University of Vocational Technology</p>
        </div>
      </CardFooter>
    </Card>
  )
}

const SuggestionBadge = ({ children, onClick }: SuggestionBadgeProps) => {
  return (
    <div onClick={onClick} className="overflow-hidden h-8 rounded-full bg-gradient-to-r from-blue-500 via-green-300 to-cyan-400 p-0.5">
      <div className="rounded-full px-3 flex h-full w-full items-center justify-center bg-cyan-100 back">
        <h1 className="text-xs text-blue-900">{children}</h1>
      </div>
    </div>
  )
}

export default SuggestionBox