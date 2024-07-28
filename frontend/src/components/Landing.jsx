import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="landing-wrapper">
            <div className="landing-inner-wrapper">
                <h1>Struggling to plan your next vacation?</h1>
                <p>Look no further! The AI Travel App takes the stress out of travel planning.</p>
                <br></br>
                <h1>
                    What does the AI Travel App do?
                </h1>
                <p>
                    Get personalized travel recommendations tailored to your budget and preferences.
                    Start your adventure today with the AI Travel App by having it find the best
                    hotels for you! 
                </p>
                <button><Link to="/housing">Take me to my next adventure!</Link></button>
            </div>
        </div>
    )
}

export default Landing;