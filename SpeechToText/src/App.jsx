
import "./App.css"
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState, useEffect } from "react";
import '@babel/polyfill';

const App = () => {
    const [textToCopy, setTextToCopy] = useState('');
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000
    });

    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    useEffect(() => {
        setTextToCopy(transcript); // Update textToCopy whenever transcript changes
    }, [transcript]);

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

    if (!browserSupportsSpeechRecognition) {
        return null;
    }

    const handleCopy = () => {
        setCopied(); 
    };

    return (
        <div className="container">
            <h2>Speech to Text Converter</h2>
            <br/>
            <p>A React hook that converts speech from the microphone to text and makes it available to your React
                components.</p>

            <div className="main-content" onClick={startListening}>
                {transcript}
            </div>

            <div className="btn-style">
                <button onClick={handleCopy}>
                    {isCopied ? 'Copied!' : 'Copy to clipboard'}
                </button>
                <button onClick={startListening}>Start Listening</button>
                <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
            </div>
        </div>
    );
};

export default App;
