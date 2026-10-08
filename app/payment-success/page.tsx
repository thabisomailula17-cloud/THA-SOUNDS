export default function PaymentSuccess() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      <div>
        <p style={{ fontSize: '14px', letterSpacing: '0.1em' }}>
          THA SOUNDS
        </p>

        <h1>Payment successful.</h1>

        <p>
          Your payment for Live or Die 2.0 (Revisit) was successful.
        </p>

        <p>
          Your download will be available here once payment verification
          is connected.
        </p>

        <a href="/" style={{ display: 'inline-block', marginTop: '20px' }}>
          Back to THA SOUNDS
        </a>
      </div>
    </main>
  );
}
