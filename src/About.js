import React from "react";

function About(){
    return (
        <div style={{"padding": "20px"}}>
            <h2>About</h2>
            <p>This website was built for the&nbsp;
                <span style={{"text-decoration": "underline"}}>
                    <a href="https://www.coursera.org/specializations/cyber-security">
                        Coursera Cybersecurity specialism
                    </a>
                </span>
                 &nbsp;by Maryland University.</p>
            <p>If you have any feedback for me, you can send me a message in my app.  My username is 'simon' (without quotes).</p>
            <p>It may disappear permanently without warning at any time.</p>
        </div>
    )
}

export default About;