import React from 'react'
import { useSelector } from 'react-redux';
import { ClockIcon } from '@heroicons/react/24/solid';

const Announcement = () => {

    return (
        <>
            {false && (
                <div className="w-full bg-red-500 text-white py-1">
                    <div className="text-center text-[12px] sm:text-sm flex justify-center">
                        <ClockIcon className='w-6 h-6' /> &nbsp;
                        <p className='flex items-center'>{'Sorry we are close right now and will reopen at 2pm'}</p>
                    </div>

                </div>
            )}
        </>
    )
}

export default Announcement