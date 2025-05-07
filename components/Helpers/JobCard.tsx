import { Job } from '@/data'
import Image from 'next/image'
import React from 'react'
import { BiMoney } from 'react-icons/bi'
import { FaMapLocation, FaRegBookmark } from 'react-icons/fa6'

interface Props {
  job: Job
}

export const JobCard: React.FC<Props> = ({ job }) => {
  return (
      <div className="my-1 relative transition-transform duration-300 hover:scale-105 border-gray-600 rounded-lg border-2 border-opacity-20 p-1 md:p-2">
        <div className="flex items-center space-x-6">
          {/* Image */}
          <div>
            <Image
                src={job.image}
                alt={job.title}
                width={50}
                height={50}
                className="object-cover"
            />
          </div>
          {/* Content */}
          <div>
            <h1 className="text-base font-semibold mb-2">{job.title}</h1>
            <div className="flex items-center md:space-x-10 space-x-4">
              {/* Location */}
              <div className="flex items-center space-x-2">
                <FaMapLocation className="w-4 h-4 text-pink-600" />
                <p className="text-sm text-black font-semibold opacity-60">{job.location}</p>
              </div>
              {/* Salary */}
              <div className="flex items-center space-x-2">
                <BiMoney className="w-4 h-4 text-pink-600" />
                <p className="text-sm text-black font-semibold text-opacity-60">{job.salary}</p>
              </div>
            </div>
            {/* Tags */}
            <div className="flex items-center space-x-2 sm:space-x-4 mt-4">
            <span className="text-[10px] sm:text-sm text-opacity-80 px-2 sm:px-6 py-1 rounded-full bg-green-600 bg-opacity-30 font-semibold capitalize">
              {job.jobtype}
            </span>
              <span className="text-[10px] sm:text-sm text-opacity-80 px-2 sm:px-6 py-1 rounded-full bg-red-600 bg-opacity-30 font-semibold capitalize">
              Privado
            </span>
              <span className="text-[10px] sm:text-sm text-opacity-80 px-2 sm:px-6 py-1 rounded-full bg-blue-600 bg-opacity-30 font-semibold capitalize">
              Urgente
            </span>
            </div>
          </div>
        </div>

        <div className="absolute z-40 top-4 right-4">
          <FaRegBookmark className="hover:text-orange-600 cursor-pointer" />
        </div>
      </div>
  )
}
