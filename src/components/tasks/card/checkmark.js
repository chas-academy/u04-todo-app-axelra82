/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { animated, useSpring } from 'react-spring';

export default ({ isChecked }) => {

	const properties = {
		unchecked: {
			r: 9,
			opacity: 0
		},
		checked: {
			r: 7,
			opacity: 1
		},
		springConfig: { mass: 4, tension: 250, friction: 35 }
	};

	const { r, opacity } = properties[
		!isChecked ? "unchecked" : "checked"
	];

	const centerCircleProps = useSpring({ r, opacity, config: properties.springConfig });

	return (
		<animated.svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			className="checkmark"
		>
			<animated.circle
				style={centerCircleProps}
				fill="currentColor"
				cx="12"
				cy="12"
				r="10"
			/>
			<circle
				fill="transparent"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="2"
			/>
		</animated.svg>
	)
}