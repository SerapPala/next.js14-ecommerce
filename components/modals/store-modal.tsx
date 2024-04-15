'use client'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Modal from '@/components/modals/Modal';
import { useStoremodal } from '@/hooks/use-store-modal';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const formSchema = z.object({
    name:z.string().min(1),
})

const StoreModal = () => {

    //#region states

    const storeModal = useStoremodal()

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:"",
        }

    })

    //#endregion

    //#region Form Submission

    const onSubmit = async(values: z.infer<typeof formSchema>)=>{

        try {

            setLoading(true)

            const response = await axios.post("/api/stores",values);

            window.location.assign(`/${response.data.id}`)

        } catch (error) {

            toast.error("Something went wrong")

        }
        finally{
            setLoading(false);
        }

    }

    //#endregion

    return (
        <Modal
            title='Create Store'
            description='Add a new store'
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}>
            <div>
                <div className='space-y-6 py-2 pb-6'>
                    <div className='space-y-6'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField control={form.control}
                                           name="name"
                                           render={({field})=>(
                                               <FormItem>
                                                   <FormLabel>Name</FormLabel>
                                                   <FormControl>
                                                       <Input
                                                           disabled={loading}
                                                           placeholder='E-commerce' {...field}>
                                                       </Input>
                                                   </FormControl>
                                                   <FormMessage/>
                                               </FormItem>
                                           )}/>
                                        <div className='pt-9 space-x-2 flex items-center justify-end w-full'>
                                            <Button  disabled={loading}  variant="secondary" onClick={storeModal.onClose}>Cancel</Button>
                                            <Button  disabled={loading}  variant="default" type='submit'>Contunie</Button>
                                        </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default StoreModal
