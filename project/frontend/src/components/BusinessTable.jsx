import React, { useEffect} from 'react';
import { useState } from 'react';
import Table from '../ui/Table.jsx';

const BusinessTable = () => {
  const [rows, setRows] = useState([]);
  const headers = ["id", "name", "kind", "location", "phone"];
  const refined = rows.map((row) =>([
    row.id,
    row.name,
    row.kind,
    row.location,
    row.phone
  ]))
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await fetch('http://localhost:3010/user/business');
        const data = await res.json();
        setRows(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchBusiness();
  }, []);
  return (
    <>
      <Table rows={refined} headers={headers}/>
      {/* {refined.map((e)=>(
        <p> {e}</p>
      ))}
      {headers.map((e)=>(
        <p> {e}</p>
      ))} */}

    </>
  );
};

export default BusinessTable;
