import React, { useEffect, useState } from "react";
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from "./subcomponents/header";
import Footer from "./subcomponents/footer";
import { useNavigate } from 'react-router-dom';

export default function Report() {
    const [reportData, setReportData] = useState({
        totalItems: 0,
        availableItemsCount: 0,
        notAvailableItemsCount: 0,
        highestPriceItem: "",
        lowestQuantityItem: ""
    });

    useEffect(() => {
        axios.get('/api/reportData')
            .then(response => {
                setReportData(response.data);
            })
            .catch(error => console.error('There was an error fetching the report data:', error));
    }, []);

    const createPdf = () => {
        const doc = new jsPDF();
        doc.text('Items Report', 20, 20);
        doc.autoTable({
            startY: 30,
            head: [['#', 'Description', 'Value']],
            body: [
                ['1', 'Total number of items', reportData.totalItems],
                ['2', 'Available items count', reportData.availableItemsCount],
                ['3', 'Not available items count', reportData.notAvailableItemsCount],
                ['4', 'Highest price item', reportData.highestPriceItem],
                ['5', 'Lowest quantity item', reportData.lowestQuantityItem],
            ],
        });
        doc.save('items_report.pdf');
    };
    
    const navigate = useNavigate();

    return (
        <div>
            <Header />
          
            <h1 className="container">Items Report</h1>
            <table className="table table-striped table-hover container">
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Total number of items</td>
                        <td>{reportData.totalItems}</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Available items count</td>
                        <td>{reportData.availableItemsCount}</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Not available items count</td>
                        <td>{reportData.notAvailableItemsCount}</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>Highest price item</td>
                        <td>{reportData.highestPriceItem}</td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>Lowest quantity item</td>
                        <td>{reportData.lowestQuantityItem}</td>
                    </tr>
                </tbody>
            </table>
            <button type="button" className="btn btn-primary container" onClick={createPdf}>
                Create PDF of Report
            </button>
            <br/>
            <button type="button" className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: '20px', marginLeft: '45%' }}>
              View Items
            </button>
            <Footer />
        </div>
    );
}
