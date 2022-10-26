/* eslint-disable no-nested-ternary */
import { Pagination, TextField } from '@mui/material';
import { useState } from 'react';
import CarCard from '../../components/CarCard';
import CarsFilter from '../../components/CarsFilter';
import CustomSkeleton from '../../components/skeletons/skeleton';
import { CarsCount, CarsWithImagesRow } from '../../interfaces';
import './style.css';

function Cars() {
  const [cars, setCars] = useState<CarsWithImagesRow | []>([]);
  const [pagination, setPagination] = useState <CarsCount>(1);
  const [currentPage, setCurrentPAge] = useState<number>(1);
  const [loading, setLoading] = useState <boolean>(false);
  const [search, setSearch] = useState<string>('');
  const paginationHandler = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPAge(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="search_container">
      <CarsFilter
        setCars={setCars}
        setPagination={setPagination}
        setLoading={setLoading}
        currentPage={currentPage}
        search={search}
        setCurrentPAge={setCurrentPAge}
      />
      <div className="cars_Container">
        <TextField
          sx={{
            width: '50vw',
            mb: '1.5rem',
          }}
          id="outlined-basic"
          label="search"
          variant="outlined"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading
          ? (
            <div className="car_wrapper">

              <CustomSkeleton />
              <CustomSkeleton />
              <CustomSkeleton />
              <CustomSkeleton />
            </div>
          )

          : (cars?.length ? (
            <div className="car_wrapper">
              {cars.map((e) => (

                <CarCard
                  key={e.id}
                  image={
                  // eslint-disable-next-line max-len
                  e?.images[0].image
                }
                  carName={e.model}
                  quality={e.quality}
                  price={e.price}
                  mileage={e.mileage}
                  isGoodPrice={e.isGoodPrice}
                />
              ))}

            </div>
          ) : <h2 style={{ fontSize: '2rem' }}>NO results found</h2>)}
        <Pagination
          sx={{
            margin: '2rem 0rem',
          }}
          page={currentPage}
          onChange={paginationHandler}
          count={Math.ceil(pagination / 9)}
          variant="outlined"
        />
      </div>
    </div>
  );
}

export default Cars;
