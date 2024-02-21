import { FileDown, MoreHorizontal, Plus, Search } from 'lucide-react'
import { Header } from './components/header'
import { Tabs } from './components/tabs'
import { Button } from './components/ui/button'
import { Control, Input } from './components/ui/input'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from './components/ui/table'
import { Pagination } from './components/pagination'

export function App() {
  

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
          <Input variant="filter">
            <Search className="size-3" />
            <Control className="text-sm text-zinc-500" placeholder="Search..." />
          </Input>

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
            {Array.from({ length: 10 }).map((_, index) => {
              return (
                <TableRow key={index}>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="flex flex-col  gap-0.5">
                      <span className="font-medium">React</span>
                      <span className="text-xs text-zinc-500">dadada56sd465a48wqd684a64</span>
                    </div>
                  </TableCell>
                  <TableCell>154 videos</TableCell>
                  <TableCell>
                    <Button size='icon'><MoreHorizontal className='size-4'/></Button>
                  </TableCell>
                </TableRow>
              ) 
            })}
          </TableBody>
        </Table>
        <Pagination pages={10} items={100} page={1} />
      </main>
    </div>
  )
}

