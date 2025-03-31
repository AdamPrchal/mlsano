import type { FC } from "hono/jsx";

const Layout: FC = (props) => {
	return (
		<html lang="en">
			<body>{props.children}</body>
		</html>
	);
};

export const Top: FC<{ messages: string[] }> = (props: {
	messages: string[];
}) => {
	return (
		<Layout>
			<h1>Hello Hono!</h1>
			<ul>
				{props.messages.map((message) => {
					return <li key={message}>{message}!!</li>;
				})}
			</ul>
		</Layout>
	);
};

export const Count: FC<{ count: number }> = ({ count }) => {
	return (
		<Layout>
			<h1>{count}</h1>
		</Layout>
	);
};

export const Recipe: FC<{
	id: number;
	title: string;
	source: string | null;
	createdAt: Date;
	updatedAt: Date;
}> = ({ id, title, source, createdAt, updatedAt }) => {
	return (
		<Layout>
			<ul>
				<li>id: {id}</li>
				<li>title: {title}</li>
				<li>source: {source}</li>
				<li>createdAt: {createdAt.toString()}</li>
				<li>updatedAt: {updatedAt.toString()}</li>
			</ul>
		</Layout>
	);
};
