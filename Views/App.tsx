import * as React from 'react';
import { useState } from 'react';
import Clock from 'react-live-clock';
import { LocalStorageWorker } from '../Controller';
import { prefilledResponses } from '../Model';
import Utils from '../Utils';
import './style.css';

export default function App() {
  const [merchantHistory, updateMerchantHistory] = useState([]);
  const [changeColor, updateClass] = useState('');
  const [displayFields, updateDisplay] = useState(
    Utils.generateNewDisplayFieldObject()
  );

  // Work on this section of code to extract local storage.
  // console.log(localStorage.getItem(''));
  LocalStorageWorker.load();

  const submitHandler = (event) => {
    event.preventDefault();
    const output = `Caller Name: ${displayFields.callerName}\nTitle: ${displayFields.callerTitle}\nSecondary Verification: ${displayFields.sv}\nReason: ${displayFields.callerReason} - no FQA.`;
    navigator.clipboard.writeText(output);
    updateDisplay(Utils.generateNewDisplayFieldObject());
    merchantHistory.push(displayFields);
    updateMerchantHistory([...merchantHistory]);

    // Store Data into Local Storage
    LocalStorageWorker.store(merchantHistory);
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

  const populateTextAreaWithPrefilledOptions = (event) => {
    const prefilledReason: string =
      prefilledResponses[event.target.value].filled_reason;

    updateDisplay({
      ...displayFields,
      callerReason: prefilledReason,
    });
  };

  const options = prefilledResponses.map((value, index) => {
    return (
      <option key={index} value={index}>
        {value.option}
      </option>
    );
  });

  const historyOptions = merchantHistory.map((merchant, index) => {
    return (
      <option key={index} value={index}>
        {merchant.mid + ' - ' + merchant.dba}
      </option>
    );
  });

  const copyDBAToClipboard = () => {
    navigator.clipboard.writeText(displayFields.dba);
  };

  return (
    <div>
      <div className="navigation">
        <button onClick={() => alert('needs to be implemented')}>
          Log Out
        </button>
      </div>
      <div className="top-display">
        <h1>Caller Info</h1>
        <h3>
          MID: <span className={changeColor}>{displayFields.mid}</span>
        </h3>
        <h3>Full Name: {displayFields.callerName}</h3>
        <h3>Title: {displayFields.callerTitle}</h3>
        <h3>DBA: {displayFields.dba}</h3>
        <h3>SV: {displayFields.sv}</h3>
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
            <label htmlFor="caller-full-name">Full Name </label>
            <input
              type="text"
              id="callerName"
              onChange={handleChange}
              value={displayFields.callerName}
            />
          </div>
          <div className="control">
            <label htmlFor="caller-title">Title </label>
            <input
              type="text"
              id="callerTitle"
              onChange={handleChange}
              value={displayFields.callerTitle}
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
          <div className="control-radio-btns">
            <input
              type="radio"
              value="DBA Confirmed"
              id="sv"
              name="confirmation"
              onChange={handleChange}
            />{' '}
            DBA Confirmed
            <input
              type="radio"
              value="Bank Account"
              name="confirmation"
              id="sv"
              onChange={handleChange}
            />{' '}
            Bank Account
            <input
              type="radio"
              value="SSN"
              id="sv"
              name="confirmation"
              onChange={handleChange}
            />{' '}
            SSN
            <input
              type="radio"
              value="PSS ISO Confirmed"
              id="sv"
              name="confirmation"
              onChange={handleChange}
            />{' '}
            ISO Confirmed
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
        <div className="controls-options-container">
          <div className="controls-options">
            <select
              name="prefilled-options"
              id="prefilled_options"
              onChange={populateTextAreaWithPrefilledOptions}
            >
              {options}
            </select>
          </div>
          <div className="controls-options-history">
            {' '}
            <select
              size={10}
              name="history_options"
              id="history_options"
              onChange={() => {
                // console.log('Hello');
              }}
            >
              {historyOptions}
            </select>
          </div>
          <div className="controls-links">
            <label>Sites: </label>
            <a
              href="https://merchantcenter.transit-pass.com/jsp/vt/jsp/index.jsp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>Merchant Center</button>
            </a>
            <a
              href="https://www.mreports.com/sso/login?service=https%3A%2F%2Fwww.mreports.com%2Fportal%2Fstart%2Ftransfirst"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>CBOSS</button>
            </a>
          </div>
        </div>
        <div className="btn-controls">
          <button onClick={copyMIDToClipBoard}>Copy MID</button>
          <button onClick={copyDBAToClipboard}>Copy DBA</button>
          <button onClick={clearMID}>Clear MID</button>
          <button onClick={clearFields}>Clear All Fields</button>
          <button
            onClick={() => {
              LocalStorageWorker.store(merchantHistory);
            }}
          >
            TEST STORAGE
          </button>
        </div>
      </div>
      <section className="footer"></section>
    </div>
  );
}
