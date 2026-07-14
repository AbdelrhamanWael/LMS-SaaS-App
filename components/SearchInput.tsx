"use client"

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Key } from 'lucide-react'
import {formUrlQuery ,removeKeysFromUrlQuery} from '@jsmastery/utils'

const SearchInput = () => {

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const query = searchParams.get('topic') || '';

    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {


        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,

            });

            router.push(newUrl, { scroll: false });
        }else{
            if(pathname === '/companions'){
                const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["topic"],
                });
                router.push(newUrl, { scroll: false });
            }
        }
           
        },500)

        }, [searchQuery, router, searchParams, pathname]);


    return (
        <div className='relative border border-gray-400 rounded-md items-center flex gap-2 px-3 py-1.5 h-fit'>
            <Image src="/icons/search.svg" alt="search" width={16} height={16} className='w-5 h-5' />
            <input
                className='flex-1 bg-transparent outline-none font-inter text-sm w-[180px] text-gray-700 placeholder:text-gray-500'
                type="text"
                value={searchQuery}
                placeholder='Search companions...'
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}

export default SearchInput 