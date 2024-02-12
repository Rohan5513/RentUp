class HttpService {
  async post(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to make POST request');
    }
  }

  async get(url) {
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to make GET request');
    }
  }
}

export default HttpService;
