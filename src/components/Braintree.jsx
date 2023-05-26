import React, { useEffect, useState } from 'react';
import dropin from 'braintree-web-drop-in';
import { Box, Button } from '@chakra-ui/react';
import { useError, useResponse } from '../context/ErrorContext';
import { donatePostAPI } from '../services/publicAPI';

export default function BraintreeDropIn(props) {
  const { show, onPaymentCompleted, price, email, bodyData } = props;
  const [braintreeInstance, setBraintreeInstance] = useState(undefined);
  const { showError } = useError();
  const { showSuccess, showInfo } = useResponse();
  useEffect(() => {
    if (show) {
      const initializeBraintree = () =>
        dropin.create(
          {
            // insert your tokenization key or client token here
            authorization: `${process.env.REACT_APP_BRAINTREE_TOKEN}`,
            container: '#braintree-drop-in-div',
            card: {
              cardholderName: {
                required: false,
              },
            },
            // paypal: {
            //   flow: 'checkout',
            //   amount: `${price}`,
            //   currency: 'USD',
            // },
          },
          function (error, instance) {
            if (error) console.error(error);
            else setBraintreeInstance(instance);
          }
        );

      if (braintreeInstance) {
        braintreeInstance.teardown().then(() => {
          initializeBraintree();
        });
      } else {
        initializeBraintree();
      }
    }
  }, [show]);

  return (
    <Box display={show ? 'block' : 'none'}>
      <Box id="braintree-drop-in-div" />

      <Button
        className="braintreePayButton pay-button-proceed"
        type="primary"
        disabled={!braintreeInstance}
        onClick={() => {
          if (braintreeInstance) {
            braintreeInstance.requestPaymentMethod(async (error, payload) => {
              if (error) {
                console.error(error);
              } else {
                const paymentMethodNonce = payload.nonce;
                console.log('payment method nonce', payload.nonce);
                console.log('payload', payload);

                // TODO: use the paymentMethodNonce to
                //  call you server and complete the payment here

                // ...
                let res = await donatePostAPI(email, bodyData);
                if (res) {
                  showSuccess(
                    `Payment completed with nonce=${paymentMethodNonce}`
                  );

                  onPaymentCompleted();
                }
              }
            });
          }
        }}
      >
        Confirm
      </Button>
    </Box>
  );
}
