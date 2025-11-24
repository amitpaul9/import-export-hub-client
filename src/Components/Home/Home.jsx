
import { ImportExportHubContext } from '../../../Contexts/importExportHubContext';
import RecentProducts from '../../RecentProducts/RecentProducts';
import HeroBanner from '../../HeroBanner/HeroBanner';
import { ClipLoader } from 'react-spinners';

const Home = () => {





    return (
        <>

            <div className='mx-auto flex flex-col items-center'>
                <HeroBanner></HeroBanner>
                <h1 className='text-center text-indigo-900 font-bold text-3xl mt-9 underline'>Recent Products</h1>
               <RecentProducts></RecentProducts>
            </div>
        </>
    );
};

export default Home;