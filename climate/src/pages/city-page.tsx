// const CityPage = () => {
//     return (
//         <div>
//             <h1>City Page</h1>
//         </div>
//     );
// };

// export default CityPage;


import { useParams } from 'react-router-dom';

const CityPage = () => {
  const { cityName } = useParams<{ cityName: string }>();

  return (
    <div>
      <h1>Weather in {cityName}</h1>
    </div>
  );
};

export default CityPage;
