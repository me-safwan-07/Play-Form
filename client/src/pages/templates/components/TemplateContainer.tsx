import { TemplateList } from '@/components/ui/TemplateList'
import { TEnvironment } from '@/types/environment'
import { Search } from 'lucide-react'
// import React from 'react'
interface TemplateContainerProps {
  environment: TEnvironment | null
}
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

                <TemplateList 
                    // environment={environment}
                />
            </div>
        </div>
      </div>
    </div>
  )
}