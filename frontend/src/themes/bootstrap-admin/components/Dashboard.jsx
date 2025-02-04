import React from "react"
import Table from "./dashbord/Table"
import db from '../../../libs/db';
import {useState} from 'react';

export default class Dashboard extends React.Component{
    async getConfigs(){
      try {
        // await firestore.collection('config').doc().set({server_ip:'127.0.0.1'});
        const configs = await db.collection('configs');
        const data = await configs.get();
        const configsArray = [];
        if(data.empty) {
            console.log('data empty');
        }else {
            data.forEach(doc => {
                
                configsArray.push(doc.data());
            });
            console.log(configsArray);

        }
      } catch (error) {
          console.log(error.message);
      }

    }
    componentDidMount(){
        /* globals Chart:false, feather:false */

(function () {
    'use strict'
  
    feather.replace({ 'aria-hidden': 'true' })
  
    // Graphs
    var ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-unused-vars
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        datasets: [{
          data: [
            15339,
            21345,
            18483,
            24003,
            23489,
            24092,
            12034
          ],
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        },
        legend: {
          display: false
        }
      }
    })
  })()
    }
    render(){
      this.getConfigs();
        return(
            <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                    <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                    <span data-feather="calendar"></span>
                    This week
                </button>
                </div>
            </div>

            <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas>
            <Table/>
            </>
        )
    }
}