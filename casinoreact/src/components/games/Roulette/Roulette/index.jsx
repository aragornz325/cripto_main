import React, { Component, useEffect, useState } from "react";
import p5 from "p5";

import { StyledRoulette } from "./styles";
import store from "../../../../store/reducers/store";

const disposition = require("./config.json");

const Roulette = (props) => {
	let ref = React.createRef();
	var roulette;

	var pulled = false,
		ready_to_pull = true,
		lucky_number = 0;

	const setPull = (_lucky_number) => {
		lucky_number = _lucky_number;
		pulled = true;
	};

	const getReady = () => {
		return ready_to_pull;
	};

	const setReady = (state) => {
		ready_to_pull = state;
	};

	const r = (sketch) => {
		//
		// ROULETTE p5js by MAVD
		//

		let ref;
		let PI;

		var roulette_1, values, min_size, half_min_size;

		sketch.preload = () => {
			PI = sketch.PI;
			ref = (2 * PI) / 37;
			roulette_1 = new roulette();
		};

		sketch.setup = () => {
			let sizes = document.getElementById("roulette_container");
			//let sizes = ref.current;
			let canvas = sketch.createCanvas(
				sizes.offsetWidth,
				sizes.offsetHeight
			);
			min_size = sketch.min(sizes.offsetWidth, sizes.offsetHeight);
			half_min_size = min_size / 2.0;

			canvas.parent("roulette_container");
			canvas.class("roulette");

			roulette_1.set_strenght(0);
		};

		sketch.draw = () => {
			sketch.clear();

			roulette_1.show();

			if (roulette_1.moving) roulette_1.rotate();

			sketch.stroke(255);
			sketch.fill(255);

			sketch.textSize(min_size / 26);
			sketch.textFont("Trebuchet MS");

			if (!roulette_1.pulled && pulled && ready_to_pull) pull();

			let marker_diameter = min_size * 0.02;

			sketch.ellipse(
				sketch.width / 2,
				sketch.height / 2 - min_size * 0.25,
				marker_diameter,
				marker_diameter
			);
		};

		sketch.windowResized = () => {
			let sizes = document.getElementById("roulette_container");
			sketch.resizeCanvas(sizes.offsetWidth, sizes.offsetHeight);
			min_size = sketch.min(sizes.offsetWidth, sizes.offsetHeight);
			half_min_size = min_size / 2.0;
		};

		function pull() {
			ready_to_pull = false;
			roulette_1.pulled = true;
			pulled = false;
			roulette_1.animate_pull();
		}

		class roulette {
			constructor() {
				this.moving = false;

				this.rotation = 0.0;
				this.inertia = 0.0;

				//this.friction = 0.01;
				this.friction = 0.01;

				//this.roulette_img = sketch.loadImage("roulette.svg");
				this.roulette_img = sketch.loadImage(
					"assets/roulette/ruletav2.png"
				);

				this.values = {};
				this.set_values();

				this.last = 0;

				this.pulled = false;
			}

			animate_pull() {
				let lucky = lucky_number;
				var dist = 0;

				let START = 0;

				for (let i = 0; i < 37; i++) {
					if (values[dist] === this.last) {
						//console.log("Last = ", this.last);
						START = i;
						break;
					}
					dist++;
				}

				dist = 0;

				for (let i = 0; i < 37; i++) {
					let current = values[(i + START) % 37];
					if (current === lucky) {
						break;
					}
					dist++;
				}

				//console.log("Dist : ",dist);

				let preloc = dist * ref;

				let manyloops = 10 * 2 * PI;

				this.set_strenght((manyloops + preloc) * this.friction);
				this.last = lucky;
			}

			set_strenght(new_strenght) {
				this.inertia = new_strenght;
				this.moving = true;
			}

			set_values() {
				values = disposition;
			}

			rotate() {
				if (this.inertia > 0.0001) {
					this.moving = true;
					this.rotation -= this.inertia;
					this.inertia *= 1 - this.friction;
				} else {
					// APLLY CORRECTIONS
					this.rotation = ref * sketch.floor(this.rotation / ref);

					// STOP THE WHEEL
					this.moving = false;
					this.pulled = false;
					ready_to_pull = true;

					props.setSpin(false);
				}
			}

			show() {
				sketch.push();
				sketch.translate(sketch.width / 2, sketch.height / 2);
				sketch.rotate(this.rotation + ref / 2 + PI);
				sketch.push();
				sketch.rotate(PI - ref / 2);
				sketch.image(
					this.roulette_img,
					-half_min_size,
					-half_min_size,
					min_size,
					min_size
				);
				sketch.pop();
				//this.showNumbers();
				sketch.pop();
			}

			showNumbers() {
				let offset = -0.52 * ref;
				for (let i = 0; i < 37; i++) {
					sketch.push();
					sketch.rotate(i * ref + offset);
					sketch.textAlign(sketch.CENTER);
					sketch.translate(0, 0);
					sketch.push();
					sketch.translate(0, 0);
					sketch.rotate(PI);
					sketch.translate(0, -half_min_size * 0.884);
					sketch.text(values[i], 0, 0);
					sketch.pop();
					sketch.pop();
				}
			}
		}
	};

	useEffect(() => {
		roulette = new p5(r, ref.current);
		props.setRoulette({
			setPull,
			getReady,
			setReady,
		});
	}, []);

	return (
		<StyledRoulette style={props.style} id="roulette_container">
			<div style={{ width: "100%", background: "red" }} ref={ref}></div>
		</StyledRoulette>
	);
};

Roulette.propTypes = {};

export default Roulette;
