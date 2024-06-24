import { useLayoutEffect, useRef, useState } from "react";

const flowchart = [
	{
		question: "日頃から地道な努力をすることが得意？",
		yes: 1,
		no: 2,
	},
	{
		question: "文武両道ができる？",
		yes: "チベット仏教徒",
		no: "中国仏教徒",
	},
	{
		question:
			"自分にとって大事な要素は、幸せになれるようなことをするよりも自分の利益になるようなことをする。",
		yes: "中国仏教徒",
		no: 3,
	},
	{
		question: "今、大きな悩みがある？",
		yes: "ミャンマー仏教徒",
		no: "ベトナム仏教徒",
	},
];

function App() {
	const scrollBottomRef = useRef<HTMLDivElement>(null);

	const [questions, setQuestions] = useState<number[]>([0]);
	const [answers, setAnswers] = useState<boolean[]>([]);
	const [result, setResult] = useState<string | null>(null);

	// 要素が増えたときに一番下までスクロールする
	useLayoutEffect(() => {
		scrollBottomRef.current?.scrollIntoView({ behavior: "smooth" });
	});

	function answerQuestion(question: number, answer: boolean) {
		const newAnswers = [...answers];
		newAnswers[question] = answer;
		setAnswers(newAnswers);

		if (typeof flowchart[question][answer ? "yes" : "no"] === "number") {
			setQuestions([
				...questions,
				flowchart[question][answer ? "yes" : "no"] as number,
			]);
		} else {
			setResult(flowchart[question][answer ? "yes" : "no"] as string);
		}
	}

	function reset() {
		setQuestions([0]);
		setAnswers([]);
		setResult(null);
	}

	return (
		<div className="flex flex-col items-center min-h-svh py-16 w-full max-w-sm mx-auto px-2">
			<h1 className="text-2xl font-bold mb-1">仏教徒診断テスト</h1>
			<p className="text-gray-800">あなたのパーソナル仏教はなに～？</p>

			<div className="mt-8 w-full flex flex-col gap-6">
				{questions.map((question, index) => (
					<div
						key={question}
						className="bg-gray-100 rounded-xl pt-7 pb-5 px-6 w-full"
					>
						<h2 className="text-xl font-bold mb-2 flex gap-1">
							<span className="text-gray-600">Q{index + 1}.</span>
							<span>{flowchart[question].question}</span>
						</h2>
						<div className="flex w-full gap-2 mt-5">
							<button
								type="button"
								className={`bg-blue-200 rounded-lg py-2 px-4 w-1/2 ${answers[question] !== undefined && answers[question] === true ? "bg-blue-600 text-white" : answers[question] !== undefined ? "opacity-50" : ""}`}
								onClick={() => answerQuestion(question, true)}
								disabled={answers[question] !== undefined}
							>
								はい
							</button>
							<button
								type="button"
								className={`bg-red-200 rounded-lg py-2 px-4 w-1/2 ${answers[question] !== undefined && answers[question] === false ? "bg-red-600 text-white" : answers[question] !== undefined ? "opacity-50" : ""}`}
								onClick={() => answerQuestion(question, false)}
								disabled={answers[question] !== undefined}
							>
								いいえ
							</button>
						</div>
					</div>
				))}
			</div>

			{result && (
				<>
					<div className="mt-8 bg-blue-50 rounded-xl py-5 px-6 w-full text-center">
						<h2 className="text-xl font-bold mb-2">あなたは...</h2>
						<p className="text-2xl font-bold text-blue-600">{result}</p>
					</div>

					<button
						type="button"
						className="mt-4 bg-blue-600 text-white rounded-full py-2 px-6"
						onClick={reset}
					>
						もう一度
					</button>
				</>
			)}

			<div ref={scrollBottomRef} />
		</div>
	);
}

export default App;
