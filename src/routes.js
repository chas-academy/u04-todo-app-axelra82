/* eslint-disable import/no-anonymous-default-export */
import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Configure, DefaultHome, DefaultUser, NotFound } from "./views";
import Context from './context';

export default () => {

	const [context] = useContext(Context);
	const configured = context.configured;
	const user = context.user;

	return (
		configured ?
			<Switch>
				{user &&
					<Route path="/user" component={DefaultUser} />
				}
				<Route exact path="/" component={DefaultHome} />
				<Route component={NotFound} />
			</Switch>
			:
			<Route path="/" component={Configure} />
	);
}