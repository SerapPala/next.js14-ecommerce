'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

//#region types

interface ModalProps{
    title:string;
    description : string;
    isOpen:boolean;
    onClose:()=>void;
    children?:React.ReactNode;
}

//#endregion

const Modal = ({description,isOpen, onClose,  title,children}:ModalProps) => {

    //#region states

    const [isMounted, setIsMounted] = useState(false);

    //#endregion

    //#region effects

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }
    //#endregion

    //#region functions

    const onChange = (open:boolean)=>{
        if(!open){
            onClose();
        }
    }

    //#endregion

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Modal
