import React from 'react'

// Define types for the table row item
export interface TableRowItem {
  id: string | number
  firstName: string
  lastName: string
  email: string
  phone: string
}

// Props for the TableRow component
interface TableRowProps {
  item: TableRowItem
}

// Props for the HeaderCell and Row helper components
interface CellProps {
  children: React.ReactNode
}

// Component for rendering a single table row
function TableRow({ item }: TableRowProps) {
  // Helper component for rendering individual table cells
  const Row: React.FC<CellProps> = ({ children }) => {
    return <td style={tdStyle}>{children}</td> // Applies consistent styling to table cells
  }

  return (
    <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
      <Row>{item.id}</Row>
      <Row>{item.firstName}</Row>
      <Row>{item.lastName}</Row>
      <Row>{item.email}</Row>
      <Row>{item.phone}</Row>
    </tr>
  )
}

// Define types for sorting state
export interface SortConfig {
  key: keyof TableRowItem
  direction: 'asc' | 'desc'
}

interface TableHeaderProps {
  onTableClick: (key: keyof TableRowItem) => void
  sortConfig: SortConfig | null
}

// Component for rendering the table header
function TableHeader(props: TableHeaderProps) {
  const { onTableClick, sortConfig } = props
  const renderSortIndicator = (key: keyof TableRowItem) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? '⬆️' : '⬇️'
    }
    return null
  }
  //
  // Helper component for rendering individual header cells
  function HeaderCell({ title }: { title: keyof TableRowItem }) {
    function renderTitle() {
      switch (title) {
        case 'firstName':
          return 'First Name'
        case 'lastName':
          return 'Last Name'
        default:
          return title.toUpperCase()
      }
    }
    return (
      <th
        onClick={() => onTableClick(title)}
        style={thStyle}
      >
        <span>
          {renderTitle()}
        </span>
        <span>
          {renderSortIndicator(title)}
        </span>
      </th>
    )
  }

  return (
    <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
      <HeaderCell title="id" />
      <HeaderCell title="firstName" />
      <HeaderCell title="lastName" />
      <HeaderCell title="email" />
      <HeaderCell title="phone" />
    </tr>
  )
}

// Props for the Table component
interface TableProps {
  data: TableRowItem[]
  sortConfig: SortConfig | null
  onTableClick: (key: keyof TableRowItem) => void
}

// Component for rendering the full table
export function Table(props: TableProps) {
  const { data, sortConfig, onTableClick } = props
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
        <thead>
          <TableHeader sortConfig={sortConfig} onTableClick={onTableClick} />
        </thead>
        <tbody>
          {data.map((item) => (
            <TableRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Styling for table headers
const thStyle: React.CSSProperties = {
  padding: '10px', // Adds spacing inside header cells
  border: '1px solid #ccc', // Defines borders for header cells
  cursor: 'pointer'
}

// Styling for table cells
const tdStyle: React.CSSProperties = {
  padding: '10px', // Adds spacing inside regular cells
  border: '1px solid #ccc', // Defines borders for regular cells
}
