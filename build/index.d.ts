import React from 'react';

import SecureReactCaptcha from './index'

// Define the prop types for the SecureReactCaptcha component
declare interface SecureReactCaptchaProps {
    setValidated: (validated: boolean) => void;
    needDots?: boolean;
    needLines?: boolean;
    minDots?: number;
    maxDots?: number;
    minLines?: number;
    maxLines?: number;
    characters?: string;
}

// Define the SecureReactCaptcha component
declare const SecureReactCaptcha: React.FC<SecureReactCaptchaProps>;

export default SecureReactCaptcha;
