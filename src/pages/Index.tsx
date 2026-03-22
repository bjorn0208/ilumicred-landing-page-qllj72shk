import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { TimelineSection } from '@/components/sections/TimelineSection'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { LegalSection } from '@/components/sections/LegalSection'
import { LeadFormSection } from '@/components/sections/LeadFormSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { FinalCTASection } from '@/components/sections/FinalCTASection'

export default function Index() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <TimelineSection />
      <SocialProofSection />
      <LegalSection />
      <LeadFormSection />
      <FAQSection />
      <FinalCTASection />
    </>
  )
}
