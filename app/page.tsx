import TableList from "./components/TableList";
import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

export default function Home() {
  return (
    <div className="container mx-auto py-8 ">
      <main className="mx-4">
        <TableList />
      </main>
    </div>
  );
}
