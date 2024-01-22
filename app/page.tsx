import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const currentPage = parseInt(searchParams.page, 10) || 1; // Use parseInt with base 10 and default to 1 if NaN
  return <Pagination itemCount={100} pageSize={5} currentPage={currentPage} />;
}
