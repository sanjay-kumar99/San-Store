const FAQ = () => {
  const faqs = [
    {
      question: "How can I place an order?",
      answer:
        "Browse products, add them to your cart, and proceed to checkout.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept UPI, Debit Cards, Credit Cards, Net Banking and Cash on Delivery.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Orders are usually delivered within 3-7 business days.",
    },
    {
      question: "Can I return a product?",
      answer:
        "Yes, products can be returned within 7 days of delivery.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="space-y-5">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow rounded-xl p-5">
            <h3 className="font-semibold text-lg">{faq.question}</h3>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;