import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;
///////////////
function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  //1). Filter
  const filterValue = searchParams.get('discount') || 'all';
  let filterCabins;
  if (filterValue === 'all') filterCabins = cabins;

  if (filterValue === 'no-discount')
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === 'with-discount')
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);
  ////
  //2). Sort
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');

  const modifier = direction === 'asc' ? 1 : -1;
  // console.log(filterCabins);
  // console.log('/////////');
  const sortedCabin = filterCabins?.sort(function (a, b) {
    return (a[field] - b[field]) * modifier;
  });

  /////////////
  if (!cabins?.length) return <Empty resource="cabins" />;

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns=" 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
