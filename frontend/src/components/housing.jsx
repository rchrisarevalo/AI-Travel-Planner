import { useState, useEffect } from "react";

function Housing() {
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    budget: "$0-$1000",
    city: "",
    state: "",
    country: "",
  });

  const [res, setRes] = useState("")

  const handleSubmission = (e) => {
    e.preventDefault();

    const retrieveData = async () => {
      const res = await fetch('http://localhost:5000/recommendations', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (res.ok) {
        const data = await res.json()
        setRes(data)
      } else {
        setRes("There was an error processing your request. Please try again.")
      }
    }
    retrieveData()
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

  return (
    <div className="housing-form-wrapper">
      <form className="housing-form" onSubmit={handleSubmission}>
        <h3>See your travel possibilities!</h3>
        <span className="housing-form-row">
          <span className="housing-form-col">
            <label>Start date:</label>
            <input type="date" name="start_date" onChange={handleChangeAttr} min={getDate()} required />
          </span>
          <span className="housing-form-col">
            <label>End date:</label>
            <input type="date" name="end_date" onChange={handleChangeAttr} required />
          </span>
        </span>
        <label>Select how much you are going to spend on your trip: </label>
        <select name="budget" onChange={handleChangeAttr}>
          <option value="$0-$1000">$0-$500</option>
          <option value="$1000-$10000">$500-$5000</option>
          <option value="$10000+">$5000+</option>
        </select>
        <span className="housing-form-row">
          <span className="housing-form-col" id="city-input">
            <label>Enter your city:</label>
            <input type="text" name="city" onChange={handleChangeAttr} required />
          </span>
          <span className="housing-form-col" id="state-input">
            <label>Enter your state:</label>
            <input type="text" name="state" onChange={handleChangeAttr} required />
          </span>
        </span>
        <label>Enter your country:</label>
        <input type="text" name="country" onChange={handleChangeAttr} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Housing;
