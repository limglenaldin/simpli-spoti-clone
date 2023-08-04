const checkResponse = (response) => {
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('403 - Bad OAuth Request');
    } else if (response.status === 429) {
      throw new Error('429 - Exceeded Rate Limits')
    } else {
      throw new Error('Unknown Error')
    }
  }
}

export { checkResponse }