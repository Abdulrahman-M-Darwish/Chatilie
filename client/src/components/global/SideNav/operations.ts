import { gql } from "@apollo/client";

export const GET_REPUTATION = gql`
	query GetReputation($profileId: ID!) {
		profile(id: $profileId) {
			reputationOfAllTime
		}
	}
`;
