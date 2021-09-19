// import React from 'react';
import '../../css/PopUpMessage.css' ;
import { Notification } from 'rsuite';
// import PropTypes from 'prop-types' ;


function PopUpMessage(text,type ){

    if (['info','success','warning','error'].indexOf(type.toString())>0 ){
        Notification[type]({
            title: type.toUpperCase() ,
            description:text  ,
            duration:3000, 
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