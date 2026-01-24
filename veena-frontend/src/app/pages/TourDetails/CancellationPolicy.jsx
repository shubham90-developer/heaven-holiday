"use client";

const CancellationPolicy = () => {
  const policyData = [
    {
      fromDays: "121",
      toDays: "900",
      fromDate: "02 Jun 2023",
      toDate: "20 Jul 2025",
      fee: "10%",
    },
    {
      fromDays: "91",
      toDays: "120",
      fromDate: "21 Jul 2025",
      toDate: "19 Aug 2025",
      fee: "15%",
    },
    {
      fromDays: "61",
      toDays: "90",
      fromDate: "20 Aug 2025",
      toDate: "18 Sep 2025",
      fee: "20%",
    },
    {
      fromDays: "46",
      toDays: "60",
      fromDate: "19 Sep 2025",
      toDate: "03 Oct 2025",
      fee: "30%",
    },
    {
      fromDays: "31",
      toDays: "45",
      fromDate: "04 Oct 2025",
      toDate: "18 Oct 2025",
      fee: "50%",
    },
    {
      fromDays: "16",
      toDays: "30",
      fromDate: "19 Oct 2025",
      toDate: "02 Nov 2025",
      fee: "75%",
    },
    {
      fromDays: "6",
      toDays: "15",
      fromDate: "03 Nov 2025",
      toDate: "12 Nov 2025",
      fee: "85%",
    },
    {
      fromDays: "0",
      toDays: "5",
      fromDate: "13 Nov 2025",
      toDate: "18 Nov 2025",
      fee: "100%",
    },
  ];

  return (
    <section className="py-10 lg:px-0 px-4" id="policy">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">
          Cancellation Policy &amp; Payment Terms
        </h2>
        <ul className="list-disc list-inside text-gray-700 mt-3 mb-6 text-sm space-y-2">
          <li>
            The cancellation policy applies to the tour departing from
            Coimbatore on <strong>18 Nov 2025</strong>. To change the departure
            city or date, please go to the{" "}
            <span className="font-medium">‘Departure City &amp; Date’</span>{" "}
            section.
          </li>
          <li>
            Cancellation charges vary depending on how many days before the tour
            you cancel. Please refer to the table below for details.
          </li>
        </ul>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="p-3 text-left">From Days</th>
                <th className="p-3 text-left">To Days</th>
                <th className="p-3 text-left">From Date</th>
                <th className="p-3 text-left">To Date</th>
                <th className="p-3 text-left">Cancellation Fee (%)</th>
              </tr>
            </thead>
            <tbody>
              {policyData.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3">{row.fromDays}</td>
                  <td className="p-3">{row.toDays}</td>
                  <td className="p-3">{row.fromDate}</td>
                  <td className="p-3">{row.toDate}</td>
                  <td className="p-3">{row.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Terms */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-2">Payment Terms</h3>
          <p className="text-gray-700 text-sm">
            Guest can pay by Cheque/ Demand Draft/ Debit card / Credit card/
            NEFT/ RTGS/ IMPS. For Debit / Credit card payment additional 1.8 %
            convenience charge will be applicable. Cheque / Demand draft should
            be in favour of
            <span className="font-medium">
              {" "}
              "Veena Patil Hospitality Pvt Ltd"
            </span>
          </p>
        </div>

        {/* Remarks */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-2">Remarks</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
            <li>
              All meals are provided by Heaven Holiday in case the flight
              reaches the stipulated destination early morning or leaves
              destination late in the evening.
            </li>
            <li>
              In case, a particular sightseeing cannot be covered or visited on
              the Tour, owing to any kind of unavoidable political,
              environmental or social circumstances, then it will be replaced
              with other best possible alternative sightseeing.
            </li>
            <li>
              Standard Check-in and check-out time of International hotels is
              usually 1500hrs and 1200hrs respectively.
            </li>
            <li>
              Guests may please note that for Domestic flights or internal
              flights from one city to another city on international tours, the
              baggage allowance will be as per the respective airline baggage
              policy and weight regulations. Guests are requested to pack their
              belongings and carry luggage in accordance to the respective
              airlines baggage allowance. Excess baggage (if any) will be
              chargeable as per the airline policy and the same has to be borne
              by the guest.
            </li>
            <li>Yellow Fever Vaccination is required to travel to Kenya.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CancellationPolicy;
