"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Profile, User } from "@/types";
import { LiaCalendarSolid, LiaUserFriendsSolid } from "react-icons/lia";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { PiMaskSadBold } from "react-icons/pi";
import { useLazyQuery } from "@apollo/client";
import { ProfileEditor } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { GET_USER_AND_PROFILE, GET_PROFILE } from "./operations";
import {
	setProfile as setUserAndProfile,
	setUserProfile,
} from "@/store/features";
import { profileLinks } from "@/constants";

const Layout: React.FC<{ children: React.ReactNode; params: any }> = ({
	children,
	params,
}) => {
	const currentUser = useAppSelector((state) => state.user.user) as User;
	const currentProfile = useAppSelector(
		(state) => state.user.profile
	) as Profile;
	const userName = params.profileId.slice(3);
	const isMe = userName === currentUser.name;
	const [getUser, { loading, error }] = useLazyQuery(
		isMe ? GET_PROFILE : GET_USER_AND_PROFILE
	);
	const dispatch = useAppDispatch();
	const [user, setUser] = useState<User | null>(null);
	const [profile, setProfile] = useState<Profile | null>(null);
	useEffect(() => {
		if (isMe) {
			if (currentProfile) {
				setProfile(currentProfile);
				setUser(currentUser);
				return;
			}
			getUser({
				variables: { userId: currentUser.name },
				onCompleted({ profile }) {
					dispatch(setUserProfile(profile));
					setProfile(profile);
					setUser(currentUser);
				},
			});
		} else {
			getUser({
				variables: { userId: userName },
				onCompleted(data) {
					dispatch(setUserAndProfile(data));
					setProfile(data.profile);
					setUser(data.user);
				},
			});
		}
	}, [currentProfile, currentUser, dispatch, getUser, isMe, profile, userName]);
	if (loading) return "loading...";
	if (error) return "user might not be found";
	if (user && profile)
		return (
			<div className="flex-1">
				<div className="Cover w-full rounded-bl-[3rem] overflow-hidden">
					{profile.cover ? (
						<Image
							src={profile.cover}
							alt="ok"
							width={1920}
							height={1080}
							className="aspect-[16/6]"
						/>
					) : (
						<div className="bg-neutral aspect-[16/6] text-2xl flex items-center justify-center font-semibold">
							Empty Just Like You
						</div>
					)}
				</div>
				<div className="mx-10">
					<div className="User pl-16 -translate-y-1/4 flex gap-4 items-center relative">
						<div className="avatar">
							<div className="w-[150px] h-w-[150px] ring-8 ring-base-100 rounded-full shadow-lg shadow-base-300 bg-base-100 relative z-50">
								<Image
									width={150}
									height={150}
									src={user.avatar}
									alt="avatar"
									className="object-contain"
								/>
							</div>
						</div>
						<div>
							<h1 className="text-2xl font-bold">{user.username}</h1>
							<h2 className="text-lg opacity-70 font-semibold tracking-tighter -mt-1">
								@{user.name}
							</h2>
							<div className="flex gap-2 absolute">
								<div className="px-4 py-2 bg-primary-content text-primary flex gap-2 items-center rounded-md shadow font-bold">
									<LiaCalendarSolid className="text-2xl" />{" "}
									{new Date(user?.birthDate).getFullYear()}
								</div>
								<div className="px-4 py-2 bg-success-content text-success flex gap-2 items-center rounded-md shadow font-bold">
									{user.friendsCount ? (
										<>
											<LiaUserFriendsSolid className="text-2xl" />{" "}
											{user.friendsCount}
										</>
									) : (
										<PiMaskSadBold className="text-2xl" />
									)}
								</div>
								<div className="px-4 py-2 bg-warning-content text-warning flex gap-2 items-center rounded-md shadow font-bold">
									{profile?.gender === "MALE" ? (
										<IoMdMale className="text-2xl" />
									) : (
										<IoMdFemale className="text-2xl" />
									)}
								</div>
							</div>
						</div>
						{isMe && <ProfileEditor />}
					</div>
					<div className="Tabs join w-full mt-4">
						{profileLinks.map((link) => (
							<Link
								key={link.path}
								href={`/profile/@${link.path}`}
								className="btn btn-outline odd:btn-primary even:btn-accent join-item flex-1 capitalize"
							>
								{link.name}
							</Link>
						))}
					</div>
					{children}
				</div>
			</div>
		);
};

export default Layout;
