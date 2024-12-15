import styled from 'styled-components';
import { Entity } from '~/entities';

// Props for the TableRow component
interface TableRowProps {
  item: Entity;
  onRowCLick: (item: Entity) => void;
}

// Styled Components
const TableWrapper = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HeaderCell = styled.th`
  background-color: #f4f4f4;
  padding: 1rem;
  border: 1px solid;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #e4e4e4;
  }
`;

const SortIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
`;

const TableRowStyled = styled.tr`
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #dfa;
    transition: all 0.2s ease-in;
  }
`;

const Cell = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;

// Component for rendering a single table row
function TableRow({ item, onRowCLick }: TableRowProps) {
  return (
    <TableRowStyled onClick={() => onRowCLick(item)}>
      <Cell>{item.id}</Cell>
      <Cell>{item.firstName}</Cell>
      <Cell>{item.lastName}</Cell>
      <Cell>{item.email}</Cell>
      <Cell>{item.phone}</Cell>
    </TableRowStyled>
  );
}

// Define types for sorting state
export interface SortConfig {
  key: keyof Entity;
  direction: 'asc' | 'desc';
}

interface TableHeaderProps {
  onColumnClick: (key: keyof Entity) => void;
  sortConfig: SortConfig | null;
}

// Component for rendering the table header
function TableHeader(props: TableHeaderProps) {
  const { onColumnClick, sortConfig } = props;

  const renderSortIndicator = (key: keyof Entity) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? '⬆️' : '⬇️';
    }
    return null;
  };

  function HeaderCellComponent({ title }: { title: keyof Entity }) {
    const renderTitle = () => {
      switch (title) {
        case 'firstName':
          return 'First Name';
        case 'lastName':
          return 'Last Name';
        default:
          return title.toUpperCase();
      }
    };

    return (
      <HeaderCell onClick={() => onColumnClick(title)}>
        <span>{renderTitle()}</span>
        <SortIcon>{renderSortIndicator(title)}</SortIcon>
      </HeaderCell>
    );
  }

  return (
    <tr>
      <HeaderCellComponent title="id" />
      <HeaderCellComponent title="firstName" />
      <HeaderCellComponent title="lastName" />
      <HeaderCellComponent title="email" />
      <HeaderCellComponent title="phone" />
    </tr>
  );
}

// Props for the Table component
interface TableProps {
  data: Entity[];
  sortConfig: SortConfig | null;
  onColumnClick: (key: keyof Entity) => void;
  onRowCLick: (item: Entity) => void;
  activeItem?: Entity | null;
}

// Component for rendering the full table
export function Table(props: TableProps) {
  const { data, sortConfig, onColumnClick, onRowCLick } = props;

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <TableHeader sortConfig={sortConfig} onColumnClick={onColumnClick} />
        </thead>
        <tbody>
          {data.map((item) => (
            <TableRow key={JSON.stringify(item)} item={item} onRowCLick={onRowCLick} />
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
}
