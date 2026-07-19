
import CompanionCard from '@/components/CompanionCard';
import { getAllCompanions } from '../../lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import SearchInput from '@/components/SearchInput';
import SubjectFilter from '@/components/SubjectFilter';



import { currentUser } from '@clerk/nextjs/server';
import { getBookmarkedCompanions } from '@/lib/actions/companion.actions';

const ComanionsLibrary = async ({searchParams} : SearchParams) => {

  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';

  const companions = await getAllCompanions({ subject, topic });
  const user = await currentUser();
  const bookmarkedCompanions = user ? await getBookmarkedCompanions(user.id) : [];
  const bookmarkedIds = new Set(bookmarkedCompanions.map((c: any) => c.id));

  return (
    <main>
      <section className='flex  flex-row justify-between w-full gap-4 mb-6'>
        <h1 className='text-[28px] font-bold'>Companion Library</h1>
        <div className="flex gap-4 items-center">
            <SearchInput />
            <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {companions.map((companion) => (
          <CompanionCard key={companion.id}
           {...companion}
           color={getSubjectColor(companion.subject)}
           isBookmarked={bookmarkedIds.has(companion.id)}
            />
        ))}

      </section>

      
    </main>
  )
}

export default ComanionsLibrary