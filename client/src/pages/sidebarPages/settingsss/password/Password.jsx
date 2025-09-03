import { updatePasswordSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contextStore/Index";
import { updateUserPassword, logout } from "@/api/auth";
import ErrorAlert from "@/component/ErrorAlert";

export default function Password() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { accessToken, setAccessToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(updatePasswordSchema) });

  const Password = () => {
    setIsVisible((prev) => !prev);
  };
  const toggleNewPassword = () => {
    setNewVisible((prev) => !prev);
  };
  const toggleConfirmPassword = () => {
    setConfirmVisible((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: async (response) => {
      if (response.status === 200) {
        toast.success(response?.data?.message);
        //After password update, log the user out
        try {
          const res = await logout(accessToken);
          if (res.status === 200) {
            setAccessToken(null);
            queryClient.invalidateQueries({ queryKey: ["auth_user"] });
          }
        } catch {
          //fall back to local cleanup even if API fails
          queryClient.invalidateQueries({ queryKey: ["auth_user"] });
          setAccessToken(null);
          navigate("/account/signin");
        }
      }
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Error updating password");
    },
  });
  const onSubmit = async (userData) => {
    mutation.mutate({ userData, accessToken });
  };
  return (
    <>
      <h1 className="font-bold text-2xl border-b boarder-gray-300 pb-2">
        Update Password
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-4 pt-10"
      id="/dashboard/settings/password"
      >
        {error && <ErrorAlert error={error} />}
        <div>
          <fieldset className="fieldset relative">
            <legend className="fieldset-legend">Password</legend>
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Password"
              className="input w-[280px] md:w-md"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-5 border-0 cursor-pointer"
              onClick={Password}
            >
              {isVisible ? "Hide" : "Show"}
            </button>
          </fieldset>
          {errors.password?.message && (
            <span className="text-xs text-red-500">
              {errors.password?.message}
            </span>
          )}
        </div>
        <div>
          <fieldset className="fieldset relative">
            <legend className="fieldset-legend">New Password</legend>
            <input
              type={newVisible ? "text" : "password"}
              placeholder="New Password"
              className="input w-[280px] md:w-md"
              {...register("newPassword")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-5 border-0 cursor-pointer"
              onClick={toggleNewPassword}
            >
              {newVisible ? "Hide" : "Show"}
            </button>
          </fieldset>
          {errors.newPassword?.message && (
            <span className="text-xs text-red-500">
              {errors.newPassword?.message}
            </span>
          )}
        </div>
        <div>
          <fieldset className="fieldset relative">
            <legend className="fieldset-legend">Confirm Password</legend>
            <input
              type={confirmVisible ? "text" : "password"}
              placeholder="Confirm Password"
              className="input w-[280px] md:w-md"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-5 border-0 cursor-pointer"
              onClick={toggleConfirmPassword}
            >
              {confirmVisible ? "Hide" : "Show"}
            </button>
          </fieldset>
          {errors.confirmPassword?.message && (
            <span className="text-xs text-red-500">
              {errors.confirmPassword?.message}
            </span>
          )}
        </div>
        <p>Note: You will be logged out after updating your password.</p>
        <div className=" lg:hidden flex items-center gap-4">
          <button
            type="button"
            className="btn btn-outline w-[140px] border border-gray-300 hover:rounded-full"
            onClick={() => navigate("/sidebarPage/settings")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="  hover:rounded-full bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold border border-gray-300 p-2  w-[140px]"
            disabled={isSubmitting || mutation.isPending}
          >
            {isSubmitting || mutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}
