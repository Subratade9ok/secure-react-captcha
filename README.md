# SecureReactCaptcha

`SecureReactCaptcha` is a React component that provides an easy way to add secure CAPTCHA functionality to your web forms. CAPTCHAs are commonly used to prevent automated bot submissions on web applications.

## Features

1. **CAPTCHA Generation**: `SecureReactCaptcha` provides a simple and efficient way to generate CAPTCHA images, which are commonly used to prevent automated bot submissions on web forms.

2. **Customizable CAPTCHA**: You can customize the CAPTCHA generation process by specifying options such as the inclusion of noise dots and curved lines, as well as adjusting the quantity of dots and lines.

3. **User Validation**: The component offers user validation by comparing the entered CAPTCHA text with the generated CAPTCHA image. It provides feedback to the parent component through the `setValidated` callback.

4. **Auto Reset**: The CAPTCHA can be reset easily by clicking the provided "Reset" button, generating a new CAPTCHA image and clearing the user-entered text.

5. **Flexible Character Set**: You can define a custom character set for the CAPTCHA text, allowing you to include specific characters or limit the character set to your requirements.

6. **Accessibility**: The component is designed to be accessible and can be used in compliance with accessibility guidelines for web applications.

7. **Easy Integration**: Integrating the `SecureReactCaptcha` component into your React application is straightforward, making it a convenient choice for adding CAPTCHA functionality to forms.

8. **Clean Styling**: The component provides basic styling, and you can further customize its appearance by applying your CSS styles to match your application's design.

9. **User-Friendly**: It enhances the user experience by providing a visual challenge-response test without the need for users to decipher complex characters.

10. **Open Source**: The component is open-source and can be freely used and extended in your projects. You can also contribute to its development and improvement.

These features collectively make the `SecureReactCaptcha` component a valuable tool for securing your web forms against automated bot submissions while ensuring a user-friendly experience for your website visitors.



## Installation

You can install `SecureReactCaptcha` using npm or yarn:

```
npm install secure-react-captcha
# or
yarn add secure-react-captcha
```

## Styling the Component

import the stylesheet to your `index.js` file:

```
import 'secure-react-captcha/styles/style.css'
```

## Usage

```

import React, { useState } from 'react';

import SecureReactCaptcha from 'secure-react-captcha';

function App() {
  const [validated, setValidated] = useState(false);

  const handleValidation = (isValid) => {
    setValidated(isValid);
  };

  const submitForm = e => {
    e.preventDefault();
    if(validated){
      // do submit your form here...
    }else{
      // show error message
    }
  }

  return (
    <div>
      <h1>Secure Form</h1>
      <form onSubmit={submitForm}>
        {/* Your other form fields here */}

        {/* Place the captcha component here */}

        <SecureReactCaptcha
          setValidated={handleValidation}
        />

        {/* Your submit button here */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

```

## Props

- `setValidated` (function, required): A callback function that will receive a boolean value indicating whether the entered CAPTCHA text is valid.

- `needDots` (boolean, optional, default: `true`): Whether to include noise dots in the CAPTCHA image.

- `needLines` (boolean, optional, default: `true`): Whether to include curved lines in the CAPTCHA image.

- `minDots` (number, optional, default: `400`): Minimum number of noise dots in the CAPTCHA image.

- `maxDots` (number, optional, default: `500`): Maximum number of noise dots in the CAPTCHA image.

- `minLines` (number, optional, default: `10`): Minimum number of curved lines in the CAPTCHA image.

- `maxLines` (number, optional, default: `100`): Maximum number of curved lines in the CAPTCHA image.

- `characters` (string, optional, default: `"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz"`): The set of characters to be used in the CAPTCHA text.


## Custom Styling the Component

if you want to write the styles of your own, use the following format:
```

/* Container for the entire ReactSecureCaptcha component */
.src_container {
    /* Your styles for the container */

    &:hover {
        /* Styles on hover */
    }

    &:focus {
        /* Styles on focus */
    }
}

/* Container for the captcha canvas and reset button */
.src_canvas_container {
    /* Your styles for the container */

    &:hover {
        /* Styles on hover */
    }

    &:focus {
        /* Styles on focus */
    }
}

/* The captcha canvas element */
.src_canvas {
    /* Your styles for the canvas */

    &:hover {
        /* Styles on hover */
    }

    &:focus {
        /* Styles on focus */
    }
}

/* The reset button for generating a new captcha */
.src_reset_button {
    /* Your styles for the reset button */

    &:hover {
        /* Styles on hover */
    }

    &:focus {
        /* Styles on focus */
    }
}

/* The input field for entering captcha text */
.src_input {
    /* Your styles for the input field */

    &:hover {
        /* Styles on hover */
    }

    &:focus {
        /* Styles on focus */
    }
}
```

and then import your css file to `index.js` file instead of the default css file.

## License

This component is released under the MIT License. See [LICENSE](LICENSE) for details.

## Issues

If you encounter any issues or have suggestions for improvements, please open an issue on the [Github Repository](https://github.com/subratade9ok/secure-react-captcha/issues).


## Author

- [Subrata Kumar De](https://github.com/Subratade9ok)

## Contributors

We welcome contributions from the community. If you'd like to contribute to this project, please fork the repository and submit a pull request.
