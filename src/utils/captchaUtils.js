/**
 * Generates a CAPTCHA image on the given canvas element.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element where the CAPTCHA will be drawn.
 * @param {boolean} dots - Whether to draw noise dots on the canvas.
 * @param {boolean} lines - Whether to draw curved lines on the canvas.
 * @param {number} minLine - Minimum number of lines to draw (if lines is enabled).
 * @param {number} maxLine - Maximum number of lines to draw (if lines is enabled).
 * @param {number} minDots - Minimum number of dots to draw (if dots is enabled).
 * @param {number} maxDots - Maximum number of dots to draw (if dots is enabled).
 * @param {string} characters - A string containing the characters to be used in the CAPTCHA text.
 * @returns {string} - The generated CAPTCHA text.
 */
export function generateCaptcha(
    canvas,
    dots,
    lines,
    minLine,
    maxLine,
    minDots,
    maxDots,
    characters
) {
    // Get the 2D rendering context of the canvas.
    const ctx = canvas.getContext("2d");

    // Set the canvas dimensions.
    canvas.width = 250; // Adjusted width
    canvas.height = 50; // Adjusted height

    // Fill the canvas with a white background.
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw noise (dots)
    if (dots) {
        for (let i = 0; i < getRandomBetween(Math.min(minDots, maxDots), Math.max(minDots, maxDots)); i++) {
            ctx.fillStyle = getRandomColor();
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // Draw noise (curved lines)
    if (lines) {
        for (let i = 0; i < getRandomBetween(Math.min(minLine, maxLine), Math.max(minLine, maxLine)); i++) {
            ctx.strokeStyle = getRandomColor();
            ctx.lineWidth = getRandomBetween(1, 2);
            ctx.beginPath();
            const startX = Math.random() * getRandomBetween(canvas.width, canvas.width + getRandomBetween(10, 50));
            const startY = Math.random() * getRandomBetween(canvas.height, canvas.height + getRandomBetween(10, 50));
            const cp1X = Math.random() * getRandomBetween(canvas.width, canvas.width + getRandomBetween(10, 50));
            const cp1Y = Math.random() * getRandomBetween(canvas.height, canvas.height + getRandomBetween(10, 50));
            const cp2X = Math.random() * getRandomBetween(canvas.width, canvas.width + getRandomBetween(10, 50));
            const cp2Y = Math.random() * getRandomBetween(canvas.height, canvas.height + getRandomBetween(10, 50));
            const endX = Math.random() * getRandomBetween(canvas.width, canvas.width + getRandomBetween(10, 50));
            const endY = Math.random() * getRandomBetween(canvas.height, canvas.height + getRandomBetween(10, 50));

            ctx.moveTo(startX, startY);
            ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
            ctx.stroke();
        }
    }

    // Initialize the CAPTCHA text.
    let captchaText = "";

    // Generate characters for CAPTCHA text.
    for (let i = 0; i < 5; i++) {
        ctx.fillStyle = getRandomDeepColor();
        ctx.strokeStyle = '#000'; // Black stroke color
        ctx.lineWidth = 1; // Adjust the stroke width as needed

        ctx.save();

        // Generate a random font size.
        const fontSize = Math.random() * 15 + 20; // Increased font size range
        ctx.font = `${fontSize}px Arial`;
        ctx.translate(25 + i * 45, 35);

        ctx.transform(1, Math.random() * 0.75 - 0.25, Math.random() * 0.75 - 0.25, 1, 0, 0);

        // Get a random character from the specified character set.
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        captchaText += char;

        // Draw the text with fill and stroke.
        ctx.fillText(char, 0, 0);
        ctx.strokeText(char, 0, 0);

        ctx.restore();
    }

    // Log the generated CAPTCHA text.
    // console.log(captchaText);

    // Return the generated CAPTCHA text.
    return captchaText;
}

/**
 * Generates a random hex color.
 *
 * @returns {string} - The generated color in hexadecimal format.
 */
export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Generates a random alphanumeric ID of the specified length.
 *
 * @param {number} length - The length of the generated ID (default is 64).
 * @returns {string} - The generated alphanumeric ID.
 */
export function getRandomId(length = 64) {
    const letters = 'qwertyuiopasdfghjklzxcvbn0987654321mQWERTYUIOSDFGHJKLZXCVBNM';
    let text = '';
    for (let i = 0; i < length; i++) {
        text += letters[Math.floor(Math.random() * letters.length)];
    }
    return text;
}

/**
 * Generates a random number between the specified minimum and maximum values.
 *
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} - The generated random number.
 */
function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Generates a random deep color in hexadecimal format.
 *
 * @returns {string} - The generated deep color in hexadecimal format.
 */
function getRandomDeepColor() {
    // Convert HSV to RGB
    function hsvToRgb(h, s, v) {
        let r, g, b, i, f, p, q, t;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }
        return '#' + ((1 << 24) + (Math.round(r * 255) << 16) + (Math.round(g * 255) << 8) + Math.round(b * 255)).toString(16).slice(1);
    }

    const hue = Math.random();
    const saturation = 0.8 + Math.random() * 0.2;  // Keep it high for deep colors
    const value = 0.1 + Math.random() * 0.3;       // Restrict value to get deeper colors
    return hsvToRgb(hue, saturation, value);
}
