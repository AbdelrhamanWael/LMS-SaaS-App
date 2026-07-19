
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {cn, getSubjectColor} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CompanionsListProps {
    title: string;
    companions?: any[];
    classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
    return (
        <article className={cn('companion-list', classNames)}>
            <h2 className="font-bold text-3xl mb-4">{title}</h2>

            {!companions || companions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
                    <Image src="/icons/search.svg" alt="Empty" width={48} height={48} className="opacity-20 mb-4" />
                    <p className="text-xl font-medium text-gray-500 text-center">No companions found.</p>
                    <p className="text-sm text-gray-400 text-center mt-1">Start a session or bookmark some companions to see them here.</p>
                </div>
            ) : (
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg w-2/3">Lessons</TableHead>
                        <TableHead className="text-lg">Subject</TableHead>
                        <TableHead className="text-lg text-right">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions.map(({id, subject = '', name, topic, duration, content}: any, index) => (
                        <TableRow key={id || `session-${index}`} className="hover:bg-gray-50 transition-colors group">
                            <TableCell>
                                <Link href={`/companions/${id}`}>
                                    <div className="flex items-center gap-2">
                                        <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden shadow-sm group-hover:shadow-md transition-shadow" style={{ backgroundColor: getSubjectColor(subject) }}>
                                            <Image
                                                src={`/icons/${subject?.toLowerCase() || 'default'}.svg`}
                                                alt={subject || 'Subject'}
                                                width={35}
                                                height={35} 
                                                className="opacity-80"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className="font-bold text-2xl">
                                                {name}
                                            </p>
                                            <p className="text-lg line-clamp-1 text-gray-500">
                                                {content || topic}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="subject-badge w-fit max-md:hidden">
                                    {subject}
                                </div>
                                <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden" style={{backgroundColor: getSubjectColor(subject)}}>
                            <Image
                                src={`/icons/${subject.toLowerCase()}.svg`}
                                alt={subject}
                                width={18}
                                height={18}
                            />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 w-full justify-end">
                                    {duration ? (
                                        <>
                                            <p className="text-2xl font-medium">
                                                {duration} {' '}
                                                <span className="max-md:hidden text-lg text-gray-500 font-normal">mins</span>
                                            </p>
                                            <Image src="/icons/clock.svg" alt="minutes" width={14} height={14} className="md:hidden opacity-70" />
                                        </>
                                    ) : (
                                        <p className="text-gray-400 text-sm italic">N/A</p>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            )}
        </article>
    )
}

export default CompanionsList;