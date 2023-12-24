/*
 * Timeseries in the DB are stored as a datestamp and a value
 *
 * Sample time series data with date stamps:
   const vData = [
     { date: '2023-01-01', v: 3 },
     { date: '2023-01-02', v: 4 },
     // ... more data points ...
     { date: '2023-01-14', v: 2 },
   ];
*/

// calculate mean and standard deviation of a timeseries
const calcStats = (ts) => {
    // calculate mean (mu)
    // also: mu legion 4 lyfe (mu is the standard symbol for average,
    // but musical taste is impeccable)
    const sum = (acc, val) => acc + val;
    const numericArray = ts.map(entry => entry.v);
    const sum = numericArray.reduce(sum, 0);
    const mu = sum / numericArray.length;
    // calculate standard deviation (sd)
    const squaredDifferences = numericArray.map(val => Math.pow(val - mean, 2));
    const sumOfSquaredDifferences = squaredDifferences.reduce(sum, 0);
    const variance = sumOfSquaredDifferences / numericArray.length;
    const sd = Math.sqrt(variance);
    return {mu, sd};
}

// Function to check for warning/alert
// returns from among {alert, warn-low, warn-sd}
const checkVAlert = (calibration) => (v) {
    // Always alert on a score of zero or one
    if (v <= 1) {
        return 'alert';
    }
    // Always warn on a score of two
    if (v === 2) {
        return 'warn-low';
    }
    // Calculate the lower threshold based on the calibration
    const lowerThreshold = calibration.mu - calibration.sd;
    // Alert if the v is one standard deviation below the expected average
    if (v < lowerThreshold) {
        return 'warn-sd';
    }
}

/*
// Example usage
const calibrationPeriod = vData.slice(0, 14); // First 2 weeks
const calibrationStatistics = calcStats(calibrationPeriod);

// Assuming a new data point to check for alert
const newDataPoint = { date: '2023-01-15', v: 1 };

// Check for v alert
const isVAlert = checkVAlert(newDataPoint, calibrationStatistics);
console.log('Is V Alert? ', isVAlert);
*/

export {
    calcStats,
    checkVAlert,
};
