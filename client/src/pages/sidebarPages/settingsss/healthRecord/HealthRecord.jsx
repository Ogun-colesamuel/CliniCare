import useMetaArgs from "@/hooks/useMeta";
import { validatePatientSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bloodGroup, formatDate } from "@/utils/constant";
import { useAuth } from "@/contextStore/Index";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { registerPatient } from "@/api/patients";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import ErrorAlert from "@/component/ErrorAlert";
import { getPatient, updatePatient } from "@/api/patients";
import { LazyLoader } from "@/component/LazyLoader";

export default function HealthRecord() {
  useMetaArgs({
    title: "Health - Clincare",
    keywords: "Health, Register, Clinic, Hospital",
  });

  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [Error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validatePatientSchema),
  });

  const gender = ["male", "female", "other"];
  const bloodGroupOptions = Object.entries(bloodGroup).map(([key, value]) => ({
    name: key,
    id: value,
  }));
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["patient", accessToken],
    queryFn: () => getPatient(accessToken),
  });
const patientData= data?.data?.data;

  useEffect(() => {
    if (user) {
      setValue("fullname", user?.fullname);
      setValue("email", user?.email);
      setValue("phone", user?.phone);
      setValue("dateOfBirth", formatDate(user?.dateOfBirth));
      if (patientData) {
      setValue("gender", patientData?.gender || "");
      setValue("bloodGroup", patientData?.bloodGroup || "");
      setValue("address", patientData?.address || "");
      setValue("emergencyContact", patientData?.emergencyContact || "");
      setValue(
        "emergencyContactPhone",
        patientData?.emergencyContactPhone || ""
      );
      setValue(
        "emergencyContactRelationship",
        patientData?.emergencyContactRelationship || ""
      );
    }
  }
  }, [user, setValue, patientData]);

  const mutation = useMutation({
    mutationFn: updatePatient,
    onSuccess: (res) => {
      if (res.status === 200) {
        toast.success(res.data?.message);
        queryClient.invalidateQueries({ queryKey: ["patient"] });
      }
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Error updating your profile");
    },
  });


  if (isPending) {
    return <LazyLoader/>
  }
const onSubmit = async (formData) => {
    mutation.mutate({ patientId: patientData._id, formData, accessToken });
  };
  return ( 
    <>
      <h1 className="font-bold text-xl md:text-3xl">Health Information</h1>
      
      <hr />
      <br />
      <div>
        {error && <ErrorAlert error={error} />}
        <form
        onSubmit={handleSubmit(onSubmit)}
          id="/dashboard/settings/health"
          className="md:grid grid-cols-12 gap-4"
        >
          {/* {isError || (err && <Error)} */}
          
          <>
            {/* full name */}
            <div className="col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Full name</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Full name"
                  {...register("fullname")}
                />
              </fieldset>
              {errors.fullname?.message && (
                <span className="text-xs text-red-500">
                  {errors.fullname?.message}
                </span>
              )}
            </div>

            {/* email */}
            <div className="col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  {...register("email")}
                />
              </fieldset>
              {errors.email?.message && (
                <span className="text-xs text-red-500">
                  {errors.email?.message}
                </span>
              )}
            </div>

            {/* phone */}
            <div className="col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Phone</legend>
                <input
                  type="tel"
                  className="input w-full"
                  placeholder="Phone"
                  {...register("phone")}
                />
              </fieldset>
              {errors.phone?.message && (
                <span className="text-xs text-red-500">
                  {errors.phone?.message}
                </span>
              )}
            </div>

            {/* date of birth */}
            <div className="md:col-span-6">
              <fieldset className="fieldset col-span-6">
                <legend className="fieldset-legend">Date of birth</legend>
                <input
                  type="date"
                  className="input w-full"
                  placeholder="dd/mm/yyyy"
                  {...register("dateOfBirth")}
                />
              </fieldset>
              {errors.dateOfBirth?.message && (
                <span className="text-xs text-red-500">
                  {errors.dateOfBirth?.message}
                </span>
              )}
            </div>

            {/* Gender */}
            <div className="md:col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  defaultValue={""}
                  className="select capitalize w-full"
                  {...register("gender")}
                  disabled={isSubmitting}
                >
                  <option value="">Select Gender</option>
                  {gender?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </fieldset>
              {errors.gender?.message && (
                <span className="text-xs text-red-500">
                  {errors.gender?.message}
                </span>
              )}
            </div>

            {/* blood group */}
            <div className="md:col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Blood Group</legend>
                <select
                  defaultValue={""}
                  className="select capitalize w-full"
                  {...register("bloodGroup")}
                  disabled={isSubmitting}
                >
                  <option value={""}>Select Blood Group</option>
                  {bloodGroupOptions?.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </fieldset>
              {errors.bloodGroup?.message && (
                <span className="text-xs text-red-500">
                  {errors.bloodGroup?.message}
                </span>
              )}
            </div>
          </>

          {/* PART-2 */}
          <>
            <div className="col-span-12">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Address</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Address"
                  {...register("address")}
                />
              </fieldset>
              {errors.address?.message && (
                <span className="text-xs text-red-500">
                  {errors.address?.message}
                </span>
              )}
            </div>

            {/* emergency contact */}
            <div className="col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Emergency contact</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Emergency contact"
                  {...register("emergencyContact")}
                />
              </fieldset>
              {errors.emergencyContact?.message && (
                <span className="text-xs text-red-500">
                  {errors.emergencyContact?.message}
                </span>
              )}
            </div>

            {/* emergency phone */}
            <div className="col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Emergency contact phone
                </legend>
                <input
                  type="tel"
                  className="input w-full"
                  placeholder="Emergency contact phone"
                  {...register("emergencyContactPhone")}
                />
              </fieldset>
              {errors.emergencyContactPhone?.message && (
                <span className="text-xs text-red-500">
                  {errors.emergencyContactPhone?.message}
                </span>
              )}
            </div>

            {/* emergency relationship */}
            <div className="col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Emergency contact relationship
                </legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Emergency contact relationship"
                  {...register("emergencyContactRelationship")}
                />
              </fieldset>
              {errors.emergencyContactRelationship?.message && (
                <span className="text-xs text-red-500">
                  {errors.emergencyContactRelationship?.message}
                </span>
              )}
            </div>
          </>
          <br />
          {/* ACTION BUTTONS */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              type="button"
              className="btn btn-outline w-[140px] border border-gray-300 hover:rounded-full"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold border border-gray-300 p-2 rounded-md cursor-pointer w-[140px] hover:bg-blue-700 hover:rounded-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}