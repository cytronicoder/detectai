import Head from "next/head";
import Image from "next/image";
import { Manrope } from "next/font/google";
import styles from "@/styles/Home.module.css";

import { useState } from "react";
import logo from "@/public/logo.svg";

const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
    const [userInput, setUserInput] = useState("");
    const [error, setError] = useState("");

    const [generatedProbability, setGeneratedProbability] = useState(0);

    const onUserChangedText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value);
    };

    const analyzeText = () => {
        setError("");
        setGeneratedProbability(0);

        if (userInput.length === 0) {
            setError("Please enter text to analyze.");
            return;
        }

        // minimum of 50 words and capping at 1000 words
        const inputLength = userInput.split(" ").filter(function (num) {
            return num != "";
        }).length;

        if (inputLength < 50) {
            setError("Please enter text more than 50 words.");
            return;
        }

        if (inputLength > 1000) {
            setError("Please enter text less than 1000 words.");
            return;
        }

        console.log("Analyzing text...");

        fetch("/api/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: userInput,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    return;
                }

                setGeneratedProbability(data.generatedProbability);
            })
            .catch((err) => {
                setError("An error occurred. Please try again later.");
                setGeneratedProbability(0);
            });
    };

    return (
        <>
            <Head>
                <title>DetectAI</title>
                <meta
                    name="description"
                    content="Google Chrome extension to pick up possible AI plagiarism by scanning the Google Doc that you are currently editing/viewing."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />

                {/* Open Graph */}
                <meta property="og:title" content="DetectAI" />
                <meta
                    property="og:description"
                    content="Google Chrome extension to pick up possible AI plagiarism by scanning the Google Doc that you are currently editing/viewing."
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://detectai.cytronicoder.com/"
                />
                <meta
                    property="og:image"
                    content="https://detectai.cytronicoder.com/og-image.png"
                />
                <meta property="og:site_name" content="DetectAI" />
                <meta property="og:locale" content="en_US" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@cytronicoder" />
                <meta name="twitter:creator" content="@cytronicoder" />
                <meta name="twitter:title" content="DetectAI" />
                <meta
                    name="twitter:description"
                    content="Google Chrome extension to pick up possible AI plagiarism by scanning the Google Doc that you are currently editing/viewing."
                />
                <meta
                    name="twitter:image"
                    content="https://detectai.cytronicoder.com/og-image.png"
                />
            </Head>

            <main className={styles.main}>
                {/* <Image src={logo} alt="Logo" className={styles.logo} /> */}
                <div className={styles.left}>
                    <div className={styles.header}>
                        <h1>DetectAI</h1>
                        <p className={styles.description}>
                            DetectAI is currently powered by{" "}
                            <a href="https://huggingface.co/roberta-base-openai-detector">
                                a fine-tuned RoBERTa base model by Hugging Face.
                            </a>{" "}
                            You can input text to analyze and the model will
                            generate a probability of whether the text is
                            plagiarized or not.
                        </p>
                    </div>

                    <div className={styles.prompt_container}>
                        <textarea
                            className={[
                                styles.prompt_box,
                                manrope.className,
                            ].join(" ")}
                            placeholder="Enter text to analyze..."
                            onChange={onUserChangedText}
                            value={userInput}
                        />

                        <div className={styles.analyze_container}>
                            <div
                                className={[
                                    styles.analyze_button,
                                    manrope.className,
                                ].join(" ")}
                                onClick={analyzeText}
                            >
                                <div className={styles.analyze}>
                                    <p>Analyze</p>
                                </div>
                            </div>
                        </div>

                        {error.length > 0 && (
                            <div className={styles.error_container}>
                                <div className={styles.error}>
                                    <p>{error}</p>
                                </div>
                            </div>
                        )}

                        {generatedProbability > 0 && (
                            <div className={styles.score_container}>
                                <div className={styles.score}>
                                    <p>
                                        Generated probability:{" "}
                                        <span className={styles.score_value}>
                                            {(
                                                generatedProbability * 100
                                            ).toFixed(2)}
                                            %
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.future_container}>
                        <h2>Future plans</h2>
                        <p className={styles.description}>
                            DetectAI is currently in its early stages. I plan to
                            add more features in the future, such as:
                        </p>

                        <ul className={styles.description}>
                            <li>
                                <p>
                                    <strong>Google Doc integration</strong> -
                                    Detect AI will automatically scan the Google
                                    Doc that you are currently editing/viewing.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>A more robust model</strong> - I
                                    plan to fine-tune a larger model, such as
                                    GPT-3, to generate a more accurate
                                    probability.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
}
