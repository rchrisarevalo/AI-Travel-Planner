import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";

function Housing() {
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    budget: "$0-$500",
    city: "",
    state: "",
    country: "",
  });

  const [res, setRes] = useState("");
  const [requestStatus, setRequestStatus] = useState({
    pending: true,
    error: false,
    submitted: false,
  });

  const handleSubmission = (e) => {
    e.preventDefault();

    // Set the submitted state variable
    // to true.
    setRequestStatus({ ...requestStatus, submitted: true });

    const retrieveData = async () => {
      const res = await fetch("http://localhost:5000/recommendations", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setRequestStatus({
          ...requestStatus,
          pending: false,
          error: false,
          submitted: true,
        });
        setRes(data.recommendations);
      } else {
        setRequestStatus({
          ...requestStatus,
          pending: false,
          error: true,
          submitted: true,
        });
        setRes("There was an error processing your request. Please try again.");
      }
    };
    retrieveData();
  };

  const handleChangeAttr = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getDate = () => {
    if (new Date().getMonth() + 1 >= 1 && new Date().getMonth() + 1 <= 9) {
      return `${new Date().getFullYear()}-0${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`;
    } else {
      return `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`;
    }
  };

  useEffect(() => {
    console.log(form.start_date)
  }, [form])

  return (
    <div className="housing-form-wrapper">
      <>
        {!requestStatus.submitted ? (
          <>
            <MediaQuery minWidth={866}>
              <form className="housing-form" onSubmit={handleSubmission}>
                <h3>See your travel possibilities!</h3>
                <span className="housing-form-row">
                  <span className="housing-form-col">
                    <label>Start date:</label>
                    <input
                      type="date"
                      name="start_date"
                      onChange={handleChangeAttr}
                      min={getDate()}
                      required
                    />
                  </span>
                  <span className="housing-form-col">
                    <label>End date:</label>
                    <input
                      type="date"
                      name="end_date"
                      onChange={handleChangeAttr}
                      min={form.start_date}
                      required
                    />
                  </span>
                </span>
                <label>
                  Select how much you are going to spend on your trip:{" "}
                </label>
                <select name="budget" onChange={handleChangeAttr}>
                  <option value="$0-$1000">$0-$500</option>
                  <option value="$1000-$10000">$500-$5000</option>
                  <option value="$10000+">$5000+</option>
                </select>
                <span className="housing-form-row">
                  <span className="housing-form-col" id="city-input">
                    <label>Enter your city:</label>
                    <input
                      type="text"
                      name="city"
                      onChange={handleChangeAttr}
                      required
                    />
                  </span>
                  <span className="housing-form-col" id="state-input">
                    <label>Enter your state:</label>
                    <input
                      type="text"
                      name="state"
                      onChange={handleChangeAttr}
                      required
                    />
                  </span>
                </span>
                <label>Enter your country:</label>
                <input
                  type="text"
                  name="country"
                  onChange={handleChangeAttr}
                  required
                />
                <button type="submit">Submit</button>
              </form>
            </MediaQuery>
            <MediaQuery maxWidth={866}>
              <form className="housing-form" onSubmit={handleSubmission}>
                <h3>See your travel possibilities!</h3>
                <span className="housing-form-col">
                  <label>Start date:</label>
                  <input
                    type="date"
                    name="start_date"
                    onChange={handleChangeAttr}
                    min={getDate()}
                    required
                  />
                </span>
                <span className="housing-form-col">
                  <label>End date:</label>
                  <input
                    type="date"
                    name="end_date"
                    onChange={handleChangeAttr}
                    min={form.start_date}
                    required
                  />
                </span>
                <label>
                  Select how much you are going to spend on your trip:{" "}
                </label>
                <select name="budget" onChange={handleChangeAttr}>
                  <option value="$0-$1000">$0-$500</option>
                  <option value="$1000-$10000">$500-$5000</option>
                  <option value="$10000+">$5000+</option>
                </select>
                <span className="housing-form-col" id="city-input">
                  <label>Enter your city:</label>
                  <input
                    type="text"
                    name="city"
                    onChange={handleChangeAttr}
                    required
                  />
                </span>
                <span className="housing-form-col" id="state-input">
                  <label>Enter your state:</label>
                  <input
                    type="text"
                    name="state"
                    onChange={handleChangeAttr}
                    required
                  />
                </span>
                <label>Enter your country:</label>
                <input
                  type="text"
                  name="country"
                  onChange={handleChangeAttr}
                  required
                />
                <button type="submit">Submit</button>
              </form>
            </MediaQuery>
          </>
        ) : (
          <>
            {!requestStatus.pending ? (
              !requestStatus.error ? (
                <>
                  {/* Will display response from the Llama API after providing the necessary information in form. */}
                  <p>{res}</p>
                  <br></br>
                  <button
                    onClick={() => {
                      setRequestStatus({ ...requestStatus, submitted: false });
                      setRes("");
                    }}
                  >
                    Search Again
                  </button>
                </>
              ) : (
                <div className="housing-form-notice">
                  <h4>
                    There was an error processing your request. Please try
                    again.
                  </h4>
                  <br></br>
                  <button
                    onClick={() => {
                      setRequestStatus({
                        ...requestStatus,
                        pending: true,
                        error: false,
                        submitted: false,
                      });
                    }}
                  >
                    Submit Again
                  </button>
                </div>
              )
            ) : (
              <div className="housing-form-notice">
                <p>Loading...</p>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default Housing;
