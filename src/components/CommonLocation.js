import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function CommonLocation() {

  return (
    <div className="custom-border">
        <div style={{textAlign: "center"}}>
            <h4>Common Launch Locations</h4>
        </div>
        <table class = "table table-dark table-bordered">
            <thead>
                <tr>
                    <th scope="col">Location</th>
                    <th scope="col">Launch Name</th>
                    <th scope="col">Latitude</th>
                    <th scope="col">Longitude</th>                
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td scope="row">Boulder, CO</td>
                    <td>North Boulder Launch</td>
                    <td>40.0562</td>
                    <td>-105.299</td>
                </tr>
                <tr>
                    <td scope="row">Golden, CO</td>
                    <td>Lookout Mountain</td>
                    <td>39.7461</td>
                    <td>-105.240</td>
                </tr>
                <tr>
                    <td scope="row">Grand Junction, CO</td>
                    <td>Otto's Ridge</td>
                    <td>39.2777</td>
                    <td>-108.994</td>
                </tr>
                <tr>
                    <td scope="row">Dominical, CR</td>
                    <td>Dominical Launch</td>
                    <td>9.23883</td>
                    <td>-83.8177</td>
                </tr>
                <tr>
                    <td scope="row">Torrey Pines, CA</td>
                    <td>TP Gliderport</td>
                    <td>32.8899</td>
                    <td>-117.251</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default CommonLocation