import React,  { useState, useEffect, useRef } from 'react';
import styles from './progress-bar-creator.module.css'

const ProgressBarCreator = () => {
  const [items, setItems] = React.useState([]);

  const addItem = () => setItems(items => [...items, Date.now()]);
  const removeItem = (id) => setItems(items => items.filter(item => item !== id));

  return (
    <>
      <div>ProgressBarCreator</div>
      <button onClick={addItem}>Add Progress Bar</button>
      <div className={styles.progressBarContainer}>
        {items.map((id) => (
          <div key={id} style={{ margin: '10px 0' }}>
            <ProgressBar />
            <button onClick={() => removeItem(id)}>Remove</button>
          </div>
        ))}
      </div>
    </>
  );
}

const ProgressBar = () => {
    const [progress, setProgress] = useState(0)
    const progressStart = useRef(null)
    const animationRef = useRef(null);

    useEffect(() => {
        const duration = 2000;
        const animate = (timestamp) => {
            if(!progressStart.current) {
                progressStart.current = timestamp;
            }

            const elapsed = timestamp - progressStart.current;

            const progress = Math.min(100, (elapsed / duration) * 100);

            setProgress(progress)

            if(progress < 100) {
                animationRef.current = requestAnimationFrame(animate);
            }
        }

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationRef.current);
        }
    }, [])




    return (
    <div>
        <div className={styles.progressBarInitial}>
            <div style={{width: `${progress}%`}} className={styles.progressBarLoading}></div>
        </div>
    </div>
  )
}

export default ProgressBarCreator
