import React, { useEffect, useState } from 'react';
import { generateCaptcha, getRandomId } from './utils/captchaUtils';

const SecureReactCaptcha = ({
    setValidated,
    needDots = true,
    needLines = true,
    minDots = 400,
    maxDots = 500,
    minLines = 10,
    maxLines = 100,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz",
}) => {
    // State variables for managing the captcha and its related elements
    const [captchaImage, setCaptchaImage] = useState('a'); // Captcha image URL
    const [canvasId, setCanvasId] = useState('a'); // Canvas element ID
    const [captchaId, setCaptchaId] = useState('a'); // Captcha input ID
    const [captchaText, setCaptchaText] = useState(''); // User-entered captcha text

    // Function to generate a new captcha and update state variables
    const generateNewCaptcha = () => {
        setCanvasId(getRandomId()); // Generate a new ID for the canvas element
        setCaptchaId(getRandomId()); // Generate a new ID for the captcha input element
        const newCaptchaImage = generateCaptcha(
            document.getElementById(canvasId), // Get the canvas element by ID
            needDots,
            needLines,
            minLines,
            maxLines,
            minDots,
            maxDots,
            characters
        );
        setCaptchaImage(newCaptchaImage); // Update the captcha image URL
        setCaptchaText(''); // Clear the user-entered captcha text
        setValidated(false); // Reset the validation status
    };

    // useEffect to initialize the captcha on component mount
    useEffect(() => {
        generateNewCaptcha();
    }, []);

    // useEffect to check the validation when the captchaText changes
    useEffect(() => {
        if (captchaText.length === 5) {
            // If the user has entered 5 characters, check for validation
            setValidated(captchaText === captchaImage); // Compare user input with captcha
        } else {
            setValidated(false);
        }
    }, [captchaText]);

    return (
        <div className="src_container">
            <div className="src_canvas_container">
                <canvas id={canvasId} className="src_canvas"></canvas>
                <button
                    className="src_reset_button"
                    type="button"
                    onClick={() => generateNewCaptcha()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <path d="M12 3a8.959 8.959 0 0 0-7 3.339V4H3v6h6V8H6.274a6.982 6.982 0 1 1-1.054 5.751l-1.936.5A9 9 0 1 0 12 3z" fill='white' />
                    </svg>
                </button>
            </div>
            <input
                maxLength={5}
                minLength={5}
                id={`${captchaId}`}
                type="text"
                className="src_input"
                name="captcha"
                placeholder="XXXXX"
                value={captchaText}
                onChange={e => setCaptchaText(e.target.value)}
            />
        </div>
    );
};

export default SecureReactCaptcha;
