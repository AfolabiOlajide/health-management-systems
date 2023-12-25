import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Student from '@/modules/students/Student'
import React from 'react'

const AdminDashboard = () => {
    return (
        <main className='cont mt-[3rem]'>
            <div className="flex gap-[1.5rem]">
            <Input className='border-gray' placeholder='Search students matric number' type='text'/>
            <Button className='bg-main hover:bg-main/70'>
                Search
            </Button>
            </div>

            {/* student found */}
            <div className="students mt-[4rem] grid grid-cols-3 gap-[1.3rem]">
                <Student matricNo='IFS/22/5678' name='Students name' id='qowiqwin'/>
                <Student matricNo='EWM/23/0099' name='Students name' id='qowiqwin'/>
                <Student matricNo='IFS/18/2456' name='Students name' id='qowiqwin'/>
                <Student matricNo='EEE/23/5122' name='Students name kjadcnkajcnakjcnakjcn' id='qowiqwin'/>
                <Student matricNo='MNE/19/5678' name='Students name' id='qowiqwin'/>
                <Student matricNo='MEE/22/5678' name='Students name' id='qowiqwin'/>
            </div>
        </main>
    )
}

export default AdminDashboard