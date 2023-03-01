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

        // capping at 1000 characters for now
        if (userInput.length > 1000) {
            setError("Please enter text less than 1000 characters.");
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
                <Image src={logo} alt="Logo" className={styles.logo} />

                <div className={styles.prompt_container}>
                    <textarea
                        className={[styles.prompt_box, manrope.className].join(
                            " "
                        )}
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
                                        {(generatedProbability * 100).toFixed(2)}%
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
