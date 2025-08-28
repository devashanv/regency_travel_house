import React, { useEffect } from "react";
import NavBar1 from "../components/NavBar1";
import Footer from "../components/Footer";
function TermsAndPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {" "}
      <header>
        <NavBar1 />
      </header>
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800 py-10">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-10 lg:p-14 border border-gray-100">
          <div className="space-y-12">
            <div className="max-w-4xl mx-auto text-center mb-16 px-6">
              <h1 className="text-4xl font-bold text-primary bg-clip-text ">
                Terms of Use – Regency Travel House
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Please review our Terms of Use carefully before using this
                website. By using our website, you agree to be bound by these
                terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <span className="text-primary font-bold">01.</span> Ownership
              </h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                This website is owned by{" "}
                <strong>Regency Travel House (Private) Limited</strong>,
                incorporated under the laws of Sri Lanka. <br />
                Registered office:{" "}
                <span className="italic">
                  No 747/1/1A, Sirimavo Bandaranayake Mawatha, Kandy
                </span>
                . <br />
                Registered No: <strong>PV 00317111</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <span className="text-primary font-bold">02.</span> Permitted
                Use
              </h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                You must use this site responsibly and lawfully. You must not:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
                <li>Use another’s personal information without permission.</li>
                <li>Make fraudulent, speculative, or false bookings.</li>
                <li>
                  Post or transmit unlawful, defamatory, obscene, or
                  pornographic material.
                </li>
                <li>Tamper with or attempt to disrupt site functionality.</li>
                <li>Transmit viruses or harmful code.</li>
                <li>
                  Breach third-party intellectual property or confidentiality
                  rights.
                </li>
                <li>
                  Commit or attempt to commit any unlawful act using the site.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <span className="text-primary font-bold">03.</span> Intellectual
                Property
              </h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                All content, software, design, text, graphics, trademarks, and
                logos are owned or licensed by Regency Travel House. Copying,
                modifying, or distributing materials without prior written
                consent is prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <span className="text-primary font-bold">04.</span> Linking
              </h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Our site may contain links to external sites for your
                convenience. We do not endorse or take responsibility for their
                content or products.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <span className="text-primary font-bold">05.</span> Warranties
              </h2>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
                <li>You are of legal age to create binding obligations.</li>
                <li>You are financially responsible for your site usage.</li>
                <li>
                  All information you provide will be accurate and not
                  misleading.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <span className="text-primary font-bold">06.</span> Indemnity
              </h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                You agree to indemnify Regency Travel House, its employees, and
                agents against any claims, damages, or expenses resulting from
                your misuse of the site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <span className="text-primary font-bold">07.</span> Privacy
              </h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Your personal information will be handled in accordance with our{" "}
                <a
                  href="/privacy-policy"
                  className="text-primary hover:text-blue-800 underline font-medium"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <span className="text-primary font-bold">08.</span> Liability
              </h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                This site is provided on an “as is” basis. We make no guarantees
                on accuracy, completeness, or suitability of information. We are
                not liable for any direct, indirect, or consequential damages
                arising from use of this site, except where liability cannot be
                excluded under law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <span className="text-primary font-bold">09.</span> Booking
                Terms & Conditions
              </h2>

              <div className="mt-3 space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-lg">Prices</h3>
                  <p>
                    All prices are subject to availability and may change
                    without notice. Prices are guaranteed only when paid in
                    full. Additional charges may apply due to currency
                    fluctuations, fuel surcharges, or taxes.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Exchange Rate</h3>
                  <p>
                    Payments accepted in LKR or USD only. Regency Travel House
                    is not liable for exchange rate differences.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Travel Documents</h3>
                  <p>
                    Documents (tickets, vouchers, etc.) may be non-refundable
                    and non-transferable. Names must match passport/ID. Errors
                    must be reported immediately.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Schedule Changes</h3>
                  <p>
                    Travelers are responsible for confirming flight times 24
                    hours prior to departure.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Insurance, Passports & Visas
                  </h3>
                  <p>
                    We strongly recommend travel insurance. Passengers must hold
                    valid passports, visas, and health documents. Responsibility
                    lies with the traveler.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Baggage</h3>
                  <p>
                    Baggage allowances and restrictions are set by carriers.
                    Excess charges may apply.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Health</h3>
                  <p>
                    Travelers must comply with all health and vaccination
                    requirements of destination countries.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Change & Cancellation Fees
                  </h3>
                  <p>
                    Changes or cancellations may incur Regency Travel House and
                    supplier fees, up to 100% of the booking cost.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Payments</h3>
                  <p>
                    Credit card surcharges apply. Deposits are non-refundable.
                    Final payments are due 6 weeks prior to departure unless
                    stated otherwise.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Agency</h3>
                  <p>
                    Regency Travel House acts as an agent for third-party
                    providers. We are not liable for services provided by third
                    parties.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <span className="text-primary font-bold">10.</span> Governing
                Law
              </h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                These Terms are governed by the laws of Sri Lanka. Any disputes
                will be subject to the exclusive jurisdiction of Sri Lankan
                courts.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <span className="text-primary font-bold">11.</span>{" "}
                Acknowledgement
              </h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                By using this site, you confirm you are 18+ years old and agree
                to these Terms and Conditions.
              </p>
            </div>

            <p className="text-sm text-gray-500 mt-10 text-center border-t pt-6">
              Last updated: <strong>1 July 2025</strong>
            </p>
          </div>
        </div>
      </section>

      {/* footer section*/}
      <div className="bg-primary bg-center px-20 pt-10 print:hidden">
        <Footer />

        <hr className="mx-auto bg-secondary text-secondary h-[1px] w-4/5 mt-20" />
        <div>
          <p className="bg-primary text-center text-xs p-3 text-body">
            © All rights reserved by All In One Holdings.
          </p>
        </div>
      </div>
    </>
  );
}

export default TermsAndPolicy;
