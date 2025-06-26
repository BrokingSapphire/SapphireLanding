import PartnerSupport from '@/components/legal/BecomePartner/PartnerSupport'
import Section1 from '@/components/legal/BecomePartner/Section1'
import Section2 from '@/components/legal/BecomePartner/Section2'
import Section3 from '@/components/legal/BecomePartner/Section3'
import Section4 from '@/components/legal/BecomePartner/Section4'
import React from 'react'

function BecomePartner() {
  return (
    <>
    <div className='mt-20'>
    <Section1 />
    <Section2 />
    <Section3 />
    <Section4 />
    <PartnerSupport />
    </div>
    </>
  )
}

export default BecomePartner