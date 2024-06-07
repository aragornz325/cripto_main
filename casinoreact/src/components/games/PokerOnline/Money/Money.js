import {
	Container,
	ContainerCinco,
	ContainerCuatro,
	ContainerDos,
	ContainerImagen,
	ContainerTres,
	H5,
	Imagen,
	Imagen2,
	Imagen3,
	Imagen4,
	Imagen5,
} from "./MoneyCardStyles";
const Money = ({
	smallBlind,
	bigBlind,
	users,
	userBigBlind,
	userSmallBlind,
}) => {

	const positions = [
		{
      top: '54%',
      left: '24.5%',
			bet: 500,      
			color: '#D869CF',
    },
    {
      top: '27%',
      left: '31%',
			bet: 1500,     
			color: '#03A0A3'
    },
    {
      top: '27%',
      left: '65.5%',
			bet: 5000,     
			color: '#D869CF'
    },
    {
      top: '54%',
      left: '72.5%',
			bet: 10,     
			color: '#03A0A3'
    },
	]

	return <>
		{positions.map((p, index) => {
			return <Container key={index} top={p.top} left={p.left}>
				<Imagen src="/assets/fichas/f1.png" />
				<ContainerImagen borderColor={p.color}>
					<H5>{p.bet}</H5>
				</ContainerImagen>
			</Container>
		})}
	</>

	return (
		<>
			<Container>
				<Imagen>
					<img
						src={`/assets/MonedasCasino/5Moneda.png`}
						alt=''
						width={21}
						height={30}
					/>
				</Imagen>
				<ContainerImagen>
					<H5>500</H5>
				</ContainerImagen>
			</Container>
			<ContainerDos>
				<Imagen2>
					<img
						src={`/assets/MonedasCasino/5Moneda.png`}
						alt=''
						width={21}
						height={30}
					/>
				</Imagen2>
				<ContainerImagen>
					<H5>200</H5>
				</ContainerImagen>
			</ContainerDos>
			<ContainerTres>
				<Imagen3>
					<img
						src={`/assets/MonedasCasino/5Moneda.png`}
						alt=''
						width={21}
						height={30}
					/>
				</Imagen3>
				<ContainerImagen>
					<H5>100</H5>
				</ContainerImagen>
			</ContainerTres>
			<ContainerCuatro>
				<Imagen4>
					<img
						src={`/assets/MonedasCasino/5Moneda.png`}
						alt=''
						width={21}
						height={30}
					/>
				</Imagen4>
				<ContainerImagen>
					<H5>300</H5>
				</ContainerImagen>
			</ContainerCuatro>
			<ContainerCinco>
				<Imagen5>
					<img
						src={`/assets/MonedasCasino/5Moneda.png`}
						alt=''
						width={21}
						height={30}
					/>
				</Imagen5>
				<ContainerImagen>
					<H5>50</H5>
				</ContainerImagen>
			</ContainerCinco>
		</>
	);
};

export default Money;
