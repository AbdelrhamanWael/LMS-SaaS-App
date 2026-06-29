import CompanionForm from "@/components/CompanionForm"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";



const NewCompanion = async () => {

  const {userId} = await auth();

  if(!userId) redirect('/sign-in');
  return (
    <main className='flex flex-col gap-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24'>
      <div className="flex flex-col gap-10 mx-auto" >
        <h1 className='text-4xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>Create your own Companion</h1>
        <CompanionForm />
      </div>
    </main>
  )
}

export default NewCompanion