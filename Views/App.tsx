import * as React from 'react';
import { useState } from 'react';
import Clock from 'react-live-clock';
import Utils from '../Utils';
import './style.css';

export default function App() {
  const [changeColor, updateClass] = useState('');
  const [displayFields, updateDisplay] = useState(
    Utils.generateNewDisplayFieldObject()
  );

  const submitHandler = (event) => {
    event.preventDefault();
    const output = `Caller Name: ${displayFields.callerName}\nTitle: ${displayFields.callerTitle}\n Secondary Verification: ${displayFields.svg}\nReason: ${displayFields.callerReason}`;
    navigator.clipboard.writeText(output);
    // Clean the Fields Update
    updateDisplay(Utils.generateNewDisplayFieldObject());
  };

  const handleChange = (event) => {
    const field: string = event.target.id;

    if (field === 'mid' && event.target.value.length >= 7) {
      updateClass('changeMIDColor');
    } else if (field === 'mid' && event.target.value.length < 7) {
      updateClass('');
    }

    const newObj = {
      ...displayFields,
    };

    newObj[field] = event.target.value;
    updateDisplay(newObj);
  };

  const copyMIDToClipBoard = () => {
    navigator.clipboard.writeText(displayFields.mid);
  };

  const clearFields = () => {
    updateDisplay(Utils.generateNewDisplayFieldObject());
  };

  const clearMID = () => {
    updateDisplay({
      ...displayFields,
      mid: '',
    });
  };

  return (
    <div>
      <div className="top-display">
        <h1>Caller Info</h1>
        <h3>
          MID: <span className={changeColor}>{displayFields.mid}</span>
        </h3>
        <h3>DBA: {displayFields.dba}</h3>
        <h3>Caller Name: {displayFields.callerName}</h3>
        <h3>Caller Title: {displayFields.callerTitle}</h3>
        <h3>SVG: {displayFields.svg}</h3>
        <h3>Reason for Call: {displayFields.callerReason}</h3>
        <div className="field-clock">
          <div>
            Time:{' '}
            <Clock
              format={'HH:mm:ss'}
              ticking={true}
              timezone={'US/Mountain'}
            />
          </div>
        </div>
      </div>
      <div className="controls-container">
        <form onSubmit={submitHandler}>
          <div className="control">
            <label htmlFor="caller-mid">Merchant Identifier (MID)</label>
            <input
              type="text"
              id="mid"
              onChange={handleChange}
              value={displayFields.mid}
            />
          </div>
          <div className="control">
            <label htmlFor="caller-dba">DBA</label>
            <input
              type="text"
              id="dba"
              onChange={handleChange}
              value={displayFields.dba}
            />
          </div>
          <div className="control">
            <label htmlFor="caller-full-name">Caller Full Name </label>
            <input
              type="text"
              id="callerName"
              onChange={handleChange}
              value={displayFields.callerName}
            />
          </div>
          <div className="control">
            <label htmlFor="caller-title">Caller Title </label>
            <input
              type="text"
              id="callerTitle"
              onChange={handleChange}
              value={displayFields.callerTitle}
            />
          </div>
          <div className="control-radio-btns">
            <input
              type="radio"
              value="DBA Confirmed"
              id="svg"
              name="confirmation"
              onChange={handleChange}
            />{' '}
            DBA Confirmed
            <input
              type="radio"
              value="Bank Account"
              name="confirmation"
              id="svg"
              onChange={handleChange}
            />{' '}
            Bank Account
            <input
              type="radio"
              value="SSN"
              id="svg"
              name="confirmation"
              onChange={handleChange}
            />{' '}
            SSN
          </div>
          <div className="control">
            <label htmlFor="new-password">Reason for the Call </label>
            <textarea
              name="message"
              rows="10"
              cols="30"
              onChange={handleChange}
              id="callerReason"
              value={displayFields.callerReason}
            ></textarea>
          </div>
          <div className="control">
            <button>Submit</button>
          </div>
        </form>
        <div className="btn-controls">
          <button onClick={copyMIDToClipBoard}>Copy MID</button>
          <button onClick={clearMID}>Clear MID</button>
          <button onClick={clearFields}>Clear All Fields</button>
        </div>
      </div>
      <section className="footer"></section>
    </div>
  );
}
