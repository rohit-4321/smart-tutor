import type { FC } from "react";
import style from "./DialogInput.module.css";
interface DialogTextAreaProps extends React.ComponentProps<"textarea"> {
	label?: string;
}
export const DialogTextArea: FC<DialogTextAreaProps> = (props) => {
	const { className, label = "No. of question", ...rest } = props;
	return (
		<div className={style.dialogInputContainer}>
			{label ? <span className={style.dialogLabel}>{label}</span> : null}
			<textarea className={style.dialogInput} {...rest} />
		</div>
	);
};
