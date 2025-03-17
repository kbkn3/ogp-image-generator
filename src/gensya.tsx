import { Hono } from "hono";
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";
import { fetchFont } from "./fetchFont";

const app = new Hono();

export default app.get("/", async (c) => {
	const { title, subTitle, siteTitle } = c.req.query();

	const fontFamily = "Noto Sans JP";
	const text = `${title??''}${subTitle??''}${siteTitle??''}`;
	const fontNormal = await fetchFont(text, fontFamily, 400);
	const fontBold = await fetchFont(
		text,
		fontFamily,
		700,
	);
	const wakachi = [title, subTitle]
	return new ImageResponse(
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
				width: "100%",
				padding: "2rem",
				backgroundColor: "#f3f4f6",
				boxSizing: "border-box",
			}}
		>
			<div
				style={{
					flex: 1,
					alignSelf: "stretch",
					background: "white",
					borderRadius: "2rem",
					padding: "2rem",
					display: "flex",
					flexDirection: "column",
					boxSizing: "border-box",
				}}
			>
				<div
					style={{
						flex: 1,
            flexDirection: "column",
						color: "#222",
						fontSize: "80px",
						paddingInline: "1rem",
						boxSizing: "border-box",
						justifySelf: "center",
						display: "flex",
						justifyContent: "center",
						alignContent: "center",
						alignItems: "center",
						flexWrap: "wrap",
						fontFamily: "Noto Sans JP",
						fontWeight: 700,
						fontFeatureSettings: "palt",
					}}
				>
					{wakachi.map((word, _index) => (
						<div
							key={word}
							style={{
								display: "flex",
							}}
						>
							{word}
						</div>
					))}
				</div>
				<div
					style={{
						flexBasis: "20vh",
						color: "#444",
						fontSize: "40px",
						boxSizing: "border-box",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						fontFamily: "Noto Sans JP",
						fontWeight: 400,
						fontFeatureSettings: "palt",
						overflowWrap: "anywhere",
						wordBreak: "break-word",
						lineBreak: "strict",
						textWrap: "balance",
					}}
				>
					{siteTitle}
				</div>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: fontFamily,
					data: fontNormal,
					weight: 400,
					style: "normal",
				},
				{
					name: fontFamily,
					data: fontBold,
					weight: 700,
					style: "normal",
				},
			],
		},
	);
});
