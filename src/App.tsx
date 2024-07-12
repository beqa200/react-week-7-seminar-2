import {
	useEffect,
	useRef,
} from "react";
import "./App.css";

function App() {
	const canvasRef =
		useRef<HTMLCanvasElement | null>(
			null
		);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx =
			canvas?.getContext("2d");

		const savedImage =
			localStorage.getItem(
				"savedDrawing"
			);
		if (savedImage && ctx) {
			const img = new Image();
			img.onload = () => {
				ctx.drawImage(img, 0, 0);
			};
			img.src = savedImage;
		}

		let drawing = false;

		const startDrawing = () => {
			drawing = true;
		};

		const stopDrawing = () => {
			drawing = false;
			ctx?.beginPath();
			const dataURL =
				canvas?.toDataURL();
			localStorage.setItem(
				"savedDrawing",
				dataURL || ""
			);
		};

		const draw = (e: MouseEvent) => {
			if (!drawing || !ctx) return;

			ctx.lineWidth = 5;
			ctx.lineCap = "round";
			ctx.strokeStyle = "black";

			ctx.lineTo(
				e.clientX - canvas?.offsetLeft!,
				e.clientY - canvas?.offsetTop!
			);
			ctx.stroke();
			ctx.moveTo(
				e.clientX - canvas?.offsetLeft!,
				e.clientY - canvas?.offsetTop!
			);
		};

		canvas?.addEventListener(
			"mousedown",
			startDrawing
		);
		canvas?.addEventListener(
			"mouseup",
			stopDrawing
		);
		canvas?.addEventListener(
			"mousemove",
			draw
		);

		return () => {
			canvas?.removeEventListener(
				"mousedown",
				startDrawing
			);
			canvas?.removeEventListener(
				"mouseup",
				stopDrawing
			);
			canvas?.removeEventListener(
				"mousemove",
				draw
			);
		};
	}, []);
	return (
		<>
			<canvas
				ref={canvasRef}
				width={400}
				height={400}
				style={{
					border: "1px solid black",
					backgroundColor: "white",
				}}
			/>
		</>
	);
}

export default App;
