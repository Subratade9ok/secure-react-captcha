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
    const [captchaText, setCaptchaText] = useState(''); // User-entered captcha text
    const [otp, setOtp] = useState(Array(5).fill('')); // Assuming a 5-digit OTP

    // Function to generate a new captcha and update state variables
    const generateNewCaptcha = () => {
        setCanvasId(getRandomId()); // Generate a new ID for the canvas element
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
        setOtp(Array(5).fill(''))
        setValidated(false); // Reset the validation status
    };

    const handleChange = (index) => (e) => {
        const value = e.target.value;
        if (value === "") {
            setOtp(prevOtp => {
                const newOtp = [...prevOtp];
                newOtp[index] = "";

                // Auto-focus on the previous input field (if available)
                if (index > 0) {
                    const previousSibling = e.target.previousElementSibling;
                    if (previousSibling) {
                        previousSibling.focus();
                    }
                }

                return newOtp;
            });
        }
        else if (characters.includes(value)) {
            setOtp(prevOtp => {
                const newOtp = [...prevOtp];
                newOtp[index] = value;
                // Auto-focus on the next input field (if available)
                if (index < 4) {
                    const nextSibling = e.target.nextElementSibling;
                    if (nextSibling) {
                        nextSibling.focus();
                    }
                }
                return newOtp;
            });
        }
    };

    const handleKeyUp = (index) => (e) => {
        if (e.keyCode === 8 && otp[index] === "") { // keyCode 8 is for backspace
            const previousSibling = e.target.previousElementSibling;
            if (previousSibling) {
                previousSibling.focus();
            }
        }
    };

    // useEffect to initialize the captcha on component mount
    useEffect(() => {
        generateNewCaptcha();
    }, []);

    // useEffect to set captcha entered
    useEffect(() => {
        setCaptchaText(otp.join(''))
    }, [otp]);

    // useEffect to check the validation when the captchaText changes
    useEffect(() => {
        console.log(captchaText)
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

            <div className='d-flex justify-content-between'>
                {otp.map((value, index) => (
                    <input
                        type="text"
                        className='src_input'
                        key={index}
                        placeholder='X'
                        maxLength="1"
                        value={value}
                        onChange={handleChange(index)}
                        onKeyUp={handleKeyUp(index)}
                    />

                ))}
            </div>
        </div>
    );
};

export default SecureReactCaptcha;
