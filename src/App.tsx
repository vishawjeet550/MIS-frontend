import DataTable from './component/DataTable';
import withNavbar from './hoc/withNavbar';

function App() {
  return (
    <div className="container mx-auto">
      <DataTable />
    </div>
  );
}

export default withNavbar(App);
