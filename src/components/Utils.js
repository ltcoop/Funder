import React from 'react';

export const formatMoney = (value) =>
    new Intl.NumberFormat('en-US', {
	style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2	
  }).format(value);