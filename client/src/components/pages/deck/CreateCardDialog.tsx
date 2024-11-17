import { Dialog, Stack, Tab, Tabs } from "@mui/material";
import { useState, type FC } from "react";
import CreateCardDialogManual from "./CreateCardDialogManual";
import { CreateCardDialogAI } from "./CreateCardDialogAI";

export type CreateCardDialogProps = {
	deckId: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const CreateCardDialog: FC<CreateCardDialogProps> = (props) => {
	const { open, setOpen, deckId } = props;

	const [tabValue, setTabValue] = useState(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};
	return (
		<Dialog
			open={open}
			sx={{
				"& .MuiDialog-container": {
					"& .MuiPaper-root": {
						width: "100%",
						maxWidth: "40rem",
						height: "28rem",
					},
				},
			}}
		>
			<Stack alignItems="center" justifyContent="center">
				<Tabs
					value={tabValue}
					onChange={handleChange}
					aria-label="customized tabs"
					sx={{
						"& .MuiTabs-indicator": {
							backgroundColor: "#7e22ced3",
						},
					}}
					TabIndicatorProps={{
						style: { backgroundColor: "#7e22ced3" },
					}}
				>
					<Tab
						label="Add Card"
						disableRipple
						sx={{
							fontFamily: "inherit",
							color: "#7d7d7d",
							"&.Mui-selected": {
								color: "#7e22ce",
							},
						}}
					/>
					<Tab
						label="AI Generate"
						disableRipple
						sx={{
							fontFamily: "inherit",
							color: "#686868",
							"&.Mui-selected": {
								color: "#7e22ce",
							},
						}}
					/>
				</Tabs>
			</Stack>
			{tabValue === 0 && (
				<CreateCardDialogManual deckId={deckId} setOpen={setOpen} />
			)}
			{tabValue === 1 && (
				<CreateCardDialogAI deck_id={deckId} setOpen={setOpen} />
			)}
		</Dialog>
	);
};

export default CreateCardDialog;
