import { FileDown, MoreHorizontal, Plus, Search, Filter } from 'lucide-react'
import { Header } from './components/header'
import { Tabs } from './components/tabs'
import { Button } from './components/ui/button'
import { Control, Input } from './components/ui/input'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from './components/ui/table'
import { Pagination } from './components/pagination'
import { keepPreviousData, useQuery  } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useDebounceValue from './hooks/useDebounceValue'



export interface TagResonse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: Tags[]
}

export interface Tags {
  title: string
  amountOfVideos: number
  id: string
}




export function App() {

  const [searchParams, setSearchParams] = useSearchParams() 
  const [filter, setFilter] = useState('')
  const debouncedFilter = useDebounceValue(filter, 1000)
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const urlFilter = searchParams.get('filter')
  
  useEffect(() => {
    setSearchParams(params => {
      params.set('page', '1')
      return params
    })
  },[debouncedFilter])
  
  const { data: tagsResponse, isLoading } = useQuery<TagResonse>({
    queryKey: ['get-tags',page, urlFilter],
    queryFn: async () => {
    const response = await fetch(`http://localhost:3333/tags?_page=${page}&_per_page=10&title=${debouncedFilter}`)
    const data = await response.json()
    console.log(data)

    // await new Promise(resolve => setTimeout(resolve, 2000))

    return data
  },
  placeholderData: keepPreviousData,
  // staleTime: 1000 * 60 * 10,
})

  if(isLoading) {
    return <div>Loading...</div>
  }

  const handleFilter = () => {
    setSearchParams(params => {
      params.set('page', '1')
      params.set('filter', filter)
      return params
    })
  }

  return (
    <div className="py-10 space-y-8">
      <div className="">
        <Header />
        <Tabs />
      </div>
      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold">Tags</h1>
        <Button variant='primary' className=" flex items-center gap-1.5 text-xs bg-teal-300 text-teal-950 font-medium rounded-full px-2 py-1 "><Plus className='size-3'/>Create new</Button>
        </div>

        <div className="flex items-center justify-between">
          <div className='flex items-center gap-3'>
          <Input variant="filter">
            <Search className="size-3" />
            <Control className="text-sm text-zinc-500" placeholder="Search..." onChange={e => setFilter(e.target.value)} />
          </Input>

          <Button onClick={handleFilter}>
            <Filter className="size-3" />
            Filter
          </Button>
          </div>

          

          <Button >
            <FileDown />
            Export
          </Button>

        </div>

        <Table>
          <TableHeader>
            <TableHead></TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Amount of videos</TableHead>
          </TableHeader>
          <TableBody>
            {tagsResponse?.data.map((tag) => {
              return (
                <TableRow key={tag.id}>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="flex flex-col  gap-0.5">
                      <span className="font-medium">{tag.title}</span>
                      <span className="text-xs text-zinc-500">{tag.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>{tag.amountOfVideos} video(s)</TableCell>
                  <TableCell>
                    <Button size='icon'><MoreHorizontal className='size-4'/></Button>
                  </TableCell>
                </TableRow>
              ) 
            })}
          </TableBody>
        </Table>
        {tagsResponse && <Pagination pages={tagsResponse.pages} items={tagsResponse.items} page={page} />}
      </main>
    </div>
  )
}

