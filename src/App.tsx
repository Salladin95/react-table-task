import React from 'react'
import { Table, TableRowItem, SortConfig } from './widgets/Table'

import './index.scss'

function App() {
  const [tableData, setTableData] = React.useState<TableRowItem[]>([]) // State to hold fetched data
  const [loading, setLoading] = React.useState(true) // State to indicate loading
  const [sortConfig, setSortConfig] = React.useState<SortConfig | null>(null) // State to manage sorting configuration

  function handleSort(sort: SortConfig) {
    const { key, direction } = sort
    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1
      }
      return 0
    })
    setTableData(sortedData)
  }

  React.useEffect(() => {
    // Fetch data from the API
    fetch(TABLE_DATA_URL)
      .then((response) => response.json())
      .then((data) => {
        setTableData(data) // Update state with fetched data
        setLoading(false) // Turn off loading indicator
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false) // Ensure loading stops even if an error occurs
      })
  }, []) // Run effect only once on component mount

  if (loading) {
    return <div>Loading...</div> // Show loading indicator while fetching
  }

  function handleTableClick(key: keyof TableRowItem) {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
    handleSort({ key, direction })
  }

  return <Table sortConfig={sortConfig} onTableClick={handleTableClick} data={tableData} />
}

const TABLE_DATA_URL =
  'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'

export default App
