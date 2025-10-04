export const validateMeetingForm = (formData) => {
  const errors = {};

  // Meeting Title validation
  if (!formData.meetingTitle || formData.meetingTitle.trim().length === 0) {
    errors.meetingTitle = 'Meeting title is required';
  } else if (formData.meetingTitle.trim().length < 3) {
    errors.meetingTitle = 'Meeting title must be at least 3 characters';
  }

  // Date and Time validation
  if (!formData.selectedDateTime) {
    errors.dateTime = 'Date and time is required';
  }

  // Meeting Type validation
  if (!formData.meetingType) {
    errors.meetingType = 'Meeting type is required';
  }

  // Meeting Link validation (only for online meetings)
  if (formData.meetingType === 'Online') {
    if (!formData.meetingLink || formData.meetingLink.trim().length === 0) {
      errors.meetingLink = 'Meeting link is required for online meetings';
    } else {
      // Basic URL validation
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(formData.meetingLink)) {
        errors.meetingLink = 'Please enter a valid URL';
      }
    }
  }

  // Participants validation
  if (!formData.participants || formData.participants.length === 0) {
    errors.participants = 'At least one participant is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateMeetingTitle = (title) => {
  if (!title || title.trim().length === 0) {
    return 'Meeting title is required';
  }
  if (title.trim().length < 3) {
    return 'Meeting title must be at least 3 characters';
  }
  return null;
};

export const validateMeetingLink = (link) => {
  if (!link || link.trim().length === 0) {
    return 'Meeting link is required for online meetings';
  }
  
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if (!urlPattern.test(link)) {
    return 'Please enter a valid URL';
  }
  
  return null;
};