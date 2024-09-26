"use client";

import { useState } from "react";
import EventForm from "../src/components/Form/Form";
import styles from "./page.module.css";

const MessageBox = ({ isSuccess }) => {
  return (
    <div className={`${styles.messageBoxWrapper}`}>
      <div
        className={`${styles.messageBox} ${isSuccess ? styles.success : styles.error}`}
      >
        {isSuccess
          ? "Form submitted successfully!"
          : "There was an error submitting the form."}
      </div>
    </div>
  );
};

export default function NewEvent() {
  let [formSubmitted, setFormSubmitted] = useState(false);

  const submitForm = () => {
    setFormSubmitted(true);
  };

  return (
    <>
      {formSubmitted ? (
        <MessageBox isSuccess={true} />
      ) : (
        <EventForm submitForm={submitForm} />
      )}
    </>
  );
}
