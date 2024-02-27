"use client";
import { Gender, User } from "@/types";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { GET_FRIENDS } from "./operations";
import { Button } from "react-daisyui";
import Link from "next/link";
import { useAppSelector } from "@/store";

type Props = {
	isMe: Boolean;
	userId: string;
	gender: Gender;
};

export const FriendsSection: React.FC<Props> = ({ isMe, gender, userId }) => {
	const { data } = useQuery(GET_FRIENDS, { variables: { userId } });
	const userName = useAppSelector((state) => state.user.user?.name);
	return (
		<div className="bg-base-200 p-4 rounded-box">
			<h2
				className={`text-2xl font-bold mb-4 ${
					data?.chats?.length == 0
						? "text-error"
						: data?.chats?.length == 1 && data?.chats[0].name == userName
						? "text-success"
						: ""
				}`}
			>
				Friends {">_<"}
			</h2>
			{data?.chats?.length == 0 && (
				<p className="text-center">
					{isMe ? (
						<>
							You Got No Friends! Are you A{" "}
							<span className="text-error font-semibold underline">
								Serial Killer?
							</span>
						</>
					) : (
						<>
							{gender === Gender.MALE ? "He" : "She"} Got No Friends! Maybe{" "}
							{gender === Gender.MALE ? "He" : "She"} Is A{" "}
							<span className="text-error font-semibold underline">
								Serial Killer?
							</span>
						</>
					)}
				</p>
			)}
			{data?.chats?.length == 1 && data?.chats[0].name === userName && (
				<p>
					{gender === Gender.MALE ? "He" : "She"} Got No Friend Except You Maybe{" "}
					<span className="text-success font-bold">You</span> Are Something{" "}
					<span className="text-success font-bold">Important</span> To{" "}
					{gender === Gender.MALE ? "Him" : "Her"}
				</p>
			)}
			<div className="grid grid-cols-3 gap-2">
				{data?.chats?.map(
					(friend: User) =>
						friend.name !== userName && (
							<Link key={friend.avatar} href={`/profile/@${friend.name}`}>
								<Button className="h-auto rounded-box p-1 pb-0 bg-base-100 w-auto">
									<Image
										key={friend.id}
										width={150}
										height={150}
										src={friend.avatar}
										alt={friend.name}
									/>
								</Button>
							</Link>
						)
				)}
			</div>
		</div>
	);
};
