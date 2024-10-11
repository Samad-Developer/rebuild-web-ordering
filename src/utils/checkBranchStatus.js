const checkBranchStatus = () => {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    
    // Get branch data from local storage
    const branch = JSON.parse(localStorage.getItem('branchData'))[0]; // Assuming single branch
  
    const startTime = branch.BusinessDayStartTime.split(':').map(Number);
    const endTime = branch.BusinessDayEndTime.split(':').map(Number);
    
    // Convert business hours to minutes for easier comparison
    const branchStartMinutes = startTime[0] * 60 + startTime[1];
    const branchEndMinutes = endTime[0] * 60 + endTime[1];
    const currentMinutesTotal = currentHours * 60 + currentMinutes;
  
    // Handle overnight closing (e.g., open from 12 PM to 4 AM)
    if (branchEndMinutes < branchStartMinutes) {
      // Branch closes after midnight
      return currentMinutesTotal >= branchStartMinutes || currentMinutesTotal < branchEndMinutes;
    } else {
      // Branch closes before midnight
      return currentMinutesTotal >= branchStartMinutes && currentMinutesTotal < branchEndMinutes;
    }
  };

  export default checkBranchStatus;