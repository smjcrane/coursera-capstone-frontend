import React from "react";
import zxcvbn from "zxcvbn";

const okay = 60 * 60 * 24; // 1 day

function isStronk(password) {
    return zxcvbn(password).crack_times_seconds.offline_slow_hashing_1e4_per_second >= okay;
}

const classNames = ["pass-weak", "pass-okay", "pass-stronk"]
const defaultMessages = ["Make it a bit longer", "Hmmm... okay then", "That's great!"]

class PasswordStrength extends React.Component{

    render(){
        let s = zxcvbn(this.props.value);
        let l = 0;
        if (s.crack_times_seconds.offline_slow_hashing_1e4_per_second >= okay){
            l = 1;
        }
        if (s.crack_times_seconds.offline_slow_hashing_1e4_per_second > okay * 1000){
            l = 2;
        }
        if (s.feedback.suggestions.length === 0){
            s.feedback.suggestions=[defaultMessages[l]]
        }
        return(
            <div className="input-field-container">
                <p>It would take
                    <span className={classNames[l]}>&nbsp;{s.crack_times_display.offline_slow_hashing_1e4_per_second}&nbsp;</span>
                    for an attacker to guess your password</p>
                <p className="pass-weak">{s.feedback.warning}</p>
                {s.feedback.suggestions.map(msg=><p className={classNames[l]} key={msg}>{msg}</p>)}
            </div>
        )
    }

}

export {PasswordStrength, isStronk, okay}