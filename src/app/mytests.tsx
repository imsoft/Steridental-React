// const MyTestsPage = () => {

//   return (
//     <div>My Tests Page</div>
//   );
// };

// export default MyTestsPage;

import { useEffect } from 'react';

declare global {
  interface Window {
    ConektaCheckoutComponents: any;
  }
}
const ConektaCheckout = () => {
  useEffect(() => {
    // const config = {
    //   targetIFrame: "#conektaIframeContainer",
    //   publicKey: "Key_LlavePUBLICA123456789",
    //   locale: 'es',
    // };
    // const callbacks = {
    //   onCreateTokenSucceeded: function(token: any) {
    //     console.log(token)
    //   },
    //   onCreateTokenError: function(error: any) {
    //     console.log(error)
    //   },
    //   onGetInfoSuccess: function(loadingTime: any){
    //     console.log("loadingTime");
    //   }
    // };

  }, []);

  return (
    <div id="conektaIframeContainer" style={{ height: '1350px' }}></div>
  );
}

export default ConektaCheckout;
