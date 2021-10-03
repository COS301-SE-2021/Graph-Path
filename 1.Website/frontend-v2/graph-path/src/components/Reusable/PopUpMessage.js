// import React from 'react';
import '../../css/PopUpMessage.css' ;
import { Notification } from 'rsuite';
// import PropTypes from 'prop-types' ;


function PopUpMessage(text,type ){
    let dur = 3000 ; //default
    if (type === 'warning'){
        dur = 7000 ;
    }
    if (['info','success','warning','error'].indexOf(type.toString())>0 ){
        Notification[type]({
            title: type.toUpperCase() ,
            description:text  ,
            duration:dur, 
            placement:'topEnd' 
        }) ;
    }
    else {
        Notification.info({
            description:text ,
            duration: 3000 ,
        })
    }

    
    
}

// PopUpMessage.propTypes ={
//     type : PropTypes.objectOf() ,
//     text : PropTypes.string.isRequired ,
// }

export default PopUpMessage;