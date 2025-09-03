import PageWrapper from "@/component/PageWrapper";
// import { DummyData } from "@/utils/constant";
// import AddUser from "@/features/users/AddUser";
import { getAllDoctor } from "@/api/doctors"; 
import Search from "@/component/Search";
import Filter from "@/features/doctors/Filter";
import { useSearchParams } from "react-router";
import ErrorAlert from "@/component/ErrorAlert";
import { SkeletonTable } from "@/component/LazyLoader";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contextStore/Index";
import usePaginate from "@/hooks/usePaginate";
import Paginate from "@/component/Paginate";
import { lazy, Suspense } from "react";
const Table = lazy(() => import("@/features/doctors/Table"));

export default function Doctors() {
  const { accessToken } = useAuth();
  const [SearchParams] = useSearchParams();
  const page = Number(SearchParams.get("page")) || 1;
  const limit = Number(SearchParams.get("limit")) || 10;
  const specialization = SearchParams.get("specialization") || "";
  const availability = SearchParams.get("availability") || "";
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllDoctor", page, limit, specialization, availability],
    queryFn: () => getAllDoctor(SearchParams, accessToken),
  });

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: data?.data?.data?.meta?.totalPages || 1,
    hasMore: data?.data?.data?.meta?.hasMore || false,
    currentPage: data?.data?.data?.meta?.currentPage || 1,
  });

  const doctors = data?.data?.data?.doctors || [];

  return (
    <PageWrapper>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">Doctors</h1>
          <p className="text-gray-500">Manage your Doctors</p>
        </div>
        {/* <div className=" hidden md:flex gap-4 justify-end"></div> */}
        <div className="  flex gap-4  items-center   md:justify-end">
          {/* <AddUser /> */}
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
              {doctors.length > 0 ? (
                <>
                  <Suspense fallback={<SkeletonTable />}>
                    <Table doctors={doctors} />
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
                  No Doctors Found
                </p>
              )}
            </>
          )}
        </>
      )}
    </PageWrapper>
  );
}
