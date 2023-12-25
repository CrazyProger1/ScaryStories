export const validateResponse = (response, successStatuses = [200],) => {
    if (!successStatuses.includes(response.status))
        throw  {response: response}
}