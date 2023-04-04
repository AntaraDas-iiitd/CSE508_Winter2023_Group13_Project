// import logo from './logo.svg';
// import './App.css';
// import { Card, Button } from 'react-bootstrap';

// import React, { useState } from 'react';

// function App() {
//   const [query, setQuery] = useState('');
//   const [data, setData] = useState([]);

//   const handleInputChange = (event) => {
//     setQuery(event.target.value);
//   }

//   const handleButtonClick = async () => {
//     const response = await fetch(`http://localhost:5000/api/data?query=${query}`);
//     const textData = await response.json();
//    // const jsonData = await response.text();
//     setData(textData);
//   console.log(textData);


//     // const response = await fetch(`/api/data?query=${query}`);
//     // const jsonData = await response.json();
//     // setData(jsonData);
//   }

//   // const handleButtonClick = () =>{
//   //   fetch(`http://localhost:5000/api/data`).then(

//   //     res =>res.json()

//   //   ).then(
      
//   //       data =>{
//   //         setData(data)
//   //         console.log(data)
//   //       }
//   //     )
//   //   }
  

//   return (
//     <div>
//    <div className='header-container'>
//   <h1>Travel Spots</h1>
//   <input type="text" value={query} onChange={handleInputChange} />
//   <button onClick={handleButtonClick}>Search</button>
// </div>

      
//       <div className="container-fluid">
//   <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3" style={{display: 'flex', flexWrap: 'wrap'}}>
//     {data.map((item, index) => (
//       <div key={index} className="col">
//         <div className="card h-100" style={{margin: '10px', boxShadow: '5px 5px 10px #888888'}}>
//           <img src={item.imageUrls} className="card-img-top" alt={item.title} />
//           <div className="card-body">
//             <h5 className="card-title">{item.title}</h5>
//             <p className="card-text">{item.description}</p>
//           </div>
//           <ul className="list-group list-group-flush">
//             <li className="list-group-item">City: {item.city}</li>
//             <li className="list-group-item">State: {item.state}</li>
//           </ul>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>





//     </div>
//   );
// }


// export default App;


// {/* <div className="container">
//       <div className="row">
//        {data.map((item, index) => (
//           <div key={index} className="col-md-6 mb-4">
//             <Card >
//             <Card.Img 
//   variant="top" 
//   src={item.imageUrls} 
//   onError={(e) => {e.target.onerror = null; e.target.src=''}}
// />


//               {/* <Card.Img variant="top" src={item.imageUrls} /> */}
//     //           <Card.Body>
//     //             <Card.Title>{item.title}</Card.Title>
//     //             <Card.Text>{item.description}</Card.Text>
//     //             {/* <Button variant="primary">Learn More</Button> */}
//     //           </Card.Body>
//     //         </Card>
//     //       </div>
//     //     ))}
//     //   </div>
//     // </div>  */}


import logo from './logo.svg';
import './App.css';
import OpenPlace from './OpenPlace.js'

import React, { useState } from 'react';


function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState({ rows: [], currentPage: 1 });
  // const [clicked, setClicked] = useState(false);
  // const history = useHistory();

  // const handleClickCard = () => {
  //   setClicked(true);
  //   history.push('/open-place');

  // };
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }

  const handleButtonClick = async () => {
    const response = await fetch(`http://localhost:5000/api/data?query=${query}`);
    const textData = await response.json();
    setData({ rows: textData, currentPage: 1 });
  }

  const handlePageChange = (pageNumber) => {
    setData({ ...data, currentPage: pageNumber });
  }

  const ROWS_PER_PAGE = 9;
  const startIndex = (data.currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const visibleRows = data.rows.slice(startIndex, endIndex);

  return (
    <div>
   
      <div className='header-container'>
        <h1>Travel Spots</h1>
        <input type="text" value={query} onChange={handleInputChange} />
        <button onClick={handleButtonClick}>Search</button>
      </div>
  
        <div   className="container-fluid">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {visibleRows.map((item, index) => (
            <div key={index} className="col">
              <div  className="card h-100" style={{ margin: '10px', boxShadow: '5px 5px 10px #888888' }}>
                <img src={item.imageUrls} className="card-img-top" alt={item.title} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">City: {item.city}</li>
                  <li className="list-group-item">State: {item.state}</li>
                </ul>
              </div>
            </div>
          ))}

          
        </div>
        <div className="pagination-container">
          {data.rows.length > ROWS_PER_PAGE && (
            <nav aria-label="Page navigation" style = {{marginLeft :"43%", marginTop: "20px"}}>
              <ul className="pagination">
                {[...Array(Math.ceil(data.rows.length / ROWS_PER_PAGE)).keys()].map(pageNumber => (
                  <li key={pageNumber} className={`page-item ${pageNumber + 1 === data.currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(pageNumber + 1)}>{pageNumber + 1}</button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    

    </div>
  );
}

export default App;
