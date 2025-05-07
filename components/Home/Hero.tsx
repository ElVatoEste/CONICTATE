import Image from 'next/image'
import HeroImg from '@/public/images/hero.svg'
import React from 'react'

const Hero = () => {
    return (
        <div className='pt-16 md:pt-20 pb-8 md:pb-12'>
            <div className='w-full min-h-[60vh] flex flex-col items-center justify-center'>
                <div className='w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-[2rem]'>
                    {/* content */}
                    <div>
                        <h1
                            className="
                            text-[20px] sm:text-[28px] lg:text-[36px] xl:text-[48px]
                            text-[#05264e]
                            leading-snug lg:leading-snug
                            font-extrabold
                            tracking-tight
                          "
                        >
                            La manera más sencilla de <span className="text-blue-500">conectar</span><br/>
                            empleadores y candidatos en Nicaragua
                        </h1>

                        <p className='text-[#4f5e6f] text-[16px] md:text-[18px] mt-[1rem]'>
                            CONICTATE es la plataforma digital que facilita la búsqueda y publicación de empleo,
                            brindando transparencia, accesibilidad, innovación y empatía a la comunidad laboral
                            nicaragüense.
                        </p>
                        {/* search box */}
                        <div className='mt-[1.5rem] flex'>
                            <input
                                className='w-[60%] md:w-[70%] lg:w-[75%] px-5 py-4 outline-none rounded-l-md bg-gray-200'
                                placeholder='Ej.: Desarrollador Frontend'
                                title='search box'
                                type="text"
                            />
                            <button
                                title='Presiona para buscar'
                                type='button'
                                className='px-5 py-4 rounded-r-md bg-blue-500 text-white font-semibold hover:bg-blue-700 transition-colors duration-300'
                            >
                                Buscar
                            </button>
                        </div>
                    </div>

                    {/* image */}
                    <div className='hidden lg:block'>
                        <Image src={HeroImg} alt="hero image" width={700} height={400}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
