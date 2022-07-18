
export const validateNewUser = ({ username, password, income, budget }) => {
  const errors = []
  
  if (username.length < 6) errors.push('username is too short (min 6 characters)')
  if (password.length < 6) errors.push('password is too short (min 6 characters)')
  if (Number(budget) <= 0) errors.push('budget is less than or equal to 0')
  if (!hasMaxTwoDecimalPlaces(budget)) errors.push('budget exceeds 2 decimal places')
  if (Number(income) <= 0) errors.push('income is less than or equal to 0')
  if (!hasMaxTwoDecimalPlaces(income)) errors.push('income exceeds 2 decimal places')

  return errors
}

const hasMaxTwoDecimalPlaces = (value) => Number(value) === Number(Number(value).toFixed(2))