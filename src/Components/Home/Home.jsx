
import { ImportExportHubContext } from '../../../Contexts/importExportHubContext';
import RecentProducts from '../../RecentProducts/RecentProducts';
import HeroBanner from '../../HeroBanner/HeroBanner';
import { ClipLoader } from 'react-spinners';
import NewsLetter from '../../NewsLetter/NewsLetter';
import BrowseByCategory from '../../BrowseByCategory/BrowseByCategory';
import Feature from '../Feature/Feature';
import WorkingIndustries from '../WorkingIndustries/WorkingIndustries';
import Testimonial from '../Testimonial/Testimonial';
import Faqs from '../Faqs/Faqs';

const Home = () => {





    return (
        <>

            <div className='mx-auto flex flex-col items-center'>
                <title>Home - IE Hub</title>
                <HeroBanner></HeroBanner>
                <BrowseByCategory></BrowseByCategory>
                <h1 className='text-center text-indigo-900 font-bold text-3xl mt-9 underline'>Recent Products</h1>
                <RecentProducts></RecentProducts>
                <Feature></Feature>
                <WorkingIndustries></WorkingIndustries>
                <Testimonial></Testimonial>
                <Faqs></Faqs>
                <NewsLetter></NewsLetter>
            </div>
        </>
    );
};

export default Home;