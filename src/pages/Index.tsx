import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { TimelineSection } from '@/components/sections/TimelineSection'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { LeadFormSection } from '@/components/sections/LeadFormSection'
import { FAQSection } from '@/components/sections/FAQSection'

export default function Index() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <TimelineSection />
      <LeadFormSection />
      <SocialProofSection />
      <FAQSection />
    </>
  )
}
