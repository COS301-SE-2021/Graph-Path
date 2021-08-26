import React from "react";
import {Button, Whisper } from "rsuite";

const TriggerMethod = ({triggerRef, speaker})=>{
    return (
        <div>
            <Whisper  placement={'autoVertical'} speaker={speaker} trigger={'none'} ref={triggerRef}>
            <Button >Add Node</Button>

            </Whisper>
        </div>
    )
}

export default TriggerMethod ;