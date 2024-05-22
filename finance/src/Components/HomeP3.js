import React from "react";

function HomeP3() {
  return (
    <div id="benefits" className="container">
      <h2 className="fw-semibold fst-italic text-center my-4 text-decoration-underline">
        Things we help to benefit you
      </h2>
      <div className="fs-5">
        <div className="row d-flex justify-content-center align-items-center text-center">
          <div className="col-12 col-md-6 order-1 order-md-1">
            <img src="./photos/income.svg" className="w-100" alt="img" />
          </div>
          <div className="col-12 col-md-6 order-2 order-md-2">
            <div>
              <p>
                Income serves as the primary means for meeting basic needs such
                as food, shelter, clothing, and healthcare. It provides a
                foundation for economic stability and the ability to weather
                unexpected expenses or emergencies.With sufficient income,
                individuals can afford a higher quality of life, including
                access to better housing, education, healthcare, and leisure
                activities. This can lead to improved physical and mental
                well-being.
              </p>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-6 order-1 order-md-2">
            <img src="./photos/expenses.svg" className="w-100" alt="img" />
          </div>
          <div className="col-12 col-md-6 order-2 order-md-1">
            <div>
              <p>
                Budgeting encourages individuals to track their income and
                expenses, fostering a deeper understanding of their financial
                situation. It allows them to identify areas where they can cut
                costs, save more, and prioritize spending based on their goals
                and values.Budgets serve as a roadmap for achieving financial
                goals, whether it's saving for a vacation, purchasing a home,
                paying off debt, or planning for retirement. By allocating
                resources strategically, individuals can progress steadily
                toward their objectives.
              </p>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-6 order-1 order-md-1">
            <img src="./photos/budget.svg" className="w-100" alt="img" />
          </div>
          <div className="col-12 col-md-6 order-2 order-md-2">
            <div>
              <p>
                Effective expense management enables individuals and
                organizations to monitor and control their expenditures. By
                tracking expenses closely, they can identify unnecessary or
                excessive spending and implement measures to reduce costs
                without compromising quality.Expense management facilitates
                adherence to budgets by providing visibility into spending
                patterns and variances.
              </p>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-6 order-1 order-md-2">
            <img src="./photos/goals.svg" className="w-100" alt="img" />
          </div>
          <div className="col-12 col-md-6 order-2 order-md-1">
            <div>
              <p>
                Money goals provide clarity and direction by defining specific
                financial objectives. Whether it's saving for retirement, buying
                a home, or paying off debt, having clear goals helps individuals
                prioritize their financial decisions and focus their efforts on
                what matters most.Setting money goals motivates individuals to
                take action and make positive changes in their financial
                behavior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeP3;
