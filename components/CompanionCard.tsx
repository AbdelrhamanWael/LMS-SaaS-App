import Image from "next/image"

import Link from "next/link";

import BookmarkButton from "./BookmarkButton";

interface CompanionCardProps {
  id: string
  name: string
  topic: string
  subject: string
  duration: number
  color: string
  isBookmarked?: boolean
}

const CompanionCard = ({ id, name, topic, subject, duration, color, isBookmarked = false }: CompanionCardProps) => {
  return (
    <article className="companion-card hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="size-10 flex items-center justify-center rounded-lg bg-white/50">
            <Image src={`/icons/${subject.toLowerCase()}.svg`} alt={subject} width={24} height={24} />
          </div>
          <div className="subject-badge">
            {subject}
          </div>
        </div>
        <BookmarkButton companionId={id} initialIsBookmarked={isBookmarked} />

      </div>
      <h2 className="text-2xl font-bold mt-4">{name}</h2>
      <p className="text-sm text-gray-700 line-clamp-2">{topic}</p>
      <div className="flex items-center gap-2 ">
        <Image src="/icons/clock.svg" alt="Duration" width={12.5} height={12.5} />
        <span className="text-sm text-gray-700">{duration} mins</span>
      </div>
      <Link href={`/companions/${id}`} className="w-full" >
        <button className="btn-primary w-full justify-center ">
          Launch Lesson
        </button>
      </Link>
    </article>
  )
}

export default CompanionCard