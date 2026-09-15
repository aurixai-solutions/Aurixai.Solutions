import React from 'react';

const LaptopHero = () => {
  const imageUrl = "https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=1832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const styles = {
    container: {
      width: '100%',
      // Automatically calculates height based on width (standard landscape ratio)
      aspectRatio: '16 / 9', 
      
      // Safeguards so it doesn't get ridiculously tall on ultrawide monitors
      // or too squished on mobile phones
      maxHeight: '85vh', 
      minHeight: '400px', 
      
      overflow: 'hidden',
      position: 'relative' as const,
      backgroundColor: '#f0f0f0',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      
      // Changed back to dead center so the trackpad stays visible
      objectPosition: 'center', 
      display: 'block',
    }
  };

  return (
    <div style={styles.container}>
      <img 
        src={imageUrl} 
        alt="Laptop on a wooden desk" 
        style={styles.image} 
      />
    </div>
  );
};

export default function SolutionDemosPage() {
  return <LaptopHero />;
}

export { SolutionDemosPage };
