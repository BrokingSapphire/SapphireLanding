import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function PartnerSupport() {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 p-12 max-w-7xl mx-auto">
            {/* Image Section */}
            <div className="flex items-center justify-center">
                <Image
                    src="/become-partner/partner-support.svg"
                    alt="Partner Support"
                    width={250}
                    height={250}
                    className=" w-[80%] md:w-full h-auto object-cover max-w-sm sm:max-w-md lg:max-w-lg transform translate-x-8 md:translate-x-12 lg:translate-x-0"
                />
            </div>
            
            {/* Text Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
                    For Partner Support queries, mail us at
                </h2>
                
                <Link 
                    href="mailto:partners@sapphirebroking.com"
                    className="inline-block text-lg sm:text-xl lg:text-2xl font-normal"
                    style={{ color: '#2F7FFF' }}
                >
                    partners@sapphirebroking.com
                </Link>
            </div>
        </div>
    );
}

export default PartnerSupport;