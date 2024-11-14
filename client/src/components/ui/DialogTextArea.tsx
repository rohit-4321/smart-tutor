import type { FC } from "react";
import style from "./DialogInput.module.css";
interface DialogTextAreaProps extends React.ComponentProps<"textarea"> {
	label?: string;
	error?: boolean;
	errorLabel?: string;
}
export const DialogTextArea: FC<DialogTextAreaProps> = (props) => {
	const {
		className,
		label = "No. of question",
		error,
		errorLabel,
		...rest
	} = props;
	return (
		<div className={style.dialogInputContainer}>
			{label ? <span className={style.dialogLabel}>{label}</span> : null}
			<textarea
				className={style.dialogInput}
				{...rest}
				data-error={error ? "true" : "false"}
			/>
			<span
				style={{
					fontSize: "0.8rem",
					color: "#ff4b4b",
					visibility: error ? "visible" : "hidden",
				}}
			>
				{errorLabel}
			</span>
		</div>
	);
};
