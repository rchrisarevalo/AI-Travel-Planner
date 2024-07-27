import { useState } from "react";

function Housing() {
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    budget: "$0-$1000",
    city: "",
    state: "",
    country: "",
  });

  const handleSubmission = (e) => {
    e.preventDefault();
  };

  const handleChangeAttr = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getDate = () => {
    if (new Date().getMonth() + 1 >= 1 && new Date().getMonth() + 1 <= 9) {
        return `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`
    } else {
        return `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
    }
  }
  console.log(form)

  return (
    <>
      <form className="housing-form" onSubmit={handleSubmission}>
        <span className="housing-form-row">
          <span className="housing-form-col">
            <label>Start date:</label>
            <input type="date" name="start_date" onChange={handleChangeAttr} min={getDate()} />
          </span>
          <span className="housing-form-col">
            <label>End date:</label>
            <input type="date" name="end_date" onChange={handleChangeAttr} />
          </span>
        </span>
        <label>Select how much you are going to spend on your trip: </label>
        <select name="budget" onChange={handleChangeAttr}>
          <option value="$0-$1000">$0-$1000</option>
          <option value="$1000-$10000">$1000-$10000</option>
          <option value="$10000+">$10000+</option>
        </select>
        <span className="housing-form-row">
          <span className="housing-form-col" id="city-input">
            <label>City:</label>
            <input type="text" name="city" onChange={handleChangeAttr} />
          </span>
          <span className="housing-form-col" id="state-input">
            <label>State:</label>
            <input type="text" name="state" onChange={handleChangeAttr}  />
          </span>
        </span>
        <label>Country:</label>
        <input type="text" name="country" onChange={handleChangeAttr} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Housing;
