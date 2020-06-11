/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup'

export function yupEqualTo(ref, msg) {
  return Yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path,
    },
    test(value) {
      return value === this.resolve(ref)
    },
  })
}
export function clearObject(obj) {
  Object.keys(obj).map(k => {
    if (typeof obj[k] === 'object') {
      const temp = clearObject(obj[k])
      if (temp === {}) delete obj[k]
    } else if (obj[k] === '' || obj[k] === {} || obj[k] === []) {
      delete obj[k]
    }
  })
  return obj
}

export function passwordValidation(lengthMsg, notValidMsg, requiredMsg) {
  return Yup.string()
    .min(8, lengthMsg)
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[#?!@$%^&*-])[0-9a-zA-Z#?!@$%^&*-]{8,}$/,
      notValidMsg
    )
    .required(requiredMsg)
}

export function phoneNumberValidation(notValidMsg, requiredMsg) {
  return Yup.string()
    .matches(
      /^((\([0-9]{3}\))|[0-9]{3})[\s-]?[\0-9]{3}[\s-]?[0-9]{4}$/,
      notValidMsg
    )
    .required(requiredMsg)
}
export const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}


export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      this.removeEventListener('click', clickHandler);
    }, 150);
  };
  a.addEventListener('click', clickHandler, false);
  a.click();
  return a;
}