import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
// import {Button} from "@/components/ui/button";
const Page = () => {
  const recentSessionsCompanions = [
    {
      id: "r1",
      name: "Neura the Brainy Explorer",
      topic: "Neural Network of the Brain",
      subject: "Science",
      duration: 45,
      color: "#ffda6e",
    },
    {
      id: "r2",
      name: "Countsy the Number Wizard",
      topic: "Derivatives & Integrals",
      subject: "Maths",
      duration: 30,
      color: "#e6d4ff",
    },
  ];
  return (
    <main>
      <h1 >Popular Companions</h1>
      <section className="home-section">
        <CompanionCard
          id="1"
          name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="Science"
          duration={45}
          color="#ffda6e"
        />
        <CompanionCard
          id="2"
          name="Countsy the Number Wizard"
          topic="Derivatives & Integrals"
          subject="Maths"
          duration={30}
          color="#e6d4ff"
        />
        <CompanionCard
          id="3"
          name="Verba the Vocabulary Builder"
          topic="language"
          subject="English Literature"
          duration={30}
          color="#bde6ff"
        />
        
      </section>
      <section className="home-section">
        <div className="w-2/3 max-lg:w-full">
          
          <CompanionsList title="Recently Sessions" 
          companions={recentSessionsCompanions} 
          
          />
        </div>
        <CTA />

      </section>

    </main>
  )
}

export default Page