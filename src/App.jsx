/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		axios.get('https://pokeapi.co/api/v2/pokemon').then(({ data }) => {
			const { results } = data;
			setPokemons(results);
		});
	}, []);

	return (
		<div
			style={{
				display: 'flex',
        flexWrap: 'wrap',
        
				gap: 20,

			}}
		>
			<div style={{
        width: '100%',
        marginBottom: 20,
      }}>
        <h1>Desafio PokeApi</h1>
      </div>
			{pokemons.map((pokemon) => (
				<div
					key={pokemon.name}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',

						border: '2px solid rgba(0, 0, 0, .2)',
						borderRadius: 10,

						boxShadow: '0 0 10px rgba(0, 0, 0, .2)',

						width: 300,
						minHeight: 250,

						background: '#f3f3f3',

						padding: 8,
            margin: '8px 12px',

            
				    textTransform: 'capitalize',
					}}
				>
					<Pokemon pokemons={pokemon} />
				</div>
			))}
		</div>
	);
}

function Pokemon({ pokemons }) {
	const [detailsPokemon, setDetailsPokemon] = useState(null);

	useEffect(() => {
		axios
			.get(pokemons.url)
			.then(({ data }) => {
				setDetailsPokemon(data);
			})
			.catch((error) => console.log(error));
	}, []);

	if (detailsPokemon === null) {
		return <div>Carregando...</div>;
	}

	return (
		<>
			<div
				style={{
					width: '100%',

					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<h2>{detailsPokemon.name}</h2>
				<p
					style={{
						background: '#03112e',
						color: '#fff',
						padding: 4,
						border: `1px solid #4b4b4b`,
						borderRadius: 8,
					}}
				>
					EXP {detailsPokemon.base_experience}
				</p>
			</div>
			<hr
				style={{
					border: '1px solid rgba(0, 0, 0, 0.1)',
					borderRadius: 10,
					width: '100%',
				}}
			/>
			<div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        width: '50%',
      }}>
				<img
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
					src={detailsPokemon.sprites.front_default}
					alt={detailsPokemon.name}
				/>
			</div>
		</>
	);
}
