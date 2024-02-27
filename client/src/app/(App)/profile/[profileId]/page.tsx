"use client";
import { FriendsSection, Post, PostCreator } from "@/components";
import { useAppSelector } from "@/store";
import { useQuery } from "@apollo/client";
import { Post as IPost, Profile as IProfile, User } from "@/types";
import { GET_POSTS } from "./operations";
import Image from "next/image";

const Profile: React.FC = (props: any) => {
	const userName = props.params.profileId.slice(3);
	const myUser = useAppSelector((state) => state.user.user) as User;
	const isMe = userName === myUser.name;
	const profile = useAppSelector((state) =>
		isMe ? state.user.profile : state.profile.profile
	) as IProfile;
	const userId = useAppSelector((state) =>
		isMe ? state.user.user?.id : state.profile.user?.id
	);
	const { data } = useQuery(GET_POSTS, {
		variables: {
			findPostsInput: { author: { name: userName } },
		},
	});
	if (data && userId)
		return (
			<div className="flex my-8 gap-4">
				<div className="max-w-[400px] h-fit space-y-4 flex-1">
					<div className="bg-base-300 py-4 rounded-box divide-y-2">
						<div className="px-4">
							<h2 className="text-2xl font-bold mb-2">Intro -_-</h2>
							<pre className="Caption whitespace-pre-wrap py-2 px-2 break-words">
								{profile.bio || (
									<span className="font-bold text-error">NO INTRO {">_<"}</span>
								)}
							</pre>
						</div>
						<div className="px-4">
							<h2 className="text-2xl font-bold my-2">Hobbies {':">'}</h2>
							<ul className="flex flex-wrap gap-2">
								{profile.hobbies?.map((hobby: string, i: number) => (
									<li
										key={i}
										className="btn btn-sm rounded-full capitalize even:bg-warning-content even:text-warning odd:bg-primary-content odd:text-primary"
									>
										{hobby}
									</li>
								))}
							</ul>
							{!profile.hobbies && (
								<pre className="font-bold text-error px-2">
									NO HOBBIES {">_<"}
								</pre>
							)}
						</div>
					</div>
					<div className="bg-base-200 p-4 rounded-box">
						<h2 className="text-2xl font-bold mb-4">Photos _-_</h2>
						<div className="grid grid-cols-3 gap-2">
							<Image
								width={500}
								height={500}
								src="https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish"
								alt="ok"
								className="bg-base-100 rounded-box"
							/>
							<Image
								width={500}
								height={500}
								src="https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish"
								alt="ok"
								className="bg-base-100 rounded-box"
							/>
							<Image
								width={500}
								height={500}
								src="https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish"
								alt="ok"
								className="bg-base-100 rounded-box"
							/>
							<Image
								width={500}
								height={500}
								src="https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish"
								alt="ok"
								className="bg-base-100 rounded-box"
							/>
							<Image
								width={500}
								height={500}
								src="https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish"
								alt="ok"
								className="bg-base-100 rounded-box"
							/>
							<Image
								width={500}
								height={500}
								src="https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish"
								alt="ok"
								className="bg-base-100 rounded-box"
							/>
							<Image
								width={500}
								height={500}
								src="https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish"
								alt="ok"
								className="bg-base-100 rounded-box"
							/>
							<Image
								width={500}
								height={500}
								src="https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish"
								alt="ok"
								className="bg-base-100 rounded-box"
							/>
							<Image
								width={500}
								height={500}
								src="https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish"
								alt="ok"
								className="bg-base-100 rounded-box"
							/>
						</div>
					</div>
					<FriendsSection gender={profile.gender} isMe={isMe} userId={userId} />
				</div>
				<ul className="Posts flex flex-col gap-4 max-w-xl w-full mx-auto">
					{isMe && (
						<li>
							<PostCreator />
						</li>
					)}
					{data.posts.map((post: IPost) => (
						<Post {...post} key={post.id} />
					))}
				</ul>
			</div>
		);
};

export default Profile;
