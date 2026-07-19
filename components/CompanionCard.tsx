import Image from "next/image"

import Link from "next/link";

interface CompanionCardProps {
  id: string
  name: string
  topic: string
  subject: string
  duration: number
  color: string
}

const CompanionCard = ({ id, name, topic, subject, duration, color }: CompanionCardProps) => {
  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="size-10 flex items-center justify-center rounded-lg bg-white/50">
            <Image src={`/icons/${subject.toLowerCase()}.svg`} alt={subject} width={24} height={24} />
          </div>
          <div className="subject-badge">
            {subject}
          </div>
        </div>
        <button className="companion-bookmark">
          <Image src="/icons/bookmark.svg" alt="Bookmark" width={12.5} height={15} />
        </button>

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