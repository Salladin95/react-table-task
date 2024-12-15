import React from 'react'
import { DetailsInfo, Entity } from './entities'
import { Input, StyledSearchIcon } from './shared/ui'
import { SortConfig, Table } from './widgets'

import './index.css'

async function fetchTableData() {
	return fetch(TABLE_DATA_URL).then((response) => response.json())
}

function App() {
	const [originalTableData, setOriginalTableData] = React.useState<Entity[]>([])
	const [tableCurrTableData, setCurrTableData] = React.useState<Entity[]>([])
	const [selectedRow, setSelectedRow] = React.useState<Entity | null>(null)
	const [loading, setLoading] = React.useState(true)
	const [sortConfig, setSortConfig] = React.useState<SortConfig | null>(null)

	const [searchValue, setSearchValue] = React.useState('')

	function handleSort(sort: SortConfig) {
		const { key, direction } = sort

		setCurrTableData((data) => {
			return data.sort((a, b) => {
				if (a[key] < b[key]) {
					return direction === 'asc' ? -1 : 1
				}
				if (a[key] > b[key]) {
					return direction === 'asc' ? 1 : -1
				}
				return 0
			})
		})
	}

	React.useEffect(() => {
		// Fetch data from the API
		fetchTableData()
			.then((data) => {
				setOriginalTableData(data)
				setCurrTableData(data)
				setLoading(false)
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
				setLoading(false) // Ensure loading stops even if an error occurs
			})
	}, []) // Run effect only once on component mount

	if (loading) {
		return <div>Loading...</div> // Show loading indicator while fetching
	}

	function handleFilter() {
		const lowerCaseFilter = searchValue.toLowerCase()
		const data = [...originalTableData]
		if (!lowerCaseFilter) {
			setCurrTableData(data)
		}
		setCurrTableData(
			data.filter(
				(v) =>
					v.firstName.toLowerCase().includes(lowerCaseFilter) ||
					v.lastName.toLowerCase().includes(lowerCaseFilter) ||
					v.email.toLowerCase().includes(lowerCaseFilter) ||
					v.phone.toLowerCase().includes(lowerCaseFilter),
			),
		)
	}

	function handleTableClick(key: keyof Entity) {
		let direction: 'asc' | 'desc' = 'asc'
		if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
			direction = 'desc'
		}
		setSortConfig({ key, direction })
		handleSort({ key, direction })
	}

	return (
		<main className="app">
			<Input
				onChange={(e) => setSearchValue(e.currentTarget?.value)}
				placeholder="Найти"
				suffix={<StyledSearchIcon onClick={handleFilter} />}
			/>
			<Table
				activeItem={selectedRow}
				onRowCLick={(rowItem) => setSelectedRow(rowItem)}
				sortConfig={sortConfig}
				onColumnClick={handleTableClick}
				data={tableCurrTableData}
			/>
			{selectedRow && <DetailsInfo {...selectedRow} />}
		</main>
	)
}

const TABLE_DATA_URL =
	'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'

export default App
