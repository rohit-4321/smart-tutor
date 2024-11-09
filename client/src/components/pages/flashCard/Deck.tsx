import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

export const Deck = () => {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();

	const { _id } = useParams();
	return <div>{_id}</div>;
};
