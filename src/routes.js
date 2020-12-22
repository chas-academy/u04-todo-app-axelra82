/* eslint-disable import/no-anonymous-default-export */
import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Configure, DefaultHome } from "./views";
import Context from './context';

export default () => {

	const [context] = useContext(Context);
	const working = context.working;
	const configured = context.configured;

	return (
		<Switch>
			{!working ?
				configured ?
					<Route path="/" component={DefaultHome} />
					:
					<Route path="/" component={Configure} />
				:
				<>Working</>
			}
		</Switch>
	);
}