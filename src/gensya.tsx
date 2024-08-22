import { Hono } from "hono";
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";

const app = new Hono();

export default app.get("/", async (c) => {
	const { title, subTitle, siteTitle } = c.req.query();

	const fontFamily = "Noto Sans JP";
	const fontNormal = await fetchFont(siteTitle, fontFamily, 400);
	const fontBold = await fetchFont(
		siteTitle + title + subTitle,
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
						fontSize: "82",
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
								overflow: "hidden",
								whiteSpace: "nowrap",
								textOverflow: "ellipsis",
								fontSize: "inherit",
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
						fontSize: "40",
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

async function fetchFont(
	text: string,
	font: string,
	weight: number,
): Promise<ArrayBuffer> {
	const fontFamilyFetchName = font.replace(/ /g, "+");
	const API = `https://fonts.googleapis.com/css2?family=${fontFamilyFetchName}:wght@${weight}&text=${encodeURIComponent(text)}`;

	const css = await (
		await fetch(API, {
			headers: {
				// Make sure it returns TTF.
				"User-Agent":
					"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
			},
		})
	).text();

	const resource = css.match(
		/src: url\((.+)\) format\('(opentype|truetype)'\)/,
	);

	if (!resource) {
		throw new Error("Failed to fetch font");
	}

	const res = await fetch(resource[1]);

	return res.arrayBuffer();
}
