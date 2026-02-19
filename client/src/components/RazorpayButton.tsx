import { useEffect, useRef } from 'react';

interface RazorpayButtonProps {
    paymentButtonId: string;
}

export default function RazorpayButton({ paymentButtonId }: RazorpayButtonProps) {
    const containerRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Clear previous potentially injected scripts to avoid duplication if re-rendered
        container.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
        script.dataset.payment_button_id = paymentButtonId;
        script.async = true;

        container.appendChild(script);

        return () => {
            if (container) {
                container.innerHTML = '';
            }
        };
    }, [paymentButtonId]);

    return <form ref={containerRef} className="w-full flex justify-center" />;
}
