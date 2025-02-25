import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './WeatherForm.module.css'

function WeatherForm({ onSearch }) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('')
  const [latitudePlaceholder, setLatitudePlaceholder] = useState('latitude');
  const [longitudePlaceholder, setLongitudePlaceholder] = useState('longitude');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (latitude && longitude) {
        onSearch({latitude, longitude});
    }
  }
  
  return (
    <div className="custom-border">      
      <div style={{textAlign: "center"}}>
        <h4>Submit Coordinates</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input 
            type="text"
            className="form-control"
            placeholder={latitudePlaceholder}
            value={latitude}
            style={{textAlign:"center", width: "300px", margin: "0 auto"}}
            onChange={(e) => setLatitude(e.target.value)} 
            onFocus={() => setLatitudePlaceholder('')}
            onBlur={() => setLatitudePlaceholder('latitude')}
          />
        </div>   
        <div className="mb-3" style={{textAlign: "left"}}>
          <li className={styles.smallSecondaryText}>Positive values for the northern hemisphere</li>
          <li className={styles.smallSecondaryText}>Negative values for the southern hemisphere</li>
        </div>   
        <div className="mb-3">       
          <input 
            type="text"
            className="form-control"
            placeholder={longitudePlaceholder}
            value={longitude}
            style={{textAlign:"center", width: "300px", margin: "0 auto"}}    
            onChange={(e) => setLongitude(e.target.value)} 
            onFocus={() => setLongitudePlaceholder('')}
            onBlur={() => setLongitudePlaceholder('longitude')}
          />
        </div>        
      
        <div className="mb-3" style={{textAlign: "left"}}>       
          <li className={styles.smallSecondaryText}>Positive values for the eastern hemisphere</li>
          <li className={styles.smallSecondaryText}>Negative values for the western hemisphere</li>    
        </div>        
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary w-100" type="submit"> Submit </button>
        </div>
      </form>
    </div>
  )
  }

export default WeatherForm