import Pagination from "./components/Pagination";

export default function Home() {
  return (
      <Pagination itemCount={100} pageSize={5} currentPage={1}/>
  )
}
