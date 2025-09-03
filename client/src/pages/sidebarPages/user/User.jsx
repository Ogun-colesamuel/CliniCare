import { lazy, Suspense } from "react";
import PageWrapper from "@/component/PageWrapper";
import AddUser from "@/features/users/AddUser";
import { getAllUsers } from "@/api/auth";
import Search from "@/component/Search";
import Filter from "@/features/users/Filter";
import { useSearchParams } from "react-router";
import ErrorAlert from "@/component/ErrorAlert";
import { SkeletonCard } from "@/component/LazyLoader";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contextStore/Index";
import usePaginate from "@/hooks/usePaginate";
import Paginate from "@/component/Paginate";
const UserCards = lazy(() => import("@/features/users/UsersCard"));

export default function User() {
  const { accessToken } = useAuth();
  const [SearchParams] = useSearchParams();
  const page = Number(SearchParams.get("page")) || 1;
  const limit = Number(SearchParams.get("limit")) || 10;
  const query = SearchParams.get("query") || "";
  const role = SearchParams.get("role") || "";
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllUsers", page, limit, query, role],
    queryFn: () => getAllUsers(SearchParams, accessToken),
  });

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: data?.data?.data?.meta?.totalPages || 1,
    hasMore: data?.data?.data?.meta?.hasMore || false,
    currentPage: data?.data?.data?.meta?.currentPage || 1,
  });

  const users = data?.data?.data?.users || [];

  // if (isPending) {
  //   return <SkeletonCard />;
  // }

  return (
    <PageWrapper>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">User Data</h1>
          <p className="text-gray-500">Manage your list of users</p>
        </div>
        {/* <div className=" hidden md:flex gap-4 justify-end"></div> */}
        <div className="  flex gap-4  items-center   md:justify-end">
          <AddUser />
        </div>
      </div>
      <div className="flex justify-end items-center pb-4">
        <Search id="search-users">
          <Filter />
        </Search>
      </div>
      {isPending ? (
        <SkeletonCard />
      ) : (
        <>
          {isError ? (
            <ErrorAlert error={error?.response?.data?.message} />
          ) : (
            <>
              {users.length > 0 ? (
                <>
                  <Suspense fallback={<SkeletonCard />}>
                    <div className="grid grid-cols-12 gap-4 ">
                      {users.map((item) => (
                        <div
                          className="col-span-12 md:col-span-6 lg:col-span-4"
                          key={item._id}
                        >
                          <UserCards item={item} />
                        </div>
                      ))}
                    </div>
                  </Suspense>
                  <Paginate
                    totalPages={totalPages}
                    hasMore={hasMore}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                  />
                </>
              ) : (
                <p className="mt-4 font-semibold text-center">No users found</p>
              )}
            </>
          )}
        </>
      )}
    </PageWrapper>
  );
}