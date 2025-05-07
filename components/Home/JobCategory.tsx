import React from 'react'
import { Heading, JobCategoryCard } from '../../paths'
const JobCategory = () => {
    return (
        <div className='pt-8 md:pt-20 pb-8 md:pb-12'>
            {/* Heading */}
            <Heading mainHeading="Categoria populares de trabajo" subHeading="trabajos del 2025 - 293 añadidos hoy" />

            <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-3 items-center">
                <JobCategoryCard image='/images/icon1.png' category='Finanzas' openPosition='23' />
                <JobCategoryCard image='/images/icon2.png' category='Marketing' openPosition='13' />
                <JobCategoryCard image='/images/icon3.png' category='Enseñanzas' openPosition='53' />
                <JobCategoryCard image='/images/icon4.png' category='Desarollo' openPosition='13' />
                <JobCategoryCard image='/images/icon5.png' category='RRHH' openPosition='10' />
                <JobCategoryCard image='/images/icon6.png' category='Ingeneria' openPosition='8' />
                <JobCategoryCard image='/images/icon7.png' category='Asistencia' openPosition='42' />
                <JobCategoryCard image='/images/icon8.png' category='Medicina' openPosition='25' />
                <JobCategoryCard image='/images/icon9.png' category='PIMES' openPosition='31' />
            </div>
        </div>
    )
}

export default JobCategory