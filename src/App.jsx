import React, { useState } from 'react';

export function App(props) {

  const [providedCurrentDate, setProvidedCurrentDate] = useState('');
  const [contractBeginDate, setContractBeginDate] = useState('');
  const [minimumContractDuration, setMinimumContractDuration] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [renewalInterval, setRenewalInterval] = useState('');
  const [nextCancellationDate, setNextCancellationDate] = useState('');

  const calculateCancellationDate = () => {
    const currentDate = new Date(providedCurrentDate);
    const beginDate = new Date(contractBeginDate);
    const minDuration = parseInt(minimumContractDuration);
    const notice = parseInt(noticePeriod);
    const renewal = parseInt(renewalInterval);
    var minEndDate = new Date(beginDate);

    function addMonths(date, months) {
      var d = date.getDate();
      date.setMonth(date.getMonth() + +months);
      if (date.getDate() != d) {
        date.setDate(1);
      }
      return date;
    }

    // add minDuration to minEndDate using addMonths function
    addMonths(minEndDate, minDuration);

    if (!isNaN(minDuration) && !isNaN(notice) && !isNaN(renewal) && beginDate instanceof Date && !isNaN(beginDate.getTime())) {

      const minCancellation = new Date(currentDate);
      minCancellation.setDate(minCancellation.getDate() + notice * 7); // Convert weeks to days

      if (renewal === 0) {
        minEndDate.setDate(minEndDate.getDate() - 1);
        //const maxDate = minEndDate > minCancellation ? minEndDate : minCancellation; 
        const maxDate = new Date(Math.max(minEndDate, minCancellation));
        setNextCancellationDate(maxDate.toDateString());
      } else {
        while (minEndDate < minCancellation) {
          // minEndDate.setMonth(minEndDate.getMonth() + renewal) but use addMonths function
          addMonths(minEndDate, renewal);
        }
        minEndDate.setDate(minEndDate.getDate() - 1);
        setNextCancellationDate(minEndDate.toDateString());
      }
    } else {
      setNextCancellationDate('Please enter valid input values');
    }
  };

  return (
    <div>
      <label>Current Date:</label>
      <input type="date" value={providedCurrentDate} onChange={(e) => setProvidedCurrentDate(e.target.value)} />
      <br />
      <label>Contract Begin Date:</label>
      <input type="date" value={contractBeginDate} onChange={(e) => setContractBeginDate(e.target.value)} />
      <br />
      <label>Minimum Contract Duration (months):</label>
      <input type="number" value={minimumContractDuration} onChange={(e) => setMinimumContractDuration(e.target.value)} />
      <br />
      <label>Notice Period (weeks):</label>
      <input type="number" value={noticePeriod} onChange={(e) => setNoticePeriod(e.target.value)} />
      <br />
      <label>Renewal Interval (months):</label>
      <input type="number" value={renewalInterval} onChange={(e) => setRenewalInterval(e.target.value)} />
      <br />
      <button onClick={calculateCancellationDate}>Calculate Next Cancellation Date</button>
      <br />
      <p>Next Possible Cancellation Date: {nextCancellationDate}</p>
    </div>
  );
}
