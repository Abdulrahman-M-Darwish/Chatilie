"use client";
import React, { Ref } from "react";
import { ChatBubble } from "react-daisyui";
import Image from "next/image";
import moment from "moment";
import { GridCoreProps } from "react-virtualized/dist/es/Grid";
import CellMeasurer, {
	CellMeasurerCache,
	MeasuredCellParent,
} from "react-virtualized/dist/es/CellMeasurer";
import store from "@/store";
import { Time } from "@/components";

type Props = {
	userId: string;
	index: number;
	style: React.CSSProperties;
	key: string;
	parent: React.Component<GridCoreProps, {}, any> & MeasuredCellParent;
	cache: CellMeasurerCache;
};

export const Message: React.FC<Props> = ({
	userId,
	index,
	key,
	parent,
	style,
	cache,
}) => {
	const messages = store.getState().message;
	const message = messages[index];
	const createdAt = +message.createdAt || message.createdAt;
	return (
		<CellMeasurer
			key={key}
			cache={cache}
			parent={parent}
			columnIndex={0}
			rowIndex={index}
		>
			{({ registerChild }) => (
				<ChatBubble
					end={message.author.id === userId}
					style={style}
					ref={registerChild as Ref<HTMLDivElement>}
				>
					<ChatBubble.Avatar className="bg-base-300/50 backdrop-blur-3xl p-1 rounded-full">
						<Image
							width={50}
							height={50}
							src={message.author.avatar}
							alt="Avatar"
							className="!w-10"
						/>
					</ChatBubble.Avatar>
					<ChatBubble.Message
						className={`max-w-[50%] backdrop-blur-3xl break-words rounded-2xl flex flex-col ${
							message.author.id === userId
								? "bg-neutral/50 text-neutral-content"
								: "bg-base-100/60"
						}`}
					>
						<bdi>{message.text}</bdi>
						<Time createdAt={createdAt} />
					</ChatBubble.Message>
				</ChatBubble>
			)}
		</CellMeasurer>
	);
};
