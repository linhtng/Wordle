import "../Styles/Keyboard.css"

export const KeyboardButton = ({fc, del, text, id}) => {
	const handleClick = () => {
		fc(text);
	}
	return (
		<button className="sq" onClick={()=>handleClick(text)}>{text}</button>
	)
}
