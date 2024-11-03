import type { FC } from "react";
import style from "./DialogInput.module.css";
interface DialogInputProps extends React.ComponentProps<"input"> {
	label?: string;
}
export const DialogInput: FC<DialogInputProps> = (props) => {
	const { className, label = "No. of question", ...rest } = props;
	return (
		<div className={style.dialogInputContainer}>
			{label ? <span className={style.dialogLabel}>{label}</span> : null}
			<input className={style.dialogInput} {...rest} />
		</div>
	);
};
