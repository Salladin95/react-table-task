import styled from 'styled-components'

// Define types for the table row item
export interface Entity {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const DetailsContainer = styled.div`
	margin-top: 20px;
	padding: 10px;
	border: 1px solid #ccc;
`

const Title = styled.h3`
	margin-bottom: 10px;
	font-size: 1.2rem;
	color: #333;
`

const Info = styled.p`
	margin: 5px 0;
	font-size: 1rem;

	strong {
		font-weight: bold;
	}
`

export function DetailsInfo(props: Entity) {
	if (!props) return null

	return (
		<DetailsContainer>
			<Title>Детальная информация</Title>
			<Info>
				<strong>Имя:</strong> {props?.firstName}
			</Info>
			<Info>
				<strong>Фамилия:</strong> {props?.lastName}
			</Info>
			<Info>
				<strong>Email:</strong> {props?.email}
			</Info>
			<Info>
				<strong>Телефон:</strong> {props?.phone}
			</Info>
		</DetailsContainer>
	)
}
