import { TemplateList } from '@/components/ui/TemplateList'
import { Search } from 'lucide-react'
// import React from 'react'

export const TemplateContainer = () => {
  return (
    <div>
      <div className="">
        <div className="">
            <div className="">
                <h1 className="">Create a new form</h1>
                <div className="">
                     {/* create the component in ui folder with name of SearchBox */}
                    <div className="">
                        <input type="text" />
                        <div className="">
                            <Search className='h-5 w-5 text-slate-400' />
                        </div>
                    </div>
                </div>

                <TemplateList />
            </div>
        </div>
      </div>
    </div>
  )
}