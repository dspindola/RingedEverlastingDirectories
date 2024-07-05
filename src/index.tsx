import express from "express";
import { renderToReadableStream } from "react-dom/server";
import { getUserInfo } from "@replit/repl-auth";

const url = new URL(`http://${process.env.hostname}:${process.env.port}`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (_, res) => {
	const user = getUserInfo(_);
	const stream = await renderToReadableStream(
		<html lang="en" data-theme="dark">
			<head>
				<title>Hello, world!</title>
				<script src="https://cdn.tailwindcss.com" />
			</head>
			<body className="bg-slate-900 text-white">
				<main className="p-4">
					<p>{user?.name ?? "world"}</p>
					<a>{user?.url}</a>
				</main>
			</body>
		</html>
	);

	await stream.allReady;

	const response = new Response(stream, {
		headers: {
			"Content-Type": "text/html",
		},
	});

	res.send(await response.text());
});

app.listen({
	hostname: process.env.hostname,
	port: process.env.port,
}, () => {
	console.log(`Server is running on ${url}`);
});