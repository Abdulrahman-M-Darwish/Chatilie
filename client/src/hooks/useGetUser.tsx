import { useAppSelector } from "@/store";
import { User } from "@/types";
import {
	DocumentNode,
	OperationVariables,
	TypedDocumentNode,
	useLazyQuery,
} from "@apollo/client";
import { useEffect, useState } from "react";

type Props = {
	idOrName: string;
	meFunction?: (user: User) => void;
	personFunction?: (user: User) => void;
};

export const useGetUser = (
	query: DocumentNode | TypedDocumentNode<any, OperationVariables>,
	{ idOrName, meFunction, personFunction }: Props
) => {
	const currentUser = useAppSelector((state) => state.user.user);
	const isMe = currentUser?.name == idOrName || currentUser?.id == idOrName;
	const [getUser, result] = useLazyQuery(query);
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		if (isMe) {
			setUser(currentUser);
			if (meFunction) meFunction(currentUser);
			return;
		}
		getUser({
			variables: { userId: idOrName },
			onCompleted(data) {
				setUser(data.user);
				if (personFunction) personFunction(data.user);
			},
		});
	}, [currentUser, getUser, idOrName, isMe]);
	return { user, isMe, ...result };
};
