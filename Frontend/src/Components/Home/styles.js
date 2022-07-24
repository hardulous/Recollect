
import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({

      [theme.breakpoints.down("sm")]:{

        mainContainer:{
          flexDirection:"column-reverse",
          alignItems:"center",
        },

        form:{
          alignSelf: "center",
          marginRight: "160px",
        },

      },

     ['@media (min-width: 100px) and (max-width: 600px)']:{

        form:{
          margin: "0px",
      },

     },

      [theme.breakpoints.down("xs")]:{

        mainContainer:{
          flexDirection:"column-reverse"
        }

      },
      
}));