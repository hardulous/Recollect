import React , {useState} from "react";
import { Container } from "@material-ui/core";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home.js";
import Auth from './Components/Auth/Auth.js'
import Alert from "./Components/Alert/Alert.js";

function App() {

  const [alert, setalert] = useState(null); // state variable to show alert 
  
  const ShowAlert =(type,messasge)=>{

    setalert({

      type:type,
      msg:messasge
    })

    // and after 3 sec alert will be removed
    setTimeout(() => {
      
      setalert(null);

    }, 6000);

  }
   

  return (

    <Router>

      <Container maxWidth="lg">

        <Navbar ShowAlert={ShowAlert}/>
        <Alert Alert={alert}/>

        <Routes>

          <Route  exact path="/" element={<Home ShowAlert={ShowAlert}/>}></Route>
          <Route  exact path="/auth" element={<Auth ShowAlert={ShowAlert}/>}></Route>

        </Routes>

      </Container>

    </Router>

  );

}

export default App;
