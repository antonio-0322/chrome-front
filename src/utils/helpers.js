export const emailValidation = (email, errorSetter) => {
    const mailFormat =
      /^[a-zA-Z0-9.!#$£%&’*+/=?^_<>()`{|}~-]*@[a-zA-Z0-9.!#$£%&’*+/=?^_<>()`{|}~-]*(\.\w{2,3})/;
  
    return email !== '' &&  !email.match(mailFormat) ? 
        errorSetter('email', {
            type: 'custom',
            message: 'Please enter a valid email format.',
          })
        : errorSetter('email', null)
      
  };

let timeoutId;

export const inputDebounce = (func) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(func, 300);
};