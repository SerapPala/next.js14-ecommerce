
"use client"
import Modal from "@/components/modals/Modal";


export default function Home() {
  return (
     <div>
         {/* eslint-disable-next-line react/jsx-no-undef */}
       <Modal title={"modal title"} description={"modal description"} isOpen={true} onClose={()=>{}}>
           MODAL TEST
       </Modal>
     </div>
  );
}

