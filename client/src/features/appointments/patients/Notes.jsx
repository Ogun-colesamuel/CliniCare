import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { validateBookAppointmentSchema} from "@/utils/dataSchema";
import Modal from "@/component/Modal";
import ErrorAlert from "@/component/ErrorAlert";
import { RiChat4Fill, RiCloseLine} from "@remixicon/react";

export default function Notes({ appointments }) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateBookAppointmentSchema),
    //   defaultValues: {
    //   roomNumber: rooms?.roomNumber || "",
    //   roomType: rooms?.roomType || "",
    //   roomPrice: rooms?.roomPrice || "",
    //   roomStatus: rooms?.roomStatus || "",
    //   roomDescription: rooms?.roomDescription || "",
    //   roomCapacity: rooms?.roomCapacity || "",
    // },
  });

  useEffect(() => {
    if (appointments) {
      setValue("notes", appointments?.notes);
    }
  }, [setValue, appointments]);


  return (
    <div>
      <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
              <RiChat4Fill className="text-blue-500" />
      </button>
      <Modal
        id="notesModal"
        isOpen={isOpen}
        classname="bg-white p-4 rounded-xl shadow w-[90%] max-w-[600px] mx-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-xl">Notes</h1>
          <RiCloseLine onClick={() => setIsOpen(false)} className="cursor-pointer"/>
        </div>
   
          <form>
            {/* notes */}
                    <div className="md:col-span-6">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-zinc-800 font-bold p-2">Note</legend>
                  <textarea 
                  className="w-full"
                  rows={4}
                  {...register("notes")}
                  placeholder="leave a note"
                  >
                    
                  </textarea>
                </fieldset>
                {errors.notes?.message && (
                  <span className="text-xs text-red-500">
                    {errors.notes?.message}
                  </span>
                )}
                
              </div>
              {appointments?.response && (
          <div>
            <div className="divider"></div>
            <h1 className="font-semibold">Admin Response</h1>
            <h1 className="my-2">{appointments.response}</h1>
          </div>
        )}
          </form>
      </Modal>
    </div>
  );
}