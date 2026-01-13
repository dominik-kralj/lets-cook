import { useEffect, useRef, useState } from 'react';

export function useCountdown(initialCount = 0) {
    const [countdown, setCountdown] = useState(initialCount);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (countdown > 0) {
            timerRef.current = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        if (timerRef.current) {
                            clearInterval(timerRef.current);
                            timerRef.current = null;
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [countdown]);

    const startCountdown = (seconds: number) => {
        setCountdown(seconds);
    };

    const resetCountdown = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setCountdown(0);
    };

    return { countdown, startCountdown, resetCountdown };
}