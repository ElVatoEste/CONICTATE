import Image from 'next/image';
import React from 'react';
import { BiMoney } from 'react-icons/bi';
import { FaMapLocation, FaRegBookmark, FaTag } from 'react-icons/fa6';

interface Job {
  id: string;
  title: string;
  salary: string;
  location: string;
  jobtype: string;
  category: string;
  description?: string;
  createdByName?: string;
}

interface Props {
  job: Job;
}

export const JobCard: React.FC<Props> = ({ job }) => {
  return (
    <div className="my-2 relative transition-transform duration-300 hover:scale-[1.02] border-gray-600 rounded-lg border-2 border-opacity-20 p-4">
      <div className="flex flex-col gap-2">
        {/* Título */}
        <h1 className="text-lg font-bold text-[#05264e]">{job.title}</h1>

        {/* Datos clave */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaMapLocation className="text-pink-600" />
            {job.location}
          </div>
          <div className="flex items-center gap-2">
            <BiMoney className="text-pink-600" />
            {job.salary}
          </div>
          <div className="flex items-center gap-2">
            <FaTag className="text-pink-600" />
            {job.category}
          </div>
        </div>

        {/* Etiquetas */}
        <div className="flex gap-2 mt-2 flex-wrap">
          <span className="text-xs font-medium px-3 py-1 bg-green-100 rounded-full">{job.jobtype}</span>
          <span className="text-xs font-medium px-3 py-1 bg-red-100 rounded-full">Privado</span>
          <span className="text-xs font-medium px-3 py-1 bg-blue-100 rounded-full">Urgente</span>
        </div>

        {/* Descripción corta */}
        {job.description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
            {job.description}
          </p>
        )}

        {/* Publicado por */}
        {job.createdByName && (
          <p className="mt-1 text-xs text-gray-500 italic">Publicado por {job.createdByName}</p>
        )}
      </div>

      <div className="absolute z-40 top-4 right-4">
        <FaRegBookmark className="hover:text-orange-600 cursor-pointer" />
      </div>
    </div>
  );
};
