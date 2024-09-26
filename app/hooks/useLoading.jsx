
const useLoading = (state = 'loading', method = "POST") => {
    const isLoading = (["loading", "submitting"].includes(state) && ['POST', 'PUT', 'DELETE'].includes(method))
    return isLoading
}

export default useLoading