"use client";

import { workerCode } from 'public/workers/dataProcessor';
import { useEffect, useRef, useState } from 'react';

export function useWebWorker() {
  const workerRef = useRef<Worker | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Create worker from code string
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    workerRef.current = new Worker(workerUrl);
    
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        URL.revokeObjectURL(workerUrl);
      }
    };
  }, []);
  
  const processData = (data: any, operation: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        reject(new Error('Worker not available'));
        return;
      }
      
      setIsLoading(true);
      
      const handleMessage = (e: MessageEvent) => {
        setIsLoading(false);
        workerRef.current?.removeEventListener('message', handleMessage);
        resolve(e.data.result);
      };
      
      const handleError = (error: ErrorEvent) => {
        setIsLoading(false);
        workerRef.current?.removeEventListener('error', handleError);
        reject(error);
      };
      
      workerRef.current.addEventListener('message', handleMessage);
      workerRef.current.addEventListener('error', handleError);
      workerRef.current.postMessage({ data, operation });
    });
  };
  
  return { processData, isLoading };
}
