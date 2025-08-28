import React, { useEffect, useState } from 'react';
import Table from '../ui/Table.jsx';

const BusinessTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = ["Profile", "Name"];

  // Refine rows for table consumption
  const refined = rows.map((row) => [//
    row.profile_path,
    row.name,
    row.id,
    row.kind,
    row.location,
    row.phone,
  ]);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await fetch('http://localhost:3010/user/business');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setRows(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 py-4">Loading businesses...</p>;
  }

  if (rows.length === 0) {
    return <p className="text-center text-gray-500 py-4">No businesses found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Table rows={refined} headers={headers} />
    </div>
  );
};

export default BusinessTable;
