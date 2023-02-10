import React , { useEffect , useState } from 'react';
import { doc , db , getDoc } from '../firebase';
import './StatisticsSection.css';



const StatisticsSection = () => {

  const [statistics , setStatistics] = useState({});

  useEffect(  () => {

    const getStatisticsData = async () => { 

      const docRef = doc(db, "statistics", "cBx7Bqex76nwxf9QbVK2");
      const docSnap = await getDoc(docRef);

   
      if (docSnap.exists()) { 
       
        setStatistics( docSnap.data() );
      }
 
    }
  
    
    getStatisticsData();
   

  } , []);


  return (
    <div className='statisticsSection' >

             
    <div className="d-flex-c">

    <div className="reactangle_headline text-center"></div>
    <div>
    <h1 className="main_headline text-center">Statistics Section </h1>


    </div>


    </div>

        <div className="mt-5"></div>
    
    {statistics && (
          <div className="d-flex-c f-sv f-wrap">

    <div className="single_statistic_div">
        <img src="/images/icons/group.png" alt="" />
        <h1 className="main_headline"> Stable cases </h1>
        <div className="mt-1"></div>
    <h4 className="info_group"> {statistics.stable_case_number} </h4>
      

    </div>

    <div className="cross_line_div"></div>

    <div className="single_statistic_div">
        <img src="/images/icons/group.png" alt="" />
        <h1 className="main_headline"> Medium cases </h1>
        <div className="mt-1"></div>
    <h4 className="info_group"> {statistics.medium_case_number} </h4>

        
    </div>

    <div className="cross_line_div"></div>

    <div className="single_statistic_div">
        <img src="/images/icons/group.png" alt="" />
        <h1 className="main_headline"> Critical cases </h1>
        <div className="mt-1"></div>
    <h4 className="info_group"> {statistics.critical_case_number} </h4>
        


    </div>

    </div>
    )}


    </div>
  )
}

export default StatisticsSection