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
        <footer className="bg-black pt-12 pb-6">
            <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 border-b border-white border-opacity-10 pb-8">
                    {/* 1st part of footer */}
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl text-white mb-4 font-bold uppercase">CONICTATE</h1>
                        <p className="text-sm text-white text-opacity-70">
                            Conectando empleadores y candidatos en Nicaragua con transparencia,
                            accesibilidad, innovación y empatía.
                        </p>
                        {/* social icons */}
                        <div className="mt-6 flex flex-wrap justify-center md:justify-start items-center space-x-3">
                            <SocialIcon bgColor="blue" Icon={FaFacebook} />
                            <SocialIcon bgColor="sky" Icon={FaTwitter} />
                            <SocialIcon bgColor="red" Icon={FaYoutube} />
                            <SocialIcon bgColor="pink" Icon={FaInstagram} />
                        </div>
                    </div>

                    {/* 2nd part of footer  */}
                    <FooterSection title="Sobre nosotros" data={aboutItems} />

                    {/* 3rd part of footer  */}
                    <FooterSection title="Accesos rápidos" data={quickLinkItems} />

                    {/* 4th part of footer */}
                    <FooterSection
                        title="Contáctanos"
                        data={[
                            '+505 22802353',
                            'CONICTATE@contact.com',
                            'Managua, Nicaragua',
                        ]}
                    />
                </div>
                <div className="mt-6 text-center text-xs text-white text-opacity-50">
                    © {new Date().getFullYear()} Conictate. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    )
}

// COMPONENT FOR SOCIAL ICON
const SocialIcon = ({ bgColor, Icon }: Props) => (
    <div className={`w-10 h-10 bg-${bgColor}-600 rounded-full flex items-center justify-center`}>
        <Icon className="text-white text-lg" />
    </div>
);

interface SectionProps {
    data: string[];
    title: string;
}

// COMPONENT FOR FOOTER SECTION
const FooterSection = ({ data, title }: SectionProps) => (
    <div className="text-center md:text-left">
        <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
        <ul className="space-y-2">
            {data.map((item, idx) => (
                <li key={idx}>
                    <a className="text-base text-white text-opacity-50 hover:text-yellow-300 transition-colors duration-200" href="#">
                        {item}
                    </a>
                </li>
            ))}
        </ul>
    </div>
)

export default Footer
