import { useState } from 'react';
import BraintreeDropIn from './Braintree';
import { Button, Spinner } from '@chakra-ui/react';
export default function CheckoutBT({
  price,
  setEnabled,
  setMessage,
  email,
  bodyData,
}) {
  const [showBraintreeDropIn, setShowBraintreeDropIn] = useState(false);

  return (
    <div className="payment-checkout-wrapper">
      <div className="payment-bills">
        {showBraintreeDropIn ? (
          <Spinner align="center" justify="center" />
        ) : (
          <Button
            className="pay-button-proceed"
            onClick={() => {
              setShowBraintreeDropIn(true);
            }}
            disabled={showBraintreeDropIn}
          >
            {'Proceed to pay'}
          </Button>
        )}
      </div>
      <BraintreeDropIn
        show={showBraintreeDropIn}
        price={price}
        email={email}
        bodyData={bodyData}
        onPaymentCompleted={() => {
          setShowBraintreeDropIn(false);
          setEnabled(false);
          setMessage(`Successfully Donated $${price}.`);
        }}
      />
    </div>
  );
}
