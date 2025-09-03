import PageWrapper from "@/component/PageWrapper";
// import { DummyData } from "@/utils/constant";
import AddUser from "@/features/users/AddUser";
import { getAllPatient } from "@/api/patients";
import Search from "@/component/Search";
import Filter from "@/features/patients/Filter";
import { useSearchParams } from "react-router";
import ErrorAlert from "@/component/ErrorAlert";
import { SkeletonTable } from "@/component/LazyLoader";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contextStore/Index";
import usePaginate from "@/hooks/usePaginate";
import Paginate from "@/component/Paginate";
import { lazy, Suspense } from "react";
const Table = lazy(() => import("@/features/patients/Table"));

export default function Patients() {
  const { accessToken } = useAuth();
  const [SearchParams] = useSearchParams();
  const page = Number(SearchParams.get("page")) || 1;
  const limit = Number(SearchParams.get("limit")) || 10;
  const query = SearchParams.get("query") || "";
  const gender = SearchParams.get("gender") || "";
  const bloodGroup = SearchParams.get("bloodGroup") || "";
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllPatient", page, limit, query, gender, bloodGroup],
    queryFn: () => getAllPatient(SearchParams, accessToken),
  });

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: data?.data?.data?.meta?.totalPages || 1,
    hasMore: data?.data?.data?.meta?.hasMore || false,
    currentPage: data?.data?.data?.meta?.currentPage || 1,
  });
  

  const patients = data?.data?.data?.patients || [];
  

  return (
    <PageWrapper>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">Patient</h1>
          <p className="text-gray-500">Manage your Patients</p>
        </div>
        {/* <div className=" hidden md:flex gap-4 justify-end"></div> */}
        <div className="  flex gap-4  items-center   md:justify-end">
          <AddUser />
        </div>
      </div>
      <div className="flex justify-end items-center">
        <Search id="search-users">
          <Filter />
        </Search>
      </div>
      {isPending ? (
        <SkeletonTable />
      ) : (
        <>
          {isError ? (
            <ErrorAlert error={error?.response?.data?.message} />
          ) : (
            <>
              {patients.length > 0 ? (
                <>
                  <Suspense fallback={<SkeletonTable />}>
                    <Table patients={patients} />
                  </Suspense>
                  <Paginate
                    totalPages={totalPages}
                    hasMore={hasMore}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                  />
                </>
              ) : (
                <p className="mt-4 font-semibold text-center">
                  No patient found
                </p>
              )}
            </>
          )}
        </>
      )}
    </PageWrapper>
  );
}
