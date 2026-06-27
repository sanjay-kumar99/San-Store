const ShippingPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>

      <div className="space-y-5 text-gray-700 leading-8">
        <p>Orders are processed within 24-48 hours after confirmation.</p>

        <p>Standard delivery takes 3-7 business days depending on location.</p>

        <p>
          Shipping charges may vary based on order value and delivery location.
        </p>

        <p>Tracking details will be shared once the order is dispatched.</p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
