export const OutputComponent = ({string, won}) => {
	if (!won)
		return (
			<>
				<h2 id="expected-word">{string}</h2>
			</>
		)
	else
			return (
				<>
					<h2>Congrats! You won the game</h2>
				</>
			)
}
