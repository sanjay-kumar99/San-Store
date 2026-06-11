const ContactUs = () => {
  return (
    <div className="min-h-screen bg-slate-950 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 rounded-3xl bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl md:p-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.1fr_1.4fr] md:items-center">
          <div className="rounded-3xl bg-linear-to-br from-sky-600 via-indigo-600 to-violet-700 p-10 text-white shadow-xl shadow-slate-950/30">
            <h1 className="text-4xl font-bold tracking-tight">Get In Touch</h1>
            <p className="mt-6 max-w-xl text-slate-100/90 leading-8">
              We are here to help you. Feel free to reach out for any queries,
              support, or collaboration.
            </p>

            <div className="mt-10 space-y-6 text-slate-100">
              <div>
                <h6 className="text-lg font-semibold">📍 Address</h6>
                <p className="mt-2 text-slate-200">Ludhiana, Punjab, India</p>
              </div>
              <div>
                <h6 className="text-lg font-semibold">📞 Phone</h6>
                <p className="mt-2 text-slate-200">+91 98765 43210</p>
              </div>
              <div>
                <h6 className="text-lg font-semibold">✉️ Email</h6>
                <p className="mt-2 text-slate-200">support@example.com</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-950/10 md:p-10">
            <h2 className="text-3xl font-semibold text-slate-900">
              Send Message
            </h2>
            <form className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-sky-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-sky-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
