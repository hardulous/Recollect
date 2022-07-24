import React from "react";

const Alert = (props) => {

  // to capital the first word of success
  const capitalize = (word) => {

    if(word=="danger"){
      word="error";
    }

    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (

 
    <div style={{ height: "50px",marginBottom:"20px" }}>
     
      {props.Alert && (
        <div>
          <div
            className={`alert alert-${props.Alert.type} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{capitalize(props.Alert.type)}</strong>:{props.Alert.msg}
          </div>
        </div>
      )}
    </div>

  );

};

export default Alert;
