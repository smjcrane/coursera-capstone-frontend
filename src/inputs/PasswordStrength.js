import React from "react";

const alpha = /^[a-zA-Z]*$/
const alphanum= /^[a-zA-Z0-9]*$/

function howStronk(password){
    let alphabetSize=50; // no idea what this should be
    if (alphanum.test(password)){
        alphabetSize = 36
    }
    if (alpha.test(password)){
        alphabetSize = 26
    }
    return Math.pow(alphabetSize, password.length)
}

const okay = 864000000000000000;
const good = okay * 10000000000;

const messages = ["My dog could guess that", "Hmmm... okay then", "That's great!"]
const classNames = ["pass-weak", "pass-okay", "pass-stronk"]

class PasswordStrength extends React.Component{

    render(){
        let s = howStronk(this.props.value);
        let l = 0;
        if (s > okay){
            l = 1;
        }
        if (s > good){
            l = 2;
        }
        return(
            <div className="input-field-container">
                <p className={classNames[l]}>{messages[l]}</p>
            </div>
        )
    }

}

export {PasswordStrength, howStronk, okay}