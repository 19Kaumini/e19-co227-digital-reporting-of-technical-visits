import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import "../../Styles/Technicians/TechnicianForm.scss";
import {
  BsFillFileEarmarkPersonFill,
  BsFileEarmarkPerson,
  BsTelephoneFill,
} from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
export const TechnicianForm = ({ onClosing }) => {
  const technicianCollectionRef = collection(db, "Technicians");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    mobile: [""],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const updatedMobile = [...formData.mobile];
      updatedMobile[index] = value;

      setFormData({
        ...formData,
        mobile: updatedMobile,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddMobile = () => {
    setFormData({
      ...formData,
      mobile: [...formData.mobile, ""],
    });
  };

  const handleRemoveMobile = (index) => {
    const updatedMobile = [...formData.mobile];
    updatedMobile.splice(index, 1);

    setFormData({
      ...formData,
      mobile: updatedMobile,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit(formData);
    onClosing();

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      mobile: [""],
    });
  };

  const onSubmit = async (data) => {
    console.log(data);
    await addDoc(technicianCollectionRef, data);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="topic">Add a Technician</h2>
      <button className="close-button" onClick={() => onClosing()}>
        X
      </button>
      <div className="first-name">
        <div className="icon">
          <BsFillFileEarmarkPersonFill />
        </div>
        <div className="first-name-input">
          <label htmlFor="firstName">First Name </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange(e, 0)}
            required
          />
        </div>
      </div>

      <div className="last-name">
        <div className="icon">
          <BsFileEarmarkPerson />
        </div>
        <div className="first-name-input">
          <label htmlFor="lastName">Last Name </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange(e, 1)}
            required
          />
        </div>
      </div>

      <div className="e-mail">
        <div className="icon">
          <AiOutlineMail />
        </div>
        <div className="email-input">
          <label htmlFor="email">Email&emsp;&emsp;&ensp;</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e, 2)}
            required
          />
        </div>
      </div>

      <div className="address">
        <div className="icon">
          <GoLocation />
        </div>
        <div>
          <label htmlFor="address">Address&emsp;&ensp;</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={(e) => handleChange(e, 3)}
            required
          />
        </div>
      </div>

      <div className="phone-number">
        <div className="icon">
          <BsTelephoneFill />
        </div>
        <div className="mobile-number">
          <label htmlFor="mobile">Mobile Numbers:</label>
          {formData.mobile.map((mobileNumber, index) => (
            <div key={index}>
              <input
                type="number"
                name="mobile"
                value={mobileNumber}
                onChange={(e) => handleChange(e, index)}
                required
              />
              {index > 0 && (
                <button type="button" onClick={() => handleRemoveMobile(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddMobile}>
            Add Mobile Number
          </button>
        </div>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
