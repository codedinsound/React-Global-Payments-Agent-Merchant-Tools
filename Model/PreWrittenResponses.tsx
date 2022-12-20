const prefilledResponses = [
  {
    option: 'Choose a Response',
    filled_reason: '',
  },
  {
    option: 'Merchant Center Reset',
    filled_reason: 'Needed merchant user credentials reset for user: ',
  },
  {
    option: 'Merchant Center Unlock',
    filled_reason: 'Needed to get unlocked from merchant center.',
  },
  {
    option: 'Translink Password Reset',
    filled_reason: 'Helped merchant with resetting their Translink account.',
  },
  {
    option: 'TXP Unlock',
    filled_reason: 'Needed transaction express user unlock',
  },
  {
    option: 'TXP MFA Reset',
    filled_reason: 'Merchant needed MFA reset on their TXP account.',
  },
  {
    option: 'TC Password Retrieval',
    filled_reason:
      'Merchant needed help retrieving their transaction central password.',
  },
  {
    option: 'Duplicate Batch',
    filled_reason:
      'Terminal has a QD error duplicate batch. Helped merchant with deleting duplicate batch.',
  },
  {
    option: 'Transferred to GPI',
    filled_reason: 'Transferred to GPI',
  },
  {
    option: 'Terminal Comm Error',
    filled_reason:
      'Helped merchant troubleshoot terminal due to communication error',
  },
  {
    option: 'Settlement Failed Batch Corrupted',
    filled_reason:
      'Batch not settling on the terminal due to RB error. Helped merchant with deleting the batch.',
  },
  {
    option: 'Confirm Transaction',
    filled_reason:
      'Needs credit card confirmation to see if the transaction ran through. For the date:',
  },
  {
    option: 'Credit Cards for Tip Adjust',
    filled_reason:
      'Needs credit cards in order to do tip adjustments. For the dates: ',
  },
  {
    option: 'Credit Cards for Transaction Adjust',
    filled_reason:
      'Merchant needed credit cards for transaction adjustment for the dates: ',
  },
];

export default prefilledResponses;
