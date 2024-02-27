import { gql } from "@apollo/client";

export const GET_FRIENDS = gql`
	query GetFriends($userId: ID) {
		chats(userId: $userId) {
			avatar
			name
		}
	}
`;
