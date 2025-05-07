import React from 'react'
import { IconType } from 'react-icons';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa6'

interface Props {
    bgColor: string,
    Icon: IconType
}
const Footer = () => {
    const aboutItems = ['Trabajos', 'Privacidad', 'Politicas', 'Aplicaciones', 'Candidatos'];
    const quickLinkItems = ['Todos los trabajos', 'Detalles', '¿Como aplicar?', 'Resumen'];
    return (
        <div className='pt-20 pb-12 bg-black'>
            <div className='w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pb-8 border-b-2 border-white border-opacity-10'>
                {/* 1st part of footer */}
                <div>
                    <h1 className='text-2xl text-white mb-4 font-bold uppercase'>CONICTATE</h1>
                    <p className='text-sm text-white text-opacity-70'>Conectando empleadores y candidatos en Nicaragua con transparencia,
                        accesibilidad, innovación y empatía.</p>
                    {/* social icons */}
                    <div className='mt-6 flex items-center space-x-3'>
                        <SocialIcon bgColor={'blue'} Icon={FaFacebook} />
                        <SocialIcon bgColor={'sky'} Icon={FaTwitter} />
                        <SocialIcon bgColor={'red'} Icon={FaYoutube} />
                        <SocialIcon bgColor={'pink'} Icon={FaInstagram} />
                    </div>
                </div>
                {/* 2nd part of footer  */}
                <FooterSection title={'Sobre nosotros'} data={aboutItems} />
                {/* 3rd part of footer  */}
                <FooterSection title={'Accesos rapidos'} data={quickLinkItems} />
                {/* 4th part of footer */}
                <FooterSection title={'Contactanos'} data={['+505 22802353', 'CONICTATE@contact.com', 'Managua, Nicaragua']} />
            </div>
        </div>
    )
}
// COMPONENT FOR SECIAL ICON
const SocialIcon = ({ bgColor, Icon }: Props) => (
    <div className={`w-10 h-10 bg-${bgColor}-600 rounded-full flex items-center justify-center flex-col`}>
        <Icon className='text-white' />
    </div>
);
interface SectionProps {
    data: String[]
    title: String
}
// COMPONENT FOR FOOTER SECTION
const FooterSection = ({ data, title }: SectionProps) => (
    <div>
        <h1 className='text-[22px] w-fit text-white font-semibold mb-6'>{title}</h1>
        {data?.map((item, index) => <p key={index} className='text-base w-fit text-white text-opacity-50 hover:text-yellow-300 cursor-pointer '>{item}</p>)}
    </div>
)
export default Footer