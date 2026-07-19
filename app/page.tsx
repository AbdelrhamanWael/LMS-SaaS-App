import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import {recentSessions} from "@/constants";
import {getAllCompanions, getRecentSessions} from "@/lib/actions/companion.actions";
import {getSubjectColor} from "@/lib/utils";

import { currentUser } from '@clerk/nextjs/server';
import { getBookmarkedCompanions } from '@/lib/actions/companion.actions';

export const dynamic = "force-dynamic";

const Page = async () => {
    const companions = await getAllCompanions({ limit: 3 });
    const recentSessionsCompanions = await getRecentSessions(10);
    const user = await currentUser();
    const bookmarkedCompanions = user ? await getBookmarkedCompanions(user.id) : [];
    const bookmarkedIds = new Set(bookmarkedCompanions.map((c: any) => c.id));

  return (
    <main>
      <h1>Popular Companions</h1>

        <section className="home-section">
            {companions.map((companion) => (
                <CompanionCard
                    key={companion.id}
                    {...companion}
                    color={getSubjectColor(companion.subject)}
                    isBookmarked={bookmarkedIds.has(companion.id)}
                />
            ))}

        </section>

        <section className="home-section">
            <CompanionsList
                title="Recently completed sessions"
                companions={recentSessionsCompanions}
                classNames="w-2/3 max-lg:w-full"
            />
            <CTA />
        </section>
    </main>
  )
}

export default Page